'use client'

// The 4 services each have their own real page, matching the exact live
// matjarx.com URLs (done-for-you-website, local-national-and-global-seo,
// concierge-service, growth-marketing-service) — no /services hub exists
// on the live site. One shared component (same pattern as PlanContent for
// the 5 /plans/{key} pages): navy hero with the editor bleeding into the
// next section, a tab strip that's real navigation between the 4 pages
// (not client-side state), alternating image/text blocks, a six-card
// grid, and a navy testimonial panel with result stats.
//
// The hero's static assets/editor-showcase.png is superseded by the live
// EditorShowcase component (per the handoff: "now superseded by the live
// Editor Showcase component") — same bleed-into-next-section treatment.

import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import EditorShowcase from '@/components/EditorShowcase'
import EditorShowcaseMobile from '@/components/EditorShowcaseMobile'
import { routes, SERVICE_ROUTES } from '@/lib/routes'
import { SERVICE_TABS, SERVICE_DATA, type ServiceKey, type ServiceDataEntry } from '@/lib/services-data'
import ServiceDetailSections from './ServiceDetailSections'

export type ServicesContentShape = ServiceDataEntry
const DEFAULT_CONTENT: Record<ServiceKey, ServicesContentShape> = SERVICE_DATA

export default function ServicesContent({ serviceKey, content = DEFAULT_CONTENT[serviceKey] }: { serviceKey: ServiceKey; content?: ServicesContentShape }) {
  const svc = serviceKey
  const d = content

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <AmbientOrbs />
      <div className="page-content">
        <SiteHeader active="services" />

        {/* Hero */}
        <section style={{ background: 'var(--navy)', padding: '62px 24px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
            <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>{d.kicker}</span>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(31px, 5.8vw, 52px)', lineHeight: 1.08, letterSpacing: '-1.8px', color: '#FFFFFF' }}>
              {d.titleLead} <span style={{ background: 'var(--moss-light)', color: '#16210B', padding: '0 10px', borderRadius: 3 }}>{d.titleMark}</span>
            </h1>
            <p style={{ margin: 0, maxWidth: '34em', fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>{d.subtitle}</p>
            <Link href={routes.pricing} className="btn-primary" style={{ marginTop: 6 }}>{d.heroCta}</Link>
          </div>
          <div style={{ maxWidth: 1140, margin: '44px auto -70px', padding: '0 24px' }}>
            <div style={{ borderRadius: '20px 20px 0 0', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.14)', borderBottom: 'none', boxShadow: '0 -10px 60px rgba(0,0,0,0.35)', padding: 4, background: '#001526' }}>
              <div className="showcase-desktop-only"><EditorShowcase /></div>
              <div className="showcase-mobile-only"><EditorShowcaseMobile /></div>
            </div>
          </div>
        </section>

        <div style={{ height: 86 }} />

        {/* Tabs */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '26px 24px 0' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', padding: 7, borderRadius: 999, background: 'var(--cream-deep)', border: '1px solid rgba(4,18,31,0.08)', width: 'fit-content', margin: '0 auto' }}>
            {SERVICE_TABS.map((t) => {
              const on = svc === t.id
              return (
                <Link key={t.id} href={SERVICE_ROUTES[t.id]} style={{ padding: '11px 22px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13.5, whiteSpace: 'nowrap', color: on ? '#FFFFFF' : '#4B5D6E', background: on ? 'var(--navy)' : 'transparent', transition: 'background 180ms ease' }}>
                  {t.label}
                </Link>
              )
            })}
          </div>
        </section>

        {/* Pitch + blocks */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '66px 24px 20px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto 46px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>{d.pitchTitle}</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.62, color: '#435A70' }}>{d.pitchBody}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {d.blocks.map((b, i) => {
              const textOrder = i % 2 === 0 ? 1 : 2
              const mediaOrder = i % 2 === 0 ? 2 : 1
              return (
                <div key={b.titleMark} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 40, alignItems: 'center', padding: 'clamp(24px, 3.5vw, 34px) clamp(20px, 3vw, 36px)', borderRadius: 24, background: '#FFFFFF', border: '1px solid rgba(4,18,31,0.08)', boxShadow: '0 12px 32px rgba(4,18,31,0.05)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 15, minWidth: 0, order: textOrder }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--olive)' }}>{b.stat}</span>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 28, lineHeight: 1.14, letterSpacing: '-0.9px', color: '#04121F' }}>
                      {b.titleLead} <span style={{ background: 'var(--butter)', padding: '0 8px', borderRadius: 3 }}>{b.titleMark}</span>
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 2 }}>
                      {b.points.map((p) => (
                        <span key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14.5, lineHeight: 1.55, color: '#3B5063' }}>
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--olive)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ minWidth: 0, order: mediaOrder, position: 'relative', height: 260, borderRadius: 18, overflow: 'hidden', background: b.tint }}>
                    {b.image ? (
                      <Image src={b.image.src} alt={b.image.alt} fill sizes="(max-width: 700px) 100vw, 500px" style={{ objectFit: 'cover' }} />
                    ) : (
                      <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 24, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 19, letterSpacing: '0.3px', textAlign: 'center', color: 'rgba(255,255,255,0.92)' }}>{b.mediaLabel}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Grid */}
        <section style={{ background: 'var(--cream-deep)', padding: '74px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ margin: '0 0 38px', textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4.2vw, 36px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>{d.gridTitle}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 18 }}>
              {d.gridItems.map((g) => (
                <div key={g.title} className="glass-card" style={{ padding: '26px 24px', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--butter)', display: 'grid', placeItems: 'center' }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#3D3A08" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={g.icon} /></svg>
                  </span>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, letterSpacing: '-0.3px', color: '#04121F' }}>{g.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.58, color: '#4B5D6E' }}>{g.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '74px 24px' }}>
          <div style={{ padding: 'clamp(26px, 4vw, 42px) clamp(22px, 3.5vw, 44px)', borderRadius: 26, background: '#04121F', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 34, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
              <span style={{ fontSize: 15, letterSpacing: '2.5px', color: 'var(--butter)' }}>★★★★★</span>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.62, color: 'rgba(255,255,255,0.9)' }}>&ldquo;{d.quote}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, paddingTop: 4 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--butter)' }}>{d.quoteName}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{d.quoteCompany}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
              {d.resultStats.map((r) => (
                <div key={r.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 28, letterSpacing: '-0.9px', color: '#FFFFFF' }}>{r.value}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceDetailSections svc={svc} />

        <SiteFooter />
      </div>
    </div>
  )
}
