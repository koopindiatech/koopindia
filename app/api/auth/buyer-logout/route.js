import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).delete("buyer_token");
  return NextResponse.json({ success: true });
}
