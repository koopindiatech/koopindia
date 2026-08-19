import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-development-koop-india";

export async function POST(request) {
  try {
    const body = await request.json();
    const { user } = body;

    if (!user || !user.role) {
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }

    // Sign the JWT
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({ 
      id: user.id,
      email: user.email, 
      role: user.role,
      name: user.name 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    // Set the cookie
    (await cookies()).set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
