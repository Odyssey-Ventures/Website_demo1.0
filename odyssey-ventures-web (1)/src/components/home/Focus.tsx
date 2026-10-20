import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Source: the three-item list on the live site (translated from Korean). */
const items = [
  { title: "Corporate Training", text: "Mentoring, corporate training, market research" },
  { title: "Startup Acceleration", text: "U.S. market entry" },
  { title: "Business Development", text: "Acquiring potential customers" },
];

export function Focus() {
  return (
    <section className="border-b border-line">
      <Container>
        <Reveal>
          <ul className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {items.map((item) => (
              <li key={item.title} className="py-10 md:px-8 md:first:pl-0 md:last:pr-0">
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
