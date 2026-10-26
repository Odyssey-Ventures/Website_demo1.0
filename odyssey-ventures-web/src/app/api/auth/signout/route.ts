import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  const referer = request.headers.get("referer");
  const origin = new URL(request.url).origin;
  const back = referer && referer.startsWith(origin) ? referer : `${origin}/ko`;
  return NextResponse.redirect(back, { status: 303 });
}
