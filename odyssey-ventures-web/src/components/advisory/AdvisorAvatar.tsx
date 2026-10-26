"use client";

import { useEffect, useRef, useState } from "react";
import { advisorInitials, type AdvisorProfile } from "@/data/advisor-profiles";
import { cn } from "@/lib/utils";

/** Icons smaller than this (in px) are too blurry to show; the initials are used instead. */
const MIN_LOGO_SIZE = 32;

function logoSrc(advisor: Pick<AdvisorProfile, "logo" | "logoDomain">): string | undefined {
  if (advisor.logo) return advisor.logo;
  if (advisor.logoDomain) return `https://www.google.com/s2/favicons?domain=${advisor.logoDomain}&sz=128`;
  return undefined;
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
  const src = logoSrc(advisor);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const checkSize = (img: HTMLImageElement) => {
    if (img.naturalWidth === 0 || (!advisor.logo && img.naturalWidth < MIN_LOGO_SIZE)) setFailed(true);
  };

  // The image can finish (or fail) before hydration, when onLoad/onError are not yet attached.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) checkSize(img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sizeClass = size === "lg" ? "h-20 w-20 sm:h-24 sm:w-24" : "h-12 w-12";

  if (src && !failed) {
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
          ref={imgRef}
          src={src}
          alt={advisor.org}
          loading="lazy"
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
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
