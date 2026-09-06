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
import { BLOG_POSTS } from './blog-data'
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
import { HERO as TEMPLATES_HERO, WHY_TEMPLATES, TEMPLATE_FEATURES, CATEGORIES as TEMPLATE_CATEGORIES, TEMPLATE_FAQS } from './templates-data'
import { HERO as VIDEOS_HERO, VIDEO_SECTIONS, VIDEO_FAQS } from './videos-data'
import { HERO as AUDIT_HERO, AUDIT_AREAS, PROCESS_STEPS as AUDIT_PROCESS, AUDIT_FAQS } from './website-audit-data'
import { EXAMPLES, EXAMPLE_CATEGORIES, EXAMPLE_PILLARS } from './examples-data'
import { HERO_STATS, PLATFORM_PROFILES, BEST_BUILDER_FAQS } from './best-builder-data'
import { HERO as ALT_HERO, GROUPS as ALT_GROUPS, WHY_COMPARE } from './alternatives-data'
import { THANK_YOU_STEPS, THANK_YOU_LINKS } from './thank-you-data'
import { DEFAULT_HERO_TICKS, COMPARE_GROUPS, DEFAULT_TESTIMONIALS, DEFAULT_HOW_TO_CHOOSE, DEFAULT_FAQ_DATA as PRICING_FAQS, DEFAULT_PLAN_ROWS } from '@/components/pricing/PricingContent'
import { DEFAULT_FAQ_DATA as HOME_FAQS } from '@/components/home/HomeContent'

export type MarketingContentSlug = string

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
    case 'home':
      return { faqs: HOME_FAQS }
    case 'pricing':
      return { heroTicks: DEFAULT_HERO_TICKS, testimonials: DEFAULT_TESTIMONIALS, howToChoose: DEFAULT_HOW_TO_CHOOSE, faqs: PRICING_FAQS, compareGroups: COMPARE_GROUPS, plans: DEFAULT_PLAN_ROWS }
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
      return { tiers: PARTNER_TIERS, steps: PARTNER_STEPS }
    case 'templates':
      return { hero: TEMPLATES_HERO, why: WHY_TEMPLATES, features: TEMPLATE_FEATURES, categories: TEMPLATE_CATEGORIES, faqs: TEMPLATE_FAQS }
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
export async function getMergedContent<T = Record<string, unknown>>(slug: string): Promise<T> {
  const base = getDefaultContent(slug) ?? {}
  try {
    const { data, error } = await supabase.from('marketing_content').select('data').eq('slug', slug).maybeSingle()
    if (error || !data) return base as T
    return deepMerge(base, data.data) as T
  } catch {
    return base as T
  }
}

// Back-compat for the 4 pages already wired to a narrow override shape —
// still works, deepMerge treats a partial object the same way.
export async function getContentOverride<T>(slug: string): Promise<T | null> {
  try {
    const { data, error } = await supabase.from('marketing_content').select('data').eq('slug', slug).maybeSingle()
    if (error || !data) return null
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
// blank, so a page is never left with an empty <title>.
export type SeoOverride = { title?: string; description?: string }
export async function getSeoOverride(slug: string): Promise<SeoOverride | null> {
  try {
    const { data, error } = await supabase.from('marketing_content').select('data').eq('slug', slug).maybeSingle()
    if (error || !data) return null
    return (data.data as { __seo?: SeoOverride })?.__seo ?? null
  } catch {
    return null
  }
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

export type Testimonial = { quote: string; name: string; company: string; initials: string; tint: string }
export type QA = { q: string; a: string }
export type FaqEntry = { question: string; answer: string }
export type PlanCopyOverride = { pitch?: string; why?: string; bestFor?: string; features?: string[] }

export type PricingOverride = {
  heroTicks?: string[]
  testimonials?: Testimonial[]
  howToChoose?: QA[]
  faqs?: FaqEntry[]
  plans?: Partial<Record<'Launch' | 'Boost' | 'Growth' | 'Platinum', PlanCopyOverride>>
}

export type PlanPageOverride = {
  headline?: string
  subhead?: string
  ctaLabel?: string
  heroTicks?: string[]
  faqs?: [string, string][]
}

export type HomeOverride = { faqs?: FaqEntry[] }
export type FeaturesOverride = { faqs?: [string, string][] }

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
}
export type HomeContentShape = { faqs: typeof HOME_FAQS }
export type FeaturesContentShape = { groups: typeof FEATURE_GROUPS; alwaysOn: typeof ALWAYS_ON; faqs: typeof FEATURES_FAQ }
export type PlanContentShape = (typeof ALL_PLANS)[PlanKey] & (typeof PLAN_DATA)[PlanKey] & { detail: unknown }
