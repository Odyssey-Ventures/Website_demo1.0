-- Odyssey Ventures: membership tier of each signed-in person.
-- Rows are written only by the Stripe webhook (/api/stripe/webhook) with the service_role key.
-- A person can read their own row; staff can read all. No one can change a row from the browser.

create table if not exists public.memberships (
  user_id uuid primary key references auth.users (id) on delete cascade,
  tier text not null default 'free' check (tier in ('free', 'basic', 'pro', 'enterprise')),
  status text not null default 'active' check (status in ('active', 'past_due', 'canceled')),
  stripe_customer_id text,
  stripe_subscription_id text unique,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

drop trigger if exists memberships_touch on public.memberships;
create trigger memberships_touch before update on public.memberships
  for each row execute function public.touch_updated_at();

alter table public.memberships enable row level security;

drop policy if exists "memberships: read own or staff" on public.memberships;
create policy "memberships: read own or staff" on public.memberships for select
  to authenticated
  using ((select auth.uid()) = user_id or public.is_staff());

revoke all on public.memberships from anon, authenticated;
grant select on public.memberships to authenticated;
