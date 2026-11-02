import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { impactMetrics } from "@/data/impact";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";
import type { ImpactMetric } from "@/types";

/**
 * "Our Impact": key figures with a count-up, from src/data/impact.ts.
 * Production shows verified figures only. Previews add the unverified ones in a separate, labeled row.
 * Figures are never summed: each one keeps its own label and basis.
 */
export function Impact({ lang, dict }: { lang: Locale; dict: Dictionary["impact"] }) {
  const verified = impactMetrics.filter((metric) => metric.verified);
  const pending = process.env.VERCEL_ENV === "production" ? [] : impactMetrics.filter((metric) => !metric.verified);
  if (verified.length === 0 && pending.length === 0) return null;

  return (
    <SectionContainer tone="navy">
      <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-brand-green">
          <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-brand-green" />
          {dict.title}
        </h2>
        <p className="text-sm text-navy-100/80">{dict.description}</p>
      </Reveal>

      {verified.length > 0 ? <MetricGrid metrics={verified} lang={lang} /> : null}

      {pending.length > 0 ? (
        <div className="mt-16 rounded-lg border border-dashed border-white/25 p-6 sm:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-200">{dict.pendingTitle}</h3>
          <p className="mt-2 text-sm text-navy-100">{dict.pendingNotice}</p>
          <MetricGrid metrics={pending} lang={lang} badge={dict.pendingBadge} compact />
        </div>
      ) : null}
    </SectionContainer>
  );
}

function MetricGrid({ metrics, lang, badge, compact }: { metrics: ImpactMetric[]; lang: Locale; badge?: string; compact?: boolean }) {
  const columns = metrics.length >= 4 ? "lg:grid-cols-4" : metrics.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-10", columns, compact ? "mt-8" : "mt-12")}>
      {metrics.map((metric, index) => {
        const suffix = typeof metric.suffix === "string" ? metric.suffix : metric.suffix?.[lang];
        return (
          <Reveal key={metric.id} delay={index * 100} className="flex flex-col border-l border-white/15 pl-5 sm:pl-6">
            <dt className="order-2 mt-3 leading-relaxed text-navy-100">
              {metric.label[lang]}
              {metric.basis ? <span className="mt-1 block text-xs text-navy-100/70">{metric.basis[lang]}</span> : null}
              {badge ? (
                <span className="mt-2 inline-block rounded bg-amber-200/15 px-2 py-0.5 text-xs font-medium text-amber-200">{badge}</span>
              ) : null}
            </dt>
            <dd className="order-1 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <CountUp value={metric.value} animate={metric.animate} locale={lang === "ko" ? "ko-KR" : "en-US"} />
              {suffix ? (
                <span className={/^[+%×x]$/.test(suffix.trim()) ? "text-brand-green" : "ml-1 text-[0.45em] font-medium text-navy-100"}>
                  {suffix}
                </span>
              ) : null}
            </dd>
          </Reveal>
        );
      })}
    </dl>
  );
}
