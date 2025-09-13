"use client"

import { useEffect, useState } from "react"
import { AdminAuthGuard } from "@/components/admin-auth-guard"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Heart,
  DollarSign,
  UserCheck,
  Mail,
  Settings,
  LogOut,
  Download,
  Eye,
  Edit,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// ----------------- Types -----------------
interface Donation {
  id: string
  donor_name: string
  amount: number
  purpose?: string
  date: string
  status?: string
  paid?: boolean
}

interface Volunteer {
  id: string
  name: string
  email: string
  phone: string
  area: string
  status: string
  joined_at: string
}

// ----------------- Component -----------------
export default function AdminDashboard() {
  const { user, isAuthenticated, accessToken, logout } = useAuth()
  const { toast } = useToast()
  const [donations, setDonations] = useState<Donation[]>([])
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    contacts: 0,
    volunteers: 0,
    newsletters: 0,
    blogs: 0,
  })

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      fetchData()
    }
  }, [isAuthenticated, accessToken])

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` }

      const [donRes, volRes, statRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donations/`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/volunteers/`, { headers }),
        fetch("/api/admin/stats"),
      ])

      if (donRes.ok) setDonations(await donRes.json())
      if (volRes.ok) setVolunteers(await volRes.json())
      if (statRes.ok) {
        const data = await statRes.json()
        if (data.success) {
          setStats(data.stats)
        } else {
          throw new Error("Failed to fetch stats")
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err)
      toast({
        title: "Error",
        description: "Failed to load dashboard stats",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminAuthGuard>
      <AdminDashboardContent 
        donations={donations}
        volunteers={volunteers}
        loading={loading}
        user={user}
        logout={logout}
      />
    </AdminAuthGuard>
  )
}

function AdminDashboardContent({ 
  donations, 
  volunteers, 
  loading, 
  user, 
  logout 
}: {
  donations: Donation[]
  volunteers: Volunteer[]
  loading: boolean
  user: any
  logout: () => void
}) {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const totalDonations = donations.reduce((sum, d) => sum + Number(d.amount), 0)
  const completedDonations = donations.filter((d) => d.status === "Completed" || d.paid).length
  const activeVolunteers = volunteers.filter((v) => v.status === "Active").length
  const pendingVolunteers = volunteers.filter((v) => v.status === "Pending").length

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-primary">Vanya Foundation</h1>
              <p className="text-sm text-muted-foreground">
                Admin Dashboard - Welcome, {user?.first_name || user?.username}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
                  <p className="text-2xl font-bold text-primary">₹{totalDonations.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed Donations</p>
                  <p className="text-2xl font-bold text-green-600">{completedDonations}</p>
                </div>
                <Heart className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Volunteers</p>
                  <p className="text-2xl font-bold text-blue-600">{activeVolunteers}</p>
                </div>
                <UserCheck className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Applications</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingVolunteers}</p>
                </div>
                <Users className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          {/* Donations Tab */}
          <TabsContent value="donations">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Donations</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Donor</th>
                        <th className="text-left p-2">Amount</th>
                        <th className="text-left p-2">Purpose</th>
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((donation) => (
                        <tr key={donation.id} className="border-b">
                          <td className="p-2 font-mono text-sm">{donation.id}</td>
                          <td className="p-2">{donation.donor_name}</td>
                          <td className="p-2 font-semibold">
                            ₹{Number(donation.amount).toLocaleString()}
                          </td>
                          <td className="p-2">{donation.purpose || "—"}</td>
                          <td className="p-2">
                            {new Date(donation.date).toLocaleDateString()}
                          </td>
                          <td className="p-2">
                            <Badge variant={donation.paid ? "default" : "secondary"}>
                              {donation.paid ? "Completed" : "Pending"}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Volunteers Tab */}
          <TabsContent value="volunteers">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Volunteer Applications</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Phone</th>
                        <th className="text-left p-2">Area</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Join Date</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volunteers.map((volunteer) => (
                        <tr key={volunteer.id} className="border-b">
                          <td className="p-2 font-mono text-sm">{volunteer.id}</td>
                          <td className="p-2">{volunteer.name}</td>
                          <td className="p-2">{volunteer.email}</td>
                          <td className="p-2">{volunteer.phone}</td>
                          <td className="p-2">{volunteer.area}</td>
                          <td className="p-2">
                            <Badge variant={volunteer.status === "Active" ? "default" : "secondary"}>
                              {volunteer.status}
                            </Badge>
                          </td>
                          <td className="p-2">
                            {new Date(volunteer.joined_at).toLocaleDateString()}
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="w-4 h-4" />
                              </Button>
                              {volunteer.status === "Pending" && (
                                <Button variant="ghost" size="sm" className="text-green-600">
                                  <UserCheck className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Website Pages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded hover:bg-muted/50 transition-colors">
                    <span>Homepage</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open("/?admin=VANYA_ADMIN_2024", "_blank")
                      }
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Homepage
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded hover:bg-muted/50 transition-colors">
                    <span>About Us</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open("/about?admin=VANYA_ADMIN_2024", "_blank")
                      }
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit About
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded hover:bg-muted/50 transition-colors">
                    <span>Our Work</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open("/our-work?admin=VANYA_ADMIN_2024", "_blank")
                      }
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Our Work
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded hover:bg-muted/50 transition-colors">
                    <span>Contact</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open("/contact?admin=VANYA_ADMIN_2024", "_blank")
                      }
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Media & Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded hover:bg-muted/50 transition-colors">
                    <span>Gallery</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open("/gallery?admin=VANYA_ADMIN_2024", "_blank")
                      }
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Gallery
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded hover:bg-muted/50 transition-colors">
                    <span>Blog & News</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open("/blog?admin=VANYA_ADMIN_2024", "_blank")
                      }
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Blog
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}