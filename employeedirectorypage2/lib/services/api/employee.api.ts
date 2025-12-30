// Employee API service
import { apiClient } from "@/lib/utils/api-client"
import { API_CONFIG } from "@/lib/config/api.config"
import type { Employee } from "@/lib/types"

export const employeeApi = {
  // Get all employees
  async getAll() {
    return apiClient.get<Employee[]>(API_CONFIG.ENDPOINTS.EMPLOYEES.LIST)
  },

  // Get employee by ID
  async getById(id: string) {
    return apiClient.get<Employee>(API_CONFIG.ENDPOINTS.EMPLOYEES.GET(id))
  },

  // Create new employee
  async create(employeeData: Omit<Employee, "id">) {
    return apiClient.post<Employee>(API_CONFIG.ENDPOINTS.EMPLOYEES.CREATE, employeeData)
  },

  // Update employee
  async update(id: string, updates: Partial<Employee>) {
    return apiClient.put<Employee>(API_CONFIG.ENDPOINTS.EMPLOYEES.UPDATE(id), updates)
  },

  // Delete employee
  async delete(id: string) {
    return apiClient.delete(API_CONFIG.ENDPOINTS.EMPLOYEES.DELETE(id))
  },

  // Get employees by branch
  async getByBranch(branchId: string) {
    return apiClient.get<Employee[]>(API_CONFIG.ENDPOINTS.EMPLOYEES.BY_BRANCH(branchId))
  },

  // Get employees by department
  async getByDepartment(departmentId: string) {
    return apiClient.get<Employee[]>(API_CONFIG.ENDPOINTS.EMPLOYEES.BY_DEPARTMENT(departmentId))
  },
}
