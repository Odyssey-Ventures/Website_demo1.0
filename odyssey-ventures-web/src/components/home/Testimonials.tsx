import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partners } from "@/data/partners";
import { testimonials } from "@/data/testimonials";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

/**
 * Quotes from founders, partners and companies Odyssey has worked with, from src/data/testimonials.ts.
 * The first quote is featured; the rest sit in a grid beside and below it.
 * While the list is empty, labeled sample cards are shown everywhere except the production site,
 * where the section is hidden until real quotes are added.
 */
export function Testimonials({ dict }: { dict: Dictionary["testimonials"] }) {
  const isSample = testimonials.length === 0 && process.env.VERCEL_ENV !== "production";
  const items: Testimonial[] = isSample
    ? dict.samples.map((sample, index) => ({ id: `sample-${index}`, ...sample, category: index % 2 === 0 ? "startup" : "partner" }))
    : testimonials;
  if (items.length === 0 && partners.length === 0) return null;

  const [featured, ...rest] = items;
  const categoryLabel = (item: Testimonial) => (item.category === "startup" ? dict.startup : dict.partner);

  return (
    <SectionContainer tone="mist">
      <Reveal>
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title}>
          {dict.description}
        </SectionHeading>
      </Reveal>

      {isSample ? <p className="mt-6 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900">{dict.sampleNotice}</p> : null}

      {featured ? (
        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <figure className="relative flex h-full flex-col overflow-hidden rounded-lg bg-navy p-8 text-white shadow-card sm:p-10">
              <QuoteMark className="text-brand-green" />
              <CategoryChip label={categoryLabel(featured)} inverse />
              <blockquote className="mt-5 flex-1 text-2xl font-semibold leading-snug tracking-tight sm:text-[1.75rem]">
                {featured.quote}
              </blockquote>
              <Attribution item={featured} inverse />
            </figure>
          </Reveal>

          {rest.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3 lg:row-span-2">
              {rest.map((item, index) => (
                <Reveal key={item.id} delay={(index % 2) * 100}>
                  <figure className="flex h-full flex-col rounded-lg border border-line bg-white p-7 shadow-card">
                    <CategoryChip label={categoryLabel(item)} />
                    <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-navy">“{item.quote}”</blockquote>
                    <Attribution item={item} />
                  </figure>
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {partners.length > 0 ? (
        <div className="mt-16 border-t border-line pt-10">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">{dict.partnersTitle}</h3>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((partner) => {
              const logo = (
                <Image src={partner.logoSrc} alt={partner.name} width={140} height={48} className="max-h-12 w-auto object-contain" />
              );
              return (
                <li key={partner.name} className="flex h-24 items-center justify-center rounded-lg border border-line bg-white p-4">
                  {partner.href ? (
                    <a href={partner.href} target="_blank" rel="noopener noreferrer">
                      {logo}
                    </a>
                  ) : (
                    logo
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </SectionContainer>
  );
}

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 36" className={cn("absolute right-8 top-8 h-10 w-auto opacity-80", className)} fill="currentColor">
      <path d="M0 36V22.5C0 9.9 6.6 2.4 19.2 0l2 5.1C14 7.4 10.6 11.5 10.2 17.4H19.8V36H0Zm28.2 0V22.5C28.2 9.9 34.8 2.4 47.4 0l2 5.1c-7.2 2.3-10.6 6.4-11 12.3H48V36H28.2Z" />
    </svg>
  );
}

function CategoryChip({ label, inverse }: { label: string; inverse?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block w-fit rounded px-2 py-1 text-xs font-medium",
        inverse ? "bg-white/10 text-brand-green" : "bg-brand-blue-tint text-brand-blue-dark"
      )}
    >
      {label}
    </span>
  );
}

function Attribution({ item, inverse }: { item: Testimonial; inverse?: boolean }) {
  const initials = item.name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <figcaption className={cn("mt-6 flex items-center gap-3 border-t pt-5 text-sm", inverse ? "border-white/15" : "border-line")}>
      {item.logoSrc ? (
        <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-white p-1.5">
          <Image src={item.logoSrc} alt="" width={36} height={36} className="h-full w-full object-contain" />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-semibold",
            inverse ? "bg-white/10 text-white" : "bg-navy text-white"
          )}
        >
          {initials}
        </span>
      )}
      <span className="min-w-0">
        <span className={cn("block font-semibold", inverse ? "text-white" : "text-navy")}>{item.name}</span>
        <span className={cn("block", inverse ? "text-navy-100" : "text-muted")}>
          {item.role}, {item.company}
        </span>
      </span>
    </figcaption>
  );
}
