"use client"

import { useState, useEffect } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("access")
    if (token) {
      setAccessToken(token)
      setIsAuthenticated(true)
    }
  }, [])

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
    setAccessToken(data.access)
    setIsAuthenticated(true)
    return data
  }

  const logout = () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    setAccessToken(null)
    setIsAuthenticated(false)
    window.location.href = "/admin"
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

  return { isAuthenticated, accessToken, login, logout, refreshToken }
}
