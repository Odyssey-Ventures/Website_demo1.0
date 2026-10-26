import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdvisorAvatar } from "@/components/advisory/AdvisorAvatar";
import { AdvisoryRequestForm } from "@/components/advisory/AdvisoryRequestForm";
import { AdvisorTabs } from "@/components/advisory/AdvisorTabs";
import { PaymentOptions } from "@/components/advisory/PaymentOptions";
import { Container } from "@/components/ui/Container";
import { advisorProfiles, getAdvisorProfile } from "@/data/advisor-profiles";
import { alternatesFor, isLocale, locales, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface AdvisorParams {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((lang) => advisorProfiles.map((advisor) => ({ lang, slug: advisor.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: AdvisorParams): Promise<Metadata> {
  const { lang, slug } = await params;
  const advisor = getAdvisorProfile(slug);
  if (!isLocale(lang) || !advisor) return {};
  const role = [advisor.title, advisor.org].filter(Boolean).join(", ");
  return {
    title: `${advisor.name} | ${getDictionary(lang).meta.pages.advisory.title}`,
    description: `${role}. ${advisor.specialties}`,
    alternates: alternatesFor(lang, `/advisory/${advisor.slug}`),
  };
}

/** One advisor: profile tab (bio, history, education) and a meeting-request tab with payment buttons. */
export default async function AdvisorPage({ params }: AdvisorParams) {
  const { lang, slug } = await params;
  const advisor = getAdvisorProfile(slug);
  if (!isLocale(lang) || !advisor) notFound();
  const dict = getDictionary(lang);
  const page = dict.advisors;
  const labels = page.profile;

  const headingClass = "text-sm font-semibold uppercase tracking-widest text-brand-blue";

  const profile = (
    <div className="grid gap-10 lg:grid-cols-3">
      <div className="space-y-10 lg:col-span-2">
        <section>
          <h2 className={headingClass}>{labels.bio}</h2>
          <p className="mt-4 text-lg leading-relaxed text-navy">{advisor.bio}</p>
        </section>
        {advisor.career.length > 0 ? (
          <section>
            <h2 className={headingClass}>{labels.career}</h2>
            <ul className="mt-4 space-y-3">
              {advisor.career.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-navy">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {advisor.education.length > 0 ? (
          <section>
            <h2 className={headingClass}>{labels.education}</h2>
            <ul className="mt-4 space-y-3">
              {advisor.education.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-navy">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <p className="text-sm text-muted">{labels.sourceNote}</p>
      </div>

      <aside className="h-fit rounded-lg border border-line bg-mist p-6">
        <h2 className={headingClass}>{labels.specialties}</h2>
        <p className="mt-3 leading-relaxed text-navy">{advisor.specialties}</p>
        <a
          href="#meeting"
          className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-brand-blue px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-brand-blue-dark"
        >
          {labels.requestCta}
        </a>
      </aside>
    </div>
  );

  const meeting = (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-semibold tracking-tight text-navy">{page.request.title.replace("{name}", advisor.name)}</h2>
        <p className="mt-3 leading-relaxed text-muted">{page.request.description}</p>
        <ol className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-sm text-muted">
          {page.request.steps.map((step, index) => (
            <li key={step} className="flex items-center gap-3">
              <span className={index === 0 ? "font-semibold text-brand-blue" : undefined}>
                {index + 1}. {step}
              </span>
              {index < page.request.steps.length - 1 ? <span aria-hidden="true">→</span> : null}
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <AdvisoryRequestForm
            lang={lang}
            dict={dict.advisoryRequest}
            areas={page.areas}
            advisor={{ name: advisor.name, area: advisor.areas[0] }}
          />
        </div>
      </div>
      <div className="lg:col-span-2">
        <PaymentOptions advisorSlug={advisor.slug} dict={page.payment} />
      </div>
    </div>
  );

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Link href={`${localizedHref(lang, "/advisory")}#advisors`} className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
          ← {labels.back}
        </Link>

        <header className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
          <AdvisorAvatar name={advisor.name} size="lg" />
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              {advisor.name}
              {advisor.nameKo ? <span className="ml-3 text-2xl font-normal text-muted sm:text-3xl">{advisor.nameKo}</span> : null}
            </h1>
            <p className="mt-2 text-lg text-muted">{[advisor.title, advisor.org].filter(Boolean).join(" · ")}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="sr-only">{labels.areas}:</span>
              {advisor.areas.map((key) => (
                <span key={key} className="rounded bg-brand-blue-tint px-2.5 py-1 font-medium text-brand-blue-dark">
                  {page.areas[key]}
                </span>
              ))}
              <span className="rounded border border-line px-2.5 py-1 text-muted">
                <span className="sr-only">{labels.meetingFormat}: </span>
                {page.meeting[advisor.meeting]}
              </span>
              {advisor.linkedin ? (
                <a
                  href={advisor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-line px-2.5 py-1 font-medium text-brand-blue transition-colors hover:border-brand-blue"
                >
                  {labels.linkedin} ↗
                </a>
              ) : null}
            </div>
          </div>
        </header>

        <div className="mt-10">
          <AdvisorTabs label={labels.tabsLabel} labels={labels.tabs} profile={profile} meeting={meeting} />
        </div>
      </Container>
    </section>
  );
}
