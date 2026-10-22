import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutSections } from "@/config/navigation";
import { experts } from "@/data/experts";
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

/** Company overview, history, experts and team. Content comes from the 2026 company profile. */
export default async function AboutPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.aboutPage;
  const titles = dict.nav.aboutSections;

  return (
    <>
      <PageHero title={dict.nav.about} description={page.overview.lead} accent="navy" />

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

      <SectionContainer id="overview" containerClassName="grid gap-12 lg:grid-cols-2 lg:gap-20">
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

      <SectionContainer id="history" tone="mist">
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

      <SectionContainer id="experts">
        <Reveal>
          <SectionHeading title={titles.experts}>{page.expertsDescription}</SectionHeading>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {experts.map((expert) => (
            <li key={expert.name} className="text-center">
              <Image
                src={expert.photo}
                alt={expert.name}
                width={304}
                height={304}
                sizes="(min-width: 640px) 160px, 40vw"
                className="mx-auto aspect-square w-full max-w-40 rounded-full object-cover"
              />
              <p className="mt-4 text-lg font-semibold text-navy">{expert.name}</p>
            </li>
          ))}
        </ul>
      </SectionContainer>

      <SectionContainer id="team" className="border-t border-line">
        <Reveal>
          <SectionHeading title={titles.team}>{page.teamDescription}</SectionHeading>
        </Reveal>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map(({ id, photo, linkedin }) => {
            const member = page.team[id];
            return (
              <li key={id} className="flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card">
                {photo ? (
                  <Image
                    src={photo.src}
                    alt={member.name}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                ) : (
                  <div aria-hidden="true" className="flex aspect-[4/5] w-full items-center justify-center bg-navy-50">
                    <span className="text-5xl font-semibold tracking-tight text-navy/30">
                      {member.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className="w-fit rounded bg-brand-blue-tint px-2 py-1 text-xs font-semibold tracking-widest text-brand-blue-dark">
                    {member.badge}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-navy">{member.name}</h3>
                  <p className="mt-1 font-medium text-muted">{member.title}</p>
                  <ul className="mt-5 flex-1 space-y-2 border-t border-line pt-5">
                    {member.credentials.map((line) => (
                      <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  {linkedin ? (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} ${page.linkedinLabel}`}
                      className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-brand-blue transition-colors duration-200 hover:text-brand-blue-dark"
                    >
                      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                      </svg>
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </SectionContainer>
    </>
  );
}
