import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProgramCard } from "@/components/academy/ProgramCard";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/data/team";
import { alternatesFor, isLocale, localizedHref, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPrograms, isUpcoming } from "@/lib/programs";

/** Re-read the Programs sheet at most every 5 minutes. */
export const revalidate = 300;

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.academy;
  return { title: page.title, description: page.description, alternates: alternatesFor(lang, "/academy") };
}

export default async function AcademyPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.academyPage;
  const { programs, isSample } = await getPrograms();
  const upcoming = programs.filter((program) => isUpcoming(program));
  const past = programs.filter((program) => !isUpcoming(program)).reverse();
  const instructor = dict.aboutPage.team["okkeun-lee"];
  const instructorPhoto = team.find((member) => member.id === "okkeun-lee")?.photo;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} accent="blue" />

      <SectionContainer id="schedule">
        <Reveal>
          <SectionHeading title={page.scheduleTitle}>{page.scheduleDescription}</SectionHeading>
        </Reveal>
        {isSample ? <p className="mt-6 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900">{page.sampleNotice}</p> : null}

        <h3 className="mt-12 text-sm font-semibold uppercase tracking-widest text-brand-blue">{page.upcoming}</h3>
        {upcoming.length > 0 ? (
          <ul className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((program) => (
              <li key={program.id}>
                <ProgramCard program={program} lang={lang} labels={page.labels} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-5 flex flex-col gap-4 rounded-lg border border-dashed border-navy/25 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted">{page.empty}</p>
            <Button href={localizedHref(lang, "/contact")} variant="secondary" className="shrink-0">
              {page.emptyCta}
            </Button>
          </div>
        )}

        {past.length > 0 ? (
          <>
            <h3 className="mt-14 text-sm font-semibold uppercase tracking-widest text-muted">{page.past}</h3>
            <ul className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {past.map((program) => (
                <li key={program.id}>
                  <ProgramCard program={program} lang={lang} labels={page.labels} past />
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </SectionContainer>

      <SectionContainer tone="mist">
        <Reveal>
          <SectionHeading title={page.curriculumTitle}>{page.curriculumDescription}</SectionHeading>
        </Reveal>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {page.curriculum.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-line bg-white p-5 shadow-card">
              <p className="text-sm font-semibold tracking-widest text-brand-blue">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-semibold text-navy">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </SectionContainer>

      <SectionContainer>
        <Reveal>
          <SectionHeading title={page.coursesTitle} />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {page.courses.map((course) => (
            <article key={course.title} className="rounded-lg border border-line bg-white p-7 shadow-card">
              <h3 className="text-xl font-semibold tracking-tight text-navy">{course.title}</h3>
              <p className="mt-1 text-sm text-muted">{course.audience}</p>
              <ul className="mt-5 space-y-2 border-t border-line pt-5">
                {course.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-navy">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer tone="mist" containerClassName="grid items-center gap-10 md:grid-cols-[240px,1fr]">
        {instructorPhoto ? (
          <Image
            src={instructorPhoto.src}
            alt={instructor.name}
            width={instructorPhoto.width}
            height={instructorPhoto.height}
            sizes="240px"
            className="aspect-[4/5] w-full max-w-60 rounded-lg object-cover object-top"
          />
        ) : null}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">{page.instructorTitle}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-navy">{instructor.name}</h2>
          <p className="mt-1 text-muted">{instructor.title}</p>
          <ul className="mt-5 space-y-2">
            {instructor.credentials.map((line) => (
              <li key={line} className="flex gap-3 leading-relaxed text-navy">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </SectionContainer>
    </>
  );
}
