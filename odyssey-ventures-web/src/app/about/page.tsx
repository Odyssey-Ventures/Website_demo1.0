import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { contactHref } from "@/config/navigation";

export const metadata: Metadata = {
  title: "About Us",
  description: "Odyssey Ventures is a Silicon Valley-based education, consulting and startup accelerator company.",
};

const highlights = ["Academy: education for global markets", "Accelerator: structured support for entering the U.S.", "Advisory: direct guidance from experts"];

// Temporary page body until the full About Us page is designed.
export default function AboutPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <h1 className="font-semibold tracking-tight text-5xl text-navy sm:text-6xl">About Us</h1>
          <p className="mt-3 text-lg font-medium text-navy-600">Helping startups expand into the U.S.</p>
          <p className="mt-6 text-xl leading-relaxed text-muted">
            Odyssey Ventures is a Silicon Valley-based education, consulting and startup accelerator company. We help
            startups and businesses build the product, fundraising and sales capabilities they need to succeed in global
            markets.
          </p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {highlights.map((item) => (
              <li key={item} className="py-4 text-lg text-navy">
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-10 rounded-md border border-dashed border-navy/30 p-5 text-muted">
            The full About Us page is the next build step. In the meantime, send us an inquiry and we will reply by
            email.
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
