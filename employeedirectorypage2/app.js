// =============================================
// APP STATE
// =============================================
let currentPage = "login"
let locationData = null
const locationError = null
const isLoadingLocation = false

// =============================================
// SVG ICONS
// =============================================
const icons = {
  lock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  building: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
  clipboard: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`,
  logout: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
  navigation: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,
  alert: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
}

// =============================================
// APP LOGIC (AUTH, DATA MANAGEMENT)
// =============================================
// Mock data and functions (replace with actual API calls or state management)
const MOCK_USERS = [
  { id: "1", name: "مدير النظام", email: "admin@company.com", password: "admin123", role: "employer" },
  { id: "2", name: "أحمد علي", email: "employer@company.com", password: "employer123", role: "employer" },
  { id: "3", name: "فاطمة الزهراء", email: "employee@company.com", password: "employee123", role: "employee" },
  { id: "4", name: "محمود حسن", email: "user@company.com", password: "user123", role: "employee" },
]

const MOCK_BRANCHES = [
  { id: "b1", name: "فرع القاهرة", address: "شارع النيل، الجيزة", latitude: 30.0444, longitude: 31.2357, radius: 100 },
  {
    id: "b2",
    name: "فرع الإسكندرية",
    address: "كورنيش البحر، وسط البلد",
    latitude: 31.2001,
    longitude: 29.9187,
    radius: 150,
  },
  {
    id: "b3",
    name: "فرع المنصورة",
    address: "شارع الجمهورية، المنصورة",
    latitude: 31.0414,
    longitude: 31.3774,
    radius: 80,
  },
]

const MOCK_EMPLOYEES = [
  {
    id: "e1",
    name: "أحمد علي",
    email: "ahmed.ali@company.com",
    phone: "01012345678",
    department: "المبيعات",
    branch: "فرع القاهرة",
    salary: 15000,
  },
  {
    id: "e2",
    name: "فاطمة الزهراء",
    email: "fatma.zahra@company.com",
    phone: "01123456789",
    department: "المحاسبة",
    branch: "فرع القاهرة",
    salary: 12000,
  },
  {
    id: "e3",
    name: "محمود حسن",
    email: "mahmoud.hassan@company.com",
    phone: "01234567890",
    department: "التسويق",
    branch: "فرع الإسكندرية",
    salary: 11000,
  },
]

const MOCK_CUSTOMERS = [
  {
    id: "c1",
    name: "شركة النيل للتجارة",
    phone: "+201001234567",
    address: { governorate: "القاهرة", city: "القاهرة", houseNumber: "15", landmark: "بالقرب من المتحف" },
    postalCode: "11511",
    branch: "فرع القاهرة",
    product: "نظام نقاط البيع",
    purchaseDate: "2023-01-15",
    productCount: 2,
    serviceType: "purchase",
    installments: [
      { id: "i1", amount: 500, date: "2023-02-15", paid: true },
      { id: "i2", amount: 500, date: "2023-03-15", paid: true },
      { id: "i3", amount: 500, date: "2023-04-15", paid: false },
      { id: "i4", amount: 500, date: "2023-05-15", paid: false },
    ],
    trustReceipts: ["TR1001", "TR1002"],
    registrationDate: "2023-01-10",
  },
  {
    id: "c2",
    name: "مؤسسة الهدى",
    phone: "+201156789012",
    address: { governorate: "الإسكندرية", city: "الإسكندرية", center: "وسط البلد", landmark: "بجوار المكتبة" },
    postalCode: "21566",
    branch: "فرع الإسكندرية",
    product: "خدمات الاستضافة",
    purchaseDate: "2023-02-20",
    productCount: 1,
    serviceType: "maintenance",
    installments: [
      { id: "i5", amount: 200, date: "2023-03-20", paid: false },
      { id: "i6", amount: 200, date: "2023-04-20", paid: false },
    ],
    trustReceipts: [],
    registrationDate: "2023-02-18",
  },
]

const MOCK_ATTENDANCE_RECORDS = [
  {
    id: "a1",
    userId: "3",
    userName: "فاطمة الزهراء",
    date: "2024-07-20",
    checkInTime: "09:05",
    checkOutTime: "17:00",
    checkInBranch: "فرع القاهرة",
    checkOutBranch: "فرع القاهرة",
    status: "checked-out",
    branchName: "فرع القاهرة",
  },
  {
    id: "a2",
    userId: "4",
    userName: "محمود حسن",
    date: "2024-07-20",
    checkInTime: "09:10",
    checkOutTime: null,
    checkInBranch: "فرع الإسكندرية",
    status: "checked-in",
    branchName: "فرع الإسكندرية",
  },
  {
    id: "a3",
    userId: "3",
    userName: "فاطمة الزهراء",
    date: "2024-07-19",
    checkInTime: "09:00",
    checkOutTime: "17:05",
    checkInBranch: "فرع القاهرة",
    checkOutBranch: "فرع القاهرة",
    status: "checked-out",
    branchName: "فرع القاهرة",
  },
  {
    id: "a4",
    userId: "3",
    userName: "فاطمة الزهراء",
    date: "2024-07-18",
    checkInTime: "08:58",
    checkOutTime: "17:02",
    checkInBranch: "فرع القاهرة",
    checkOutBranch: "فرع القاهرة",
    status: "checked-out",
    branchName: "فرع القاهرة",
  },
]

let currentUser = null

function getCurrentUser() {
  if (currentUser) return currentUser
  const storedUser = localStorage.getItem("currentUser")
  if (storedUser) {
    currentUser = JSON.parse(storedUser)
    return currentUser
  }
  return null
}

function setCurrentUser(user) {
  currentUser = user
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  } else {
    localStorage.removeItem("currentUser")
  }
}

function login(email, password) {
  const user = MOCK_USERS.find((u) => u.email === email && u.password === password)
  if (user) {
    setCurrentUser(user)
    return user
  }
  return null
}

function register(name, email, password, role) {
  if (MOCK_USERS.some((u) => u.email === email)) {
    return null // Email already exists
  }
  const newUser = {
    id: `u${MOCK_USERS.length + 1}`,
    name,
    email,
    password,
    role,
  }
  MOCK_USERS.push(newUser)
  setCurrentUser(newUser)
  return newUser
}

function logout() {
  setCurrentUser(null)
}

function getTodayAttendanceCount() {
  const today = new Date().toISOString().split("T")[0]
  return MOCK_ATTENDANCE_RECORDS.filter((r) => r.date === today && r.status === "checked-in").length
}

function getCustomers() {
  return [...MOCK_CUSTOMERS] // Return a copy
}

function getBranches() {
  return [...MOCK_BRANCHES]
}

function getAttendanceRecords() {
  return [...MOCK_ATTENDANCE_RECORDS]
}

function getTodayAttendance(userId) {
  const today = new Date().toISOString().split("T")[0]
  return MOCK_ATTENDANCE_RECORDS.find((r) => r.userId === userId && r.date === today)
}

function getUserAttendanceHistory(userId) {
  const history = MOCK_ATTENDANCE_RECORDS.filter((r) => r.userId === userId)
  return history.slice(-7) // Last 7 days
}

function isWithinBranch(latitude, longitude) {
  const branches = getBranches()
  let closestBranch = null
  let minDistance = Number.POSITIVE_INFINITY
  let isWithin = false

  for (const branch of branches) {
    const distance = getDistance(latitude, longitude, branch.latitude, branch.longitude)
    if (distance < minDistance) {
      minDistance = distance
      closestBranch = branch
    }
    if (distance <= branch.radius) {
      isWithin = true
    }
  }

  return {
    isWithin,
    distance: minDistance,
    branch: isWithin ? closestBranch : null,
  }
}

// Haversine formula for distance calculation
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3 // metres
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // distance in metres
}

function checkIn(userId, userName, branch) {
  const today = new Date().toISOString().split("T")[0]
  const checkInTime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })

  if (getTodayAttendance(userId)) {
    return null // Already checked in today
  }

  const newRecord = {
    id: `a${MOCK_ATTENDANCE_RECORDS.length + 1}`,
    userId,
    userName,
    date: today,
    checkInTime,
    checkInBranch: branch.name,
    status: "checked-in",
    branchName: branch.name, // For employer view
  }
  MOCK_ATTENDANCE_RECORDS.push(newRecord)
  return newRecord
}

function checkOut(userId, branch) {
  const today = new Date().toISOString().split("T")[0]
  const record = getTodayAttendance(userId)

  if (!record || record.status === "checked-out") {
    return null // Not checked in or already checked out
  }

  const checkOutTime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })
  record.checkOutTime = checkOutTime
  record.checkOutBranch = branch.name
  record.status = "checked-out"
  return record
}

function addCustomer(customer) {
  const newCustomer = {
    ...customer,
    id: `c${MOCK_CUSTOMERS.length + 1}`,
    registrationDate: new Date().toISOString().split("T")[0],
    installments: Array.from({ length: customer.productCount }, (_, i) => ({
      id: `i${i + 1}`,
      amount: 1000, // Placeholder amount
      date: new Date(new Date().setMonth(new Date().getMonth() + i + 1)).toISOString().split("T")[0],
      paid: false,
    })),
    trustReceipts: [],
  }
  MOCK_CUSTOMERS.push(newCustomer)
}

function deleteCustomer(id) {
  const index = MOCK_CUSTOMERS.findIndex((c) => c.id === id)
  if (index > -1) {
    MOCK_CUSTOMERS.splice(index, 1)
  }
}

function getEmployees() {
  return [...MOCK_EMPLOYEES]
}

function addBranch(branch) {
  const newBranch = {
    ...branch,
    id: `b${MOCK_BRANCHES.length + 1}`,
  }
  MOCK_BRANCHES.push(newBranch)
}

function deleteBranch(id) {
  const index = MOCK_BRANCHES.findIndex((b) => b.id === id)
  if (index > -1) {
    MOCK_BRANCHES.splice(index, 1)
  }
}

function getAttendanceByDate(date) {
  return MOCK_ATTENDANCE_RECORDS.filter((r) => r.date === date)
}

// =============================================
// INITIALIZE APP
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser()
  if (user) {
    if (user.role === "employee") {
      navigateTo("attendance")
    } else {
      navigateTo("dashboard")
    }
  } else {
    navigateTo("login")
  }
})

// =============================================
// NAVIGATION
// =============================================
function navigateTo(page) {
  currentPage = page
  render()
}

function render() {
  const app = document.getElementById("app")
  const user = getCurrentUser()

  switch (currentPage) {
    case "login":
      app.innerHTML = renderLoginPage()
      attachLoginListeners()
      break
    case "register":
      app.innerHTML = renderRegisterPage()
      attachRegisterListeners()
      break
    case "dashboard":
      app.innerHTML = renderDashboardLayout(renderDashboardContent())
      attachSidebarListeners()
      break
    case "attendance":
      app.innerHTML = renderDashboardLayout(renderAttendancePage())
      attachSidebarListeners()
      attachAttendanceListeners()
      break
    case "customers":
      app.innerHTML = renderDashboardLayout(renderCustomersPage())
      attachSidebarListeners()
      attachCustomersListeners()
      break
    case "employees":
      if (user?.role !== "employer") {
        navigateTo("dashboard")
        return
      }
      app.innerHTML = renderDashboardLayout(renderEmployeesPage())
      attachSidebarListeners()
      break
    case "branches":
      if (user?.role !== "employer") {
        navigateTo("dashboard")
        return
      }
      app.innerHTML = renderDashboardLayout(renderBranchesPage())
      attachSidebarListeners()
      attachBranchesListeners()
      break
    case "attendance-records":
      if (user?.role !== "employer") {
        navigateTo("dashboard")
        return
      }
      app.innerHTML = renderDashboardLayout(renderAttendanceRecordsPage())
      attachSidebarListeners()
      attachAttendanceRecordsListeners()
      break
    default:
      navigateTo("login")
  }
}

// =============================================
// LOGIN PAGE
// =============================================
function renderLoginPage() {
  return `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-icon">${icons.lock}</div>
          <h1 class="auth-title">تسجيل الدخول</h1>
          <p class="auth-description">أدخل بيانات حسابك للوصول إلى لوحة التحكم</p>
        </div>
        
        <form id="loginForm">
          <div id="loginError" class="alert alert-error" style="display: none;"></div>
          
          <div class="form-group">
            <label class="form-label">البريد الإلكتروني</label>
            <input type="email" id="loginEmail" class="form-input" placeholder="example@company.com" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">كلمة المرور</label>
            <input type="password" id="loginPassword" class="form-input" placeholder="••••••••" required>
          </div>
          
          <button type="submit" class="btn btn-primary btn-full">تسجيل الدخول</button>
        </form>
        
        <div style="text-align: center; margin-top: 1.5rem;">
          <p style="color: var(--muted-foreground); font-size: 0.875rem;">
            ليس لديك حساب؟ 
            <a href="#" class="link" onclick="navigateTo('register')">إنشاء حساب جديد</a>
          </p>
        </div>
        
        <div class="test-credentials">
          <h4>بيانات تجريبية:</h4>
          <p><strong>صاحب العمل:</strong> employer@company.com / employer123</p>
          <p><strong>موظف:</strong> employee@company.com / employee123</p>
        </div>
      </div>
    </div>
  `
}

function attachLoginListeners() {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault()
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value
    const errorDiv = document.getElementById("loginError")

    const user = login(email, password)
    if (user) {
      if (user.role === "employee") {
        navigateTo("attendance")
      } else {
        navigateTo("dashboard")
      }
    } else {
      errorDiv.textContent = "البريد الإلكتروني أو كلمة المرور غير صحيحة"
      errorDiv.style.display = "block"
    }
  })
}

// =============================================
// REGISTER PAGE
// =============================================
function renderRegisterPage() {
  return `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-icon">${icons.user}</div>
          <h1 class="auth-title">إنشاء حساب جديد</h1>
          <p class="auth-description">أدخل بياناتك لإنشاء حساب جديد</p>
        </div>
        
        <form id="registerForm">
          <div id="registerError" class="alert alert-error" style="display: none;"></div>
          
          <div class="form-group">
            <label class="form-label">الاسم الكامل</label>
            <input type="text" id="registerName" class="form-input" placeholder="أدخل اسمك الكامل" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">البريد الإلكتروني</label>
            <input type="email" id="registerEmail" class="form-input" placeholder="example@company.com" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">كلمة المرور</label>
            <input type="password" id="registerPassword" class="form-input" placeholder="••••••••" required minlength="6">
          </div>
          
          <div class="form-group">
            <label class="form-label">نوع الحساب</label>
            <select id="registerRole" class="form-input" required>
              <option value="employee">موظف</option>
              <option value="employer">صاحب عمل</option>
            </select>
          </div>
          
          <button type="submit" class="btn btn-primary btn-full">إنشاء حساب</button>
        </form>
        
        <div style="text-align: center; margin-top: 1.5rem;">
          <p style="color: var(--muted-foreground); font-size: 0.875rem;">
            لديك حساب بالفعل؟ 
            <a href="#" class="link" onclick="navigateTo('login')">تسجيل الدخول</a>
          </p>
        </div>
      </div>
    </div>
  `
}

function attachRegisterListeners() {
  document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault()
    const name = document.getElementById("registerName").value
    const email = document.getElementById("registerEmail").value
    const password = document.getElementById("registerPassword").value
    const role = document.getElementById("registerRole").value
    const errorDiv = document.getElementById("registerError")

    const user = register(name, email, password, role)
    if (user) {
      if (user.role === "employee") {
        navigateTo("attendance")
      } else {
        navigateTo("dashboard")
      }
    } else {
      errorDiv.textContent = "البريد الإلكتروني مستخدم بالفعل"
      errorDiv.style.display = "block"
    }
  })
}

// =============================================
// DASHBOARD LAYOUT
// =============================================
function renderDashboardLayout(content) {
  const user = getCurrentUser()
  const isEmployer = user?.role === "employer"

  return `
    <div class="dashboard-layout">
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2 class="sidebar-title">لوحة التحكم</h2>
          <p class="sidebar-user">${user?.name || "مستخدم"}</p>
        </div>
        
        <nav class="sidebar-nav">
          <a href="#" class="nav-item ${currentPage === "dashboard" ? "active" : ""}" data-page="dashboard">
            ${icons.home}
            <span>الرئيسية</span>
          </a>
          <a href="#" class="nav-item ${currentPage === "attendance" ? "active" : ""}" data-page="attendance">
            ${icons.clock}
            <span>تسجيل الحضور</span>
          </a>
          <a href="#" class="nav-item ${currentPage === "customers" ? "active" : ""}" data-page="customers">
            ${icons.users}
            <span>العملاء</span>
          </a>
          ${
            isEmployer
              ? `
            <a href="#" class="nav-item ${currentPage === "employees" ? "active" : ""}" data-page="employees">
              ${icons.user}
              <span>الموظفين</span>
            </a>
            <a href="#" class="nav-item ${currentPage === "branches" ? "active" : ""}" data-page="branches">
              ${icons.building}
              <span>الفروع</span>
            </a>
            <a href="#" class="nav-item ${currentPage === "attendance-records" ? "active" : ""}" data-page="attendance-records">
              ${icons.clipboard}
              <span>سجلات الحضور</span>
            </a>
          `
              : ""
          }
        </nav>
        
        <div class="sidebar-footer">
          <button class="btn btn-outline btn-full" id="logoutBtn">
            ${icons.logout}
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
      
      <main class="main-content">
        ${content}
      </main>
    </div>
  `
}

function attachSidebarListeners() {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault()
      const page = item.dataset.page
      if (page) navigateTo(page)
    })
  })

  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    logout()
    navigateTo("login")
  })
}

// =============================================
// DASHBOARD CONTENT
// =============================================
function renderDashboardContent() {
  const user = getCurrentUser()
  const todayCount = getTodayAttendanceCount()
  const customersCount = getCustomers().length
  const branchesCount = getBranches().length

  return `
    <div class="page-header">
      <h1 class="page-title">مرحباً، ${user?.name || "مستخدم"}</h1>
      <p class="page-description">مرحباً بك في لوحة التحكم</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">${icons.clock}</div>
        <div class="stat-info">
          <h3 class="stat-value">${todayCount}</h3>
          <p class="stat-label">حضور اليوم</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">${icons.users}</div>
        <div class="stat-info">
          <h3 class="stat-value">${customersCount}</h3>
          <p class="stat-label">العملاء</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">${icons.building}</div>
        <div class="stat-info">
          <h3 class="stat-value">${branchesCount}</h3>
          <p class="stat-label">الفروع</p>
        </div>
      </div>
    </div>
  `
}

// =============================================
// ATTENDANCE PAGE
// =============================================
function renderAttendancePage() {
  const user = getCurrentUser()
  const todayAttendance = getTodayAttendance(user?.id)
  const history = getUserAttendanceHistory(user?.id)
  const todayCount = getTodayAttendanceCount()

  return `
    <div class="page-header">
      <h1 class="page-title">تسجيل الحضور والانصراف</h1>
      <p class="page-description">سجل حضورك وانصرافك من خلال التحقق من موقعك</p>
    </div>
    
    <div class="attendance-stats">
      <div class="stat-card highlight">
        <div class="stat-icon">${icons.users}</div>
        <div class="stat-info">
          <h3 class="stat-value">${todayCount}</h3>
          <p class="stat-label">عدد الحاضرين اليوم</p>
        </div>
      </div>
    </div>
    
    <div class="attendance-container">
      <div class="attendance-card">
        <h3 class="card-title">حالة اليوم</h3>
        
        <div id="locationStatus" class="location-status">
          <div class="status-loading">
            ${icons.refresh}
            <span>جاري تحديد الموقع...</span>
          </div>
        </div>
        
        <div id="attendanceActions" class="attendance-actions">
          ${
            !todayAttendance
              ? `
            <button id="checkInBtn" class="btn btn-success btn-full" disabled>
              ${icons.check}
              <span>تسجيل الحضور</span>
            </button>
          `
              : todayAttendance.status === "checked-in"
                ? `
            <div class="checked-in-info">
              <p>تم تسجيل الحضور في: <strong>${todayAttendance.checkInTime}</strong></p>
              <p>الفرع: <strong>${todayAttendance.checkInBranch}</strong></p>
            </div>
            <button id="checkOutBtn" class="btn btn-warning btn-full" disabled>
              ${icons.x}
              <span>تسجيل الانصراف</span>
            </button>
          `
                : `
            <div class="checked-out-info">
              <p>تم تسجيل الحضور في: <strong>${todayAttendance.checkInTime}</strong></p>
              <p>فرع الحضور: <strong>${todayAttendance.checkInBranch}</strong></p>
              <p>تم تسجيل الانصراف في: <strong>${todayAttendance.checkOutTime}</strong></p>
              <p>فرع الانصراف: <strong>${todayAttendance.checkOutBranch}</strong></p>
            </div>
          `
          }
        </div>
        
        <button id="refreshLocationBtn" class="btn btn-outline btn-full" style="margin-top: 1rem;">
          ${icons.refresh}
          <span>تحديث الموقع</span>
        </button>
      </div>
      
      <div class="attendance-history">
        <h3 class="card-title">سجل الحضور (آخر 7 أيام)</h3>
        <div class="history-list">
          ${
            history.length > 0
              ? history
                  .map(
                    (record) => `
              <div class="history-item">
                <div class="history-date">${record.date}</div>
                <div class="history-details">
                  <span class="history-time">حضور: ${record.checkInTime}</span>
                  <span class="history-time">انصراف: ${record.checkOutTime || "لم يسجل"}</span>
                </div>
                <div class="history-branch">${record.branchName}</div>
                <span class="status-badge ${record.status === "checked-out" ? "success" : "warning"}">
                  ${record.status === "checked-out" ? "مكتمل" : "حاضر"}
                </span>
              </div>
            `,
                  )
                  .join("")
              : '<p class="empty-message">لا يوجد سجلات حضور سابقة</p>'
          }
        </div>
      </div>
    </div>
  `
}

function attachAttendanceListeners() {
  const user = getCurrentUser()

  // Get current location
  function updateLocation() {
    const statusDiv = document.getElementById("locationStatus")
    statusDiv.innerHTML = `
      <div class="status-loading">
        ${icons.refresh}
        <span>جاري تحديد الموقع...</span>
      </div>
    `

    if (!navigator.geolocation) {
      statusDiv.innerHTML = `
        <div class="status-error">
          ${icons.alert}
          <span>المتصفح لا يدعم تحديد الموقع</span>
        </div>
      `
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        locationData = { latitude, longitude }

        const result = isWithinBranch(latitude, longitude)

        if (result.isWithin) {
          statusDiv.innerHTML = `
            <div class="status-success">
              ${icons.check}
              <div>
                <p>أنت داخل نطاق فرع: <strong>${result.branch.name}</strong></p>
                <p class="distance-info">المسافة: ${Math.round(result.distance)} متر</p>
              </div>
            </div>
          `
          // Enable check-in/check-out buttons
          const checkInBtn = document.getElementById("checkInBtn")
          const checkOutBtn = document.getElementById("checkOutBtn")
          if (checkInBtn) {
            checkInBtn.disabled = false
            checkInBtn.onclick = () => handleCheckIn(result.branch)
          }
          if (checkOutBtn) {
            checkOutBtn.disabled = false
            checkOutBtn.onclick = () => handleCheckOut(result.branch)
          }
        } else {
          statusDiv.innerHTML = `
            <div class="status-error">
              ${icons.alert}
              <div>
                <p>أنت خارج نطاق أي فرع</p>
                <p class="distance-info">أقرب فرع على بعد: ${Math.round(result.distance)} متر</p>
              </div>
            </div>
          `
        }
      },
      (error) => {
        statusDiv.innerHTML = `
          <div class="status-error">
            ${icons.alert}
            <span>فشل في تحديد الموقع: ${error.message}</span>
          </div>
        `
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  function handleCheckIn(branch) {
    const result = checkIn(user.id, user.name, branch)
    if (result) {
      navigateTo("attendance")
    }
  }

  function handleCheckOut(branch) {
    const result = checkOut(user.id, branch)
    if (result) {
      navigateTo("attendance")
    }
  }

  document.getElementById("refreshLocationBtn")?.addEventListener("click", updateLocation)

  // Initial location check
  updateLocation()
}

// =============================================
// CUSTOMERS PAGE
// =============================================
function renderCustomersPage() {
  const customers = getCustomers()

  return `
    <div class="page-header">
      <h1 class="page-title">إدارة العملاء</h1>
      <p class="page-description">عرض وإدارة بيانات العملاء</p>
    </div>
    
    <div class="toolbar">
      <div class="search-box">
        ${icons.search}
        <input type="text" id="customerSearch" class="search-input" placeholder="بحث عن عميل...">
      </div>
      <button id="addCustomerBtn" class="btn btn-primary">
        ${icons.plus}
        <span>إضافة عميل</span>
      </button>
    </div>
    
    <div id="addCustomerForm" class="form-card" style="display: none;">
      <h3 class="card-title">إضافة عميل جديد</h3>
      <form id="customerForm">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">الاسم</label>
            <input type="text" name="name" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">رقم الموبايل</label>
            <input type="tel" name="phone" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">المحافظة</label>
            <input type="text" name="governorate" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">المدينة</label>
            <input type="text" name="city" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">المركز</label>
            <input type="text" name="center" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">القرية (إن وجدت)</label>
            <input type="text" name="village" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">رقم المنزل</label>
            <input type="text" name="houseNumber" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">مكان مشهور بالقرب من العنوان</label>
            <input type="text" name="landmark" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">الرقم البريدي</label>
            <input type="text" name="postalCode" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">الفرع</label>
            <select name="branch" class="form-input" required>
              ${getBranches()
                .map((b) => `<option value="${b.name}">${b.name}</option>`)
                .join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">المنتج</label>
            <input type="text" name="product" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">تاريخ الشراء</label>
            <input type="date" name="purchaseDate" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">عدد المنتجات</label>
            <input type="number" name="productCount" class="form-input" min="1" value="1" required>
          </div>
          <div class="form-group">
            <label class="form-label">نوع الخدمة</label>
            <select name="serviceType" class="form-input" required>
              <option value="purchase">شراء</option>
              <option value="maintenance">صيانة</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">عدد الأقساط</label>
            <input type="number" name="installmentCount" class="form-input" min="1" value="1">
          </div>
          <div class="form-group">
            <label class="form-label">وصالات الأمانة (مفصولة بفاصلة)</label>
            <input type="text" name="trustReceipts" class="form-input" placeholder="وصل-001, وصل-002">
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">حفظ العميل</button>
          <button type="button" id="cancelCustomerBtn" class="btn btn-outline">إلغاء</button>
        </div>
      </form>
    </div>
    
    <div class="table-container">
      <table class="data-table" id="customersTable">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الموبايل</th>
            <th>المحافظة</th>
            <th>الفرع</th>
            <th>المنتج</th>
            <th>نوع الخدمة</th>
            <th>الأقساط</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          ${customers
            .map(
              (customer) => `
            <tr>
              <td>${customer.name}</td>
              <td>${customer.phone}</td>
              <td>${customer.address?.governorate || "-"}</td>
              <td>${customer.branch}</td>
              <td>${customer.product}</td>
              <td>${customer.serviceType === "purchase" ? "شراء" : "صيانة"}</td>
              <td>
                <span class="badge">${customer.installments?.filter((i) => i.paid).length || 0}/${customer.installments?.length || 0}</span>
              </td>
              <td>
                <button class="btn btn-icon btn-danger" onclick="handleDeleteCustomer('${customer.id}')">
                  ${icons.trash}
                </button>
              </td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `
}

function attachCustomersListeners() {
  const addBtn = document.getElementById("addCustomerBtn")
  const cancelBtn = document.getElementById("cancelCustomerBtn")
  const form = document.getElementById("customerForm")
  const formCard = document.getElementById("addCustomerForm")
  const searchInput = document.getElementById("customerSearch")

  addBtn?.addEventListener("click", () => {
    formCard.style.display = formCard.style.display === "none" ? "block" : "none"
  })

  cancelBtn?.addEventListener("click", () => {
    formCard.style.display = "none"
    form.reset()
  })

  form?.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(form)

    const customer = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: {
        governorate: formData.get("governorate"),
        city: formData.get("city"),
        center: formData.get("center"),
        village: formData.get("village"),
        houseNumber: formData.get("houseNumber"),
        landmark: formData.get("landmark"),
      },
      postalCode: formData.get("postalCode"),
      branch: formData.get("branch"),
      product: formData.get("product"),
      purchaseDate: formData.get("purchaseDate"),
      productCount: Number.parseInt(formData.get("productCount")),
      serviceType: formData.get("serviceType"),
      trustReceipts:
        formData
          .get("trustReceipts")
          ?.split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [],
      installments: Array.from({ length: Number.parseInt(formData.get("installmentCount")) || 1 }, (_, i) => ({
        amount: 0,
        date: "",
        paid: false,
      })),
    }

    addCustomer(customer)
    navigateTo("customers")
  })

  searchInput?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase()
    const rows = document.querySelectorAll("#customersTable tbody tr")
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase()
      row.style.display = text.includes(query) ? "" : "none"
    })
  })
}

