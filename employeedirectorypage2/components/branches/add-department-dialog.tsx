"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Layers, Plus } from "lucide-react"

interface AddDepartmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  branchName: string
  onAdd: (departmentName: string) => void
}

export function AddDepartmentDialog({ open, onOpenChange, branchName, onAdd }: AddDepartmentDialogProps) {
  const [departmentName, setDepartmentName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(departmentName)
    setDepartmentName("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            إضافة قسم جديد
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">إضافة قسم جديد في {branchName}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="departmentName" className="text-foreground">
              اسم القسم
            </Label>
            <div className="relative">
              <Layers className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="مثال: قسم المبيعات"
                className="pr-10 bg-background border-border text-foreground"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 ml-2" />
              إضافة القسم
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-border"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
