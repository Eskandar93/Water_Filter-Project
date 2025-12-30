"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, CheckCircle2, XCircle, Search, Building2 } from "lucide-react"

interface AttendanceRecord {
  id: string
  userId: string
  userName: string
  branchId: string
  branchName: string
  checkInTime: string
  checkInBranch: string
  checkOutTime: string | null
  checkOutBranch: string | null
  date: string
  status: "checked-in" | "checked-out"
}

const ATTENDANCE_STORAGE_KEY = "attendance_records"

function getStoredAttendance(): AttendanceRecord[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(ATTENDANCE_STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export default function AttendanceRecordsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [searchQuery, setSearchQuery] = useState("")

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/dashboard")
    }
  }, [user, router])

  // Load attendance records
  useEffect(() => {
    setRecords(getStoredAttendance())
  }, [])

  // Filter records by date and search query
  const filteredRecords = records.filter((record) => {
    const matchesDate = record.date === selectedDate
    const matchesSearch = searchQuery === "" || record.userName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDate && matchesSearch
  })

  // Calculate stats for selected date
  const stats = {
    total: filteredRecords.length,
    checkedIn: filteredRecords.filter((r) => r.status === "checked-in").length,
    checkedOut: filteredRecords.filter((r) => r.status === "checked-out").length,
  }

  if (user?.role !== "admin") {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground p-4">سجل الحضور والانصراف</h1>
        <p className="text-muted-foreground mt-1 px-4">عرض سجل حضور وانصراف جميع الموظفين</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            تصفية السجلات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">التاريخ</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">البحث بالاسم</label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن موظف..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي السجلات</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {new Date(selectedDate).toLocaleDateString("ar-EG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">حاضرون حالياً</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.checkedIn}</div>
            <p className="text-xs text-muted-foreground">لم يسجلوا انصراف</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">انصرفوا</CardTitle>
            <XCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.checkedOut}</div>
            <p className="text-xs text-muted-foreground">سجلات مكتملة</p>
          </CardContent>
        </Card>
      </div>

      {/* Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>سجلات اليوم المحدد</CardTitle>
          <CardDescription>
            {new Date(selectedDate).toLocaleDateString("ar-EG", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredRecords.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">لا توجد سجلات لهذا اليوم</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">الموظف</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">وقت الحضور</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">فرع الحضور</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">وقت الانصراف</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">فرع الانصراف</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">{record.userName.charAt(0)}</span>
                            </div>
                            <span className="font-medium">{record.userName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span>{record.checkInTime}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{record.checkInBranch || record.branchName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {record.checkOutTime ? (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span>{record.checkOutTime}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {record.checkOutBranch ? (
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{record.checkOutBranch}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={record.status === "checked-out" ? "default" : "secondary"}>
                            {record.status === "checked-out" ? "انصرف" : "حاضر"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {filteredRecords.map((record) => (
                  <div key={record.id} className="p-4 border rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{record.userName.charAt(0)}</span>
                        </div>
                        <span className="font-medium">{record.userName}</span>
                      </div>
                      <Badge variant={record.status === "checked-out" ? "default" : "secondary"}>
                        {record.status === "checked-out" ? "انصرف" : "حاضر"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">وقت الحضور</p>
                        <p className="font-medium">{record.checkInTime}</p>
                        <p className="text-xs text-muted-foreground">{record.checkInBranch || record.branchName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">وقت الانصراف</p>
                        <p className="font-medium">{record.checkOutTime || "-"}</p>
                        {record.checkOutBranch && (
                          <p className="text-xs text-muted-foreground">{record.checkOutBranch}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
