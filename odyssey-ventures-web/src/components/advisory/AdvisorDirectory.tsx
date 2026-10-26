"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AdvisorAvatar } from "@/components/advisory/AdvisorAvatar";
import { advisorAreas, type AdvisorArea, type AdvisorProfile } from "@/data/advisor-profiles";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

/** What a card needs; the page passes only this, so full bios stay out of the browser bundle. */
export type AdvisorCard = Pick<AdvisorProfile, "slug" | "name" | "nameKo" | "title" | "org" | "areas" | "specialties">;

/** Area tabs, a search box and one card per advisor, each linking to the advisor's page. */
export function AdvisorDirectory({ lang, dict, advisors: all }: { lang: Locale; dict: Dictionary["advisors"]; advisors: readonly AdvisorCard[] }) {
  const [area, setArea] = useState<AdvisorArea | "all">("all");
  const [query, setQuery] = useState("");

  const advisors = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return all.filter((advisor) => {
      if (area !== "all" && !advisor.areas.includes(area)) return false;
      const text = [advisor.name, advisor.nameKo, advisor.title, advisor.org, advisor.specialties].join(" ").toLowerCase();
      return words.every((word) => text.includes(word));
    });
  }, [all, area, query]);

  const tabClass = (active: boolean) =>
    cn(
      "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
      active ? "border-navy bg-navy text-white" : "border-line bg-white text-muted hover:border-navy hover:text-navy"
    );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="block sm:w-96">
          <span className="sr-only">{dict.searchPlaceholder}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.searchPlaceholder}
            className="w-full rounded-lg border border-line bg-white px-4 py-3 text-base text-navy shadow-card placeholder:text-muted/70 focus:border-brand-blue"
          />
        </label>
        <p className="text-sm text-muted" aria-live="polite">
          {dict.count.replace("{count}", String(advisors.length))}
        </p>
      </div>

      <div role="tablist" aria-label={dict.title} className="mt-6 flex gap-2 overflow-x-auto pb-1">
        <button type="button" role="tab" aria-selected={area === "all"} className={tabClass(area === "all")} onClick={() => setArea("all")}>
          {dict.all}
        </button>
        {advisorAreas.map((key) => (
          <button key={key} type="button" role="tab" aria-selected={area === key} className={tabClass(area === key)} onClick={() => setArea(key)}>
            {dict.areas[key]}
          </button>
        ))}
      </div>

      {advisors.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-navy/25 p-8 text-center text-muted">{dict.empty}</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advisors.map((advisor) => (
            <li key={advisor.slug}>
              <Link
                href={localizedHref(lang, `/advisory/${advisor.slug}`)}
                className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 shadow-card transition-colors hover:border-brand-blue"
              >
                <span className="flex items-center gap-4">
                  <AdvisorAvatar name={advisor.name} />
                  <span className="min-w-0">
                    <span className="block text-lg font-semibold leading-snug text-navy group-hover:text-brand-blue">
                      {advisor.name}
                      {advisor.nameKo ? <span className="ml-1.5 text-base font-normal text-muted">{advisor.nameKo}</span> : null}
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-muted">
                      {[advisor.title, advisor.org].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                </span>
                <span className="mt-4 line-clamp-2 text-sm leading-relaxed text-navy">{advisor.specialties}</span>
                <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {advisor.areas.map((key) => (
                    <span key={key} className="rounded bg-brand-blue-tint px-2 py-0.5 text-xs font-medium text-brand-blue-dark">
                      {dict.areas[key]}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
