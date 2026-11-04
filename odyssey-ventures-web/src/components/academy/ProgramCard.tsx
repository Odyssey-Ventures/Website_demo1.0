import Image from "next/image";
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

/**
 * Academy webinar/course card: 16:9 thumbnail, then date, title, speaker and summary.
 * The whole card links to the program page, where the existing registration form lives.
 */
export function ProgramCard({ program, lang, labels, past }: ProgramCardProps) {
  const href = localizedHref(lang, `/academy/${program.id}`);
  const time = formatProgramTime(program);
  const cta = past ? labels.details : program.registrationOpen ? labels.register : labels.closed;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card transition duration-300",
        past ? "opacity-80 hover:opacity-100" : "hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-card-hover",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      )}
    >
      <ProgramThumbnail program={program} lang={lang} past={past} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded bg-brand-blue-tint px-2 py-1 text-brand-blue-dark">{labels[program.type]}</span>
          {program.format ? <span className="rounded bg-mist px-2 py-1 text-muted">{program.format}</span> : null}
        </div>

        <p className="mt-4 text-sm font-semibold text-navy-600">
          <time dateTime={program.date}>{formatProgramDate(program.date, lang)}</time>
          {time ? <span className="font-normal text-muted"> · {time}</span> : null}
        </p>
        <h3 className="mt-1.5 text-xl font-semibold leading-snug tracking-tight text-navy">
          <Link href={href} className="after:absolute after:inset-0 focus:outline-none">
            {program.title[lang]}
          </Link>
        </h3>
        {program.summary[lang] ? <p className="mt-2 line-clamp-3 leading-relaxed text-muted">{program.summary[lang]}</p> : null}

        <div className="mt-auto pt-6">
          {program.instructor ? (
            <p className="flex items-center gap-3 border-t border-line pt-4 text-sm">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white"
              >
                {initials(program.instructor)}
              </span>
              <span className="min-w-0">
                <span className="sr-only">{labels.speaker}: </span>
                <span className="block font-semibold text-navy">{program.instructor}</span>
                {program.instructorTitle ? <span className="block truncate text-muted">{program.instructorTitle}</span> : null}
              </span>
            </p>
          ) : null}
          <p
            className={cn(
              "mt-4 inline-flex items-center gap-2 text-sm font-medium",
              past || !program.registrationOpen ? "text-muted" : "text-brand-blue"
            )}
          >
            {cta}
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none">
              →
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}

/** Uploaded thumbnail, or a branded panel with the date when the sheet has no image. Never a stock photo. */
function ProgramThumbnail({ program, lang, past }: { program: Program; lang: Locale; past?: boolean }) {
  const image = program.image;
  const zoom = "transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100";

  if (image) {
    return (
      <div className={cn("relative aspect-[16/9] overflow-hidden bg-navy-100", past && "grayscale-[30%]")}>
        {image.startsWith("/") ? (
          <Image src={image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className={cn("object-cover", zoom)} />
        ) : (
          // Sheet-provided URLs can point anywhere, so they skip next/image's host allow-list.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" loading="lazy" className={cn("absolute inset-0 h-full w-full object-cover", zoom)} />
        )}
      </div>
    );
  }

  const [year, month, day] = program.date.split("-").map(Number);
  const monthLabel =
    year && month && day
      ? new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-US", { month: "short", timeZone: "UTC" }).format(
          new Date(Date.UTC(year, month - 1, day))
        )
      : "";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex aspect-[16/9] items-end overflow-hidden bg-gradient-to-br p-6",
        past ? "from-navy-600 to-navy-800" : "from-navy-700 to-navy-950"
      )}
    >
      <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-blue/30 blur-2xl transition-transform duration-500 group-hover:scale-125 motion-reduce:transition-none" />
      {day ? (
        <span className="relative flex flex-col leading-none text-white">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-green">{monthLabel}</span>
          <span className="mt-1 text-5xl font-semibold tracking-tight">{day}</span>
        </span>
      ) : null}
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand-green transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none" />
    </div>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
