"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Calendar, User, ArrowRight, Search, CheckCircle, AlertCircle } from "lucide-react"

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// async function getBlogPosts() {
//   const res = await fetch(`${API_URL}/api/blog/`, { next: { revalidate: 3600 } });
//   if (!res.ok) throw new Error('Failed to fetch blog posts');
//   return res.json();
// }

const blogPosts = [
  {
    id: 1,
    title: "Transforming Rural Education: Our Digital Literacy Initiative",
    excerpt:
      "How we're bridging the digital divide in rural communities through innovative computer education programs that are changing lives one click at a time.",
    content: "Full blog content would go here...",
    author: "Dr. Priya Sharma",
    date: "January 15, 2024",
    category: "Education",
    tags: ["Digital Literacy", "Rural Development", "Technology"],
    image: "/placeholder.svg?height=300&width=500&text=Digital+Literacy",
    featured: true,
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Healthcare Reaches Remote Villages: Mobile Clinic Success Story",
    excerpt:
      "Our mobile health clinics have completed 100 camps this year, bringing essential medical care to the doorsteps of those who need it most.",
    content: "Full blog content would go here...",
    author: "Dr. Rajesh Kumar",
    date: "January 10, 2024",
    category: "Healthcare",
    tags: ["Mobile Clinics", "Rural Healthcare", "Community Health"],
    image: "/placeholder.svg?height=300&width=500&text=Mobile+Clinic",
    featured: false,
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Women Empowerment Through Skill Development",
    excerpt:
      "Meet the inspiring women who have transformed their lives and communities through our vocational training programs and microfinance initiatives.",
    content: "Full blog content would go here...",
    author: "Sunita Gupta",
    date: "January 5, 2024",
    category: "Community Development",
    tags: ["Women Empowerment", "Skill Development", "Microfinance"],
    image: "/placeholder.svg?height=300&width=500&text=Women+Empowerment",
    featured: false,
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "2023 Impact Report: A Year of Meaningful Change",
    excerpt:
      "Reflecting on our achievements in 2023 - from reaching 50,000 beneficiaries to launching new programs that are creating lasting impact.",
    content: "Full blog content would go here...",
    author: "Vanya Foundation Team",
    date: "December 31, 2023",
    category: "Impact Report",
    tags: ["Annual Report", "Impact", "Statistics"],
    image: "/placeholder.svg?height=300&width=500&text=Impact+Report",
    featured: true,
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Clean Water Initiative: Building Wells, Building Hope",
    excerpt:
      "Our water and sanitation program has provided clean drinking water access to over 25 villages, improving health outcomes and quality of life.",
    content: "Full blog content would go here...",
    author: "Amit Patel",
    date: "December 20, 2023",
    category: "Community Development",
    tags: ["Water", "Sanitation", "Health"],
    image: "/placeholder.svg?height=300&width=500&text=Water+Initiative",
    featured: false,
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Volunteer Spotlight: Stories from the Field",
    excerpt:
      "Hear from our dedicated volunteers who are making a difference in communities across India, sharing their experiences and motivations.",
    content: "Full blog content would go here...",
    author: "Kavya Nair",
    date: "December 15, 2023",
    category: "Volunteer Stories",
    tags: ["Volunteers", "Stories", "Community"],
    image: "/placeholder.svg?height=300&width=500&text=Volunteer+Stories",
    featured: false,
    readTime: "7 min read",
  },
]

const categories = ["All", "Education", "Healthcare", "Community Development", "Impact Report", "Volunteer Stories"]

export default function BlogPage() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    setSubscribeStatus("idle")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubscribeStatus("success")
        setStatusMessage(result.message)
        setEmail("")
      } else {
        setSubscribeStatus("error")
        setStatusMessage(result.error || "Failed to subscribe")
      }
    } catch (error) {
      setSubscribeStatus("error")
      setStatusMessage("Network error. Please try again.")
    } finally {
      setIsSubscribing(false)
    }
  }

  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">News & Stories</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Stay updated with our latest initiatives, impact stories, and insights from the field. Discover how we're
              creating positive change together.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button key={category} variant="outline" size="sm" className="bg-transparent">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="default">{post.category}</Badge>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                      <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="w-4 h-4 mr-1" />
                        <span className="mr-4">{post.author}</span>
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/blog/${post.id}`}>
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                    <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <User className="w-3 h-3 mr-1" />
                      <span className="mr-3">{post.author}</span>
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg opacity-90 mb-8 text-pretty">
            Subscribe to our newsletter to receive the latest updates about our programs, impact stories, and ways you
            can get involved.
          </p>

          {subscribeStatus !== "idle" && (
            <Alert
              className={`mb-6 max-w-md mx-auto ${subscribeStatus === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
            >
              <div className="flex items-center">
                {subscribeStatus === "success" ? (
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                )}
                <AlertDescription className={subscribeStatus === "success" ? "text-green-800" : "text-red-800"}>
                  {statusMessage}
                </AlertDescription>
              </div>
            </Alert>
          )}

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-white text-foreground"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
              disabled={isSubscribing}
            >
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
