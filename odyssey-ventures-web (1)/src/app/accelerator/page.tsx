import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = {
  title: "Accelerator",
  description: "U.S. market entry acceleration, mentorship, investor connections and growth support for startups.",
};

export default function AcceleratorPage() {
  return <PlaceholderPage slug="accelerator" />;
}
