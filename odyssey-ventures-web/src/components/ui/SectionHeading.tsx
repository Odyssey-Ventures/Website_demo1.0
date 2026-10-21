import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  /** Small label above the title. */
  eyebrow?: string;
  children?: ReactNode;
  inverse?: boolean;
  /** "lg" is for page banners (h1). */
  size?: "md" | "lg";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  title,
  eyebrow,
  children,
  inverse,
  size = "md",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center gap-3 text-sm font-semibold uppercase tracking-widest",
            inverse ? "text-brand-green" : "text-brand-blue"
          )}
        >
          <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-brand-green" />
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          "font-semibold leading-tight tracking-tight",
          size === "lg" ? "text-4xl sm:text-5xl md:text-6xl" : "text-3xl sm:text-4xl md:text-[2.75rem]",
          eyebrow && "mt-4",
          inverse ? "text-white" : "text-navy"
        )}
      >
        {title}
      </Tag>
      {children ? (
        <p className={cn("mt-4 text-lg leading-relaxed", inverse ? "text-navy-100" : "text-muted")}>{children}</p>
      ) : null}
    </div>
  );
}
