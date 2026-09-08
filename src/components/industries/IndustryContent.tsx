'use client'

// Industry page template — from Marketing - Website For Industry.dc.html
// (and its Boutiques/Clinics siblings, same component + data shape). One
// real template shared by every industry; new industries are a data.ts
// entry + one thin route file, not a new component.

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import { routes } from '@/lib/routes'
import { INDUSTRY_DATA, INDUSTRY_SLUGS, otherIndustriesFor, type IndustryKey } from '@/lib/industry-data'
import { INDUSTRY_DETAIL, type IndustryDetail } from '@/lib/industry-detail-data'
import IndustryDetailSections from './IndustryDetailSections'

export type IndustryContentShape = (typeof INDUSTRY_DATA)[IndustryKey] & { detail?: IndustryDetail | null }

export default function IndustryContent({ industryKey, content }: { industryKey: IndustryKey; content?: IndustryContentShape }) {
  const [openFaq, setOpenFaq] = useState(0)
  const d = content ?? { ...INDUSTRY_DATA[industryKey], detail: INDUSTRY_DETAIL[industryKey] }
  const others = otherIndustriesFor(industryKey)
  const pageUrl = `https://matjarx.com${routes.industry(INDUSTRY_SLUGS[industryKey])}`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://matjarx.com' + routes.home },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://matjarx.com' + routes.home },
      { '@type': 'ListItem', position: 3, name: d.name, item: pageUrl },
    ],
  }
  const faqJsonLd = d.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: d.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      }
    : null

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <AmbientOrbs />
      <div className="page-content">
        <SiteHeader active="services" />

        {/* Breadcrumb */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '44px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', fontSize: 12.5, color: '#5A6F82' }}>
            <Link href={routes.home}>Home</Link>
            <span>/</span>
            <span>Industries</span>
            <span>/</span>
            <span style={{ fontWeight: 600, color: '#04121F' }}>{d.name}</span>
          </div>
        </section>

        {/* Hero */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 'clamp(30px, 4vw, 52px)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
            {d.built && (
              <span className="glass-chip" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 9, padding: '8px 16px 8px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 600, color: '#3B5063' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--olive)' }} />
                {d.built}
              </span>
            )}

            <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.06, letterSpacing: '-1.9px', color: '#04121F' }}>
              {d.headline ?? <>Websites for <span className="marker">{d.lower}</span> — built in 7 days</>}
            </h1>

            <p style={{ margin: 0, maxWidth: '34em', fontSize: 'clamp(14.5px, 1.7vw, 17.5px)', lineHeight: 1.6, color: '#435A70' }}>{d.subhead}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingTop: 4 }}>
              <Link href={routes.pricing} className="btn-primary">Start my website</Link>
              <Link href={routes.websiteExamples} className="btn-secondary">See real examples</Link>
            </div>

            {d.ticks && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 26px', paddingTop: 6 }}>
                {d.ticks.map((t) => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: '#435A70' }}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="var(--olive)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div style={{ minWidth: 0, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-14px -10px -18px -10px', borderRadius: 32, background: d.tint, boxShadow: '0 40px 90px rgba(4,18,31,0.28)', zIndex: 0 }} />
            {d.sample ? (
              <div style={{ position: 'relative', zIndex: 1, padding: 3 }}>
                <div style={{ borderRadius: 18, overflow: 'hidden', background: '#FFFCF5', boxShadow: '0 24px 54px rgba(0,8,18,0.34)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 13px', background: '#0B1B27' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.16)' }} />
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.16)' }} />
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.16)' }} />
                    <span style={{ margin: '0 auto', padding: '4px 14px', borderRadius: 999, fontSize: 10, color: 'rgba(226,236,245,0.6)', background: 'rgba(255,255,255,0.07)' }}>{d.sample.domain}</span>
                  </div>
                  <div style={{ position: 'relative', minHeight: 236, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '40px 26px', textAlign: 'center', background: d.tint }}>
                    <span style={{ fontSize: 9, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>{d.sample.kicker}</span>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 28, lineHeight: 1.08, letterSpacing: '-1px', color: '#FFFFFF', textShadow: '0 2px 14px rgba(0,0,0,0.34)' }}>{d.sample.name}</span>
                    <span style={{ maxWidth: '24em', fontSize: 11.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.82)' }}>{d.sample.blurb}</span>
                    <span style={{ marginTop: 8, padding: '10px 24px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 11.5, color: '#14210b', background: 'linear-gradient(160deg, #F7F5C0, #E7E49B)' }}>{d.sample.cta}</span>
                  </div>
                  <div style={{ padding: '16px 18px 20px', background: '#FFFCF5', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                    {d.sample.tiles.map((t) => (
                      <span key={t.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <span style={{ height: 52, borderRadius: 9, background: t.tint }} />
                        <span style={{ fontSize: 8.5, fontWeight: 600, color: '#1B2C3A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-dark-panel" style={{ position: 'relative', zIndex: 1, padding: '32px 30px', borderRadius: 26, minHeight: 236, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center' }}>
                <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="var(--butter)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 20, letterSpacing: '-0.5px', color: '#FFFFFF' }}>Built for {d.lower}</span>
                <span style={{ maxWidth: '24em', fontSize: 13.5, lineHeight: 1.6, color: 'rgba(226,236,245,0.75)' }}>{d.subhead}</span>
              </div>
            )}
          </div>
        </section>

        {/* Feature grid */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 38 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>What your site needs</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>{d.needsTitle ?? `What a ${d.lower} website needs to do`}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
            {d.features.map((f) => (
              <div key={f.title} className="glass-card" style={{ padding: '26px 26px 28px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ width: 42, height: 42, borderRadius: 13, background: 'var(--navy)', display: 'grid', placeItems: 'center' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--butter)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                </span>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '-0.35px', color: '#04121F' }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#4B5D6E' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quote panel — only when a real testimonial exists for this industry */}
        {d.quote && (
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '76px 24px 0' }}>
            <div className="glass-dark-panel" style={{ padding: 'clamp(26px, 3.6vw, 44px)', borderRadius: 30, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(26px, 4vw, 42px)', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
                <span style={{ fontSize: 15, letterSpacing: '2.5px', color: 'var(--butter)' }}>★★★★★</span>
                <p style={{ margin: 0, fontSize: 'clamp(15px, 1.8vw, 17px)', lineHeight: 1.62, color: 'rgba(255,255,255,0.9)' }}>&ldquo;{d.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, paddingTop: 4 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--butter)' }}>{d.quoteName}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{d.quoteCompany}</span>
                </div>
              </div>
              {d.results && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
                  {d.results.map((r) => (
                    <div key={r.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3vw, 30px)', letterSpacing: '-0.9px', color: '#FFFFFF' }}>{r.value}</span>
                      <span style={{ fontSize: 13, color: 'rgba(226,236,245,0.6)' }}>{r.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 34, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', lineHeight: 1.14, letterSpacing: '-1.1px', color: '#04121F' }}>{d.name} <span style={{ background: 'var(--butter)', padding: '0 8px', borderRadius: 3 }}>questions</span></h2>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#435A70' }}>Call +92 303 372 0953 and ask for someone who has built for {d.lower} before.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
              {d.faqs.map(([question, answer], i) => {
                const open = openFaq === i
                return (
                  <div key={question} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden' }}>
                    <button type="button" onClick={() => setOpenFaq(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '19px 22px' }}>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, lineHeight: 1.35, color: '#04121F', marginRight: 'auto', textAlign: 'left' }}>{question}</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#5A6F82" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {open && <p style={{ margin: 0, padding: '0 22px 21px', fontSize: 14.5, lineHeight: 1.68, color: '#435A70' }}>{answer}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <IndustryDetailSections industryKey={industryKey} detail={d.detail} />

        {/* Other industries */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <span style={{ display: 'block', marginBottom: 20, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Other industries we build for</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {others.map((o) => (
              <Link key={o.label} href={o.href} className="plan-other-card glass-chip" style={{ padding: '11px 18px', borderRadius: 999, fontSize: 13.5, fontWeight: 600, color: '#3B5063', whiteSpace: 'nowrap' }}>
                {o.label}
              </Link>
            ))}
          </div>
        </section>

        <div style={{ height: 70 }} />
        <SiteFooter />
      </div>
    </div>
  )
}
