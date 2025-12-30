"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Building2, Briefcase, Calendar } from "lucide-react"
import type { Employee } from "@/lib/types"

interface EmployeeCardProps {
  employee: Employee
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
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
    <Card className="bg-card border-border hover:border-primary/50 transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-semibold text-primary">{employee.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">{employee.departmentName}</p>
            </div>
          </div>
          <Badge className={getRoleBadgeColor(employee.role)}>{getRoleLabel(employee.role)}</Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span className="ltr">{employee.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <span>{employee.branchName}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span>{employee.salary.toLocaleString()} جنيه</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>انضم في {new Date(employee.hireDate).toLocaleDateString("ar-EG")}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
          <div className="text-center">
            <p className="text-primary font-semibold">{employee.attendance}</p>
            <p className="text-muted-foreground text-xs">حضور</p>
          </div>
          <div className="text-center">
            <p className="text-destructive font-semibold">{employee.absence}</p>
            <p className="text-muted-foreground text-xs">غياب</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
