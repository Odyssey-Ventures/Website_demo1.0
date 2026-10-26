const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;

/** Language-independent settings. Text shown to visitors lives in src/messages/*.json. */
export const siteConfig = {
  name: "Odyssey Ventures",
  // Falls back to the Vercel preview URL, then localhost. The live domain is never hard-coded.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000",
  email: "contact@odysseyventures.llc",
  location: "Silicon Valley, California",
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
} as const;
