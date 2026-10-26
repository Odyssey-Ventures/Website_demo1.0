import en from "@/messages/en.json";
import ko from "@/messages/ko.json";
import type { Locale } from "@/i18n/config";

/** The English file defines the shape. TypeScript fails the build if ko.json is missing a key. */
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, ko };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
