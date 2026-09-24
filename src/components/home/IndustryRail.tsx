'use client'

// The industries rail under "70,000 websites built and counting".
//
// That heading used to sit above a grid of four client screenshots. It
// answered "can you prove it" and not "have you built one for a business
// like mine", which is the question someone reading a homepage headline
// about 70,000 websites is actually asking. The screenshots have their
// own page and it is one click away.
//
// Three across on desktop, sliding. Fourteen industries is too many for a
// grid -- either it runs five rows deep or it silently hides eleven of
// them behind a "see all" nobody presses.
//
// ── Native scrolling, not a carousel ─────────────────────────────────
// The rail is an overflow-x container with scroll-snap. The arrows call
// scrollBy. That means a trackpad, a touchscreen, a shift-wheel and the
// keyboard all work without a line of code, and a visitor on a phone gets
// the gesture they already expect instead of two 44px arrow targets.

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { routes } from '@/lib/routes'
import { INDUSTRY_DATA, INDUSTRY_SLUGS, type IndustryKey } from '@/lib/industry-data'

/** Reads better than alphabetical: the trades people actually ask for first. */
const ORDER: IndustryKey[] = [
  'restaurants',
  'boutiques',
  'clinics-and-healthcare',
  'salons-and-spas',
  'real-estate',
  'gyms-and-fitness',
  'law-firms',
  'construction-companies',
  'online-stores-ecommerce',
  'auto-repair-shops',
  'wedding-and-event-planners',
  'clinics',
  'b2b-clothing-manufacturer',
  'b2b-leather-goods-manufacturer',
]

/** First sentence of the subhead — the cards are a rail, not a page. */
function oneLine(text: string): string {
  const stop = text.search(/\.\s/)
  return stop > 0 ? text.slice(0, stop + 1) : text
}

export default function IndustryRail({ dark = false }: { dark?: boolean }) {
  const railRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = railRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2)
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  // One card plus its gap, so a press always lands on a card edge
  // whatever the breakpoint — no hardcoded pixel step.
  function page(direction: 1 | -1) {
    const el = railRef.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    const step = first ? first.getBoundingClientRect().width + 16 : el.clientWidth
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  const ink = dark ? '#FFFFFF' : '#04121F'
  const muted = dark ? 'rgba(255,255,255,0.62)' : '#5A6F82'
  const cardBg = dark ? 'rgba(255,255,255,0.05)' : '#FFFFFF'
  const cardLine = dark ? 'rgba(255,255,255,0.13)' : 'rgba(4,18,31,0.09)'

  return (
    <div style={{ position: 'relative' }}>
      <ul ref={railRef} className="industry-rail" aria-label="Industries we build websites for">
        {ORDER.map((key) => {
          const d = INDUSTRY_DATA[key]
          return (
            <li key={key} className="industry-card-wrap">
              <Link
                href={routes.industry(INDUSTRY_SLUGS[key])}
                className="industry-card"
                style={{ background: cardBg, borderColor: cardLine }}
              >
                {/* The industry's own tint, which is the only visual each
                    of the fourteen reliably has — three have photography,
                    and a rail where three cards have images and eleven
                    have placeholders looks broken, not sparse. */}
                <span className="industry-card-band" style={{ background: d.tint }} aria-hidden="true" />
                <span className="industry-card-body">
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 17, lineHeight: 1.25, color: ink }}>
                    {d.name}
                  </span>
                  <span style={{ fontSize: 13, lineHeight: 1.55, color: muted }}>{oneLine(d.subhead)}</span>
                  <span style={{ marginTop: 'auto', paddingTop: 10, fontSize: 12.5, fontWeight: 700, color: dark ? 'var(--moss-light)' : 'var(--olive)' }}>
                    See what we build &rarr;
                  </span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 14 }}>
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => page(dir)}
            disabled={dir === -1 ? atStart : atEnd}
            aria-label={dir === -1 ? 'Previous industries' : 'More industries'}
            className="industry-rail-arrow"
            style={{ borderColor: cardLine, color: ink, background: cardBg }}
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d={dir === -1 ? 'M15 5 8 12l7 7' : 'M9 5l7 7-7 7'} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
