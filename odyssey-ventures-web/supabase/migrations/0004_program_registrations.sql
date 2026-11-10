-- Odyssey Ventures: Academy program (webinar, course) registrations.
-- Anyone can register (name, email, company); the row starts as 'pending'.
-- The Stripe webhook (/api/stripe/webhook, service_role key) marks it 'paid' after checkout.
-- Only staff can read or change rows. The public sees just the paid count, through program_paid_count().

create table if not exists public.program_registrations (
  id uuid primary key,
  program_id text not null check (char_length(program_id) between 1 and 80),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254 and email like '%_@_%'),
  company text not null default '' check (char_length(company) <= 160),
  status text not null default 'pending' check (status in ('pending', 'paid', 'refunded', 'canceled')),
  stripe_session_id text unique,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists program_registrations_program_status on public.program_registrations (program_id, status);

alter table public.program_registrations enable row level security;

drop policy if exists "registrations: anyone can register" on public.program_registrations;
create policy "registrations: anyone can register" on public.program_registrations for insert
  to anon, authenticated
  with check (status = 'pending' and stripe_session_id is null and paid_at is null);

drop policy if exists "registrations: staff read" on public.program_registrations;
create policy "registrations: staff read" on public.program_registrations for select
  to authenticated using (public.is_staff());

drop policy if exists "registrations: staff update" on public.program_registrations;
create policy "registrations: staff update" on public.program_registrations for update
  to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "registrations: staff delete" on public.program_registrations;
create policy "registrations: staff delete" on public.program_registrations for delete
  to authenticated using (public.is_staff());

revoke all on public.program_registrations from anon, authenticated;
grant insert on public.program_registrations to anon, authenticated;
grant select, update, delete on public.program_registrations to authenticated;

-- Paid registrations for one program, readable by everyone (no names or emails).
create or replace function public.program_paid_count(p_program_id text) returns integer
  language sql stable security definer set search_path = public
as $$
  select count(*)::integer from public.program_registrations where program_id = p_program_id and status = 'paid';
$$;

revoke all on function public.program_paid_count(text) from public;
grant execute on function public.program_paid_count(text) to anon, authenticated;
