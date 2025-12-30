"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { getBranches, getBranchStats, addBranch, addDepartmentToBranch, type Branch } from "@/lib/data/branches-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, ArrowLeft, Plus } from "lucide-react"
import { BranchCard } from "@/components/branches/branch-card"
import { BranchDetailsDialog } from "@/components/branches/branch-details-dialog"
import { AddBranchDialog } from "@/components/branches/add-branch-dialog"

export default function BranchesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [branches, setBranches] = useState<Branch[]>([])
  const [branchStats, setBranchStats] = useState<Record<string, any>>({})
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false)

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/dashboard")
    }
  }, [user, router])

  const loadBranchesData = () => {
    const loadedBranches = getBranches()
    setBranches(loadedBranches)

    const stats: Record<string, any> = {}
    loadedBranches.forEach((branch) => {
      stats[branch.id] = getBranchStats(branch.id)
    })
    setBranchStats(stats)
  }

  useEffect(() => {
    loadBranchesData()
  }, [])

  const handleBranchClick = (branch: Branch) => {
    setSelectedBranch(branch)
    setIsDetailsOpen(true)
  }

  const handleAddBranch = (branchData: {
    name: string
    phoneNumber: string
    branchAddress: {
      government: string
      city: string
      postalCode: string
      famousPlace1: string
      famousPlace2: string
      location: string
    }
    latitude: number
    longitude: number
    registrationRadius: number // Added registrationRadius parameter
    managerName: string
  }) => {
    addBranch(branchData)
    loadBranchesData()
  }

  const handleAddDepartment = (branchId: string, departmentName: string) => {
    addDepartmentToBranch(branchId, departmentName)
    loadBranchesData()
    const updatedBranch = getBranches().find((b) => b.id === branchId)
    if (updatedBranch) {
      setSelectedBranch(updatedBranch)
    }
  }

  if (user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">ليس لديك صلاحية للوصول إلى هذه الصفحة</p>
            <Button className="mt-4" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة للوحة التحكم
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalEmployees = Object.values(branchStats).reduce((sum: number, stat: any) => sum + stat.employeeCount, 0)
  const totalDepartments = Object.values(branchStats).reduce((sum: number, stat: any) => sum + stat.departmentCount, 0)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الفروع</h1>
          <p className="text-muted-foreground mt-1">عرض تفاصيل جميع فروع الشركة</p>
        </div>
        <Button
          onClick={() => setIsAddBranchOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 ml-2" />
          إضافة فرع
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي الفروع</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{branches.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي الموظفين</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalEmployees}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي الأقسام</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalDepartments}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">قائمة الفروع</CardTitle>
          <CardDescription className="text-muted-foreground">انقر على أي فرع لعرض التفاصيل والأقسام</CardDescription>
        </CardHeader>
        <CardContent>
          {branches.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">لا توجد فروع مسجلة</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {branches.map((branch) => (
                <BranchCard
                  key={branch.id}
                  branch={branch}
                  employeeCount={branchStats[branch.id]?.employeeCount || 0}
                  departmentCount={branchStats[branch.id]?.departmentCount || 0}
                  onClick={() => handleBranchClick(branch)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <BranchDetailsDialog
        branch={selectedBranch}
        employeeCount={selectedBranch ? branchStats[selectedBranch.id]?.employeeCount || 0 : 0}
        departments={selectedBranch ? branchStats[selectedBranch.id]?.departments || [] : []}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onAddDepartment={handleAddDepartment}
      />

      <AddBranchDialog open={isAddBranchOpen} onOpenChange={setIsAddBranchOpen} onAdd={handleAddBranch} />
    </div>
  )
}
