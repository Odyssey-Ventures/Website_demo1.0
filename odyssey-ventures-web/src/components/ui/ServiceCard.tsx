import Link from "next/link";
import type { ReactNode } from "react";

interface ServiceCardProps {
  index: number;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  /** Replace the default image area with a photo or icon when one is available. */
  media?: ReactNode;
}

export function ServiceCard({ index, title, description, linkLabel, href, media }: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-card-hover">
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-navy-700 to-navy-950">
        {media ?? (
          <span aria-hidden="true" className="absolute bottom-4 left-6 text-5xl font-semibold tracking-tight text-white/25">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand-green transition-transform duration-500 group-hover:scale-x-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-7 lg:p-8">
        <h3 className="text-2xl font-semibold tracking-tight text-navy">{title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{description}</p>
        <div className="mt-auto pt-8">
          <Link
            href={href}
            className="inline-flex items-center gap-2 font-medium text-brand-blue transition-colors duration-200 hover:text-brand-blue-dark"
          >
            {linkLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
