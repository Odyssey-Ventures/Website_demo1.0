"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";

interface LocaleContextValue {
  lang: Locale;
  notFound: { title: string; description: string; backHome: string };
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/** Gives client-only boundaries (the 404 page) the current language without importing both dictionaries. */
export function LocaleProvider({ value, children }: { value: LocaleContextValue; children: ReactNode }) {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}
