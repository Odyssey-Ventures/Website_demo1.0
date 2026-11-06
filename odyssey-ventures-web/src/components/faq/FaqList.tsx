"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

type FaqDict = Dictionary["faqPage"];
type CategoryKey = keyof FaqDict["categories"];

/** Category tabs, a search box and one accordion per question. */
export function FaqList({ dict }: { dict: FaqDict }) {
  const [category, setCategory] = useState<CategoryKey | "all">("all");
  const [query, setQuery] = useState("");
  const categories = Object.keys(dict.categories) as CategoryKey[];

  const items = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return dict.items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      const text = `${item.q} ${item.a}`.toLowerCase();
      return words.every((word) => text.includes(word));
    });
  }, [dict.items, category, query]);

  const tabClass = (active: boolean) =>
    cn(
      "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
      active ? "border-navy bg-navy text-white" : "border-line bg-white text-muted hover:border-navy hover:text-navy"
    );

  return (
    <div>
      <label className="block">
        <span className="sr-only">{dict.searchPlaceholder}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={dict.searchPlaceholder}
          className="w-full rounded-lg border border-line bg-white px-5 py-4 text-lg text-navy shadow-card placeholder:text-muted/70 focus:border-brand-blue"
        />
      </label>

      <div role="tablist" aria-label={dict.title} className="mt-6 flex gap-2 overflow-x-auto pb-1">
        <button type="button" role="tab" aria-selected={category === "all"} className={tabClass(category === "all")} onClick={() => setCategory("all")}>
          {dict.all}
        </button>
        {categories.map((key) => (
          <button key={key} type="button" role="tab" aria-selected={category === key} className={tabClass(category === key)} onClick={() => setCategory(key)}>
            {dict.categories[key]}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-navy/25 p-8 text-center text-muted">{dict.empty}</p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {items.map((item) => (
            <li key={item.q}>
              <details className="group py-1">
                <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
                  <span aria-hidden="true" className="mt-0.5 text-lg font-semibold text-brand-blue">
                    Q
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs font-semibold uppercase tracking-widest text-muted">{dict.categories[item.category as CategoryKey]}</span>
                    <span className="mt-1 block text-lg font-semibold text-navy">{item.q}</span>
                  </span>
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mt-1 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <div className="mb-5 ml-8 rounded-md bg-mist px-5 py-4 leading-relaxed text-navy">{item.a}</div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
