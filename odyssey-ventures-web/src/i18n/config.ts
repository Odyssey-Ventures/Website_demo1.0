export const locales = ["en", "ko"] as const;
export type Locale = (typeof locales)[number];

/** Visitors who open "/" are sent to this language. */
export const defaultLocale: Locale = "en";

/** Order shown in the language switcher. */
export const localeDisplayOrder: readonly Locale[] = ["ko", "en"];

export const localeLabels: Record<Locale, string> = {
  ko: "한국어",
  en: "EN",
};

/** Props shared by every page and layout under src/app/[lang]. */
export interface LangParams {
  params: Promise<{ lang: string }>;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Builds an internal link for a language. Accepts "/", "/academy" or "/#contact". */
export function localizedHref(lang: Locale, path = "/"): string {
  if (path === "/" || path === "") return `/${lang}`;
  if (path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}

/** Returns the same page in another language, e.g. /en/academy -> /ko/academy. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = target;
  } else {
    segments.splice(1, 0, target);
  }
  return segments.join("/") || `/${target}`;
}

/** Canonical and hreflang alternates for a page path such as "" or "/academy". */
export function alternatesFor(lang: Locale, path = "") {
  return {
    canonical: `/${lang}${path}`,
    languages: {
      en: `/en${path}`,
      ko: `/ko${path}`,
      "x-default": `/${defaultLocale}${path}`,
    },
  };
}
