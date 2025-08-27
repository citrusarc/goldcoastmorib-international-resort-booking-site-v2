import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js"; // plain client
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Example: check if user has a session cookie
  const accessToken = req.cookies.get("sb-access-token")?.value;

  if (!accessToken && req.nextUrl.pathname.startsWith("/admin")) {
    // redirect to login if not authenticated
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

// Optional: which paths to match
export const config = {
  matcher: ["/admin/:path*"],
};
