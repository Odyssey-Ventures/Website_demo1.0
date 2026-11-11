-- Security advisor fixes, applied after 0001.
-- Pin search_path on helper functions, and stop the status trigger function from being callable over the API.
alter function public.is_staff() set search_path = public;
alter function public.touch_updated_at() set search_path = public;
alter function public.support_reply_mark_staff() set search_path = public;
revoke execute on function public.support_reply_update_status() from public, anon, authenticated;
