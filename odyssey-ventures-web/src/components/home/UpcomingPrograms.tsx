import Link from "next/link";
import { ProgramCard } from "@/components/academy/ProgramCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getPrograms, isUpcoming } from "@/lib/programs";

interface UpcomingProgramsProps {
  lang: Locale;
  dict: Dictionary["upcoming"];
  labels: Dictionary["academyPage"]["labels"];
  sampleNotice: string;
}

/** The next three Academy sessions. Renders nothing when none is scheduled. */
export async function UpcomingPrograms({ lang, dict, labels, sampleNotice }: UpcomingProgramsProps) {
  const { programs, isSample } = await getPrograms();
  const upcoming = programs.filter((program) => isUpcoming(program)).slice(0, 3);
  if (upcoming.length === 0) return null;

  return (
    <SectionContainer>
      <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading title={dict.title}>{dict.description}</SectionHeading>
        <Link href={localizedHref(lang, "/academy")} className="shrink-0 font-medium text-brand-blue hover:text-brand-blue-dark">
          {dict.viewAll} →
        </Link>
      </Reveal>
      {isSample ? <p className="mt-6 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900">{sampleNotice}</p> : null}
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((program) => (
          <li key={program.id}>
            <ProgramCard program={program} lang={lang} labels={labels} />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
