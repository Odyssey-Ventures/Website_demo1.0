import { notFound, redirect } from "next/navigation";
import { isLocale, localizedHref } from "@/i18n/config";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getViewer, type Viewer } from "@/lib/supabase/server";

/**
 * Server-side gate for every /admin page. Visitors who are not signed in are sent to sign-in;
 * signed-in visitors who are not staff (confirmed @odysseyventures.llc address) get a plain 404,
 * so the admin area does not reveal that it exists. The database's row-level security is the
 * second, independent check on every read and write.
 */
export async function requireStaff(lang: string, nextPath: string): Promise<Viewer> {
  if (!isLocale(lang) || !isSupabaseConfigured) notFound();
  const viewer = await getViewer();
  if (!viewer) redirect(`${localizedHref(lang, "/login")}?next=${encodeURIComponent(`/${lang}${nextPath}`)}`);
  if (!viewer.isStaff) notFound();
  return viewer;
}
