import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cityPhotos, type CityPhoto } from "@/config/photos";
import { cn } from "@/lib/utils";

type Accent = "blue" | "green" | "navy";

interface PageHeroProps {
  title: string;
  eyebrow?: string;
  description?: string;
  /** Small per-page variation; the overall style stays the same. */
  accent?: Accent;
  /** San Francisco background photo (src/config/photos.ts). Pass false for a plain navy banner. */
  photo?: CityPhoto | false;
}

const glow: Record<Accent, string> = {
  blue: "from-brand-blue/50",
  green: "from-brand-green/30",
  navy: "from-navy-600/60",
};

/** Banner at the top of the inner pages: a San Francisco photo under a navy overlay that keeps the text readable. */
export function PageHero({ title, eyebrow, description, accent = "blue", photo = "skylineHill" }: PageHeroProps) {
  return (
    <section className="focus-dark relative isolate overflow-hidden bg-navy-950 text-white">
      {photo ? (
        <>
          <Image src={cityPhotos[photo].src} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          {/* Even overlay on phones; on wider screens the left side, where the text is, stays darker. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-navy-950/80 md:bg-transparent md:bg-gradient-to-r md:from-navy-950/95 md:via-navy-950/75 md:to-navy-950/35"
          />
        </>
      ) : null}
      <div
        aria-hidden="true"
        className={cn(
          "absolute -right-32 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br to-transparent blur-3xl",
          glow[accent]
        )}
      />
      <Container className="py-20 sm:py-24 md:py-32">
        <SectionHeading as="h1" size="lg" inverse eyebrow={eyebrow} title={title} className="max-w-3xl">
          {description}
        </SectionHeading>
      </Container>
    </section>
  );
}
