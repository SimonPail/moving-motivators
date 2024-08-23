import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./i18n";
import { Locale } from "./types/locale";
import { defaultTheme, themes } from "./themes";

export function middleware(request: NextRequest, response: NextResponse) {
 const { pathname } = request.nextUrl;
 const parts = pathname.split("/");

 //[LOCALE]
 const localeRouter = parts[1] as Locale | undefined;
 const pathnameHasLocale = locales.some((locale) => locale === localeRouter);

 if (!pathnameHasLocale) {
  const locale = request.cookies.get("NEXT_LOCALE")?.value || defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
 }

 //[THEME]
 const themeRouter = parts[2] as Theme;
 if (!themes.includes(themeRouter)) {
  const theme = request.cookies.get("NEXT_THEME")?.value || defaultTheme;
  return NextResponse.redirect(
   new URL(`/${localeRouter}/${theme}${pathname.slice(3)}`, request.url)
  );
 }

 return NextResponse.next();
}

export const config = {
 matcher: [
  "/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)",
  "/",
 ],
};
