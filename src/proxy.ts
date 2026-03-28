import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ logged-in user ko sirf login page se block karna hai
const GUEST_ONLY_ROUTES = ["/login"];

const PROTECTED_ROUTE_PREFIXES = [
  "/home",
  "/events",
  "/mentors",
  "/well-being",
  "/learn",
  "/notifications",
  "/settings",
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("access_token")?.value;
  const isLoggedIn = Boolean(token);

  // ✅ If logged in, block login page only
  const isGuestOnly = GUEST_ONLY_ROUTES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (isGuestOnly && isLoggedIn) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // ✅ If not logged in, block protected pages
  const isProtected = PROTECTED_ROUTE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Now logged-in user can open "/" as well
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login/:path*",
    "/home/:path*",
    "/events/:path*",
    "/mentors/:path*",
    "/well-being/:path*",
    "/learn/:path*",
    "/notifications/:path*",
    "/settings/:path*",
  ],
};