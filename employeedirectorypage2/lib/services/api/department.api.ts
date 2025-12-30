// Department API service
import { apiClient } from "@/lib/utils/api-client"
import { API_CONFIG } from "@/lib/config/api.config"
import type { Department } from "@/lib/types"

export const departmentApi = {
  // Get all departments
  async getAll() {
    return apiClient.get<Department[]>(API_CONFIG.ENDPOINTS.DEPARTMENTS.LIST)
  },

  // Get department by ID
  async getById(id: string) {
    return apiClient.get<Department>(API_CONFIG.ENDPOINTS.DEPARTMENTS.GET(id))
  },

  // Create new department
  async create(departmentData: Omit<Department, "id">) {
    return apiClient.post<Department>(API_CONFIG.ENDPOINTS.DEPARTMENTS.CREATE, departmentData)
  },

  // Update department
  async update(id: string, updates: Partial<Department>) {
    return apiClient.put<Department>(API_CONFIG.ENDPOINTS.DEPARTMENTS.UPDATE(id), updates)
  },

  // Delete department
  async delete(id: string) {
    return apiClient.delete(API_CONFIG.ENDPOINTS.DEPARTMENTS.DELETE(id))
  },

  // Get departments by branch
  async getByBranch(branchId: string) {
    return apiClient.get<Department[]>(API_CONFIG.ENDPOINTS.DEPARTMENTS.BY_BRANCH(branchId))
  },
}
