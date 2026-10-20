import type { Service, ServiceSlug } from "@/types";

/**
 * Source: the current live site (Product Academy, Startup Accelerator,
 * mentoring / consulting / business development), translated from Korean.
 * "Advisory" is a new grouping requested for the redesign; confirm wording with the team.
 */
export const services: Service[] = [
  {
    slug: "academy",
    name: "Academy",
    tagline: "Education for global markets",
    summary:
      "Programs and webinars that build product, market-entry and entrepreneurship skills, taught by instructors with Silicon Valley experience.",
    highlights: [
      "Startup education and webinars",
      "U.S. market entry workshops",
      "Entrepreneurship and business development training",
    ],
    href: "/academy",
  },
  {
    slug: "accelerator",
    name: "Accelerator",
    tagline: "Structured support for entering the U.S.",
    summary:
      "Training and hands-on support for companies entering global markets, from market entry through reaching your first potential customers.",
    highlights: [
      "U.S. market entry acceleration programs",
      "Mentorship and networking",
      "Investor and VC connections",
    ],
    href: "/accelerator",
  },
  {
    slug: "advisory",
    name: "Advisory",
    tagline: "Direct guidance from experts",
    summary:
      "One-on-one sessions on strategy, growth and fundraising, with expert matching for the questions your team faces.",
    highlights: [
      "One-on-one advisory sessions",
      "U.S. market entry and go-to-market strategy",
      "Fundraising and investment advisory",
    ],
    href: "/advisory",
  },
];

export function getService(slug: ServiceSlug): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
