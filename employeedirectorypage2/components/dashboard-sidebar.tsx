"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, UserCog, LogOut, Building2, ClipboardList, GitBranch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"

const navItems = [
  {
    title: "لوحة التحكم",
    href: "/dashboard",
    icon: LayoutDashboard,
    allowedRoles: ["employee", "admin"],
  },
  {
    title: "سجلات الحضور",
    href: "/dashboard/attendance-records",
    icon: ClipboardList,
    allowedRoles: ["admin"],
  },
  {
    title: "العملاء",
    href: "/dashboard/customers",
    icon: Users,
    allowedRoles: ["employee", "admin"],
  },
  {
    title: "الموظفين",
    href: "/dashboard/employees",
    icon: UserCog,
    allowedRoles: ["admin"],
  },
  {
    title: "الفروع",
    href: "/dashboard/branches",
    icon: GitBranch,
    allowedRoles: ["admin"],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [sidebarWidth, setSidebarWidth] = useState(256) // 256px = 16rem (w-64)
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const filteredNavItems = navItems.filter((item) => item.allowedRoles.includes(user?.role || ""))

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "إدمن"
      default:
        return "موظف"
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return

      const newWidth = window.innerWidth - e.clientX

      if (newWidth >= 200 && newWidth <= 400) {
        setSidebarWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  return (
    <aside
      ref={sidebarRef}
      style={{ width: `${sidebarWidth}px` }}
      className="min-h-screen bg-card border-l-2 border-border flex flex-col relative ml-6"
    >
      <div
        onMouseDown={() => setIsResizing(true)}
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-primary/50 transition-colors z-50",
          isResizing && "bg-primary",
        )}
      />

      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">نظام الإدارة</h2>
            <p className="text-xs text-muted-foreground">{getRoleLabel(user?.role || "employee")}</p>
          </div>
        </div>
      </div>

      <div className="p-4 pb-6">
        <Link
          href="/dashboard/attendance"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
            pathname === "/dashboard/attendance"
              ? "bg-accent text-accent-foreground shadow-md"
              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
          )}
        >
          <ClipboardList className="w-5 h-5" />
          <span>تسجيل الحضور والانصراف</span>
        </Link>
      </div>

      <nav className="flex-1 mx-4 mb-4 p-3 space-y-2 bg-slate-900/40 border-2 border-slate-800 rounded-xl">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="mb-4 px-4">
          <p className="font-medium text-foreground">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <Button variant="outline" className="w-full justify-start gap-3 bg-transparent border-border" onClick={logout}>
          <LogOut className="w-5 h-5" />
          تسجيل الخروج
        </Button>
      </div>
    </aside>
  )
}
