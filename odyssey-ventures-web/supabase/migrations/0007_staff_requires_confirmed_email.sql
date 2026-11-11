-- Admin hardening (Nov 2026): staff must have a CONFIRMED @odysseyventures.llc address.
-- Before, is_staff() trusted the email in the sign-in token alone. With password sign-up, an unconfirmed
-- account using a company address could otherwise count as staff if email confirmation were ever turned off.
create or replace function public.is_staff() returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce(
    (select u.email_confirmed_at is not null and lower(u.email) like '%@odysseyventures.llc'
       from auth.users u
      where u.id = auth.uid()),
    false)
$$;

revoke all on function public.is_staff() from public;
grant execute on function public.is_staff() to anon, authenticated;
