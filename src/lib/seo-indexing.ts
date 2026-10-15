// Which pages search engines may index.
//
// One list drives two things that must never disagree: the robots meta tag
// a page renders and whether the sitemap lists it. A page that says
// noindex while the sitemap asks Google to index it is a contradiction
// Search Console reports as an error ("Submitted URL marked 'noindex'").
//
// The 59 city and comparison pages come from the SEO spec sheet (tier-3
// cities, POS comparisons and comparisons with no viable keyword). They
// stay live and crawlable -- `follow`, so the links on them still count --
// they just stop competing in the index with the pages that sell.

import type { Metadata } from 'next'
import { routes } from './routes'
import { SHEET_NOINDEX_PATHS } from './seo-noindex-list'

export const NOINDEX_PATHS: ReadonlySet<string> = new Set([
  ...SHEET_NOINDEX_PATHS,
  // A form's confirmation page: nothing on it answers a search.
  routes.thankYou,
])

export function isNoindex(path: string): boolean {
  return NOINDEX_PATHS.has(path)
}

export const NOINDEX_FOLLOW: NonNullable<Metadata['robots']> = { index: false, follow: true }

/** Spread into a page's metadata: `{ ...robotsFor('/website-design-swabi') }`.
 *  Empty for an indexable page, so it leaves the default untouched. */
export function robotsFor(path: string): Pick<Metadata, 'robots'> {
  return isNoindex(path) ? { robots: NOINDEX_FOLLOW } : {}
}
