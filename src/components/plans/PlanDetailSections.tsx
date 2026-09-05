'use client'

// Renders everything from plan-detail-data.ts (the real per-plan content
// from files/matjarx_{launch,boost,growth,platinum,custom}_plan_page.md)
// that PlanContent.tsx's existing compact hero/audiences/FAQ view — written
// before these source files existed — never carried: What You Get section
// breakdowns, at-a-glance table, full Best For groups, pricing detail with
// annual savings, real examples, the build process, the full FAQ set, the
// plan-comparison table, and closing/bottom-line copy. Appended after
// PlanContent's existing sections rather than replacing them.

import { useState } from 'react'
import Link from 'next/link'
import { routes, appSignup } from '@/lib/routes'
import type { PlanKey } from '@/lib/plan-data'
import {
  LAUNCH, BOOST, GROWTH, PLATINUM, CUSTOM,
  type StandardPlanDetail, type Block, type PlanFaq, type BestForGroup,
} from '@/lib/plan-detail-data'

const STANDARD: Partial<Record<PlanKey, StandardPlanDetail>> = { launch: LAUNCH, boost: BOOST, growth: GROWTH, platinum: PLATINUM }

const H2: React.CSSProperties = { margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: '#04121F' }
const EYEBROW: React.CSSProperties = { display: 'block', marginBottom: 8, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }
const bullet = (text: string, key?: React.Key) => (
  <li key={key ?? text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.55, color: '#4B5D6E' }}>
    <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--olive)', flex: '0 0 auto' }} />{text}
  </li>
)

