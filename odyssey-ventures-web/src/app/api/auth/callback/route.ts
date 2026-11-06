import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** The emailed sign-in link lands here, exchanges its one-time code for a session, then returns to the page. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = safeNext(url.searchParams.get("next"));
  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
  }
  const lang = next.startsWith("/en") ? "en" : "ko";
  return NextResponse.redirect(new URL(`/${lang}/login?error=link`, url.origin));
}

/** Only same-site paths, so the link cannot be abused to send people elsewhere. */
function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/ko";
}
