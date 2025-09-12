import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Eye } from "lucide-react"

// Mock gallery data
const galleryImages = {
  all: [
    {
      id: 1,
      title: "School Infrastructure Development",
      category: "Education",
      location: "Rural Maharashtra",
      date: "January 2024",
      image: "/placeholder.svg?height=300&width=400&text=School+Building",
      description: "New classroom construction in partnership with local community",
    },
    {
      id: 2,
      title: "Mobile Health Camp",
      category: "Healthcare",
      location: "Rajasthan Villages",
      date: "December 2023",
      image: "/placeholder.svg?height=300&width=400&text=Health+Camp",
      description: "Free medical checkups and vaccination drive",
    },
    {
      id: 3,
      title: "Women's Skill Training",
      category: "Community Development",
      location: "Uttar Pradesh",
      date: "November 2023",
      image: "/placeholder.svg?height=300&width=400&text=Skill+Training",
      description: "Vocational training program for rural women",
    },
    {
      id: 4,
      title: "Digital Literacy Program",
      category: "Education",
      location: "West Bengal",
      date: "October 2023",
      image: "/placeholder.svg?height=300&width=400&text=Computer+Class",
      description: "Computer education for underprivileged children",
    },
    {
      id: 5,
      title: "Community Water Project",
      category: "Community Development",
      location: "Odisha",
      date: "September 2023",
      image: "/placeholder.svg?height=300&width=400&text=Water+Well",
      description: "Clean water access through bore well installation",
    },
    {
      id: 6,
      title: "Nutrition Program",
      category: "Healthcare",
      location: "Bihar",
      date: "August 2023",
      image: "/placeholder.svg?height=300&width=400&text=Nutrition+Program",
      description: "Mid-day meal program for school children",
    },
    {
      id: 7,
      title: "Teacher Training Workshop",
      category: "Education",
      location: "Karnataka",
      date: "July 2023",
      image: "/placeholder.svg?height=300&width=400&text=Teacher+Training",
      description: "Capacity building for rural school teachers",
    },
    {
      id: 8,
      title: "Self Help Group Meeting",
      category: "Community Development",
      location: "Tamil Nadu",
      date: "June 2023",
      image: "/placeholder.svg?height=300&width=400&text=SHG+Meeting",
      description: "Monthly meeting of women's self-help group",
    },
  ],
}

export default function GalleryPage() {
  const educationImages = galleryImages.all.filter((img) => img.category === "Education")
  const healthcareImages = galleryImages.all.filter((img) => img.category === "Healthcare")
  const communityImages = galleryImages.all.filter((img) => img.category === "Community Development")

  const ImageCard = ({ image }: { image: (typeof galleryImages.all)[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image.image || "/placeholder.svg"}
          alt={image.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {image.category}
          </Badge>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{image.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{image.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{image.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{image.date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Gallery</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Witness the impact of our work through these moments captured from our various programs and initiatives
              across India.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {galleryImages.all.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="education">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {educationImages.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="healthcare">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {healthcareImages.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="community">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {communityImages.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Stats Section */}
          <div className="mt-16 bg-primary/5 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Gallery Statistics</h2>
              <p className="text-muted-foreground">A glimpse into our documented impact</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-1">500+</h3>
                <p className="text-muted-foreground text-sm">Photos Captured</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-1">15+</h3>
                <p className="text-muted-foreground text-sm">States Covered</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-1">3</h3>
                <p className="text-muted-foreground text-sm">Years Documented</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-1">10K+</h3>
                <p className="text-muted-foreground text-sm">Lives Captured</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
