import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Users, GraduationCap, Stethoscope, Shield, CreditCard } from "lucide-react"

export default function DonatePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Make a Donation</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Your generous contribution helps us continue our mission of empowering communities and transforming lives
              across India.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Choose Your Donation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Donation Type */}
                  <div>
                    <Label className="text-base font-semibold mb-4 block">Select Donation Type</Label>
                    <RadioGroup defaultValue="one-time" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="one-time" id="one-time" />
                        <Label htmlFor="one-time" className="cursor-pointer">
                          One-time Donation
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="cursor-pointer">
                          Monthly Donation
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Donation Amount */}
                  <div>
                    <Label className="text-base font-semibold mb-4 block">Donation Amount (₹)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <Button variant="outline" className="h-12 bg-transparent">
                        ₹500
                      </Button>
                      <Button variant="outline" className="h-12 bg-transparent">
                        ₹1,000
                      </Button>
                      <Button variant="outline" className="h-12 bg-transparent">
                        ₹2,500
                      </Button>
                      <Button variant="outline" className="h-12 bg-transparent">
                        ₹5,000
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">₹</span>
                      <Input placeholder="Enter custom amount" className="text-lg" />
                    </div>
                  </div>

                  {/* Donation Purpose */}
                  <div>
                    <Label className="text-base font-semibold mb-4 block">Choose Where Your Donation Goes</Label>
                    <RadioGroup defaultValue="general" className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="general" id="general" />
                        <div className="flex items-center space-x-3">
                          <Heart className="w-5 h-5 text-primary" />
                          <Label htmlFor="general" className="cursor-pointer">
                            General Fund - Where needed most
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="education" id="education" />
                        <div className="flex items-center space-x-3">
                          <GraduationCap className="w-5 h-5 text-primary" />
                          <Label htmlFor="education" className="cursor-pointer">
                            Education Programs
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="healthcare" id="healthcare" />
                        <div className="flex items-center space-x-3">
                          <Stethoscope className="w-5 h-5 text-primary" />
                          <Label htmlFor="healthcare" className="cursor-pointer">
                            Healthcare Initiatives
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="community" id="community" />
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-primary" />
                          <Label htmlFor="community" className="cursor-pointer">
                            Community Development
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Donor Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Donor Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="Enter your first name" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Enter your last name" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="Enter your email" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="Enter your phone number" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" placeholder="Enter your address (for tax receipt)" rows={3} />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        className="h-16 flex flex-col items-center justify-center bg-transparent"
                      >
                        <CreditCard className="w-6 h-6 mb-1" />
                        <span className="text-sm">Credit/Debit Card</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-16 flex flex-col items-center justify-center bg-transparent"
                      >
                        <div className="w-6 h-6 mb-1 bg-primary rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">UPI</span>
                        </div>
                        <span className="text-sm">UPI Payment</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-16 flex flex-col items-center justify-center bg-transparent"
                      >
                        <div className="w-6 h-6 mb-1 bg-primary rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">NB</span>
                        </div>
                        <span className="text-sm">Net Banking</span>
                      </Button>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="border-t pt-6">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">
                          Terms and Conditions
                        </a>{" "}
                        and understand that my donation is voluntary and will be used for the selected purpose.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2 mt-3">
                      <Checkbox id="receipt" defaultChecked />
                      <Label htmlFor="receipt" className="text-sm leading-relaxed">
                        I would like to receive a tax-deductible receipt for this donation.
                      </Label>
                    </div>
                  </div>

                  {/* Donate Button */}
                  <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90">Proceed to Payment</Button>
                </CardContent>
              </Card>
            </div>

            {/* Donation Impact Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-primary" />
                    Secure Donation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your donation is processed through secure, encrypted channels. We are committed to protecting your
                    privacy and financial information.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-sm">₹500</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Provides school supplies for 5 children</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-sm">₹1K</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Funds a health checkup for 10 people</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-sm">₹2.5K</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Supports a family's monthly nutrition needs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-sm">₹5K</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Provides vocational training for 2 women</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Donations to Vanya Foundation are eligible for tax deduction under Section 80G of the Income Tax
                    Act.
                  </p>
                  <p className="text-sm font-medium text-primary">Registration No: 12345678</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Other Ways to Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="/volunteer">
                      <Users className="w-4 h-4 mr-2" />
                      Volunteer With Us
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="/corporate-partnership">
                      <Heart className="w-4 h-4 mr-2" />
                      Corporate Partnership
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
