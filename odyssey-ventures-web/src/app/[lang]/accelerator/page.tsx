import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Contact } from "@/components/home/Contact";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { alternatesFor, isLocale, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.accelerator;
  return { title: page.title, description: page.description, alternates: alternatesFor(lang, "/accelerator") };
}

/** Accelerator: program tracks and track record, with an inquiry form. Operations features come later. */
export default async function AcceleratorPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.acceleratorPage;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} accent="green" />

      <SectionContainer>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading title={page.tracksTitle}>{page.tracksDescription}</SectionHeading>
          <Button href="#contact" className="shrink-0">
            {page.cta}
          </Button>
        </Reveal>
        <ol className="mt-12 grid gap-6 lg:grid-cols-3">
          {page.tracks.map((track, index) => (
            <li key={track.title} className="flex flex-col rounded-lg border border-line bg-white p-7 shadow-card">
              <p className="text-sm font-semibold tracking-widest text-brand-blue">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-navy">{track.title}</h3>
              <p className="mt-3 rounded-md bg-mist px-3 py-2 text-sm leading-relaxed text-muted">
                <span className="font-semibold text-navy">{page.audienceLabel}</span> · {track.audience}
              </p>
              <ul className="mt-5 space-y-2">
                {track.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-navy">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </SectionContainer>

      <SectionContainer tone="mist">
        <Reveal>
          <SectionHeading title={page.galleryTitle}>{page.galleryDescription}</SectionHeading>
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {page.gallery.map((item, index) => (
            <li key={item.title} className={index === 0 ? "sm:col-span-2" : undefined}>
              <Reveal delay={(index % 3) * 100} className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card">
                <div className={index === 0 ? "relative aspect-[16/9]" : "relative aspect-[4/3]"}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={index === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-semibold text-brand-blue">{item.date}</p>
                  <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-navy">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </SectionContainer>

      <SectionContainer>
        <Reveal>
          <SectionHeading title={page.recordTitle} />
        </Reveal>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {page.records.map((record) => (
            <li key={record.title} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8">
              <span className="w-16 shrink-0 font-semibold text-brand-blue">{record.year}</span>
              <span className="leading-relaxed text-navy">{record.title}</span>
            </li>
          ))}
        </ul>
      </SectionContainer>

      <Contact
        dict={dict.contact}
        lang={lang}
        title={page.contactTitle}
        description={page.contactDescription}
        defaultInterest="accelerator"
      />
    </>
  );
}
