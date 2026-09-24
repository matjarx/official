// Links between the site's sections, rather than within them.
//
// ── The measurement that produced this file ──────────────────────────
// docs/internal-link-graph.md crawls all 184 built pages with the header
// and footer markup cut out, so only a page's own content counts. It
// found 1,546 editorial links arranged as four sealed islands:
//
//   industries -> industries   182        blog -> blog          140
//   alternatives -> alternatives 207      help -> help           29
//
// and almost nothing crossing between them. Twenty-eight blog posts on
// local SEO, payment gateways, TikTok ads and COD optimisation, and not
// one of them linked to the service page that sells exactly that work,
// to a city page, or to an industry page. Search Console shows the
// result: roughly a hundred URLs sitting in "Discovered — currently not
// indexed", which is Google saying it knows the page exists and has not
// thought it worth fetching.
//
// ── Topics, not hand-written lists ───────────────────────────────────
// Twenty-eight posts times four sections is a hundred-odd links to
// curate by hand and then maintain. Instead each page declares what it
// is ABOUT, and the links fall out of the overlap. Adding a post means
// tagging it; adding a service means tagging it; nothing else changes.
//
// ── Rotation, and the trap in it ─────────────────────────────────────
// Where there are more candidates than slots, the window rotates from
// the page's own index so different pages surface different targets.
// otherCitiesFor() got this wrong in a way that was invisible: it took
// the offset from a list the key had already been filtered out of, so
// indexOf returned -1 every time, clamped to 0, and all 63 pages showed
// the same five cities. It read like a rotation and never moved.
//
// So: every rotation here takes its offset from the FULL list, and
// scripts/check-cross-links.mjs asserts the coverage a build actually
// produces rather than the coverage this file intends.

import { routes } from './routes'
import { CITY_DATA, CITY_SLUGS, type CityKey } from './location-data'
import { INDUSTRY_DATA, type IndustryKey } from './industry-data'
import { BLOG_POSTS } from './blog-data'

export type CrossLink = {
  label: string
  href: string
  /** What the target is, so a rail can group or icon them. */
  kind: 'service' | 'industry' | 'city' | 'blog' | 'plan' | 'page'
  /** One line on why this link is here, shown under the label. */
  note?: string
}

/**
 * Deliberately coarse. These are the things a visitor might want to read
 * next, not a taxonomy — a dozen buckets that each map cleanly onto at
 * least one service page and one industry.
 */
export type Topic =
  | 'seo'
  | 'geo'
  | 'payments'
  | 'ecommerce'
  | 'social'
  | 'design'
  | 'trust'
  | 'getting-started'
  | 'local'
  | 'b2b'
  | 'marketing'

const SERVICE_TOPICS: Record<keyof typeof import('./routes').SERVICE_ROUTES, { label: string; topics: Topic[]; note: string }> = {
  dfy: {
    label: 'Done-for-you website',
    topics: ['design', 'trust', 'getting-started', 'b2b'],
    note: 'We build and launch it in 7 days.',
  },
  seo: {
    label: 'Local, national & global SEO',
    topics: ['seo', 'geo', 'local'],
    note: 'Get found for what your customers actually search.',
  },
  concierge: {
    label: 'Website concierge',
    topics: ['getting-started', 'trust', 'design'],
    note: 'Someone who answers, and makes the edit for you.',
  },
  growth: {
    label: 'Growth marketing',
    topics: ['marketing', 'social', 'ecommerce', 'payments'],
    note: 'Ads, content and campaigns once the site is live.',
  },
}

