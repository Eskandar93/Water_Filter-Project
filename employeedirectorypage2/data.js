// =============================================
// DATA STORAGE KEYS
// =============================================
const STORAGE_KEYS = {
  USERS: "registered_users",
  BRANCHES: "company_branches",
  CUSTOMERS: "customers_data",
  ATTENDANCE: "attendance_records",
  CURRENT_USER: "current_user",
}

// =============================================
// DEFAULT DATA
// =============================================
const defaultUsers = [
  {
    id: "1",
    email: "employer@company.com",
    password: "employer123",
    name: "صاحب العمل",
    role: "employer",
  },
  {
    id: "2",
    email: "employee@company.com",
    password: "employee123",
    name: "موظف",
    role: "employee",
  },
]

const defaultBranches = [
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

const defaultCustomers = [
  {
    id: "1",
    name: "محمد أحمد إبراهيم",
    phone: "+201012345678",
    address: {
      governorate: "القاهرة",
      city: "مدينة نصر",
      center: "الحي الثامن",
      village: "",
      houseNumber: "15",
      landmark: "بجوار مسجد الحمد",
    },
    postalCode: "11765",
    branch: "الفرع الرئيسي",
    installments: [
      { amount: 500, date: "2025-01-15", paid: true },
      { amount: 500, date: "2025-02-15", paid: true },
      { amount: 500, date: "2025-03-15", paid: false },
      { amount: 500, date: "2025-04-15", paid: false },
    ],
    trustReceipts: ["وصل-001", "وصل-002"],
    product: "غسالة أوتوماتيك",
    purchaseDate: "2025-01-01",
    productCount: 1,
    serviceType: "purchase",
    registrationDate: "2024-12-25",
  },
  {
    id: "2",
    name: "فاطمة علي محمود",
    phone: "+201123456789",
    address: {
      governorate: "الجيزة",
      city: "6 أكتوبر",
      center: "الحي الأول",
      village: "",
      houseNumber: "8",
      landmark: "أمام مول العرب",
    },
    postalCode: "12566",
    branch: "فرع الجيزة",
    installments: [
      { amount: 800, date: "2025-02-01", paid: true },
      { amount: 800, date: "2025-03-01", paid: false },
      { amount: 800, date: "2025-04-01", paid: false },
    ],
    trustReceipts: ["وصل-003"],
    product: "ثلاجة",
    purchaseDate: "2025-02-01",
    productCount: 1,
    serviceType: "purchase",
    registrationDate: "2025-01-20",
  },
]

const mockEmployees = [
  {
    id: "1",
    name: "أحمد محمد علي",
    email: "ahmad@company.com",
    phone: "+201001234567",
    address: "القاهرة - شارع النيل",
    branch: "الفرع الرئيسي",
    department: "تطوير البرمجيات",
    salary: 8000,
    attendance: 22,
    absence: 2,
    permissions: "manager",
    insurance: "تأمين شامل",
    hireDate: "2022-01-15",
  },
  {
    id: "2",
    name: "فاطمة محمود أحمد",
    email: "fatima@company.com",
    phone: "+201101234567",
    address: "الجيزة - شارع الهرم",
    branch: "فرع الجيزة",
    department: "الموارد البشرية",
    salary: 6500,
    attendance: 23,
    absence: 1,
    permissions: "employee",
    insurance: "تأمين أساسي",
    hireDate: "2022-06-20",
  },
  {
    id: "3",
    name: "محمد سالم حسن",
    email: "mohammed@company.com",
    phone: "+201201234567",
    address: "الإسكندرية - شارع الكورنيش",
    branch: "فرع الإسكندرية",
    department: "الصيانة",
    salary: 5500,
    attendance: 20,
    absence: 4,
    permissions: "employee",
    insurance: "تأمين أساسي",
    hireDate: "2021-03-10",
  },
]

// =============================================
// STORAGE HELPERS
// =============================================
function getFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      return JSON.parse(stored)
    }
    localStorage.setItem(key, JSON.stringify(defaultValue))
    return defaultValue
  } catch (e) {
    return defaultValue
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error("Error saving to storage:", e)
  }
}

// =============================================
// USER MANAGEMENT
// =============================================
function getUsers() {
  return getFromStorage(STORAGE_KEYS.USERS, defaultUsers)
}

function saveUsers(users) {
  saveToStorage(STORAGE_KEYS.USERS, users)
}

function getCurrentUser() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    return stored ? JSON.parse(stored) : null
  } catch (e) {
    return null
  }
}

function setCurrentUser(user) {
  if (user) {
    sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  }
}

function login(email, password) {
  const users = getUsers()
  const user = users.find((u) => u.email === email && u.password === password)
  if (user) {
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
    setCurrentUser(userData)
    return userData
  }
  return null
}

