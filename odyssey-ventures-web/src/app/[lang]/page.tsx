import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { About } from "@/components/home/About";
import { Banner } from "@/components/home/Banner";
import { Contact } from "@/components/home/Contact";
import { Focus } from "@/components/home/Focus";
import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { UpcomingPrograms } from "@/components/home/UpcomingPrograms";
import { alternatesFor, isLocale, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Re-read the Programs sheet at most every 5 minutes. */
export const revalidate = 300;

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
      <About lang={lang} dict={dict.about} />
      <Services lang={lang} dict={dict} />
      <UpcomingPrograms
        lang={lang}
        dict={dict.upcoming}
        labels={dict.academyPage.labels}
        sampleNotice={dict.academyPage.sampleNotice}
      />
      <Highlights dict={dict.highlights} />
      <Testimonials dict={dict.testimonials} />
      <Contact dict={dict.contact} lang={lang} />
      <Banner />
    </>
  );
}
