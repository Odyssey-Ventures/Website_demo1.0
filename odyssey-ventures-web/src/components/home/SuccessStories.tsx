import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { successStories } from "@/data/success-stories";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface StoryCardData {
  key: string;
  company: string;
  year?: string;
  program: string;
  support: string[];
  outcomes: string[];
  logoSrc?: string;
  imageSrc?: string;
  href?: string;
}

/**
 * "Success Stories": cards from src/data/success-stories.ts, each linking to /[lang]/success-stories/[slug].
 * While the list is empty, previews show labeled sample cards and production hides the section.
 */
export function SuccessStories({ lang, dict }: { lang: Locale; dict: Dictionary["successStories"] }) {
  const isSample = successStories.length === 0 && process.env.VERCEL_ENV !== "production";
  const cards: StoryCardData[] = isSample
    ? dict.samples.map((sample, index) => ({ key: `sample-${index}`, ...sample }))
    : successStories.map((story) => ({
        key: story.slug,
        company: story.company,
        year: story.year,
        program: story.program[lang],
        support: story.support.map((item) => item[lang]),
        outcomes: story.outcomes.map((item) => item[lang]),
        logoSrc: story.logoSrc,
        imageSrc: story.imageSrc,
        href: localizedHref(lang, `/success-stories/${story.slug}`),
      }));
  if (cards.length === 0) return null;

  return (
    <SectionContainer>
      <Reveal>
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title}>
          {dict.description}
        </SectionHeading>
      </Reveal>
      {isSample ? <p className="mt-6 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900">{dict.sampleNotice}</p> : null}

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <li key={card.key}>
            <Reveal delay={(index % 3) * 100} className="h-full">
              <StoryCard card={card} dict={dict} />
            </Reveal>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}

function StoryCard({ card, dict }: { card: StoryCardData; dict: Dictionary["successStories"] }) {
  const name = card.company.replace(/\(.*?\)\s*/g, "").trim();
  // Latin names: up to two initials ("Acme Robotics" → "AR"). Korean names: the first syllable.
  const initials = /^[A-Za-z]/.test(name)
    ? name.split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase()
    : name.slice(0, 1);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-card-hover">
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-navy-700 to-navy-950">
        {card.imageSrc ? (
          <Image
            src={card.imageSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <span className="absolute bottom-4 left-5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-md bg-white p-2 shadow-card">
          {card.logoSrc ? (
            <Image src={card.logoSrc} alt="" width={48} height={48} className="h-full w-full object-contain" />
          ) : (
            <span aria-hidden="true" className="text-lg font-semibold text-navy">
              {initials}
            </span>
          )}
        </span>
        {card.year ? (
          <span className="absolute right-4 top-4 rounded bg-white/10 px-2 py-1 text-xs font-medium text-white backdrop-blur">
            {card.year}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold tracking-tight text-navy">
          {card.href ? (
            <Link href={card.href} className="after:absolute after:inset-0 focus:outline-none">
              {card.company}
            </Link>
          ) : (
            card.company
          )}
        </h3>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="font-semibold uppercase tracking-widest text-brand-blue">{dict.programLabel}</dt>
            <dd className="mt-1 text-navy">{card.program}</dd>
          </div>
          {card.support.length > 0 ? (
            <div>
              <dt className="font-semibold uppercase tracking-widest text-brand-blue">{dict.supportLabel}</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {card.support.map((item) => (
                  <span key={item} className="rounded bg-mist px-2 py-1 text-muted">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ) : null}
          {card.outcomes.length > 0 ? (
            <div className="border-t border-line pt-4">
              <dt className="font-semibold uppercase tracking-widest text-brand-blue">{dict.outcomesLabel}</dt>
              {card.outcomes.map((item) => (
                <dd key={item} className="mt-2 flex gap-2 leading-relaxed text-navy">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                  {item}
                </dd>
              ))}
            </div>
          ) : null}
        </dl>
        <p className="mt-auto pt-6 text-sm font-medium text-brand-blue">
          {card.href ? `${dict.readMore} →` : <span className="text-muted">{dict.comingSoon}</span>}
        </p>
      </div>
    </article>
  );
}
