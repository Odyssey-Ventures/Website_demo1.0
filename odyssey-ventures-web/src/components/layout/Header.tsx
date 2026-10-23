"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Logo } from "@/components/layout/Logo";
import { Navigation } from "@/components/layout/Navigation";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface HeaderProps {
  lang: Locale;
  dict: Pick<Dictionary, "common" | "nav" | "language">;
}

export function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Close the mobile menu after any navigation, including a language switch.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the menu and returns focus to the menu button.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <Logo lang={lang} label={dict.common.homeAria} priority />

        <div className="hidden items-center gap-10 lg:flex">
          <Navigation lang={lang} dict={dict.nav} />
          <LanguageSwitcher lang={lang} dict={dict.language} />
        </div>

        <button
          ref={menuButton}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </Container>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col py-2">
            <Navigation lang={lang} dict={dict.nav} variant="mobile" onNavigate={closeMenu} />
            <div className="py-5">
              <LanguageSwitcher lang={lang} dict={dict.language} onNavigate={closeMenu} />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
