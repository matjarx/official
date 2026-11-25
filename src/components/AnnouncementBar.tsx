'use client'

// The strip above the header, on every page -- the rotating ticker built
// for the new homepage, now the one shared bar site-wide instead of two
// different bars (this page's old plain one-line strip, and home's own
// ticker). Content, colours and schedule for the LEAD item still come from
// the admin's Marketing Site > Announcements tab; two standing marketing
// lines fill the rotation around it, same as they already did on home.
//
// ── One bar, not two ─────────────────────────────────────────────────
// This used to literally be two components: this file (a plain strip,
// hidden by CSS on the homepage specifically) and home-v2/Chrome.tsx's
// `Ann` (a rotating ticker, home-only). Keeping both meant every visual
// change to the "same" announcement had to be made twice, and already had
// drifted once (home's version never had this one's dismiss button at
// all). This is that ticker, promoted here so every page gets it.
//
// ── Dismissal ────────────────────────────────────────────────────────
// Keyed by the admin announcement's own text, not a flat boolean, so
// publishing a new announcement shows again even to a visitor who
// dismissed the previous one. Dismissing hides the whole ticker,
// standing items included, until a new announcement changes the key --
// same as before, when there was always real content to lose.
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
//     document down, a layout shift on first paint, sitewide.
//
// So the bar is server-rendered and a tiny blocking script -- before
// first paint, ahead of React -- marks <html> when storage says this
// exact announcement was dismissed. A stylesheet rule keyed off that
// attribute hides it with no flash and no shift. The effect then syncs
// React's own state so the node actually unmounts.

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { AnnouncementBarConfig } from '@/lib/marketing-content'
import { escapeScriptHtml } from '@/lib/safe-script'
import { WHATSAPP_HREF } from '@/lib/contact-details'
import { Arrow } from '@/components/home-v2/icons'

const STORAGE_KEY = 'matjarx-announcement-dismissed'
const HIDE_ATTR = 'data-mx-announce-dismissed'

type TickerItem = { badge?: string; t: string; cta?: string; href?: string }

/** Evergreen marketing lines that fill the rotation around the admin's own
 *  announcement, so the ticker is never empty between campaigns. */
const STANDING: TickerItem[] = [
  { t: 'Your website, live in 7 days — Rs. 22,500 setup', cta: 'See plans', href: '/pricing' },
  { t: 'Questions? A real person answers on WhatsApp', cta: 'Chat now', href: WHATSAPP_HREF },
]

const isInternal = (h?: string) => !!h && h.startsWith('/')

function TickLink({ href, className, children, ...rest }: { href?: string; className?: string; children: React.ReactNode; tabIndex?: number; 'aria-hidden'?: boolean }) {
  if (!href) return <span className={className} {...rest}>{children}</span>
  return isInternal(href)
    ? <Link href={href} className={className} {...rest}>{children}</Link>
    : <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
}

/**
 * Runs before first paint, so it must not depend on anything React has
 * done. Inlined as a string because it has to be synchronous: a deferred
 * or hydration-time check is exactly the flash this replaces.
 */
function hideScript(key: string) {
  // key is built from the admin's own announcement text (badge_text +
  // text) -- JSON.stringify below correctly escapes it for JS-string
  // syntax, but that happens after the HTML parser has already tokenized
  // this <script>'s body, which splits on a literal "</script>" first.
  // escapeScriptHtml closes that gap so an announcement containing
  // "</script><script>..." can't break out of this tag.
  return escapeScriptHtml(`try{if(localStorage.getItem(${JSON.stringify(STORAGE_KEY)})===${JSON.stringify(key)})document.documentElement.setAttribute(${JSON.stringify(HIDE_ATTR)},'1')}catch(e){}`)
}

export default function AnnouncementBar({ config }: { config: AnnouncementBarConfig }) {
  // Starts visible: the pre-paint script below has already hidden it in
  // CSS if this visitor dismissed it, so there is nothing to hide here.
  const [dismissed, setDismissed] = useState(false)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  const lead: TickerItem | null = config.text
    ? { badge: config.badge_text || undefined, t: config.text.replace(/[:\s]+$/, ''), cta: config.link_text || undefined, href: config.link_url || undefined }
    : null
  const items = lead ? [lead, ...STANDING] : STANDING

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

  useEffect(() => {
    if (paused || dismissed) return
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 4200)
    return () => clearInterval(id)
  }, [paused, dismissed, items.length])

  if (dismissed) return null

  function dismiss() {
    setDismissed(true)
    try {
      window.localStorage.setItem(STORAGE_KEY, key)
    } catch {
      // storage unavailable — the bar just won't remember the dismissal
    }
  }

  const dismissible = config.dismissible !== false
  const badge = items[i].badge || 'New'

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
      <div id="mx-announcement-bar" className="hv-ann" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <span className="hv-ann-tag"><i />{badge}</span>
        <div className="hv-ann-win" aria-live="polite">
          {items.map((a, n) => (
            <TickLink key={a.t} href={a.href} className={n === i ? 'is-on' : n === (i + items.length - 1) % items.length ? 'is-out' : ''} aria-hidden={n !== i} tabIndex={n === i ? 0 : -1}>
              <span className="hv-ann-t">{a.t}</span>{a.cta && <span className="hv-ann-cta">{a.cta} <Arrow size={14} /></span>}
            </TickLink>
          ))}
        </div>
        <span className="hv-ann-n" aria-hidden="true">{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        {dismissible && (
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="hv-ann-x"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        )}
      </div>
    </>
  )
}
