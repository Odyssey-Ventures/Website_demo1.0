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
}
