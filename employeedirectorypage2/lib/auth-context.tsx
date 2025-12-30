"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "admin" | "employee"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string, role: UserRole) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USERS_STORAGE_KEY = "registered_users"

// Default users for authentication
const defaultUsers = [
  {
    id: "1",
    email: "admin@company.com",
    password: "admin123",
    name: "أحمد محمد علي",
    role: "admin" as UserRole,
  },
  {
    id: "3",
    email: "employee@company.com",
    password: "employee123",
    name: "محمد سالم",
    role: "employee" as UserRole,
  },
]

function getStoredUsers() {
  if (typeof window === "undefined") return defaultUsers
  const stored = localStorage.getItem(USERS_STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers))
  return defaultUsers
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState(defaultUsers)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = sessionStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    // Load registered users
    setUsers(getStoredUsers())
  }, [])

  const login = (email: string, password: string): boolean => {
    console.log("[v0] Login function called")
    console.log("[v0] Email:", email)
    console.log("[v0] Password length:", password.length)

    const currentUsers = getStoredUsers()
    console.log(
      "[v0] Available users:",
      currentUsers.map((u: any) => ({ email: u.email, role: u.role })),
    )

    const foundUser = currentUsers.find((u: any) => u.email === email && u.password === password)
    console.log("[v0] Found user:", foundUser ? { email: foundUser.email, role: foundUser.role } : null)

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      }
      setUser(userData)
      sessionStorage.setItem("user", JSON.stringify(userData))
      console.log("[v0] User logged in successfully:", userData)
      return true
    }
    console.log("[v0] Login failed - user not found")
    return false
  }

  const register = (name: string, email: string, password: string, role: UserRole): boolean => {
    const currentUsers = getStoredUsers()
    // Check if email already exists
    if (currentUsers.find((u: any) => u.email === email)) {
      return false
    }

    const newUser = {
      id: String(currentUsers.length + 1),
      email,
      password,
      name,
      role,
    }

    const updatedUsers = [...currentUsers, newUser]
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers))
    setUsers(updatedUsers)

    // Auto login after registration
    const userData: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    }
    setUser(userData)
    sessionStorage.setItem("user", JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
