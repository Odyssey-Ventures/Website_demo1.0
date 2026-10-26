export type ServiceSlug = "academy" | "accelerator" | "advisory";

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
