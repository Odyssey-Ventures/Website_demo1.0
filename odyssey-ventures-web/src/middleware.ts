import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * Every page lives under /en or /ko. Any other path is sent to the default
 * language, so "/" becomes "/ko" and the old "/academy" becomes "/ko/academy".
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals and any file with an extension (robots.txt, sitemap.xml, images, icons).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
