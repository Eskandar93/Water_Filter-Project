"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { addEmployee } from "@/lib/data/employees-data"
import { getBranches } from "@/lib/data/branches-data"
import { getDepartmentsByBranch } from "@/lib/data/departments-data"
import type { UserRole } from "@/lib/types"

interface AddEmployeeDialogProps {
  onEmployeeAdded: () => void
}

export function AddEmployeeDialog({ onEmployeeAdded }: AddEmployeeDialogProps) {
  const [open, setOpen] = useState(false)
  const [branches] = useState(getBranches())
  const [selectedBranchId, setSelectedBranchId] = useState("")
  const [departments, setDepartments] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    branchId: "",
    branchName: "",
    departmentId: "",
    departmentName: "",
    salary: "",
    role: "employee" as UserRole,
    insurance: "",
    hireDate: new Date().toISOString().split("T")[0],
  })

  const handleBranchChange = (branchId: string) => {
    const branch = branches.find((b) => b.id === branchId)
    setSelectedBranchId(branchId)
    setFormData({
      ...formData,
      branchId,
      branchName: branch?.name || "",
      departmentId: "",
      departmentName: "",
    })
    setDepartments(getDepartmentsByBranch(branchId))
  }

  const handleDepartmentChange = (departmentId: string) => {
    const dept = departments.find((d) => d.id === departmentId)
    setFormData({
      ...formData,
      departmentId,
      departmentName: dept?.name || "",
    })
  }

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.branchId ||
      !formData.departmentId ||
      !formData.salary
    ) {
      alert("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    addEmployee({
      ...formData,
      salary: Number.parseFloat(formData.salary),
      attendance: 0,
      absence: 0,
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      branchId: "",
      branchName: "",
      departmentId: "",
      departmentName: "",
      salary: "",
      role: "employee",
      insurance: "",
      hireDate: new Date().toISOString().split("T")[0],
    })
    setSelectedBranchId("")
    setDepartments([])
    setOpen(false)
    onEmployeeAdded()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 ml-2" />
          إضافة موظف
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle>إضافة موظف جديد</DialogTitle>
          <DialogDescription className="text-muted-foreground">أدخل بيانات الموظف الجديد</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">العنوان</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="branch">الفرع *</Label>
              <Select value={formData.branchId} onValueChange={handleBranchChange}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="اختر الفرع" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">القسم *</Label>
              <Select value={formData.departmentId} onValueChange={handleDepartmentChange} disabled={!selectedBranchId}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">الراتب *</Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">الصلاحية</Label>
              <Select
                value={formData.role}
                onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">موظف</SelectItem>
                  <SelectItem value="manager">مدير</SelectItem>
                  <SelectItem value="admin">إدمن</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insurance">التأمين</Label>
              <Input
                id="insurance"
                value={formData.insurance}
                onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hireDate">تاريخ التوظيف</Label>
              <Input
                id="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                className="bg-background border-border"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="bg-transparent border-border">
            إلغاء
          </Button>
          <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90">
            إضافة الموظف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
