// Attendance API service
import { apiClient } from "@/lib/utils/api-client"
import { API_CONFIG } from "@/lib/config/api.config"

export interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  checkInTime: string
  checkOutTime?: string
  date: string
  latitude: number
  longitude: number
  branchId: string
  branchName: string
}

export interface CheckInRequest {
  employeeId: string
  latitude: number
  longitude: number
  branchId: string
}

export interface CheckOutRequest {
  employeeId: string
  latitude: number
  longitude: number
}

export const attendanceApi = {
  // Check in
  async checkIn(data: CheckInRequest) {
    return apiClient.post<AttendanceRecord>(API_CONFIG.ENDPOINTS.ATTENDANCE.CHECK_IN, data)
  },

  // Check out
  async checkOut(data: CheckOutRequest) {
    return apiClient.post<AttendanceRecord>(API_CONFIG.ENDPOINTS.ATTENDANCE.CHECK_OUT, data)
  },

  // Get all attendance records
  async getAll() {
    return apiClient.get<AttendanceRecord[]>(API_CONFIG.ENDPOINTS.ATTENDANCE.RECORDS)
  },

  // Get attendance by employee
  async getByEmployee(employeeId: string) {
    return apiClient.get<AttendanceRecord[]>(API_CONFIG.ENDPOINTS.ATTENDANCE.BY_EMPLOYEE(employeeId))
  },

  // Get attendance by date
  async getByDate(date: string) {
    return apiClient.get<AttendanceRecord[]>(API_CONFIG.ENDPOINTS.ATTENDANCE.BY_DATE, { params: { date } })
  },
}
