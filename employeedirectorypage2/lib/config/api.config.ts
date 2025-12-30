// API Configuration for external backend
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://35.170.243.147:8080",
  TIMEOUT: 30000, // 30 seconds

  // API Endpoints - Update these based on your Swagger documentation
  ENDPOINTS: {
    // Authentication endpoints
    AUTH: {
      LOGIN: "/api/auth/login",
      REGISTER: "/api/auth/register",
      LOGOUT: "/api/auth/logout",
      REFRESH_TOKEN: "/api/auth/refresh",
      ME: "/api/auth/me",
    },

    // Employee endpoints
    EMPLOYEES: {
      LIST: "/api/employees",
      GET: (id: string) => `/api/employees/${id}`,
      CREATE: "/api/employees",
      UPDATE: (id: string) => `/api/employees/${id}`,
      DELETE: (id: string) => `/api/employees/${id}`,
      BY_BRANCH: (branchId: string) => `/api/employees/branch/${branchId}`,
      BY_DEPARTMENT: (deptId: string) => `/api/employees/department/${deptId}`,
    },

    // Branch endpoints
    BRANCHES: {
      LIST: "/api/branches",
      GET: (id: string) => `/api/branches/${id}`,
      CREATE: "/api/branches",
      UPDATE: (id: string) => `/api/branches/${id}`,
      DELETE: (id: string) => `/api/branches/${id}`,
      STATS: (id: string) => `/api/branches/${id}/stats`,
    },

    // Department endpoints
    DEPARTMENTS: {
      LIST: "/api/departments",
      GET: (id: string) => `/api/departments/${id}`,
      CREATE: "/api/departments",
      UPDATE: (id: string) => `/api/departments/${id}`,
      DELETE: (id: string) => `/api/departments/${id}`,
      BY_BRANCH: (branchId: string) => `/api/departments/branch/${branchId}`,
    },

    // Attendance endpoints
    ATTENDANCE: {
      CHECK_IN: "/api/attendance/check-in",
      CHECK_OUT: "/api/attendance/check-out",
      RECORDS: "/api/attendance/records",
      BY_EMPLOYEE: (employeeId: string) => `/api/attendance/employee/${employeeId}`,
      BY_DATE: "/api/attendance/date",
    },
  },
}
