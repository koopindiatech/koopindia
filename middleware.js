import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-development-koop-india";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect /adminpanel routes, but allow /adminpanel/login
  if (pathname.startsWith('/adminpanel') && pathname !== '/adminpanel/login') {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/adminpanel/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      // Valid token, proceed
      return NextResponse.next();
    } catch (error) {
      // Invalid or expired token
      return NextResponse.redirect(new URL('/adminpanel/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/adminpanel/:path*'],
};
