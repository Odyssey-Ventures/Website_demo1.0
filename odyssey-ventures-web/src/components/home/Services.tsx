import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-y border-line bg-mist py-20 sm:py-28">
      <Container>
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-navy-600">Our Service</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Academy, Accelerator and Advisory
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 100} className="h-full">
              <article className="group flex h-full flex-col rounded-md border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-navy/40 hover:shadow-lg lg:p-10">
                <h3 className="text-3xl font-semibold tracking-tight text-navy">{service.name}</h3>
                <p className="mt-1 text-sm font-medium text-navy-600">{service.tagline}</p>
                <p className="mt-5 leading-relaxed text-muted">{service.summary}</p>

                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-snug text-navy">
                      <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-navy-600" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="mt-8 inline-flex w-fit items-center border-b border-navy pb-0.5 font-medium text-navy transition-colors duration-200 hover:border-navy-600 hover:text-navy-600 lg:mt-auto"
                >
                  Learn more
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
