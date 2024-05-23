import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const redirectPattern = /^\/(store-settings(\/profile-settings\/?)?)?$/;

  if (
    redirectPattern.test(pathname) ||
    pathname === "/store-settings/profile-settings"
  ) {
    return NextResponse.redirect(
      new URL("/store-settings/profile-settings/profile", req.url)
    );
  }

  // Allow the request to proceed
  return NextResponse.next();
}
