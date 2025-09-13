"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export function AuthGuard({ 
  children, 
  requireAuth = false, 
  requireAdmin = false, 
  redirectTo = "/login" 
}: AuthGuardProps) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo)
      return
    }

    if (requireAdmin && (!user || !user.is_staff)) {
      router.push("/login")
      return
    }
  }, [user, loading, isAuthenticated, requireAuth, requireAdmin, router, redirectTo])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null
  }

  if (requireAdmin && (!user || !user.is_staff)) {
    return null
  }

  return <>{children}</>
}