import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).delete("seller_token");
  return NextResponse.json({ success: true });
}
