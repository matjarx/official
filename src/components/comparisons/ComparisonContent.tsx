'use client'

// Comparison page template — from Marketing - vs Wix.dc.html (and its
// vs Squarespace / vs GoDaddy siblings, same component + data shape). One
// real template shared by every rival.

import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import { routes } from '@/lib/routes'
import { RIVAL_DATA, otherComparisonsFor, type RivalKey } from '@/lib/comparison-data'
import { PLATFORM_LOGOS } from '@/lib/platform-logos-data'

export type ComparisonContentShape = (typeof RIVAL_DATA)[RivalKey]

export default function ComparisonContent({ rivalKey, content }: { rivalKey: RivalKey; content?: ComparisonContentShape }) {
  const d = content ?? RIVAL_DATA[rivalKey]
  const others = otherComparisonsFor(rivalKey)
  const pageUrl = `https://matjarx.com${routes.compare(rivalKey)}`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://matjarx.com' + routes.home },
      { '@type': 'ListItem', position: 2, name: 'Alternatives', item: 'https://matjarx.com' + routes.bestBuilder },
      { '@type': 'ListItem', position: 3, name: `MatjarX vs ${d.name}`, item: pageUrl },
    ],
  }

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <AmbientOrbs />
      <div className="page-content">
        <SiteHeader active="resources" />

        {/* Breadcrumb */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '44px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', fontSize: 12.5, color: '#6A7F92' }}>
            <Link href={routes.home}>Home</Link>
            <span>/</span>
            <Link href={routes.bestBuilder}>Alternatives</Link>
            <span>/</span>
            <span style={{ fontWeight: 600, color: '#04121F' }}>MatjarX vs {d.name}</span>
          </div>
        </section>

        {/* Hero */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '28px 24px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <span className="glass-chip" style={{ padding: '8px 16px', borderRadius: 999, fontSize: 12.5, fontWeight: 600, color: '#3B5063' }}>Honest comparison</span>
          {PLATFORM_LOGOS[d.name] && (
            <span style={{ position: 'relative', width: 40, height: 40 }}>
              <Image src={PLATFORM_LOGOS[d.name]} alt="" fill sizes="40px" style={{ objectFit: 'contain' }} />
            </span>
          )}
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5.4vw, 54px)', lineHeight: 1.06, letterSpacing: '-1.9px', color: '#04121F' }}>
            MatjarX vs <span className="marker">{d.name}</span>
          </h1>
          {d.intro.map((p) => (
            <p key={p} style={{ margin: 0, maxWidth: '38em', fontSize: 'clamp(14.5px, 1.8vw, 18px)', lineHeight: 1.62, color: '#435A70' }}>{p}</p>
          ))}
        </section>

        {/* Two-card side-by-side */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '52px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 22, alignItems: 'stretch' }}>
            <div className="glass-dark-panel" style={{ padding: 'clamp(26px, 3.2vw, 34px)', borderRadius: 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 20, letterSpacing: '-0.5px', color: '#FFFFFF' }}>MatjarX</span>
                <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase', color: 'var(--navy)', background: 'var(--butter)', padding: '4px 10px', borderRadius: 999 }}>Done for you</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {d.ourPoints.map((p) => (
                  <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--moss-light)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                    <span style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(233,239,245,0.9)' }}>{p}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.14)', display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 22, letterSpacing: '-0.6px', color: 'var(--butter)' }}>From Rs. 4,500 / mo</span>
                <span style={{ fontSize: 12.5, color: 'rgba(226,236,245,0.62)' }}>plus a one-time setup fee, everything included</span>
              </div>
            </div>

            <div className="glass-card" style={{ padding: 'clamp(26px, 3.2vw, 34px)', borderRadius: 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 20, letterSpacing: '-0.5px', color: '#04121F' }}>{d.name}</span>
                {d.mode && <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase', color: '#8A6A4B', background: 'rgba(180,135,79,0.14)', padding: '4px 10px', borderRadius: 999 }}>{d.mode}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {d.points.map((p) => (
                  <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#B4874F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="M6 6l12 12M18 6 6 18" /></svg>
                    <span style={{ fontSize: 14, lineHeight: 1.55, color: '#4B5D6E' }}>{p}</span>
                  </div>
                ))}
              </div>
              {d.price && (
                <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid rgba(4,18,31,0.09)', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 22, letterSpacing: '-0.6px', color: '#04121F' }}>{d.price}</span>
                  <span style={{ fontSize: 12.5, color: '#6A7F92' }}>{d.priceNote}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '70px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 30 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Side by side</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>MatjarX vs {d.name}, feature by feature</h2>
          </div>
          <div className="glass-card" style={{ borderRadius: 22, overflow: 'hidden' }}>
            <div className="table-scroll" style={{ padding: '22px 24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) repeat(2, minmax(120px, 1fr))', gap: '8px 14px', alignItems: 'center', minWidth: 560 }}>
                <span />
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 12.5, letterSpacing: '0.4px', textTransform: 'uppercase', color: 'var(--navy)', textAlign: 'center' }}>MatjarX</span>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 12.5, letterSpacing: '0.4px', textTransform: 'uppercase', color: '#6A7F92', textAlign: 'center' }}>{d.name}</span>
                {d.table.map(([label, us, them]) => {
                  const themColor = them === 'No' || them === 'Not supported' ? '#B4874F' : '#8A6A4B'
                  return (
                    <div key={label} style={{ display: 'contents' }}>
                      <span style={{ fontSize: 13.5, lineHeight: 1.45, color: '#24384A', padding: '11px 0', borderTop: '1px solid rgba(4,18,31,0.07)' }}>{label}</span>
                      <span style={{ textAlign: 'center', padding: '11px 0', borderTop: '1px solid rgba(4,18,31,0.07)', fontSize: 12.5, fontWeight: 600, color: 'var(--olive-active)' }}>{us}</span>
                      <span style={{ textAlign: 'center', padding: '11px 0', borderTop: '1px solid rgba(4,18,31,0.07)', fontSize: 12.5, fontWeight: 600, color: themColor }}>{them}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Honest panel — the original 3 rivals only */}
        {d.honest && (
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '70px 24px 0' }}>
            <div className="glass-cream" style={{ padding: 'clamp(26px, 3.4vw, 40px)', borderRadius: 26, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: '#8A7A5E', fontWeight: 600 }}>Being straight with you</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(21px, 3vw, 27px)', lineHeight: 1.2, letterSpacing: '-0.8px', color: '#04121F' }}>When {d.name} is the better choice</h2>
              <p style={{ margin: 0, maxWidth: '46em', fontSize: 14.5, lineHeight: 1.65, color: '#4B5D6E' }}>{d.honest}</p>
            </div>
          </section>
        )}

        {/* Why we win — the 39 added rivals */}
        {d.whyWeWin && (
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '70px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 30 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Why MatjarX wins</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 34px)', lineHeight: 1.16, letterSpacing: '-1px', color: '#04121F' }}>Against {d.name}, here&rsquo;s what actually changes</h2>
            </div>
            <div className="glass-cream" style={{ padding: 'clamp(26px, 3.4vw, 40px)', borderRadius: 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {d.whyWeWin.map((p) => (
                <p key={p} style={{ margin: 0, fontSize: 15, lineHeight: 1.68, color: '#33485B' }}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {/* What you'll love checklist — the 39 added rivals */}
        {d.checklist && (
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '70px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 30 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>What you&rsquo;ll love</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 34px)', lineHeight: 1.16, letterSpacing: '-1px', color: '#04121F' }}>About switching to MatjarX</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 18 }}>
              {d.checklist.map((c) => (
                <div key={c.title} className="glass-card" style={{ padding: '22px 24px', borderRadius: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--olive)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, letterSpacing: '-0.3px', color: '#04121F' }}>{c.title}</span>
                  </div>
                  <span style={{ fontSize: 13.5, lineHeight: 1.55, color: '#4B5D6E' }}>{c.body}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Testimonial */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '70px 24px 0' }}>
          <div style={{ padding: 'clamp(26px, 3.6vw, 42px)', borderRadius: 26, background: 'linear-gradient(160deg, rgba(4,18,31,0.97), rgba(0,28,51,0.97))', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(24px)', boxShadow: '0 30px 66px rgba(4,18,31,0.32), inset 0 1px 0 rgba(255,255,255,0.18)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(26px, 4vw, 40px)', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
              <span style={{ fontSize: 15, letterSpacing: '2.5px', color: 'var(--butter)' }}>★★★★★</span>
              <p style={{ margin: 0, fontSize: 'clamp(15px, 1.8vw, 17px)', lineHeight: 1.62, color: 'rgba(255,255,255,0.9)' }}>&ldquo;I really tried to build a website myself, but it didn&rsquo;t look good and I had no idea how to make it show up on Google. MatjarX just did the whole thing.&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, paddingTop: 4 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--butter)' }}>Ahmed Khan</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Al-Falah Traders, Lahore</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link href={routes.pricing} className="btn-primary">Compare our plans</Link>
              <Link href={routes.websiteExamples} className="btn-secondary">See real MatjarX sites</Link>
            </div>
          </div>
        </section>

        {/* Other comparisons */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <span style={{ display: 'block', marginBottom: 20, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Other comparisons</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
            {others.map((c) => (
              <Link key={c.title} href={c.href} className="glass-card" style={{ padding: '22px 24px', borderRadius: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px', color: '#04121F' }}>{c.title}</span>
                <span style={{ fontSize: 13, lineHeight: 1.5, color: '#6A7F92' }}>{c.body}</span>
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
