export interface Branch {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  radius: number // in meters - how close employee needs to be
}

const BRANCHES_STORAGE_KEY = "company_branches"

const defaultBranches: Branch[] = [
  {
    id: "1",
    name: "الفرع الرئيسي - القاهرة",
    address: "شارع التحرير، وسط البلد، القاهرة",
    latitude: 30.0444,
    longitude: 31.2357,
    radius: 200,
  },
  {
    id: "2",
    name: "فرع الإسكندرية",
    address: "طريق الكورنيش، المنشية، الإسكندرية",
    latitude: 31.2001,
    longitude: 29.9187,
    radius: 200,
  },
  {
    id: "3",
    name: "فرع الجيزة",
    address: "شارع الهرم، الجيزة",
    latitude: 30.0131,
    longitude: 31.2089,
    radius: 200,
  },
  {
    id: "4",
    name: "فرع المنصورة",
    address: "شارع الجمهورية، المنصورة",
    latitude: 31.0409,
    longitude: 31.3785,
    radius: 200,
  },
]

// Get branches from localStorage or return defaults
export function getBranches(): Branch[] {
  if (typeof window === "undefined") return defaultBranches
  const stored = localStorage.getItem(BRANCHES_STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  localStorage.setItem(BRANCHES_STORAGE_KEY, JSON.stringify(defaultBranches))
  return defaultBranches
}

// Save branches to localStorage
export function saveBranches(branches: Branch[]) {
  localStorage.setItem(BRANCHES_STORAGE_KEY, JSON.stringify(branches))
}

// Add a new branch
export function addBranch(branch: Omit<Branch, "id">): Branch {
  const branches = getBranches()
  const newBranch: Branch = {
    ...branch,
    id: String(Date.now()),
  }
  const updatedBranches = [...branches, newBranch]
  saveBranches(updatedBranches)
  return newBranch
}

// Delete a branch
export function deleteBranch(id: string): boolean {
  const branches = getBranches()
  const updatedBranches = branches.filter((b) => b.id !== id)
  if (updatedBranches.length !== branches.length) {
    saveBranches(updatedBranches)
    return true
  }
  return false
}

// For backwards compatibility
export const branches = defaultBranches

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in meters
}

// Find nearest branch to given coordinates
export function findNearestBranch(latitude: number, longitude: number): { branch: Branch; distance: number } | null {
  const currentBranches = getBranches()
  let nearest: { branch: Branch; distance: number } | null = null

  for (const branch of currentBranches) {
    const distance = calculateDistance(latitude, longitude, branch.latitude, branch.longitude)
    if (!nearest || distance < nearest.distance) {
      nearest = { branch, distance }
    }
  }

  return nearest
}

// Check if coordinates are within any branch radius
export function isWithinBranch(
  latitude: number,
  longitude: number,
): { isWithin: boolean; branch: Branch | null; distance: number } {
  const nearest = findNearestBranch(latitude, longitude)

  if (!nearest) {
    return { isWithin: false, branch: null, distance: 0 }
  }

  return {
    isWithin: nearest.distance <= nearest.branch.radius,
    branch: nearest.branch,
    distance: nearest.distance,
  }
}
