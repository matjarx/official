'use client'

// Contact page — from Marketing - Contact.dc.html. Navy hero band, 3
// channel cards, contact form with a topic-chip selector, dark office
// panel with a map tile, butter WhatsApp panel.

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { routes } from '@/lib/routes'
import { CONTACT_CHANNELS, CONTACT_TOPICS, CONTACT_OFFICE_ROWS, CONTACT_FAQS, CONTACT_SUPPORT_CATEGORIES, CONTACT_SUMMARY_TABLE, CONTACT_PREP_CHECKLIST, CONTACT_PREFERRED_CHANNEL, CONTACT_COMMITMENT } from '@/lib/contact-data'
import { supabase } from '@/lib/supabase'
import { trackEvent } from '@/lib/analytics'

export type ContactContentShape = { channels: typeof CONTACT_CHANNELS; topics: typeof CONTACT_TOPICS; officeRows: typeof CONTACT_OFFICE_ROWS; faqs: typeof CONTACT_FAQS }
const DEFAULT_CONTENT: ContactContentShape = { channels: CONTACT_CHANNELS, topics: CONTACT_TOPICS, officeRows: CONTACT_OFFICE_ROWS, faqs: CONTACT_FAQS }

export default function ContactContent({ content = DEFAULT_CONTENT }: { content?: ContactContentShape }) {
  const CONTACT_CHANNELS_ACTIVE = content.channels
  const CONTACT_TOPICS_ACTIVE = content.topics
  const CONTACT_OFFICE_ROWS_ACTIVE = content.officeRows
  const CONTACT_FAQS_ACTIVE = content.faqs
  const [topic, setTopic] = useState(CONTACT_TOPICS_ACTIVE[0])
  const [openFaq, setOpenFaq] = useState(0)
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    const { error } = await supabase.from('marketing_leads').insert({
      source: 'contact_us', name, business_name: businessName || null,
      phone: phone || null, email: email || null, topic, message,
    })
    setStatus(error ? 'error' : 'done')
    if (!error) trackEvent('form_submit', { label: 'contact_us' })
  }

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="company" />

      {/* Navy hero band */}
      <section style={{ background: 'var(--navy)', padding: '60px 24px 52px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>Get in touch</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5.6vw, 50px)', lineHeight: 1.08, letterSpacing: '-1.7px', color: '#FFFFFF' }}>
            Talk to a real person, <span style={{ background: 'var(--moss-light)', color: '#16210B', padding: '0 10px', borderRadius: 3 }}>today</span>
          </h1>
          <p style={{ margin: 0, maxWidth: '32em', fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>No bots, no ticket queues. Ask us anything about plans, timelines or what your business needs.</p>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <div className="orb-field">
          <div style={{ position: 'absolute', width: 720, height: 720, right: -190, top: 60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,170,215,0.32) 0%, rgba(120,170,215,0) 68%)' }} />
          <div style={{ position: 'absolute', width: 780, height: 780, left: '20%', top: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,242,174,0.36) 0%, rgba(244,242,174,0) 70%)' }} />
        </div>
        <div className="page-content">

          {/* Channel cards */}
          <section style={{ maxWidth: 1140, margin: '0 auto', padding: '48px 24px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 18 }}>
              {CONTACT_CHANNELS_ACTIVE.map((c) => (
                <a key={c.title} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '26px 26px 28px', borderRadius: 22, background: c.bg, border: `1.5px solid ${c.border}`, boxShadow: c.shadow }}>
                  <span style={{ width: 44, height: 44, borderRadius: 13, background: c.iconBg, display: 'grid', placeItems: 'center' }}>
                    <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke={c.iconInk} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
                  </span>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '-0.3px', color: c.ink }}>{c.title}</span>
                  <span style={{ fontSize: 14.5, fontWeight: 600, color: c.valueInk }}>{c.value}</span>
                  <span style={{ fontSize: 13, lineHeight: 1.55, color: c.muted }}>{c.note}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Support categories */}
          <section style={{ maxWidth: 1240, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 34 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>What type of support do you need?</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 36px)', lineHeight: 1.14, letterSpacing: '-1.1px', color: '#04121F' }}>Support categories</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))', gap: 18 }}>
              {CONTACT_SUPPORT_CATEGORIES.map((c, i) => (
                <div key={c.title} className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: '#A08A5E' }}>{i + 1}.</span>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 16.5, color: '#04121F' }}>{c.title}</span>
                  <span style={{ fontSize: 13, lineHeight: 1.5, color: '#4B5D6E' }}>{c.body}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 2 }}>
                    {c.items.map((it) => (
                      <span key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 12.5, lineHeight: 1.5, color: '#4B5D6E' }}>
                        <span style={{ width: 4, height: 4, flex: '0 0 auto', marginTop: 6, borderRadius: '50%', background: 'var(--olive)' }} />
                        {it}
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--navy)', paddingTop: 4, borderTop: '1px solid rgba(4,18,31,0.07)', marginTop: 4 }}>Contact: {c.contact}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Form + office info */}
          <section style={{ maxWidth: 1140, margin: '0 auto', padding: '44px 24px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 24, alignItems: 'start' }}>

              {status === 'done' ? (
                <div className="glass-card" style={{ padding: 'clamp(24px, 3.5vw, 34px)', borderRadius: 24, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', textAlign: 'center', justifyContent: 'center', minHeight: 320 }}>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 24, color: '#04121F' }}>Message sent</h2>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#4B5D6E', maxWidth: '30em' }}>Thanks — we reply within 24 business hours, sooner over WhatsApp.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 'clamp(24px, 3.5vw, 34px) clamp(20px, 3vw, 34px) clamp(26px, 3.5vw, 36px)', borderRadius: 24, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 28, letterSpacing: '-0.9px', color: '#04121F' }}>Send us a message</h2>
                    <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#4B5D6E' }}>We reply within 24 business hours — sooner over WhatsApp.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 16 }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>Your name</span>
                      <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ahmed Khan" className="input" style={{ width: '100%' }} />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>Business name</span>
                      <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Al-Falah Traders" className="input" style={{ width: '100%' }} />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>Phone / WhatsApp</span>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0300 441 2887" className="input" style={{ width: '100%' }} />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>Email</span>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourbusiness.pk" className="input" style={{ width: '100%' }} />
                    </label>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>What do you need?</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {CONTACT_TOPICS_ACTIVE.map((label) => {
                        const active = topic === label
                        return (
                          <button key={label} type="button" onClick={() => setTopic(label)} style={{ all: 'unset', cursor: 'pointer', padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', color: active ? '#FFFFFF' : '#3B5063', background: active ? 'var(--navy)' : '#FFFFFF', border: `1.5px solid ${active ? 'var(--navy)' : 'rgba(4,18,31,0.14)'}`, transition: 'background 160ms ease' }}>{label}</button>
                        )
                      })}
                    </div>
                  </div>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#6A7F92', fontWeight: 600 }}>Tell us about your business</span>
                    <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What you sell, who your customers are, and what you'd like the website to do." className="input" style={{ width: '100%' }} />
                  </label>

                  {status === 'error' && <p style={{ margin: 0, fontSize: 13, color: '#B4432F' }}>Something went wrong sending that — please try again or message us on WhatsApp instead.</p>}

                  <button type="submit" disabled={status === 'submitting'} className="btn-navy" style={{ textAlign: 'center', boxShadow: '0 12px 28px rgba(0,51,102,0.24)' }}>{status === 'submitting' ? 'Sending…' : 'Send message'}</button>
                  <span style={{ fontSize: 12.5, lineHeight: 1.55, color: '#6A7F92' }}>By sending this you agree to our <Link href={routes.legal('privacy')} style={{ fontWeight: 600 }}>privacy policy</Link>. We never share your details.</span>
                </form>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
                <div style={{ padding: '28px 30px', borderRadius: 24, background: '#04121F', display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 19, color: '#FFFFFF' }}>Our office</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {CONTACT_OFFICE_ROWS_ACTIVE.map((o) => (
                      <div key={o.label} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
                        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--moss-light)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d={o.icon} /></svg>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                          <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)', fontWeight: 600 }}>{o.label}</span>
                          <span style={{ fontSize: 14.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.88)' }}>{o.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 170, borderRadius: 16, background: 'linear-gradient(150deg, #1B4B6E, #0A2233)', display: 'grid', placeItems: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Map — Zamzama, Clifton, Karachi</span>
                  </div>
                </div>

                <div style={{ padding: '28px 30px', borderRadius: 24, background: 'linear-gradient(150deg, var(--butter), var(--moss-light))', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span style={{ fontSize: 11.5, letterSpacing: '1.6px', textTransform: 'uppercase', color: '#4A5518', fontWeight: 700 }}>Prefer to skip the form?</span>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 24, lineHeight: 1.18, letterSpacing: '-0.7px', color: '#1F2A08' }}>Message us on WhatsApp and get a reply the same day.</span>
                  <a href="https://wa.me/923033720953" target="_blank" rel="noopener noreferrer" className="btn-navy" style={{ alignSelf: 'flex-start', marginTop: 6 }}>Open WhatsApp</a>
                </div>
              </div>
            </div>
          </section>

          {/* Getting support FAQ */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 30 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Getting support</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 32px)', lineHeight: 1.16, letterSpacing: '-1px', color: '#04121F' }}>Common questions about contacting us</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CONTACT_FAQS_ACTIVE.map(([q, a], i) => {
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

          {/* Before you contact us */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
            <div className="glass-card" style={{ padding: 'clamp(24px, 3.5vw, 34px)', borderRadius: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Help us help you faster</span>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 22, letterSpacing: '-0.6px', color: '#04121F' }}>Before you contact us</h2>
                <p style={{ margin: 0, fontSize: 14, color: '#6A7F92' }}>Please have ready:</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 10 }}>
                {CONTACT_PREP_CHECKLIST.map((it) => (
                  <span key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 14, lineHeight: 1.5, color: '#33485B' }}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="var(--olive)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                    {it}
                  </span>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: 13, color: '#6A7F92', fontStyle: 'italic' }}>This helps us respond faster and more accurately.</p>
            </div>
          </section>

          {/* Preferred channel by topic */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', marginBottom: 22, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Preferred communication channel, by topic</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
              {CONTACT_PREFERRED_CHANNEL.map((g) => (
                <div key={g.title} style={{ padding: '20px 22px 22px', borderRadius: 18, background: '#FFFFFF', border: '1px solid rgba(4,18,31,0.08)', display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 15, color: '#04121F' }}>{g.title}</span>
                  {g.items.map((it) => (
                    <span key={it} style={{ fontSize: 13, lineHeight: 1.5, color: '#4B5D6E' }}>{it}</span>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Our commitment to support */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 34 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>What you can expect</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 36px)', lineHeight: 1.14, letterSpacing: '-1.1px', color: '#04121F' }}>Our commitment to support</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 18 }}>
              {CONTACT_COMMITMENT.map((g) => (
                <div key={g.title} className="glass-card" style={{ padding: '22px 24px 24px', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 15.5, color: '#04121F' }}>{g.title}</span>
                  {g.items.map((it) => (
                    <span key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, lineHeight: 1.5, color: '#4B5D6E' }}>
                      <span style={{ width: 4, height: 4, flex: '0 0 auto', marginTop: 6, borderRadius: '50%', background: 'var(--olive)' }} />
                      {it}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Contact information summary table */}
          <section style={{ maxWidth: 1000, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', marginBottom: 22, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>All ways to reach MatjarX</span>
            <div className="glass-card table-scroll" style={{ borderRadius: 20, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
                <thead>
                  <tr>
                    {CONTACT_SUMMARY_TABLE.headers.map((h) => (
                      <th key={h} style={{ textAlign: 'left', padding: '14px 20px', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.3px', color: '#04121F', background: 'rgba(242,238,226,0.7)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CONTACT_SUMMARY_TABLE.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{ padding: '14px 20px', fontSize: 13.5, lineHeight: 1.5, color: '#33485B', borderTop: '1px solid rgba(4,18,31,0.07)', fontWeight: ci === 0 ? 700 : 400 }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div style={{ height: 74 }} />
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
