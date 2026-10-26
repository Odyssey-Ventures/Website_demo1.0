-- Odyssey Ventures: Newsroom (staff posts + comments) and Customer Support (private questions).
-- Run once in Supabase → SQL Editor. Safe to read top to bottom; every rule is enforced by the database,
-- so the website cannot show or change anything these policies do not allow.

create extension if not exists pgcrypto;

-- Staff = someone signed in with a verified @odysseyventures.llc email (sign-in is by emailed link,
-- so owning the mailbox is proven). Change the domain here if the company domain changes.
create or replace function public.is_staff() returns boolean
language sql stable
as $$
  select coalesce(lower(auth.jwt() ->> 'email') like '%@odysseyventures.llc', false)
$$;

create or replace function public.touch_updated_at() returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end
$$;

-- ---------------------------------------------------------------------------
-- Newsroom
-- ---------------------------------------------------------------------------

create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) <= 80 and slug <> 'editor'),
  title text not null check (length(title) between 1 and 200),
  summary text not null default '' check (length(summary) <= 500),
  body text not null default '' check (length(body) <= 50000),
  external_url text check (external_url is null or external_url ~ '^https://'),
  published boolean not null default true,
  author_email text not null default (auth.jwt() ->> 'email'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.news_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.news_posts (id) on delete cascade,
  author_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  author_name text not null check (length(author_name) between 1 and 50),
  body text not null check (length(body) between 1 and 2000),
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists news_comments_post_idx on public.news_comments (post_id, created_at);

drop trigger if exists news_posts_touch on public.news_posts;
create trigger news_posts_touch before update on public.news_posts
  for each row execute function public.touch_updated_at();

alter table public.news_posts enable row level security;
alter table public.news_comments enable row level security;

-- Everyone reads published posts; staff also see drafts. Only staff write.
drop policy if exists "posts: read" on public.news_posts;
create policy "posts: read" on public.news_posts for select using (published or public.is_staff());
drop policy if exists "posts: staff insert" on public.news_posts;
create policy "posts: staff insert" on public.news_posts for insert with check (public.is_staff() and author_email = (auth.jwt() ->> 'email'));
drop policy if exists "posts: staff update" on public.news_posts;
create policy "posts: staff update" on public.news_posts for update using (public.is_staff()) with check (public.is_staff());
drop policy if exists "posts: staff delete" on public.news_posts;
create policy "posts: staff delete" on public.news_posts for delete using (public.is_staff());

-- Visible comments on published posts are public. Hidden ones only to staff and their author.
drop policy if exists "comments: read" on public.news_comments;
create policy "comments: read" on public.news_comments for select using (
  public.is_staff()
  or author_id = auth.uid()
  or (not hidden and exists (select 1 from public.news_posts p where p.id = post_id and p.published))
);
-- Any signed-in person may comment on a published post, as themselves, never pre-hidden.
drop policy if exists "comments: insert own" on public.news_comments;
create policy "comments: insert own" on public.news_comments for insert with check (
  auth.uid() is not null
  and author_id = auth.uid()
  and not hidden
  and exists (select 1 from public.news_posts p where p.id = post_id and p.published)
);
-- Moderation: only staff hide or unhide. Authors may delete their own comment.
drop policy if exists "comments: staff update" on public.news_comments;
create policy "comments: staff update" on public.news_comments for update using (public.is_staff()) with check (public.is_staff());
drop policy if exists "comments: delete" on public.news_comments;
create policy "comments: delete" on public.news_comments for delete using (public.is_staff() or author_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Customer Support (private questions)
-- ---------------------------------------------------------------------------

create table if not exists public.support_questions (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  author_email text not null default (auth.jwt() ->> 'email'),
  category text not null default 'general'
    check (category in ('general', 'academy', 'advisory', 'accelerator', 'consulting', 'membership', 'payment', 'other')),
  title text not null check (length(title) between 1 and 150),
  body text not null check (length(body) between 1 and 5000),
  status text not null default 'open' check (status in ('open', 'answered', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists support_questions_created_idx on public.support_questions (created_at desc);

create table if not exists public.support_replies (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.support_questions (id) on delete cascade,
  author_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  author_email text not null default (auth.jwt() ->> 'email'),
  from_staff boolean not null default false,
  body text not null check (length(body) between 1 and 5000),
  created_at timestamptz not null default now()
);
create index if not exists support_replies_question_idx on public.support_replies (question_id, created_at);

drop trigger if exists support_questions_touch on public.support_questions;
create trigger support_questions_touch before update on public.support_questions
  for each row execute function public.touch_updated_at();

-- A reply is marked as staff by the database itself, never by what the browser sends.
create or replace function public.support_reply_mark_staff() returns trigger
language plpgsql
as $$
begin
  new.from_staff := public.is_staff();
  return new;
end
$$;
drop trigger if exists support_replies_mark_staff on public.support_replies;
create trigger support_replies_mark_staff before insert on public.support_replies
  for each row execute function public.support_reply_mark_staff();

-- A staff reply marks the question answered; a follow-up from the customer reopens it.
create or replace function public.support_reply_update_status() returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  update public.support_questions
     set status = case when new.from_staff then 'answered' else 'open' end
   where id = new.question_id and status <> 'closed';
  return new;
end
$$;
drop trigger if exists support_replies_status on public.support_replies;
create trigger support_replies_status after insert on public.support_replies
  for each row execute function public.support_reply_update_status();

alter table public.support_questions enable row level security;
alter table public.support_replies enable row level security;

-- A question is visible only to the person who asked it and to staff.
drop policy if exists "questions: read own or staff" on public.support_questions;
create policy "questions: read own or staff" on public.support_questions for select using (author_id = auth.uid() or public.is_staff());
drop policy if exists "questions: insert own" on public.support_questions;
create policy "questions: insert own" on public.support_questions for insert with check (
  author_id = auth.uid() and author_email = (auth.jwt() ->> 'email') and status = 'open'
);
drop policy if exists "questions: staff update" on public.support_questions;
create policy "questions: staff update" on public.support_questions for update using (public.is_staff()) with check (public.is_staff());
drop policy if exists "questions: staff delete" on public.support_questions;
create policy "questions: staff delete" on public.support_questions for delete using (public.is_staff());

drop policy if exists "replies: read" on public.support_replies;
create policy "replies: read" on public.support_replies for select using (
  public.is_staff() or exists (select 1 from public.support_questions q where q.id = question_id and q.author_id = auth.uid())
);
drop policy if exists "replies: insert" on public.support_replies;
create policy "replies: insert" on public.support_replies for insert with check (
  author_id = auth.uid()
  and author_email = (auth.jwt() ->> 'email')
  and (public.is_staff() or exists (select 1 from public.support_questions q where q.id = question_id and q.author_id = auth.uid() and q.status <> 'closed'))
);
drop policy if exists "replies: staff delete" on public.support_replies;
create policy "replies: staff delete" on public.support_replies for delete using (public.is_staff());

-- The public board shows every question as a row, but the title only to its author and staff.
create or replace function public.support_board(page_size int default 20, page_offset int default 0)
returns table (id uuid, category text, status text, created_at timestamptz, is_mine boolean, title text, total bigint)
language sql stable security definer set search_path = public
as $$
  select q.id,
         q.category,
         q.status,
         q.created_at,
         coalesce(q.author_id = auth.uid(), false),
         case when q.author_id = auth.uid() or public.is_staff() then q.title end,
         count(*) over ()
    from public.support_questions q
   order by q.created_at desc
   limit least(greatest(page_size, 1), 50)
  offset greatest(page_offset, 0)
$$;

-- ---------------------------------------------------------------------------
-- Privileges (row-level security above decides which rows)
-- ---------------------------------------------------------------------------

grant usage on schema public to anon, authenticated;
grant select on public.news_posts, public.news_comments to anon, authenticated;
grant insert, update, delete on public.news_posts, public.news_comments to authenticated;
grant select, insert, update, delete on public.support_questions, public.support_replies to authenticated;
revoke all on function public.support_board(int, int) from public;
grant execute on function public.support_board(int, int) to anon, authenticated;
grant execute on function public.is_staff() to anon, authenticated;
