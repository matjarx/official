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
import { LOCALE_HEADER, isLocale, DEFAULT_LOCALE, translatedLocales } from '@/lib/locale'

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

  // ── Locale routing ────────────────────────────────────────────────────
  //
  // /ar/pricing and /ur/pricing REWRITE to /pricing with the locale carried
  // in a header. English has no prefix and is not touched, so it keeps every
  // URL it already ranks for -- which is the reason for not prefixing it.
  //
  // A rewrite, never a redirect: the address bar keeps /ar/pricing, which is
  // the URL Google indexes and the one hreflang points at. A redirect would
  // make the Arabic URL a signpost to an English page.
  //
  // This runs AFTER the 410 check, which matches on the FIRST path segment
  // -- so /tag/x is 410 and /ar/tag/x is not: its first segment is `ar`, it
  // falls through to the rewrite, and the rewritten /tag/x then 404s.
  //
  // Left that way deliberately. Those WordPress URLs only ever existed
  // without a locale prefix, so /ar/tag/x has never been linked or indexed
  // by anyone and has no authority to preserve. Teaching the 410 list about
  // prefixes would add a branch for traffic that does not exist.
  //
  // It also means 105 route directories stay exactly where they are. The
  // alternative -- moving every one of them under app/[locale]/ -- would be
  // a vast refactor to change nothing for the language carrying all the
  // current traffic.
  const seg = /^\/([a-z]{2})(\/.*)?$/.exec(request.nextUrl.pathname)
  const maybe = seg?.[1]
  if (maybe && isLocale(maybe) && maybe !== DEFAULT_LOCALE) {
    const url = request.nextUrl.clone()
    url.pathname = seg?.[2] || '/'
    // LOCALE_HEADER goes on the REQUEST for any server code that needs to
    // know, and on the RESPONSE so the locale a URL resolved to is visible
    // from outside -- which is how the routing gets tested at all, given the
    // rendered page itself is identical English either way today.
    const headers = new Headers(request.headers)
    headers.set(LOCALE_HEADER, maybe)
    const res = NextResponse.rewrite(url, { request: { headers } })
    res.headers.set(LOCALE_HEADER, maybe)
    // Untranslated locales must not be indexed.
    //
    // /ar/<path> renders ENGLISH until that page's Arabic strings exist. That
    // is useful for building and fatal for SEO: indexing it would publish a
    // duplicate of all 208 English pages, twice over, competing with the
    // originals that carry every ranking the site has.
    //
    // Sent as a header rather than a <meta name="robots"> tag because the tag
    // would have to be computed in the root layout, and reading the request
    // there makes all 154 prerendered pages render on demand instead. Google
    // treats X-Robots-Tag and the meta tag identically, and the header also
    // covers responses that have no <head> to put a tag in.
    //
    // `follow` so the English pages these link to still get crawled.
    if (!translatedLocales(url.pathname).includes(maybe)) {
      res.headers.set('X-Robots-Tag', 'noindex, follow')
    }
    return res
  }

  const res = NextResponse.next()
  res.headers.set(LOCALE_HEADER, DEFAULT_LOCALE)
  return res
}

export const config = {
  // Everything except Next's own assets and the files in public/. Without
  // this the proxy runs on every stylesheet and image too, and a prefix
  // like `tag` would start eating real asset paths.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png|robots.txt|sitemap.xml|.*\\.(?:webp|png|jpg|jpeg|svg|ico|css|js|txt|xml|woff2?)$).*)'],
}
