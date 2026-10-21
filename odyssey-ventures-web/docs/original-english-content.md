# Original English content (backup)
This file preserves, verbatim, the source files that contained the English copy shown on the site before the bilingual redesign.
The live UI now shows development placeholders from `src/messages/en.json` and `src/messages/ko.json`.
The same text is also recoverable from Git history (the commit before the redesign). Nothing in this file is imported by the app.
To reuse a passage, copy the string into the relevant key in `src/messages/en.json` and write the Korean counterpart in `ko.json`.

## `src/config/site.ts` (original)

```tsx
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;

export const siteConfig = {
  name: "Odyssey Ventures",
  description:
    "Odyssey Ventures is a Silicon Valley-based education, consulting and startup accelerator company helping startups and businesses expand into the U.S. market.",
  // Falls back to the Vercel preview URL, then localhost. The live domain is never hard-coded.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000",
  email: "contact@odysseyventures.llc",
  location: "Silicon Valley, California",
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
} as const;

```

## `src/app/layout.tsx` (original)

```tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const defaultTitle = "Odyssey Ventures | Helping Startups Expand into the U.S.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: "%s | Odyssey Ventures",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
  },
  robots: siteConfig.allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}

```

## `src/app/academy/page.tsx` (original)

```tsx
import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = {
  title: "Academy",
  description: "Startup education, U.S. market entry workshops and entrepreneurship training from Odyssey Ventures.",
};

export default function AcademyPage() {
  return <PlaceholderPage slug="academy" />;
}

```

## `src/app/accelerator/page.tsx` (original)

```tsx
import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = {
  title: "Accelerator",
  description: "U.S. market entry acceleration, mentorship, investor connections and growth support for startups.",
};

export default function AcceleratorPage() {
  return <PlaceholderPage slug="accelerator" />;
}

```

## `src/app/advisory/page.tsx` (original)

```tsx
import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = {
  title: "Advisory",
  description: "One-on-one advisory on U.S. market entry, go-to-market strategy and fundraising from Odyssey Ventures.",
};

export default function AdvisoryPage() {
  return <PlaceholderPage slug="advisory" />;
}

```

## `src/app/not-found.tsx` (original)

```tsx
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-28">
      <h1 className="font-semibold tracking-tight text-5xl tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        The page you are looking for does not exist or has moved.
      </p>
      <Button href="/" className="mt-8">
        Back to home
      </Button>
    </Container>
  );
}

```

## `src/data/services.ts` (original)

```tsx
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

```

## `src/components/home/Hero.tsx` (original)

```tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { contactHref } from "@/config/navigation";
import { images } from "@/config/images";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <Image
        src={images.hero.src}
        alt={images.hero.alt}
        width={images.hero.width}
        height={images.hero.height}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-navy-950/70" aria-hidden="true" />

      <Container className="flex min-h-[540px] flex-col justify-center py-24 md:min-h-[680px] md:py-32">
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          Helping Startups Expand into the U.S.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
          Odyssey Ventures is a Silicon Valley-based education, consulting and startup accelerator company. We help
          startups and businesses build the product, fundraising and sales capabilities they need to succeed in global
          markets.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="#services" variant="inverse">
            Explore our services
          </Button>
          <Button href={contactHref} variant="outlineInverse">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}

```

## `src/components/home/Focus.tsx` (original)

```tsx
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Source: the three-item list on the live site (translated from Korean). */
const items = [
  { title: "Corporate Training", text: "Mentoring, corporate training, market research" },
  { title: "Startup Acceleration", text: "U.S. market entry" },
  { title: "Business Development", text: "Acquiring potential customers" },
];

export function Focus() {
  return (
    <section className="border-b border-line">
      <Container>
        <Reveal>
          <ul className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {items.map((item) => (
              <li key={item.title} className="py-10 md:px-8 md:first:pl-0 md:last:pr-0">
                <h2 className="text-2xl font-semibold tracking-tight text-navy">{item.title}</h2>
                <p className="mt-2 text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

```

## `src/components/home/About.tsx` (original)

```tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/config/images";

/**
 * Source: the live site's company description (translated from Korean).
 * Keep these statements factual and verified; do not add numbers or names here.
 */
const experience = [
  "Varied business experience in global markets",
  "Product experience in Silicon Valley",
  "Experience founding a startup that listed on Nasdaq",
  "Experience running Silicon Valley training programs and startup mentoring and consulting",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Image
            src={images.instructors.src}
            alt={images.instructors.alt}
            width={images.instructors.width}
            height={images.instructors.height}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/3] w-full rounded-md object-cover"
          />
        </Reveal>

        <Reveal delay={120}>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Led by experts from Silicon Valley
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Our instructors and mentors bring experience from global markets and Silicon Valley, and have worked on the
            problems your team is facing now.
          </p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {experience.map((item) => (
              <li key={item} className="py-4 text-lg leading-snug">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

```

## `src/components/home/Services.tsx` (original)

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-y border-line bg-mist py-20 sm:py-28">
      <Container>
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-navy-600">Our Service</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Academy, Accelerator and Advisory
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 100} className="h-full">
              <article className="group flex h-full flex-col rounded-md border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-navy/40 hover:shadow-lg lg:p-10">
                <h3 className="text-3xl font-semibold tracking-tight text-navy">{service.name}</h3>
                <p className="mt-1 text-sm font-medium text-navy-600">{service.tagline}</p>
                <p className="mt-5 leading-relaxed text-muted">{service.summary}</p>

                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-snug text-navy">
                      <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-navy-600" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="mt-8 inline-flex w-fit items-center border-b border-navy pb-0.5 font-medium text-navy transition-colors duration-200 hover:border-navy-600 hover:text-navy-600 lg:mt-auto"
                >
                  Learn more
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

```

## `src/components/home/Testimonials.tsx` (original)

```tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";
import { partners } from "@/data/partners";

const PLACEHOLDER_COUNT = 5;
const PARTNER_PLACEHOLDER_COUNT = 5;

function PlaceholderCard({ index }: { index: number }) {
  return (
    <figure className="break-inside-avoid rounded-md border border-dashed border-navy/30 bg-white p-7">
      <span className="inline-block rounded bg-navy-100 px-2 py-1 text-xs font-medium text-navy-700">
        Placeholder {index + 1} of {PLACEHOLDER_COUNT}
      </span>
      <blockquote className="mt-4 leading-relaxed text-muted">
        Testimonial pending. Add a verified quote from a startup or partner in src/data/testimonials.ts.
      </blockquote>
      <figcaption className="mt-5 text-sm text-muted">Name, role and company pending</figcaption>
    </figure>
  );
}

