'use client'

// The language switcher.
//
// ── Why it reads window.location and not usePathname() ─────────────────
//
// The locale is applied by a REWRITE in src/proxy.ts, so /ar/pricing renders
// the /pricing route. usePathname() reports the route Next is rendering, not
// the URL in the address bar -- it would say /pricing on an Arabic page, and
// the switcher would offer to move you to the language you are already in.
// window.location.pathname is the one thing that is always the real URL.
//
// That makes this client-only, hence the mount guard: the server cannot know
// the browser URL. No layout shift from it, because the switcher occupies no
// space until there is a second language to switch to.
//
// ── Why it can render nothing ──────────────────────────────────────────
//
// It offers only the locales translatedLocales() reports for THIS path. Until
// a page's Arabic strings exist, /ar/<path> renders English -- and a control
// labelled العربية that lands you on an English page is worse than no control,
// because it looks like the translation is broken rather than absent. One
// language means no switcher.
//
// Each link goes to the equivalent URL, not the locale's homepage: someone
// reading /pricing who switches language wants the Arabic pricing page.

import { useSyncExternalStore } from 'react'
import { LOCALE_LABEL, localeHref, splitLocale, translatedLocales } from '@/lib/locale'

export default function LanguageSwitcher({ style }: { style?: React.CSSProperties }) {
  // useSyncExternalStore, not useState + useEffect: this reads a value only
  // the browser has (the real URL), and React's own way to do that without a
  // hydration mismatch is a store with a separate server snapshot.
  //
  // The subscribe function never fires because the value cannot change while
  // the page lives -- switching language is a full page load, by design (see
  // the <a> below). The server snapshot is null, so nothing is rendered
  // until hydration, which is also what we want: the switcher occupies no
  // space and there is no layout shift when it appears.
  const pathname = useSyncExternalStore(
    () => () => {},
    () => window.location.pathname,
    () => null
  )

  if (!pathname) return null
  const here = splitLocale(pathname)
  const locales = translatedLocales(here.path)
  if (locales.length < 2) return null

  return (
    <nav aria-label="Language" style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
      {locales.map((l) =>
        l === here.locale ? (
          // The current language is named, not linked. A link to the page you
          // are on is noise for everyone and a trap for a screen reader.
          <span key={l} aria-current="true" style={{ fontSize: 12.5, color: 'rgba(var(--ink-inverse-rgb), 0.95)', fontWeight: 600 }}>
            {LOCALE_LABEL[l]}
          </span>
        ) : (
          // A plain <a>, not next/link: switching language changes <html lang>
          // and <html dir>, which a client-side navigation does not re-render.
          // A full load is the correct behaviour here, not a missed
          // optimisation.
          <a
            key={l}
            href={localeHref(here.path, l)}
            hrefLang={l}
            lang={l}
            className="footer-link footer-link-tap"
            style={{ fontSize: 12.5, color: 'rgba(var(--ink-inverse-rgb), 0.72)' }}
          >
            {LOCALE_LABEL[l]}
          </a>
        )
      )}
    </nav>
  )
}
