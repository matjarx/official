-- Fires POST https://matjarx.com/api/revalidate on every insert/update of
-- marketing_blog_posts, so a publish or edit shows within seconds instead
-- of waiting out revalidate=60 on the blog page (see
-- src/app/blogs/[slug]/page.tsx and src/app/api/revalidate/route.ts).
--
-- Requires the pg_net extension (Database -> Extensions -> pg_net, or run
-- `create extension if not exists pg_net;` once as a superuser-equivalent
-- role -- Supabase projects normally have this already).
--
-- Replace '<REVALIDATE_SECRET>' below with the same value set as the
-- REVALIDATE_SECRET env var on the deployed app, and run this once.

create or replace function public.notify_blog_post_revalidate()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url := 'https://matjarx.com/api/revalidate',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-revalidate-secret', '<REVALIDATE_SECRET>'
    ),
    body := jsonb_build_object(
      'record', to_jsonb(new),
      'old_record', case when TG_OP = 'UPDATE' then to_jsonb(old) else null end
    )
  );
  return new;
end;
$$;

drop trigger if exists trg_blog_post_revalidate on public.marketing_blog_posts;

create trigger trg_blog_post_revalidate
after insert or update on public.marketing_blog_posts
for each row
execute function public.notify_blog_post_revalidate();

-- To remove later: drop trigger trg_blog_post_revalidate on public.marketing_blog_posts;