// Global function for delete button
window.handleDeleteCustomer = (id) => {
  if (confirm("هل أنت متأكد من حذف هذا العميل؟")) {
    deleteCustomer(id)
    navigateTo("customers")
  }
}

// =============================================
// EMPLOYEES PAGE
// =============================================
function renderEmployeesPage() {
  const employees = getEmployees()

  return `
    <div class="page-header">
      <h1 class="page-title">إدارة الموظفين</h1>
      <p class="page-description">عرض بيانات الموظفين</p>
    </div>
    
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>الهاتف</th>
            <th>القسم</th>
            <th>الفرع</th>
            <th>الراتب</th>
          </tr>
        </thead>
        <tbody>
          ${employees
            .map(
              (emp) => `
            <tr>
              <td>${emp.name}</td>
              <td>${emp.email}</td>
              <td>${emp.phone}</td>
              <td>${emp.department}</td>
              <td>${emp.branch}</td>
              <td>${emp.salary} جنيه</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `
}

// =============================================
// BRANCHES PAGE
// =============================================
function renderBranchesPage() {
  const branches = getBranches()

  return `
    <div class="page-header">
      <h1 class="page-title">إدارة الفروع</h1>
      <p class="page-description">إضافة وإدارة فروع الشركة</p>
    </div>
    
    <div class="toolbar">
      <button id="addBranchBtn" class="btn btn-primary">
        ${icons.plus}
        <span>إضافة فرع</span>
      </button>
    </div>
    
    <div id="addBranchForm" class="form-card" style="display: none;">
      <h3 class="card-title">إضافة فرع جديد</h3>
      <form id="branchForm">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">اسم الفرع</label>
            <input type="text" name="name" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">العنوان</label>
            <input type="text" name="address" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">خط العرض (Latitude)</label>
            <input type="number" name="latitude" class="form-input" step="any" required>
          </div>
          <div class="form-group">
            <label class="form-label">خط الطول (Longitude)</label>
            <input type="number" name="longitude" class="form-input" step="any" required>
          </div>
          <div class="form-group">
            <label class="form-label">نطاق التسجيل (متر)</label>
            <input type="number" name="radius" class="form-input" value="200" required>
          </div>
        </div>
        <button type="button" id="useCurrentLocationBtn" class="btn btn-outline" style="margin-bottom: 1rem;">
          ${icons.navigation}
          <span>استخدام موقعي الحالي</span>
        </button>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">حفظ الفرع</button>
          <button type="button" id="cancelBranchBtn" class="btn btn-outline">إلغاء</button>
        </div>
      </form>
    </div>
    
    <div class="branches-grid">
      ${branches
        .map(
          (branch) => `
        <div class="branch-card">
          <div class="branch-header">
            <h3 class="branch-name">${branch.name}</h3>
            <button class="btn btn-icon btn-danger" onclick="handleDeleteBranch('${branch.id}')">
              ${icons.trash}
            </button>
          </div>
          <p class="branch-address">${icons.mapPin} ${branch.address}</p>
          <div class="branch-details">
            <span>خط العرض: ${branch.latitude}</span>
            <span>خط الطول: ${branch.longitude}</span>
            <span>النطاق: ${branch.radius} متر</span>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
  `
}

function attachBranchesListeners() {
  const addBtn = document.getElementById("addBranchBtn")
  const cancelBtn = document.getElementById("cancelBranchBtn")
  const form = document.getElementById("branchForm")
  const formCard = document.getElementById("addBranchForm")
  const useLocationBtn = document.getElementById("useCurrentLocationBtn")

  addBtn?.addEventListener("click", () => {
    formCard.style.display = formCard.style.display === "none" ? "block" : "none"
  })

  cancelBtn?.addEventListener("click", () => {
    formCard.style.display = "none"
    form.reset()
  })

  useLocationBtn?.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          document.querySelector('input[name="latitude"]').value = position.coords.latitude
          document.querySelector('input[name="longitude"]').value = position.coords.longitude
        },
        (error) => {
          alert("فشل في تحديد الموقع: " + error.message)
        },
      )
    }
  })

  form?.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(form)

    const branch = {
      name: formData.get("name"),
      address: formData.get("address"),
      latitude: Number.parseFloat(formData.get("latitude")),
      longitude: Number.parseFloat(formData.get("longitude")),
      radius: Number.parseInt(formData.get("radius")),
    }

    addBranch(branch)
    navigateTo("branches")
  })
}

