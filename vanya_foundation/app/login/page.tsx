"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, User, Shield, Heart, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function LoginPage() {
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  })
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  })
  const [showAdminPassword, setShowAdminPassword] = useState(false)
  const [showUserPassword, setShowUserPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("user")
  const router = useRouter()
  const { login } = useAuth()

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: adminCredentials.username,
          password: adminCredentials.password,
        }),
      })

      if (!res.ok) {
        setError("Invalid admin credentials. Please check your username and password.")
        setIsLoading(false)
        return
      }

      const data = await res.json()

      // Store JWT tokens
      localStorage.setItem("access", data.access)
      localStorage.setItem("refresh", data.refresh)
      localStorage.setItem("userType", "admin")

      // Redirect to admin dashboard
      router.replace("/admin/dashboard")
    } catch (err) {
      console.error("Admin login error:", err)
      setError("An error occurred during login. Please try again.")
    }

    setIsLoading(false)
  }

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userCredentials.email,
          password: userCredentials.password,
        }),
      })

      if (!res.ok) {
        setError("Invalid user credentials. Please check your email and password.")
        setIsLoading(false)
        return
      }

      const data = await res.json()

      // Store JWT tokens
      localStorage.setItem("access", data.access)
      localStorage.setItem("refresh", data.refresh)
      localStorage.setItem("userType", "user")

      // Redirect to main website
      router.replace("/")
    } catch (err) {
      console.error("User login error:", err)
      setError("An error occurred during login. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Vanya Foundation</h1>
          <p className="text-muted-foreground">Empowering Communities</p>
        </div>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <p className="text-muted-foreground">Sign in to your account</p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  User Login
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Admin Login
                </TabsTrigger>
              </TabsList>

              {/* User Login Tab */}
              <TabsContent value="user">
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email Address</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={userCredentials.email}
                      onChange={(e) =>
                        setUserCredentials({ ...userCredentials, email: e.target.value })
                      }
                      placeholder="Enter your email"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="user-password"
                        type={showUserPassword ? "text" : "password"}
                        value={userCredentials.password}
                        onChange={(e) =>
                          setUserCredentials({ ...userCredentials, password: e.target.value })
                        }
                        placeholder="Enter your password"
                        required
                        className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowUserPassword(!showUserPassword)}
                      >
                        {showUserPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && activeTab === "user" && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing In...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <div className="text-center">
                    <Button variant="link" className="text-sm text-muted-foreground">
                      Forgot your password?
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Admin Login Tab */}
              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username">Admin Username</Label>
                    <Input
                      id="admin-username"
                      type="text"
                      value={adminCredentials.username}
                      onChange={(e) =>
                        setAdminCredentials({ ...adminCredentials, username: e.target.value })
                      }
                      placeholder="Enter admin username"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <div className="relative">
                      <Input
                        id="admin-password"
                        type={showAdminPassword ? "text" : "password"}
                        value={adminCredentials.password}
                        onChange={(e) =>
                          setAdminCredentials({ ...adminCredentials, password: e.target.value })
                        }
                        placeholder="Enter admin password"
                        required
                        className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowAdminPassword(!showAdminPassword)}
                      >
                        {showAdminPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && activeTab === "admin" && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Authenticating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Access Dashboard
                      </div>
                    )}
                  </Button>

                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground text-center">
                      This is a secure area. Only authorized personnel should access the admin dashboard.
                    </p>
                  </div>
                </form>
              </TabsContent>
            </Tabs>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Button variant="link" className="p-0 h-auto text-primary">
                  Register here
                </Button>
              </p>
            </div>

            {/* Quick Access */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-muted-foreground text-center mb-3">Quick Access</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => router.push("/")}
                >
                  Visit Website
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => router.push("/contact")}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            © 2024 Vanya Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}