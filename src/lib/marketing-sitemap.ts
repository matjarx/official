import { routes } from '@/lib/routes'
import { getBlogPosts, getBlogAuthors } from '@/lib/marketing-content'
import { CATEGORY_SLUGS } from '@/lib/blog-categories'
import { RIVAL_DATA } from '@/lib/comparison-data'
import { INDUSTRY_SLUGS } from '@/lib/industry-data'
import { CITY_SLUGS } from '@/lib/location-data'
import { PLAN_DATA } from '@/lib/plan-data'
import { HELP_SLUGS } from '@/lib/help-articles-data'
import { LEGAL_DOC_KEYS } from '@/lib/legal-data'
import { THEME_LANDINGS } from '@/lib/theme-landing-data'
import { LOCALES, DEFAULT_LOCALE, isLocale, localeHref, translatedLocales, hreflangFor, type Locale } from '@/lib/locale'

// Built from the same data exports that drive each route's own
// generateStaticParams (or static folder list), so this can never list a
// route that doesn't exist or drift out of sync as pages are added.

const SITE_URL = 'https://matjarx.com'

// Blog routes now come from getBlogPosts() (a live table, since the
// admin's Blog tab can create/delete posts) rather than a static
// import — without this, the route stayed statically cached forever (no
// revalidate previously existed here), so a post created only through
// the admin would never actually appear in the sitemap until the next
// redeploy.

// Split into child sitemaps rather than one file of ~600 URLs.
//
// Search Console reports index coverage PER SUBMITTED SITEMAP. As one file,
// "40 URLs not indexed" says nothing about WHICH forty; with the 63 city
// pages, 28 posts and every comparison in separate children, the same report
// names the group that is struggling. On a site whose whole pitch is getting
// found on Google, not being able to answer that about our own pages was the
// wrong way round.
//
// Next builds the index at /sitemap.xml automatically from generateSitemaps
// and serves each child at /sitemap/<id>.xml -- the same shape the client
// storefronts now use, so both sides of the platform look alike in Search
// Console.
export const MARKETING_SITEMAP_SECTIONS = ['pages', 'templates', 'locations', 'comparisons', 'help', 'blog', 'legal'] as const
export type MarketingSitemapSection = (typeof MARKETING_SITEMAP_SECTIONS)[number]

export type SitemapUrl = { url: string; lastModified?: Date; changeFrequency?: string; priority?: number }
type MetadataRouteSitemap = SitemapUrl[]

