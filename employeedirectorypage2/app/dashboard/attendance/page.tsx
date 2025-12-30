"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { getBranches, isWithinBranch, type Branch } from "@/lib/branches-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  CheckCircle2,
  XCircle,
  Loader2,
  Navigation,
  Clock,
  Building2,
  AlertTriangle,
  RefreshCw,
  LogOutIcon,
} from "lucide-react"

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

export function getStoredAttendance(): AttendanceRecord[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(ATTENDANCE_STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveAttendance(records: AttendanceRecord[]) {
  localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(records))
}

export default function AttendancePage() {
  const { user } = useAuth()
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [nearestBranch, setNearestBranch] = useState<{
    isWithin: boolean
    branch: Branch | null
    distance: number
  } | null>(null)
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null)
  const [allRecords, setAllRecords] = useState<AttendanceRecord[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [branches, setBranches] = useState<Branch[]>([])

  const today = new Date().toISOString().split("T")[0]

  const getLocation = () => {
    setIsLoadingLocation(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError("المتصفح لا يدعم تحديد الموقع")
      setIsLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        console.log("[v0] Location obtained:", coords)
        setLocation(coords)
        const branchCheck = isWithinBranch(coords.latitude, coords.longitude)
        console.log("[v0] Branch check result:", branchCheck)
        setNearestBranch(branchCheck)
        setIsLoadingLocation(false)
      },
      (error) => {
        console.log("[v0] Geolocation error:", error)
        let errorMessage = ""
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "تم رفض إذن الوصول للموقع. يرجى السماح بالوصول للموقع من إعدادات المتصفح."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "معلومات الموقع غير متاحة. تأكد من تشغيل خدمات الموقع على جهازك."
            break
          case error.TIMEOUT:
            errorMessage = "انتهت مهلة طلب الموقع. حاول مرة أخرى."
            break
          default:
            errorMessage = "حدث خطأ في تحديد الموقع. تأكد من تشغيل خدمات الموقع."
        }
        setLocationError(errorMessage)
        setIsLoadingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    )
  }

  // Load attendance records and branches
  useEffect(() => {
    const records = getStoredAttendance()
    setAllRecords(records)
    setBranches(getBranches())

    // Find today's record for current user
    const userTodayRecord = records.find((r) => r.userId === user?.id && r.date === today)
    setTodayRecord(userTodayRecord || null)
  }, [user?.id, today])

  // Get location on mount
  useEffect(() => {
    getLocation()
  }, [])

  const handleCheckIn = async () => {
    if (!user || !nearestBranch?.branch || !nearestBranch.isWithin) return

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newRecord: AttendanceRecord = {
      id: String(Date.now()),
      userId: user.id,
      userName: user.name,
      branchId: nearestBranch.branch.id,
      branchName: nearestBranch.branch.name,
      checkInTime: new Date().toLocaleTimeString("ar-EG"),
      checkInBranch: nearestBranch.branch.name,
      checkOutTime: null,
      checkOutBranch: null,
      date: today,
      status: "checked-in",
    }

    const updatedRecords = [...allRecords, newRecord]
    saveAttendance(updatedRecords)
    setAllRecords(updatedRecords)
    setTodayRecord(newRecord)
    setIsProcessing(false)
  }

  const handleCheckOut = async () => {
    if (!todayRecord || !nearestBranch?.branch || !nearestBranch.isWithin) return

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const updatedRecord: AttendanceRecord = {
      ...todayRecord,
      checkOutTime: new Date().toLocaleTimeString("ar-EG"),
      checkOutBranch: nearestBranch.branch.name,
      status: "checked-out",
    }

    const updatedRecords = allRecords.map((r) => (r.id === todayRecord.id ? updatedRecord : r))
    saveAttendance(updatedRecords)
    setAllRecords(updatedRecords)
    setTodayRecord(updatedRecord)
    setIsProcessing(false)
  }

  // Get recent records for current user
  const userRecords = allRecords
    .filter((r) => r.userId === user?.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground p-4">تسجيل الحضور والانصراف</h1>
        <p className="text-muted-foreground mt-1 px-4 py-4">سجل حضورك وانصرافك من خلال موقعك الجغرافي</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Location Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              حالة الموقع
            </CardTitle>
            <CardDescription>يتم التحقق من موقعك لمطابقته مع أحد الفروع</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoadingLocation ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="mr-3 text-muted-foreground">جاري تحديد موقعك...</span>
              </div>
            ) : locationError ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800">خطأ في تحديد الموقع</p>
                    <p className="text-sm text-red-600 mt-1">{locationError}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="mt-4 bg-green-600 hover:bg-black text-white transition-colors"
                  onClick={getLocation}
                >
                  <RefreshCw className="w-4 h-4 ml-2" />
                  إعادة المحاولة
                </Button>
              </div>
            ) : location && nearestBranch ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                  <Navigation className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">موقعك الحالي</p>
                    <p className="font-mono text-sm">
                      {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                  <Building2 className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">أقرب فرع</p>
                    <p className="font-medium">{nearestBranch.branch?.name}</p>
                    <p className="text-sm text-muted-foreground">المسافة: {Math.round(nearestBranch.distance)} متر</p>
                  </div>
                  {nearestBranch.isWithin ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle2 className="w-3 h-3 ml-1" />
                      ضمن النطاق
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <XCircle className="w-3 h-3 ml-1" />
                      خارج النطاق
                    </Badge>
                  )}
                </div>

                <Button variant="outline" size="sm" onClick={getLocation} className="w-full bg-transparent">
                  <RefreshCw className="w-4 h-4 ml-2" />
                  تحديث الموقع
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Check In/Out Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              تسجيل اليوم
            </CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString("ar-EG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayRecord ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">تم تسجيل الحضور</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-green-600">وقت الحضور</p>
                      <p className="font-medium text-green-800">{todayRecord.checkInTime}</p>
                      <p className="text-xs text-green-600 mt-1">من: {todayRecord.checkInBranch}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-600">وقت الانصراف</p>
                      <p className="font-medium text-green-800">{todayRecord.checkOutTime || "لم يتم بعد"}</p>
                      {todayRecord.checkOutBranch && (
                        <p className="text-xs text-green-600 mt-1">من: {todayRecord.checkOutBranch}</p>
                      )}
                    </div>
                  </div>
                </div>

                {todayRecord.status === "checked-in" && (
                  <div className="space-y-3">
                    <Button
                      className="w-full"
                      variant="destructive"
                      onClick={handleCheckOut}
                      disabled={isProcessing || isLoadingLocation || !nearestBranch?.isWithin || !!locationError}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                          جاري التسجيل...
                        </>
                      ) : (
                        <>
                          <LogOutIcon className="w-4 h-4 ml-2" />
                          تسجيل الانصراف
                        </>
                      )}
                    </Button>
                    {!isLoadingLocation && !nearestBranch?.isWithin && !locationError && (
                      <p className="text-sm text-destructive text-center">
                        يجب أن تكون داخل نطاق أحد الفروع لتسجيل الانصراف
                      </p>
                    )}
                  </div>
                )}

                {todayRecord.status === "checked-out" && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
                    <CheckCircle2 className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                    <p className="font-medium text-blue-800">تم إكمال تسجيل اليوم</p>
                    <p className="text-sm text-blue-600">شكراً لك، نراك غداً إن شاء الله</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-xl text-center">
                  <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">لم تقم بتسجيل الحضور اليوم</p>
                </div>

                <Button
                  className="w-full"
                  onClick={handleCheckIn}
                  disabled={isLoadingLocation || !nearestBranch?.isWithin || isProcessing || !!locationError}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      جاري التسجيل...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 ml-2" />
                      تسجيل الحضور
                    </>
                  )}
                </Button>

                {!isLoadingLocation && !nearestBranch?.isWithin && !locationError && (
                  <p className="text-sm text-destructive text-center">يجب أن تكون داخل نطاق أحد الفروع لتسجيل الحضور</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Branches List */}
      <Card>
        <CardHeader>
          <CardTitle>الفروع المتاحة</CardTitle>
          <CardDescription>قائمة بجميع فروع الشركة ونطاق التسجيل لكل فرع</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {branches.map((branch) => (
              <div key={branch.id} className="p-4 border rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{branch.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{branch.address}</p>
                    <p className="text-xs text-muted-foreground mt-1">نطاق التسجيل: {branch.radius} متر</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Attendance Records */}
      {userRecords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>سجل الحضور الأخير</CardTitle>
            <CardDescription>آخر 7 أيام من سجل حضورك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {new Date(record.date).toLocaleDateString("ar-EG", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">{record.checkInBranch}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm">
                      <span className="text-muted-foreground">حضور:</span> {record.checkInTime}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">انصراف:</span> {record.checkOutTime || "-"}
                    </p>
                  </div>
                  <Badge variant={record.status === "checked-out" ? "default" : "secondary"}>
                    {record.status === "checked-out" ? "مكتمل" : "حاضر"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
