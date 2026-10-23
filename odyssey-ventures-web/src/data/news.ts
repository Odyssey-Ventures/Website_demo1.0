import type { Localized } from "@/types";

export interface NewsPost {
  /** Used in the address: /ko/news/<slug> */
  slug: string;
  /** YYYY-MM-DD */
  date: string;
  title: Localized;
  summary: Localized;
  /** Paragraphs, separated by blank lines. Leave empty when the post only links out. */
  body: Localized;
  /** Optional original post, e.g. on LinkedIn or Instagram. */
  externalUrl?: string;
}

/**
 * News posts, newest first is not required (the page sorts by date).
 * Until a writing tool (CMS) is chosen, a developer adds posts here. Only real, approved news.
 */
export const news: NewsPost[] = [];
