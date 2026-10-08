// Editable-content overrides — lets the matjarx-platform admin edit any
// field of any real page (all ~250) without a redeploy. Every page's
// existing hardcoded content remains the default/seed value; a row here,
// keyed by slug, deep-merges over it field-by-field. A missing row, a
// missing field, or a Supabase error all fall back to the default —
// nothing regresses if this table is empty or unreachable.
//
// getDefaultContent() is the single source of truth for "what does this
// page's content look like by default" — it just re-exports the same data
// objects each page already renders from, so there is exactly one copy of
// the real content, not a duplicate maintained here.

import { supabase } from './supabase'
import { CITY_DATA, type CityKey } from './location-data'
import { CITY_DETAIL } from './location-detail-data'
import { INDUSTRY_DATA, type IndustryKey } from './industry-data'
import { INDUSTRY_DETAIL } from './industry-detail-data'
import { RIVAL_DATA, type RivalKey } from './comparison-data'
import { BLOG_POSTS, type BlogPost, type BlogAuthor } from './blog-data'
import { HELP_ARTICLES, type HelpSlug } from './help-articles-data'
import { HELP_TOPICS, HELP_POPULAR, HELP_CHANNELS, HELP_SUBJECTS, HELP_FAQS } from './help-data'
import { LEGAL_DATA, type LegalDoc } from './legal-data'
import { PLAN_DATA, ALL_PLANS, type PlanKey } from './plan-data'
import { LAUNCH, BOOST, GROWTH as GROWTH_PLAN_DETAIL, PLATINUM, CUSTOM } from './plan-detail-data'
import { SERVICE_DATA, type ServiceKey } from './services-data'
import { DFY, SEO, CONCIERGE, GROWTH as GROWTH_SERVICE_DETAIL } from './service-detail-data'
import { FEATURE_GROUPS, ALWAYS_ON, FEATURES_FAQ } from './features-data'
import { ABOUT_STATS, ABOUT_VALUES, ABOUT_FAQS, ABOUT_TEAM } from './about-data'
import { CONTACT_CHANNELS, CONTACT_TOPICS, CONTACT_OFFICE_ROWS, CONTACT_FAQS } from './contact-data'
import { FAQ_GROUPS } from './faqs-data'
import { CAREERS_PERKS, CAREERS_ROLES } from './careers-data'
import { PARTNER_TIERS, PARTNER_STEPS } from './partner-data'
import { PARTNER_TOOL_LOGOS, PARTNER_CATEGORY_ICONS, PLAN_TIER_ICONS } from './partner-icons-data'
import { VOICES } from './home-data'
import { HERO as TEMPLATES_HERO, WHY_TEMPLATES, TEMPLATE_FEATURES, CATEGORIES as TEMPLATE_CATEGORIES, TEMPLATE_FAQS, TEMPLATE_PREVIEWS } from './templates-data'
import { HERO as VIDEOS_HERO, VIDEO_SECTIONS, VIDEO_FAQS } from './videos-data'
import { HERO as AUDIT_HERO, AUDIT_AREAS, PROCESS_STEPS as AUDIT_PROCESS, AUDIT_FAQS } from './website-audit-data'
import { EXAMPLES, EXAMPLE_CATEGORIES, EXAMPLE_PILLARS } from './examples-data'
import { HERO_STATS, PLATFORM_PROFILES, BEST_BUILDER_FAQS } from './best-builder-data'
import { HERO as ALT_HERO, GROUPS as ALT_GROUPS, WHY_COMPARE } from './alternatives-data'
import { THANK_YOU_STEPS, THANK_YOU_LINKS } from './thank-you-data'
import { DEFAULT_HERO_TICKS, COMPARE_GROUPS, DEFAULT_TESTIMONIALS, DEFAULT_HOW_TO_CHOOSE, DEFAULT_FAQ_DATA as PRICING_FAQS, DEFAULT_PLAN_ROWS } from '@/components/pricing/PricingContent'
import { DEFAULT_FAQ_DATA as HOME_FAQS } from '@/components/home/HomeContent'

