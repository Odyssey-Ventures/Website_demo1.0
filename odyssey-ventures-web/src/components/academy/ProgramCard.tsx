import Link from "next/link";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatProgramDate, formatProgramTime } from "@/lib/programs";
import { cn } from "@/lib/utils";
import type { Program } from "@/types";

interface ProgramCardProps {
  program: Program;
  lang: Locale;
  labels: Dictionary["academyPage"]["labels"];
  /** Past sessions are shown quieter and without a register call to action. */
  past?: boolean;
}

export function ProgramCard({ program, lang, labels, past }: ProgramCardProps) {
  const href = localizedHref(lang, `/academy/${program.id}`);
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-card transition duration-300",
        past ? "opacity-75" : "hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-card-hover"
      )}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="rounded bg-brand-blue-tint px-2 py-1 text-brand-blue-dark">{labels[program.type]}</span>
        {program.format ? <span className="rounded bg-mist px-2 py-1 text-muted">{program.format}</span> : null}
      </div>
      <p className="mt-4 text-sm font-semibold text-navy-600">
        {formatProgramDate(program.date, lang)}
        {formatProgramTime(program) ? <span className="font-normal text-muted"> · {formatProgramTime(program)}</span> : null}
      </p>
      <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-navy">
        <Link href={href} className="after:absolute after:inset-0 focus:outline-none">
          {program.title[lang]}
        </Link>
      </h3>
      {program.summary[lang] ? <p className="mt-2 leading-relaxed text-muted">{program.summary[lang]}</p> : null}
      <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm">
        <span className="text-muted">{program.instructor}</span>
        <span className="font-medium text-brand-blue">
          {past ? labels.details : program.registrationOpen ? labels.register : labels.closed} →
        </span>
      </div>
    </article>
  );
}
