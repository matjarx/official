// The real themes, read from the platform's own `themes` table.
//
// SERVER ONLY in practice — it uses the shared anon client, which can
// read this table, but every caller is a server component so the list is
// rendered into the HTML rather than fetched in the browser.
//
// ── Why live data and not a hardcoded list ───────────────────────────
// /templates used to describe twelve generic "template categories" —
// Small Business, Service Business, E-Commerce, Blog — written before
// any theme existed. None of them corresponded to anything a visitor
// could be shown or a client could pick. The themes are real now, they
// carry their own industries, colours and demo sites, and a list that
// goes stale the moment someone adds a theme is worse than no list.
//
// ── The industry strings are a mess, on purpose ──────────────────────
// `themes.industries` is free-form and has accumulated three shapes:
// title case ("Food & Beverage"), lowercase slugs ("florist", "gifts"),
// and the literal "all" for themes that suit any trade. Normalising
// happens here rather than in the database, because the admin writes
// these by hand and a migration would just let them drift again.

import { supabase } from './supabase'

export type Theme = {
  id: number
  name: string
  description: string
  /** Title-cased industries, "all" removed. Empty means it suits anything. */
  industries: string[]
  category: string | null
  comingSoon: boolean
  /** Live demo we can put in an iframe, or null. */
  demoUrl: string | null
  previewImageUrl: string | null
  primaryColor: string | null
  secondaryColor: string | null
  /** `sports-shoes-matjar`, used in the ?<slug>-website-template link. */
  slug: string
}

type ThemeRow = {
  id: number
  name: string | null
  description: string | null
  industries: string[] | null
  category: string | null
  coming_soon: boolean | null
  demo_site_id: number | null
  preview_image_url: string | null
  primary_color: string | null
  secondary_color: string | null
}

const APP_URL = 'https://app.matjarx.com'

function themeSlug(name: string): string {
  return name
    .normalize('NFD')
    // Strip the combining marks rather than the letters they sit on:
    // without this "Bakery & Café" slugs to `bakery-and-caf`, losing the
    // e entirely, and the URL reads like a typo.
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** The query-string key a theme's preview opens under. */
export function templateParam(slug: string): string {
  return `${slug}-website-template`
}

/** "Food & Beverage" and "florist" both come out as "Food & Beverage"-ish. */
function titleCase(s: string): string {
  return s
    .split(/\s+/)
    .map((w) => (w.length <= 2 && w === w.toLowerCase() ? w : w[0].toUpperCase() + w.slice(1)))
    .join(' ')
}

function normaliseIndustries(raw: string[] | null): string[] {
  if (!raw) return []
  const out = new Set<string>()
  for (const v of raw) {
    const t = (v || '').trim()
    // "all" is not an industry, it is the absence of one. A theme tagged
    // with it belongs under every industry, which the caller handles.
    if (!t || t.toLowerCase() === 'all') continue
    out.add(titleCase(t))
  }
  return [...out]
}

export async function getThemes(): Promise<Theme[]> {
  try {
    const { data, error } = await supabase
      .from('themes')
      .select('id, name, description, industries, category, coming_soon, demo_site_id, preview_image_url, primary_color, secondary_color')
      .order('coming_soon', { ascending: true })
      .order('id', { ascending: true })
    if (error || !data) return []

    const rows = data as unknown as ThemeRow[]

    // A demo_site_id is not enough, on two counts.
    //
    // An unpublished demo 404s for a stranger — deliberately; that
    // lock-down is why unfinished client sites are not readable — and an
    // iframe of a 404 is worse than no iframe.
    //
    // And a published demo can still be an empty shell. Every one of the
    // six demo sites currently linked from `themes` has zero pages and
    // zero sections, so the storefront renders its own "No pages found"
    // screen. Framing that is worse than saying there is no demo: it
    // reads as a broken template rather than an unfinished one.
    //
    // `pages` is not readable with the anon key, so the count cannot be
    // checked from here. `sections` is what the storefront actually
    // renders, and a site with none has nothing to show.
    const ids = rows.map((r) => r.demo_site_id).filter((id): id is number => typeof id === 'number')
    const demos = new Map<number, string>()
    if (ids.length > 0) {
      const [{ data: sites }, { data: sections }] = await Promise.all([
        supabase.from('sites').select('id, subdomain, published').in('id', ids),
        supabase.from('sections').select('site_id').in('site_id', ids),
      ])
      const hasContent = new Set((sections || []).map((s) => (s as { site_id: number }).site_id))
      for (const s of (sites || []) as { id: number; subdomain: string; published: unknown }[]) {
        if (String(s.published) === 'true' && s.subdomain && hasContent.has(s.id)) demos.set(s.id, s.subdomain)
      }
    }

    return rows
      .filter((r) => !!r.name)
      .map((r) => {
        const subdomain = r.demo_site_id ? demos.get(r.demo_site_id) : undefined
        return {
          id: r.id,
          name: r.name as string,
          description: r.description || '',
          industries: normaliseIndustries(r.industries),
          category: r.category,
          comingSoon: !!r.coming_soon,
          demoUrl: subdomain ? `${APP_URL}/site/${subdomain}/` : null,
          previewImageUrl: r.preview_image_url,
          primaryColor: r.primary_color,
          secondaryColor: r.secondary_color,
          slug: themeSlug(r.name as string),
        }
      })
  } catch {
    return []
  }
}

export type IndustryGroup = { industry: string; themes: Theme[] }

/**
 * Themes grouped by industry, biggest group first.
 *
 * A theme with no industries suits every trade, so it is appended to
 * each group rather than hidden in an "Other" bucket nobody opens —
 * "MatjarX Classic" is a perfectly good answer to "what have you got for
 * a law firm", and it is the ONLY answer for most industries today.
 */
export function groupByIndustry(themes: Theme[]): IndustryGroup[] {
  const universal = themes.filter((t) => t.industries.length === 0)
  const groups = new Map<string, Theme[]>()
  for (const t of themes) {
    for (const ind of t.industries) {
      if (!groups.has(ind)) groups.set(ind, [])
      groups.get(ind)!.push(t)
    }
  }
  const out = [...groups.entries()]
    .map(([industry, list]) => ({ industry, themes: [...list, ...universal] }))
    .sort((a, b) => b.themes.length - a.themes.length || a.industry.localeCompare(b.industry))

  // Nothing tagged at all: one honest group rather than an empty page.
  if (out.length === 0 && universal.length > 0) {
    return [{ industry: 'Every business', themes: universal }]
  }
  return out
}
