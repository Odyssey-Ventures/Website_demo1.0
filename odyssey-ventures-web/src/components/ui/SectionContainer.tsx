import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cityPhotos, type CityPhoto } from "@/config/photos";
import { cn } from "@/lib/utils";

type Tone = "white" | "mist" | "navy";

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  /** San Francisco photo behind a navy section, under a dark overlay so the text stays readable. */
  photo?: CityPhoto;
}

const tones: Record<Tone, string> = {
  white: "bg-white",
  mist: "border-y border-line bg-mist",
  navy: "focus-dark bg-navy text-white",
};

/** One page section: vertical rhythm, background tone and the centered content width in a single place. */
export function SectionContainer({ children, id, tone = "white", className, containerClassName, photo }: SectionContainerProps) {
  const withPhoto = photo && tone === "navy";
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 py-20 sm:py-28 md:scroll-mt-24", tones[tone], withPhoto && "relative isolate overflow-hidden", className)}
    >
      {withPhoto ? (
        <>
          <Image src={cityPhotos[photo].src} alt="" fill sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/85" />
        </>
      ) : null}
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
