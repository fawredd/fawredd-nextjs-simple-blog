import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const user = await verifyToken(token)
      if (!user || user.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    } catch (error) {
      console.error('Middleware auth error:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect logged-in users away from login page
  if (pathname === '/login') {
    const token = request.cookies.get('auth-token')?.value
    
    if (token) {
      try {
        const user = await verifyToken(token)
        if (user && user.role === 'admin') {
          return NextResponse.redirect(new URL('/admin', request.url))
        }
      } catch (error) {
        // Token is invalid, allow access to login page
        console.error('Token verification failed:', error)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login'
  ]
}
