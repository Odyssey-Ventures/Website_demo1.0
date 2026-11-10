import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export interface EventItem {
  date: string;
  title: string;
  description: string;
  /** Path inside /public. */
  image: string;
  /** Optional detail page. Without one, the card links to the Accelerator program gallery. */
  href?: string;
}

interface EventsHighlightsProps {
  lang: Locale;
  dict: Dictionary["events"];
  /** Real program photos. Home passes the Accelerator "on the ground" gallery from src/messages/*.json. */
  items: EventItem[];
  limit?: number;
}

/** "Events & Highlights": photo cards from real programs, with a zoom-and-tint hover. */
export function EventsHighlights({ lang, dict, items, limit = 6 }: EventsHighlightsProps) {
  const shown = items.filter((item) => item.image).slice(0, limit);
  if (shown.length === 0) return null;
  const galleryHref = localizedHref(lang, "/accelerator#gallery");

  return (
    <SectionContainer tone="mist">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title}>
          {dict.description}
        </SectionHeading>
        <Link href={galleryHref} className="shrink-0 font-medium text-brand-blue hover:text-brand-blue-dark">
          {dict.viewAll} →
        </Link>
      </Reveal>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={(index % 3) * 100} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card transition duration-300 hover:shadow-card-hover">
                <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-navy-950/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="absolute left-4 top-4 rounded bg-white/90 px-2 py-1 text-xs font-semibold text-navy">{item.date}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight text-navy">
                    <Link href={item.href ?? galleryHref} className="after:absolute after:inset-0 focus:outline-none">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
