"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

interface ProgramPaymentProps {
  programId: string;
  price?: string;
  paymentUrl: string;
  dict: Dictionary["academyPage"]["payment"];
}

/** Fee and "Pay" button for a paid program. Stripe links carry the program id; back from checkout, a thank-you note shows. */
export function ProgramPayment({ programId, price, paymentUrl, dict }: ProgramPaymentProps) {
  const [paid, setPaid] = useState(false);
  useEffect(() => {
    setPaid(new URLSearchParams(window.location.search).get("checkout") === "success");
  }, []);

  const link = new URL(paymentUrl);
  const isStripe = link.hostname.endsWith("stripe.com");
  if (isStripe) link.searchParams.set("client_reference_id", programId);
  const isTest = isStripe && link.pathname.startsWith("/test_");

  return (
    <div className="mt-8 border-t border-line pt-6">
      <h3 className="text-lg font-semibold text-navy">{dict.title}</h3>
      {paid ? (
        <p role="status" className="mt-3 rounded-md bg-brand-green/20 px-4 py-3 text-sm font-medium text-navy">
          {dict.success}
        </p>
      ) : (
        <>
          <p className="mt-2 text-sm leading-relaxed text-muted">{dict.description}</p>
          {price ? <p className="mt-4 text-2xl font-semibold tracking-tight text-navy">{price}</p> : null}
          <a
            href={link.toString()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-navy px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-brand-blue"
          >
            {dict.pay}
          </a>
          {isTest ? <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">{dict.testNotice}</p> : null}
        </>
      )}
    </div>
  );
}
