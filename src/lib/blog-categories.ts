import { BLOG_CATEGORIES, type BlogCategory } from './blog-data'

// Category slugs and the one-line description each archive leads with.
//
// Split out of blog-data.ts so both the archive route and the sitemap can
// derive URLs from the same source the tabs use, rather than a second
// hand-kept list that drifts the first time a category is renamed.

/** "Getting started" -> "getting-started". */
export function slugifyCategory(category: BlogCategory): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/** The reverse, matched against the real list so an unknown slug is null
 *  rather than a de-slugified guess that renders an empty page. */
export function categoryForSlug(slug: string): BlogCategory | null {
  const match = BLOG_CATEGORIES.filter((c) => c !== 'All').find(
    (c) => slugifyCategory(c as BlogCategory) === slug
  )
  return (match as BlogCategory) || null
}

/** Every category that gets its own URL — 'All' is /blogs itself. */
export const CATEGORY_SLUGS: { category: BlogCategory; slug: string }[] = BLOG_CATEGORIES
  .filter((c) => c !== 'All')
  .map((c) => ({ category: c as BlogCategory, slug: slugifyCategory(c as BlogCategory) }))

// Written rather than generated: an archive whose only text is its own title
// is a thin page, and these are the pages meant to rank for the category.
export const CATEGORY_INTROS: Record<BlogCategory, string> = {
  'Getting started': 'Getting your first business website live — what to prepare, what it costs, and how the first seven days actually go.',
  'SEO': 'How Pakistani and Gulf businesses get found on Google — local search, keywords, technical basics and what genuinely moves rankings.',
  'E-commerce': 'Selling online: catalogues, checkout, delivery and the decisions that make an online store work rather than just exist.',
  'Payments': 'Taking money online in Pakistan — JazzCash, EasyPaisa, bank transfer, cash on delivery and what customers actually trust.',
  'Marketing': 'Bringing people to a website you already have — content, social, ads and the measurement that tells you which of them worked.',
  'Client stories': 'Real businesses on MatjarX: what they sell, what they tried before, and what changed after launching.',
}