export async function urlsForSection(id: string): Promise<MetadataRouteSitemap> {
  const now = new Date()

  const staticRoutes = [
    { url: routes.home, changeFrequency: 'weekly', priority: 1 },
    { url: routes.service('dfy'), changeFrequency: 'monthly', priority: 0.9 },
    { url: routes.service('seo'), changeFrequency: 'monthly', priority: 0.9 },
    { url: routes.service('concierge'), changeFrequency: 'monthly', priority: 0.9 },
    { url: routes.service('growth'), changeFrequency: 'monthly', priority: 0.9 },
    { url: routes.websiteExamples, changeFrequency: 'weekly', priority: 0.8 },
    { url: routes.pricing, changeFrequency: 'weekly', priority: 1 },
    { url: routes.features, changeFrequency: 'monthly', priority: 0.8 },
    { url: routes.websiteAudit, changeFrequency: 'monthly', priority: 0.7 },
    { url: routes.videos, changeFrequency: 'monthly', priority: 0.6 },
    { url: routes.alternatives, changeFrequency: 'monthly', priority: 0.8 },
    { url: routes.bestBuilder, changeFrequency: 'monthly', priority: 0.8 },
    { url: routes.help, changeFrequency: 'monthly', priority: 0.6 },
    { url: routes.blog, changeFrequency: 'weekly', priority: 0.7 },
    { url: routes.about, changeFrequency: 'yearly', priority: 0.4 },
    { url: routes.contact, changeFrequency: 'yearly', priority: 0.5 },
    { url: routes.faqs, changeFrequency: 'monthly', priority: 0.5 },
    { url: routes.careers, changeFrequency: 'monthly', priority: 0.3 },
    { url: routes.partner, changeFrequency: 'monthly', priority: 0.4 },
    { url: routes.thankYou, changeFrequency: 'yearly', priority: 0.1 },
  ] as const
  const staticRoutesFinal: MetadataRouteSitemap = staticRoutes.map((r) => ({ ...r, url: `${SITE_URL}${r.url}`, lastModified: now }))

  const planRoutes: MetadataRouteSitemap = (Object.keys(PLAN_DATA) as (keyof typeof PLAN_DATA)[]).map((slug) => ({
    url: `${SITE_URL}${routes.plan(slug)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const industryRoutes: MetadataRouteSitemap = Object.values(INDUSTRY_SLUGS).map((slug) => ({
    url: `${SITE_URL}${routes.industry(slug)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const cityRoutes: MetadataRouteSitemap = CITY_SLUGS.map((slug) => ({
    url: `${SITE_URL}${routes.location(slug)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const compareRoutes: MetadataRouteSitemap = Object.keys(RIVAL_DATA).map((rival) => ({
    url: `${SITE_URL}${routes.compare(rival)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const helpRoutes: MetadataRouteSitemap = HELP_SLUGS.map((slug) => ({
    url: `${SITE_URL}${routes.helpArticle(slug)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const blogPosts = await getBlogPosts()
  const blogRoutes: MetadataRouteSitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}${routes.blogPost(post.slug)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // The six category archives and one page per author.
  //
  // Both were invisible before they existed as URLs -- /blogs filtered by
  // category in the browser without ever changing the address, so the six
  // groupings could not be submitted, linked or ranked. Authors come from the
  // table rather than a constant, so adding one in the admin puts it here.
  const categoryRoutes: MetadataRouteSitemap = CATEGORY_SLUGS.map(({ slug }) => ({
    url: `${SITE_URL}${routes.blogCategory(slug)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const authorRoutes: MetadataRouteSitemap = (await getBlogAuthors())
    .filter((a) => a.slug)
    .map((a) => ({
      url: `${SITE_URL}${routes.blogAuthor(a.slug as string)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))

  // The template gallery and one page per theme.
  //
  // Ten theme landing pages have been live since they were built and were
  // in no sitemap at all -- only /templates itself appeared, inside
  // `pages`, so Google was told the gallery existed and never told what was
  // in it. They are their own section for the same reason the others are:
  // coverage is reported per submitted sitemap, and "templates are not
  // indexed" is a different problem from "the marketing pages are not".
  //
  // Driven by THEME_LANDINGS, so adding a landing adds its URL here with no
  // second list to remember.
  const templateRoutes: MetadataRouteSitemap = [
    { url: `${SITE_URL}${routes.templates}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...THEME_LANDINGS.map((t) => ({
      url: `${SITE_URL}${routes.templates}/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  const legalRoutes: MetadataRouteSitemap = LEGAL_DOC_KEYS.map((doc) => ({
    url: `${SITE_URL}${routes.legal(doc)}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.2,
  }))

  // Grouped by what a page IS, so a struggling group is identifiable: the
  // marketing pages proper, the 63 city pages, the competitor comparisons,
  // the help centre, everything blog, and the legal documents.
  switch (id) {
    case 'locations':
      return cityRoutes
    case 'comparisons':
      return compareRoutes
    case 'help':
      return helpRoutes
    case 'blog':
      return [...blogRoutes, ...categoryRoutes, ...authorRoutes]
    case 'templates':
      return templateRoutes
    case 'legal':
      return legalRoutes
    case 'pages':
    default:
      return [...staticRoutesFinal, ...planRoutes, ...industryRoutes]
  }
}


// ── Locales ────────────────────────────────────────────────────────────
//
// Each section exists once per locale: /sitemap/pages.xml is English (the
// URL already submitted to Search Console, unchanged), /sitemap/ar-pages.xml
// is Arabic, and so on. Search Console reports coverage per submitted file,
// so keeping the languages apart is what makes "Arabic is not being indexed"
// a question the report can answer.
//
// A URL appears in a locale's sitemap ONLY if translatedLocales() says that
// page is genuinely translated. Today that is English alone, so the Arabic
// and Urdu children come out empty, the index omits them, and the English
// files are byte-for-byte what they were. Nothing is submitted that would
// have to be withdrawn later: an /ar URL rendering English is noindex, and
// listing it would be asking Google to index a duplicate of the pages that
// carry every ranking the site has.

export type SitemapChild = { id: string; locale: Locale; section: MarketingSitemapSection }

/** Every locale x section pair, English first. Empty ones are filtered by
 *  the caller, which has to count the URLs anyway. */
export function sitemapChildren(): SitemapChild[] {
  const out: SitemapChild[] = []
  for (const locale of LOCALES) {
    for (const section of MARKETING_SITEMAP_SECTIONS) {
      out.push({ id: locale === DEFAULT_LOCALE ? section : `${locale}-${section}`, locale, section })
    }
  }
  return out
}

/** `pages`, `ar-pages`, `ar-pages.xml` -> a child, or null if it is neither. */
export function parseSitemapChild(raw: string): SitemapChild | null {
  const id = raw.replace(/\.xml$/, '')
  // English first: no section name starts with a two-letter prefix, but
  // checking the plain name first means one never could be mistaken for one.
  if ((MARKETING_SITEMAP_SECTIONS as readonly string[]).includes(id)) {
    return { id, locale: DEFAULT_LOCALE, section: id as MarketingSitemapSection }
  }
  const m = /^([a-z]{2})-(.+)$/.exec(id)
  if (m && isLocale(m[1]) && m[1] !== DEFAULT_LOCALE && (MARKETING_SITEMAP_SECTIONS as readonly string[]).includes(m[2])) {
    return { id, locale: m[1], section: m[2] as MarketingSitemapSection }
  }
  return null
}

export type SitemapEntry = SitemapUrl & { alternates?: Record<string, string> }

/** The URLs for one locale's copy of one section, each carrying its
 *  reciprocal hreflang set. */
export async function urlsForChild(child: SitemapChild): Promise<SitemapEntry[]> {
  const base = await urlsForSection(child.section)
  return base.flatMap((u) => {
    const path = u.url.startsWith(SITE_URL) ? u.url.slice(SITE_URL.length) || '/' : u.url
    if (!translatedLocales(path).includes(child.locale)) return []
    const alternates = hreflangFor(path, SITE_URL)
    return [{ ...u, url: `${SITE_URL}${localeHref(path, child.locale)}`, ...(alternates ? { alternates } : {}) }]
  })
}
