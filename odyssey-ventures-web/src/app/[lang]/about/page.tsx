import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutSections } from "@/config/navigation";
import { team } from "@/data/team";
import { alternatesFor, isLocale, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.about;
  return {
    title: page.title,
    description: page.description,
    alternates: alternatesFor(lang, "/about"),
  };
}

/** CEO message and profile, company overview and history. Individual team members are no longer listed (Nov 2026 review). */
export default async function AboutPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.aboutPage;
  const titles = dict.nav.aboutSections;
  const ceo = page.team["kevin-kim"];
  const ceoMember = team.find((member) => member.id === "kevin-kim");
  const ceoPhoto = ceoMember?.photo;
  const ceoLinkedin = ceoMember?.linkedin;
  // Until the CEO's message is supplied, previews show a labeled placeholder; production shows the profile only.
  const hasMessage = page.ceo.message.length > 0;
  const showPlaceholder = !hasMessage && process.env.VERCEL_ENV !== "production";

  return (
    <>
      <PageHero title={dict.nav.about} description={page.overview.lead} accent="navy" photo="coitTowerView" />

      <div className="border-b border-line bg-white">
        <Container>
          <nav aria-label={page.sectionsLabel}>
            <ul className="-mb-px flex gap-8 overflow-x-auto">
              {aboutSections.map((section) => (
                <li key={section.key} className="shrink-0">
                  <a
                    href={`#${section.key}`}
                    className="inline-block border-b-2 border-transparent py-4 text-[15px] font-medium text-muted transition-colors duration-200 hover:border-navy hover:text-navy"
                  >
                    {titles[section.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      <SectionContainer id="ceo" containerClassName="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <SectionHeading eyebrow={page.ceo.eyebrow} title={titles.ceo} />
          {hasMessage ? (
            <blockquote className="mt-8 border-l-4 border-brand-blue pl-6">
              {page.ceo.message.map((paragraph) => (
                <p key={paragraph} className="mb-5 text-lg leading-relaxed text-navy/80 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </blockquote>
          ) : showPlaceholder ? (
            <div className="mt-8 rounded-lg border border-dashed border-amber-300 bg-amber-50 p-6 text-amber-900">
              <p className="text-sm font-semibold uppercase tracking-widest">{page.ceo.placeholderLabel}</p>
              <p className="mt-2 leading-relaxed">{page.ceo.placeholder}</p>
            </div>
          ) : (
            <p className="mt-8 text-lg leading-relaxed text-muted">{page.overview.lead}</p>
          )}
          <p className="mt-8 font-semibold text-navy">{ceo.name}</p>
          <p className="text-muted">{ceo.title}</p>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-5">
          <figure className="overflow-hidden rounded-lg border border-line bg-white shadow-card">
            {ceoPhoto ? (
              <Image
                src={ceoPhoto.src}
                alt={ceo.name}
                width={ceoPhoto.width}
                height={ceoPhoto.height}
                sizes="(min-width: 1024px) 420px, 100vw"
                className="aspect-[4/5] w-full object-cover object-top"
                priority
              />
            ) : null}
            <figcaption className="p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">{page.ceo.profileTitle}</p>
              <ul className="mt-4 space-y-2">
                {ceo.credentials.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    {line}
                  </li>
                ))}
              </ul>
              {ceoLinkedin ? (
                <a
                  href={ceoLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${ceo.name} ${page.linkedinLabel}`}
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-medium text-brand-blue transition-colors duration-200 hover:text-brand-blue-dark"
                >
                  LinkedIn →
                </a>
              ) : null}
            </figcaption>
          </figure>
        </Reveal>
      </SectionContainer>

      <SectionContainer id="overview" tone="mist" containerClassName="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading title={titles.overview} />
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {page.overview.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                <dt className="w-28 shrink-0 font-semibold text-navy">{fact.label}</dt>
                <dd className="text-muted">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={120}>
          {page.overview.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-5 text-lg leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 rounded-lg border border-line bg-mist p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">
              {page.overview.capabilitiesTitle}
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {page.overview.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="rounded-md border border-line bg-white px-4 py-3 text-center font-semibold text-navy"
                >
                  {capability}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center justify-center gap-2 font-semibold text-navy">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              {page.overview.capabilitiesResult}
            </p>
          </div>
        </Reveal>
      </SectionContainer>

      <SectionContainer id="history">
        <Reveal>
          <SectionHeading title={titles.history} />
        </Reveal>
        <ol className="mt-12 border-l border-navy/20">
          {page.history.map((milestone) => (
            <li key={milestone.year} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-navy" aria-hidden="true" />
              <p className="text-xl font-semibold text-navy">{milestone.year}</p>
              <ul className="mt-2 space-y-1.5">
                {milestone.items.map((item) => (
                  <li key={item} className="text-lg leading-relaxed text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </SectionContainer>

    </>
  );
}
