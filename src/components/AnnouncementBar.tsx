'use client'

// The strip above the header. Content, colours and schedule come from the
// admin's Marketing Site > Announcements tab.
//
// ── One bar, not two ─────────────────────────────────────────────────
// This markup used to live twice. SiteHeader carried a hardcoded copy --
// the brand gradient, the dotted badge, the divider, the second line --
// and the root layout rendered this component underneath it. So the site
// showed two announcement strips stacked, the admin could only edit the
// lower one, and editing it looked like it had done nothing useful.
//
// The hardcoded strip's design is now this component's design, and
// SiteHeader no longer renders one. Everything the old strip showed is a
// field, and DEFAULT_ANNOUNCEMENT (marketing-content.ts) holds exactly
// the copy that was hardcoded -- so with an empty database row the site
// renders precisely what it rendered before.
//
// ── Dismissal ────────────────────────────────────────────────────────
// Keyed by the announcement's own text, not a flat boolean, so
// publishing a new announcement shows again even to a visitor who
// dismissed the previous one.
//
// ── Why the bar renders on the server and hides in CSS ───────────────
// It used to start `dismissed = true` and flip to false in an effect, to
// avoid a flash for visitors who had dismissed it. That bought the flash
// back in a worse currency:
//
//   * the bar was absent from the server-rendered HTML entirely, so the
//     offer was invisible to anything that does not run React -- every
//     crawler, every preview card, `curl`;
//   * and it appeared after hydration, on every page, pushing the whole
//     document down 40px. A layout shift on first paint, sitewide.
//
// So the bar is server-rendered and a tiny blocking script -- before
// first paint, ahead of React -- marks <html> when storage says this
// exact announcement was dismissed. A stylesheet rule keyed off that
// attribute hides it with no flash and no shift. The effect then syncs
// React's own state so the node actually unmounts.

import { useEffect, useState } from 'react'
import type { AnnouncementBarConfig } from '@/lib/marketing-content'
import { BRAND_GRADIENT } from '@/lib/marketing-content'

const STORAGE_KEY = 'matjarx-announcement-dismissed'
const HIDE_ATTR = 'data-mx-announce-dismissed'

/**
 * Runs before first paint, so it must not depend on anything React has
 * done. Inlined as a string because it has to be synchronous: a deferred
 * or hydration-time check is exactly the flash this replaces.
 */
function hideScript(key: string) {
  return `try{if(localStorage.getItem(${JSON.stringify(STORAGE_KEY)})===${JSON.stringify(key)})document.documentElement.setAttribute(${JSON.stringify(HIDE_ATTR)},'1')}catch(e){}`
}

export default function AnnouncementBar({ config }: { config: AnnouncementBarConfig }) {
  // Starts visible: the pre-paint script below has already hidden it in
  // CSS if this visitor dismissed it, so there is nothing to hide here.
  const [dismissed, setDismissed] = useState(false)

  // Identity for the dismissal, across both lines — changing either one
  // is a new announcement and deserves a fresh showing.
  const key = `${config.badge_text || ''}|${config.text || ''}`

  useEffect(() => {
    // Catch React up with what the pre-paint script decided, so the node
    // is genuinely removed rather than left in the DOM display:none.
    try {
      if (config.dismissible !== false && window.localStorage.getItem(STORAGE_KEY) === key) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDismissed(true)
      }
    } catch {
      // storage unavailable — show it
    }
  }, [key, config.dismissible])

  if ((!config.badge_text && !config.text) || dismissed) return null

  function dismiss() {
    setDismissed(true)
    try {
      window.localStorage.setItem(STORAGE_KEY, key)
    } catch {
      // storage unavailable — the bar just won't remember the dismissal
    }
  }

  // `bg_color` holds any CSS background value, not only a hex — the
  // default is the six-stop brand gradient, and a solid colour picked in
  // the admin is just a shorter string in the same field.
  const background = config.bg_color || BRAND_GRADIENT
  const color = config.text_color || 'var(--ink-inverse)'
  const dismissible = config.dismissible !== false

  return (
    <>
      {/* Only for a bar a visitor is allowed to dismiss. A
          non-dismissible bar has no stored dismissal to honour, and
          hiding it off a stale key from some earlier, identically-worded
          announcement would leave CSS hiding a node React still thinks
          is on screen. */}
      {dismissible && (
        <>
          <style>{`[${HIDE_ATTR}] #mx-announcement-bar{display:none !important}`}</style>
          <script dangerouslySetInnerHTML={{ __html: hideScript(key) }} />
        </>
      )}
      <div
        id="mx-announcement-bar"
        style={{
          background,
          padding: dismissible ? '10px 44px 10px 20px' : '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px 18px',
          flexWrap: 'wrap',
          textAlign: 'center',
          position: 'relative',
          color,
        }}
      >
        {config.badge_text && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, background: 'rgba(0,0,0,0.26)', border: '1px solid rgba(var(--ink-inverse-rgb), 0.32)', backdropFilter: 'blur(10px)' }}>
            <span style={{ width: 6, height: 6, flex: '0 0 auto', borderRadius: '50%', background: 'var(--butter)' }} />
            <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 12.5, letterSpacing: 0.2, color: 'inherit' }}>
              {config.badge_text}
            </span>
          </span>
        )}

        {config.badge_text && config.text && (
          <span aria-hidden="true" style={{ width: 1, height: 16, background: 'rgba(var(--ink-inverse-rgb), 0.36)' }} />
        )}

        {config.text && (
          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'inherit', opacity: 0.95, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
            {config.text}
          </span>
        )}

        {config.link_url && config.link_text && (
          <a href={config.link_url} style={{ color: 'inherit', fontWeight: 700, fontSize: 12.5, textDecoration: 'underline' }}>
            {config.link_text}
          </a>
        )}

        {dismissible && (
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'inherit', opacity: 0.7, background: 'none', border: 'none', cursor: 'pointer', padding: 4, lineHeight: 0 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        )}
      </div>
    </>
  )
}
