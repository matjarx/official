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
import { THEME_LANDINGS } from './theme-landing-data'

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
  /** The theme's own landing page on this site, when it has one. */
  landingHref: string | null
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
  structure_key?: string | null
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

/**
 * The theme's landing page, by structure_key.
 *
 * Derived from THEME_LANDINGS so the two cannot drift: a theme with no
 * landing page (Coffee and MatjarX Classic, which have no content yet)
 * returns null and the card keeps opening the modal instead.
 */
function landingHrefFor(structureKey: string | null | undefined): string | null {
  if (!structureKey) return null
  const match = THEME_LANDINGS.find((l) => l.themeKey === structureKey)
  return match ? `/templates/${match.slug}` : null
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
      .select('id, name, description, industries, category, coming_soon, demo_site_id, preview_image_url, primary_color, secondary_color, structure_key')
      // Templates only — never a client's private clone.
      //
      // Picking a theme clones it into a private row for that site, so the
      // client can recolour it without changing anyone else's. Those rows
      // live in the same table, and nothing here excluded them: the public
      // /templates page was listing two of them already, both called "Pet
      // Store Matjar" because a clone is named after its template, which
      // is why it read as duplicate cards rather than as a leak. It grows
      // by one per signup, and the moment a client renames their theme
      // their name appears on matjarx.com.
      .is('cloned_from_theme_id', null)
      .order('coming_soon', { ascending: true })
      .order('id', { ascending: true })
    if (error || !data) return []

    const rows = data as unknown as ThemeRow[]

    // The demo-site lookup that used to live here is gone with the link it
    // fed: two extra Supabase round trips per render, building a Map that
    // nothing reads any more. Its comment already explained that an
    // unpublished demo 404s and a published one can still be an empty
    // shell -- both true, both measured, and both now moot because the
    // link points at the theme's own pages instead.

    return rows
      .filter((r) => !!r.name)
      .map((r) => {
        return {
          id: r.id,
          name: r.name as string,
          description: r.description || '',
          industries: normaliseIndustries(r.industries),
          category: r.category,
          comingSoon: !!r.coming_soon,
          // The theme's own pages, not its demo site.
          //
          // This comment already said demo_site_id points at an empty
          // shell -- and the line under it linked one anyway. Measured on
          // production: of seven themes with a demo site, TWO returned 404
          // (the unpublished ones) and FOUR rendered "No pages found".
          // One worked. The comment had been right and the code had not
          // caught up.
          //
          // /themes/<structure_key> renders the theme's real pages and
          // returns 200 for all ten. It is also what the landing pages
          // already frame, so the modal and the landing page now show the
          // same thing.
          demoUrl: r.structure_key ? `${APP_URL}/themes/${r.structure_key}` : null,
          landingHref: landingHrefFor(r.structure_key),
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
