import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/home/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line bg-mist py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading title="Tell us about your U.S. expansion plans">
            Share where your company is today and what you need. We will reply by email.
          </SectionHeading>

          <dl className="mt-10 space-y-5">
            <div>
              <dt className="text-sm font-medium text-muted">Email</dt>
              <dd className="mt-1 text-lg">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="border-b border-navy pb-0.5 text-navy transition-colors hover:border-navy-600 hover:text-navy-600"
                >
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted">Location</dt>
              <dd className="mt-1 text-lg text-navy">{siteConfig.location}</dd>
            </div>
          </dl>
        </div>

        <Reveal className="lg:col-span-7" delay={120}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
