import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent" | "inverse" | "outlineInverse";

interface ButtonProps {
  children: ReactNode;
  /** When provided, renders a link; otherwise a <button>. */
  href?: string;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
}

const base =
  "inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  /** Brand blue, for light backgrounds. */
  primary: "bg-brand-blue text-white hover:bg-brand-blue-dark",
  secondary: "border border-navy text-navy hover:bg-navy hover:text-white",
  /** Brand green, for dark backgrounds. */
  accent: "bg-brand-green text-navy hover:bg-white",
  inverse: "bg-white text-navy hover:bg-navy-100",
  outlineInverse: "border border-white text-white hover:bg-white hover:text-navy",
};

export function Button({ children, href, type = "button", variant = "primary", className }: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
