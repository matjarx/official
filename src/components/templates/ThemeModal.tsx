'use client'

// The modal half of the theme browser on /templates.
//
// ── Why this is split from the grid ──────────────────────────────────
// It calls useSearchParams, and on a statically generated route that
// forces everything beneath its Suspense boundary to render in the
// BROWSER — the server HTML gets the fallback. The first version wrapped
// the whole industry listing in here, so `curl /templates` returned zero
// theme cards and the one part of the page worth crawling was the one
// part a crawler could not see.
//
// The grid is ThemeGrid.tsx now: plain links, rendered on the server.
// This reads the URL and draws the modal over the top.
//
// ── Why it is portalled to <body> ────────────────────────────────────
// position: fixed resolves against the viewport only if no ancestor has
// a transform, a filter or a backdrop-filter. This page has all three
// somewhere up the tree -- AmbientOrbs and the .glass-card recipe -- so
// the scrim was laid out inside a section instead of over the page:
// inset:0 covered the section, 86vh was measured against it, and the
// preview frame came out 219px tall under a site header the modal was
// supposed to be covering. A portal to <body> sidesteps the whole class
// of bug rather than hunting the specific ancestor.
//
// ── The URL is the state ─────────────────────────────────────────────
// Opening a preview pushes `?<slug>-website-template` — a bare query key,
// so the URL reads /templates?leather-goods-website-template. That means
// a preview is linkable, the back button closes it, and a visitor can
// send someone a specific theme rather than "go to templates and scroll".
//
// It is a query string rather than a path deliberately: these are not 10
// pages of indexable content, they are 10 views of one page, and minting
// /templates/<slug> for each would put ten near-identical thin pages into
// an index that is already telling us it has more URLs than it wants.
//
// ── Why the iframe is real and not a screenshot ──────────────────────
// A screenshot of a theme is a photograph of a website. The demo sites
// are live, public and -- checked -- serve no X-Frame-Options or
// frame-ancestors, so a visitor can scroll the actual thing, open the
// menu, and see how it behaves on a phone width. Themes whose demo is
// missing or unpublished fall back to their colours; an iframe pointed
// at a 404 is worse than no iframe.
//
// ── The five seconds ─────────────────────────────────────────────────
// "Get This Theme" appears after five seconds rather than immediately.
// Long enough that the button arrives once someone is actually looking
// at the theme rather than competing with it for the first glance, and
// short enough that nobody who wants it has to wait. The countdown is
// shown, because a button that appears unannounced reads as a pop-up.

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { useRouter, useSearchParams } from 'next/navigation'
import { appSignup } from '@/lib/routes'
import { templateParam, type Theme } from '@/lib/theme-catalogue'

const REVEAL_SECONDS = 5

/** No external store to watch; this only distinguishes server from client. */
const subscribeNever = () => () => {}

/**
 * Counts down, then shows the button.
 *
 * A component rather than state on the modal, remounted with a key per
 * theme, so opening a different theme restarts the countdown by being a
 * different component instance. Resetting a counter from inside an
 * effect is the same thing with a cascading render attached.
 */
function GetThisTheme({ href }: { href: string }) {
  const [seconds, setSeconds] = useState(REVEAL_SECONDS)

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s <= 1 ? 0 : s - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  if (seconds > 0) {
    return <span className="theme-modal-wait" aria-live="polite">Get this theme in {seconds}s</span>
  }
  return <a href={href} className="btn-navy theme-modal-get">Get This Theme</a>
}

export default function ThemeModal({ themes }: { themes: Theme[] }) {
  const router = useRouter()
  const params = useSearchParams()
  const closeRef = useRef<HTMLButtonElement>(null)

  // Which theme, if any, the URL is currently asking for.
  const open = themes.find((t) => params.has(templateParam(t.slug))) || null

  const close = useCallback(() => router.push('/templates#browse', { scroll: false }), [router])

  // Escape closes, and the body does not scroll behind the modal.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, close])

  // Portal target. `document` does not exist during the server render, so
  // this has to wait for the client — useSyncExternalStore rather than a
  // setState in an effect, which is the same thing with a cascading
  // render attached. Nothing to subscribe to, so the subscribe callback
  // is a no-op; the two snapshot functions are what matter.
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false)

  if (!open || !mounted) return null

  return createPortal(
    (
      <>
        <div className="theme-modal-scrim" role="dialog" aria-modal="true" aria-label={`${open.name} template preview`} onClick={close}>
          <div className="theme-modal" onClick={(e) => e.stopPropagation()}>
            <div className="theme-modal-bar">
              <span className="theme-modal-title">{open.name}</span>
              {open.demoUrl && <span className="theme-modal-url">{open.demoUrl.replace('https://', '')}</span>}
              <button ref={closeRef} type="button" onClick={close} aria-label="Close preview" className="theme-modal-close">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="theme-modal-stage">
              {open.demoUrl ? (
                <iframe
                  key={open.id}
                  src={open.demoUrl}
                  title={`${open.name} template, live preview`}
                  loading="lazy"
                  // allow-same-origin looks alarming next to allow-scripts
                  // and is correct here: the framed document is our own
                  // storefront on app.matjarx.com, a DIFFERENT origin from
                  // matjarx.com. The flag restores ITS origin, not ours, so
                  // it still cannot read this page's storage or DOM. Without
                  // it the storefront runs at an opaque origin, where every
                  // localStorage access throws and the Supabase client dies
                  // on construction -- the frame crashed to Chrome's "This
                  // page couldn't load".
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  className="theme-modal-frame"
                />
              ) : (
                <div className="theme-modal-empty" style={{ background: open.primaryColor ? `linear-gradient(150deg, ${open.primaryColor}, ${open.secondaryColor || open.primaryColor})` : undefined }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 24, color: '#FFFFFF' }}>{open.name}</span>
                  <p style={{ margin: 0, maxWidth: '30em', fontSize: 14.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.82)' }}>
                    {open.description || 'This template is being finished. Ask us and we will show you where it has got to.'}
                  </p>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>No live demo for this one yet.</span>
                </div>
              )}
            </div>

            <div className="theme-modal-foot">
              <span style={{ fontSize: 13, color: '#5A6F82', marginRight: 'auto' }}>
                {open.comingSoon ? 'In build — tell us if you want it first.' : 'Scroll and click inside the preview. It is the real site.'}
              </span>
              <GetThisTheme key={open.id} href={appSignup('launch')} />
            </div>
          </div>
        </div>
      </>
    ),
    document.body
  )
}