// Deep-merges `override` onto `base`: objects merge key-by-key
// recursively, arrays and primitives are replaced wholesale when the
// override provides a value. Never mutates either input.
export function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base
  if (Array.isArray(base) || Array.isArray(override)) return override as T
  if (typeof base === 'object' && base !== null && typeof override === 'object') {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
    for (const key of Object.keys(override as Record<string, unknown>)) {
      out[key] = deepMerge((base as Record<string, unknown>)[key], (override as Record<string, unknown>)[key])
    }
    return out as T
  }
  return override as T
}

// The full default content object for every real slug on the site — the
// same data each page already renders, just addressable by one string key
// so the admin (a separate app) can fetch "what does this page look like"
// without duplicating the content.
export function getDefaultContent(slug: string): Record<string, unknown> | null {
  const [category, key] = slug.includes('/') ? slug.split(/\/(.+)/) : [slug, undefined]

  switch (category) {
    // The announcement strip's default is the copy that used to be
    // hardcoded in SiteHeader — so the row can be emptied, or the table
    // unreachable, and the site still renders what it always has.
    case ANNOUNCEMENT_BAR_SLUG:
      return DEFAULT_ANNOUNCEMENT as Record<string, unknown>
    case 'home':
      return { faqs: HOME_FAQS, voices: VOICES }
    case 'pricing':
      return { heroTicks: DEFAULT_HERO_TICKS, testimonials: DEFAULT_TESTIMONIALS, howToChoose: DEFAULT_HOW_TO_CHOOSE, faqs: PRICING_FAQS, compareGroups: COMPARE_GROUPS, plans: DEFAULT_PLAN_ROWS, tierIcons: PLAN_TIER_ICONS }
    case 'features':
      return { groups: FEATURE_GROUPS, alwaysOn: ALWAYS_ON, faqs: FEATURES_FAQ }
    // Each of the 4 services is its own real page (matching the exact
    // live matjarx.com URLs), same shape as 'plans' below.
    case 'services': {
      if (!key || !(key in SERVICE_DATA)) return null
      const serviceKey = key as ServiceKey
      const detail = { dfy: DFY, seo: SEO, concierge: CONCIERGE, growth: GROWTH_SERVICE_DETAIL }[serviceKey]
      return { ...SERVICE_DATA[serviceKey], detail }
    }
    case 'plans': {
      if (!key || !(key in PLAN_DATA)) return null
      const planKey = key as PlanKey
      const detail = { launch: LAUNCH, boost: BOOST, growth: GROWTH_PLAN_DETAIL, platinum: PLATINUM, custom: CUSTOM }[planKey]
      return { ...ALL_PLANS[planKey], ...PLAN_DATA[planKey], detail }
    }
    case 'industries': {
      if (!key || !(key in INDUSTRY_DATA)) return null
      const industryKey = key as IndustryKey
      return { ...INDUSTRY_DATA[industryKey], detail: INDUSTRY_DETAIL[industryKey] ?? null }
    }
    case 'cities': {
      if (!key || !(key in CITY_DATA)) return null
      const cityKey = key as CityKey
      return { ...CITY_DATA[cityKey], detail: CITY_DETAIL[cityKey] ?? null }
    }
    case 'comparisons': {
      if (!key || !(key in RIVAL_DATA)) return null
      return { ...RIVAL_DATA[key as RivalKey] }
    }
    case 'blog': {
      const post = BLOG_POSTS.find((p) => p.slug === key)
      return post ? { ...post } : null
    }
    case 'help': {
      if (!key) return { topics: HELP_TOPICS, popular: HELP_POPULAR, channels: HELP_CHANNELS, subjects: HELP_SUBJECTS, faqs: HELP_FAQS }
      if (!(key in HELP_ARTICLES)) return null
      return { ...HELP_ARTICLES[key as HelpSlug] }
    }
    case 'legal': {
      if (!key || !(key in LEGAL_DATA)) return null
      return { ...LEGAL_DATA[key as LegalDoc] }
    }
    case 'about':
      return { stats: ABOUT_STATS, values: ABOUT_VALUES, faqs: ABOUT_FAQS, team: ABOUT_TEAM }
    case 'contact':
      return { channels: CONTACT_CHANNELS, topics: CONTACT_TOPICS, officeRows: CONTACT_OFFICE_ROWS, faqs: CONTACT_FAQS }
    case 'faqs':
      return { groups: FAQ_GROUPS }
    case 'careers':
      return { perks: CAREERS_PERKS, roles: CAREERS_ROLES }
    case 'partner':
      return { tiers: PARTNER_TIERS, steps: PARTNER_STEPS, toolLogos: PARTNER_TOOL_LOGOS, categoryIcons: PARTNER_CATEGORY_ICONS }
    case 'templates':
      return { hero: TEMPLATES_HERO, why: WHY_TEMPLATES, features: TEMPLATE_FEATURES, categories: TEMPLATE_CATEGORIES, faqs: TEMPLATE_FAQS, previews: TEMPLATE_PREVIEWS }
    case 'videos':
      return { hero: VIDEOS_HERO, sections: VIDEO_SECTIONS, faqs: VIDEO_FAQS }
    case 'website-audit':
      return { hero: AUDIT_HERO, areas: AUDIT_AREAS, process: AUDIT_PROCESS, faqs: AUDIT_FAQS }
    case 'website-examples':
      return { examples: EXAMPLES, categories: EXAMPLE_CATEGORIES, pillars: EXAMPLE_PILLARS }
    case 'best-builder':
      return { heroStats: HERO_STATS, profiles: PLATFORM_PROFILES, faqs: BEST_BUILDER_FAQS }
    case 'alternatives':
      return { hero: ALT_HERO, groups: ALT_GROUPS, whyCompare: WHY_COMPARE }
    case 'thank-you':
      return { steps: THANK_YOU_STEPS, links: THANK_YOU_LINKS }
    default:
      return null
  }
}