// Global function for delete button
window.handleDeleteBranch = (id) => {
  if (confirm("هل أنت متأكد من حذف هذا الفرع؟")) {
    deleteBranch(id)
    navigateTo("branches")
  }
}

// =============================================
// ATTENDANCE RECORDS PAGE
// =============================================
function renderAttendanceRecordsPage() {
  const today = new Date().toISOString().split("T")[0]
  const records = getAttendanceByDate(today)

  return `
    <div class="page-header">
      <h1 class="page-title">سجلات الحضور والانصراف</h1>
      <p class="page-description">عرض سجلات حضور وانصراف الموظفين</p>
    </div>
    
    <div class="toolbar">
      <div class="date-filter">
        ${icons.calendar}
        <input type="date" id="attendanceDateFilter" class="form-input" value="${today}">
      </div>
      <div class="search-box">
        ${icons.search}
        <input type="text" id="attendanceSearch" class="search-input" placeholder="بحث عن موظف...">
      </div>
    </div>
    
    <div class="attendance-summary">
      <div class="summary-card">
        <span class="summary-value" id="totalAttendance">${records.length}</span>
        <span class="summary-label">إجمالي الحضور</span>
      </div>
      <div class="summary-card">
        <span class="summary-value" id="checkedOutCount">${records.filter((r) => r.status === "checked-out").length}</span>
        <span class="summary-label">تم الانصراف</span>
      </div>
      <div class="summary-card">
        <span class="summary-value" id="stillPresentCount">${records.filter((r) => r.status === "checked-in").length}</span>
        <span class="summary-label">لا يزال حاضراً</span>
      </div>
    </div>
    
    <div class="table-container">
      <table class="data-table" id="attendanceTable">
        <thead>
          <tr>
            <th>اسم الموظف</th>
            <th>وقت الحضور</th>
            <th>فرع الحضور</th>
            <th>وقت الانصراف</th>
            <th>فرع الانصراف</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody id="attendanceTableBody">
          ${
            records.length > 0
              ? records
                  .map(
                    (record) => `
            <tr>
              <td>${record.userName}</td>
              <td>${record.checkInTime}</td>
              <td>${record.checkInBranch}</td>
              <td>${record.checkOutTime || "-"}</td>
              <td>${record.checkOutBranch || "-"}</td>
              <td>
                <span class="status-badge ${record.status === "checked-out" ? "success" : "warning"}">
                  ${record.status === "checked-out" ? "انصرف" : "حاضر"}
                </span>
              </td>
            </tr>
          `,
                  )
                  .join("")
              : '<tr><td colspan="6" class="empty-message">لا يوجد سجلات لهذا التاريخ</td></tr>'
          }
        </tbody>
      </table>
    </div>
  `
}

