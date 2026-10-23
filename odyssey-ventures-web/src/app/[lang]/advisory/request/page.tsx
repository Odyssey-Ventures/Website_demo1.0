import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdvisoryRequestForm } from "@/components/advisory/AdvisoryRequestForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { alternatesFor, isLocale, localizedHref, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.advisoryRequest;
  return { title: page.title, description: page.description, alternates: alternatesFor(lang, "/advisory/request") };
}

export default async function AdvisoryRequestPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.advisoryRequest;

  return (
    <section className="bg-mist py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Link href={localizedHref(lang, "/advisory")} className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
          ← {page.back}
        </Link>
        <SectionHeading as="h1" title={page.title} className="mt-6">
          {page.description}
        </SectionHeading>
        <ol className="mt-8 flex flex-wrap gap-x-3 gap-y-2 text-sm text-muted">
          {dict.advisoryPage.process.map((step, index) => (
            <li key={step.title} className="flex items-center gap-3">
              <span className={index === 0 ? "font-semibold text-brand-blue" : undefined}>
                {index + 1}. {step.title}
              </span>
              {index < dict.advisoryPage.process.length - 1 ? <span aria-hidden="true">→</span> : null}
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <AdvisoryRequestForm lang={lang} dict={page} categories={dict.advisoryBoard.categories} />
        </div>
      </Container>
    </section>
  );
}
