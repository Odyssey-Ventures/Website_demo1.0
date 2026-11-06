import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { alternatesFor, isLocale, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.privacy;
  return { title: page.title, description: page.description, alternates: alternatesFor(lang, "/privacy") };
}

export default async function PrivacyPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <LegalPage kind="privacy" lang={lang} />;
}
