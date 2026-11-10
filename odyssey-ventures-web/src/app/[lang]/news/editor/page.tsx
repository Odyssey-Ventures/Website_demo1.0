import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditorParams {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ slug?: string }>;
}

/** The post editor moved to the admin area. Old links keep working. */
export default async function NewsEditorPage({ params, searchParams }: EditorParams) {
  const { lang } = await params;
  const { slug } = await searchParams;
  redirect(`/${lang}/admin/news/edit${slug ? `?slug=${encodeURIComponent(slug)}` : ""}`);
}
