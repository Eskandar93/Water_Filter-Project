import type { Branch } from "../types"
import { getEmployeesByBranch } from "./employees-data"
import { getDepartmentsByBranch, addDepartment } from "./departments-data"

const BRANCHES_STORAGE_KEY = "company_branches"

const defaultBranches: Branch[] = [
  {
    id: "1",
    name: "الفرع الرئيسي",
    address: "شارع التحرير، وسط البلد، القاهرة",
    phoneNumber: "0223456789",
    branchAddress: {
      government: "القاهرة",
      city: "وسط البلد",
      postalCode: "11511",
      famousPlace1: "بجوار ميدان التحرير",
      famousPlace2: "أمام المتحف المصري",
      location: "شارع التحرير، وسط البلد، القاهرة",
    },
    latitude: 30.0444,
    longitude: 31.2357,
    radius: 200,
    managerId: "5",
    managerName: "علي عمر محمود",
  },
  {
    id: "2",
    name: "فرع الإسكندرية",
    address: "طريق الكورنيش، المنشية، الإسكندرية",
    phoneNumber: "0334567890",
    branchAddress: {
      government: "الإسكندرية",
      city: "المنشية",
      postalCode: "21599",
      famousPlace1: "بجوار مكتبة الإسكندرية",
      famousPlace2: "على الكورنيش",
      location: "طريق الكورنيش، المنشية، الإسكندرية",
    },
    latitude: 31.2001,
    longitude: 29.9187,
    radius: 200,
    managerId: "3",
    managerName: "محمد سالم حسن",
  },
  {
    id: "3",
    name: "فرع الجيزة",
    address: "شارع الهرم، الجيزة",
    phoneNumber: "0233344556",
    branchAddress: {
      government: "الجيزة",
      city: "الهرم",
      postalCode: "12556",
      famousPlace1: "بجوار أهرامات الجيزة",
      famousPlace2: "أمام مول العرب",
      location: "شارع الهرم، الجيزة",
    },
    latitude: 30.0131,
    longitude: 31.2089,
    radius: 200,
    managerId: "2",
    managerName: "فاطمة محمود أحمد",
  },
  {
    id: "4",
    name: "فرع المنصورة",
    address: "شارع الجمهورية، المنصورة",
    phoneNumber: "0502223344",
    branchAddress: {
      government: "الدقهلية",
      city: "المنصورة",
      postalCode: "35511",
      famousPlace1: "بجوار جامعة المنصورة",
      famousPlace2: "أمام سيتي سنتر",
      location: "شارع الجمهورية، المنصورة",
    },
    latitude: 31.0409,
    longitude: 31.3785,
    radius: 200,
  },
]

export function getBranches(): Branch[] {
  if (typeof window === "undefined") return defaultBranches
  const stored = localStorage.getItem(BRANCHES_STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  localStorage.setItem(BRANCHES_STORAGE_KEY, JSON.stringify(defaultBranches))
  return defaultBranches
}

export function saveBranches(branches: Branch[]) {
  localStorage.setItem(BRANCHES_STORAGE_KEY, JSON.stringify(branches))
}

export function addBranch(branchData: {
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
}): Branch {
  const branches = getBranches()
  const newBranch: Branch = {
    id: String(Date.now()),
    name: branchData.name,
    address: branchData.branchAddress.location,
    phoneNumber: branchData.phoneNumber,
    branchAddress: branchData.branchAddress,
    managerName: branchData.managerName,
    latitude: branchData.latitude,
    longitude: branchData.longitude,
    radius: branchData.registrationRadius, // Use the registrationRadius from input instead of hardcoded 200
  }
  const updatedBranches = [...branches, newBranch]
  saveBranches(updatedBranches)
  return newBranch
}

export function deleteBranch(id: string): boolean {
  const branches = getBranches()
  const updatedBranches = branches.filter((b) => b.id !== id)
  if (updatedBranches.length !== branches.length) {
    saveBranches(updatedBranches)
    return true
  }
  return false
}

export function updateBranch(id: string, updates: Partial<Branch>): boolean {
  const branches = getBranches()
  const index = branches.findIndex((b) => b.id === id)
  if (index !== -1) {
    branches[index] = { ...branches[index], ...updates }
    saveBranches(branches)
    return true
  }
  return false
}

export function getBranchStats(branchId: string) {
  const employees = getEmployeesByBranch(branchId)
  const departments = getDepartmentsByBranch(branchId)
  const branch = getBranches().find((b) => b.id === branchId)

  return {
    employeeCount: employees.length,
    departmentCount: departments.length,
    managerName: branch?.managerName || "لا يوجد مدير",
    departments,
  }
}

export function addDepartmentToBranch(branchId: string, departmentName: string): void {
  addDepartment({ name: departmentName, branchId })
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

export function isWithinBranch(
  userLat: number,
  userLon: number,
): {
  isWithin: boolean
  branch: Branch | null
  distance: number
} {
  const branches = getBranches()
  let nearestBranch: Branch | null = null
  let minDistance = Number.POSITIVE_INFINITY

  for (const branch of branches) {
    const distance = calculateDistance(userLat, userLon, branch.latitude, branch.longitude)
    if (distance < minDistance) {
      minDistance = distance
      nearestBranch = branch
    }
  }

  const isWithin = nearestBranch ? minDistance <= nearestBranch.radius : false

  return {
    isWithin,
    branch: nearestBranch,
    distance: minDistance,
  }
}
