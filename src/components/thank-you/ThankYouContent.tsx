// Thank You page — from Marketing - Thank You.dc.html. Navy hero with
// a checkmark badge and named-replier chip, a 3-step "what happens
// next" timeline, a butter WhatsApp panel, "while you wait" link grid.

import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { THANK_YOU_STEPS, THANK_YOU_LINKS } from '@/lib/thank-you-data'

export default function ThankYouContent() {
  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="home" />

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '66px 24px 60px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
          <span style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--moss-light)', display: 'grid', placeItems: 'center' }}>
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#16210B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7" /></svg>
          </span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5.4vw, 48px)', lineHeight: 1.08, letterSpacing: '-1.7px', color: '#FFFFFF' }}>Thank you — we&rsquo;ve got it</h1>
          <p style={{ margin: 0, maxWidth: '30em', fontSize: 17.5, lineHeight: 1.62, color: 'rgba(255,255,255,0.75)' }}>Your message is with our team. Someone will be in touch within 24 business hours — sooner over WhatsApp.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)' }}>
            <span style={{ width: 34, height: 34, flex: '0 0 auto', borderRadius: '50%', background: 'linear-gradient(150deg, var(--moss-light), var(--olive))', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 12.5, color: '#16210B' }}>YH</span>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>Yasir Hashmi will most likely be the one replying</span>
          </div>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <div className="orb-field">
          <div style={{ position: 'absolute', width: 720, height: 720, right: -190, top: 60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,170,215,0.32) 0%, rgba(120,170,215,0) 68%)' }} />
          <div style={{ position: 'absolute', width: 780, height: 780, left: '20%', top: 1100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,242,174,0.36) 0%, rgba(244,242,174,0) 70%)' }} />
        </div>
        <div className="page-content">

          {/* What happens next */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 24px 0' }}>
            <h2 style={{ margin: '0 0 26px', textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 30, letterSpacing: '-1px', color: '#04121F' }}>What happens next</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 18 }}>
              {THANK_YOU_STEPS.map((s) => (
                <div key={s.title} className="glass-card" style={{ padding: '26px 26px 28px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <span style={{ fontSize: 11.5, letterSpacing: '1.4px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>{s.when}</span>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '-0.35px', color: '#04121F' }}>{s.title}</span>
                  <span style={{ fontSize: 14, lineHeight: 1.6, color: '#4B5D6E' }}>{s.body}</span>
                </div>
              ))}
            </div>
          </section>

          {/* WhatsApp panel */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '54px 24px 0' }}>
            <div style={{ padding: 'clamp(24px, 3.5vw, 34px) clamp(20px, 3vw, 36px)', borderRadius: 24, background: 'linear-gradient(150deg, var(--butter), var(--moss-light))', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 30, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, minWidth: 0 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 26, lineHeight: 1.16, letterSpacing: '-0.9px', color: '#1F2A08' }}>Can&rsquo;t wait? Message us now.</span>
                <span style={{ fontSize: 15, lineHeight: 1.6, color: '#3D4A16' }}>WhatsApp is the fastest way to reach a real person on our team.</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
                <a href="https://wa.me/923033720953" target="_blank" rel="noopener noreferrer" className="btn-navy" style={{ textAlign: 'center' }}>Message on WhatsApp</a>
                <a href="tel:+923033720953" style={{ textAlign: 'center', padding: '15px 24px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#1F2A08', background: 'rgba(255,255,255,0.62)', border: '1.5px solid rgba(31,42,8,0.2)' }}>Call +92 303 372 0953</a>
              </div>
            </div>
          </section>

          {/* While you wait */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '54px 24px 0' }}>
            <h2 style={{ margin: '0 0 24px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 26, letterSpacing: '-0.9px', color: '#04121F' }}>While you wait</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 18 }}>
              {THANK_YOU_LINKS.map((l) => (
                <Link key={l.title} href={l.href} style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '24px 26px', borderRadius: 20, background: '#FFFFFF', border: '1.5px solid rgba(4,18,31,0.1)' }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, letterSpacing: '-0.3px', color: '#04121F' }}>{l.title}</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.58, color: '#4B5D6E' }}>{l.body}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--olive)' }}>{l.cta}</span>
                </Link>
              ))}
            </div>
          </section>

          <div style={{ height: 74 }} />
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
