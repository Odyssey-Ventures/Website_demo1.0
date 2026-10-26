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
            <li key={item.key} className={isMobile ? undefined : "group relative"}>
              <Link
                href={localizedHref(lang, item.path)}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "transition-colors duration-200",
                  isMobile
                    ? cn("block border-b border-line py-4 text-lg font-medium", active ? "text-brand-blue" : "text-navy")
                    : cn(
                        "inline-block border-b-2 py-1 text-[15px] font-medium",
                        active ? "border-brand-blue text-navy" : "border-transparent text-muted hover:text-navy"
                      )
                )}
              >
                {dict[item.key]}
              </Link>

              {item.children ? (
                isMobile ? (
                  <ul className="border-b border-line py-2 pl-4">
                    {item.children.map((child) => (
                      <li key={child.key}>
                        <Link
                          href={localizedHref(lang, child.path)}
                          onClick={onNavigate}
                          className="block py-2 text-base text-muted transition-colors duration-200 hover:text-navy"
                        >
                          {dict.aboutSections[child.key]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  // Opens on hover and on keyboard focus inside the item.
                  <div className="invisible absolute -left-4 top-full z-50 pt-3 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="min-w-48 rounded-md border border-line bg-white py-2 shadow-card">
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <Link
                            href={localizedHref(lang, child.path)}
                            onClick={(event) => {
                              // Release focus so the dropdown closes once the pointer leaves.
                              event.currentTarget.blur();
                              onNavigate?.();
                            }}
                            className="block whitespace-nowrap px-4 py-2 text-[15px] text-muted transition-colors duration-200 hover:bg-mist hover:text-navy"
                          >
                            {dict.aboutSections[child.key]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
