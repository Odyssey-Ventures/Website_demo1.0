-- Odyssey Ventures: Newsroom cover images.
-- Public bucket "news-images" (anyone can view, so images load on the public Newsroom); only staff upload or remove.

alter table public.news_posts
  add column if not exists cover_image_url text
  check (cover_image_url is null or (cover_image_url ~ '^https://' and length(cover_image_url) <= 1000));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('news-images', 'news-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
  set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "news images: staff upload" on storage.objects;
create policy "news images: staff upload" on storage.objects for insert
  to authenticated with check (bucket_id = 'news-images' and public.is_staff());

drop policy if exists "news images: staff update" on storage.objects;
create policy "news images: staff update" on storage.objects for update
  to authenticated using (bucket_id = 'news-images' and public.is_staff()) with check (bucket_id = 'news-images' and public.is_staff());

drop policy if exists "news images: staff delete" on storage.objects;
create policy "news images: staff delete" on storage.objects for delete
  to authenticated using (bucket_id = 'news-images' and public.is_staff());
