'use client'

// Location page template — real per-city content (files/matjarx_website_
// design_*.md) driving one shared template across all 63 cities. The 3
// major cities (Karachi/Lahore/Islamabad) additionally carry the original
// design handoff's handcrafted stats/areas-served/testimonial, rendered
// only when present so the other 60 cities degrade gracefully.

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import { routes } from '@/lib/routes'
import { CITY_DATA, otherCitiesFor, type CityKey } from '@/lib/location-data'
import { CITY_DETAIL, type CityProcessStep, type CityPlanTier, type CityCompareGroup } from '@/lib/location-detail-data'

const bullet = (text: string, key?: React.Key) => (
  <li key={key ?? text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.55, color: '#4B5D6E' }}>
    <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--olive)', flex: '0 0 auto' }} />{text}
  </li>
)

export type LocationContentShape = (typeof CITY_DATA)[CityKey] & {
  detail: { process: CityProcessStep[]; plans: CityPlanTier[]; whyOver: CityCompareGroup[] }
}

export default function LocationContent({ locationKey, content }: { locationKey: CityKey; content?: LocationContentShape }) {
  const [openFaq, setOpenFaq] = useState(0)
  const d = content ?? { ...CITY_DATA[locationKey], detail: CITY_DETAIL[locationKey] }
  const detail = d.detail
  const others = otherCitiesFor(locationKey)
  const pageUrl = `https://matjarx.com${routes.location(locationKey)}`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://matjarx.com' + routes.home },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://matjarx.com' + routes.home },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', fontSize: 12.5, color: '#6A7F92' }}>
            <Link href={routes.home}>Home</Link>
            <span>/</span>
            <span>Locations</span>
            <span>/</span>
            <span style={{ fontWeight: 600, color: '#04121F' }}>{d.name}</span>
          </div>
        </section>

        {/* Hero */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 'clamp(30px, 4vw, 52px)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
            {d.built && (
              <span className="glass-chip" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 9, padding: '8px 16px 8px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 600, color: '#3B5063' }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--olive)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /></svg>
                {d.built}
              </span>
            )}

            <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 4.6vw, 48px)', lineHeight: 1.1, letterSpacing: '-1.7px', color: '#04121F' }}>
              Website design in <span className="marker">{d.name}</span> — launched in 7 days
            </h1>

            <p style={{ margin: 0, maxWidth: '34em', fontSize: 'clamp(14.5px, 1.7vw, 17.5px)', lineHeight: 1.6, color: '#435A70' }}>{d.intro[0]}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingTop: 4 }}>
              <Link href={routes.pricing} className="btn-primary">Start my website</Link>
              <a href="tel:+923033720953" className="btn-secondary">Call +92 303 372 0953</a>
            </div>
          </div>

          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="glass-dark-panel" style={{ padding: '26px 28px 28px', borderRadius: 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 19, letterSpacing: '-0.5px', color: '#FFFFFF' }}>{d.name} at a glance</span>
              {d.stats ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                  {d.stats.map((s) => (
                    <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 26, letterSpacing: '-0.8px', color: 'var(--butter)' }}>{s.value}</span>
                      <span style={{ fontSize: 12.5, lineHeight: 1.45, color: 'rgba(226,236,245,0.62)' }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: 'rgba(226,236,245,0.8)' }}>{d.intro[1] ?? d.intro[0]}</p>
              )}
              <div style={{ height: 150, borderRadius: 16, background: d.tint ?? 'linear-gradient(150deg, var(--navy), var(--olive))', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 20px', textAlign: 'center' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--moss-light)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /></svg>
                <span style={{ fontSize: 12.5, color: 'rgba(226,236,245,0.6)' }}>{d.areasLine ?? `Serving ${d.name} and the surrounding area`}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why this city chooses us */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 38 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Local, not generic</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>Why {d.name} businesses choose MatjarX</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
            {d.why.map((f) => (
              <div key={f.title} className="glass-card" style={{ padding: '26px 26px 28px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ width: 42, height: 42, borderRadius: 13, background: 'var(--navy)', display: 'grid', placeItems: 'center' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--butter)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                </span>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '-0.35px', color: '#04121F' }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#4B5D6E' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Industries served */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '70px 24px 0' }}>
          <div className="glass-cream" style={{ padding: 'clamp(26px, 3.4vw, 40px)', borderRadius: 26, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: '#8A7A5E', fontWeight: 600 }}>What we build</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(22px, 3.2vw, 30px)', lineHeight: 1.16, letterSpacing: '-1px', color: '#04121F' }}>Websites for {d.name}&rsquo;s industries</h2>
            </div>
            {d.industries.some((i) => i.body) ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
                {d.industries.map((i) => (
                  <div key={i.title} style={{ padding: '18px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(255,255,255,0.9)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F' }}>{i.title}</span>
                    {i.body && <span style={{ fontSize: 13, lineHeight: 1.55, color: '#4B5D6E' }}>{i.body}</span>}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {d.industries.map((i) => (
                  <span key={i.title} style={{ padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, color: '#3B5063', background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(255,255,255,0.9)', whiteSpace: 'nowrap' }}>{i.title}</span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* How it works — 3-step process for this city */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '70px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 38 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>How it works</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>Our 3-step process for {d.name} businesses</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 18 }}>
            {detail.process.map((s, i) => (
              <div key={s.title} className="glass-card" style={{ padding: '26px 24px 28px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 32, lineHeight: 1, color: 'var(--moss-light)' }}>{i + 1}</span>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, color: '#04121F' }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#4B5D6E' }}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Plans for this city's businesses */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '70px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 38 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Pricing</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>Plans for {d.name} businesses</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 16 }}>
            {detail.plans.map((p) => (
              <div key={p.name} className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 16, color: '#04121F' }}>{p.name}</span>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 20, color: '#04121F' }}>{p.price}</span>
                {p.items.length > 0 && <ul style={{ margin: '4px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>{p.items.map((it, i) => bullet(it, i))}</ul>}
                {p.setup && <span style={{ marginTop: 'auto', paddingTop: 8, fontSize: 12.5, color: '#8A9AA6' }}>Setup: {p.setup}</span>}
              </div>
            ))}
          </div>
          <p style={{ margin: '22px 0 0', textAlign: 'center' }}><Link href={routes.pricing} style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--olive)' }}>View full pricing →</Link></p>
        </section>

        {/* Why MatjarX over other options, for this city */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '70px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 38 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>The comparison</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>Why MatjarX over other options</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16 }}>
            {detail.whyOver.map((g) => (
              <div key={g.label} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
                <h4 style={{ margin: '0 0 10px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: '#04121F' }}>{g.label}</h4>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>{g.items.map((it, i) => bullet(it, i))}</ul>
              </div>
            ))}
          </div>
        </section>

        {/* Areas we serve — only for cities with real area data */}
        {d.areas && (
          <section style={{ maxWidth: 1240, margin: '0 auto', padding: '70px 24px 0' }}>
            <div className="glass-cream" style={{ padding: 'clamp(26px, 3.4vw, 40px)', borderRadius: 26, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: '#8A7A5E', fontWeight: 600 }}>Areas we serve</span>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(22px, 3.2vw, 30px)', lineHeight: 1.16, letterSpacing: '-1px', color: '#04121F' }}>Businesses across {d.name} and around it</h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {d.areas.map((a) => (
                  <span key={a} style={{ padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, color: '#3B5063', background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(255,255,255,0.9)', whiteSpace: 'nowrap' }}>{a}</span>
                ))}
              </div>
              {d.areasNote && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.62, color: '#4B5D6E' }}>{d.areasNote}</p>}
            </div>
          </section>
        )}

        {/* Quote panel — only for cities with a real testimonial */}
        {d.quote && (
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '70px 24px 0' }}>
            <div style={{ padding: 'clamp(26px, 3.6vw, 42px)', borderRadius: 26, background: 'linear-gradient(160deg, rgba(4,18,31,0.97), rgba(0,28,51,0.97))', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(24px)', boxShadow: '0 30px 66px rgba(4,18,31,0.32), inset 0 1px 0 rgba(255,255,255,0.18)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(26px, 4vw, 40px)', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
                <span style={{ fontSize: 15, letterSpacing: '2.5px', color: 'var(--butter)' }}>★★★★★</span>
                <p style={{ margin: 0, fontSize: 'clamp(15px, 1.8vw, 17px)', lineHeight: 1.62, color: 'rgba(255,255,255,0.9)' }}>&ldquo;{d.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, paddingTop: 4 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--butter)' }}>{d.quoteName}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{d.quoteCompany}</span>
                </div>
              </div>
              {d.wins && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11, minWidth: 0 }}>
                  {d.wins.map((w) => (
                    <div key={w} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '15px 17px', borderRadius: 15, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)' }}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--moss-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="M12 19V5M12 5l-5 5M12 5l5 5" /></svg>
                      <span style={{ fontSize: 13.5, lineHeight: 1.5, color: 'rgba(233,239,245,0.86)' }}>{w}</span>
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
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#435A70' }}>{d.officeLine ?? `Still deciding? Call +92 303 372 0953 and we'll walk you through it.`}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
              {d.faqs.map(([question, answer], i) => {
                const open = openFaq === i
                return (
                  <div key={question} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden' }}>
                    <button type="button" onClick={() => setOpenFaq(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '19px 22px' }}>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, lineHeight: 1.35, color: '#04121F', marginRight: 'auto', textAlign: 'left' }}>{question}</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#6A7F92" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {open && <p style={{ margin: 0, padding: '0 22px 21px', fontSize: 14.5, lineHeight: 1.68, color: '#435A70' }}>{answer}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Other cities */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <span style={{ display: 'block', marginBottom: 20, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Other cities we work in</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {others.map((c) => (
              <Link key={c.label} href={c.href} className="plan-other-card glass-chip" style={{ padding: '11px 18px', borderRadius: 999, fontSize: 13.5, fontWeight: 600, color: '#3B5063', whiteSpace: 'nowrap' }}>
                Website design {c.label}
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
