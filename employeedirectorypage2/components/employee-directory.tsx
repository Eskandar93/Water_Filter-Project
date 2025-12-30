"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { EmployeeCard } from "./employee-card"
import { EmployeeTable } from "./employee-table"

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  password: string
  address: string
  branch: string
  department: string
  salary: number
  attendance: number
  absence: number
  permissions: "admin" | "manager" | "employee"
  permissionDetails?: "branch" | "maintenance" | "warehouse" | "collection"
  insurance: string
  hireDate: string
}

// Mock employee data
export const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "أحمد محمد علي",
    email: "ahmad@company.com",
    phone: "+201001234567",
    password: "pass123",
    address: "القاهرة - شارع النيل",
    branch: "الفرع الرئيسي",
    department: "تطوير البرمجيات",
    salary: 8000,
    attendance: 22,
    absence: 2,
    permissions: "manager",
    insurance: "تأمين شامل",
    hireDate: "2022-01-15",
  },
  {
    id: "2",
    name: "فاطمة محمود أحمد",
    email: "fatima@company.com",
    phone: "+201101234567",
    password: "pass456",
    address: "الجيزة - شارع الهرم",
    branch: "فرع الجيزة",
    department: "الموارد البشرية",
    salary: 6500,
    attendance: 23,
    absence: 1,
    permissions: "employee",
    permissionDetails: "branch",
    insurance: "تأمين أساسي",
    hireDate: "2022-06-20",
  },
  {
    id: "3",
    name: "محمد سالم حسن",
    email: "mohammed@company.com",
    phone: "+201201234567",
    password: "pass789",
    address: "الإسكندرية - شارع الكورنيش",
    branch: "فرع الإسكندرية",
    department: "الصيانة",
    salary: 5500,
    attendance: 20,
    absence: 4,
    permissions: "employee",
    permissionDetails: "maintenance",
    insurance: "تأمين أساسي",
    hireDate: "2021-03-10",
  },
  {
    id: "4",
    name: "سارة إبراهيم خالد",
    email: "sarah@company.com",
    phone: "+201301234567",
    password: "pass012",
    address: "المنصورة - شارع الجمهورية",
    branch: "فرع المنصورة",
    department: "المخازن",
    salary: 5000,
    attendance: 24,
    absence: 0,
    permissions: "employee",
    permissionDetails: "warehouse",
    insurance: "تأمين شامل",
    hireDate: "2020-09-05",
  },
  {
    id: "5",
    name: "علي عمر محمود",
    email: "ali@company.com",
    phone: "+201401234567",
    password: "pass345",
    address: "طنطا - شارع الميدان",
    branch: "فرع طنطا",
    department: "التحصيل",
    salary: 5800,
    attendance: 21,
    absence: 3,
    permissions: "employee",
    permissionDetails: "collection",
    insurance: "تأمين شامل",
    hireDate: "2021-11-22",
  },
  {
    id: "6",
    name: "نور سامي عطية",
    email: "noor@company.com",
    phone: "+201501234567",
    password: "pass678",
    address: "الزقازيق - شارع البورصة",
    branch: "الفرع الرئيسي",
    department: "تطوير البرمجيات",
    salary: 7500,
    attendance: 22,
    absence: 2,
    permissions: "admin",
    insurance: "تأمين شامل",
    hireDate: "2021-05-18",
  },
]

export function EmployeeDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"card" | "table">("card")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("")
  const [selectedPermission, setSelectedPermission] = useState<string>("")

  const filteredEmployees = mockEmployees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.phone.includes(searchQuery)

    const matchesDepartment = !selectedDepartment || employee.department === selectedDepartment

    const matchesPermission = !selectedPermission || employee.permissions === selectedPermission

    return matchesSearch && matchesDepartment && matchesPermission
  })

  const departments = Array.from(new Set(mockEmployees.map((e) => e.department))).sort()
  const permissions = Array.from(new Set(mockEmployees.map((e) => e.permissions))).sort()

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">دليل الموظفين</h1>
        <p className="text-muted-foreground">إدارة والعرض الشامل لمعلومات جميع الموظفين في الشركة</p>
      </div>

      {/* Controls */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="ابحث بالاسم أو البريد الإلكتروني أو رقم الهاتف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-3 flex-1">
            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">جميع الأقسام</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {/* Permission Filter */}
            <select
              value={selectedPermission}
              onChange={(e) => setSelectedPermission(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">جميع الصالحيات</option>
              <option value="admin">إدمن</option>
              <option value="manager">مدير</option>
              <option value="employee">موظف</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("card")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "card" ? "bg-purple-600 text-white" : "bg-gray-100 text-foreground hover:bg-gray-200"
              }`}
            >
              بطاقات
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "table" ? "bg-purple-600 text-white" : "bg-gray-100 text-foreground hover:bg-gray-200"
              }`}
            >
              جدول
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          عرض {filteredEmployees.length} من {mockEmployees.length} موظفين
        </p>
      </div>

      {/* Content */}
      {filteredEmployees.length > 0 ? (
        viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        ) : (
          <EmployeeTable employees={filteredEmployees} />
        )
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">لم يتم العثور على موظفين مطابقين للبحث</p>
        </div>
      )}
    </div>
  )
}
