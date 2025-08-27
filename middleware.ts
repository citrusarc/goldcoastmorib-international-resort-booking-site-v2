import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          cookie: req.headers.get("cookie") || "", // pass cookies to Supabase
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const path = req.nextUrl.pathname;

  // Redirect not logged-in users to login
  if (!session && path.startsWith("/admin") && path !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Redirect logged-in users away from login page
  if (session && path === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // protect all /admin routes
};
