'use client'

// Plan page — from Marketing - Plan*.dc.html. One template, four
// variants driven by planKey: breadcrumb, tag pill, hero with price/setup
// pair, "what you get" feature card, "who it's for" cards, a navy delta
// panel comparing against the adjacent tier, FAQs, and cards to the other
// three plans.

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import { routes, appSignup } from '@/lib/routes'
import { trackEvent } from '@/lib/analytics'
import { ALL_PLANS, PLAN_DATA, otherPlansFor, CYCLE_FACTOR, moneyPKR, type PlanKey } from '@/lib/plan-data'
import PlanDetailSections from './PlanDetailSections'

export default function PlanContent({ planKey }: { planKey: PlanKey }) {
  const [openFaq, setOpenFaq] = useState(0)

  const p = ALL_PLANS[planKey]
  const monthlyNum = Number(p.price.replace(/[^0-9]/g, '')) || 0
  const yearlySaving = monthlyNum * 12 - monthlyNum * 12 * CYCLE_FACTOR.yearly
  const twoYearSaving = monthlyNum * 24 - monthlyNum * 24 * CYCLE_FACTOR.two
  const d = PLAN_DATA[planKey]
  const others = otherPlansFor(planKey)
  const pageUrl = `https://matjarx.com${routes.plan(planKey)}`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://matjarx.com' + routes.home },
      { '@type': 'ListItem', position: 2, name: 'Plans', item: 'https://matjarx.com' + routes.pricing },
      { '@type': 'ListItem', position: 3, name: p.name, item: pageUrl },
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
        <SiteHeader active="pricing" />

        {/* Breadcrumb */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '46px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', fontSize: 12.5, color: '#6A7F92' }}>
            <Link href={routes.home}>Home</Link>
            <span>/</span>
            <Link href={routes.pricing}>Plans</Link>
            <span>/</span>
            <span style={{ fontWeight: 600, color: '#04121F' }}>{p.name}</span>
          </div>
        </section>

        {/* Hero */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '30px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 'clamp(30px, 4vw, 54px)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
            <span style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 9, padding: '8px 16px 8px 12px', borderRadius: 999, background: d.tagBg, border: `1px solid ${d.tagLine}`, fontSize: 12.5, fontWeight: 600, color: d.tagInk }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: d.tagDot }} />
              {d.tag}
            </span>

            <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.06, letterSpacing: '-1.9px', color: '#04121F' }}>
              {p.name} Plan — <span className="marker">{d.headline}</span>
            </h1>

            <p style={{ margin: 0, maxWidth: '34em', fontSize: 'clamp(14.5px, 1.7vw, 17.5px)', lineHeight: 1.6, color: '#435A70' }}>{d.subhead}</p>

            {planKey === 'custom' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 4 }}>
                <span style={{ fontSize: 11.5, letterSpacing: '1.3px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>Pricing</span>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 3.6vw, 34px)', letterSpacing: '-1.2px', color: '#04121F' }}>Typically Rs. 500,000 – 15M+</span>
                <span style={{ fontSize: 13, color: '#6A7F92' }}>Scoped and quoted on a discovery call — no surprises</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, flexWrap: 'wrap', paddingTop: 4 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 11.5, letterSpacing: '1.3px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>Monthly</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 4vw, 40px)', letterSpacing: '-1.4px', color: '#04121F' }}>{p.price}</span>
                    <span style={{ fontSize: 14, color: '#6A7F92' }}>/ mo</span>
                  </div>
                </div>
                <span style={{ width: 1, height: 44, background: 'rgba(4,18,31,0.14)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 11.5, letterSpacing: '1.3px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>One-time setup</span>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 28px)', letterSpacing: '-0.9px', color: '#04121F' }}>{p.setup}</span>
                </div>
              </div>
            )}

            {planKey !== 'custom' && monthlyNum > 0 && (
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--olive)' }}>
                Pay yearly and save {moneyPKR(yearlySaving)}, or two years upfront and save {moneyPKR(twoYearSaving)} — <Link href={routes.pricing} style={{ fontWeight: 600 }}>see the full breakdown</Link>
              </p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingTop: 6 }}>
              {planKey === 'custom' ? (
                <Link href={routes.contact} onClick={() => trackEvent('cta_click', { label: `plan_${planKey}_cta` })} className="btn-primary">{d.ctaLabel}</Link>
              ) : (
                <a href={appSignup(planKey)} onClick={() => trackEvent('cta_click', { label: `plan_${planKey}_cta` })} className="btn-primary">{d.ctaLabel}</a>
              )}
              <a href="https://wa.me/923033720953" target="_blank" rel="noopener noreferrer" className="btn-secondary">Ask a question</a>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 26px', paddingTop: 6 }}>
              {d.heroTicks.map((t) => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: '#435A70' }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="var(--olive)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="glass-card" style={{ padding: '28px 30px 30px', borderRadius: 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 18, letterSpacing: '-0.4px', color: '#04121F', marginRight: 'auto' }}>What you get</span>
                <span style={{ fontSize: 11.5, fontWeight: 600, padding: '6px 12px', borderRadius: 999, color: '#3D3A08', background: 'var(--butter)', whiteSpace: 'nowrap' }}>{d.features.length} included</span>
              </div>
              {d.inherits && <span style={{ fontSize: 13.5, fontWeight: 700, fontFamily: 'var(--font-lato), Lato, sans-serif', color: 'var(--olive)' }}>{d.inherits}</span>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {d.features.map((f) => (
                  <span key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, fontSize: 14.5, lineHeight: 1.5, color: '#3B5063' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--olive)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <span style={{ textAlign: 'center', fontSize: 12.5, lineHeight: 1.55, color: '#6A7F92' }}>
              Prices in PKR. Gulf clients are quoted in AED — <Link href={routes.contact} style={{ fontWeight: 600 }}>ask for a quote</Link>.
            </span>
          </div>
        </section>

        {/* Who it's for */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 38 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Who it&apos;s for</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 36px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>{d.forTitle}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
            {d.audiences.map((a) => (
              <div key={a.title} className="glass-card" style={{ padding: '26px 26px 28px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ width: 42, height: 42, borderRadius: 13, background: 'var(--navy)', display: 'grid', placeItems: 'center' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--butter)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={a.icon} /></svg>
                </span>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '-0.35px', color: '#04121F' }}>{a.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#4B5D6E' }}>{a.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Compare with adjacent tier */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '76px 24px 0' }}>
          <div className="glass-dark-panel" style={{ padding: 'clamp(26px, 3.6vw, 44px)', borderRadius: 30, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(26px, 4vw, 42px)', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
              <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>Compared with {d.compareWith}</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#FFFFFF' }}>{d.compareTitle}</h2>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.62, color: 'rgba(226,236,245,0.68)' }}>{d.compareBody}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, paddingTop: 4 }}>
                <Link href={routes.pricing} style={{ padding: '14px 24px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#16210B', background: 'var(--butter)' }}>Compare all plans</Link>
                <Link href={d.otherHref} style={{ padding: '14px 24px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#FFFFFF', background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(255,255,255,0.2)' }}>{d.otherLabel}</Link>
              </div>
            </div>
            <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {d.deltas.map((delta) => (
                <div key={delta.label} className="glass-dark-inner" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '15px 17px', borderRadius: 15 }}>
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke={delta.ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d={delta.icon} /></svg>
                  <span style={{ fontSize: 13.5, lineHeight: 1.45, color: 'rgba(233,239,245,0.86)' }}>{delta.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 34, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', lineHeight: 1.14, letterSpacing: '-1.1px', color: '#04121F' }}>{p.name} <span style={{ background: 'var(--butter)', padding: '0 8px', borderRadius: 3 }}>questions</span></h2>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#435A70' }}>Anything else, call us on +92 303 372 0953 — a real person answers.</p>
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

        <PlanDetailSections planKey={planKey} />

        {/* Other plans */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <span style={{ display: 'block', marginBottom: 20, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Other plans</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 18 }}>
            {others.map((o) => (
              <Link key={o.name} href={o.href} className="plan-other-card glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '24px 26px 26px', borderRadius: 22, color: '#04121F' }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 20, letterSpacing: '-0.5px', color: '#04121F' }}>{o.name}</span>
                <span style={{ fontSize: 13.5, lineHeight: 1.55, color: '#4B5D6E' }}>{o.pitch}</span>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 5, paddingTop: 4 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 20, letterSpacing: '-0.6px', color: '#04121F' }}>{o.price}</span>
                  {o.name !== 'Custom' && <span style={{ fontSize: 12.5, color: '#6A7F92' }}>/ mo</span>}
                </span>
                <span style={{ marginTop: 4, fontSize: 13, fontWeight: 600, color: 'var(--olive)' }}>See the {o.name} plan →</span>
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
