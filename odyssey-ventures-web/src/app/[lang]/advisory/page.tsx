import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdvisoryBoard } from "@/components/advisory/AdvisoryBoard";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { alternatesFor, isLocale, localizedHref, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.advisory;
  return { title: page.title, description: page.description, alternates: alternatesFor(lang, "/advisory") };
}

/** 1:1 Advisory: areas, the request → review → match → payment → session process, and the advisory board. */
export default async function AdvisoryPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.advisoryPage;
  const requestHref = localizedHref(lang, "/advisory/request");

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} accent="navy" />

      <SectionContainer>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading title={page.areasTitle} />
          <Button href={requestHref} className="shrink-0">
            {page.cta}
          </Button>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {page.areas.map((area) => (
            <article key={area.title} className="rounded-lg border border-line bg-white p-7 shadow-card">
              <h3 className="text-xl font-semibold tracking-tight text-navy">{area.title}</h3>
              <ul className="mt-5 space-y-2 border-t border-line pt-5">
                {area.items.map((item) => (
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

      <SectionContainer tone="navy">
        <SectionHeading title={page.processTitle} inverse>
          {page.processDescription}
        </SectionHeading>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {page.process.map((step, index) => (
            <li key={step.title} className="border-t-2 border-brand-green pt-5">
              <p className="text-sm font-semibold tracking-widest text-brand-green">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-navy-100">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-navy-100">{page.pricingNote}</p>
          <Button href={requestHref} variant="accent" className="shrink-0">
            {page.cta}
          </Button>
        </div>
      </SectionContainer>

      <AdvisoryBoard lang={lang} dict={dict.advisoryBoard} />
    </>
  );
}
