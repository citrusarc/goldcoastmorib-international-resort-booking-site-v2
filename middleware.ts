import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;
  const pathname = req.nextUrl.pathname;
  const isOnLogin = pathname === "/admin/login";

  if (!user && pathname.startsWith("/admin") && !isOnLogin) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (user && isOnLogin) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
