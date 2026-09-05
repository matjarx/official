'use client'

// Templates & Examples page — real content, verbatim, from
// files/matjarx_templates_page.md. Templates live inside the app dashboard
// behind login, so there are no real preview screenshots to show here —
// each category is a real, honestly-worded content card rather than a
// fabricated thumbnail.

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import { routes, appLogin } from '@/lib/routes'
import {
  HERO, WHY_TEMPLATES, TEMPLATE_FEATURES, CATEGORIES, SELECTION_PROCESS,
  CUSTOMIZATION, POPULAR, TEMPLATE_UPDATES, MIGRATION, TEMPLATE_FAQS, RELATED,
  type IconCard,
} from '@/lib/templates-data'

function IconCardGrid({ items, cols = 4 }: { items: IconCard[]; cols?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${cols >= 4 ? 250 : 220}px), 1fr))`, gap: 16 }}>
      {items.map((c) => (
        <div key={c.title} className="glass-card" style={{ padding: '24px 24px 26px', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--navy)', display: 'grid', placeItems: 'center' }}>
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="var(--butter)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
          </span>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, letterSpacing: '-0.3px', color: '#04121F' }}>{c.title}</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {c.body.map((b) => (
              <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.5, color: '#4B5D6E' }}>
                <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--olive)', flex: '0 0 auto' }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function TemplatesContent() {
  const [openFaq, setOpenFaq] = useState(0)
  const [openCat, setOpenCat] = useState(0)

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="resources" />

      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '58px 24px 56px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>100+ designs, ready to launch</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.1, letterSpacing: '-1.7px', color: '#FFFFFF' }}>{HERO.headline}</h1>
          <p style={{ margin: 0, maxWidth: '32em', fontSize: 16.5, lineHeight: 1.62, color: 'rgba(255,255,255,0.72)' }}>{HERO.subhead}</p>
          <a href={appLogin} className="btn-primary" style={{ marginTop: 4 }}>{HERO.cta}</a>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <AmbientOrbs />
        <div className="page-content">

          {/* Why use templates */}
          <section style={{ maxWidth: 1200, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', marginBottom: 8, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>About our templates</span>
            <h2 style={{ margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: '#04121F' }}>Why use templates?</h2>
            <IconCardGrid items={WHY_TEMPLATES} />
          </section>

          {/* Template features */}
          <section style={{ maxWidth: 1200, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', marginBottom: 8, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Template features</span>
            <h2 style={{ margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: '#04121F' }}>What every template includes</h2>
            <IconCardGrid items={TEMPLATE_FEATURES} cols={5} />
          </section>

          {/* Categories */}
          <section style={{ maxWidth: 1000, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', marginBottom: 8, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Browse by type</span>
            <h2 style={{ margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: '#04121F' }}>Template categories</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CATEGORIES.map((c, i) => {
                const open = openCat === i
                return (
                  <div key={c.n} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden' }}>
                    <button type="button" onClick={() => setOpenCat(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px' }}>
                      <span style={{ width: 34, height: 34, flex: '0 0 auto', borderRadius: 10, background: c.tint, display: 'grid', placeItems: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 13, color: '#FFFFFF' }}>{c.n}</span>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, color: '#04121F', marginRight: 'auto' }}>{c.name}</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#6A7F92" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {open && (
                      <div style={{ padding: '4px 20px 22px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 18 }}>
                        <div>
                          <span style={{ display: 'block', marginBottom: 8, fontSize: 11.5, letterSpacing: 1, textTransform: 'uppercase', color: '#8A9AA6', fontWeight: 600 }}>Perfect for</span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {c.perfectFor.map((p) => <span key={p} style={{ padding: '5px 10px', borderRadius: 999, fontSize: 12, color: '#04121F', background: 'rgba(4,18,31,0.06)' }}>{p}</span>)}
                          </div>
                        </div>
                        <div>
                          <span style={{ display: 'block', marginBottom: 8, fontSize: 11.5, letterSpacing: 1, textTransform: 'uppercase', color: '#8A9AA6', fontWeight: 600 }}>Template features</span>
                          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                            {c.features.map((f) => <li key={f} style={{ fontSize: 13, color: '#4B5D6E' }}>{f}</li>)}
                          </ul>
                        </div>
                        <div>
                          <span style={{ display: 'block', marginBottom: 8, fontSize: 11.5, letterSpacing: 1, textTransform: 'uppercase', color: '#8A9AA6', fontWeight: 600 }}>Includes</span>
                          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                            {c.includes.map((f) => <li key={f} style={{ fontSize: 13, color: '#4B5D6E' }}>{f}</li>)}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Selection process */}
          <section style={{ maxWidth: 1200, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', marginBottom: 8, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>How to choose your template</span>
            <h2 style={{ margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: '#04121F' }}>Template selection process</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 18 }}>
              {SELECTION_PROCESS.map((s) => (
                <div key={s.n} className="glass-card" style={{ padding: '26px 24px', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 32, lineHeight: 1, color: 'var(--moss-light)' }}>{s.n}</span>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, color: '#04121F' }}>{s.title}</h3>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#8A9AA6' }}>{s.lead}</span>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {s.items.map((it) => (
                      <li key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.5, color: '#4B5D6E' }}>
                        <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--olive)', flex: '0 0 auto' }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Customization */}
          <section style={{ maxWidth: 1200, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', marginBottom: 8, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Making templates your own</span>
            <h2 style={{ margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: '#04121F' }}>Template customization</h2>
            <IconCardGrid items={CUSTOMIZATION} />
          </section>

          {/* Popular templates */}
          <section style={{ maxWidth: 1200, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', marginBottom: 8, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Most used templates</span>
            <h2 style={{ margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: '#04121F' }}>Popular templates</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 16 }}>
              {POPULAR.map((p) => (
                <div key={p.name} style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(4,18,31,0.08)', boxShadow: '0 10px 26px rgba(4,18,31,0.08)' }}>
                  <div style={{ height: 84, background: p.tint }} />
                  <div style={{ padding: '18px 20px 20px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, color: '#04121F' }}>{p.name}</span>
                    <span style={{ fontSize: 12.5, color: '#6A7F92' }}>{p.used}</span>
                    <span style={{ fontSize: 13, color: '#4B5D6E' }}>{p.features}</span>
                    <div style={{ display: 'flex', gap: 8, paddingTop: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, color: '#3D3A08', background: 'var(--butter)' }}>{p.rating}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, color: 'var(--olive)', background: 'rgba(112,117,56,0.12)' }}>{p.launch}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Updates + migration */}
          <section style={{ maxWidth: 1200, margin: '0 auto', padding: '66px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 20 }}>
            <div className="glass-card" style={{ padding: '28px 26px', borderRadius: 22 }}>
              <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 19, color: '#04121F' }}>{TEMPLATE_UPDATES.title}</h3>
              <p style={{ margin: '0 0 12px', fontSize: 13.5, color: '#4B5D6E' }}>{TEMPLATE_UPDATES.intro}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                {TEMPLATE_UPDATES.items.map((it) => (
                  <li key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, color: '#4B5D6E' }}>
                    <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--olive)', flex: '0 0 auto' }} />{it}
                  </li>
                ))}
              </ul>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--olive)' }}>{TEMPLATE_UPDATES.note}</span>
            </div>
            <div className="glass-card" style={{ padding: '28px 26px', borderRadius: 22 }}>
              <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 19, color: '#04121F' }}>{MIGRATION.title}</h3>
              <p style={{ margin: '0 0 12px', fontSize: 13.5, color: '#4B5D6E' }}>{MIGRATION.intro}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                {MIGRATION.items.map((it) => (
                  <li key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, color: '#4B5D6E' }}>
                    <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--olive)', flex: '0 0 auto' }} />{it}
                  </li>
                ))}
              </ul>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--olive)' }}>{MIGRATION.note}</span>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
            <h2 style={{ margin: '0 0 26px', textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: '#04121F' }}>Frequently asked questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TEMPLATE_FAQS.map(([q, a], i) => {
                const open = openFaq === i
                return (
                  <div key={q} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden' }}>
                    <button type="button" onClick={() => setOpenFaq(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 22px' }}>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, lineHeight: 1.35, color: '#04121F', marginRight: 'auto', textAlign: 'left' }}>{q}</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#6A7F92" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {open && <p style={{ margin: 0, padding: '0 22px 20px', fontSize: 14.5, lineHeight: 1.68, color: '#435A70' }}>{a}</p>}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Support */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.8vw, 26px)', color: '#04121F' }}>Questions about templates?</h2>
            <p style={{ margin: 0, fontSize: 14.5, color: '#4B5D6E' }}>WhatsApp / phone +92 303 372 0953 · office@matjarx.com · Monday–Saturday, 11 AM–8 PM PKT</p>
          </section>

          {/* Closing CTA */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '46px 24px 0' }}>
            <div style={{ padding: 'clamp(28px, 4vw, 44px)', borderRadius: 26, background: '#04121F', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.8vw, 32px)', lineHeight: 1.18, letterSpacing: '-1px', color: '#FFFFFF' }}>Browse templates now</h2>
              <p style={{ margin: 0, maxWidth: '30em', fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)' }}>All templates are available in your MatjarX dashboard.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingTop: 6 }}>
                <a href={appLogin} className="btn-primary">Login &amp; Browse Templates</a>
                <Link href={routes.pricing} style={{ padding: '15px 22px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#FFFFFF', background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(255,255,255,0.2)' }}>Choose Your Plan</Link>
              </div>
            </div>
          </section>

          {/* Related */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '46px 24px 0', display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {RELATED.map((r) => (
              <Link key={r.href} href={r.href} style={{ padding: '10px 18px', borderRadius: 999, fontSize: 13.5, fontWeight: 600, color: 'var(--olive)', background: 'rgba(112,117,56,0.1)' }}>{r.label} →</Link>
            ))}
          </section>

          <div style={{ height: 74 }} />
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
