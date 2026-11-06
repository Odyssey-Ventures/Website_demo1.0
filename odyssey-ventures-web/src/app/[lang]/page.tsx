import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { About } from "@/components/home/About";
import { Banner } from "@/components/home/Banner";
import { Contact } from "@/components/home/Contact";
import { Focus } from "@/components/home/Focus";
import { Hero } from "@/components/home/Hero";
import { EventsHighlights } from "@/components/home/EventsHighlights";
import { Impact } from "@/components/home/Impact";
import { Partners } from "@/components/home/Partners";
import { Services } from "@/components/home/Services";
import { SuccessStories } from "@/components/home/SuccessStories";
import { Testimonials } from "@/components/home/Testimonials";
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
      {/* 1. Hero  2. Partners & Network */}
      <Hero lang={lang} dict={dict.hero} />
      <Partners dict={dict.partners} />
      <Focus dict={dict.focus} />
      {/* 3. Our Services, with the company introduction right after */}
      <Services lang={lang} dict={dict} />
      <About lang={lang} dict={dict.about} />
      {/* 4. Our Impact  5. Success Stories  6. Events & Highlights */}
      <Impact lang={lang} dict={dict.impact} />
      <SuccessStories lang={lang} dict={dict.successStories} />
      <EventsHighlights lang={lang} dict={dict.events} items={dict.acceleratorPage.gallery} />
      <Testimonials dict={dict.testimonials} />
      {/* 7. Final call to action: consultation form */}
      <Contact dict={dict.contact} lang={lang} />
      <Banner />
    </>
  );
}
