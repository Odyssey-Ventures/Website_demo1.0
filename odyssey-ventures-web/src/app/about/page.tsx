import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { board, history, overview, team, type Person } from "@/data/about";

export const metadata: Metadata = {
  title: "About Us",
  description: "Odyssey Ventures is a Silicon Valley-based education, consulting and startup accelerator company.",
};

const sections = [
  { id: "overview", label: "Company Overview" },
  { id: "history", label: "History" },
  { id: "board", label: "Board of Directors" },
  { id: "team", label: "Team" },
];

function PersonCard({ person }: { person: Person }) {
  return (
    <li>
      {person.photoSrc ? (
        <Image
          src={person.photoSrc}
          alt={person.name}
          width={480}
          height={600}
          className="aspect-[4/5] w-full rounded-md object-cover"
        />
      ) : (
        <div className="aspect-[4/5] w-full rounded-md bg-navy-50" aria-hidden="true" />
      )}
      <h3 className="mt-4 text-lg font-semibold text-navy">{person.name}</h3>
      <p className="text-muted">{person.role}</p>
      {person.bio ? <p className="mt-2 text-sm leading-relaxed text-muted">{person.bio}</p> : null}
    </li>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="pt-20 sm:pt-28">
        <Container>
          <h1 className="font-semibold tracking-tight text-5xl text-navy sm:text-6xl">About Us</h1>
          <nav aria-label="About Us sections" className="mt-10 border-b border-line">
            <ul className="-mb-px flex gap-8 overflow-x-auto">
              {sections.map((s) => (
                <li key={s.id} className="shrink-0">
                  <a
                    href={`#${s.id}`}
                    className="inline-block border-b-2 border-transparent py-3 text-[15px] font-medium text-muted transition-colors hover:border-navy hover:text-navy"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <section id="overview" className="scroll-mt-20 py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading title={overview.title} />
            <p className="mt-3 text-lg font-medium text-navy-600">{overview.lead}</p>
          </Reveal>
          <Reveal delay={120}>
            {overview.paragraphs.map((p) => (
              <p key={p} className="mb-5 text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {overview.pillars.map((item) => (
                <li key={item.title} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                  <span className="w-32 shrink-0 text-lg font-semibold text-navy">{item.title}</span>
                  <span className="text-lg text-muted">{item.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section id="history" className="scroll-mt-20 bg-mist py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading title="History" />
          </Reveal>
          <ol className="mt-12 border-l border-navy/20">
            {history.map((m, i) => (
              <li key={i} className="relative pb-10 pl-8 last:pb-0">
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-navy" aria-hidden="true" />
                <p className="text-xl font-semibold text-navy">{m.year}</p>
                <p className="mt-1 text-lg text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="board" className="scroll-mt-20 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading title="Board of Directors" />
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-3 lg:gap-10">
            {board.map((p, i) => (
              <PersonCard key={i} person={p} />
            ))}
          </ul>
        </Container>
      </section>

      <section id="team" className="scroll-mt-20 border-t border-line py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading title="Team" />
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {team.map((p, i) => (
              <PersonCard key={i} person={p} />
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
