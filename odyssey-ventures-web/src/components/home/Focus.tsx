import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

/** Three-column strip under the Hero. Titles and text come from src/messages/*.json. */
export function Focus({ dict }: { dict: Dictionary["focus"] }) {
  return (
    <section className="border-b border-line">
      <Container>
        <Reveal>
          <ul className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {dict.items.map((item, index) => (
              <li key={`${item.title}-${index}`} className="py-10 md:px-8 md:first:pl-0 md:last:pr-0">
                <h2 className="text-2xl font-semibold tracking-tight text-navy">{item.title}</h2>
                <p className="mt-2 text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
