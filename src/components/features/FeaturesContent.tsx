'use client'

// Features page — from Marketing - Features.dc.html. Five tabs, six cards
// each (badged by unlocking tier), the editor showcase mid-page, an
// "included on every plan" strip, and FAQs.

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import EditorShowcase from '@/components/EditorShowcase'
import { routes } from '@/lib/routes'
import { FEATURE_GROUPS, ALWAYS_ON, FEATURES_FAQ, type FeatureGroupKey } from '@/lib/features-data'

const TAB_KEYS = Object.keys(FEATURE_GROUPS) as FeatureGroupKey[]

export default function FeaturesContent() {
  const [tab, setTab] = useState<FeatureGroupKey>('website')
  const [openFaq, setOpenFaq] = useState(0)

  const g = FEATURE_GROUPS[tab]

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <AmbientOrbs />
      <div className="page-content">
        <SiteHeader active="pricing" />

        {/* Hero */}
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Features</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5.2vw, 52px)', lineHeight: 1.07, letterSpacing: '-1.9px', color: '#04121F' }}>
            Everything your website needs, <span className="marker">already included</span>
          </h1>
          <p style={{ margin: 0, maxWidth: '36em', fontSize: 'clamp(14.5px, 1.7vw, 17.5px)', lineHeight: 1.62, color: '#435A70' }}>
            No app store, no plugins to maintain, no surprise add-on bills. Every feature below is part of the platform — we just switch on the ones your business actually uses.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingTop: 4 }}>
            <Link href={routes.pricing} className="btn-primary">See plans &amp; pricing</Link>
            <Link href={routes.websiteExamples} className="btn-secondary">See it in action</Link>
          </div>
        </section>

        {/* Tabs */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '44px 24px 0' }}>
          <div className="glass-nav-pill" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', padding: 7, borderRadius: 999, width: 'fit-content', margin: '0 auto', boxShadow: '0 12px 30px rgba(4,18,31,0.07), inset 0 1px 0 rgba(255,255,255,0.95)' }}>
            {TAB_KEYS.map((k) => {
              const on = tab === k
              return (
                <button key={k} type="button" onClick={() => setTab(k)} style={{ all: 'unset', cursor: 'pointer', padding: '11px 22px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13.5, whiteSpace: 'nowrap', color: on ? '#FFFFFF' : '#4B5D6E', background: on ? 'var(--navy)' : 'transparent', transition: 'background 180ms ease' }}>
                  {FEATURE_GROUPS[k].label}
                </button>
              )
            })}
          </div>
        </section>

        {/* Feature cards */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '42px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center', marginBottom: 34 }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.8vw, 34px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>{g.title}</h2>
            <p style={{ margin: 0, maxWidth: '34em', fontSize: 15.5, lineHeight: 1.6, color: '#435A70' }}>{g.body}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: 20 }}>
            {g.features.map((f) => (
              <div key={f.title} className="glass-card" style={{ padding: '26px 26px 28px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <span style={{ width: 42, height: 42, flex: '0 0 auto', borderRadius: 13, background: 'var(--navy)', display: 'grid', placeItems: 'center' }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--butter)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                  </span>
                  {f.tag && <span style={{ marginLeft: 'auto', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.7px', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 999, color: f.tagInk, background: f.tagBg, whiteSpace: 'nowrap' }}>{f.tag}</span>}
                </div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 18.5, letterSpacing: '-0.35px', color: '#04121F' }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#4B5D6E' }}>{f.body}</p>
                <span style={{ marginTop: 'auto', paddingTop: 10, fontSize: 12.5, fontWeight: 600, color: 'var(--olive)' }}>{f.plan}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Editor showcase */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <div className="glass-dark-panel" style={{ padding: 'clamp(26px, 3.6vw, 44px)', borderRadius: 30, display: 'flex', flexDirection: 'column', gap: 26 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginRight: 'auto', minWidth: 0 }}>
                <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>The editor</span>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#FFFFFF' }}>Change a photo. Take a booking. Start selling.</h2>
                <p style={{ margin: 0, maxWidth: '34em', fontSize: 15, lineHeight: 1.65, color: 'rgba(226,236,245,0.68)' }}>Switch between a product business and a service business and watch the buttons, panels and layout change with it. That&apos;s the same editor your site ships with.</p>
              </div>
              <Link href={routes.pricing} style={{ padding: '15px 26px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#16210B', background: 'var(--butter)' }}>Get the editor</Link>
            </div>
            <EditorShowcase />
          </div>
        </section>

        {/* Always on */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 34 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Included on every plan</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.8vw, 34px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>The things other builders charge extra for</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 14 }}>
            {ALWAYS_ON.map((label) => (
              <div key={label} className="glass-chip" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', borderRadius: 16 }}>
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--olive)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: '#04121F' }}>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 34, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', lineHeight: 1.14, letterSpacing: '-1.1px', color: '#04121F' }}>Feature <span style={{ background: 'var(--butter)', padding: '0 8px', borderRadius: 3 }}>questions</span></h2>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#435A70' }}>Need something not listed here? Ask us — if it&apos;s reasonable, we usually build it.</p>
              <Link href={routes.help} className="btn-secondary" style={{ alignSelf: 'flex-start', marginTop: 6 }}>Talk to us</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
              {FEATURES_FAQ.map(([question, answer], i) => {
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

        <div style={{ height: 70 }} />
        <SiteFooter />
      </div>
    </div>
  )
}
