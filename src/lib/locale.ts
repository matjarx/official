// Which language a request is for.
//
// ── Why middleware and not app/[locale]/ ────────────────────────────────
//
// The obvious Next shape is to move every route under a [locale] segment.
// This site has 105 top-level route directories, and English is to stay
// exactly where it is with no redirects -- so that refactor would move 105
// directories to change nothing for the language that carries all the
// current rankings.
//
// Instead middleware REWRITES /ar/pricing to /pricing and records the
// locale in a header. The English tree is untouched; the Arabic URL renders
// the same route with a different locale in scope. No duplicated pages, and
// a page added tomorrow gets its locales for free.
//
// ── Untranslated pages must not be indexed ──────────────────────────────
//
// Until a page's strings exist in a locale, /ar/<path> renders ENGLISH. That
// is useful for building and fatal for SEO: it would publish 412 duplicate
// English URLs. So a locale route is `noindex` until its catalogue says
// otherwise, and hreflang only lists locales that are actually translated.

export const LOCALES = ['en', 'ar', 'ur'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/** Right-to-left scripts. Arabic and Urdu both are. */
const RTL: ReadonlySet<Locale> = new Set<Locale>(['ar', 'ur'])

export function isLocale(v: string | null | undefined): v is Locale {
  return !!v && (LOCALES as readonly string[]).includes(v)
}

export function dirFor(locale: Locale): 'ltr' | 'rtl' {
  return RTL.has(locale) ? 'rtl' : 'ltr'
}

/** The header the proxy sets, and every server component reads. */
export const LOCALE_HEADER = 'x-matjarx-locale'

/** What a person sees in the switcher, in their own language. */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  ur: 'اردو',
}

/**
 * Split a pathname into its locale and the path underneath.
 *
 *   /ar/pricing -> { locale: 'ar', path: '/pricing' }
 *   /pricing    -> { locale: 'en', path: '/pricing' }
 *
 * English has no prefix, because it keeps the URLs it already ranks for.
 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const m = /^\/([a-z]{2})(\/.*)?$/.exec(pathname)
  if (m && isLocale(m[1]) && m[1] !== 'en') {
    return { locale: m[1], path: m[2] || '/' }
  }
  return { locale: DEFAULT_LOCALE, path: pathname }
}

/** The URL for a path in a given locale. English keeps the bare path. */
export function localeHref(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

/**
 * Which locales a given path is actually translated into.
 *
 * Returns only `en` today. hreflang must list a locale ONLY when that URL
 * genuinely serves that language -- a reciprocal tag pointing at an English
 * page claiming to be Arabic is worse than no tag, because Google trusts it
 * and shows the wrong page to the wrong person.
 *
 * Wired to the translation catalogue as sections are delivered -- which is
 * why the parameter is here and unused: every caller already passes the path
 * it is asking about, so turning this on is a change to THIS function alone,
 * not to the dozen call sites.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function translatedLocales(path: string): Locale[] {
  return ['en']
}

/**
 * The hreflang set for one path, as Next's `alternates.languages`.
 *
 * Returns undefined when only one locale is translated. A single
 * self-referential hreflang says nothing, and an entry pointing at an
 * English page while claiming to be Arabic is worse than no entry at all:
 * Google trusts it and shows the wrong page to the wrong person.
 *
 * x-default goes to English, which is the page to serve someone whose
 * language we do not publish.
 */
export function hreflangFor(path: string, base: string): Record<string, string> | undefined {
  const locales = translatedLocales(path)
  if (locales.length < 2) return undefined
  const out: Record<string, string> = {}
  for (const l of locales) out[l] = `${base}${localeHref(path, l)}`
  out['x-default'] = `${base}${localeHref(path, DEFAULT_LOCALE)}`
  return out
}
