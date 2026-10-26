"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeDisplayOrder, localeLabels, switchLocalePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  lang: Locale;
  dict: Dictionary["language"];
  className?: string;
  onNavigate?: () => void;
}

/** Shows "한국어 | EN" and opens the same page in the other language. */
export function LanguageSwitcher({ lang, dict, className, onNavigate }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={dict.label}
      className={cn("inline-flex items-center rounded-full border border-line bg-white p-0.5 text-sm font-medium", className)}
    >
      {localeDisplayOrder.map((code) =>
        code === lang ? (
          <span key={code} lang={code} aria-current="true" className="rounded-full bg-navy px-3.5 py-1.5 text-white">
            {localeLabels[code]}
          </span>
        ) : (
          <Link
            key={code}
            href={switchLocalePath(pathname, code)}
            hrefLang={code}
            lang={code}
            aria-label={code === "ko" ? dict.switchToKo : dict.switchToEn}
            onClick={onNavigate}
            className="rounded-full px-3.5 py-1.5 text-muted transition-colors duration-200 hover:text-navy"
          >
            {localeLabels[code]}
          </Link>
        )
      )}
    </div>
  );
}
