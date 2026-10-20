import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { contactHref } from "@/config/navigation";
import { getService } from "@/data/services";
import type { ServiceSlug } from "@/types";

/**
 * Temporary page body for services whose full page is not built yet.
 * Replace usage in src/app/<service>/page.tsx when the real page is ready.
 */
export function PlaceholderPage({ slug }: { slug: ServiceSlug }) {
  const service = getService(slug);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <h1 className="font-semibold tracking-tight text-5xl tracking-tight text-navy sm:text-6xl">{service.name}</h1>
          <p className="mt-3 text-lg font-medium text-navy-600">{service.tagline}</p>
          <p className="mt-6 text-xl leading-relaxed text-muted">{service.summary}</p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {service.highlights.map((item) => (
              <li key={item} className="py-4 text-lg text-navy">
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-10 rounded-md border border-dashed border-navy/30 p-5 text-muted">
            The full {service.name} page is the next build step. In the meantime, send us an inquiry and we will reply
            by email.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={contactHref}>Contact us</Button>
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
