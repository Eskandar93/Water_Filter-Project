"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Mail, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("") // Changed from email to identifier
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Call the actual API - using the curl endpoint format
      const response = await fetch('http://13.218.26.117:8080/api/v1/users/login', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: identifier, // Use the identifier from form
          password: password,
        })
      })

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = 'Login failed'
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log('Login response:', data) // For debugging
      
      // Store authentication data
      if (data.token || data.accessToken) {
        sessionStorage.setItem('token', data.token || data.accessToken)
      }
      sessionStorage.setItem('user', JSON.stringify(data.user || data))
      
      // Call the auth context login function
      if (login) {
        login(identifier, password)
      }
      
      // Redirect based on user role
      const userData = data.user || data
      if (userData.role === "employee" || userData.role === "EMPLOYEE") {
        router.push("/dashboard/attendance")
      } else if (userData.role === "admin" || userData.role === "ADMIN") {
        router.push("/dashboard/admin")
      } else {
        router.push("/dashboard")
      }
      
    } catch (err: any) {
      console.error('Login error:', err)
      
      // Arabic error messages
      if (err.message.includes("401") || err.message.includes("Invalid")) {
        setError("المعرف أو كلمة المرور غير صحيحة")
      } else if (err.message.includes("404") || err.message.includes("Not found")) {
        setError("المستخدم غير موجود")
      } else if (err.message.includes("fetch") || err.message.includes("Network")) {
        setError("تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت")
      } else {
        setError(err.message || "حدث خطأ أثناء تسجيل الدخول")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl border-border bg-card">
        <CardHeader className="text-center space-y-2 pb-8">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">تسجيل الدخول</CardTitle>
          <CardDescription className="text-muted-foreground">
            أدخل اسم المستخدم أو البريد الإلكتروني وكلمة المرور
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-foreground">
                اسم المستخدم أو البريد الإلكتروني
              </Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="identifier"
                  type="text"
                  placeholder="اسم المستخدم أو example@company.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="pr-10 bg-background border-border text-foreground"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                كلمة المرور
              </Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 bg-background border-border text-foreground"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ليس لديك حساب؟{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}