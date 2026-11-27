import { timingSafeEqual } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'

// On-demand cache-busting for the Supabase-backed content this site reads
// (marketing_content, marketing_blog_posts, marketing_blog_authors).
// This repo has no write path of its own -- every page relies purely on
// its own `export const revalidate = 60` (or similar) for freshness, so a
// save made elsewhere (the matjarx-platform admin, or a hand-run SQL
// migration) can take up to that long to show up live, with no way to
// force it sooner. This route is an ADDITION, not a replacement: it just
// lets whichever system actually writes the data ask for a path's cache
// to be dropped immediately, while every page's own revalidate value
// keeps working exactly as before if this is never called.
//
// Two ways to call it:
//   1. Supabase Database Webhook, configured per-table in the Supabase
//      dashboard (Database > Webhooks) to POST here on insert/update,
//      with the secret set as a custom HTTP header (see README below).
//      Its payload shape is fixed by Supabase: { table, record, ... }.
//   2. Direct call from any other system (e.g. matjarx-platform, after
//      its own save) with an explicit list of paths -- simplest and most
//      flexible, since the caller already knows exactly what changed.
//
// Needs a REVALIDATE_SECRET env var (not public -- never prefix it
// NEXT_PUBLIC_) added wherever this app's env vars are configured.
// This repo has had no non-public env var until now.

const SECRET_HEADER = 'x-revalidate-secret'

/** timingSafeEqual throws on a length mismatch rather than just returning
 *  false, and it needs equal-length buffers either way -- so check that
 *  first. A plain `!==` here would let an attacker recover the secret
 *  byte-by-byte via response-time analysis; this always takes the same
 *  time regardless of how much of the guess is right. */
function secretMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

/** marketing_content.slug is the same string the admin's page-list and
 *  content-schema route already key content by -- it generally equals
 *  the real route path 1:1 (e.g. 'pricing' -> /pricing), except blog
 *  content overrides, which are namespaced 'blog/<slug>' to the post's
 *  own page rather than a top-level route. */
function pathsForContentSlug(slug: string): string[] {
  if (slug.startsWith('blog/')) {
    // This site's real route is /blogs/<slug> (plural) -- /blog/<slug>
    // (singular) is only a legacy redirect, never the actual page.
    return [`/blogs/${slug.slice('blog/'.length)}`]
  }
  return [`/${slug.replace(/^\/+/, '')}`]
}

function pathsForBlogPostRow(record: Record<string, unknown>): string[] {
  const paths = ['/blogs']
  if (typeof record.slug === 'string' && record.slug) {
    paths.push(`/blogs/${record.slug}`)
  }
  if (typeof record.author_slug === 'string' && record.author_slug) {
    paths.push(`/blogs/author/${record.author_slug}`)
  }
  return paths
}

function pathsForBlogAuthorRow(record: Record<string, unknown>): string[] {
  const paths = ['/blogs']
  if (typeof record.slug === 'string' && record.slug) {
    paths.push(`/blogs/author/${record.slug}`)
  }
  return paths
}

/** A Supabase Database Webhook payload: { type, table, schema, record, old_record }. */
function isSupabaseWebhookPayload(body: unknown): body is { table: string; record?: Record<string, unknown> } {
  return !!body && typeof body === 'object' && 'table' in body && typeof (body as { table: unknown }).table === 'string'
}

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    // Misconfiguration, not a caller error -- don't leak which is which.
    return NextResponse.json({ revalidated: false, message: 'Not configured' }, { status: 500 })
  }
  if (!secretMatches(request.headers.get(SECRET_HEADER), secret)) {
    return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ revalidated: false, message: 'Invalid JSON body' }, { status: 400 })
  }

  let paths: string[]

  if (isSupabaseWebhookPayload(body)) {
    const record = body.record ?? {}
    if (body.table === 'marketing_blog_posts') {
      paths = pathsForBlogPostRow(record)
    } else if (body.table === 'marketing_blog_authors') {
      paths = pathsForBlogAuthorRow(record)
    } else if (body.table === 'marketing_content' && typeof record.slug === 'string') {
      paths = pathsForContentSlug(record.slug)
    } else {
      return NextResponse.json({ revalidated: false, message: `Unknown table: ${body.table}` }, { status: 400 })
    }
  } else if (body && typeof body === 'object' && 'paths' in body && Array.isArray((body as { paths: unknown }).paths)) {
    paths = (body as { paths: string[] }).paths.filter((p) => typeof p === 'string' && p.startsWith('/'))
  } else {
    return NextResponse.json(
      { revalidated: false, message: "Expected a Supabase webhook payload ({ table, record }) or { paths: string[] }" },
      { status: 400 },
    )
  }

  if (paths.length === 0) {
    return NextResponse.json({ revalidated: false, message: 'Nothing to revalidate' }, { status: 400 })
  }

  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({ revalidated: true, paths })
}
