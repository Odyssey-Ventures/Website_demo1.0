"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, type NavChild } from "@/config/navigation";
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
    const href = localizedHref(lang, path.split("#")[0] || "/");
    if (href === `/${lang}`) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const childLabel = (child: NavChild) =>
    child.group === "about" ? dict.aboutSections[child.key] : child.group === "news" ? dict.newsSections[child.key] : dict[child.key];

  return (
    <nav aria-label={isMobile ? dict.mobile : dict.main}>
      <ul className={isMobile ? "flex flex-col" : "flex items-center gap-8"}>
        {mainNav.map((item) => {
          // Services and News are groups: active while one of their pages is open.
          const active =
            item.key === "services" || item.key === "news"
              ? (item.children ?? []).some((child) => isActive(child.path))
              : isActive(item.path);
          return (
            <li key={item.key} className={isMobile ? undefined : "group relative"}>
              <Link
                href={localizedHref(lang, item.path)}
                onClick={onNavigate}
                aria-current={active && !item.children ? "page" : undefined}
                className={cn(
                  "transition-colors duration-200",
                  isMobile
                    ? cn("block border-b border-line py-4 text-lg font-medium", active ? "text-brand-blue" : "text-navy")
                    : cn(
                        "inline-flex items-center gap-1 border-b-2 py-1 text-[15px] font-medium",
                        active ? "border-brand-blue text-navy" : "border-transparent text-muted hover:text-navy"
                      )
                )}
              >
                {dict[item.key]}
                {item.children && !isMobile ? (
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                ) : null}
              </Link>

              {item.children ? (
                isMobile ? (
                  <ul className="border-b border-line py-2 pl-4">
                    {item.children.map((child) => (
                      <li key={child.key}>
                        <Link
                          href={localizedHref(lang, child.path)}
                          onClick={onNavigate}
                          aria-current={isActive(child.path) && child.group !== "about" ? "page" : undefined}
                          className={cn(
                            "block py-2 text-base transition-colors duration-200 hover:text-navy",
                            child.group !== "about" && isActive(child.path) ? "text-brand-blue" : "text-muted"
                          )}
                        >
                          {childLabel(child)}
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
                            {childLabel(child)}
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
