import { advisorInitials } from "@/data/advisor-profiles";
import { cn } from "@/lib/utils";

/** Initials in a circle, as in the advisor brochure (no photos). */
export function AdvisorAvatar({ name, size = "md", className }: { name: string; size?: "md" | "lg"; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-navy font-semibold tracking-wide text-white",
        size === "lg" ? "h-20 w-20 text-2xl sm:h-24 sm:w-24 sm:text-3xl" : "h-12 w-12 text-base",
        className
      )}
    >
      {advisorInitials(name)}
    </span>
  );
}
