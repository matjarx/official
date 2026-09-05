'use client'

// Renders everything from service-detail-data.ts (the real per-service
// content from files/matjarx_{done_for_you,local_seo,concierge,growth_
// marketing}_content.md) that ServicesContent.tsx's existing compact hero/
// 3-block/6-grid/testimonial view never carried. Appended after
// ServicesContent's existing sections, per the active tab.

import { useState } from 'react'
import type { ServiceKey } from '@/lib/services-data'
import { DFY, SEO, CONCIERGE, GROWTH, type ServiceDetail, type Testimonial } from '@/lib/service-detail-data'
import type { Block } from '@/lib/plan-detail-data'

const DETAIL: Record<ServiceKey, ServiceDetail> = { dfy: DFY, seo: SEO, concierge: CONCIERGE, growth: GROWTH }

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

function TableEl({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="glass-card table-scroll" style={{ borderRadius: 18, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
        <thead><tr>{headers.map((h) => <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12, letterSpacing: 0.6, textTransform: 'uppercase', color: '#6A7F92', borderBottom: '1px solid rgba(4,18,31,0.08)' }}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderTop: '1px solid rgba(4,18,31,0.06)' }}>
              {row.map((cell, j) => <td key={j} style={{ padding: '11px 16px', fontSize: 13.5, color: j === 0 ? '#04121F' : '#4B5D6E', fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TestimonialGrid({ items }: { items: Testimonial[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
      {items.map((t) => (
        <div key={t.name} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
          <span style={{ display: 'block', marginBottom: 8, fontSize: 13, letterSpacing: 2, color: 'var(--butter-deep)' }}>★★★★★</span>
          <p style={{ margin: '0 0 10px', fontSize: 13.5, lineHeight: 1.6, color: '#3B5063' }}>&ldquo;{t.quote}&rdquo;</p>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: '#8A9AA6' }}>{t.name}</span>
        </div>
      ))}
    </div>
  )
}

export default function ServiceDetailSections({ svc }: { svc: ServiceKey }) {
  const d = DETAIL[svc]
  const [openFaq, setOpenFaq] = useState(-1)

  return (
    <>
      {/* Challenge */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '76px 24px 0' }}>
        <h2 style={H2}>{d.challenge.title}</h2>
        {d.challenge.intro && <p style={{ margin: '-10px 0 16px', fontSize: 15, lineHeight: 1.62, color: '#435A70' }}>{d.challenge.intro}</p>}
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>{d.challenge.points.map((it, i) => bullet(it, i))}</ul>
      </section>

      {/* Solution / how it works */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.solution.title}</h2>
        {d.solution.intro && <p style={{ margin: '-10px 0 22px', fontSize: 15, lineHeight: 1.62, color: '#435A70' }}>{d.solution.intro}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 16 }}>
          {d.solution.steps.map((s, i) => (
            <div key={s.title} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
              <span style={{ display: 'block', marginBottom: 8, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 24, color: 'var(--moss-light)' }}>{i + 1}</span>
              <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F' }}>{s.title}</h4>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: '#4B5D6E' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who we serve */}
      {d.whoWeServe && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
          <h2 style={H2}>{d.whoWeServe.title}</h2>
          <p style={{ margin: '-10px 0 20px', fontSize: 14.5, color: '#4B5D6E' }}>{d.whoWeServe.intro}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {d.whoWeServe.groups.map((g) => (
              <div key={g.title} className="glass-card" style={{ padding: '16px 20px', borderRadius: 16 }}>
                <span style={{ display: 'block', marginBottom: 4, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#04121F' }}>{g.title}</span>
                <span style={{ fontSize: 13, lineHeight: 1.6, color: '#4B5D6E' }}>{g.items}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Timeline */}
      {d.timeline && (
        <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
          <h2 style={H2}>{d.timeline.title}</h2>
          <TableEl headers={['When', 'What Happens']} rows={d.timeline.rows} />
        </section>
      )}

      {/* Included */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.included.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 18 }}>
          {d.included.sections.map((s) => (
            <div key={s.title} className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20 }}>
              <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 16.5, color: '#04121F' }}>{s.title}</h3>
              <BlockList blocks={s.blocks} />
            </div>
          ))}
        </div>
      </section>

      {/* Differentiator (DFY DIY/agency, Concierge "what counts") */}
      {d.differentiator && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
          <h2 style={H2}>{d.differentiator.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16 }}>
            {d.differentiator.groups.map((g) => (
              <div key={g.title} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18, border: g.positive ? '1.5px solid var(--olive)' : undefined }}>
                <h4 style={{ margin: '0 0 10px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: g.positive ? 'var(--olive)' : '#04121F' }}>{g.title}</h4>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>{g.items.map((it, i) => bullet(it, i))}</ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Process (SEO) */}
      {d.process && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
          <h2 style={H2}>{d.process.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16 }}>
            {d.process.phases.map((ph) => (
              <div key={ph.title} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
                <h4 style={{ margin: '0 0 10px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F' }}>{ph.title}</h4>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{ph.items.map((it, i) => bullet(it, i))}</ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Numbers / ROI (SEO) */}
      {d.numbers && (
        <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
          <h2 style={H2}>{d.numbers.title}</h2>
          <TableEl headers={['Metric', 'Value']} rows={d.numbers.rows} />
          {d.numbers.footnote && <p style={{ margin: '16px 0 0', fontSize: 13, lineHeight: 1.6, color: '#8A9AA6' }}>{d.numbers.footnote}</p>}
        </section>
      )}

      {/* Plan table (SEO) */}
      {d.planTable && (
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '66px 24px 0' }}>
          <h2 style={H2}>{d.planTable.title}</h2>
          <TableEl headers={d.planTable.table.headers} rows={d.planTable.table.rows} />
          {d.planTable.note && <p style={{ margin: '16px 0 0', fontSize: 13, color: '#8A9AA6' }}>{d.planTable.note}</p>}
        </section>
      )}

      {/* Marketing journey (Growth) */}
      {d.marketingJourney && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
          <h2 style={H2}>{d.marketingJourney.title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {d.marketingJourney.months.map((m) => (
              <div key={m.title} className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 18 }}>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 15.5, color: '#04121F' }}>{m.title}</h4>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--olive)' }}>{m.focus}</span>
                </div>
                <div>
                  <span style={{ display: 'block', marginBottom: 6, fontSize: 11.5, letterSpacing: 1, textTransform: 'uppercase', color: '#8A9AA6', fontWeight: 600 }}>What We Do</span>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>{m.weDo.map((it, i) => bullet(it, i))}</ul>
                </div>
                <div>
                  <span style={{ display: 'block', marginBottom: 6, fontSize: 11.5, letterSpacing: 1, textTransform: 'uppercase', color: '#8A9AA6', fontWeight: 600 }}>Your Action</span>
                  <ul style={{ margin: '0 0 8px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>{m.yourAction.map((it, i) => bullet(it, i))}</ul>
                  <span style={{ fontSize: 12.5, color: '#4B5D6E' }}><strong>Outcome:</strong> {m.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Case studies */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.caseStudies.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 18 }}>
          {d.caseStudies.items.map((c) => (
            <div key={c.title} className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20 }}>
              <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, color: '#04121F' }}>{c.title}</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>{c.lines.map((it, i) => bullet(it, i))}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* More testimonials */}
      {d.testimonials && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
          <h2 style={H2}>What Customers Say</h2>
          <TestimonialGrid items={d.testimonials.items} />
        </section>
      )}

      {/* Slavi's story (Growth) */}
      {d.slaviStory && (
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '66px 24px 0' }}>
          <div className="glass-dark-panel" style={{ padding: 'clamp(26px, 3.6vw, 40px)', borderRadius: 26 }}>
            <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 19, color: '#FFFFFF' }}>{d.slaviStory.title}</h3>
            <p style={{ margin: '0 0 14px', fontSize: 14.5, lineHeight: 1.65, color: 'rgba(226,236,245,0.82)' }}>&ldquo;{d.slaviStory.quote}&rdquo;</p>
            <span style={{ display: 'block', marginBottom: 12, fontSize: 13, fontWeight: 600, color: 'var(--moss-light)' }}>{d.slaviStory.name}</span>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {d.slaviStory.points.map((p, i) => <li key={i} style={{ fontSize: 13, color: 'rgba(226,236,245,0.7)' }}>• {p}</li>)}
            </ul>
          </div>
        </section>
      )}

      {/* Pricing detail (DFY) */}
      {d.pricing && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
          <h2 style={H2}>{d.pricing.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 18 }}>
            {d.pricing.setup && (
              <div className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20 }}>
                <span style={{ display: 'block', marginBottom: 10, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 18, color: '#04121F' }}>{d.pricing.setup.amount}</span>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{d.pricing.setup.items.map((it, i) => bullet(it, i))}</ul>
              </div>
            )}
            {d.pricing.monthly && (
              <div className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20 }}>
                <span style={{ display: 'block', marginBottom: 10, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 18, color: '#04121F' }}>{d.pricing.monthly.amount}</span>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{d.pricing.monthly.items.map((it, i) => bullet(it, i))}</ul>
              </div>
            )}
          </div>
          {d.pricing.note && <p style={{ margin: '18px 0 0', fontSize: 13.5, fontWeight: 600, color: 'var(--olive)' }}>{d.pricing.note}</p>}
        </section>
      )}

      {/* Why choose */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.whyChoose.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
          {d.whyChoose.items.map((it) => (
            <div key={it.h} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
              <h4 style={{ margin: '0 0 8px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F' }}>{it.h}</h4>
              {it.body && <p style={{ margin: '0 0 8px', fontSize: 13.5, color: '#4B5D6E' }}>{it.body}</p>}
              {it.items && <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{it.items.map((x, i) => bullet(x, i))}</ul>}
            </div>
          ))}
        </div>
      </section>

      {/* Access & communication (Concierge) */}
      {d.access && (
        <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
          <h2 style={H2}>{d.access.title}</h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>{d.access.channels.map((it, i) => bullet(it, i))}</ul>
        </section>
      )}

      {/* FAQ */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={{ ...H2, textAlign: 'center' }}>{d.faqs.title}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {d.faqs.items.map((f, i) => {
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

      {/* Closing + bottom line */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
        <div style={{ padding: 'clamp(28px, 4vw, 44px)', borderRadius: 26, background: '#04121F', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 32px)', color: '#FFFFFF' }}>{d.closing.title}</h2>
          {d.closing.body && <p style={{ margin: 0, maxWidth: '34em', fontSize: 14.5, color: 'rgba(255,255,255,0.68)' }}>{d.closing.body}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', paddingTop: 6 }}>
            {d.closing.ctas.map((c, i) => (
              <span key={c} style={{ padding: '13px 20px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13.5, color: i === 0 ? '#16210B' : '#FFFFFF', background: i === 0 ? 'var(--butter)' : 'rgba(255,255,255,0.09)', border: i === 0 ? undefined : '1.5px solid rgba(255,255,255,0.2)' }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 820, margin: '0 auto', padding: '46px 24px 0', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.8vw, 26px)', color: '#04121F' }}>{d.bottomLine.title}</h3>
        {d.bottomLine.body.map((p) => <p key={p} style={{ margin: '0 0 6px', fontSize: 14.5, color: '#4B5D6E' }}>{p}</p>)}
      </section>
    </>
  )
}
