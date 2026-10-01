// The three pieces that /plans, /services and the industry pages were each
// keeping their own copy of.
//
// PlanDetailSections, ServiceDetailSections and IndustryDetailSections all
// render the same shape — a stack of {h, p, items, sub} blocks, a comparison
// table, a section heading — because they all read the same `Block` type out
// of plan-detail-data. Each file had its own `BlockList`, and two of them had
// a byte-identical table under two different names (`TableEl` and
// `CompareTableEl`). The `H2` const was the same 180 characters three times.
//
// The copies had already begun to drift: the plans one used a 14px stack gap
// and collapsed the sub-list margin when the block had no heading, while the
// other two used 12px and a flat 6px. That drift is the argument for one
// copy — the difference was never a decision anyone made per page, so it is
// a prop here rather than three literals in three files.

'use client'

import type { Block } from '@/lib/plan-detail-data'
import { bullet } from '@/components/FaqList'
import { useCurrency } from '@/components/CurrencyProvider'

/** The section heading used by all three detail-section families. */
export const H2: React.CSSProperties = { margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: 'var(--ink-1)' }

export function BlockList({ blocks, gap = 12, tightSub = false }: {
  blocks: Block[]
  /** Stack gap between blocks. The plans pages run slightly looser at 14. */
  gap?: number
  /** Plans collapse a sub-list's top margin when its block has no heading. */
  tightSub?: boolean
}) {
  // Same reason bullet converts: these carry prices inside sentences, and a
  // page that converts its headline figure while its own breakdown stays in
  // rupees reads as a mistake.
  const { inText } = useCurrency()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {blocks.map((b, i) => (
        <div key={i}>
          {b.h && <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: 'var(--ink-1)' }}>{inText(b.h)}</h3>}
          {b.p && <p style={{ margin: '0 0 8px', fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-5)' }}>{inText(b.p)}</p>}
          {b.items && <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{b.items.map((it, j) => bullet(it, j))}</ul>}
          {b.sub && b.sub.map((s, k) => (
            <div key={k} style={{ marginTop: tightSub ? (b.h || b.p ? 10 : 0) : 6 }}>
              <span style={{ display: 'block', marginBottom: 6, fontSize: 13.5, fontWeight: 700, color: 'var(--ink-1)' }}>{inText(s.h)}</span>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{s.items.map((it, j) => bullet(it, j))}</ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/** A scrollable comparison table. First column reads as the row's label. */
export function CompareTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  const { inText } = useCurrency()
  return (
    <div className="glass-card table-scroll" style={{ borderRadius: 18, overflowY: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
        <thead><tr>{headers.map((h) => <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12, letterSpacing: 0.6, textTransform: 'uppercase', color: 'var(--ink-muted)', borderBottom: '1px solid rgba(var(--ink-1-rgb), 0.08)' }}>{inText(h)}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderTop: '1px solid rgba(var(--ink-1-rgb), 0.06)' }}>
              {row.map((cell, j) => <td key={j} style={{ padding: '11px 16px', fontSize: 13.5, color: j === 0 ? 'var(--ink-1)' : 'var(--ink-5)', fontWeight: j === 0 ? 600 : 400 }}>{inText(cell)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
