import type { Employee } from "./employee-directory"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

interface EmployeeCardProps {
  employee: Employee
}

const permissionLabels = {
  admin: "إدمن",
  manager: "مدير",
  employee: "موظف",
}

const permissionColors = {
  admin: "bg-purple-100 text-purple-800",
  manager: "bg-indigo-100 text-indigo-800",
  employee: "bg-violet-100 text-violet-800",
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <Link href={`/employees/${employee.id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-purple-100 overflow-hidden cursor-pointer hover:scale-105">
        <div className="h-24 bg-gradient-to-r from-purple-600 to-indigo-600"></div>

        <div className="p-6 -mt-12 relative">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-md">
            {employee.name.charAt(0)}
          </div>

          {/* Name and Permission */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-foreground mb-2">{employee.name}</h3>
            <Badge className={`${permissionColors[employee.permissions]} text-xs font-semibold`}>
              {permissionLabels[employee.permissions]}
              {employee.permissionDetails && ` - ${employee.permissionDetails}`}
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-start gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="break-all">{employee.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="ltr">{employee.phone}</span>
            </div>
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{employee.address}</span>
            </div>
          </div>

          {/* Department and Branch */}
          <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1">القسم</p>
              <p className="text-sm font-medium text-foreground">{employee.department}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1">الفرع</p>
              <p className="text-sm font-medium text-foreground">{employee.branch}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1">الراتب</p>
              <p className="text-sm font-bold text-purple-600">{employee.salary.toLocaleString("ar-EG")} ج.م</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1">التأمين</p>
              <p className="text-sm font-medium text-foreground">{employee.insurance}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-purple-50 rounded-lg mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-xs text-muted-foreground">حضور</p>
                <p className="text-sm font-bold text-green-600">{employee.attendance}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
              <div>
                <p className="text-xs text-muted-foreground">غياب</p>
                <p className="text-sm font-bold text-red-600">{employee.absence}</p>
              </div>
            </div>
          </div>

          {/* Hire Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>تاريخ التعيين: {new Date(employee.hireDate).toLocaleDateString("ar-EG")}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
