// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const path = request.nextUrl.pathname

    // Public routes
    const isPublicPath =
        path === '/login' || path === '/register' || path === '/'

    // If no token and trying to access protected route
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If token exists and trying to access login/register
    if (token && (path === '/login' || path === '/register')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/dashboard/:path*',
        // '/slot-game',
        '/blackjack',
    ],
}
