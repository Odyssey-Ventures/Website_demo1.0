/**
 * Supabase project "odyssey-ventures-web" (ref eotwfhmktbcrfnumddov, us-west-1).
 * Both values are public by design (they are sent to every browser); the database's row-level security protects the data.
 * Vercel environment variables, when set, override these defaults. Never put the service_role / secret key here.
 */
const DEFAULT_SUPABASE_URL = "https://eotwfhmktbcrfnumddov.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ZV9362qkqx26RBc7pom0GA_sOgjr5Ji";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_PUBLISHABLE_KEY;

/** Until these are set, Newsroom shows a "coming soon" note and sign-in is hidden. */
export const isSupabaseConfigured = supabaseUrl !== "" && supabaseAnonKey !== "";

/** Signing in with an address at this domain makes someone staff. Must match public.is_staff() in the SQL migration. */
export const STAFF_EMAIL_DOMAIN = "odysseyventures.llc";

export function isStaffEmail(email: string | null | undefined): boolean {
  return !!email && email.toLowerCase().endsWith(`@${STAFF_EMAIL_DOMAIN}`);
}
