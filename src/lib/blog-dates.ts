// When a blog post last changed -- one rule for the sitemap's <lastmod> and
// the Article schema's dateModified, so the two can never disagree.
//
// marketing_blog_posts.updated_at is the real edit time for anything
// edited through the admin. The 28 posts imported on 2026-09-06 all carry
// that import time instead, which says nothing about the post itself, so
// for those the publish date stands in. Otherwise: whichever is later,
// since a post can't have been modified before it was published.

/** The day the original posts were bulk-imported into marketing_blog_posts (UTC). */
export const BLOG_IMPORT_DAY = '2026-09-06'

function parse(value: Date | string | null | undefined): Date | undefined {
  if (!value) return undefined
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? undefined : d
}

/**
 * @param published the post's publish date (`date`, e.g. "1 Sep 2026")
 * @param updatedAt marketing_blog_posts.updated_at, when the database is reachable
 */
export function postLastModified(published: string | null | undefined, updatedAt: Date | string | null | undefined): Date | undefined {
  const pub = parse(published)
  const upd = parse(updatedAt)
  if (!upd || upd.toISOString().slice(0, 10) === BLOG_IMPORT_DAY) return pub
  if (!pub) return upd
  return upd > pub ? upd : pub
}
