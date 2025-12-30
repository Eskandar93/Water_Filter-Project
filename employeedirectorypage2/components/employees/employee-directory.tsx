"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { getEmployees } from "@/lib/data/employees-data"
import { EmployeeCard } from "./employee-card"
import { EmployeeTable } from "./employee-table"
import { AddEmployeeDialog } from "./add-employee-dialog"
import type { Employee } from "@/lib/types"

export function EmployeeDirectory() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"card" | "table">("card")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("")
  const [selectedRole, setSelectedRole] = useState<string>("")

  useEffect(() => {
    loadEmployees()
  }, [])

  const loadEmployees = () => {
    setEmployees(getEmployees())
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.phone.includes(searchQuery)

    const matchesDepartment = !selectedDepartment || employee.departmentName === selectedDepartment

    const matchesRole = !selectedRole || employee.role === selectedRole

    return matchesSearch && matchesDepartment && matchesRole
  })

  const departments = Array.from(new Set(employees.map((e) => e.departmentName))).sort()

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">دليل الموظفين</h1>
          <p className="text-muted-foreground">إدارة والعرض الشامل لمعلومات جميع الموظفين في الشركة</p>
        </div>
        <AddEmployeeDialog onEmployeeAdded={loadEmployees} />
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
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-3 flex-1">
            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">جميع الأقسام</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">جميع الصلاحيات</option>
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
                viewMode === "card"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              بطاقات
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "table"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              جدول
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          عرض {filteredEmployees.length} من {employees.length} موظفين
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
