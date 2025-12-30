export type UserRole = "admin" | "manager" | "employee"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  password: string
}

export interface Department {
  id: string
  name: string
  branchId: string
  employeeCount: number
}

export interface Branch {
  id: string
  name: string
  address: string
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
  radius: number
  managerId?: string
  managerName: string
}

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  password: string
  address: string
  branchId: string
  branchName: string
  departmentId: string
  departmentName: string
  salary: number
  attendance: number
  absence: number
  role: UserRole
  insurance: string
  hireDate: string
}