// Fetches the override row for a page and merges it over the page's own
// default content. Server-side only (called from a page.tsx server
// component) — safe with the anon key since RLS only grants that key
// public SELECT, never write.
//
// An override with published = false is treated exactly like no
// override at all — the admin's Pages editor can save a draft (visible
// only in its own live-preview iframe there) without it going live,
// then flip it to published when ready. The three reserved-slug rows
// (_site_settings etc.) never set this explicitly, so they default to
// published = true and behave exactly as before.
export async function getMergedContent<T = Record<string, unknown>>(slug: string): Promise<T> {
  const base = getDefaultContent(slug) ?? {}
  try {
    const { data, error } = await supabase.from('marketing_content').select('data, published').eq('slug', slug).maybeSingle()
    if (error || !data || data.published === false) return base as T
    return deepMerge(base, data.data) as T
  } catch {
    return base as T
  }
}

// Back-compat for the 4 pages already wired to a narrow override shape —
// still works, deepMerge treats a partial object the same way. Same
// published check as getMergedContent, for the same reason.
export async function getContentOverride<T>(slug: string): Promise<T | null> {
  try {
    const { data, error } = await supabase.from('marketing_content').select('data, published').eq('slug', slug).maybeSingle()
    if (error || !data || data.published === false) return null
    return data.data as T
  } catch {
    return null
  }
}

// SEO title/description, editable from the admin's per-page editor. Stored
// under the same marketing_content row as the page's content, in a
// reserved `__seo` key — no new table, and the admin's existing
// fetch/save plumbing (read the row, edit the object, upsert it back)
// already covers this for free. Falls back to whatever the page passes
// in (its hardcoded default) when there's no override or the field is
// blank, so a page is never left with an empty <title>. A draft
// (published = false) page's SEO override stays hidden too, same as
// its content — its metadata shouldn't leak out before the rest does.
export type SeoOverride = { title?: string; description?: string }
export async function getSeoOverride(slug: string): Promise<SeoOverride | null> {
  try {
    const { data, error } = await supabase.from('marketing_content').select('data, published').eq('slug', slug).maybeSingle()
    if (error || !data || data.published === false) return null
    return (data.data as { __seo?: SeoOverride })?.__seo ?? null
  } catch {
    return null
  }
}

