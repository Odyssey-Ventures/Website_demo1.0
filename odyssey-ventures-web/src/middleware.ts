import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "@/lib/supabase/config";

/**
 * Every page lives under /en or /ko. Any other path is sent to the default
 * language, so "/" becomes "/ko" and the old "/academy" becomes "/ko/academy".
 * When sign-in is configured, it also keeps the visitor's session fresh.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  let response = NextResponse.next({ request });
  if (!isSupabaseConfigured) return response;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        for (const { name, value } of list) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of list) response.cookies.set(name, value, options);
      },
    },
  });
  // Refreshes an expiring session and writes the new cookies onto the response.
  await supabase.auth.getUser();
  return response;
}

export const config = {
  // Skip Next.js internals, API routes and any file with an extension (robots.txt, sitemap.xml, images, icons).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
