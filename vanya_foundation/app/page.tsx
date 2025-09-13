"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AuthGuard } from "@/components/auth-guard"
import Link from "next/link"
import { Users, GraduationCap, Heart, Stethoscope, ArrowRight, CheckCircle, Save, X } from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState({
    heroTitle: "Empowering Communities,",
    heroTitleHighlight: " Transforming Lives",
    heroDescription:
      "Join Vanya Foundation in our mission to create lasting change through education, healthcare, and community development programs across India.",
    impactTitle: "Our Impact",
    impactDescription: "Together, we've made a significant difference in communities across India",
    impactStats: {
      lives: "50,000+",
      livesLabel: "Lives Impacted",
      schools: "200+",
      schoolsLabel: "Schools Supported",
      health: "100+",
      healthLabel: "Health Camps",
      years: "15+",
      yearsLabel: "Years of Service",
    },
    ourWorkTitle: "Our Work",
    ourWorkDescription: "We focus on sustainable development through comprehensive programs",
    ctaTitle: "Join Us in Making a Difference",
    ctaDescription:
      "Your support can transform lives and build stronger communities. Every contribution counts towards creating a better future.",
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const adminParam = urlParams.get("admin")
    if (adminParam === "VANYA_ADMIN_2024") {
      setIsAdmin(true)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("homepage_content", JSON.stringify(content))
    setIsEditing(false)
    alert("Content saved successfully!")
  }

  const handleCancel = () => {
    const savedContent = localStorage.getItem("homepage_content")
    if (savedContent) {
      setContent(JSON.parse(savedContent))
    }
    setIsEditing(false)
  }

  useEffect(() => {
    const savedContent = localStorage.getItem("homepage_content")
    if (savedContent) {
      setContent(JSON.parse(savedContent))
    }
  }, [])

  return (
    <AuthGuard>
      <div className="min-h-screen">
        <Header />

        {isAdmin && (
          <div className="fixed top-4 right-4 z-50 flex gap-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="bg-primary shadow-lg">
                Edit Page
              </Button>
            ) : (
              <>
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 shadow-lg">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" className="shadow-lg">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        )}

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {isEditing ? (
                <div className="space-y-4 mb-6">
                  <Input
                    value={content.heroTitle}
                    onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                    className="text-2xl font-bold"
                    placeholder="Hero title"
                  />
                  <Input
                    value={content.heroTitleHighlight}
                    onChange={(e) => setContent({ ...content, heroTitleHighlight: e.target.value })}
                    className="text-2xl font-bold text-primary"
                    placeholder="Hero title highlight"
                  />
                </div>
              ) : (
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                  {content.heroTitle}
                  <span className="text-primary">{content.heroTitleHighlight}</span>
                </h1>
              )}

              {isEditing ? (
                <Textarea
                  value={content.heroDescription}
                  onChange={(e) => setContent({ ...content, heroDescription: e.target.value })}
                  className="mb-8"
                  rows={3}
                  placeholder="Hero description"
                />
              ) : (
                <p className="text-lg text-muted-foreground mb-8 text-pretty">{content.heroDescription}</p>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/donate">Donate Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/our-work">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder-y30g8.png"
                alt="Community empowerment activities"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {isEditing ? (
              <div className="space-y-4">
                <Input
                  value={content.impactTitle}
                  onChange={(e) => setContent({ ...content, impactTitle: e.target.value })}
                  className="text-center text-2xl font-bold"
                  placeholder="Impact title"
                />
                <Textarea
                  value={content.impactDescription}
                  onChange={(e) => setContent({ ...content, impactDescription: e.target.value })}
                  className="text-center"
                  rows={2}
                  placeholder="Impact description"
                />
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-foreground mb-4">{content.impactTitle}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">{content.impactDescription}</p>
              </>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={content.impactStats.lives}
                    onChange={(e) =>
                      setContent({ ...content, impactStats: { ...content.impactStats, lives: e.target.value } })
                    }
                    className="text-center font-bold"
                    placeholder="Lives count"
                  />
                  <Input
                    value={content.impactStats.livesLabel}
                    onChange={(e) =>
                      setContent({ ...content, impactStats: { ...content.impactStats, livesLabel: e.target.value } })
                    }
                    className="text-center"
                    placeholder="Lives label"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-primary mb-2">{content.impactStats.lives}</h3>
                  <p className="text-muted-foreground">{content.impactStats.livesLabel}</p>
                </>
              )}
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={content.impactStats.schools}
                    onChange={(e) =>
                      setContent({ ...content, impactStats: { ...content.impactStats, schools: e.target.value } })
                    }
                    className="text-center font-bold"
                    placeholder="Schools count"
                  />
                  <Input
                    value={content.impactStats.schoolsLabel}
                    onChange={(e) =>
                      setContent({ ...content, impactStats: { ...content.impactStats, schoolsLabel: e.target.value } })
                    }
                    className="text-center"
                    placeholder="Schools label"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-primary mb-2">{content.impactStats.schools}</h3>
                  <p className="text-muted-foreground">{content.impactStats.schoolsLabel}</p>
                </>
              )}
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={content.impactStats.health}
                    onChange={(e) =>
                      setContent({ ...content, impactStats: { ...content.impactStats, health: e.target.value } })
                    }
                    className="text-center font-bold"
                    placeholder="Health camps count"
                  />
                  <Input
                    value={content.impactStats.healthLabel}
                    onChange={(e) =>
                      setContent({ ...content, impactStats: { ...content.impactStats, healthLabel: e.target.value } })
                    }
                    className="text-center"
                    placeholder="Health camps label"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-primary mb-2">{content.impactStats.health}</h3>
                  <p className="text-muted-foreground">{content.impactStats.healthLabel}</p>
                </>
              )}
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={content.impactStats.years}
                    onChange={(e) =>
                      setContent({ ...content, impactStats: { ...content.impactStats, years: e.target.value } })
                    }
                    className="text-center font-bold"
                    placeholder="Years count"
                  />
                  <Input
                    value={content.impactStats.yearsLabel}
                    onChange={(e) =>
                      setContent({ ...content, impactStats: { ...content.impactStats, yearsLabel: e.target.value } })
                    }
                    className="text-center"
                    placeholder="Years label"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-primary mb-2">{content.impactStats.years}</h3>
                  <p className="text-muted-foreground">{content.impactStats.yearsLabel}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Work */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {isEditing ? (
              <div className="space-y-4">
                <Input
                  value={content.ourWorkTitle}
                  onChange={(e) => setContent({ ...content, ourWorkTitle: e.target.value })}
                  className="text-center text-2xl font-bold"
                  placeholder="Our work title"
                />
                <Textarea
                  value={content.ourWorkDescription}
                  onChange={(e) => setContent({ ...content, ourWorkDescription: e.target.value })}
                  className="text-center"
                  rows={2}
                  placeholder="Our work description"
                />
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-foreground mb-4">{content.ourWorkTitle}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">{content.ourWorkDescription}</p>
              </>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Education</h3>
                <p className="text-muted-foreground mb-4">
                  Providing quality education, scholarships, and learning resources to underprivileged children.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    School infrastructure development
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Teacher training programs
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Digital literacy initiatives
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Healthcare</h3>
                <p className="text-muted-foreground mb-4">
                  Ensuring access to quality healthcare services and promoting health awareness.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Mobile health clinics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Vaccination drives
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Health awareness campaigns
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Development</h3>
                <p className="text-muted-foreground mb-4">
                  Building sustainable communities through skill development and empowerment programs.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Vocational training
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Women empowerment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Rural development
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {isEditing ? (
            <div className="space-y-4 mb-8">
              <Input
                value={content.ctaTitle}
                onChange={(e) => setContent({ ...content, ctaTitle: e.target.value })}
                className="text-center text-2xl font-bold bg-white/10 border-white/20 text-white placeholder:text-white/70"
                placeholder="CTA title"
              />
              <Textarea
                value={content.ctaDescription}
                onChange={(e) => setContent({ ...content, ctaDescription: e.target.value })}
                className="text-center bg-white/10 border-white/20 text-white placeholder:text-white/70"
                rows={3}
                placeholder="CTA description"
              />
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">{content.ctaTitle}</h2>
              <p className="text-lg opacity-90 mb-8 text-pretty">{content.ctaDescription}</p>
            </>
          )}
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
              <Link href="/volunteer">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </AuthGuard>
  )
}
