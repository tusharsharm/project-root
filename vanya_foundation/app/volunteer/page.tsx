'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Users, Heart, Clock, MapPin, GraduationCap, Stethoscope } from "lucide-react"

export default function VolunteerPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    areas: [] as string[],
    availability: '',
    skills: '',
    experience: '',
    motivation: '',
    emergencyName: '',
    emergencyPhone: '',
    relationship: ''
  });
  const [loading, setLoading] = useState(false);

  const handleAreaChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      areas: checked 
        ? [...prev.areas, area]
        : prev.areas.filter(a => a !== area)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success!",
          description: "Your volunteer application has been submitted successfully.",
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          areas: [],
          availability: '',
          skills: '',
          experience: '',
          motivation: '',
          emergencyName: '',
          emergencyPhone: '',
          relationship: ''
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Volunteer With Us</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Join our community of dedicated volunteers and make a direct impact in the lives of those who need it
              most. Your time and skills can create lasting change.
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Volunteer Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from various ways to contribute your time and expertise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Education Volunteer</h3>
                <p className="text-muted-foreground mb-4">
                  Teach children, conduct workshops, or help with educational activities in our partner schools.
                </p>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Teaching assistance</li>
                  <li>• Computer literacy training</li>
                  <li>• Creative workshops</li>
                  <li>• Mentoring programs</li>
                </ul>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>4-6 hours/week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Healthcare Volunteer</h3>
                <p className="text-muted-foreground mb-4">
                  Support our health camps, awareness programs, and community health initiatives.
                </p>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Health camp assistance</li>
                  <li>• Health awareness campaigns</li>
                  <li>• First aid training</li>
                  <li>• Medical record keeping</li>
                </ul>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>6-8 hours/month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Outreach</h3>
                <p className="text-muted-foreground mb-4">
                  Help organize events, conduct surveys, and engage with communities directly.
                </p>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Event organization</li>
                  <li>• Community surveys</li>
                  <li>• Awareness campaigns</li>
                  <li>• Fundraising events</li>
                </ul>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Flexible timing</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Volunteer Registration Form */}
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Volunteer Registration</CardTitle>
                <p className="text-center text-muted-foreground">Fill out this form to join our volunteer community</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        placeholder="Enter your first name" 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Enter your last name" 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Enter your email" 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="Enter your phone number" 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" type="number" placeholder="Enter your age" />
                    </div>
                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input id="occupation" placeholder="Enter your occupation" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" placeholder="Enter your complete address" rows={3} />
                    </div>
                  </div>
                </div>

                {/* Volunteer Preferences */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Volunteer Preferences</h3>

                  <div className="mb-6">
                    <Label className="text-base font-medium mb-3 block">
                      Areas of Interest (Select all that apply)
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="education" 
                          checked={formData.areas.includes('Education & Teaching')}
                          onCheckedChange={(checked) => handleAreaChange('Education & Teaching', checked as boolean)}
                        />
                        <Label htmlFor="education">Education & Teaching</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="healthcare" 
                          checked={formData.areas.includes('Healthcare & Wellness')}
                          onCheckedChange={(checked) => handleAreaChange('Healthcare & Wellness', checked as boolean)}
                        />
                        <Label htmlFor="healthcare">Healthcare & Wellness</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="community" 
                          checked={formData.areas.includes('Community Development')}
                          onCheckedChange={(checked) => handleAreaChange('Community Development', checked as boolean)}
                        />
                        <Label htmlFor="community">Community Development</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="events" 
                          checked={formData.areas.includes('Event Organization')}
                          onCheckedChange={(checked) => handleAreaChange('Event Organization', checked as boolean)}
                        />
                        <Label htmlFor="events">Event Organization</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="fundraising" 
                          checked={formData.areas.includes('Fundraising')}
                          onCheckedChange={(checked) => handleAreaChange('Fundraising', checked as boolean)}
                        />
                        <Label htmlFor="fundraising">Fundraising</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="admin" 
                          checked={formData.areas.includes('Administrative Support')}
                          onCheckedChange={(checked) => handleAreaChange('Administrative Support', checked as boolean)}
                        />
                        <Label htmlFor="admin">Administrative Support</Label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label className="text-base font-medium mb-3 block">Availability</Label>
                    <RadioGroup 
                      value={formData.availability} 
                      onValueChange={(value) => setFormData({...formData, availability: value})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekdays" id="weekdays" />
                        <Label htmlFor="weekdays">Weekdays</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekends" id="weekends" />
                        <Label htmlFor="weekends">Weekends</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="flexible" id="flexible" />
                        <Label htmlFor="flexible">Flexible</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="mb-6">
                    <Label className="text-base font-medium mb-3 block">Time Commitment</Label>
                    <RadioGroup defaultValue="2-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1-2" id="1-2" />
                        <Label htmlFor="1-2">1-2 hours per week</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2-4" id="2-4" />
                        <Label htmlFor="2-4">2-4 hours per week</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4-8" id="4-8" />
                        <Label htmlFor="4-8">4-8 hours per week</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="8+" id="8+" />
                        <Label htmlFor="8+">More than 8 hours per week</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Skills and Experience */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Skills & Experience</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="skills">Special Skills or Qualifications</Label>
                      <Textarea
                        id="skills"
                        value={formData.skills}
                        onChange={(e) => setFormData({...formData, skills: e.target.value})}
                        placeholder="List any relevant skills, qualifications, or experience (e.g., teaching, medical, technical, language skills, etc.)"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Previous Volunteer Experience</Label>
                      <Textarea
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        placeholder="Describe any previous volunteer work or community involvement"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="motivation">Why do you want to volunteer with us?</Label>
                      <Textarea
                        id="motivation"
                        value={formData.motivation}
                        onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                        placeholder="Tell us what motivates you to volunteer and how you hope to contribute"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyName">Contact Name</Label>
                      <Input 
                        id="emergencyName" 
                        value={formData.emergencyName}
                        onChange={(e) => setFormData({...formData, emergencyName: e.target.value})}
                        placeholder="Emergency contact name" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Contact Phone</Label>
                      <Input 
                        id="emergencyPhone" 
                        type="tel" 
                        value={formData.emergencyPhone}
                        onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
                        placeholder="Emergency contact phone" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="relationship">Relationship</Label>
                      <Input 
                        id="relationship" 
                        value={formData.relationship}
                        onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                        placeholder="Relationship to you" 
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="border-t pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">
                          Terms and Conditions
                        </a>{" "}
                        and volunteer guidelines of Vanya Foundation.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="background" />
                      <Label htmlFor="background" className="text-sm leading-relaxed">
                        I consent to a background verification check if required for my volunteer role.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="updates" defaultChecked />
                      <Label htmlFor="updates" className="text-sm leading-relaxed">
                        I would like to receive updates about volunteer opportunities and foundation activities.
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Volunteer Application'}
                </Button>
              </CardContent>
            </Card>
          </form>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Volunteer With Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join a community of passionate individuals making a real difference
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Make a Difference</h3>
              <p className="text-muted-foreground text-sm">
                Create direct, measurable impact in the lives of those who need it most.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Build Community</h3>
              <p className="text-muted-foreground text-sm">
                Connect with like-minded individuals and build lasting friendships.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Learn & Grow</h3>
              <p className="text-muted-foreground text-sm">
                Develop new skills and gain valuable experience in social work.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Local Impact</h3>
              <p className="text-muted-foreground text-sm">
                Work directly with communities and see the results of your efforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
