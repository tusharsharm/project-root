"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, User, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Vanya Foundation</h1>
              <p className="text-xs text-muted-foreground">Empowering Communities</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/our-work" className="text-foreground hover:text-primary transition-colors">
              Our Work
            </Link>
            <Link href="/gallery" className="text-foreground hover:text-primary transition-colors">
              Gallery
            </Link>
            <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/donate">Donate Now</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {user?.first_name || user?.username}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {user?.is_staff && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/donate">Donate Now</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/our-work" className="text-foreground hover:text-primary transition-colors">
                Our Work
              </Link>
              <Link href="/gallery" className="text-foreground hover:text-primary transition-colors">
                Gallery
              </Link>
              <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              
              {isAuthenticated ? (
                <div className="space-y-2 pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    Welcome, {user?.first_name || user?.username}
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary/90 w-fit">
                    <Link href="/donate">Donate Now</Link>
                  </Button>
                  {user?.is_staff && (
                    <Button asChild variant="outline" className="w-fit">
                      <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </Button>
                  )}
                  <Button variant="ghost" onClick={logout} className="w-fit text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 pt-2 border-t">
                  <Button asChild className="bg-primary hover:bg-primary/90 w-fit">
                    <Link href="/donate">Donate Now</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-fit">
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
