import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user is trying to access admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const token = request.cookies.get('access')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect root to login for first-time visitors
  if (pathname === '/') {
    const hasVisited = request.cookies.get('hasVisited')?.value
    const token = request.cookies.get('access')?.value

    if (!hasVisited && !token) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.set('hasVisited', 'true', { maxAge: 60 * 60 * 24 * 30 }) // 30 days
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}