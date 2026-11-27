import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { routes } from '@/lib/routes'

// Called by a Supabase Database Webhook on insert/update of
// marketing_blog_posts (see supabase/revalidate-webhook.sql) so a published
// or edited post shows within seconds, without waiting for the blog page's
// own revalidate=60 window and without a redeploy.
//
// Secret-protected: anyone who can reach this URL can force a regeneration,
// which is cheap, but Supabase's own webhook config lets it be set as a
// plain custom header on every call, so there's no reason not to check one.
const SECRET = process.env.REVALIDATE_SECRET

export async function POST(request: Request) {
  if (!SECRET) {
    return NextResponse.json({ error: 'REVALIDATE_SECRET not configured' }, { status: 500 })
  }
  if (request.headers.get('x-revalidate-secret') !== SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let slug: string | undefined
  try {
    const body = await request.json()
    // Supabase's webhook payload nests the changed row under `record` (and
    // the pre-image under `old_record` for updates/deletes) -- slug is the
    // same on both, so either works for insert, update or delete.
    slug = body?.record?.slug ?? body?.old_record?.slug
  } catch {
    // No/invalid JSON body -- fall through and still revalidate the index
    // and sitemap, just not a specific post path.
  }

  const paths = ['/blogs', '/sitemap/blog.xml']
  if (slug) paths.unshift(routes.blogPost(slug))

  for (const path of paths) revalidatePath(path)
  // Busts the getBlogPost/getBlogPosts unstable_cache entries directly --
  // the route-level revalidatePath above only clears the rendered-page
  // cache, not the underlying data cache those functions actually read
  // from, which has its own independent 60s window.
  revalidateTag('blog-posts', { expire: 0 })

  return NextResponse.json({ revalidated: paths, tags: ['blog-posts'] })
}
