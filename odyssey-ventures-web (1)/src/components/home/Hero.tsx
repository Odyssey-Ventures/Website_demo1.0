import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { contactHref } from "@/config/navigation";
import { images } from "@/config/images";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <Image
        src={images.hero.src}
        alt={images.hero.alt}
        width={images.hero.width}
        height={images.hero.height}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-navy-950/70" aria-hidden="true" />

      <Container className="flex min-h-[540px] flex-col justify-center py-24 md:min-h-[680px] md:py-32">
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          Helping Startups Expand into the U.S.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
          Odyssey Ventures is a Silicon Valley-based education, consulting and startup accelerator company. We help
          startups and businesses build the product, fundraising and sales capabilities they need to succeed in global
          markets.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="#services" variant="inverse">
            Explore our services
          </Button>
          <Button href={contactHref} variant="outlineInverse">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
