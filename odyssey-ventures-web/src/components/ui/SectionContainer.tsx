import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type Tone = "white" | "mist" | "navy";

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
}

const tones: Record<Tone, string> = {
  white: "bg-white",
  mist: "border-y border-line bg-mist",
  navy: "focus-dark bg-navy text-white",
};

/** One page section: vertical rhythm, background tone and the centered content width in a single place. */
export function SectionContainer({ children, id, tone = "white", className, containerClassName }: SectionContainerProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-20 sm:py-28 md:scroll-mt-24", tones[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
