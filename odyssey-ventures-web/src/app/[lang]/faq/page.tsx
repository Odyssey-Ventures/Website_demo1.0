import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq/FaqList";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { alternatesFor, isLocale, localizedHref, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.faq;
  return { title: page.title, description: page.description, alternates: alternatesFor(lang, "/faq") };
}

export default async function FaqPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const page = getDictionary(lang).faqPage;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} accent="blue" />
      <SectionContainer>
        <div className="mx-auto max-w-4xl">
        <FaqList dict={page} />
        <div className="mt-14 flex flex-col gap-4 rounded-lg bg-navy p-7 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">{page.moreTitle}</h2>
            <p className="mt-1 text-navy-100">{page.moreText}</p>
          </div>
          <Button href={localizedHref(lang, "/support")} variant="accent" className="shrink-0">
            {page.moreCta}
          </Button>
        </div>
        </div>
      </SectionContainer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
