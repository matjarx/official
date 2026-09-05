'use client'

// Help page — from Marketing - Help.dc.html. Search bar, 7 topic cards,
// 6 most-read links, 4 contact channels, full contact form with a
// subject-chip selector, navy contact-info panel, butter "already a
// client?" panel.

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import { routes } from '@/lib/routes'
import { HELP_TOPICS, HELP_POPULAR, HELP_CHANNELS, HELP_SUBJECTS, HELP_CONTACT_ROWS } from '@/lib/help-data'

export default function HelpContent() {
  const [subject, setSubject] = useState(HELP_SUBJECTS[0])

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <AmbientOrbs />
      <div className="page-content">
        <SiteHeader active="company" />

        {/* Hero */}
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Help centre</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5.2vw, 52px)', lineHeight: 1.07, letterSpacing: '-1.9px', color: '#04121F' }}>
            How can we <span className="marker">help you</span>?
          </h1>
          <p style={{ margin: 0, maxWidth: '32em', fontSize: 'clamp(14.5px, 1.7vw, 17px)', lineHeight: 1.6, color: '#435A70' }}>Search the guides below, or talk to a real person — whichever you prefer.</p>

          <div className="glass-chip" style={{ width: 'min(560px, 100%)', display: 'flex', alignItems: 'center', gap: 12, padding: '15px 18px', borderRadius: 16 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#6A7F92" strokeWidth="1.9" strokeLinecap="round" style={{ flex: '0 0 auto' }}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
            <input type="text" placeholder="Search help articles…" style={{ all: 'unset', flex: 1, minWidth: 0, fontFamily: 'var(--font-open-sans), sans-serif', fontSize: 14.5, color: '#0B2135' }} />
          </div>
        </section>

        {/* Topic cards */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '46px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20 }}>
            {HELP_TOPICS.map((t) => (
              <Link key={t.slug} href={routes.helpArticle(t.slug)} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '26px 26px 28px', borderRadius: 22 }}>
                <span style={{ width: 42, height: 42, borderRadius: 13, background: 'var(--navy)', display: 'grid', placeItems: 'center' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--butter)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={t.icon} /></svg>
                </span>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 18.5, letterSpacing: '-0.35px', color: '#04121F' }}>{t.title}</span>
                <span style={{ fontSize: 14, lineHeight: 1.6, color: '#4B5D6E' }}>{t.body}</span>
                <span style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--olive)', marginLeft: 'auto' }}>Read the guide →</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Most read */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <span style={{ display: 'block', marginBottom: 22, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Most read this month</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 14 }}>
            {HELP_POPULAR.map((p) => {
              const topicSlug = HELP_TOPICS.find((t) => t.title === p.topic)?.slug
              return (
                <Link key={p.title} href={topicSlug ? routes.helpArticle(topicSlug) : routes.help} className="glass-chip" style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '18px 20px', borderRadius: 16 }}>
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--olive)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d="M7 3.5h7l4 4v13H7zM14 3.5v4h4M10 13h6M10 16.5h4" /></svg>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: '#04121F' }}>{p.title}</span>
                    <span style={{ fontSize: 11.5, color: '#6A7F92' }}>{p.topic}</span>
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Talk to us channels */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 38 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Talk to us</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>A real person, not a ticket queue</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 18 }}>
            {HELP_CHANNELS.map((c) => (
              <div key={c.title} style={{ display: 'flex', flexDirection: 'column', gap: 11, padding: '26px 26px 28px', borderRadius: 22, background: c.bg, border: `1.5px solid ${c.line}`, backdropFilter: 'blur(22px)', boxShadow: c.shadow }}>
                <span style={{ width: 42, height: 42, borderRadius: 13, background: c.iconBg, display: 'grid', placeItems: 'center' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c.iconInk} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
                </span>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17.5, letterSpacing: '-0.3px', color: c.ink }}>{c.title}</span>
                <span style={{ fontSize: 14.5, fontWeight: 600, color: c.valueInk, wordBreak: 'break-word' }}>{c.value}</span>
                <span style={{ fontSize: 13, lineHeight: 1.55, color: c.muted }}>{c.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact form + info */}
        <section id="contact" style={{ maxWidth: 1240, margin: '0 auto', padding: '46px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 22, alignItems: 'start' }}>

            <div style={{ padding: '32px 32px 34px', borderRadius: 26, background: 'rgba(255,255,255,0.66)', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(22px)', boxShadow: '0 20px 48px rgba(4,18,31,0.09), inset 0 1px 0 rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.4vw, 30px)', letterSpacing: '-1px', color: '#04121F' }}>Send us a message</h2>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#4B5D6E' }}>Monday to Saturday, 11am to 8pm. We reply the same working day.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 16 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>Your name</span>
                  <input type="text" placeholder="Ahmed Khan" className="input" style={{ width: '100%' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>Business name</span>
                  <input type="text" placeholder="Al-Falah Traders" className="input" style={{ width: '100%' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>Phone / WhatsApp</span>
                  <input type="tel" placeholder="0300 441 2887" className="input" style={{ width: '100%' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>Email</span>
                  <input type="email" placeholder="you@yourbusiness.pk" className="input" style={{ width: '100%' }} />
                </label>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>What&rsquo;s this about?</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {HELP_SUBJECTS.map((label) => {
                    const active = subject === label
                    return (
                      <button key={label} type="button" onClick={() => setSubject(label)} style={{ all: 'unset', cursor: 'pointer', padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', color: active ? '#FFFFFF' : '#3B5063', background: active ? 'var(--navy)' : 'var(--cream)', border: `1.5px solid ${active ? 'var(--navy)' : 'rgba(4,18,31,0.14)'}`, transition: 'background 160ms ease' }}>{label}</button>
                    )
                  })}
                </div>
              </div>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>How can we help?</span>
                <textarea rows={5} placeholder="Tell us what you need — the more detail, the better we can answer first time." className="input" style={{ width: '100%' }} />
              </label>

              <button type="button" className="btn-primary" style={{ textAlign: 'center' }}>Send message</button>
              <span style={{ fontSize: 12.5, lineHeight: 1.55, color: '#6A7F92' }}>By sending this you agree to our <Link href={routes.legal('privacy')} style={{ fontWeight: 600 }}>privacy policy</Link>. We never share your details.</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
              <div className="glass-dark-panel" style={{ padding: '28px 30px 30px', borderRadius: 26, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 20, letterSpacing: '-0.5px', color: '#FFFFFF' }}>Contact information</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {HELP_CONTACT_ROWS.map((r) => (
                    <div key={r.label} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
                      <span style={{ width: 34, height: 34, flex: '0 0 auto', borderRadius: 10, background: 'rgba(198,203,138,0.16)', border: '1px solid rgba(198,203,138,0.3)', display: 'grid', placeItems: 'center' }}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--moss-light)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={r.icon} /></svg>
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                        <span style={{ fontSize: 11, letterSpacing: '1.3px', textTransform: 'uppercase', color: 'rgba(226,236,245,0.45)', fontWeight: 600 }}>{r.label}</span>
                        <span style={{ fontSize: 14.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.9)' }}>{r.value}</span>
                        {r.note && <span style={{ fontSize: 12.5, lineHeight: 1.5, color: 'rgba(226,236,245,0.55)' }}>{r.note}</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ height: 168, borderRadius: 16, background: 'linear-gradient(150deg, #1B4B6E, #0A2233)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--moss-light)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /></svg>
                  <span style={{ fontSize: 12.5, color: 'rgba(226,236,245,0.55)' }}>Zamzama, Clifton, Karachi</span>
                </div>
              </div>

              <div style={{ padding: '26px 28px 28px', borderRadius: 26, background: 'linear-gradient(150deg, rgba(244,242,174,0.9), rgba(198,203,138,0.9))', border: '1px solid rgba(255,255,255,0.7)', backdropFilter: 'blur(22px)', boxShadow: '0 22px 50px rgba(112,117,56,0.22), inset 0 1px 0 rgba(255,255,255,0.85)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ fontSize: 11.5, letterSpacing: '1.6px', textTransform: 'uppercase', color: '#4A5518', fontWeight: 700 }}>Already a client?</span>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 22, lineHeight: 1.18, letterSpacing: '-0.7px', color: '#1F2A08' }}>Message your concierge from the dashboard for a reply within four working hours.</span>
                <a href="#login" className="btn-navy" style={{ alignSelf: 'flex-start', marginTop: 6 }}>Open my dashboard</a>
              </div>
            </div>
          </div>
        </section>

        <div style={{ height: 70 }} />
        <SiteFooter />
      </div>
    </div>
  )
}
