import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./i18n";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
 const { pathname } = request.nextUrl;

 if (
  pathname.startsWith("/_next") ||
  pathname.includes("/api/") ||
  PUBLIC_FILE.test(pathname)
 ) {
  return;
 }

 const pathnameHasLocale = locales.some(
  (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
 );

 if (pathnameHasLocale) return;

 const locale = request.cookies.get("NEXT_LOCALE")?.value || defaultLocale;
 request.nextUrl.pathname = `/${locale}${pathname}`;

 return NextResponse.redirect(request.nextUrl);
}

export const config = {
 matcher: [
  // Skip all internal paths (_next)
  "/((?!_next).*)",
  // Optional: only run on root (/) URL
  // '/'
 ],
};
