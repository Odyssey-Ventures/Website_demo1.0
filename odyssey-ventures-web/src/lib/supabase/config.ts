/** Supabase project (Settings → API). Both are public values; the database rules protect the data. */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Until these are set, Newsroom shows a "coming soon" note and sign-in is hidden. */
export const isSupabaseConfigured = supabaseUrl !== "" && supabaseAnonKey !== "";

/** Signing in with an address at this domain makes someone staff. Must match public.is_staff() in the SQL migration. */
export const STAFF_EMAIL_DOMAIN = "odysseyventures.llc";

export function isStaffEmail(email: string | null | undefined): boolean {
  return !!email && email.toLowerCase().endsWith(`@${STAFF_EMAIL_DOMAIN}`);
}
