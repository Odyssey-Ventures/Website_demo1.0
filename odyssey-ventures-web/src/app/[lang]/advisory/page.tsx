import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdvisoryBoard } from "@/components/advisory/AdvisoryBoard";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";
import { alternatesFor, isLocale, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.advisory;
  return {
    title: page.title,
    description: page.description,
    alternates: alternatesFor(lang, "/advisory"),
  };
}

export default async function AdvisoryPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return (
    <PlaceholderPage lang={lang} slug="advisory" dict={dict}>
      <AdvisoryBoard lang={lang} dict={dict.advisoryBoard} />
    </PlaceholderPage>
  );
}
