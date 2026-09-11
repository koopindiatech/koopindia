import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-development-koop-india";

async function verifyToken(token) {
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // ── Redirect old portal login pages → unified login ───────────
  if (pathname === '/seller-portal/login' || pathname === '/buyer-portal/login') {
    return NextResponse.redirect(new URL('/adminpanel/login', request.url));
  }

  // ── Admin Panel ────────────────────────────────────────────────
  if (pathname.startsWith('/adminpanel') && pathname !== '/adminpanel/login') {
    const token = request.cookies.get('admin_token')?.value;
    const valid = await verifyToken(token);
    if (!valid) {
      return NextResponse.redirect(new URL('/adminpanel/login', request.url));
    }
    return NextResponse.next();
  }

  // ── Seller Portal ──────────────────────────────────────────────
  if (pathname.startsWith('/seller-portal')) {
    const token = request.cookies.get('seller_token')?.value;
    const valid = await verifyToken(token);
    if (!valid) {
      return NextResponse.redirect(new URL('/adminpanel/login', request.url));
    }
    return NextResponse.next();
  }

  // ── Buyer Portal ───────────────────────────────────────────────
  if (pathname.startsWith('/buyer-portal')) {
    const token = request.cookies.get('buyer_token')?.value;
    const valid = await verifyToken(token);
    if (!valid) {
      return NextResponse.redirect(new URL('/adminpanel/login', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/adminpanel/:path*', '/seller-portal/:path*', '/buyer-portal/:path*'],
};
