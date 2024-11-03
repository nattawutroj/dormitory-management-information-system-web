import { NextResponse, NextRequest } from 'next/server'
import { decrypt, PayloadType } from './lib/jwt'

export async function middleware(request: NextRequest) {
  const auth_token = request.cookies.get('auth_token')
  const { pathname } = request.nextUrl

  if (pathname === '/logout') {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('auth_token')
    response.cookies.getAll()
    return response
  }

  if (!auth_token || pathname === '/') {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  const payload: PayloadType = await decrypt(auth_token.value)
  const management = payload?.role === 'superuser' || 'moderator'

  if (pathname === '/launcher') {
    if (management) {
      return NextResponse.redirect(new URL('/management', request.url))
    }
  }

  if (management && pathname.includes('management')) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|api|auth|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
