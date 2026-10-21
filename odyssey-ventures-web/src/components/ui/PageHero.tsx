import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Accent = "blue" | "green" | "navy";

interface PageHeroProps {
  title: string;
  eyebrow?: string;
  description?: string;
  /** Small per-page variation; the overall style stays the same. */
  accent?: Accent;
}

const glow: Record<Accent, string> = {
  blue: "from-brand-blue/50",
  green: "from-brand-green/30",
  navy: "from-navy-600/60",
};

/** Banner at the top of Academy, Accelerator and Advisory. */
export function PageHero({ title, eyebrow, description, accent = "blue" }: PageHeroProps) {
  return (
    <section className="focus-dark relative isolate overflow-hidden bg-navy-950 text-white">
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
