'use client'

// The FAQ accordion, which sixteen components had each written out by hand.
//
// Every marketing page family carries an FAQ, and every one of them had its
// own copy of the same ~12 lines: a glass-card row, an `all: unset` button
// that flips `openIdx`, a chevron rotated 180deg when open, and the answer
// underneath. Copying it is how the site got built, and it worked -- but a
// question row is a control, and sixteen hand-written controls is sixteen
// places for the hit area, the rotation or the open/close state to drift
// apart without anyone noticing, because no two of them appear on the same
// page.
//
// ── Why `size` and not one look ──────────────────────────────────────────
// They had already drifted, in exactly two directions:
//
//   'sm'  18px 22px padding, 15px question, 20px answer padding
//         contact, about, videos, templates, help, help articles, audit,
//         and the three detail sections (industry, service, plan)
//   'md'  19px 22px padding, 15.5px question, 21px answer padding
//         plans, features, industries, best-builder, locations
//
// Collapsing those to one size would be a visual change to fifteen page
// families, which is a design decision and not a refactor. So `size` keeps
// both, pixel for pixel, and the choice stays visible in the call site.
//
// Two accordions are deliberately NOT here: the home page's (a plus-sign in
// a filled disc, and it has to follow dark mode) and the pricing page's
// (centre-aligned, tighter radius). Those are different designs rather than
// drifted copies, and folding them in would mean parameterising the icon
// and the alignment until the component says less than the markup did.

import type React from 'react'

export type FaqEntry = {
  q: string
  a: string
  /** Rendered as a bullet list under the answer. Only the detail sections
   *  use it; without it the answer is a plain paragraph, as before. */
  items?: string[]
}

/** The list bullet the three detail sections -- industry, service, plan --
 *  had each declared identically, and use well beyond their FAQ (7, 12 and
 *  18 call sites). One copy, here, because the accordion needs it too. */
export const bullet = (text: string, key?: React.Key) => (
  <li key={key ?? text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.55, color: '#4B5D6E' }}>
    <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--olive)', flex: '0 0 auto' }} />{text}
  </li>
)

const SIZES = {
  sm: { buttonPad: '18px 22px', question: 15, answerPad: '0 22px 20px' },
  md: { buttonPad: '19px 22px', question: 15.5, answerPad: '0 22px 21px' },
} as const

export function FaqList({
  items,
  openIdx,
  onToggle,
  size = 'sm',
  /** Defaults to the entry's question. Some callers keyed by index when two
   *  questions could repeat; pass `(_, i) => i` to keep that. */
  itemKey,
  /** The three detail sections wrap every answer in a <div> because some of
   *  their entries carry bullets. They do it for ALL their rows, bullets or
   *  not, so the flag is per-list rather than per-entry -- otherwise the
   *  bullet-less rows in those lists would lose a wrapper element they have
   *  today. */
  bullets = false,
}: {
  items: readonly FaqEntry[]
  openIdx: number
  onToggle: (next: number) => void
  size?: keyof typeof SIZES
  itemKey?: (entry: FaqEntry, index: number) => React.Key
  bullets?: boolean
}) {
  const s = SIZES[size]
  return (
    <>
      {items.map((f, i) => {
        const open = openIdx === i
        return (
          <div key={itemKey ? itemKey(f, i) : f.q} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden' }}>
            <button type="button" onClick={() => onToggle(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: s.buttonPad }}>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: s.question, lineHeight: 1.35, color: '#04121F', marginRight: 'auto', textAlign: 'left' }}>{f.q}</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#5A6F82" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {open && (
              bullets ? (
                <div style={{ padding: s.answerPad }}>
                  <p style={{ margin: f.items ? '0 0 8px' : 0, fontSize: 14.5, lineHeight: 1.68, color: '#435A70' }}>{f.a}</p>
                  {f.items && <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{f.items.map((it, j) => bullet(it, j))}</ul>}
                </div>
              ) : (
                <p style={{ margin: 0, padding: s.answerPad, fontSize: 14.5, lineHeight: 1.68, color: '#435A70' }}>{f.a}</p>
              )
            )}
          </div>
        )
      })}
    </>
  )
}
