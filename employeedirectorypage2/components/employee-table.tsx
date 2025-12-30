import type { Employee } from "./employee-directory"

interface EmployeeTableProps {
  employees: Employee[]
}

const permissionLabels = {
  admin: "إدمن",
  manager: "مدير",
  employee: "موظف",
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
  return (
    <div className="rounded-2xl border border-purple-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="px-6 py-4 text-right font-semibold">الاسم</th>
              <th className="px-6 py-4 text-right font-semibold">البريد الإلكتروني</th>
              <th className="px-6 py-4 text-right font-semibold">الهاتف</th>
              <th className="px-6 py-4 text-right font-semibold">القسم</th>
              <th className="px-6 py-4 text-right font-semibold">الفرع</th>
              <th className="px-6 py-4 text-right font-semibold">الراتب</th>
              <th className="px-6 py-4 text-right font-semibold">الصالحية</th>
              <th className="px-6 py-4 text-right font-semibold">حضور/غياب</th>
              <th className="px-6 py-4 text-right font-semibold">التأمين</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={employee.id}
                className={`border-t border-border hover:bg-purple-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-medium text-foreground">{employee.name}</td>
                <td className="px-6 py-4 text-muted-foreground break-all">{employee.email}</td>
                <td className="px-6 py-4 text-muted-foreground ltr">{employee.phone}</td>
                <td className="px-6 py-4 text-foreground">{employee.department}</td>
                <td className="px-6 py-4 text-foreground">{employee.branch}</td>
                <td className="px-6 py-4 font-semibold text-purple-600">
                  {employee.salary.toLocaleString("ar-EG")} ج.م
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                    {permissionLabels[employee.permissions]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="text-green-600 font-semibold">{employee.attendance}</span>
                  {" / "}
                  <span className="text-red-600 font-semibold">{employee.absence}</span>
                </td>
                <td className="px-6 py-4 text-foreground">{employee.insurance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
