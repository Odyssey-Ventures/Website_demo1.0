"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/navigation";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface NavigationProps {
  lang: Locale;
  dict: Dictionary["nav"];
  variant?: "desktop" | "mobile";
  /** Called after a link is clicked, e.g. to close the mobile menu. */
  onNavigate?: () => void;
}

export function Navigation({ lang, dict, variant = "desktop", onNavigate }: NavigationProps) {
  const pathname = usePathname();
  const isMobile = variant === "mobile";

  const isActive = (path: string) => {
    const href = localizedHref(lang, path);
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav aria-label={isMobile ? dict.mobile : dict.main}>
      <ul className={isMobile ? "flex flex-col" : "flex items-center gap-9"}>
        {mainNav.map((item) => {
          const active = isActive(item.path);
          return (
            <li key={item.key}>
              <Link
                href={localizedHref(lang, item.path)}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "transition-colors duration-200",
                  isMobile
                    ? cn("block border-b border-line py-4 text-lg font-medium", active ? "text-brand-blue" : "text-navy")
                    : cn(
                        "border-b-2 py-1 text-[15px] font-medium",
                        active ? "border-brand-blue text-navy" : "border-transparent text-muted hover:text-navy"
                      )
                )}
              >
                {dict[item.key]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