// Every page's own title — the seo override above, or its hardcoded
// default — already writes "MatjarX" into the string itself for most
// pages (it's the natural way to write "Website Pricing Plans |
// MatjarX"). The root layout's own title.template ALSO appends "·
// MatjarX" to every plain-string title it receives, on top of
// whatever the page already wrote — so a page authored the normal way
// rendered as "Website Pricing Plans | MatjarX · MatjarX" sitewide.
// Every generateMetadata() should wrap its title with this: it returns
// an absolute title (bypasses the template entirely) when the string
// already mentions MatjarX, and a plain string (the template appends
// the brand for pages that never mention it themselves — the
// unbranded hardcoded default case) otherwise. Branded exactly once,
// regardless of which of the two ways the title got written.
/**
 * Trim a meta description to something Google will actually show.
 *
 * Three pages were over: /legal/terms at 443 characters (it was using
 * the document's whole intro paragraph), /alternatives at 173 and the
 * website audit at 169. Cut on a word boundary and end with an ellipsis
 * rather than mid-word.
 */
export function pageDescription(raw: string | undefined | null, limit = 158): string | undefined {
  if (!raw) return undefined
  const text = raw.replace(/\s+/g, ' ').trim()
  if (text.length <= limit) return text
  const cut = text.slice(0, limit)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\u2014-]+$/, '') + '\u2026'
}

/** Google truncates a title at roughly 600px, which is about 60 characters. */
const TITLE_BUDGET = 60

export function pageTitle(raw: string | undefined | null): import('next').Metadata['title'] {
  if (!raw) return undefined // no override and no hardcoded default — let the parent's own default show
  if (/matjarx/i.test(raw)) return { absolute: raw }
  // The root layout's template appends " | MatjarX", ten characters that
  // are worth having on a short title and not worth losing the end of a
  // sentence for. Twelve blog posts were running to 69–82 characters,
  // where Google truncates at roughly 60 and then writes its own title
  // from the page instead. Over budget, the brand suffix is dropped.
  //
  // This is a backstop, not the fix. A post whose own title is 70
  // characters is still too long, and the admin's per-page SEO title is
  // where that gets solved properly.
  return raw.length + ' | MatjarX'.length > TITLE_BUDGET ? { absolute: raw } : raw
}

// Site-wide settings — GA4/Meta Pixel IDs, social links, contact email,
// default title/description — editable from the admin's Marketing Site >
// Settings tab. Stored under the same marketing_content table as every
// page, in one reserved slug (not a real page, so deliberately left out
// of content-schema's page list). `socials` is keyed by FOOTER_SOCIALS'
// own `name` field (see nav.ts) — only the href is overridable, not the
// icon or which platforms exist. Every field falls back to today's
// hardcoded value (in layout.tsx / SiteFooter.tsx) when blank or when
// this row doesn't exist yet, so nothing regresses on day one.
export const SITE_SETTINGS_SLUG = '_site_settings'
export type SiteSettings = {
  ga_measurement_id?: string
  meta_pixel_id?: string
  contact_email?: string
  default_title?: string
  default_description?: string
  socials?: Record<string, string>
}

// Announcement bar + popup — two independent widgets, each with its own
// on/off toggle, optional schedule window, and content. Same reserved-slug
// pattern as site settings: no new tables, just two more marketing_content
// rows, read via getMergedContent and rendered from the root layout (which
// already awaits it server-side, so — unlike SiteFooter's socials — these
// don't need a public API route of their own).
export const ANNOUNCEMENT_BAR_SLUG = '_announcement_bar'
export const POPUP_SLUG = '_popup'

/**
 * The six-stop brand gradient the strip has always used. Lives here
 * rather than in the component because it is also the seed value stored
 * in `bg_color`, and the admin offers it as a preset.
 */
