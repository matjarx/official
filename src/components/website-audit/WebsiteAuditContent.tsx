'use client'

// Website Audit page — from files/matjarx_website_audit_page.md, used in
// full. Hero with a real intake form (inserts into matjarx-platform's
// website_audit_requests table via the anon-key Supabase client), the
// "what's holding you back" problem list, all 10 real audit areas as an
// accordion, the 4-step process, timeline table, outcomes, benefits,
// FAQ (with the free-tools-vs-MatjarX comparison table), closing CTAs.

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import { routes } from '@/lib/routes'
import { supabase } from '@/lib/supabase'
import { trackEvent } from '@/lib/analytics'
import {
  HERO, PROBLEMS, AUDIT_INTRO, WHAT_IS_AUDIT, WHY_NEEDED, AUDIT_AREAS, PROCESS_STEPS,
  TIMELINE_ROWS, TIMELINE_TOTAL, RUSH_NOTE, OUTCOMES, BENEFITS, COMPARISON_TABLE, AUDIT_FAQS, CHANNELS,
} from '@/lib/website-audit-data'

function IntakeForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [preferredChannel, setPreferredChannel] = useState<'whatsapp' | 'email'>('whatsapp')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    const { error } = await supabase.from('website_audit_requests').insert({
      name, email: email || null, phone: phone || null, website_url: websiteUrl,
      preferred_channel: preferredChannel, source: 'website_form',
    })
    setStatus(error ? 'error' : 'done')
    if (!error) trackEvent('form_submit', { label: 'website_audit' })
  }

  if (status === 'done') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'center', padding: '20px 0' }}>
        <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 22, color: '#04121F' }}>Request received</span>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#4B5D6E' }}>We&apos;ll review {websiteUrl} and get your report to you within 5-7 business days, over {preferredChannel === 'whatsapp' ? 'WhatsApp' : 'email'}.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#5A6F82', fontWeight: 600 }}>Website URL</span>
        <input required type="text" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://yourbusiness.pk" className="input" style={{ width: '100%' }} />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#5A6F82', fontWeight: 600 }}>Your name</span>
        <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ahmed Khan" className="input" style={{ width: '100%' }} />
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 14 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#5A6F82', fontWeight: 600 }}>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourbusiness.pk" className="input" style={{ width: '100%' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#5A6F82', fontWeight: 600 }}>WhatsApp / phone</span>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0300 441 2887" className="input" style={{ width: '100%' }} />
        </label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#5A6F82', fontWeight: 600 }}>Where should we send your report?</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['whatsapp', 'email'] as const).map((c) => (
            <button key={c} type="button" onClick={() => setPreferredChannel(c)} style={{ all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center', padding: '11px 16px', borderRadius: 999, fontSize: 13.5, fontWeight: 600, color: preferredChannel === c ? '#FFFFFF' : '#3B5063', background: preferredChannel === c ? 'var(--navy)' : '#FFFFFF', border: `1.5px solid ${preferredChannel === c ? 'var(--navy)' : 'rgba(4,18,31,0.14)'}` }}>
              {c === 'whatsapp' ? 'WhatsApp' : 'Email'}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" disabled={status === 'submitting'} className="btn-primary" style={{ textAlign: 'center', marginTop: 4 }}>
        {status === 'submitting' ? 'Sending…' : 'Get Your Website Audit'}
      </button>
      {status === 'error' && <p style={{ margin: 0, fontSize: 13, color: '#B4543C' }}>Something went wrong — please try again, or message us on WhatsApp at {CHANNELS.whatsapp}.</p>}
      <span style={{ fontSize: 12, lineHeight: 1.5, color: '#5A6F82' }}>By sending this you agree to our <Link href={routes.legal('privacy')} style={{ fontWeight: 600 }}>privacy policy</Link>.</span>
    </form>
  )
}

export type WebsiteAuditContentShape = { hero: typeof HERO; areas: typeof AUDIT_AREAS; process: typeof PROCESS_STEPS; faqs: typeof AUDIT_FAQS }
const DEFAULT_CONTENT: WebsiteAuditContentShape = { hero: HERO, areas: AUDIT_AREAS, process: PROCESS_STEPS, faqs: AUDIT_FAQS }

