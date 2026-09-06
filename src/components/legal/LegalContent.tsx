// Legal page — from Marketing - Legal.dc.html. Since each doc has its
// own real URL here (unlike the source's single-page client-state
// switcher), the sidebar uses real navigation — active state comes
// from the route, not local state. Body rendering is block-based
// (h3/h4/paragraph/list/table) to represent each real legal document's
// own numbered-section structure faithfully rather than flattening it.

import { Fragment, type ReactNode } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { routes } from '@/lib/routes'
import { LEGAL_DATA, LEGAL_DOC_KEYS, type LegalDoc, type LegalBlock, type LegalDocData } from '@/lib/legal-data'

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <Fragment key={i}>{part}</Fragment>
  )
}

function renderLegalBlock(block: LegalBlock, i: number) {
  if (block.type === 'h3') {
    return <h3 key={i} style={{ margin: '6px 0 0', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 18.5, letterSpacing: '-0.3px', color: '#04121F' }}>{block.text}</h3>
  }
  if (block.type === 'h4') {
    return <h4 key={i} style={{ margin: '2px 0 0', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16, color: '#1B4B6E' }}>{block.text}</h4>
  }
  if (block.type === 'p') {
    return <p key={i} style={{ margin: 0, fontSize: 16, lineHeight: 1.72, color: '#33485B' }}>{renderInline(block.text)}</p>
  }
  if (block.type === 'ul') {
    return (
      <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 11, paddingLeft: 2 }}>
        {block.items.map((li, j) => (
          <span key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 16, lineHeight: 1.65, color: '#33485B' }}>
            <span style={{ width: 6, height: 6, flex: '0 0 auto', marginTop: 10, borderRadius: '50%', background: 'var(--moss-light)' }} />
            <span>{renderInline(li)}</span>
          </span>
        ))}
      </div>
    )
  }
  // table
  return (
    <div key={i} className="table-scroll" style={{ borderRadius: 14, border: '1px solid rgba(4,18,31,0.1)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
        <thead>
          <tr>
            {block.headers.map((h, hi) => (
              <th key={hi} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.3px', color: '#04121F', background: 'rgba(242,238,226,0.7)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: '12px 16px', fontSize: 14, lineHeight: 1.5, color: '#33485B', borderTop: '1px solid rgba(4,18,31,0.07)' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function LegalContent({ doc, content }: { doc: LegalDoc; content?: LegalDocData }) {
  const d = content ?? LEGAL_DATA[doc]

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="company" />

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '54px 24px 46px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>Legal</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.1, letterSpacing: '-1.5px', color: '#FFFFFF' }}>{d.title}</h1>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Last updated {d.updated}</span>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <div className="orb-field">
          <div style={{ position: 'absolute', width: 720, height: 720, right: -190, top: 60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,170,215,0.32) 0%, rgba(120,170,215,0) 68%)' }} />
          <div style={{ position: 'absolute', width: 780, height: 780, left: '20%', top: 1100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,242,174,0.36) 0%, rgba(244,242,174,0) 70%)' }} />
        </div>
        <div className="page-content">

          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 24px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 34, alignItems: 'start' }}>

              <aside style={{ minWidth: 0, maxWidth: 280, display: 'flex', flexDirection: 'column', gap: 18, position: 'sticky', top: 100 }}>
                <div className="glass-card" style={{ padding: 10, borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {LEGAL_DOC_KEYS.map((key) => {
                    const active = doc === key
                    return (
                      <Link key={key} href={routes.legal(key)} style={{ boxSizing: 'border-box', width: '100%', padding: '13px 16px', borderRadius: 13, fontSize: 14, fontWeight: active ? 700 : 500, textAlign: 'left', color: active ? '#FFFFFF' : '#3B5063', background: active ? 'var(--navy)' : 'transparent' }}>{LEGAL_DATA[key].label}</Link>
                    )
                  })}
                </div>
                <div style={{ padding: '22px 24px', borderRadius: 20, background: 'rgba(242,238,226,0.6)', border: '1px solid rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, color: '#04121F' }}>Questions about this?</span>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: '#4B5D6E' }}>Email us and a person will answer — not a form letter.</p>
                  <a href="mailto:office@matjarx.com" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--olive)' }}>office@matjarx.com</a>
                </div>
              </aside>

              <article style={{ minWidth: 0, maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 22 }}>
                <p style={{ margin: 0, fontSize: 17.5, lineHeight: 1.65, fontWeight: 500, color: '#24384A' }}>{renderInline(d.intro)}</p>
                {d.sections.map((s) => (
                  <div key={s.heading} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                    <h2 style={{ margin: '12px 0 0', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 24, lineHeight: 1.2, letterSpacing: '-0.7px', color: '#04121F' }}>{s.heading}</h2>
                    {s.blocks.map((b, i) => renderLegalBlock(b, i))}
                  </div>
                ))}

                <div className="glass-card" style={{ marginTop: 20, padding: '26px 28px', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16.5, color: '#04121F' }}>MatjarX (Sole Proprietorship)</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.6, color: '#4B5D6E' }}>B6, 4th Street, Zamzama, Clifton, Karachi, Sindh, Pakistan</span>
                  <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', paddingTop: 4 }}>
                    <a href="mailto:office@matjarx.com" style={{ fontSize: 14, fontWeight: 600 }}>office@matjarx.com</a>
                    <a href="tel:+923033720953" style={{ fontSize: 14, fontWeight: 600 }}>+92 303 372 0953</a>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <div style={{ height: 74 }} />
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