export const BRAND_GRADIENT =
  'linear-gradient(90deg, #003366 0%, #2E6EA8 20%, #696D34 42%, #C9A227 60%, #C4262E 80%, #7A2E6B 100%)'

export type AnnouncementBarConfig = {
  enabled?: boolean
  /** The pill on the left, with the butter-coloured dot. */
  badge_text?: string
  text?: string
  link_text?: string
  link_url?: string
  bg_color?: string
  text_color?: string
  dismissible?: boolean
  start_date?: string
  end_date?: string
}

export type PopupConfig = {
  enabled?: boolean
  heading?: string
  body?: string
  image_url?: string
  image_alt?: string
  cta_text?: string
  cta_url?: string
  trigger?: 'load' | 'delay' | 'exit_intent'
  delay_seconds?: number
  frequency_days?: number
  start_date?: string
  end_date?: string
}

// Shared by both widgets: enabled, and (if set) today falls within
// start_date/end_date. No date set on either end means no bound on that
// side — e.g. only an end_date means "active until then", only a
// start_date means "active from then on".
/**
 * Exactly the strip that was hardcoded in SiteHeader before the two
 * copies were merged, so an empty or missing `_announcement_bar` row
 * renders the site the way it has always rendered. `enabled: true` for
 * the same reason -- the bar is part of the design, not a campaign
 * someone has to switch on.
 */
export const DEFAULT_ANNOUNCEMENT: AnnouncementBarConfig = {
  enabled: true,
  badge_text: 'Get 49% discount on sign up now',
  text: 'Go digital with 100,000 business in 2026',
  bg_color: BRAND_GRADIENT,
  text_color: '#FFFFFF',
  dismissible: false,
}

export function isWidgetActive(config: { enabled?: boolean; start_date?: string; end_date?: string }): boolean {
  if (!config.enabled) return false
  const today = new Date().toISOString().slice(0, 10)
  if (config.start_date && today < config.start_date) return false
  if (config.end_date && today > config.end_date) return false
  return true
}

// Real blog CRUD, backed by its own table (not the marketing_content
// override mechanism — a create/edit/delete editor needs an actual list
// to add to and remove from, which a single per-slug override row can't
// give it). BLOG_POSTS (blog-data.ts) is the seed data and the fallback
// if this table is ever empty or unreachable — same resilience
// philosophy as every reserved-slug row above, just via a real table
// instead. Column names are snake_case in the DB; these two functions
// map back to BlogPost's existing camelCase shape so nothing downstream
// (BlogContent, BlogPostContent, generateMetadata, JSON-LD) needs to
// know the difference.
type BlogPostRow = {
  slug: string
  title: string
  category: string
  excerpt: string
  date: string
  read_time: string
  tint: string
  layout: string | null
  body: unknown
  related_slugs: string[]
  // title/caption/description are real, populated columns inside this
  // JSON blob for 27 of the 28 posts. They were reaching the page only
  // because the object is passed through whole -- TypeScript could not
  // see them, so nothing could safely read one.
  cover_image: { src: string; alt: string; title?: string; caption?: string; description?: string; width: number; height: number } | null
  /** Added later; a row written before the migration has it as null. */
  author?: BlogAuthor | null
  /** Points at marketing_blog_authors.slug. */
  author_slug?: string | null
}

function rowToBlogPost(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category as BlogPost['category'],
    excerpt: row.excerpt,
    date: row.date,
    readTime: row.read_time,
    tint: row.tint,
    layout: row.layout ?? undefined,
    body: row.body as BlogPost['body'],
    relatedSlugs: row.related_slugs || [],
    coverImage: row.cover_image || undefined,
    author: row.author || undefined,
    authorSlug: row.author_slug || undefined,
  }
}

type AuthorRow = {
  slug: string
  name: string
  role: string | null
  bio: string | null
  avatar_url: string | null
  url: string | null
  socials: Record<string, string> | null
}

