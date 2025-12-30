"use client"

import { Building2, MapPin, Users, Layers } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Branch } from "@/lib/types"

interface BranchCardProps {
  branch: Branch
  employeeCount: number
  departmentCount: number
  onClick: () => void
}

export function BranchCard({ branch, employeeCount, departmentCount, onClick }: BranchCardProps) {
  return (
    <Card
      className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1">{branch.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{branch.address}</span>
            </div>

            {branch.managerName && (
              <div className="mb-3">
                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                  المدير: {branch.managerName}
                </Badge>
              </div>
            )}

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{employeeCount} موظف</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Layers className="w-4 h-4" />
                <span>{departmentCount} قسم</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
