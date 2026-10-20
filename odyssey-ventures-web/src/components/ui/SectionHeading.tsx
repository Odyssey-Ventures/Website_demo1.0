import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  children?: ReactNode;
  inverse?: boolean;
  className?: string;
}

export function SectionHeading({ title, children, inverse, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2
        className={cn(
          "font-semibold tracking-tight text-3xl leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]",
          inverse ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      {children ? (
        <p className={cn("mt-4 text-lg leading-relaxed", inverse ? "text-navy-100" : "text-muted")}>{children}</p>
      ) : null}
    </div>
  );
}