export function Testimonials() {
  const hasTestimonials = testimonials.length > 0;
  const hasPartners = partners.length > 0;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
        <SectionHeading title="What startups and partners say about working with us">
          {hasTestimonials ? undefined : "Placeholder content. Verified testimonials will replace the cards below."}
        </SectionHeading>
        </Reveal>

        <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
          {hasTestimonials
            ? testimonials.map((item) => (
                <figure key={item.id} className="break-inside-avoid rounded-md border border-line bg-white p-7">
                  <span className="inline-block rounded bg-navy-100 px-2 py-1 text-xs font-medium text-navy-700">
                    {item.category === "startup" ? "Startup" : "Partner"}
                  </span>
                  <blockquote className="mt-4 font-semibold tracking-tight text-xl leading-snug text-navy">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 text-sm">
                    {item.logoSrc ? (
                      <Image src={item.logoSrc} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
                    ) : null}
                    <span>
                      <span className="block font-medium text-navy">{item.name}</span>
                      <span className="block text-muted">
                        {item.role}, {item.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))
            : Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => <PlaceholderCard key={i} index={i} />)}
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <h3 className="font-semibold tracking-tight text-2xl text-navy">Partners</h3>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {hasPartners
              ? partners.map((partner) => (
                  <li
                    key={partner.name}
                    className="flex h-24 items-center justify-center rounded-md border border-line bg-white p-4"
                  >
                    {partner.href ? (
                      <a href={partner.href} target="_blank" rel="noopener noreferrer">
                        <Image src={partner.logoSrc} alt={partner.name} width={140} height={48} className="max-h-12 w-auto object-contain" />
                      </a>
                    ) : (
                      <Image src={partner.logoSrc} alt={partner.name} width={140} height={48} className="max-h-12 w-auto object-contain" />
                    )}
                  </li>
                ))
              : Array.from({ length: PARTNER_PLACEHOLDER_COUNT }, (_, i) => (
                  <li
                    key={i}
                    className="flex h-24 items-center justify-center rounded-md border border-dashed border-navy/30 text-sm text-muted"
                  >
                    Partner logo placeholder
                  </li>
                ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

```

## `src/components/home/Contact.tsx` (original)

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/home/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line bg-mist py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading title="Tell us about your U.S. expansion plans">
            Share where your company is today and what you need. We will reply by email.
          </SectionHeading>

          <dl className="mt-10 space-y-5">
            <div>
              <dt className="text-sm font-medium text-muted">Email</dt>
              <dd className="mt-1 text-lg">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="border-b border-navy pb-0.5 text-navy transition-colors hover:border-navy-600 hover:text-navy-600"
                >
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted">Location</dt>
              <dd className="mt-1 text-lg text-navy">{siteConfig.location}</dd>
            </div>
          </dl>
        </div>

        <Reveal className="lg:col-span-7" delay={120}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}

```

## `src/components/home/ContactForm.tsx` (original)

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const interests = ["Academy", "Accelerator", "Advisory", "Something else"] as const;

const fieldClass =
  "mt-2 w-full rounded border border-line bg-white px-4 py-3 text-base text-navy placeholder:text-muted/70 transition-colors focus:border-navy-600";

/**
 * No backend yet: submitting opens the visitor's email app with the message
 * prepared. To store inquiries later, replace handleSubmit with a call to a
 * Next.js route handler that writes to Supabase (see README).
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const interest = String(data.get("interest") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Inquiry: ${interest}${company ? ` (${company})` : ""}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "-"}`,
      `Interested in: ${interest}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-navy">
          Name
          <input name="name" type="text" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-navy">
          Email
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-navy">
          Company
          <input name="company" type="text" autoComplete="organization" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-navy">
          I am interested in
          <select name="interest" defaultValue={interests[0]} className={fieldClass}>
            {interests.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium text-navy">
        How can we help?
        <textarea name="message" required rows={5} className={fieldClass} />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit">Send by email</Button>
        <p className="text-sm text-muted" role="status">
          {sent
            ? "Your email app should now be open with your message. Press send there to finish."
            : "This opens your email app with your message ready to send."}
        </p>
      </div>
    </form>
  );
}

```

## `src/components/shared/PlaceholderPage.tsx` (original)

```tsx
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { contactHref } from "@/config/navigation";
import { getService } from "@/data/services";
import type { ServiceSlug } from "@/types";

/**
 * Temporary page body for services whose full page is not built yet.
 * Replace usage in src/app/<service>/page.tsx when the real page is ready.
 */
export function PlaceholderPage({ slug }: { slug: ServiceSlug }) {
  const service = getService(slug);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <h1 className="font-semibold tracking-tight text-5xl tracking-tight text-navy sm:text-6xl">{service.name}</h1>
          <p className="mt-3 text-lg font-medium text-navy-600">{service.tagline}</p>
          <p className="mt-6 text-xl leading-relaxed text-muted">{service.summary}</p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {service.highlights.map((item) => (
              <li key={item} className="py-4 text-lg text-navy">
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-10 rounded-md border border-dashed border-navy/30 p-5 text-muted">
            The full {service.name} page is the next build step. In the meantime, send us an inquiry and we will reply
            by email.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={contactHref}>Contact us</Button>
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

```

## `src/components/layout/Header.tsx` (original)

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { contactHref, mainNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between md:h-[72px]">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "border-b-2 py-1 text-[15px] font-medium transition-colors duration-200",
                isActive(item.href)
                  ? "border-navy text-navy"
                  : "border-transparent text-muted hover:text-navy"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded text-navy md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </Container>

      {open ? (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-white md:hidden">
          <Container className="flex flex-col py-3">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "border-b border-line py-4 text-lg font-medium",
                  isActive(item.href) ? "text-navy" : "text-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href={contactHref} onClick={() => setOpen(false)} className="py-4 text-lg font-medium text-navy">
              Contact us
            </Link>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}

```

## `src/components/layout/Footer.tsx` (original)

```tsx
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { contactHref } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/** Mirrors the live site's footer: logo, Contact link, copyright. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <Link href={contactHref} className="text-muted transition-colors duration-200 hover:text-navy">
          Contact
        </Link>
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

```
