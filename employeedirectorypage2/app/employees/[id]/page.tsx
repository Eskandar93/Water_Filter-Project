"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Mail, Briefcase, DollarSign, Shield, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Import employee data from directory
import { mockEmployees } from "@/components/employee-directory"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EmployeeProfile({ params }: PageProps) {
  const unwrappedParams = params instanceof Promise ? null : params
  const [employee, setEmployee] = useState(() => {
    if (unwrappedParams?.id) {
      return mockEmployees.find((e) => e.id === unwrappedParams.id) || null
    }
    return null
  })

  const permissionLabels = {
    admin: "إدمن",
    manager: "مدير",
    employee: "موظف",
  }

  const permissionColors = {
    admin: "bg-red-100 text-red-800",
    manager: "bg-purple-100 text-purple-800",
    employee: "bg-blue-100 text-blue-800",
  }

  // Handle params promise
  if (params instanceof Promise) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 font-medium"
          >
            <ArrowRight className="w-4 h-4" />
            العودة إلى دليل الموظفين
          </Link>
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">جاري التحميل...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!employee) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 font-medium"
          >
            <ArrowRight className="w-4 h-4" />
            العودة إلى دليل الموظفين
          </Link>
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">الموظف غير موجود</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 font-medium transition"
        >
          <ArrowRight className="w-4 h-4" />
          العودة إلى دليل الموظفين
        </Link>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-purple-600 to-indigo-600"></div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col md:flex-row gap-6 -mt-16 mb-8 items-start md:items-end">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg border-4 border-white">
                {employee.name.charAt(0)}
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-bold text-foreground mb-3">{employee.name}</h1>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${permissionColors[employee.permissions]} text-sm font-semibold px-4 py-1`}>
                    {permissionLabels[employee.permissions]}
                  </Badge>
                  {employee.permissionDetails && (
                    <Badge className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-1">
                      {employee.permissionDetails}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-purple-600" />
                  معلومات التواصل
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">البريد الإلكتروني</p>
                    <p className="text-foreground font-medium">{employee.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">رقم الهاتف</p>
                    <p className="text-foreground font-medium ltr">{employee.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">العنوان</p>
                    <p className="text-foreground font-medium">{employee.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  معلومات الوظيفة
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">القسم</p>
                    <p className="text-foreground font-medium">{employee.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">الفرع</p>
                    <p className="text-foreground font-medium">{employee.branch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">تاريخ التعيين</p>
                    <p className="text-foreground font-medium">
                      {new Date(employee.hireDate).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  معلومات الراتب
                </h2>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">الراتب الأساسي</p>
                  <p className="text-3xl font-bold text-purple-600">{employee.salary.toLocaleString("ar-EG")} ج.م</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  التأمين
                </h2>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">نوع التأمين</p>
                  <p className="text-xl font-bold text-indigo-600">{employee.insurance}</p>
                </div>
              </div>
            </div>

            {/* Attendance Information */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                سجل الحضور والغياب
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <p className="text-sm text-muted-foreground mb-2">الحضور</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-green-600">{employee.attendance}</span>
                    <span className="text-sm text-muted-foreground">يوم</span>
                  </div>
                  <div className="mt-3 bg-white rounded-lg p-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(employee.attendance / 24) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-200">
                  <p className="text-sm text-muted-foreground mb-2">الغياب</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-red-600">{employee.absence}</span>
                    <span className="text-sm text-muted-foreground">يوم</span>
                  </div>
                  <div className="mt-3 bg-white rounded-lg p-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${(employee.absence / 24) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
