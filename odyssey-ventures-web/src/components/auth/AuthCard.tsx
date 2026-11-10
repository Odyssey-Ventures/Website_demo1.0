import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/** Centered card shared by the sign-in, sign-up and password pages. */
export function AuthCard({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="bg-mist py-16 sm:py-24">
      <Container className="max-w-md">
        <div className="rounded-lg border border-line bg-white p-7 shadow-card sm:p-9">
          <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-brand-green" />
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-navy">{title}</h1>
          {description ? <p className="mt-3 leading-relaxed text-muted">{description}</p> : null}
          <div className="mt-7">{children}</div>
        </div>
      </Container>
    </section>
  );
}

/** Same-site paths only, so an auth link cannot be used to send people to another site. */
export function safeNextPath(value: string | undefined, fallback: string): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}
