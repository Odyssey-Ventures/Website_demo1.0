import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/config/images";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** Company introduction on Home, linking to the About Us page. */
export function About({ lang, dict }: { lang: Locale; dict: Dictionary["about"] }) {
  return (
    <SectionContainer id="about" containerClassName="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal>
        <div className="relative">
          <span aria-hidden="true" className="absolute -bottom-4 -left-4 hidden h-full w-full rounded-lg bg-brand-blue-tint sm:block" />
          <Image
            src={images.instructors.src}
            alt={dict.imageAlt}
            width={images.instructors.width}
            height={images.instructors.height}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="relative aspect-[4/3] w-full rounded-lg object-cover shadow-card"
          />
        </div>
      </Reveal>

      <Reveal delay={120}>
        <SectionHeading title={dict.title}>{dict.description}</SectionHeading>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {dict.points.map((point, index) => (
            <li key={`${point}-${index}`} className="py-4 leading-relaxed text-muted">
              {point}
            </li>
          ))}
        </ul>
        <Link href={localizedHref(lang, "/about")} className="mt-6 inline-block font-medium text-brand-blue hover:text-brand-blue-dark">
          {dict.linkLabel} →
        </Link>
      </Reveal>
    </SectionContainer>
  );
}
