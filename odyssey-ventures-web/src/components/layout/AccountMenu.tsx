"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isStaffEmail, isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";

interface AccountMenuProps {
  lang: Locale;
  dict: Dictionary["auth"];
  className?: string;
}

/** "Sign in" link, or the signed-in email with a sign-out button. Hidden until Supabase is configured. */
export function AccountMenu({ lang, dict, className }: AccountMenuProps) {
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setEmail(session?.user.email ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) return null;

  if (!email) {
    return (
      <Link
        href={`${localizedHref(lang, "/login")}?next=${encodeURIComponent(pathname)}`}
        className={cn("text-sm font-medium text-muted transition-colors hover:text-navy", className)}
      >
        {dict.login}
      </Link>
    );
  }

  return (
    <form action="/api/auth/signout" method="post" className={cn("flex items-center gap-3 text-sm", className)}>
      <span className="max-w-40 truncate text-muted" title={email}>
        {isStaffEmail(email) ? (
          <span className="mr-1.5 rounded bg-brand-green/30 px-1.5 py-0.5 text-xs font-semibold text-navy">{dict.staffBadge}</span>
        ) : null}
        {email}
      </span>
      <button type="submit" className="font-medium text-muted transition-colors hover:text-navy">
        {dict.logout}
      </button>
    </form>
  );
}
