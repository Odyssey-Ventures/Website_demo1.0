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
