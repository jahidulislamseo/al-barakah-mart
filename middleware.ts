import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })

    const isAuth = !!token

    // Debug endpoint
    if (request.nextUrl.pathname === '/verify-token') {
        return NextResponse.json(token)
    }

    const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/register')

    if (isAuthPage) {
        if (isAuth) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        return null
    }

    if (!isAuth && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isAuth && request.nextUrl.pathname.startsWith('/admin')) {
        if (token.role !== 'admin') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/register', '/verify-token']
}
