import type { Employee } from "../types"

const EMPLOYEES_STORAGE_KEY = "company_employees"

export const defaultEmployees: Employee[] = [
  {
    id: "1",
    name: "أحمد محمد علي",
    email: "admin@company.com",
    phone: "+201001234567",
    password: "admin123",
    address: "القاهرة - شارع النيل",
    branchId: "1",
    branchName: "الفرع الرئيسي",
    departmentId: "1",
    departmentName: "تطوير البرمجيات",
    salary: 10000,
    attendance: 22,
    absence: 2,
    role: "admin",
    insurance: "تأمين شامل",
    hireDate: "2022-01-15",
  },
  {
    id: "2",
    name: "فاطمة محمود أحمد",
    email: "fatima@company.com",
    phone: "+201101234567",
    password: "pass456",
    address: "الجيزة - شارع الهرم",
    branchId: "3",
    branchName: "فرع الجيزة",
    departmentId: "2",
    departmentName: "الموارد البشرية",
    salary: 6500,
    attendance: 23,
    absence: 1,
    role: "manager",
    insurance: "تأمين أساسي",
    hireDate: "2022-06-20",
  },
  {
    id: "3",
    name: "محمد سالم حسن",
    email: "mohammed@company.com",
    phone: "+201201234567",
    password: "pass789",
    address: "الإسكندرية - شارع الكورنيش",
    branchId: "2",
    branchName: "فرع الإسكندرية",
    departmentId: "3",
    departmentName: "الصيانة",
    salary: 5500,
    attendance: 20,
    absence: 4,
    role: "employee",
    insurance: "تأمين أساسي",
    hireDate: "2021-03-10",
  },
  {
    id: "4",
    name: "سارة إبراهيم خالد",
    email: "sarah@company.com",
    phone: "+201301234567",
    password: "pass012",
    address: "المنصورة - شارع الجمهورية",
    branchId: "4",
    branchName: "فرع المنصورة",
    departmentId: "4",
    departmentName: "المخازن",
    salary: 5000,
    attendance: 24,
    absence: 0,
    role: "employee",
    insurance: "تأمين شامل",
    hireDate: "2020-09-05",
  },
  {
    id: "5",
    name: "علي عمر محمود",
    email: "ali@company.com",
    phone: "+201401234567",
    password: "pass345",
    address: "طنطا - شارع الميدان",
    branchId: "1",
    branchName: "الفرع الرئيسي",
    departmentId: "5",
    departmentName: "التحصيل",
    salary: 5800,
    attendance: 21,
    absence: 3,
    role: "manager",
    insurance: "تأمين شامل",
    hireDate: "2021-11-22",
  },
]

export function getEmployees(): Employee[] {
  if (typeof window === "undefined") return defaultEmployees
  const stored = localStorage.getItem(EMPLOYEES_STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(defaultEmployees))
  return defaultEmployees
}

export function saveEmployees(employees: Employee[]) {
  localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees))
}

export function addEmployee(employee: Omit<Employee, "id">): Employee {
  const employees = getEmployees()
  const newEmployee: Employee = {
    ...employee,
    id: String(Date.now()),
  }
  const updatedEmployees = [...employees, newEmployee]
  saveEmployees(updatedEmployees)
  return newEmployee
}

export function updateEmployee(id: string, updates: Partial<Employee>): boolean {
  const employees = getEmployees()
  const index = employees.findIndex((e) => e.id === id)
  if (index !== -1) {
    employees[index] = { ...employees[index], ...updates }
    saveEmployees(employees)
    return true
  }
  return false
}

export function deleteEmployee(id: string): boolean {
  const employees = getEmployees()
  const updatedEmployees = employees.filter((e) => e.id !== id)
  if (updatedEmployees.length !== employees.length) {
    saveEmployees(updatedEmployees)
    return true
  }
  return false
}

export function getEmployeesByBranch(branchId: string): Employee[] {
  return getEmployees().filter((e) => e.branchId === branchId)
}

export function getEmployeesByDepartment(departmentId: string): Employee[] {
  return getEmployees().filter((e) => e.departmentId === departmentId)
}
