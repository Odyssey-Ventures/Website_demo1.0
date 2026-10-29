import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RegistrationForm } from "@/components/academy/RegistrationForm";
import { Container } from "@/components/ui/Container";
import { getAcademyPaymentUrl } from "@/config/payments";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatProgramDate, formatProgramPrice, formatProgramTime, getProgram, isUpcoming } from "@/lib/programs";

/** Re-read the Programs sheet at most every 5 minutes. */
export const revalidate = 300;

interface ProgramParams {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateMetadata({ params }: ProgramParams): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};
  const found = await getProgram(id);
  if (!found) return {};
  const { program, isSample } = found;
  return {
    title: program.title[lang],
    description: program.summary[lang],
    alternates: {
      canonical: `/${lang}/academy/${id}`,
      languages: { en: `/en/academy/${id}`, ko: `/ko/academy/${id}` },
    },
    // Sample sessions exist only for review and must never be indexed.
    robots: isSample ? { index: false, follow: false } : undefined,
  };
}

export default async function ProgramPage({ params }: ProgramParams) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const found = await getProgram(id);
  if (!found) notFound();
  const { program, isSample } = found;
  const dict = getDictionary(lang);
  const page = dict.academyPage;
  const open = program.registrationOpen && isUpcoming(program);
  const time = formatProgramTime(program);
  const price = program.price ? formatProgramPrice(program.price, lang) : "";

  const facts = [
    { label: page.labels.date, value: `${formatProgramDate(program.date, lang)}${time ? ` · ${time}` : ""}` },
    { label: page.labels.format, value: program.format },
    { label: page.labels.instructor, value: program.instructor },
    { label: page.labels.capacity, value: program.capacity ? `${program.capacity}${page.labels.capacityUnit}` : "" },
    { label: page.labels.price, value: price },
  ].filter((fact) => fact.value);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Link href={localizedHref(lang, "/academy")} className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
          ← {page.labels.back}
        </Link>
        {isSample ? <p className="mt-6 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900">{page.sampleNotice}</p> : null}

        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="rounded bg-brand-blue-tint px-2 py-1 text-xs font-semibold text-brand-blue-dark">
              {page.labels[program.type]}
            </span>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl">{program.title[lang]}</h1>
            {program.summary[lang] ? <p className="mt-4 text-lg leading-relaxed text-muted">{program.summary[lang]}</p> : null}

            <dl className="mt-8 divide-y divide-line border-y border-line">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                  <dt className="w-24 shrink-0 font-semibold text-navy">{fact.label}</dt>
                  <dd className="text-muted">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 space-y-4 leading-relaxed text-navy">
              {program.description[lang]
                .split(/\n+/)
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-8 lg:sticky lg:top-28">
              <h2 className="text-2xl font-semibold tracking-tight text-navy">{page.register.title}</h2>
              {open ? (
                <>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{page.register.description}</p>
                  <div className="mt-6">
                    <RegistrationForm
                      lang={lang}
                      dict={page.register}
                      program={{ id: program.id, title: program.title[lang], date: program.date }}
                      price={price || undefined}
                      paymentUrl={getAcademyPaymentUrl(program)}
                    />
                  </div>
                </>
              ) : (
                <p className="mt-3 text-muted">{page.register.closedNote}</p>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
