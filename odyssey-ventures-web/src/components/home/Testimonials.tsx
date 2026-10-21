import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partners } from "@/data/partners";
import { testimonials } from "@/data/testimonials";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Renders only when real testimonials or partners exist in src/data.
 * While both lists are empty the Home page shows the Additional placeholder section instead.
 */
export function Testimonials({ dict }: { dict: Dictionary["testimonials"] }) {
  const hasTestimonials = testimonials.length > 0;
  const hasPartners = partners.length > 0;
  if (!hasTestimonials && !hasPartners) return null;

  return (
    <SectionContainer>
      <Reveal>
        <SectionHeading title={dict.title} />
      </Reveal>

      {hasTestimonials ? (
        <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
          {testimonials.map((item) => (
            <figure key={item.id} className="break-inside-avoid rounded-lg border border-line bg-white p-7 shadow-card">
              <span className="inline-block rounded bg-brand-blue-tint px-2 py-1 text-xs font-medium text-brand-blue-dark">
                {item.category === "startup" ? dict.startup : dict.partner}
              </span>
              <blockquote className="mt-4 text-xl font-semibold leading-snug tracking-tight text-navy">{item.quote}</blockquote>
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
          ))}
        </div>
      ) : null}

      {hasPartners ? (
        <div className="mt-16 border-t border-line pt-10">
          <h3 className="text-2xl font-semibold tracking-tight text-navy">{dict.partnersTitle}</h3>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((partner) => (
              <li key={partner.name} className="flex h-24 items-center justify-center rounded-lg border border-line bg-white p-4">
                {partner.href ? (
                  <a href={partner.href} target="_blank" rel="noopener noreferrer">
                    <Image src={partner.logoSrc} alt={partner.name} width={140} height={48} className="max-h-12 w-auto object-contain" />
                  </a>
                ) : (
                  <Image src={partner.logoSrc} alt={partner.name} width={140} height={48} className="max-h-12 w-auto object-contain" />
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </SectionContainer>
  );
}
