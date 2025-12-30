// Branch API service
import { apiClient } from "@/lib/utils/api-client"
import { API_CONFIG } from "@/lib/config/api.config"
import type { Branch } from "@/lib/types"

export const branchApi = {
  // Get all branches
  async getAll() {
    return apiClient.get<Branch[]>(API_CONFIG.ENDPOINTS.BRANCHES.LIST)
  },

  // Get branch by ID
  async getById(id: string) {
    return apiClient.get<Branch>(API_CONFIG.ENDPOINTS.BRANCHES.GET(id))
  },

  // Create new branch
  async create(branchData: Omit<Branch, "id">) {
    return apiClient.post<Branch>(API_CONFIG.ENDPOINTS.BRANCHES.CREATE, branchData)
  },

  // Update branch
  async update(id: string, updates: Partial<Branch>) {
    return apiClient.put<Branch>(API_CONFIG.ENDPOINTS.BRANCHES.UPDATE(id), updates)
  },

  // Delete branch
  async delete(id: string) {
    return apiClient.delete(API_CONFIG.ENDPOINTS.BRANCHES.DELETE(id))
  },

  // Get branch statistics
  async getStats(id: string) {
    return apiClient.get(API_CONFIG.ENDPOINTS.BRANCHES.STATS(id))
  },
}
