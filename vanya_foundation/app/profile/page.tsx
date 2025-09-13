"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/components/ui/use-toast"
import { User, Mail, Phone, MapPin, Calendar, Heart, Users, DollarSign } from "lucide-react"

export default function ProfilePage() {
  const { user, accessToken } = useAuth()
  const { toast } = useToast()
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        phone: "",
        address: "",
      })
    }
  }, [user])

  const handleSave = async () => {
    setLoading(true)
    try {
      // In a real app, this would update the user profile via API
      toast({
        title: "Success!",
        description: "Profile updated successfully.",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard requireAuth>
      <div className="min-h-screen">
        <Header />

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
              <p className="text-muted-foreground">Manage your account settings and view your activity</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Personal Information</CardTitle>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                        disabled={loading}
                      >
                        {loading ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData({ ...profileData, firstName: e.target.value })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData({ ...profileData, lastName: e.target.value })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Enter your address"
                      />
                    </div>

                    {isEditing && (
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleSave} disabled={loading}>
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="text-2xl font-bold text-primary mb-1">₹0</h3>
                      <p className="text-muted-foreground text-sm">Total Donated</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="text-2xl font-bold text-blue-600 mb-1">0</h3>
                      <p className="text-muted-foreground text-sm">Volunteer Hours</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h3 className="text-2xl font-bold text-green-600 mb-1">0</h3>
                      <p className="text-muted-foreground text-sm">Events Attended</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No recent activity to display</p>
                      <Button asChild className="mt-4">
                        <Link href="/donate">Make Your First Donation</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about our programs and activities
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <h4 className="font-medium">Privacy Settings</h4>
                        <p className="text-sm text-muted-foreground">Control your data and privacy preferences</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <h4 className="font-medium">Change Password</h4>
                        <p className="text-sm text-muted-foreground">Update your account password</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Footer />
      </div>
    </AuthGuard>
  )
}