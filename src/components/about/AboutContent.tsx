'use client'

// About page — from Marketing - About.dc.html. Navy hero, a stats
// strip overlapping the hero band, story two-column with photo
// placeholders, values grid, team grid, an "About MatjarX" FAQ
// accordion, a dark "want to work with us?" CTA panel.

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { routes } from '@/lib/routes'
import { ABOUT_STATS, ABOUT_VALUES, ABOUT_TEAM, ABOUT_FAQS } from '@/lib/about-data'

export type AboutContentShape = { stats: typeof ABOUT_STATS; values: typeof ABOUT_VALUES; team: typeof ABOUT_TEAM; faqs: typeof ABOUT_FAQS }
const DEFAULT_CONTENT: AboutContentShape = { stats: ABOUT_STATS, values: ABOUT_VALUES, team: ABOUT_TEAM, faqs: ABOUT_FAQS }

export default function AboutContent({ content = DEFAULT_CONTENT }: { content?: AboutContentShape }) {
  const [openFaq, setOpenFaq] = useState(0)
  const { stats: ABOUT_STATS_ACTIVE, values: ABOUT_VALUES_ACTIVE, team: ABOUT_TEAM_ACTIVE, faqs: ABOUT_FAQS_ACTIVE } = content

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="company" />

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '62px 24px 56px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>About MatjarX</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(31px, 5.8vw, 52px)', lineHeight: 1.08, letterSpacing: '-1.8px', color: '#FFFFFF' }}>
            We think every business deserves to be <span style={{ background: 'var(--moss-light)', color: '#16210B', padding: '0 10px', borderRadius: 3 }}>findable</span>
          </h1>
          <p style={{ margin: 0, maxWidth: '34em', fontSize: 17, lineHeight: 1.62, color: 'rgba(255,255,255,0.72)' }}>Not just the ones who can afford an agency, or who have the spare evenings to learn a website builder.</p>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <div className="orb-field">
          <div style={{ position: 'absolute', width: 720, height: 720, right: -190, top: 60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,170,215,0.32) 0%, rgba(120,170,215,0) 68%)' }} />
          <div style={{ position: 'absolute', width: 780, height: 780, left: '20%', top: 1100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,242,174,0.36) 0%, rgba(244,242,174,0) 70%)' }} />
        </div>
        <div className="page-content">

          {/* Stats strip, overlapping the hero */}
          <section style={{ maxWidth: 1200, margin: '0 auto', padding: 0 }}>
            <div style={{ maxWidth: 1140, margin: '-34px auto 0', padding: '0 24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(50%, 200px), 1fr))', gap: 2, borderRadius: 22, overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(4,18,31,0.09)', boxShadow: '0 20px 46px rgba(4,18,31,0.1)' }}>
                {ABOUT_STATS_ACTIVE.map((s) => (
                  <div key={s.label} style={{ padding: '30px 26px', display: 'flex', flexDirection: 'column', gap: 6, background: '#FFFFFF' }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 34, letterSpacing: '-1.2px', color: '#04121F' }}>{s.value}</span>
                    <span style={{ fontSize: 13.5, color: '#6A7F92' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Our story */}
          <section style={{ maxWidth: 1140, margin: '0 auto', padding: '74px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 48, alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
                <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Our story</span>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.3px', color: '#04121F' }}>It started with a question we couldn&rsquo;t answer well</h2>
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: '#33485B' }}>A fabric wholesaler in Faisalabad asked us what a website would cost him. The honest answer at the time was uncomfortable: either several hundred thousand rupees to an agency, or a year of his own evenings learning a builder he would probably abandon.</p>
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: '#33485B' }}>Neither answer was reasonable for a business doing solid trade with twelve staff. So we built the option that should have existed: a fixed price, a fixed timeline, and a team that does the work.</p>
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: '#33485B' }}>Eight years later we&rsquo;ve built 70,000+ websites. The model hasn&rsquo;t changed much — you tell us about your business, we build the whole thing, and we stay on to keep it working.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
                <div style={{ height: 300, borderRadius: 22, background: 'linear-gradient(150deg, var(--navy), var(--olive))', display: 'grid', placeItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 17, color: 'rgba(255,255,255,0.85)' }}>Team photo</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                  <div style={{ height: 150, borderRadius: 18, background: 'linear-gradient(150deg, var(--moss-light), var(--olive))' }} />
                  <div style={{ height: 150, borderRadius: 18, background: 'linear-gradient(150deg, #2E6EA8, var(--navy))' }} />
                </div>
              </div>
            </div>
          </section>

          {/* What we believe */}
          <section style={{ background: 'var(--cream-deep)', padding: '76px 24px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ maxWidth: 640, margin: '0 auto 42px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.3px', color: '#04121F' }}>What we <span className="marker">believe</span></h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
                {ABOUT_VALUES_ACTIVE.map((v) => (
                  <div key={v.title} className="glass-card" style={{ padding: '30px 28px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 13 }}>
                    <span style={{ width: 44, height: 44, borderRadius: 13, background: 'var(--navy)', display: 'grid', placeItems: 'center' }}>
                      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="var(--butter)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={v.icon} /></svg>
                    </span>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 19, letterSpacing: '-0.35px', color: '#04121F' }}>{v.title}</h3>
                    <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.62, color: '#4B5D6E' }}>{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          <section style={{ maxWidth: 1200, margin: '0 auto', padding: '76px 24px' }}>
            <div style={{ maxWidth: 640, margin: '0 auto 42px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.3px', color: '#04121F' }}>The people behind it</h2>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#435A70' }}>A team of designers, writers, SEO specialists and concierges across Lahore and Karachi.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 20 }}>
              {ABOUT_TEAM_ACTIVE.map((t) => (
                <div key={t.name} style={{ borderRadius: 22, overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(4,18,31,0.08)' }}>
                  <div style={{ position: 'relative', height: 210, background: t.photo ? undefined : t.tint, display: 'grid', placeItems: 'center' }}>
                    {t.photo ? (
                      <Image src={t.photo.src} alt={t.photo.alt} fill sizes="220px" style={{ objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 30, letterSpacing: '-0.6px', color: 'rgba(255,255,255,0.92)' }}>{t.initials}</span>
                    )}
                  </div>
                  <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16.5, color: '#04121F' }}>{t.name}</span>
                    <span style={{ fontSize: 13, color: '#6A7F92' }}>{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* About FAQ */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px 76px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 30 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Questions about our company</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 32px)', lineHeight: 1.16, letterSpacing: '-1px', color: '#04121F' }}>About MatjarX</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ABOUT_FAQS_ACTIVE.map(([q, a], i) => {
                const open = openFaq === i
                return (
                  <div key={i} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden' }}>
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

          {/* Want to work with us CTA */}
          <section style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px 76px' }}>
            <div style={{ padding: 'clamp(28px, 4vw, 44px) clamp(22px, 3.5vw, 46px)', borderRadius: 26, background: '#04121F', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 40, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.8vw, 32px)', lineHeight: 1.16, letterSpacing: '-1.1px', color: '#FFFFFF' }}>Want to work with us?</h2>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.62, color: 'rgba(255,255,255,0.65)' }}>We&rsquo;re hiring designers, copywriters and SEO specialists in Lahore — and we work with agencies and freelancers through our partner program.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
                <Link href={routes.careers} className="btn-primary" style={{ textAlign: 'center' }}>See open roles</Link>
                <Link href={routes.partner} style={{ textAlign: 'center', padding: '16px 24px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: '#FFFFFF', background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(255,255,255,0.2)' }}>Become a partner</Link>
              </div>
            </div>
          </section>

          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
