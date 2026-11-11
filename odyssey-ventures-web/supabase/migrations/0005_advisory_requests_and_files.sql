-- Odyssey Ventures: Startup Advisory requests with attachments (business plan, pitch deck, other documents).
-- Anyone can send a request and upload up to 3 files for it; nobody but staff can read, list, change or delete them.
-- Files live in the private Storage bucket "advisory-files" under requests/<request id>/. There are no public URLs:
-- staff open files through short-lived signed links on the admin page (/admin/advisory).

create table if not exists public.advisory_requests (
  id uuid primary key,
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254 and email like '%_@_%'),
  company text not null default '' check (char_length(company) <= 160),
  stage text not null default '' check (char_length(stage) <= 40),
  field text not null default '' check (char_length(field) <= 40),
  preferred_expert text not null default '' check (char_length(preferred_expert) <= 160),
  schedule text not null default '' check (char_length(schedule) <= 500),
  request text not null check (char_length(request) between 1 and 5000),
  lang text not null default '' check (char_length(lang) <= 5),
  -- [{ "path": "requests/<id>/1-deck.pdf", "name": "deck.pdf", "size": 123456, "type": "application/pdf" }]
  attachments jsonb not null default '[]'::jsonb check (jsonb_typeof(attachments) = 'array' and jsonb_array_length(attachments) <= 3),
  status text not null default 'new' check (status in ('new', 'matching', 'scheduled', 'done', 'canceled')),
  memo text not null default '' check (char_length(memo) <= 5000),
  created_at timestamptz not null default now()
);

create index if not exists advisory_requests_created_idx on public.advisory_requests (created_at desc);

alter table public.advisory_requests enable row level security;

drop policy if exists "advisory requests: anyone can send" on public.advisory_requests;
create policy "advisory requests: anyone can send" on public.advisory_requests for insert
  to anon, authenticated
  with check (status = 'new' and memo = '');

drop policy if exists "advisory requests: staff read" on public.advisory_requests;
create policy "advisory requests: staff read" on public.advisory_requests for select
  to authenticated using (public.is_staff());

drop policy if exists "advisory requests: staff update" on public.advisory_requests;
create policy "advisory requests: staff update" on public.advisory_requests for update
  to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "advisory requests: staff delete" on public.advisory_requests;
create policy "advisory requests: staff delete" on public.advisory_requests for delete
  to authenticated using (public.is_staff());

revoke all on public.advisory_requests from anon, authenticated;
grant insert on public.advisory_requests to anon, authenticated;
grant select, update, delete on public.advisory_requests to authenticated;

-- Private bucket: 20 MB per file, documents only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'advisory-files', 'advisory-files', false, 20971520,
  array[
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
)
on conflict (id) do update
  set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

-- Visitors may only add new files under requests/<uuid>/. Without select/update policies they cannot
-- list, read or overwrite anything, including their own upload.
drop policy if exists "advisory files: anyone can upload" on storage.objects;
create policy "advisory files: anyone can upload" on storage.objects for insert
  to anon, authenticated
  with check (
    bucket_id = 'advisory-files'
    and (storage.foldername(name))[1] = 'requests'
    and (storage.foldername(name))[2] ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    and array_length(storage.foldername(name), 1) = 2
  );

drop policy if exists "advisory files: staff read" on storage.objects;
create policy "advisory files: staff read" on storage.objects for select
  to authenticated using (bucket_id = 'advisory-files' and public.is_staff());

drop policy if exists "advisory files: staff delete" on storage.objects;
create policy "advisory files: staff delete" on storage.objects for delete
  to authenticated using (bucket_id = 'advisory-files' and public.is_staff());
