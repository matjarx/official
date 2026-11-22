// Server-side data for the homepage: the ticker's lead announcement, the
// four templates in the showcase, and whether the live phone previews are
// serving.
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { TickerItem } from './Chrome'
import type { ShowcaseItem } from './TemplatesShowcase'
import { getThemes } from '@/lib/theme-catalogue'
import { TEMPLATE_PREVIEWS } from '@/lib/templates-data'
import { getMergedContent, isWidgetActive, ANNOUNCEMENT_BAR_SLUG, type AnnouncementBarConfig } from '@/lib/marketing-content'

// The admin's announcement, as the ticker's lead item. Same source and the
// same on/off/date rules as the sitewide bar it replaces on this page.
export async function announcement(): Promise<TickerItem | null> {
  try {
    const c = await getMergedContent<AnnouncementBarConfig>(ANNOUNCEMENT_BAR_SLUG)
    if (!isWidgetActive(c) || !c.text) return null
    return { badge: c.badge_text || undefined, t: c.text.replace(/[:\s]+$/, ''), cta: c.link_text || undefined, href: c.link_url || undefined }
  } catch {
    return null
  }
}

const PLAN: Record<string, string> = { launch: 'Launch', boost: 'Boost', growth: 'Growth', platinum: 'Platinum' }

export async function showcase(): Promise<ShowcaseItem[]> {
  try {
    const themes = (await getThemes()).filter((t) => t.previewImageUrl && !t.comingSoon).slice(0, 4)
    if (themes.length >= 3) {
      return themes.map((t) => ({
        name: t.name,
        blurb: t.description,
        tags: t.industries,
        img: t.previewImageUrl as string,
        href: t.landingHref || '/templates',
        plan: PLAN[t.minPlan] ?? null,
        // The theme's public preview; ?framed=1 drops its preview banner.
        mobile: t.demoUrl ? `${t.demoUrl}?framed=1` : `${APP_URL}/site/__theme_${t.id}?framed=1`,
        // A captured 390 × 844 screenshot of the theme's live mobile page,
        // when one exists for it: shows instantly where the live site takes
        // ~7 s. Capture new ones into public/home-v2/themes/<id>-mobile.webp.
        mobileShot: existsSync(join(process.cwd(), 'public/home-v2/themes', `${t.id}-mobile.webp`)) ? `/home-v2/themes/${t.id}-mobile.webp` : null,
      }))
    }
  } catch {
    // fall through to the static previews
  }
  return TEMPLATE_PREVIEWS.slice(0, 4).map((t) => ({ name: t.name, blurb: '', tags: [], img: t.src, href: '/templates', plan: null, mobile: null, mobileShot: null }))
}

// The phone previews frame each theme's public preview,
// app.matjarx.com/themes/<key>?framed=1. (From 21 Nov to 23 Nov 2026 that
// route answered "Theme not found" for logged-out visitors, an anon column
// grant having left out themes.cloned_from_theme_id; fixed in Supabase.)
// One is probed (HEAD, cached five minutes) so a broken preview is never
// framed: if it fails, the phone slider keeps showing the screenshot.
const APP_URL = 'https://app.matjarx.com'

export async function previewsLive(items: ShowcaseItem[]): Promise<boolean> {
  const url = items.find((t) => t.mobile)?.mobile
  if (!url) return false
  try {
    const r = await fetch(url, { method: 'HEAD', next: { revalidate: 300 }, signal: AbortSignal.timeout(4000) })
    return r.ok
  } catch {
    return false
  }
}