const INDUSTRY_TOPICS: Partial<Record<IndustryKey, Topic[]>> = {
  restaurants: ['local', 'social', 'marketing'],
  boutiques: ['ecommerce', 'social', 'payments'],
  clinics: ['local', 'trust'],
  'real-estate': ['local', 'trust', 'marketing'],
  'clinics-and-healthcare': ['local', 'trust'],
  'salons-and-spas': ['local', 'social'],
  'gyms-and-fitness': ['local', 'social', 'marketing'],
  'construction-companies': ['local', 'trust', 'b2b'],
  'law-firms': ['local', 'trust', 'seo'],
  'online-stores-ecommerce': ['ecommerce', 'payments', 'marketing'],
  'wedding-and-event-planners': ['local', 'social'],
  'auto-repair-shops': ['local', 'trust'],
  'b2b-clothing-manufacturer': ['b2b', 'trust', 'seo'],
  'b2b-leather-goods-manufacturer': ['b2b', 'trust', 'seo'],
}

/**
 * Every post, by slug. Written against each post's actual subject rather
 * than its `category` field, which is coarser — "Marketing" covers both
 * a TikTok ads walkthrough and a piece on what to post when you will not
 * dance on camera, and those want different onward links.
 */
const POST_TOPICS: Record<string, Topic[]> = {
  'matjarx-complete-guide-small-business': ['getting-started', 'design'],
  'rastah-case-study-lessons-small-business': ['marketing', 'ecommerce', 'trust'],
  'professional-website-build-trust': ['trust', 'design'],
  'top-5-website-mistakes-killing-conversions': ['design', 'trust'],
  'mobile-first-design-tips-ux': ['design'],
  'trends-in-digital-marketing-for-pakistani-businesses': ['marketing', 'social'],
  'why-website-is-important-for-business': ['getting-started', 'trust'],
  'b2b-website-myths-broken': ['b2b', 'trust'],
  'domain-and-hosting-explained': ['getting-started'],
  'cod-optimization-reduce-rto': ['ecommerce', 'payments'],
  'setup-sadapay-sadabiz-website': ['payments', 'ecommerce'],
  'setup-jazzcash-jazz-business-website': ['payments', 'ecommerce'],
  'setup-easypaisa-business-website': ['payments', 'ecommerce'],
  'setup-payfast-payment-gateway': ['payments', 'ecommerce'],
  'whatsapp-automation-setup': ['marketing', 'social'],
  'tiktok-growth-limit-switch-business-account': ['social', 'marketing'],
  'business-content-ideas-no-dancing': ['social', 'marketing'],
  'set-up-tiktok-ads': ['social', 'marketing'],
  'facebook-page-for-business': ['social', 'local'],
  'facebook-page-setup-guide': ['social', 'local'],
  'local-seo-for-small-business-guide': ['seo', 'local'],
  'definitive-master-guide-to-generative-engine-optimization': ['geo', 'seo'],
  'how-generative-engine-optimization-works': ['geo', 'seo'],
  'beyond-blue-links-how-generative-engine-optimization-drives-traffic': ['geo', 'seo'],
  'top-geo-and-content-automation-tools-search-strategy': ['geo', 'marketing'],
  'hiring-a-geo-expert-agencies-and-consulting-services': ['geo', 'seo'],
  'mastering-ai-search-best-generative-ai-geo-training-courses': ['geo', 'seo'],
  'elegance-embroidery-mukesh-kumar-lucky-draw-winner': ['ecommerce', 'trust'],
}

const overlap = (a: Topic[], b: Topic[]) => a.filter((t) => b.includes(t)).length

/** Rotate a list from `offset`, taking `count`. Offset comes from the caller's own index. */
function window_<T>(list: T[], offset: number, count: number): T[] {
  if (list.length === 0) return []
  return Array.from({ length: Math.min(count, list.length) }, (_, i) => list[(offset + i) % list.length])
}