/**
 * Everyone who writes the blog.
 *
 * Its own table rather than a field on the post, so editing a person updates
 * every post they wrote and an author page has a stable identity to be built
 * around. Returns [] when the table is not there yet -- the same tolerance
 * the column fallback above exists for, since the marketing site and the
 * migration deploy independently of each other.
 */
export async function getBlogAuthors(): Promise<BlogAuthor[]> {
  try {
    const { data, error } = await supabase
      .from('marketing_blog_authors')
      .select('slug, name, role, bio, avatar_url, url, socials')
      .order('name')
    if (error || !data) return []
    return (data as AuthorRow[]).map((a) => ({
      slug: a.slug,
      name: a.name,
      role: a.role || undefined,
      bio: a.bio || undefined,
      avatarUrl: a.avatar_url || undefined,
      url: a.url || undefined,
      socials: (a.socials as Record<string, string>) || undefined,
    }))
  } catch {
    return []
  }
}

/** One author, or null when the slug matches nobody. */
export async function getBlogAuthor(slug: string): Promise<BlogAuthor | null> {
  const all = await getBlogAuthors()
  return all.find((a) => a.slug === slug) || null
}

/**
 * Attach the author row each post points at.
 *
 * The post's own `author` blob still wins when there is no author_slug, so
 * anything written before the table existed keeps the byline it was given.
 */
export function withAuthors(posts: BlogPost[], authors: BlogAuthor[]): BlogPost[] {
  if (authors.length === 0) return posts
  const bySlug = new Map(authors.map((a) => [a.slug, a]))
  return posts.map((p) => {
    const resolved = p.authorSlug ? bySlug.get(p.authorSlug) : undefined
    return resolved ? { ...p, author: resolved } : p
  })
}

// The columns a post is built from, and the same list minus `author`.
//
// `author` is a later addition. Selecting a column that does not exist
// yet is a hard error in PostgREST, and every one of these reads falls
// back to the static BLOG_POSTS array on error -- so a deploy that
// landed before the migration would quietly serve 28 stale posts and
// look like it was working. Retrying without the column keeps the two
// independent of each other in either order.
const BLOG_COLUMNS_BASE = 'slug, title, category, excerpt, date, read_time, tint, body, related_slugs, cover_image'
const BLOG_COLUMNS = `${BLOG_COLUMNS_BASE}, author, author_slug, layout`
// Without `layout`, for an environment where that column has not been added
// yet. Naming a column PostgREST does not know fails the ENTIRE select and
// returns zero rows -- which on this site means silently falling back to the
// hardcoded post array, looking exactly like a database with no posts in it.
const BLOG_COLUMNS_NO_LAYOUT = `${BLOG_COLUMNS_BASE}, author, author_slug`
// Spelled out rather than derived by stripping: String.replace takes only the
// first match, so removing ', author' from a list containing both would have
// left ', author_slug' behind and failed for the exact reason the fallback
// exists.
const BLOG_COLUMNS_LEGACY = BLOG_COLUMNS_BASE

/** True when PostgREST rejected the query because `author` is not there yet. */
function isMissingAuthorColumn(error: { message?: string; code?: string } | null): boolean {
  if (!error) return false
  return error.code === '42703' || /author/i.test(error.message || '')
}

/** True when it rejected because `layout` is not there yet. Checked BEFORE
 *  the author fallback, so a missing `layout` does not get mistaken for a
 *  missing `author` and drop the byline as well. */
