export type ServiceSlug = "academy" | "accelerator" | "advisory" | "consulting";

export interface Service {
  slug: ServiceSlug;
  /** Path without a language prefix. Use localizedHref() to build the link. */
  path: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  category: "startup" | "partner";
  /** Optional path inside /public, e.g. "/logos/acme.svg" */
  logoSrc?: string;
}

export interface Partner {
  name: string;
  /** Path inside /public, e.g. "/logos/partner.svg" */
  logoSrc: string;
  href?: string;
}

export interface Localized {
  ko: string;
  en: string;
}

/** An Academy lecture or webinar. Managed in the "Programs" Google Sheet (see docs/operations.md). */
export interface Program {
  id: string;
  type: "webinar" | "course";
  title: Localized;
  summary: Localized;
  description: Localized;
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM, as written in the sheet */
  startTime: string;
  endTime: string;
  /** Label shown next to the time, e.g. "PT" or "KST" */
  timezone: string;
  instructor: string;
  /** e.g. "Zoom" or "Google Meet" */
  format: string;
  capacity: string;
  registrationOpen: boolean;
  /** Optional thumbnail: a path inside /public (e.g. "/images/programs/x.webp") or an https URL. Without one, the card shows a branded date panel. */
  image?: string;
  /** Optional speaker title shown under the name, e.g. "CEO, Odyssey Ventures" */
  instructorTitle?: string;
}

/** One figure in the Home "Our Impact" section. Managed in src/data/impact.ts. */
export interface ImpactMetric {
  id: string;
  /** The number that is counted up to. */
  value: number;
  /** Text right after the number, e.g. "+" or { ko: "년", en: " yrs" }. */
  suffix?: Localized | string;
  label: Localized;
  /** What is counted and over which period. Shown in small print under the label. */
  basis?: Localized;
  /** Years and other identifiers should not count up from zero. */
  animate?: boolean;
  /**
   * Only verified figures appear on the production site.
   * Unverified ones are shown on previews with a "needs verification" label.
   */
  verified: boolean;
}

/** One Home "Success Stories" card. Managed in src/data/success-stories.ts. Nothing here may be invented. */
export interface SuccessStory {
  /** Used in the detail page address: /[lang]/success-stories/[slug] */
  slug: string;
  company: string;
  /** Path inside /public. Shown on the card top; the logo is used when there is no image. */
  logoSrc?: string;
  imageSrc?: string;
  program: Localized;
  /** Services or support Odyssey provided. */
  support: Localized[];
  /** Verified outcomes only, approved by the company. Leave empty rather than estimate. */
  outcomes: Localized[];
  /** Longer write-up for the detail page. Line breaks become paragraphs. */
  body?: Localized;
  year?: string;
}
