import { notFound } from "next/navigation";

/** Any unknown path under /en or /ko lands here so the language-aware 404 page is used. */
export default function UnknownPage(): never {
  notFound();
}
