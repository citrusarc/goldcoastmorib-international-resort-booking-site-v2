import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // handle GET request
  return NextResponse.json({ message: "Hello GET" });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  return NextResponse.json({ received: data });
}
