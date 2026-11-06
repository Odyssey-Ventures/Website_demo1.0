"use client";

import { useEffect, useRef, useState } from "react";
import { advisorInitials, type AdvisorProfile } from "@/data/advisor-profiles";
import { cn } from "@/lib/utils";

/** Icons smaller than this (in px) are too blurry to show; the initials are used instead. */
const MIN_LOGO_SIZE = 32;

interface LogoSource {
  src: string;
  /** Site icons are checked for size; a logo file is shown as it is. */
  isIcon: boolean;
}

/** Logo sources in the order they are tried: the logo file, then two site-icon services. */
function logoSources(advisor: Pick<AdvisorProfile, "logo" | "logoDomain">): LogoSource[] {
  const sources: LogoSource[] = [];
  if (advisor.logo) sources.push({ src: advisor.logo, isIcon: false });
  if (advisor.logoDomain) {
    sources.push({ src: `https://www.google.com/s2/favicons?domain=${advisor.logoDomain}&sz=128`, isIcon: true });
    sources.push({ src: `https://icons.duckduckgo.com/ip3/${advisor.logoDomain}.ico`, isIcon: true });
  }
  return sources;
}

/** The advisor's company or affiliation logo, or initials in a circle when there is none. */
export function AdvisorAvatar({
  advisor,
  size = "md",
  className,
}: {
  advisor: Pick<AdvisorProfile, "name" | "org" | "logo" | "logoDomain">;
  size?: "md" | "lg";
  className?: string;
}) {
  const sources = logoSources(advisor);
  const [index, setIndex] = useState(0);
  const source = sources[index];
  const imgRef = useRef<HTMLImageElement>(null);

  const next = () => setIndex((current) => current + 1);
  const checkSize = (img: HTMLImageElement) => {
    if (img.naturalWidth === 0 || (source?.isIcon && img.naturalWidth < MIN_LOGO_SIZE)) next();
  };

  // The image can finish (or fail) before hydration, when onLoad/onError are not yet attached.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) checkSize(img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
  const sizeClass = size === "lg" ? "h-20 w-20 sm:h-24 sm:w-24" : "h-12 w-12";

  if (source) {
    return (
      <span
        className={cn(
          "flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-white",
          size === "lg" ? "p-4" : "p-2",
          sizeClass,
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={source.src}
          ref={imgRef}
          src={source.src}
          alt={advisor.org}
          loading="lazy"
          className="h-full w-full object-contain"
          onError={next}
          onLoad={(e) => checkSize(e.currentTarget)}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-navy font-semibold tracking-wide text-white",
        size === "lg" ? "text-2xl sm:text-3xl" : "text-base",
        sizeClass,
        className
      )}
    >
      {advisorInitials(advisor.name)}
    </span>
  );
}
