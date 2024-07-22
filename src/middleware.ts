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
    console.log("middleware-1");

    return NextResponse.redirect(new URL("/login?msg='Login first!'", req.url));
  }
  if (session && isLoginRoute) {
    console.log("middleware-2");
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isCreatorRoute && session?.user?.role !== "creator") {
    console.log("middleware-3");
    return NextResponse.redirect(new URL("/", req.url));
  }
  // if (session && isProtected) {
  //   return NextResponse.next();
  // }
}
export const config = {
  matcher: [
    "/playground/:path*",
    "/portal/:path*",
    "/login",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