function serviceLinks(topics: Topic[], max: number): CrossLink[] {
  return (Object.keys(SERVICE_TOPICS) as (keyof typeof SERVICE_TOPICS)[])
    .map((k) => ({ k, score: overlap(topics, SERVICE_TOPICS[k].topics) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map(({ k }) => ({ label: SERVICE_TOPICS[k].label, href: routes.service(k), kind: 'service' as const, note: SERVICE_TOPICS[k].note }))
}

function industryLinks(topics: Topic[], offset: number, max: number): CrossLink[] {
  const scored = (Object.keys(INDUSTRY_TOPICS) as IndustryKey[])
    .map((k) => ({ k, score: overlap(topics, INDUSTRY_TOPICS[k] || []) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.k.localeCompare(b.k))
  // Rotate within the matching set, so two posts on the same topic do not
  // both send everyone to the same industry page.
  return window_(scored, offset, max).map(({ k }) => ({
    label: INDUSTRY_DATA[k].name,
    href: routes.industry(k),
    kind: 'industry' as const,
    note: `A website built for ${INDUSTRY_DATA[k].name.toLowerCase()}.`,
  }))
}

const POST_SLUGS = BLOG_POSTS.map((p) => p.slug)

function blogLinks(topics: Topic[], offset: number, max: number): CrossLink[] {
  const scored = POST_SLUGS
    .map((slug) => ({ slug, score: overlap(topics, POST_TOPICS[slug] || []) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug))
  return window_(scored, offset, max).map(({ slug }) => {
    const post = BLOG_POSTS.find((p) => p.slug === slug)!
    return { label: post.title, href: routes.blogPost(slug), kind: 'blog' as const, note: post.category }
  })
}

function cityLinks(offset: number, max: number): CrossLink[] {
  return window_(CITY_SLUGS, offset, max).map((k) => ({
    label: `Website design in ${CITY_DATA[k as CityKey].name}`,
    href: routes.location(k),
    kind: 'city' as const,
  }))
}

/**
 * What a blog post should send a reader to next, outside the blog.
 *
 * Blog posts were the worst offenders in the crawl: 140 links, every one
 * of them to another blog post, plus 28 to /pricing. A reader who has
 * just finished "How to set up JazzCash on your website" is as ready to
 * buy as they will ever be, and the page offered them another article.
 */
export function crossLinksForPost(slug: string): CrossLink[] {
  const topics = POST_TOPICS[slug]
  if (!topics) return []
  const i = POST_SLUGS.indexOf(slug)
  const offset = i < 0 ? 0 : i
  return [...serviceLinks(topics, 2), ...industryLinks(topics, offset, 2), ...cityLinks(offset * 3, 2)]
}

/**
 * What a city page should send a reader to next.
 *
 * These are the pages Search Console has parked in "Discovered — currently
 * not indexed", and until now they linked only to other cities, home and
 * /pricing. Nothing about what a business in that city would actually buy.
 */
export function crossLinksForCity(key: CityKey): CrossLink[] {
  const i = CITY_SLUGS.indexOf(key)
  const offset = i < 0 ? 0 : i
  const allIndustries = Object.keys(INDUSTRY_TOPICS) as IndustryKey[]
  const industries = window_(allIndustries, offset, 3).map((k) => ({
    label: `${INDUSTRY_DATA[k].name} in ${CITY_DATA[key].name}`,
    href: routes.industry(k),
    kind: 'industry' as const,
  }))
  const posts = window_(POST_SLUGS, offset * 2, 2).map((s) => {
    const post = BLOG_POSTS.find((p) => p.slug === s)!
    return { label: post.title, href: routes.blogPost(s), kind: 'blog' as const, note: post.category }
  })
  return [...industries, ...posts, ...serviceLinks(['local', 'seo'], 2)]
}

/**
 * What an industry page should send a reader to next.
 *
 * Industry pages already link to each other heavily (182 links) and to
 * home and /pricing — but never to a city page or to the blog, which is
 * where the search demand for "<industry> website in <city>" actually is.
 */
export function crossLinksForIndustry(key: IndustryKey): CrossLink[] {
  const topics = INDUSTRY_TOPICS[key] || []
  const all = Object.keys(INDUSTRY_TOPICS) as IndustryKey[]
  const i = all.indexOf(key)
  const offset = i < 0 ? 0 : i
  return [...blogLinks(topics, offset, 3), ...cityLinks(offset * 5, 3), ...serviceLinks(topics, 1)]
}
