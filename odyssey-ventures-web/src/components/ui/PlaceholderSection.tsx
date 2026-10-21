import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface PlaceholderItem {
  title: string;
  text: string;
}

interface PlaceholderSectionProps {
  title: string;
  description?: string;
  items: readonly PlaceholderItem[];
  /** Label shown on each card, e.g. "Placeholder". */
  badge: string;
  id?: string;
  tone?: "white" | "mist";
  columns?: 2 | 3;
}

const columnClasses = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
} as const;

/**
 * Reusable block for programs, partnerships, results and other future content.
 * Swap the `items` for real content later; the layout does not change.
 */
export function PlaceholderSection({ title, description, items, badge, id, tone = "white", columns = 3 }: PlaceholderSectionProps) {
  return (
    <SectionContainer id={id} tone={tone}>
      <Reveal>
        <SectionHeading title={title}>{description}</SectionHeading>
      </Reveal>

      <div className={cn("mt-12 grid gap-6", columnClasses[columns])}>
        {items.map((item, index) => (
          <Reveal key={`${item.title}-${index}`} delay={index * 100} className="h-full">
            <article className="flex h-full flex-col rounded-lg border border-dashed border-navy/25 bg-white p-7">
              <span className="inline-block w-fit rounded bg-brand-blue-tint px-2 py-1 text-xs font-medium text-brand-blue-dark">
                {badge}
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-navy">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionContainer>
  );
}
