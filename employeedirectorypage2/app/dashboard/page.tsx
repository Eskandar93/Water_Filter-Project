"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCog, ShoppingCart, Building2 } from "lucide-react"
import { mockCustomers } from "@/lib/customers-data"
import { getEmployees } from "@/lib/data/employees-data"
import { getBranches } from "@/lib/data/branches-data"

export default function DashboardPage() {
  const { user } = useAuth()

  const totalCustomers = mockCustomers.length
  const purchaseCustomers = mockCustomers.filter((c) => c.serviceType === "purchase").length
  const maintenanceCustomers = mockCustomers.filter((c) => c.serviceType === "maintenance").length
  const totalEmployees = getEmployees().length
  const totalBranches = getBranches().length

  const stats = [
    {
      title: "إجمالي العملاء",
      value: totalCustomers,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "عملاء الشراء",
      value: purchaseCustomers,
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      title: "عملاء الصيانة",
      value: maintenanceCustomers,
      icon: UserCog,
      color: "bg-orange-500",
    },
  ]

  // Add employees and branches stats only for admin
  if (user?.role === "admin") {
    stats.push(
      {
        title: "إجمالي الموظفين",
        value: totalEmployees,
        icon: UserCog,
        color: "bg-purple-500",
      },
      {
        title: "إجمالي الفروع",
        value: totalBranches,
        icon: Building2,
        color: "bg-pink-500",
      },
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">مرحباً، {user?.name}</h1>
        <p className="text-muted-foreground mt-1">هذه نظرة عامة على نظام الإدارة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border shadow-md bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
