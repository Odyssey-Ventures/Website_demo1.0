import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isStaffEmail, isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "@/lib/supabase/config";

/** Supabase client for Server Components and Route Handlers, acting as the signed-in visitor. */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list) cookieStore.set(name, value, options);
        } catch {
          // Server Components cannot set cookies; the middleware refreshes the session instead.
        }
      },
    },
  });
}

export interface Viewer {
  id: string;
  email: string;
  isStaff: boolean;
}

/** The signed-in visitor, or null. Always null while Supabase is not configured. */
export async function getViewer(): Promise<Viewer | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user?.email) return null;
  return { id: user.id, email: user.email, isStaff: isStaffEmail(user.email) };
}
