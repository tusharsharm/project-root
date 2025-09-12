import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, Stethoscope, Users, Droplets, Lightbulb, Heart } from "lucide-react"

export default function OurWorkPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Work</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Discover how we're creating lasting change through comprehensive programs designed to address the root
              causes of poverty and inequality.
            </p>
          </div>
        </div>
      </section>

      {/* Program Areas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="overflow-hidden">
              <div className="aspect-video">
                <img src="/placeholder-31qm1.png" alt="Education program" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <GraduationCap className="w-6 h-6 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">Education</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Building educational infrastructure, training teachers, and providing scholarships to ensure quality
                  education reaches every child.
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li>• 200+ schools supported with infrastructure development</li>
                  <li>• 5,000+ children receiving scholarships annually</li>
                  <li>• 500+ teachers trained in modern teaching methods</li>
                  <li>• Digital literacy programs in 50+ villages</li>
                </ul>
                <Button asChild variant="outline">
                  <Link href="/donate">Support Education</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video">
                <img src="/placeholder-nhzpn.png" alt="Healthcare program" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Stethoscope className="w-6 h-6 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">Healthcare</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Providing accessible healthcare services through mobile clinics, health camps, and awareness programs.
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li>• 100+ health camps organized annually</li>
                  <li>• 25,000+ patients treated through mobile clinics</li>
                  <li>• Vaccination drives reaching 10,000+ children</li>
                  <li>• Maternal health programs in 30+ villages</li>
                </ul>
                <Button asChild variant="outline">
                  <Link href="/donate">Support Healthcare</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video">
                <img
                  src="/placeholder-35h9s.png"
                  alt="Community development program"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Users className="w-6 h-6 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">Community Development</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Empowering communities through skill development, women's empowerment, and sustainable livelihood
                  programs.
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li>• 2,000+ women trained in vocational skills</li>
                  <li>• 150+ self-help groups established</li>
                  <li>• Microfinance support to 1,000+ families</li>
                  <li>• Rural entrepreneurship programs</li>
                </ul>
                <Button asChild variant="outline">
                  <Link href="/donate">Support Development</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video">
                <img
                  src="/placeholder-l3ny5.png"
                  alt="Water and sanitation program"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Droplets className="w-6 h-6 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">Water & Sanitation</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Ensuring access to clean water and proper sanitation facilities to improve health and quality of life.
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li>• 75+ water wells constructed</li>
                  <li>• 500+ household toilets built</li>
                  <li>• Water purification systems installed</li>
                  <li>• Hygiene awareness campaigns</li>
                </ul>
                <Button asChild variant="outline">
                  <Link href="/donate">Support Water Projects</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Special Initiatives */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Special Initiatives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Innovative programs addressing specific challenges and creating unique opportunities for growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Digital Literacy</h3>
                <p className="text-muted-foreground text-sm">
                  Bridging the digital divide by providing computer education and internet access to rural communities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Emergency Relief</h3>
                <p className="text-muted-foreground text-sm">
                  Rapid response programs providing immediate assistance during natural disasters and emergencies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Youth Leadership</h3>
                <p className="text-muted-foreground text-sm">
                  Developing young leaders through mentorship programs and leadership training workshops.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Be Part of the Change</h2>
          <p className="text-lg opacity-90 mb-8 text-pretty">
            Your support enables us to expand our programs and reach more communities in need. Together, we can create
            lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/donate">Make a Donation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              <Link href="/volunteer">Volunteer With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