function BlockList({ blocks }: { blocks: Block[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {blocks.map((b, i) => (
        <div key={i}>
          {b.h && <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F' }}>{b.h}</h4>}
          {b.p && <p style={{ margin: '0 0 8px', fontSize: 13.5, lineHeight: 1.6, color: '#4B5D6E' }}>{b.p}</p>}
          {b.items && <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{b.items.map((it, j) => bullet(it, j))}</ul>}
          {b.sub && b.sub.map((s, k) => (
            <div key={k} style={{ marginTop: b.h || b.p ? 10 : 0 }}>
              <span style={{ display: 'block', marginBottom: 6, fontSize: 13.5, fontWeight: 700, color: '#04121F' }}>{s.h}</span>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{s.items.map((it, j) => bullet(it, j))}</ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function GroupGrid({ groups }: { groups: BestForGroup[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
      {groups.map((g) => (
        <div key={g.title} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
          <h4 style={{ margin: '0 0 10px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: '#04121F' }}>{g.title}</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>{g.items.map((it, i) => bullet(it, i))}</ul>
        </div>
      ))}
    </div>
  )
}

function FaqAccordion({ faqs, openIdx, setOpenIdx }: { faqs: PlanFaq[]; openIdx: number; setOpenIdx: (n: number) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {faqs.map((f, i) => {
        const open = openIdx === i
        return (
          <div key={f.q} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden' }}>
            <button type="button" onClick={() => setOpenIdx(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 22px' }}>
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
  )
}

function CompareTableEl({ headers, rows }: { headers: string[]; rows: string[][] }) {
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

function StandardDetail({ d, planKey }: { d: StandardPlanDetail; planKey: PlanKey }) {
  const [openFaq, setOpenFaq] = useState(-1)
  return (
    <>
      {/* What You Get detail */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '76px 24px 0' }}>
        <span style={EYEBROW}>{d.quickOverview.title}</span>
        <h2 style={H2}>{d.whatYouGet.title}</h2>
        <p style={{ margin: '-10px 0 26px', fontSize: 15, color: '#435A70' }}>{d.quickOverview.intro}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 18 }}>
          {d.whatYouGet.sections.map((s) => (
            <div key={s.title} className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20 }}>
              <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 16.5, color: '#04121F' }}>{s.title}</h3>
              <BlockList blocks={s.blocks} />
            </div>
          ))}
        </div>
      </section>

      {/* Extra narrative sections (Boost/Growth/Platinum only) */}
      {d.extraSections?.map((s) => (
        <section key={s.title} style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
          <h2 style={H2}>{s.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 18 }}>
            {s.blocks.map((b, i) => (
              <div key={i} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
                <BlockList blocks={[b]} />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* At a glance */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.glance.title}</h2>
        <CompareTableEl headers={['Feature', planKey.charAt(0).toUpperCase() + planKey.slice(1)]} rows={d.glance.rows} />
      </section>

      {/* Best for */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.bestFor.title}</h2>
        <GroupGrid groups={d.bestFor.groups} />
      </section>

      {/* Pricing detail */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>Pricing, in full</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 18, marginBottom: 22 }}>
          <div className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20 }}>
            <span style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 600, color: '#6A7F92' }}>One-time setup</span>
            <span style={{ display: 'block', marginBottom: 12, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 24, color: '#04121F' }}>{d.pricing.setupFee}</span>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{d.pricing.setupItems.map((it, i) => bullet(it, i))}</ul>
          </div>
          <div className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20 }}>
            <span style={{ display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 600, color: '#6A7F92' }}>Monthly fee</span>
            <span style={{ display: 'block', marginBottom: 12, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 24, color: '#04121F' }}>{d.pricing.monthlyFee}</span>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{d.pricing.monthlyItems.map((it, i) => bullet(it, i))}</ul>
          </div>
        </div>

        {d.pricing.blogNote && (
          <div className="glass-card" style={{ padding: '20px 22px', borderRadius: 18, marginBottom: 22 }}>
            <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: '#04121F' }}>What does each blog post cost?</h4>
            <p style={{ margin: '0 0 8px', fontSize: 13.5, color: '#4B5D6E' }}>Included in plan: {d.pricing.blogNote.included} · Additional blog posts: {d.pricing.blogNote.extra}</p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{d.pricing.blogNote.whyMatters.map((it, i) => bullet(it, i))}</ul>
          </div>
        )}

        {d.pricing.perMonthValue && (
          <div className="glass-card" style={{ padding: '20px 22px', borderRadius: 18, marginBottom: 22 }}>
            <h4 style={{ margin: '0 0 10px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: '#04121F' }}>{d.pricing.perMonthValue.intro}</h4>
            <ul style={{ margin: '0 0 10px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {d.pricing.perMonthValue.items.map((it, i) => (
                <li key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 13.5, color: '#4B5D6E' }}>
                  <span>{it.label}</span>{it.value && <span style={{ fontWeight: 600, color: 'var(--olive)', whiteSpace: 'nowrap' }}>{it.value}</span>}
                </li>
              ))}
            </ul>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: '#04121F' }}>{d.pricing.perMonthValue.total}</span>
          </div>
        )}

        <span style={{ display: 'block', marginBottom: 12, fontSize: 13.5, fontWeight: 600, color: '#04121F' }}>Annual savings</span>
        <CompareTableEl headers={d.pricing.savings.headers} rows={d.pricing.savings.rows} />

        {d.pricing.roi && (
          <div className="glass-card" style={{ padding: '20px 22px', borderRadius: 18, marginTop: 22 }}>
            <h4 style={{ margin: '0 0 8px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: '#04121F' }}>ROI calculation</h4>
            <p style={{ margin: '0 0 8px', fontSize: 13.5, color: '#4B5D6E' }}>{d.pricing.roi.intro}</p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{d.pricing.roi.lines.map((it, i) => bullet(it, i))}</ul>
          </div>
        )}

        {d.pricing.notIncluded.length > 0 && (
          <div style={{ marginTop: 22 }}>
            <span style={{ display: 'block', marginBottom: 10, fontSize: 13.5, fontWeight: 600, color: '#04121F' }}>What&apos;s NOT included</span>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {d.pricing.notIncluded.map((it, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, color: '#4B5D6E' }}>
                  <span style={{ color: '#B0473F', flex: '0 0 auto' }}>✕</span>{it}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Real examples */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.examples.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 18 }}>
          {d.examples.items.map((ex) => (
            <div key={ex.title} className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20 }}>
              <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16.5, color: '#04121F' }}>{ex.title}</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>{ex.lines.map((it, i) => bullet(it, i))}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.process.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 16 }}>
          {d.process.phases.map((ph) => (
            <div key={ph.title} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
              <h4 style={{ margin: '0 0 10px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F' }}>{ph.title}</h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{ph.items.map((it, i) => bullet(it, i))}</ul>
            </div>
          ))}
        </div>
        {d.process.closing && <p style={{ margin: '20px 0 0', textAlign: 'center', fontSize: 14.5, fontWeight: 600, color: 'var(--olive)' }}>{d.process.closing}</p>}
      </section>

      {/* Full FAQ */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={{ ...H2, textAlign: 'center' }}>Everything else you might ask</h2>
        <FaqAccordion faqs={d.faqs} openIdx={openFaq} setOpenIdx={setOpenFaq} />
      </section>

      {/* Compare table + upgrade guides */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.compareTitle}</h2>
        {d.compareTable && <div style={{ marginBottom: 22 }}><CompareTableEl headers={d.compareTable.headers} rows={d.compareTable.rows} /></div>}
        {d.upgradeGroups && <GroupGrid groups={d.upgradeGroups} />}
      </section>

      {/* Closing + bottom line + guarantee */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
        <div style={{ padding: 'clamp(28px, 4vw, 44px)', borderRadius: 26, background: '#04121F', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>{d.closing.eyebrow}</span>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 32px)', color: '#FFFFFF' }}>{d.closing.title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {d.closing.priceLines.map((l) => <span key={l} style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{l}</span>)}
          </div>
          <a href={appSignup(planKey === 'custom' ? undefined : (planKey as 'launch' | 'boost' | 'growth' | 'platinum'))} className="btn-primary">{d.closing.cta}</a>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', paddingTop: 10 }}>
            {d.closing.steps.map((s, i) => <span key={s} style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)' }}>{i + 1}. {s}{i < d.closing.steps.length - 1 ? '  ·' : ''}</span>)}
          </div>
          <a href="https://wa.me/923033720953" target="_blank" rel="noopener noreferrer" style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: 'var(--moss-light)' }}>{d.closing.scheduleCta} — WhatsApp +92 303 372 0953</a>
        </div>
      </section>

      <section style={{ maxWidth: 820, margin: '0 auto', padding: '46px 24px 0', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.8vw, 26px)', color: '#04121F' }}>{d.bottomLine.title}</h3>
        {d.bottomLine.body.map((p) => <p key={p} style={{ margin: '0 0 6px', fontSize: 14.5, color: '#4B5D6E' }}>{p}</p>)}
        <p style={{ margin: '10px 0 0', fontSize: 12.5, color: '#8A9AA6' }}>100% refund within 24 hours if we haven&apos;t substantially started work.</p>
      </section>

      {/* Compare all plans */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '46px 24px 0', display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        {d.allPlans.map((pl) => (
          <Link key={pl.name} href={routes.plan(pl.name.toLowerCase() as PlanKey)} style={{ padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, color: 'var(--olive)', background: 'rgba(112,117,56,0.1)' }}>{pl.name} — {pl.desc}</Link>
        ))}
      </section>
    </>
  )
}

function CustomDetail() {
  const [openFaq, setOpenFaq] = useState(-1)
  const d = CUSTOM
  return (
    <>
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '76px 24px 0' }}>
        <span style={EYEBROW}>How it works</span>
        <h2 style={H2}>{d.quickOverview.title}</h2>
        <p style={{ margin: '-10px 0 20px', fontSize: 15, color: '#435A70' }}>{d.quickOverview.intro}</p>
        <ol style={{ margin: 0, padding: '0 0 0 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {d.quickOverview.howItWorks.map((s) => <li key={s} style={{ fontSize: 14.5, color: '#4B5D6E' }}>{s}</li>)}
        </ol>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.whoNeeds.title}</h2>
        <GroupGrid groups={d.whoNeeds.groups} />
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.examples.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 18 }}>
          {d.examples.items.map((ex) => (
            <div key={ex.title} className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20 }}>
              <h3 style={{ margin: '0 0 4px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16, color: '#04121F' }}>{ex.title}</h3>
              <p style={{ margin: '0 0 10px', fontSize: 12.5, color: '#8A9AA6' }}>{ex.business}</p>
              <ul style={{ margin: '0 0 10px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{ex.needs.map((it, i) => bullet(it, i))}</ul>
              <p style={{ margin: '0 0 4px', fontSize: 13, color: '#4B5D6E' }}><strong>Solution:</strong> {ex.solution}</p>
              <p style={{ margin: 0, fontSize: 13, color: '#4B5D6E' }}><strong>Timeline:</strong> {ex.timeline} · <strong>Price:</strong> {ex.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.discovery.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
          {d.discovery.phases.map((ph) => (
            <div key={ph.title} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
              <h4 style={{ margin: '0 0 4px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F' }}>{ph.title}</h4>
              {ph.body && <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--olive)' }}>{ph.body}</p>}
              <ul style={{ margin: '0 0 8px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{ph.items.map((it, i) => bullet(it, i))}</ul>
              {ph.deliverable && <p style={{ margin: 0, fontSize: 12, color: '#8A9AA6' }}>Deliverable: {ph.deliverable}</p>}
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>Custom Pricing</h2>
        <p style={{ margin: '-10px 0 20px', fontSize: 14.5, color: '#4B5D6E' }}>{d.pricing.intro}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 16, marginBottom: 22 }}>
          {d.pricing.tiers.map((t) => (
            <div key={t.title} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
              <h4 style={{ margin: '0 0 10px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: '#04121F' }}>{t.title}</h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{t.body.map((it, i) => bullet(it, i))}</ul>
            </div>
          ))}
        </div>
        <p style={{ margin: '0 0 20px', fontSize: 13.5, fontWeight: 600, color: 'var(--olive)' }}>{d.pricing.ongoingSupport}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
          <div><span style={{ display: 'block', marginBottom: 8, fontSize: 12.5, fontWeight: 600, color: '#04121F' }}>What increases cost</span><ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{d.pricing.increaseCost.map((it, i) => bullet(it, i))}</ul></div>
          <div><span style={{ display: 'block', marginBottom: 8, fontSize: 12.5, fontWeight: 600, color: '#04121F' }}>What decreases cost</span><ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{d.pricing.decreaseCost.map((it, i) => bullet(it, i))}</ul></div>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.features.title}</h2>
        <GroupGrid groups={d.features.groups} />
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.whyCustom.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
          {d.whyCustom.items.map((it) => (
            <div key={it.h} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
              <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F' }}>{it.h}</h4>
              <p style={{ margin: '0 0 6px', fontSize: 13.5, color: '#4B5D6E' }}>{it.p}</p>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--olive)' }}>{it.result}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.team.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 16 }}>
          {d.team.roles.map((r) => (
            <div key={r.title} className="glass-card" style={{ padding: '18px 20px 20px', borderRadius: 18 }}>
              <h4 style={{ margin: '0 0 8px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F' }}>{r.title}</h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{r.items.map((it, i) => bullet(it, i))}</ul>
            </div>
          ))}
        </div>
        <p style={{ margin: '18px 0 0', textAlign: 'center', fontSize: 14, fontWeight: 600, color: 'var(--olive)' }}>{d.team.note}</p>
      </section>

      <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.timeline.title}</h2>
        <CompareTableEl headers={['Project size', 'Timeline']} rows={d.timeline.rows} />
        <p style={{ margin: '16px 0 0', fontSize: 13, color: '#8A9AA6' }}>Factors affecting timeline: {d.timeline.factors.join(', ')}.</p>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.support.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16, marginBottom: 20 }}>
          {d.support.options.map((o) => (
            <div key={o.title} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
              <h4 style={{ margin: '0 0 10px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F' }}>{o.title}</h4>
              <ul style={{ margin: '0 0 10px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{o.items.map((it, i) => bullet(it, i))}</ul>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--olive)' }}>{o.cost}</span>
            </div>
          ))}
        </div>
        <span style={{ display: 'block', marginBottom: 8, fontSize: 12.5, fontWeight: 600, color: '#04121F' }}>Add-on services available</span>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{d.support.addOns.map((it, i) => bullet(it, i))}</ul>
      </section>

      <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={{ ...H2, textAlign: 'center' }}>Custom Plan Questions</h2>
        <FaqAccordion faqs={d.faqs} openIdx={openFaq} setOpenIdx={setOpenFaq} />
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '66px 24px 0' }}>
        <h2 style={H2}>{d.gettingStarted.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 16 }}>
          {d.gettingStarted.steps.map((s) => (
            <div key={s.title} className="glass-card" style={{ padding: '18px 20px 20px', borderRadius: 18 }}>
              <h4 style={{ margin: '0 0 8px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#04121F' }}>{s.title}</h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{s.items.map((it, i) => bullet(it, i))}</ul>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0', textAlign: 'center' }}>
        <span style={EYEBROW}>{d.showcase.title}</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 10 }}>
          {d.showcase.items.map((it) => <span key={it} style={{ padding: '8px 14px', borderRadius: 999, fontSize: 13, background: 'rgba(4,18,31,0.06)', color: '#04121F' }}>{it}</span>)}
        </div>
        <p style={{ margin: 0, fontSize: 13, color: '#8A9AA6' }}>{d.showcase.note}</p>
      </section>

      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
        <div style={{ padding: 'clamp(28px, 4vw, 44px)', borderRadius: 26, background: '#04121F', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 32px)', color: '#FFFFFF' }}>{d.closing.title}</h2>
          <p style={{ margin: 0, maxWidth: '34em', fontSize: 14.5, color: 'rgba(255,255,255,0.68)' }}>{d.closing.body}</p>
          <Link href={routes.contact} className="btn-primary">{d.closing.cta}</Link>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', paddingTop: 10 }}>
            {d.closing.steps.map((s, i) => <span key={s} style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)' }}>{i + 1}. {s}{i < d.closing.steps.length - 1 ? '  ·' : ''}</span>)}
          </div>
          <a href="https://wa.me/923033720953" target="_blank" rel="noopener noreferrer" style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: 'var(--moss-light)' }}>{d.closing.scheduleCta} — WhatsApp +92 303 372 0953</a>
        </div>
      </section>

      <section style={{ maxWidth: 820, margin: '0 auto', padding: '46px 24px 0', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.8vw, 26px)', color: '#04121F' }}>{d.bottomLine.title}</h3>
        {d.bottomLine.body.map((p) => <p key={p} style={{ margin: '0 0 6px', fontSize: 14.5, color: '#4B5D6E' }}>{p}</p>)}
        <p style={{ margin: '10px 0 0', fontSize: 12.5, color: '#8A9AA6' }}>{d.guarantee}</p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '46px 24px 0', display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        {d.allPlans.map((pl) => (
          <Link key={pl.name} href={routes.plan(pl.name.toLowerCase() as PlanKey)} style={{ padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, color: 'var(--olive)', background: 'rgba(112,117,56,0.1)' }}>{pl.name} — {pl.desc}</Link>
        ))}
      </section>
    </>
  )
}

export default function PlanDetailSections({ planKey }: { planKey: PlanKey }) {
  if (planKey === 'custom') return <CustomDetail />
  const d = STANDARD[planKey]
  if (!d) return null
  return <StandardDetail d={d} planKey={planKey} />
}
