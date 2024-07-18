import { LOGIN, PUBLIC_ROUTES, ROOT } from "@/utils/routes";
import { NextResponse } from "next/server";
export function middleware(req) {
  const { nextUrl } = req;
  const token = req.cookies.get("vendorToken");

  const { pathname } = req.nextUrl;

  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;
  console.log("Current pathname:", pathname);
  console.log({ isPublicRoute });

  if (!token && !isPublicRoute)
    return Response.redirect(new URL(LOGIN, nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
