'use client'

// A row of cards you swipe, with arrows for a mouse.
//
// Extracted from IndustryRail when the pricing testimonials needed the
// same thing. Three of these now exist on the site and a fourth was
// about to be written by hand.
//
// ── Native scrolling, not a carousel ─────────────────────────────────
// An overflow-x container with scroll-snap. The arrows call scrollBy.
// Trackpad, touchscreen, shift-wheel and keyboard all work without a
// line of code, and on a phone a visitor gets the gesture they already
// expect instead of two small arrow targets.
//
// The step is measured from the first child rather than hardcoded, so a
// press lands on a card edge at every breakpoint.

import { useCallback, useEffect, useRef, useState } from 'react'

export default function CardRail({
  children,
  className = '',
  label,
  dark = false,
}: {
  children: React.ReactNode
  /** Grid class that sets the column widths and the breakpoints. */
  className?: string
  label: string
  dark?: boolean
}) {
  const railRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(true)

  const sync = useCallback(() => {
    const el = railRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 2)
    // Also true when nothing overflows, which is what hides the arrows
    // entirely on a wide screen showing every card at once.
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

  function page(direction: 1 | -1) {
    const el = railRef.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    const step = first ? first.getBoundingClientRect().width + 16 : el.clientWidth
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  const idle = atStart && atEnd

  return (
    <div style={{ position: 'relative' }}>
      <ul ref={railRef} className={className} aria-label={label}>
        {children}
      </ul>

      {/* Nothing overflows, so there is nowhere to go. Two permanently
          disabled arrows under a complete grid is furniture. */}
      {!idle && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 14 }}>
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => page(dir)}
              disabled={dir === -1 ? atStart : atEnd}
              aria-label={dir === -1 ? `Previous, ${label}` : `More, ${label}`}
              className="industry-rail-arrow"
              style={{
                borderColor: dark ? 'rgba(var(--ink-inverse-rgb), 0.18)' : 'rgba(var(--ink-1-rgb), 0.12)',
                color: dark ? 'var(--ink-inverse)' : 'var(--ink-1)',
                background: dark ? 'rgba(var(--ink-inverse-rgb), 0.06)' : 'var(--ink-inverse)',
              }}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d={dir === -1 ? 'M15 5 8 12l7 7' : 'M9 5l7 7-7 7'} />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
