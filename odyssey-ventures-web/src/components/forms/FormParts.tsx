import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import type { SubmissionStatus } from "@/components/forms/useSubmission";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const fieldClass =
  "mt-2 w-full rounded-md border border-line bg-white px-4 py-3 text-base text-navy placeholder:text-muted/70 transition-colors focus:border-brand-blue";

export function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return <label className={cn("block text-sm font-medium text-navy", className)}>{label}{children}</label>;
}

/** Hidden from people; spam bots fill it in and their submission is dropped. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export interface StatusMessages {
  submit: string;
  sending: string;
  saved: string;
  emailFallback: string;
  error: string;
  idle?: string;
}

export function SubmitRow({ status, messages }: { status: SubmissionStatus; messages: StatusMessages }) {
  const text =
    status === "sending"
      ? messages.sending
      : status === "saved"
        ? messages.saved
        : status === "emailFallback"
          ? messages.emailFallback
          : status === "error"
            ? `${messages.error} ${siteConfig.email}`
            : messages.idle ?? "";
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button type="submit" disabled={status === "sending"}>{status === "sending" ? messages.sending : messages.submit}</Button>
      <p
        className={cn("text-sm", status === "saved" ? "font-medium text-navy" : status === "error" ? "text-red-700" : "text-muted")}
        role="status"
        aria-live="polite"
      >
        {text}
      </p>
    </div>
  );
}
