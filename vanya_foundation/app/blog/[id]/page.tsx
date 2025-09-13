import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, User, ArrowLeft, Share2, Heart, Tag, Clock } from "lucide-react"

// Mock blog post data - in real app, this would be fetched based on the ID
const blogPost = {
  id: 1,
  title: "Transforming Rural Education: Our Digital Literacy Initiative",
  excerpt:
    "How we're bridging the digital divide in rural communities through innovative computer education programs that are changing lives one click at a time.",
  content: `
    <p>In today's digital age, access to technology and digital literacy skills are no longer luxuries—they are necessities. Yet, millions of children in rural India still lack basic computer skills and internet access. At Vanya Foundation, we recognized this critical gap and launched our Digital Literacy Initiative to bridge the digital divide in rural communities.</p>

    <h2>The Challenge</h2>
    <p>When we first visited the remote villages of West Bengal in early 2023, we found that less than 10% of school-age children had ever used a computer. Most had never seen the internet, and many teachers lacked the skills to integrate technology into their teaching methods. This digital divide was not just limiting educational opportunities—it was creating a barrier to future employment and economic growth.</p>

    <h2>Our Approach</h2>
    <p>Our Digital Literacy Initiative takes a comprehensive approach to addressing this challenge:</p>
    
    <h3>1. Infrastructure Development</h3>
    <p>We partner with local schools to establish computer labs equipped with refurbished computers, reliable internet connections, and backup power solutions. Each lab serves 200-300 students and is designed to be sustainable and maintainable by the local community.</p>

    <h3>2. Teacher Training</h3>
    <p>We provide intensive training programs for local teachers, covering basic computer skills, internet safety, and methods for integrating technology into traditional subjects. Our train-the-trainer model ensures that knowledge is passed on and sustained within the community.</p>

    <h3>3. Student Programs</h3>
    <p>Students participate in structured computer education classes that cover:</p>
    <ul>
      <li>Basic computer operations and software</li>
      <li>Internet navigation and research skills</li>
      <li>Digital communication and collaboration</li>
      <li>Creative applications like digital art and video editing</li>
      <li>Online safety and digital citizenship</li>
    </ul>

    <h2>Impact and Results</h2>
    <p>Since launching the program, we have achieved remarkable results:</p>
    <ul>
      <li><strong>15 computer labs</strong> established across rural West Bengal</li>
      <li><strong>2,500+ students</strong> trained in basic digital literacy</li>
      <li><strong>150+ teachers</strong> equipped with technology integration skills</li>
      <li><strong>85% improvement</strong> in students' confidence with technology</li>
    </ul>

    <h2>Success Stories</h2>
    <p>Ravi, a 14-year-old student from Murshidabad district, had never seen a computer before joining our program. Today, he creates digital presentations for his school projects and has even started teaching his younger siblings basic computer skills. His teacher, Mrs. Banerjee, now uses digital tools to make her math lessons more engaging and interactive.</p>

    <p>"The computer lab has opened up a whole new world for our children," says Mrs. Banerjee. "They are more curious, more confident, and better prepared for the future."</p>

    <h2>Looking Forward</h2>
    <p>Our Digital Literacy Initiative is expanding to reach more communities across India. In 2024, we plan to establish 25 additional computer labs and train 5,000 more students. We are also developing mobile digital literacy units to reach even more remote areas.</p>

    <p>The digital divide is not just about access to technology—it's about access to opportunities. Through our Digital Literacy Initiative, we are ensuring that every child, regardless of their geographic location or economic background, has the chance to participate in the digital economy and build a brighter future.</p>
  `,
  author: "Dr. Priya Sharma",
  date: "January 15, 2024",
  category: "Education",
  tags: ["Digital Literacy", "Rural Development", "Technology"],
  image: "/placeholder.svg?height=400&width=800&text=Digital+Literacy+Initiative",
  readTime: "5 min read",
}

const relatedPosts = [
  {
    id: 2,
    title: "Teacher Training Programs: Building Capacity in Rural Schools",
    excerpt: "How our comprehensive teacher training programs are improving education quality in rural areas.",
    image: "/placeholder.svg?height=200&width=300&text=Teacher+Training",
    date: "January 8, 2024",
  },
  {
    id: 3,
    title: "Technology for Good: Innovative Solutions in Education",
    excerpt: "Exploring how technology can be leveraged to solve educational challenges in underserved communities.",
    image: "/placeholder.svg?height=200&width=300&text=Technology+Education",
    date: "December 28, 2023",
  },
]

async function getBlogPost(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}/`)
    if (!res.ok) throw new Error("Failed to fetch blog post")
    return res.json()
  } catch (error) {
    console.error("Error fetching blog post:", error);
    // Return the mock data as fallback
    return blogPost;
  }
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  let post;
  try {
    post = await getBlogPost(params.id);
  } catch (error) {
    // Use mock data as fallback
    post = blogPost;
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Back Navigation */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="default">{blogPost.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              {blogPost.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              {blogPost.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="w-4 h-4 mr-2" />
                <span className="mr-6">{blogPost.author}</span>
                <Calendar className="w-4 h-4 mr-2" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video mb-8 rounded-lg overflow-hidden">
            <img
              src={blogPost.image || "/placeholder.svg"}
              alt={blogPost.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          </div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                    <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.id}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Inspired by Our Work?</h2>
          <p className="text-lg opacity-90 mb-8 text-pretty">
            Join us in creating positive change. Your support can help us expand programs like our Digital Literacy
            Initiative to reach even more communities.
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
