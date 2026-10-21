import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";
import { alternatesFor, isLocale, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.academy;
  return {
    title: page.title,
    description: page.description,
    alternates: alternatesFor(lang, "/academy"),
  };
}

export default async function AcademyPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <PlaceholderPage lang={lang} slug="academy" dict={getDictionary(lang)} />;
}
