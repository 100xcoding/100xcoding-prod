import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/playground", "/portal"];
const creatorRoutes = ["/portal"];
const login = ["/login"];
export default async function middleware(req: NextRequest) {
  const session = await auth();
  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );
  const isCreatorRoute = creatorRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );
  const isLoginRoute = login.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );
  // console.log("middleware");
  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/login?msg='Login first!'", req.url));
  }
  if (session && isLoginRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isCreatorRoute && session?.user?.role !== "creator") {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
export const config = {
  matcher: [
    "/playground/:path*",
    "/portal/:path*",
    "/login",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
