// HTTP Client utility for API calls with JWT token management

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>
}

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  success?: boolean
}

class ApiClient {
  private baseURL: string
  private timeout: number

  constructor(baseURL: string, timeout = 30000) {
    this.baseURL = baseURL
    this.timeout = timeout
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null
    return sessionStorage.getItem("access_token")
  }

  private setToken(token: string): void {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("access_token", token)
    }
  }

  private removeToken(): void {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("access_token")
    }
  }

  private async fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("انتهت مهلة الطلب. يرجى المحاولة مرة أخرى.")
      }
      throw error
    }
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const { params, headers, ...restConfig } = config

    // Build URL with query parameters
    let url = `${this.baseURL}${endpoint}`
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value))
      })
      url += `?${searchParams.toString()}`
    }

    // Build headers
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...headers,
    }

    // Add JWT token if available
    const token = this.getToken()
    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`
    }

    console.log(`[v0] API Request: ${config.method || "GET"} ${url}`)

    try {
      const response = await this.fetchWithTimeout(url, {
        ...restConfig,
        headers: requestHeaders,
      })

      console.log(`[v0] API Response Status: ${response.status}`)

      // Handle different response statuses
      if (response.status === 401) {
        // Unauthorized - remove token and redirect to login
        this.removeToken()
        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }
        throw new Error("غير مصرح. يرجى تسجيل الدخول مرة أخرى.")
      }

      const data = await response.json()

      if (!response.ok) {
        return {
          error: data.message || "حدث خطأ في الطلب",
          success: false,
        }
      }

      return {
        data: data.data || data,
        message: data.message,
        success: true,
      }
    } catch (error) {
      console.error("[v0] API Error:", error)
      return {
        error: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
        success: false,
      }
    }
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "GET" })
  }

  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" })
  }

  // Token management methods
  saveToken(token: string): void {
    this.setToken(token)
  }

  clearToken(): void {
    this.removeToken()
  }
}

// Export a singleton instance
export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL || "http://35.170.243.147:8080")
