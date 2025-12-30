"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Users, Layers, MapPin, User, Plus } from "lucide-react"
import type { Branch, Department } from "@/lib/types"
import { AddDepartmentDialog } from "./add-department-dialog"

interface BranchDetailsDialogProps {
  branch: Branch | null
  employeeCount: number
  departments: Department[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddDepartment?: (branchId: string, departmentName: string) => void
}

export function BranchDetailsDialog({
  branch,
  employeeCount,
  departments,
  open,
  onOpenChange,
  onAddDepartment,
}: BranchDetailsDialogProps) {
  const [isAddDeptOpen, setIsAddDeptOpen] = useState(false)

  if (!branch) return null

  const handleAddDepartment = (departmentName: string) => {
    if (onAddDepartment) {
      onAddDepartment(branch.id, departmentName)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-3xl bg-card text-card-foreground max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Building2 className="w-5 h-5 text-primary" />
              {branch.name}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">تفاصيل الفرع والأقسام</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Branch Info */}
            <div className="grid gap-4">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span className="text-foreground">{branch.address}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">المدير: {branch.managerName || "لا يوجد"}</span>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Users className="w-3 h-3 ml-1" />
                  {employeeCount} موظف
                </Badge>
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  <Layers className="w-3 h-3 ml-1" />
                  {departments.length} قسم
                </Badge>
              </div>
            </div>

            {/* Departments Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">الأقسام</h3>
                <Button
                  size="sm"
                  onClick={() => setIsAddDeptOpen(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة قسم
                </Button>
              </div>
              {departments.length > 0 ? (
                <div className="border border-border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="text-foreground">اسم القسم</TableHead>
                        <TableHead className="text-foreground text-left">عدد الموظفين</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departments.map((dept) => (
                        <TableRow key={dept.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium text-foreground">{dept.name}</TableCell>
                          <TableCell className="text-left text-muted-foreground">{dept.employeeCount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground border border-border rounded-lg">
                  <Layers className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>لا توجد أقسام في هذا الفرع</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddDepartmentDialog
        open={isAddDeptOpen}
        onOpenChange={setIsAddDeptOpen}
        branchName={branch.name}
        onAdd={handleAddDepartment}
      />
    </>
  )
}