export default function WebsiteAuditContent({ content = DEFAULT_CONTENT }: { content?: WebsiteAuditContentShape }) {
  const HERO_ACTIVE = content.hero
  const AUDIT_AREAS_ACTIVE = content.areas
  const PROCESS_STEPS_ACTIVE = content.process
  const AUDIT_FAQS_ACTIVE = content.faqs
  const [openArea, setOpenArea] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="resources" />

      {/* Hero + form */}
      <section style={{ background: 'var(--navy)', padding: '58px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 40, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>{HERO_ACTIVE.eyebrow}</span>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 4.8vw, 46px)', lineHeight: 1.1, letterSpacing: '-1.6px', color: '#FFFFFF' }}>{HERO_ACTIVE.headline}</h1>
            <p style={{ margin: 0, maxWidth: '32em', fontSize: 16.5, lineHeight: 1.62, color: 'rgba(255,255,255,0.72)' }}>{HERO_ACTIVE.subhead}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 6 }}>
              {PROBLEMS.map((p) => (
                <span key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                  <span style={{ color: '#C4715A', flex: '0 0 auto' }}>✕</span>{p}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-card" style={{ padding: 'clamp(24px, 3.5vw, 32px)', borderRadius: 24 }}>
            <IntakeForm />
          </div>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <AmbientOrbs />
        <div className="page-content">

          {/* What is a website audit */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center', alignItems: 'center', marginBottom: 28 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>What is a website audit?</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 32px)', lineHeight: 1.16, letterSpacing: '-1px', color: '#04121F' }}>A complete analysis of your online presence</h2>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.62, color: '#33485B' }}>{AUDIT_INTRO}</p>
            </div>
            <div style={{ position: 'relative', width: '100%', maxWidth: 560, height: 220, margin: '0 auto 28px', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 44px rgba(4,18,31,0.14)' }}>
              <Image src="/website-audit/audit-report.webp" alt="A dashboard showing website traffic growth and Google ranking improvement" fill sizes="(max-width: 600px) 100vw, 560px" style={{ objectFit: 'cover' }} />
            </div>
            <p style={{ margin: '0 0 18px', fontSize: 16, lineHeight: 1.62, color: '#33485B', textAlign: 'center' }}>{WHAT_IS_AUDIT.intro}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 10 }}>
              {WHAT_IS_AUDIT.checks.map((c) => (
                <span key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, lineHeight: 1.5, color: '#33485B' }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="var(--olive)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 2 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                  {c}
                </span>
              ))}
            </div>
            <p style={{ margin: '18px 0 0', fontSize: 14.5, fontWeight: 600, color: 'var(--navy)', textAlign: 'center' }}>Result: {WHAT_IS_AUDIT.result}</p>
          </section>

          {/* Why your website needs an audit */}
          <section style={{ maxWidth: 900, margin: '0 auto', padding: '66px 24px 0' }}>
            <div className="glass-dark-panel" style={{ padding: 'clamp(26px, 3.6vw, 40px)', borderRadius: 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(22px, 3.2vw, 28px)', lineHeight: 1.2, color: '#FFFFFF' }}>{WHY_NEEDED.stat}</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 10 }}>
                {WHY_NEEDED.problems.map((p) => (
                  <span key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.5, color: 'rgba(226,236,245,0.8)' }}>
                    <span style={{ color: '#C4715A', flex: '0 0 auto' }}>✕</span>{p}
                  </span>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'rgba(226,236,245,0.65)' }}>{WHY_NEEDED.closing}</p>
            </div>
          </section>

          {/* 10 audit areas */}
          <section style={{ maxWidth: 900, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center', alignItems: 'center', marginBottom: 30 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>A thorough analysis across 10 key areas</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 36px)', lineHeight: 1.16, letterSpacing: '-1.1px', color: '#04121F' }}>What&apos;s included in the audit</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {AUDIT_AREAS_ACTIVE.map((area, i) => {
                const open = openArea === i
                return (
                  <div key={area.number} className="glass-card" style={{ borderRadius: 20, overflow: 'hidden' }}>
                    <button type="button" onClick={() => setOpenArea(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '20px 24px' }}>
                      <span style={{ flex: '0 0 auto', width: 30, height: 30, borderRadius: '50%', background: 'var(--navy)', color: 'var(--butter)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 13 }}>{area.number}</span>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 16.5, color: '#04121F', marginRight: 'auto' }}>{area.title}</span>
                      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#5A6F82" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {open && (
                      <div style={{ padding: '0 24px 26px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--olive)' }}>What we analyze</span>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 14, marginTop: 10 }}>
                            {area.analyze.map((a) => (
                              <div key={a.heading} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {a.heading && <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#04121F' }}>{a.heading}</span>}
                                {a.items.map((it) => (
                                  <span key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 13, lineHeight: 1.5, color: '#4B5D6E' }}>
                                    <span style={{ width: 4, height: 4, flex: '0 0 auto', marginTop: 6, borderRadius: '50%', background: 'var(--olive)' }} />
                                    {it}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div style={{ padding: '14px 18px', borderRadius: 16, background: 'rgba(0,51,102,0.05)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#5A6F82' }}>What you&apos;ll learn</span>
                          {area.learn.map((l) => (
                            <span key={l} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.5, color: '#1B2E3F' }}>
                              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--navy)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                              {l}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Process */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center', alignItems: 'center', marginBottom: 30 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>How to get your website audit</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 36px)', lineHeight: 1.16, letterSpacing: '-1.1px', color: '#04121F' }}>The audit process</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 18 }}>
              {PROCESS_STEPS_ACTIVE.map((s) => (
                <div key={s.step} className="glass-card" style={{ padding: '24px 24px 26px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--navy)', color: 'var(--butter)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 14 }}>{s.step}</span>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 17, color: '#04121F' }}>{s.title}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--olive)' }}>{s.time}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 4 }}>
                    {s.items.map((it) => (
                      <span key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 12.5, lineHeight: 1.5, color: '#4B5D6E' }}>
                        <span style={{ width: 4, height: 4, flex: '0 0 auto', marginTop: 6, borderRadius: '50%', background: 'var(--olive)' }} />
                        {it}
                      </span>
                    ))}
                  </div>
                  {s.note && <span style={{ fontSize: 12, fontStyle: 'italic', color: '#5A6F82', paddingTop: 4 }}>{s.note}</span>}
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', textAlign: 'center', marginBottom: 20, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Complete website audit timeline</span>
            <div className="glass-card table-scroll" style={{ borderRadius: 20, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
                <thead><tr>
                  {['Phase', 'Duration', 'What Happens'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '14px 20px', fontSize: 12.5, fontWeight: 700, color: '#04121F', background: 'rgba(242,238,226,0.7)' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {TIMELINE_ROWS.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{ padding: '14px 20px', fontSize: 13.5, color: '#33485B', borderTop: '1px solid rgba(4,18,31,0.07)', fontWeight: ci === 0 ? 700 : 400 }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ margin: '16px 0 0', fontSize: 14, fontWeight: 700, color: '#04121F', textAlign: 'center' }}>{TIMELINE_TOTAL}</p>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#5A6F82', textAlign: 'center' }}>{RUSH_NOTE}</p>
          </section>

          {/* Outcomes */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center', alignItems: 'center', marginBottom: 30 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>What you&apos;ll know after your audit</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 36px)', lineHeight: 1.16, letterSpacing: '-1.1px', color: '#04121F' }}>The report includes</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 18 }}>
              {OUTCOMES.map((o) => (
                <div key={o.title} style={{ padding: '22px 24px 24px', borderRadius: 20, background: '#FFFFFF', border: '1px solid rgba(4,18,31,0.08)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 16, color: '#04121F' }}>{o.title}</span>
                  {o.items.map((it) => (
                    <span key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 13, lineHeight: 1.5, color: '#4B5D6E' }}>
                      <span style={{ width: 4, height: 4, flex: '0 0 auto', marginTop: 6, borderRadius: '50%', background: 'var(--olive)' }} />
                      {it}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center', alignItems: 'center', marginBottom: 30 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Why small business owners love website audits</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 36px)', lineHeight: 1.16, letterSpacing: '-1.1px', color: '#04121F' }}>Benefits for small businesses</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 18 }}>
              {BENEFITS.map((b) => (
                <div key={b.title} className="glass-card" style={{ padding: '24px 26px 26px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 17, color: '#04121F' }}>{b.title}</h3>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: '#4B5D6E' }}>{b.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ + comparison table */}
          <section style={{ maxWidth: 1000, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center', alignItems: 'center', marginBottom: 30 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Common questions about our audit</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 36px)', lineHeight: 1.16, letterSpacing: '-1.1px', color: '#04121F' }}>FAQ: Website audit</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
              {AUDIT_FAQS_ACTIVE.map(([q, a], i) => {
                const open = openFaq === i
                return (
                  <div key={i} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden' }}>
                    <button type="button" onClick={() => setOpenFaq(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 22px' }}>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, lineHeight: 1.35, color: '#04121F', marginRight: 'auto', textAlign: 'left' }}>{q}</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#5A6F82" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {open && <p style={{ margin: 0, padding: '0 22px 20px', fontSize: 14.5, lineHeight: 1.68, color: '#435A70' }}>{a}</p>}
                  </div>
                )
              })}
            </div>
            <span style={{ display: 'block', textAlign: 'center', marginBottom: 16, fontSize: 13.5, fontWeight: 600, color: '#04121F' }}>Free tools vs. MatjarX audit</span>
            <div className="glass-card table-scroll" style={{ borderRadius: 20, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
                <thead><tr>
                  {COMPARISON_TABLE.headers.map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '14px 20px', fontSize: 12.5, fontWeight: 700, color: '#04121F', background: 'rgba(242,238,226,0.7)' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {COMPARISON_TABLE.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{ padding: '13px 20px', fontSize: 13.5, color: ci === 2 ? '#04121F' : '#4B5D6E', fontWeight: ci === 2 ? 600 : ci === 0 ? 700 : 400, borderTop: '1px solid rgba(4,18,31,0.07)' }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Closing CTA */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ padding: 'clamp(28px, 4vw, 44px)', borderRadius: 26, background: '#04121F', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.8vw, 32px)', lineHeight: 1.18, letterSpacing: '-1px', color: '#FFFFFF' }}>Your website could be perfectly optimized. Or severely underperforming. You won&apos;t know until you look.</h2>
              <p style={{ margin: 0, maxWidth: '38em', fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)' }}>70,000+ small businesses use MatjarX to improve their online visibility. Your website could be next.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingTop: 6 }}>
                <a href={`https://wa.me/${CHANNELS.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-primary">Request your free consultation</a>
                <a href={`mailto:${CHANNELS.email}`} style={{ padding: '15px 22px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#FFFFFF', background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(255,255,255,0.2)' }}>Email us</a>
              </div>
            </div>
          </section>

          <div style={{ height: 74 }} />
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
