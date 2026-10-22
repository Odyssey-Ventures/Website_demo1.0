import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutSections } from "@/config/navigation";
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

/** Photos are not available yet, so every card shows an empty frame. */
function PersonCard({ name, role }: { name: string; role: string }) {
  return (
    <li>
      <div className="aspect-[4/5] w-full rounded-md bg-navy-50" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-semibold text-navy">{name}</h3>
      <p className="text-muted">{role}</p>
    </li>
  );
}

/**
 * Company overview, history, board and team.
 * History, board and team entries in src/messages/*.json are placeholders:
 * replace them with verified names, titles and dates. Do not publish invented details.
 */
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
          <p className="mt-3 text-lg font-medium text-navy-600">{page.overview.lead}</p>
        </Reveal>
        <Reveal delay={120}>
          {page.overview.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-5 text-lg leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {page.overview.pillars.map((pillar) => (
              <li key={pillar.title} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                <span className="w-32 shrink-0 text-lg font-semibold text-navy">{pillar.title}</span>
                <span className="text-lg text-muted">{pillar.text}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </SectionContainer>

      <SectionContainer id="history" tone="mist">
        <Reveal>
          <SectionHeading title={titles.history} />
        </Reveal>
        <ol className="mt-12 border-l border-navy/20">
          {page.history.map((milestone, i) => (
            <li key={i} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-navy" aria-hidden="true" />
              <p className="text-xl font-semibold text-navy">{milestone.year}</p>
              <p className="mt-1 text-lg text-muted">{milestone.text}</p>
            </li>
          ))}
        </ol>
      </SectionContainer>

      <SectionContainer id="board">
        <Reveal>
          <SectionHeading title={titles.board} />
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-3 lg:gap-10">
          {page.board.map((person, i) => (
            <PersonCard key={i} name={person.name} role={person.role} />
          ))}
        </ul>
      </SectionContainer>

      <SectionContainer id="team" className="border-t border-line">
        <Reveal>
          <SectionHeading title={titles.team} />
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {page.team.map((person, i) => (
            <PersonCard key={i} name={person.name} role={person.role} />
          ))}
        </ul>
      </SectionContainer>
    </>
  );
}
