import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { About } from "@/components/home/About";
import { Banner } from "@/components/home/Banner";
import { Contact } from "@/components/home/Contact";
import { Focus } from "@/components/home/Focus";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { PlaceholderSection } from "@/components/ui/PlaceholderSection";
import { alternatesFor, isLocale, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { alternates: alternatesFor(lang) };
}

export default async function HomePage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict.hero} />
      <Focus dict={dict.focus} />
      <About dict={dict.about} />
      <Services lang={lang} dict={dict} />
      <PlaceholderSection
        tone="white"
        title={dict.additional.title}
        description={dict.additional.description}
        items={dict.additional.items}
        badge={dict.common.placeholderTag}
      />
      <Testimonials dict={dict.testimonials} />
      <Contact dict={dict.contact} />
      <Banner />
    </>
  );
}