function attachAttendanceRecordsListeners() {
  const dateFilter = document.getElementById("attendanceDateFilter")
  const searchInput = document.getElementById("attendanceSearch")

  dateFilter?.addEventListener("change", (e) => {
    const date = e.target.value
    const records = getAttendanceByDate(date)
    updateAttendanceTable(records)
  })

  searchInput?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase()
    const rows = document.querySelectorAll("#attendanceTable tbody tr")
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase()
      row.style.display = text.includes(query) ? "" : "none"
    })
  })
}

function updateAttendanceTable(records) {
  const tbody = document.getElementById("attendanceTableBody")
  const totalEl = document.getElementById("totalAttendance")
  const checkedOutEl = document.getElementById("checkedOutCount")
  const stillPresentEl = document.getElementById("stillPresentCount")

  totalEl.textContent = records.length
  checkedOutEl.textContent = records.filter((r) => r.status === "checked-out").length
  stillPresentEl.textContent = records.filter((r) => r.status === "checked-in").length

  if (records.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-message">لا يوجد سجلات لهذا التاريخ</td></tr>'
    return
  }

  tbody.innerHTML = records
    .map(
      (record) => `
    <tr>
      <td>${record.userName}</td>
      <td>${record.checkInTime}</td>
      <td>${record.checkInBranch}</td>
      <td>${record.checkOutTime || "-"}</td>
      <td>${record.checkOutBranch || "-"}</td>
      <td>
        <span class="status-badge ${record.status === "checked-out" ? "success" : "warning"}">
          ${record.status === "checked-out" ? "انصرف" : "حاضر"}
        </span>
      </td>
    </tr>
  `,
    )
    .join("")
}
