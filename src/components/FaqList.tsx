'use client'

// The FAQ accordion. One of them, for the whole site.
//
// There were five looks, none of them decided:
//
//   home         plus-in-a-disc, 21px 24px, 16.5px question, radius 18
//   pricing      chevron, centre-aligned, 18px 20px, 15px, radius 16
//   FaqSection   chevron, centre-aligned, 18px 20px, 15px, radius 16
//   "sm"         chevron, top-aligned,    18px 22px, 15px, radius 18
//   "md"         chevron, top-aligned,    19px 22px, 15.5px, radius 18
//
// Nobody chose to make the pricing page feel different from the plans
// page; it got built on a different day. Two of those five differ by two
// pixels of radius and a text alignment, which is drift, not design.
//
// ── The canonical look ───────────────────────────────────────────────────
// The top-aligned chevron at 18px 22px, question at 16.5px. Top alignment
// is the right call for a control whose label wraps to two lines on a
// phone -- centring puts the chevron against the middle of a two-line
// question, which reads as misaligned rather than centred.
//
// The question is 16.5px, not the 15px that was most common. The answer
// below it is 14.5px, so at 15px a question was half a pixel larger than
// its own answer and the hierarchy rested entirely on font weight. 16.5px
// is the size the home page already used, and it is the only one of the
// five that got that relationship right.
//
// Home's plus-in-a-disc is gone with the rest. The one real requirement it
// had is dark mode, which is `dark` below -- not a second icon system.
//
// ── aria-expanded ────────────────────────────────────────────────────────
// FaqSection set it. The sixteen hand-written copies did not, so on most of
// the site a screen reader announced a button that gave no indication it
// disclosed anything, or of whether it was currently open. Every row has it
// now. That is the part of this change that is not cosmetic.

import type React from 'react'
import { useCurrency } from '@/components/CurrencyProvider'

export type FaqEntry = {
  q: string
  a: string
  /** Rendered as a bullet list under the answer. Only the detail sections
   *  use it; without it the answer is a plain paragraph. */
  items?: string[]
}

/** The list bullet the three detail sections -- industry, service, plan --
 *  had each declared identically, and use well beyond their FAQ (7, 12 and
 *  18 call sites). One copy, here, because the accordion needs it too. */
export const bullet = (text: string, key?: React.Key) => (
  <li key={key ?? text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-5)' }}>
    <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--olive)', flex: '0 0 auto' }} />{text}
  </li>
)

export function FaqList({
  items,
  openIdx,
  onToggle,
  dark = false,
  /** Defaults to the entry's question. Some callers keyed by index, where
   *  two questions on a page could repeat; pass `(_, i) => i` to keep that. */
  itemKey,
  /** The three detail sections wrap every answer in a <div> because some of
   *  their entries carry bullets. They do it for ALL their rows, bullets or
   *  not, so the flag is per-list rather than per-entry. */
  bullets = false,
}: {
  items: readonly FaqEntry[]
  openIdx: number
  onToggle: (next: number) => void
  dark?: boolean
  itemKey?: (entry: FaqEntry, index: number) => React.Key
  bullets?: boolean
}) {
  // One accordion for the whole site, so converting here reaches every FAQ
  // rather than each page's own copy. inText rewrites only the money inside a
  // sentence: "included in the Rs. 140,000" becomes "included in the AED
  // 1,860", and the rest of the answer is untouched.
  const { inText } = useCurrency()
  const ink = dark ? 'var(--ink-inverse)' : 'var(--ink-1)'
  const body = dark ? 'rgba(var(--ink-inverse-rgb), 0.7)' : 'var(--ink-4)'
  const chev = dark ? 'rgba(var(--ink-inverse-rgb), 0.6)' : 'var(--ink-muted)'

  return (
    <>
      {items.map((f, i) => {
        const open = openIdx === i
        return (
          <div key={itemKey ? itemKey(f, i) : f.q} className={dark ? 'glass-dark-inner' : 'glass-card'} style={{ borderRadius: 18, overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => onToggle(open ? -1 : i)}
              aria-expanded={open}
              style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 22px' }}
            >
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16.5, lineHeight: 1.35, color: ink, marginRight: 'auto', textAlign: 'left' }}>{inText(f.q)}</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={chev} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {open && (
              bullets ? (
                <div style={{ padding: '0 22px 20px' }}>
                  <p style={{ margin: f.items ? '0 0 8px' : 0, fontSize: 14.5, lineHeight: 1.68, color: body }}>{inText(f.a)}</p>
                  {f.items && <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{f.items.map((it, j) => bullet(it, j))}</ul>}
                </div>
              ) : (
                <p style={{ margin: 0, padding: '0 22px 20px', fontSize: 14.5, lineHeight: 1.68, color: body }}>{inText(f.a)}</p>
              )
            )}
          </div>
        )
      })}
    </>
  )
}
