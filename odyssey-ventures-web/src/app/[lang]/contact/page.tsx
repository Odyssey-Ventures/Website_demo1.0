import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Contact } from "@/components/home/Contact";
import { alternatesFor, isLocale, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.contact;
  return { title: page.title, description: page.description, alternates: alternatesFor(lang, "/contact") };
}

export default async function ContactPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return <Contact dict={dict.contact} lang={lang} />;
}
