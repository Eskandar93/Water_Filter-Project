"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Employee } from "@/lib/types"

interface EmployeeTableProps {
  employees: Employee[]
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "manager":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-green-500/10 text-green-500 border-green-500/20"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "إدمن"
      case "manager":
        return "مدير"
      default:
        return "موظف"
    }
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="text-foreground">الاسم</TableHead>
            <TableHead className="text-foreground">البريد الإلكتروني</TableHead>
            <TableHead className="text-foreground">الهاتف</TableHead>
            <TableHead className="text-foreground">الفرع</TableHead>
            <TableHead className="text-foreground">القسم</TableHead>
            <TableHead className="text-foreground">الصلاحية</TableHead>
            <TableHead className="text-foreground text-left">الراتب</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} className="hover:bg-muted/30">
              <TableCell className="font-medium text-foreground">{employee.name}</TableCell>
              <TableCell className="text-muted-foreground">{employee.email}</TableCell>
              <TableCell className="text-muted-foreground ltr">{employee.phone}</TableCell>
              <TableCell className="text-muted-foreground">{employee.branchName}</TableCell>
              <TableCell className="text-muted-foreground">{employee.departmentName}</TableCell>
              <TableCell>
                <Badge className={getRoleBadgeColor(employee.role)}>{getRoleLabel(employee.role)}</Badge>
              </TableCell>
              <TableCell className="text-left text-muted-foreground">{employee.salary.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
