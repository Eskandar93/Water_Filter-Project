import type { Department } from "../types"
import { getEmployeesByDepartment } from "./employees-data"

const DEPARTMENTS_STORAGE_KEY = "company_departments"

export const defaultDepartments: Department[] = [
  { id: "1", name: "تطوير البرمجيات", branchId: "1", employeeCount: 0 },
  { id: "2", name: "الموارد البشرية", branchId: "1", employeeCount: 0 },
  { id: "3", name: "الصيانة", branchId: "2", employeeCount: 0 },
  { id: "4", name: "المخازن", branchId: "2", employeeCount: 0 },
  { id: "5", name: "التحصيل", branchId: "1", employeeCount: 0 },
  { id: "6", name: "المبيعات", branchId: "3", employeeCount: 0 },
  { id: "7", name: "خدمة العملاء", branchId: "3", employeeCount: 0 },
  { id: "8", name: "التسويق", branchId: "4", employeeCount: 0 },
]

export function getDepartments(): Department[] {
  if (typeof window === "undefined") return defaultDepartments
  const stored = localStorage.getItem(DEPARTMENTS_STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  localStorage.setItem(DEPARTMENTS_STORAGE_KEY, JSON.stringify(defaultDepartments))
  return defaultDepartments
}

export function saveDepartments(departments: Department[]) {
  localStorage.setItem(DEPARTMENTS_STORAGE_KEY, JSON.stringify(departments))
}

export function addDepartment(department: Omit<Department, "id" | "employeeCount">): Department {
  const departments = getDepartments()
  const newDepartment: Department = {
    ...department,
    id: String(Date.now()),
    employeeCount: 0,
  }
  const updatedDepartments = [...departments, newDepartment]
  saveDepartments(updatedDepartments)
  return newDepartment
}

export function deleteDepartment(id: string): boolean {
  const departments = getDepartments()
  const updatedDepartments = departments.filter((d) => d.id !== id)
  if (updatedDepartments.length !== departments.length) {
    saveDepartments(updatedDepartments)
    return true
  }
  return false
}

export function getDepartmentsByBranch(branchId: string): Department[] {
  const departments = getDepartments()
  return departments
    .filter((d) => d.branchId === branchId)
    .map((dept) => ({
      ...dept,
      employeeCount: getEmployeesByDepartment(dept.id).length,
    }))
}

export function updateDepartmentEmployeeCount(departmentId: string): void {
  const departments = getDepartments()
  const index = departments.findIndex((d) => d.id === departmentId)
  if (index !== -1) {
    departments[index].employeeCount = getEmployeesByDepartment(departmentId).length
    saveDepartments(departments)
  }
}
