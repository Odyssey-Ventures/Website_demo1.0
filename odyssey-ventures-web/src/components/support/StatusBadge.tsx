import type { SupportStatus } from "@/lib/support-shared";
import { cn } from "@/lib/utils";

const styles: Record<SupportStatus, string> = {
  open: "bg-amber-100 text-amber-900",
  answered: "bg-brand-green/30 text-navy",
  closed: "bg-mist text-muted",
};

export function StatusBadge({ status, label }: { status: SupportStatus; label: string }) {
  return <span className={cn("inline-block whitespace-nowrap rounded px-2 py-1 text-xs font-semibold", styles[status])}>{label}</span>;
}
