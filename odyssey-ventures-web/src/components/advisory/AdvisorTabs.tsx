"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tab = "profile" | "meeting";

interface AdvisorTabsProps {
  label: string;
  labels: Record<Tab, string>;
  profile: ReactNode;
  meeting: ReactNode;
}

/** Profile and meeting-request tabs. "#meeting" in the address (or a link to it) opens the request tab. */
export function AdvisorTabs({ label, labels, profile, meeting }: AdvisorTabsProps) {
  const [tab, setTab] = useState<Tab>("profile");

  useEffect(() => {
    const sync = () => setTab(window.location.hash === "#meeting" ? "meeting" : "profile");
    const onHashChange = () => {
      sync();
      document.getElementById("advisor-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    sync();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const select = (next: Tab) => {
    setTab(next);
    history.replaceState(null, "", next === "meeting" ? "#meeting" : window.location.pathname + window.location.search);
  };

  const tabs: Tab[] = ["profile", "meeting"];

  return (
    <div>
      <div id="advisor-tabs" role="tablist" aria-label={label} className="flex scroll-mt-24 border-b border-line">
        {tabs.map((key) => (
          <button
            key={key}
            id={`tab-${key}`}
            type="button"
            role="tab"
            aria-selected={tab === key}
            aria-controls={`panel-${key}`}
            onClick={() => select(key)}
            className={cn(
              "-mb-px border-b-2 px-5 py-3 text-base font-medium transition-colors",
              tab === key ? "border-brand-blue text-navy" : "border-transparent text-muted hover:text-navy"
            )}
          >
            {labels[key]}
          </button>
        ))}
      </div>
      <div id="panel-profile" role="tabpanel" aria-labelledby="tab-profile" hidden={tab !== "profile"} className="pt-8">
        {profile}
      </div>
      <div id="panel-meeting" role="tabpanel" aria-labelledby="tab-meeting" hidden={tab !== "meeting"} className="pt-8">
        {meeting}
      </div>
    </div>
  );
}
