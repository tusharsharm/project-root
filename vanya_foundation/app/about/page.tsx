import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Award, Users } from "lucide-react"

// Fetch About data from Django backend
async function getAbout() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about/`, {
      cache: "no-store", // always fresh
    });

    if (!res.ok) {
      throw new Error("Failed to fetch About content");
    }

    const data = await res.json();
    return data.length > 0 ? data[0] : getDefaultAbout();
  } catch (error) {
    console.error("Error fetching about data:", error);
    return getDefaultAbout();
  }
}

function getDefaultAbout() {
  return {
    title: "About Vanya Foundation",
    subtitle: "Empowering communities through sustainable development and social impact initiatives",
    mission: "To empower underprivileged communities through sustainable development programs in education, healthcare, and social welfare, creating lasting positive change in society.",
    vision: "A world where every individual has equal opportunities to thrive and contribute to society, regardless of their background or circumstances.",
    story: "Founded in 2009 with a vision to bridge the gap between privilege and need, Vanya Foundation began as a small initiative to provide educational support to children in rural communities.\n\nOver the years, we have expanded our reach and impact, touching thousands of lives across India through comprehensive programs in education, healthcare, and community development.",
    values: [
      { title: "Integrity", description: "We maintain the highest standards of honesty and transparency in all our operations." },
      { title: "Compassion", description: "We approach every situation with empathy and understanding for those we serve." },
      { title: "Excellence", description: "We strive for excellence in program delivery and measurable impact." },
      { title: "Sustainability", description: "We focus on creating long-term solutions that communities can maintain." }
    ],
    values_intro: "These core principles guide everything we do and shape our approach to community development"
  };
}

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {about.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              {about.subtitle || ""}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {about.mission}
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Eye className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {about.vision}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                {about.story
                  ? about.story.split("\n").map((para: string, idx: number) => (
                      <p key={idx}>{para}</p>
                    ))
                  : null}
              </div>
            </div>

            {about.image && (
              <div>
                <img
                  src={about.image}
                  alt="Our NGO Story"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {about.values_intro ||
                "These core principles guide everything we do and shape our approach to community development"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.values && about.values.map((val: any, i: number) => (
              <div className="text-center" key={i}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Default icon: Award. You can extend this to map icons dynamically */}
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{val.title}</h3>
                <p className="text-muted-foreground text-sm">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
