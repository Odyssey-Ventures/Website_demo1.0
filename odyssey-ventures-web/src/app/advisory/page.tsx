import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = {
  title: "Advisory",
  description: "One-on-one advisory on U.S. market entry, go-to-market strategy and fundraising from Odyssey Ventures.",
};

export default function AdvisoryPage() {
  return <PlaceholderPage slug="advisory" />;
}
