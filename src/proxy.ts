// 410 Gone for the WordPress site that used to live here.
//
// ── Why not leave them as 404s ───────────────────────────────────────
// Search Console currently lists about 120 dead WordPress URLs under
// "Not found (404)" — /faq-items/*, /faq_category/*, /portfolio/*,
// /project-cat/*, /element_category/*, /fusion_tb_category/*, /author/*,
// /tag/*, /artist/*, /my-account, /checkout, /newsletter, and a dozen
// more of the same shape. They 404 correctly. That is not the problem.
//
// The problem is what a 404 MEANS to a crawler: "not here right now".
// Google treats it as possibly temporary and keeps coming back for
// months, which is why URLs last crawled in May are still in the report
// in September, and why a handful of them are still sitting in the
// "Indexed" list.
//
// 410 Gone means "deliberately removed, stop asking". Google drops a 410
// substantially faster than a 404, and re-crawls it far less. Nothing
// here ever coming back is exactly the situation 410 is for.
//
// ── What is NOT in this list ─────────────────────────────────────────
// Anything with a real successor is a 301 in next.config.js, not a 410:
// the old flat blog slugs (/cod-optimization-reduce-rto and friends),
// /resources-tools/*, /blog/*, /terms-and-conditions, /refund-policy,
// /about, /best-builder. A 410 on a URL that has a successor throws away
// whatever authority it had accumulated. Check that redirect list before
// adding a prefix here.

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * WordPress custom post types, taxonomies and plugin routes. Every one of
 * these prefixes is verified present in Search Console's 404 report and
 * has no successor page on this site.
 *
 * Matched as a path SEGMENT, so `/tag/tattoo` matches and a hypothetical
 * future `/tagline` does not.
 */
const GONE_PREFIXES = [
  'faq-items',
  'faq_category',
  'portfolio',
  'portfolio__trashed',
  'project-cat',
  'element_category',
  'fusion_tb_category',
  'artist',
  'author',
  'tag',
  'category',
  'cms_block_cat',
  'resources-tools',
  'website-example',
  'wp-content',
  'wp-includes',
  'wp-admin',
  'wp-json',
]

/** Single dead pages rather than whole trees. */
const GONE_EXACT = new Set([
  '/my-account',
  '/checkout',
  '/cart',
  '/newsletter',
  '/testing-form',
  '/404-2',
  '/matjar-x-home-copy',
  '/web-development-karachi',
])

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, '') || '/'

  // /resources-tools/<slug> and /blog/<slug> have real successors and are
  // redirected in next.config.js, which runs BEFORE this. Anything of
  // that shape still arriving here had no matching post, so it is gone.
  const first = path.split('/')[1] || ''

  if (GONE_EXACT.has(path) || GONE_PREFIXES.includes(first)) {
    return new NextResponse(null, {
      status: 410,
      headers: {
        // Nothing to cache, and no crawler should be told otherwise.
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  // Everything except Next's own assets and the files in public/. Without
  // this the proxy runs on every stylesheet and image too, and a prefix
  // like `tag` would start eating real asset paths.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png|robots.txt|sitemap.xml|.*\\.(?:webp|png|jpg|jpeg|svg|ico|css|js|txt|xml|woff2?)$).*)'],
}
