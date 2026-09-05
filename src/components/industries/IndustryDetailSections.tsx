'use client'

// Renders everything from industry-detail-data.ts (the real per-industry
// content from files/matjarx_industry_{1-12}_*.md) that IndustryContent.tsx's
// existing compact hero/feature-grid/quote/FAQ view never carried. Appended
// after IndustryContent's existing sections. Returns null for Boutiques/
// Clinics, which have no source content file (a separate, older pair from
// the original design handoff).

import { useState } from 'react'
import type { Block } from '@/lib/plan-detail-data'
import { INDUSTRY_DETAIL } from '@/lib/industry-detail-data'
import type { IndustryKey } from '@/lib/industry-data'

const H2: React.CSSProperties = { margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: '#04121F' }
const bullet = (text: string, key?: React.Key) => (
  <li key={key ?? text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.55, color: '#4B5D6E' }}>
    <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--olive)', flex: '0 0 auto' }} />{text}
  </li>
)

function BlockList({ blocks }: { blocks: Block[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {blocks.map((b, i) => (
        <div key={i}>
          {b.h && <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F' }}>{b.h}</h4>}
          {b.p && <p style={{ margin: '0 0 8px', fontSize: 13.5, lineHeight: 1.6, color: '#4B5D6E' }}>{b.p}</p>}
          {b.items && <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{b.items.map((it, j) => bullet(it, j))}</ul>}
          {b.sub && b.sub.map((s, k) => (
            <div key={k} style={{ marginTop: 6 }}>
              <span style={{ display: 'block', marginBottom: 6, fontSize: 13.5, fontWeight: 700, color: '#04121F' }}>{s.h}</span>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{s.items.map((it, j) => bullet(it, j))}</ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function IndustryDetailSections({ industryKey }: { industryKey: IndustryKey }) {
  const [openFaq, setOpenFaq] = useState(-1)
  const d = INDUSTRY_DETAIL[industryKey]
  if (!d) return null

  return (
    <>
      {/* Reality / problem */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '76px 24px 0' }}>
        <h2 style={H2}>{d.reality.title}</h2>
        {d.reality.intro && <p style={{ margin: '-10px 0 16px', fontSize: 15, lineHeight: 1.62, color: '#435A70' }}>{d.reality.intro}</p>}
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>{d.reality.points.map((it, i) => bullet(it, i))}</ul>
      </section>

      {/* Solution */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.solution.title}</h2>
        {d.solution.intro && <p style={{ margin: '-10px 0 16px', fontSize: 15, lineHeight: 1.62, color: '#435A70' }}>{d.solution.intro}</p>}
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>{d.solution.points.map((it, i) => bullet(it, i))}</ul>
      </section>

      {/* What's included */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.included.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 18 }}>
          {d.included.sections.map((s) => (
            <div key={s.title} className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20 }}>
              <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 16, color: '#04121F' }}>{s.title}</h3>
              <BlockList blocks={s.blocks} />
            </div>
          ))}
        </div>
      </section>

      {/* Success stories */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.successStories.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 18 }}>
          {d.successStories.items.map((c) => (
            <div key={c.title} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
              <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: '#04121F' }}>{c.title}</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>{c.lines.map((it, i) => bullet(it, i))}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* Features specific */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.featuresSpecific.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16 }}>
          {d.featuresSpecific.sections.map((s) => (
            <div key={s.title} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
              <h4 style={{ margin: '0 0 10px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F' }}>{s.title}</h4>
              <BlockList blocks={s.blocks} />
            </div>
          ))}
        </div>
      </section>

      {/* Marketing */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.marketing.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16 }}>
          {d.marketing.sections.map((s) => (
            <div key={s.title} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
              <h4 style={{ margin: '0 0 10px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F' }}>{s.title}</h4>
              <BlockList blocks={s.blocks} />
            </div>
          ))}
        </div>
      </section>

      {/* Real testimonials (restaurants only) */}
      {d.testimonials && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
          <h2 style={H2}>{d.testimonials.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
            {d.testimonials.items.map((t) => (
              <div key={t.name} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
                <span style={{ display: 'block', marginBottom: 8, fontSize: 13, letterSpacing: 2, color: 'var(--butter-deep)' }}>★★★★★</span>
                <p style={{ margin: '0 0 10px', fontSize: 13.5, lineHeight: 1.6, color: '#3B5063' }}>&ldquo;{t.quote}&rdquo;</p>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: '#8A9AA6' }}>{t.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Plans for this industry */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.plans.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16 }}>
          {d.plans.tiers.map((t) => (
            <div key={t.name} className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 16, color: '#04121F' }}>{t.name}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--olive)' }}>{t.audience}</span>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{t.items.map((it, i) => bullet(it, i))}</ul>
              {t.price && <span style={{ marginTop: 'auto', paddingTop: 8, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#04121F' }}>{t.price}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Getting started */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.gettingStarted.title}</h2>
        <ol style={{ margin: 0, padding: '0 0 0 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {d.gettingStarted.steps.map((s) => <li key={s} style={{ fontSize: 14.5, color: '#4B5D6E' }}>{s}</li>)}
        </ol>
      </section>

      {/* Extra sections (compliance, member benefits, social integration, etc.) */}
      {d.extras?.map((ex) => (
        <section key={ex.title} style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
          <h2 style={H2}>{ex.title}</h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>{ex.body.map((it, i) => bullet(it, i))}</ul>
        </section>
      ))}

      {/* Full FAQ */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={{ ...H2, textAlign: 'center' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {d.faqs.map((f, i) => {
            const open = openFaq === i
            return (
              <div key={f.q} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden' }}>
                <button type="button" onClick={() => setOpenFaq(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 22px' }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, lineHeight: 1.35, color: '#04121F', marginRight: 'auto', textAlign: 'left' }}>{f.q}</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#6A7F92" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                </button>
                {open && (
                  <div style={{ padding: '0 22px 20px' }}>
                    <p style={{ margin: f.items ? '0 0 8px' : 0, fontSize: 14.5, lineHeight: 1.68, color: '#435A70' }}>{f.a}</p>
                    {f.items && <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{f.items.map((it, j) => bullet(it, j))}</ul>}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Closing */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
        <div style={{ padding: 'clamp(28px, 4vw, 44px)', borderRadius: 26, background: '#04121F', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 32px)', color: '#FFFFFF' }}>{d.closing.title}</h2>
          <p style={{ margin: 0, maxWidth: '30em', fontSize: 14.5, color: 'rgba(255,255,255,0.68)' }}>{d.closing.body}</p>
          <span style={{ padding: '13px 22px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13.5, color: '#16210B', background: 'var(--butter)' }}>{d.closing.cta}</span>
        </div>
      </section>
    </>
  )
}
