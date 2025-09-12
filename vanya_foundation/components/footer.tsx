import Link from "next/link"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Vanya Foundation</h3>
                <p className="text-sm opacity-90">Empowering Communities</p>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-4 max-w-md">
              Dedicated to creating positive change through education, healthcare, and community development programs
              across India. Together, we build a better tomorrow.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
              <Twitter className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
              <Instagram className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
              <Linkedin className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="opacity-90 hover:opacity-100">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/our-work" className="opacity-90 hover:opacity-100">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="opacity-90 hover:opacity-100">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="opacity-90 hover:opacity-100">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/donate" className="opacity-90 hover:opacity-100">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="opacity-90">123 Foundation Street, New Delhi, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="opacity-90">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="opacity-90">info@vanyafoundation.org</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-90">
          <p>&copy; 2024 Vanya Foundation. All rights reserved. | Reg. No: 12345678</p>
        </div>
      </div>
    </footer>
  )
}
