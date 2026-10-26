import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { contactPath } from "@/config/navigation";
import { images } from "@/config/images";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface HeroProps {
  lang: Locale;
  dict: Dictionary["hero"];
}

export function Hero({ lang, dict }: HeroProps) {
  return (
    <section className="focus-dark relative isolate overflow-hidden bg-navy-950 text-white">
      <Image
        src={images.hero.src}
        alt={images.hero.alt}
        width={images.hero.width}
        height={images.hero.height}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* Even overlay on phones; on wider screens the left side is darker so the text stays readable. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-navy-950/75 md:bg-transparent md:bg-gradient-to-r md:from-navy-950/90 md:via-navy-950/70 md:to-navy-950/25"
      />

      <Container className="flex min-h-[520px] flex-col justify-center py-24 md:min-h-[640px] md:py-32">
        <span aria-hidden="true" className="h-1 w-14 rounded-full bg-brand-green" />
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          {dict.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{dict.description}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="#services" variant="accent">
            {dict.primaryCta}
          </Button>
          <Button href={localizedHref(lang, contactPath)} variant="outlineInverse">
            {dict.secondaryCta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
