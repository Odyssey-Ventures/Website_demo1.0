"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { fetchPaidCount } from "@/lib/program-registrations";

const REFRESH_MS = 20_000;

interface ProgramStatusProps {
  programId: string;
  capacity?: number;
  minParticipants?: number;
  dict: Dictionary["academyPage"]["status"];
  /** Receives the latest count, e.g. so the form can close when the session is full. */
  onCount?: (count: number) => void;
}

/** Live registration count against the minimum and the capacity, refreshed every 20 seconds. */
export function ProgramStatus({ programId, capacity, minParticipants, dict, onCount }: ProgramStatusProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const next = await fetchPaidCount(programId);
      if (!active || next === null) return;
      setCount(next);
      onCount?.(next);
    };
    load();
    const timer = window.setInterval(load, REFRESH_MS);
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener("focus", onFocus);
    };
  }, [programId, onCount]);

  const fill = (template: string, values: Record<string, number>) =>
    Object.entries(values).reduce((text, [key, value]) => text.replace(`{${key}}`, String(value)), template);

  const full = count !== null && capacity !== undefined && count >= capacity;
  const confirmed = count !== null && minParticipants !== undefined && count >= minParticipants;
  const goal = capacity ?? minParticipants;
  const percent = count !== null && goal ? Math.min(100, Math.round((count / goal) * 100)) : 0;
  const minPercent = capacity && minParticipants ? Math.min(100, (minParticipants / capacity) * 100) : undefined;

  return (
    <section aria-labelledby={`status-${programId}`} className="rounded-md border border-line bg-mist p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 id={`status-${programId}`} className="font-semibold text-navy">
          {dict.title}
        </h3>
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
          <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-brand-green motion-reduce:animate-none" />
          {dict.live}
        </span>
      </div>

      <p className="mt-3 text-3xl font-semibold tracking-tight text-navy" aria-live="polite">
        {count === null ? "–" : fill(dict.count, { count })}
        {capacity ? <span className="ml-1 text-base font-medium text-muted">/ {fill(dict.capacity, { capacity })}</span> : null}
      </p>

      {goal ? (
        <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-white" aria-hidden="true">
          <div className="h-full rounded-full bg-brand-blue transition-all duration-500" style={{ width: `${percent}%` }} />
          {minPercent !== undefined ? <span className="absolute inset-y-0 w-0.5 bg-navy/50" style={{ left: `${minPercent}%` }} /> : null}
        </div>
      ) : null}

      {minParticipants ? (
        <p className="mt-3 text-sm font-medium text-navy">
          {full
            ? dict.full
            : confirmed
              ? dict.confirmed
              : count === null
                ? fill(dict.minimum, { min: minParticipants })
                : fill(dict.recruiting, { min: minParticipants, left: minParticipants - count })}
        </p>
      ) : null}
      {minParticipants ? <p className="mt-2 text-sm leading-relaxed text-muted">{dict.refund}</p> : null}
    </section>
  );
}
