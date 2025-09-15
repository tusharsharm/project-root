"use client"

import { useState, useEffect, createContext, useContext } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface User {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  is_staff: boolean
}

interface AuthContextType {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (username: string, password: string) => Promise<any>
  logout: () => void
  refreshToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider(props: { children: React.ReactNode }) {
  const auth = useAuthHook()
  return (
    <AuthContext.Provider value={auth}>
      {props.children}
    </AuthContext.Provider>
  )
}



export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

function useAuthHook() {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("access")
      if (token) {
        setAccessToken(token)
        
        // Verify token and get user info
        const res = await fetch(`${API_URL}/api/auth/profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        
        if (res.ok) {
          const userData = await res.json()
          setUser(userData)
          setIsAuthenticated(true)
        } else {
          // Token is invalid, clear it
          localStorage.removeItem("access")
          localStorage.removeItem("refresh")
          localStorage.removeItem("userType")
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/api/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      throw new Error("Invalid credentials")
    }

    const data = await res.json()
    localStorage.setItem("access", data.access)
    localStorage.setItem("refresh", data.refresh)
    
    // Get user profile
    const profileRes = await fetch(`${API_URL}/api/auth/profile/`, {
      headers: { Authorization: `Bearer ${data.access}` },
    })
    
    if (profileRes.ok) {
      const userData = await profileRes.json()
      setUser(userData)
      localStorage.setItem("userType", userData.is_staff ? "admin" : "user")
    }
    
    setAccessToken(data.access)
    setIsAuthenticated(true)
    return data
  }

  const logout = () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("userType")
    setUser(null)
    setAccessToken(null)
    setIsAuthenticated(false)
    window.location.href = "/login"
  }

  const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh")
    if (!refresh) {
      logout()
      return null
    }

    const res = await fetch(`${API_URL}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    })

    if (!res.ok) {
      logout()
      return null
    }

    const data = await res.json()
    localStorage.setItem("access", data.access)
    setAccessToken(data.access)
    return data.access
  }

  return { 
    user, 
    isAuthenticated, 
    accessToken, 
    loading, 
    login, 
    logout, 
    refreshToken 
  }
}
