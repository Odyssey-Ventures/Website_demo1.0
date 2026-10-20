import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = {
  title: "Academy",
  description: "Startup education, U.S. market entry workshops and entrepreneurship training from Odyssey Ventures.",
};

export default function AcademyPage() {
  return <PlaceholderPage slug="academy" />;
}
