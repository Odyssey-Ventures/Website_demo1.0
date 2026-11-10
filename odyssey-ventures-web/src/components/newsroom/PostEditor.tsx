"use client";

import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Field, fieldClass } from "@/components/forms/FormParts";
import { Button } from "@/components/ui/Button";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { NewsPost } from "@/lib/newsroom";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface PostEditorProps {
  lang: Locale;
  dict: Dictionary["newsPage"]["editor"];
  /** Present when editing an existing post. */
  post?: NewsPost;
}

const IMAGE_BUCKET = "news-images";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const IMAGE_TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };

/** Staff-only post form. The database and Storage also refuse writes from anyone who is not staff. */
export function PostEditor({ lang, dict, post }: PostEditorProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(post?.cover_image_url ?? null);
  const [uploading, setUploading] = useState(false);

  async function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const ext = IMAGE_TYPES[file.type];
    if (!ext || file.size > MAX_IMAGE_BYTES) {
      setError(dict.imageTooLarge);
      return;
    }
    setError(null);
    setUploading(true);
    const supabase = getSupabaseBrowserClient();
    const path = `posts/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, { contentType: file.type, upsert: false });
    setUploading(false);
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    setCoverUrl(supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      title: String(data.get("title") ?? "").trim(),
      slug: String(data.get("slug") ?? "").trim().toLowerCase(),
      summary: String(data.get("summary") ?? "").trim(),
      body: String(data.get("body") ?? "").trim(),
      external_url: String(data.get("external_url") ?? "").trim() || null,
      published: data.get("published") === "on",
      // Sent only when an image is involved, so saving still works before migration 0006 adds the column.
      ...(coverUrl || post?.cover_image_url ? { cover_image_url: coverUrl } : {}),
    };
    setStatus("saving");
    setError(null);
    const supabase = getSupabaseBrowserClient();
    const result = post
      ? await supabase.from("news_posts").update(values).eq("id", post.id)
      : await supabase.from("news_posts").insert(values); // author_email is filled in by the database
    setStatus("idle");
    if (result.error) {
      setError(result.error.message);
      return;
    }
    router.push(localizedHref(lang, "/admin/news"));
    router.refresh();
  }

  async function handleDelete() {
    if (!post || !window.confirm(dict.confirmDelete)) return;
    const { error: deleteError } = await getSupabaseBrowserClient().from("news_posts").delete().eq("id", post.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    router.push(localizedHref(lang, "/admin/news"));
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-5">
        <Field label={dict.title}>
          <input name="title" required maxLength={200} defaultValue={post?.title} className={fieldClass} />
        </Field>
        <Field label={dict.slug}>
          <input
            name="slug"
            required
            maxLength={80}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            defaultValue={post?.slug}
            className={fieldClass}
          />
          <span className="mt-1 block text-xs font-normal text-muted">{dict.slugHint}</span>
        </Field>
        <Field label={dict.summary}>
          <input name="summary" maxLength={500} defaultValue={post?.summary} className={fieldClass} />
        </Field>
        <Field label={dict.body}>
          <textarea name="body" rows={14} maxLength={50000} defaultValue={post?.body} className={fieldClass} />
          <span className="mt-1 block text-xs font-normal text-muted">{dict.bodyHint}</span>
        </Field>
        <Field label={dict.coverImage}>
          {coverUrl ? (
            <span className="mb-3 flex items-end gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- uploaded images live on Supabase Storage */}
              <img src={coverUrl} alt="" className="h-32 w-48 rounded-md border border-line object-cover" />
              <button type="button" onClick={() => setCoverUrl(null)} className="text-sm font-medium text-red-700 hover:underline">
                {dict.removeImage}
              </button>
            </span>
          ) : null}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImage}
            disabled={uploading}
            className="block w-full text-sm text-muted file:mr-4 file:rounded-md file:border-0 file:bg-navy-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-navy hover:file:bg-navy-100"
          />
          {uploading ? <span className="mt-1 block text-xs font-normal text-muted">{dict.uploading}</span> : null}
        </Field>
        <Field label={dict.externalUrl}>
          <input name="external_url" type="url" pattern="https://.*" defaultValue={post?.external_url ?? ""} className={fieldClass} />
        </Field>
        <label className="flex items-center gap-3 text-sm font-medium text-navy">
          <input name="published" type="checkbox" defaultChecked={post?.published ?? true} className="h-4 w-4" />
          {dict.published}
        </label>
      </div>

      {error ? (
        <p className="mt-5 text-sm text-red-700" role="alert">
          {dict.error} {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <Button type="submit" disabled={status === "saving" || uploading}>
          {status === "saving" ? dict.saving : dict.save}
        </Button>
        {post ? (
          <button type="button" onClick={handleDelete} className="text-sm font-medium text-red-700 hover:underline">
            {dict.delete}
          </button>
        ) : null}
      </div>
    </form>
  );
}
