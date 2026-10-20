import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/config/images";

/**
 * Source: the live site's company description (translated from Korean).
 * Keep these statements factual and verified; do not add numbers or names here.
 */
const experience = [
  "Varied business experience in global markets",
  "Product experience in Silicon Valley",
  "Experience founding a startup that listed on Nasdaq",
  "Experience running Silicon Valley training programs and startup mentoring and consulting",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Image
            src={images.instructors.src}
            alt={images.instructors.alt}
            width={images.instructors.width}
            height={images.instructors.height}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/3] w-full rounded-md object-cover"
          />
        </Reveal>

        <Reveal delay={120}>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Led by experts from Silicon Valley
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Our instructors and mentors bring experience from global markets and Silicon Valley, and have worked on the
            problems your team is facing now.
          </p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {experience.map((item) => (
              <li key={item} className="py-4 text-lg leading-snug">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