function register(name, email, password, role) {
  const users = getUsers()
  if (users.find((u) => u.email === email)) {
    return null
  }
  const newUser = {
    id: String(Date.now()),
    email,
    password,
    name,
    role,
  }
  users.push(newUser)
  saveUsers(users)

  const userData = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  }
  setCurrentUser(userData)
  return userData
}

function logout() {
  setCurrentUser(null)
}

// =============================================
// BRANCH MANAGEMENT
// =============================================
function getBranches() {
  return getFromStorage(STORAGE_KEYS.BRANCHES, defaultBranches)
}

function saveBranches(branches) {
  saveToStorage(STORAGE_KEYS.BRANCHES, branches)
}

function addBranch(branch) {
  const branches = getBranches()
  const newBranch = {
    ...branch,
    id: String(Date.now()),
  }
  branches.push(newBranch)
  saveBranches(branches)
  return newBranch
}

function deleteBranch(id) {
  const branches = getBranches()
  const filtered = branches.filter((b) => b.id !== id)
  saveBranches(filtered)
  return filtered.length !== branches.length
}

// =============================================
// GEOLOCATION HELPERS
// =============================================
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

function findNearestBranch(latitude, longitude) {
  const branches = getBranches()
  let nearest = null

  for (const branch of branches) {
    const distance = calculateDistance(latitude, longitude, branch.latitude, branch.longitude)
    if (!nearest || distance < nearest.distance) {
      nearest = { branch, distance }
    }
  }

  return nearest
}

function isWithinBranch(latitude, longitude) {
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

// =============================================
// CUSTOMER MANAGEMENT
// =============================================
function getCustomers() {
  return getFromStorage(STORAGE_KEYS.CUSTOMERS, defaultCustomers)
}

function saveCustomers(customers) {
  saveToStorage(STORAGE_KEYS.CUSTOMERS, customers)
}

function addCustomer(customer) {
  const customers = getCustomers()
  const newCustomer = {
    ...customer,
    id: String(Date.now()),
    registrationDate: new Date().toISOString().split("T")[0],
  }
  customers.push(newCustomer)
  saveCustomers(customers)
  return newCustomer
}

function deleteCustomer(id) {
  const customers = getCustomers()
  const filtered = customers.filter((c) => c.id !== id)
  saveCustomers(filtered)
  return filtered.length !== customers.length
}

// =============================================
// ATTENDANCE MANAGEMENT
// =============================================
function getAttendanceRecords() {
  return getFromStorage(STORAGE_KEYS.ATTENDANCE, [])
}

function saveAttendanceRecords(records) {
  saveToStorage(STORAGE_KEYS.ATTENDANCE, records)
}

function getTodayAttendance(userId) {
  const records = getAttendanceRecords()
  const today = new Date().toISOString().split("T")[0]
  return records.find((r) => r.userId === userId && r.date === today)
}

function checkIn(userId, userName, branch) {
  const records = getAttendanceRecords()
  const today = new Date().toISOString().split("T")[0]

  // Check if already checked in today
  const existing = records.find((r) => r.userId === userId && r.date === today)
  if (existing) {
    return null
  }

  const newRecord = {
    id: String(Date.now()),
    userId,
    userName,
    branchId: branch.id,
    branchName: branch.name,
    checkInTime: new Date().toLocaleTimeString("ar-EG"),
    checkInBranch: branch.name,
    checkOutTime: null,
    checkOutBranch: null,
    date: today,
    status: "checked-in",
  }

  records.push(newRecord)
  saveAttendanceRecords(records)
  return newRecord
}

function checkOut(userId, branch) {
  const records = getAttendanceRecords()
  const today = new Date().toISOString().split("T")[0]

  const recordIndex = records.findIndex((r) => r.userId === userId && r.date === today)
  if (recordIndex === -1) {
    return null
  }

  records[recordIndex] = {
    ...records[recordIndex],
    checkOutTime: new Date().toLocaleTimeString("ar-EG"),
    checkOutBranch: branch.name,
    status: "checked-out",
  }

  saveAttendanceRecords(records)
  return records[recordIndex]
}

function getAttendanceByDate(date) {
  const records = getAttendanceRecords()
  return records.filter((r) => r.date === date)
}

function getTodayAttendanceCount() {
  const today = new Date().toISOString().split("T")[0]
  const records = getAttendanceRecords()
  return records.filter((r) => r.date === today).length
}

function getUserAttendanceHistory(userId, limit = 7) {
  const records = getAttendanceRecords()
  return records
    .filter((r) => r.userId === userId)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)
}

// =============================================
// EMPLOYEES (for display)
// =============================================
function getEmployees() {
  return mockEmployees
}