function isMissingLayoutColumn(error: { message?: string; code?: string } | null): boolean {
  if (!error) return false
  return error.code === '42703' && /layout/i.test(error.message || '')
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Ordered by created_at, not the `date` column — `date` is a
    // free-form display string ("1 Sep 2026"), not a real date type, so
    // sorting on it alphabetically scrambles the actual chronological
    // order (e.g. "9 Jun 2026" sorts before "8 Aug 2026"). The 28 seeded
    // posts had created_at backfilled to match their real authored date
    // one time at seed; a post created through the admin from here on
    // gets a real created_at of "now" automatically, so it correctly
    // sorts to the top without needing the same backfill again.
    const query = (columns: string) =>
      supabase
        .from('marketing_blog_posts')
        .select(columns)
        .eq('published', true)
        .order('created_at', { ascending: false })

    let { data, error } = await query(BLOG_COLUMNS)
    if (isMissingLayoutColumn(error)) ({ data, error } = await query(BLOG_COLUMNS_NO_LAYOUT))
    if (isMissingAuthorColumn(error)) ({ data, error } = await query(BLOG_COLUMNS_LEGACY))
    if (error || !data || data.length === 0) return BLOG_POSTS
    // Resolved here rather than at the call sites, because every consumer
    // needs it and only one of them would have remembered: the post page
    // builds its BlogPosting author from post.author, so a post with an
    // author picked but no legacy blob would have published the house
    // byline while the admin showed a named writer.
    return withAuthors((data as unknown as BlogPostRow[]).map(rowToBlogPost), await getBlogAuthors())
  } catch {
    return BLOG_POSTS
  }
}

/**
 * A post with its body removed.
 *
 * BlogContent and the "Keep reading" cards are CLIENT components, so
 * every prop they receive is serialised into the RSC payload embedded in
 * the HTML. Neither reads `body`, and handing them the full list shipped
 * all 28 articles' complete text to anyone who opened the index: 449 KB
 * of HTML for a page of 28 cards.
 */
export type BlogCard = Omit<BlogPost, 'body'> & { body: [] }

export function toCard(p: BlogPost): BlogCard {
  return { ...p, body: [] }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const query = (columns: string) =>
      supabase
        .from('marketing_blog_posts')
        .select(columns)
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle()

    let { data, error } = await query(BLOG_COLUMNS)
    if (isMissingLayoutColumn(error)) ({ data, error } = await query(BLOG_COLUMNS_NO_LAYOUT))
    if (isMissingAuthorColumn(error)) ({ data, error } = await query(BLOG_COLUMNS_LEGACY))
    if (error || !data) return BLOG_POSTS.find((p) => p.slug === slug) || null
    // Same resolution as getBlogPosts -- this is the page that publishes the
    // BlogPosting author, so it is the one that must not miss it.
    const [post] = withAuthors([rowToBlogPost(data as unknown as BlogPostRow)], await getBlogAuthors())
    return post
  } catch {
    return BLOG_POSTS.find((p) => p.slug === slug) || null
  }
}

export type Testimonial = { quote: string; name: string; company: string; initials: string; tint: string }
export type QA = { q: string; a: string }
// Removed: FaqEntry, which nothing ever imported — the FAQ shapes in use
// are QA above and SchemaFaq in FaqSchema.tsx. Also removed: PlanCopyOverride, PricingOverride, PlanPageOverride,
// HomeOverride, FeaturesOverride and MarketingContentSlug. They were the
// first, narrow shape of the override system — a curated subset of
// fields per page — and were superseded by the full-content shapes
// below, which cover every field getDefaultContent() returns. Nothing in
// this repo or in the admin had referenced any of them since.

// Full-content shapes — every field of that page's default content is
// covered (not a curated subset), matching what getDefaultContent()
// returns for that slug.
export type PricingContentShape = {
  heroTicks: string[]
  testimonials: typeof DEFAULT_TESTIMONIALS
  howToChoose: typeof DEFAULT_HOW_TO_CHOOSE
  faqs: typeof PRICING_FAQS
  compareGroups: typeof COMPARE_GROUPS
  plans: typeof DEFAULT_PLAN_ROWS
  tierIcons: typeof PLAN_TIER_ICONS
}
export type HomeContentShape = { faqs: typeof HOME_FAQS; voices: typeof VOICES }
export type FeaturesContentShape = { groups: typeof FEATURE_GROUPS; alwaysOn: typeof ALWAYS_ON; faqs: typeof FEATURES_FAQ }
export type PlanContentShape = (typeof ALL_PLANS)[PlanKey] & (typeof PLAN_DATA)[PlanKey] & { detail: unknown }
