"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { EmployeeDirectory } from "@/components/employees/employee-directory"

export default function EmployeesPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user?.role !== "admin") {
      router.push("/dashboard")
    }
  }, [user, router])

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">ليس لديك صلاحية للوصول إلى هذه الصفحة</p>
      </div>
    )
  }

  return <EmployeeDirectory />
}
