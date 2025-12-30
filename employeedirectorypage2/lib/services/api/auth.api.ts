// Authentication API service
import { apiClient } from "@/lib/utils/api-client"
import { API_CONFIG } from "@/lib/config/api.config"
import type { User, UserRole } from "@/lib/types"

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
  refreshToken?: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  role: UserRole
}

export const authApi = {
  // Login user
  async login(credentials: LoginRequest) {
    const response = await apiClient.post<LoginResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials)

    if (response.success && response.data) {
      // Save JWT token
      apiClient.saveToken(response.data.token)
      return { success: true, data: response.data.user }
    }

    return { success: false, error: response.error || "فشل تسجيل الدخول" }
  },

  // Register new user
  async register(userData: RegisterRequest) {
    const response = await apiClient.post<LoginResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData)

    if (response.success && response.data) {
      // Save JWT token
      apiClient.saveToken(response.data.token)
      return { success: true, data: response.data.user }
    }

    return { success: false, error: response.error || "فشل التسجيل" }
  },

  // Logout user
  async logout() {
    try {
      await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT)
    } finally {
      apiClient.clearToken()
    }
  },

  // Get current user
  async getCurrentUser() {
    const response = await apiClient.get<User>(API_CONFIG.ENDPOINTS.AUTH.ME)
    return response
  },
}
