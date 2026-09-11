'use client'

// Partner page — from Marketing - Partner.dc.html. Navy hero, 3 tier
// cards (Partner tier dark), 4 "how it works" steps, a real earnings
// calculator (client-count × plan × commission rate, matching the
// source's exact math), an application form with a partner-type
// chip selector.

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { routes } from '@/lib/routes'
import { supabase } from '@/lib/supabase'
import { trackEvent } from '@/lib/analytics'
import {
  PARTNER_TIERS, PARTNER_STEPS, PARTNER_CLIENT_STEPS, PARTNER_PLAN_PICKS, PARTNER_TYPES,
  PARTNER_PLAN_RATES, PARTNER_COMMISSION_PCT, money, type PlanKey,
} from '@/lib/partner-data'
import { PARTNER_CATEGORY_ICONS, PARTNER_TOOL_LOGOS } from '@/lib/partner-icons-data'

export type PartnerContentShape = { tiers: typeof PARTNER_TIERS; steps: typeof PARTNER_STEPS; toolLogos: typeof PARTNER_TOOL_LOGOS; categoryIcons: typeof PARTNER_CATEGORY_ICONS }
const DEFAULT_CONTENT: PartnerContentShape = { tiers: PARTNER_TIERS, steps: PARTNER_STEPS, toolLogos: PARTNER_TOOL_LOGOS, categoryIcons: PARTNER_CATEGORY_ICONS }

export default function PartnerContent({ content = DEFAULT_CONTENT }: { content?: PartnerContentShape }) {
  const PARTNER_TIERS_ACTIVE = content.tiers
  const PARTNER_STEPS_ACTIVE = content.steps
  const PARTNER_TOOL_LOGOS_ACTIVE = content.toolLogos
  const PARTNER_CATEGORY_ICONS_ACTIVE = content.categoryIcons
  const router = useRouter()
  const [clients, setClients] = useState(10)
  const [plan, setPlan] = useState<PlanKey>('Boost')
  const [ptype, setPtype] = useState(PARTNER_TYPES[0])
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')

  const { monthlyEarn, yearlyEarn, tenClients } = useMemo(() => {
    const per = PARTNER_PLAN_RATES[plan] * PARTNER_COMMISSION_PCT
    const monthly = per * clients
    return {
      monthlyEarn: money(monthly),
      yearlyEarn: money(monthly * 12),
      tenClients: money(PARTNER_PLAN_RATES.Boost * PARTNER_COMMISSION_PCT * 10),
    }
  }, [clients, plan])

  // Same marketing_leads table Contact/Help write to — no dedicated
  // columns for the calculator inputs, so they're folded into `message`
  // as readable text rather than adding new columns for one form.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    const { error } = await supabase.from('marketing_leads').insert({
      source: 'partner_program', name, business_name: company || null,
      phone: phone || null, email: email || null, topic: ptype,
      message: `Referral estimate: ${clients} clients on ${plan}.`,
    })
    if (error) {
      setStatus('error')
      return
    }
    trackEvent('form_submit', { label: 'partner_program' })
    router.push('/thank-you?source=partner_program')
  }

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="company" />

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '60px 24px 52px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>Partner program</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5.6vw, 50px)', lineHeight: 1.08, letterSpacing: '-1.7px', color: '#FFFFFF' }}>
            Refer a business. Earn on every plan, <span style={{ background: 'var(--moss-light)', color: '#16210B', padding: '0 10px', borderRadius: 3 }}>every month</span>
          </h1>
          <p style={{ margin: 0, maxWidth: '34em', fontSize: 17, lineHeight: 1.62, color: 'rgba(255,255,255,0.72)' }}>For agencies, freelancers, accountants and consultants whose clients keep asking for a website they can&rsquo;t build.</p>
          <a href="#apply" className="btn-primary" style={{ marginTop: 6 }}>Apply to partner</a>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <div className="orb-field">
          <div style={{ position: 'absolute', width: 720, height: 720, right: -190, top: 60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,170,215,0.32) 0%, rgba(120,170,215,0) 68%)' }} />
          <div style={{ position: 'absolute', width: 780, height: 780, left: '20%', top: 1100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,242,174,0.36) 0%, rgba(244,242,174,0) 70%)' }} />
        </div>
        <div className="page-content">

          {/* Tier cards */}
          <section style={{ maxWidth: 1300, margin: '0 auto', padding: '48px 24px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 18 }}>
              {PARTNER_TIERS_ACTIVE.map((t) => (
                <div key={t.name} className={t.dark ? 'glass-dark-panel' : 'glass-card'} style={{ padding: '30px 28px 32px', borderRadius: 24, display: 'flex', flexDirection: 'column', gap: 13 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 21, letterSpacing: '-0.5px', color: t.dark ? '#FFFFFF' : '#04121F', marginRight: 'auto' }}>{t.name}</span>
                    {t.tag && <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 999, color: '#3D3A08', background: 'var(--butter)', whiteSpace: 'nowrap' }}>{t.tag}</span>}
                  </div>
                  <span style={{ fontSize: 13.5, lineHeight: 1.55, color: t.dark ? 'rgba(255,255,255,0.6)' : '#5A6F82' }}>{t.who}</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, paddingTop: 8 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 38, letterSpacing: '-1.4px', color: t.dark ? '#FFFFFF' : '#04121F' }}>{t.rate}</span>
                    <span style={{ fontSize: 14, color: t.dark ? 'rgba(255,255,255,0.6)' : '#5A6F82' }}>recurring</span>
                  </div>
                  <span style={{ fontSize: 13, color: t.dark ? 'rgba(255,255,255,0.6)' : '#5A6F82' }}>{t.bonus}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9, paddingTop: 14, marginTop: 4, borderTop: `1px solid ${t.dark ? 'rgba(255,255,255,0.16)' : 'rgba(4,18,31,0.09)'}` }}>
                    {t.features.map((f) => (
                      <span key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13.5, lineHeight: 1.5, color: t.dark ? 'rgba(255,255,255,0.82)' : '#3B5063' }}>
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={t.dark ? 'var(--moss-light)' : 'var(--olive)'} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section style={{ maxWidth: 1300, margin: '0 auto', padding: '68px 24px 0' }}>
            <h2 style={{ margin: '0 0 34px', textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4.2vw, 36px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>How it <span style={{ background: 'var(--butter)', padding: '0 9px', borderRadius: 3 }}>works</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 20 }}>
              {PARTNER_STEPS_ACTIVE.map((s) => (
                <div key={s.n} className="glass-card" style={{ padding: '28px 26px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 40, lineHeight: 1, letterSpacing: '-1.8px', color: 'var(--moss-light)' }}>{s.n}</span>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '-0.35px', color: '#04121F' }}>{s.title}</span>
                  <span style={{ fontSize: 14, lineHeight: 1.6, color: '#4B5D6E' }}>{s.body}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Referral categories */}
          <section style={{ maxWidth: 1300, margin: '0 auto', padding: '68px 24px 0' }}>
            <h2 style={{ margin: '0 0 26px', textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: '#04121F' }}>What kind of referrals work best?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: 14 }}>
              {PARTNER_CATEGORY_ICONS_ACTIVE.map((c) => (
                <div key={c.src} className="glass-card" style={{ padding: '18px 14px', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: 40, height: 40, borderRadius: 12, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', width: 20, height: 20 }}>
                      <Image src={c.src} alt={c.label} fill sizes="20px" style={{ objectFit: 'contain' }} />
                    </div>
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: '#04121F' }}>{c.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Complementary tools partners already recommend */}
          <section style={{ maxWidth: 1300, margin: '0 auto', padding: '54px 24px 0' }}>
            <h2 style={{ margin: '0 0 26px', textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: '#04121F' }}>Tools our partners already recommend</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))', gap: 14 }}>
              {PARTNER_TOOL_LOGOS_ACTIVE.map((t) => (
                <div key={t.src} className="glass-card" style={{ padding: '16px', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 64 }}>
                  <div style={{ position: 'relative', width: '100%', height: 32 }}>
                    <Image src={t.src} alt={t.label} fill sizes="120px" style={{ objectFit: 'contain' }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Earnings calculator */}
          <section style={{ maxWidth: 1300, margin: '0 auto', padding: '68px 24px 0' }}>
            <div style={{ padding: 'clamp(26px, 4vw, 40px) clamp(22px, 3.5vw, 42px)', borderRadius: 26, background: 'rgba(242,238,226,0.6)', border: '1px solid rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 40, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
                <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#8A7A5E', fontWeight: 600 }}>What you could earn</span>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.8vw, 32px)', lineHeight: 1.16, letterSpacing: '-1.1px', color: '#04121F' }}>Ten Boost clients pays you {tenClients} a month, indefinitely</h2>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: '#3B5063' }}>Commission is recurring, not one-time. As long as your referred client stays with us, you keep earning — and we handle every part of the delivery.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0, padding: '28px 30px', borderRadius: 20, background: '#FFFFFF', border: '1px solid rgba(4,18,31,0.08)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{ fontSize: 12, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#5A6F82', fontWeight: 600, marginRight: 'auto' }}>Clients referred</span>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 20, color: '#04121F' }}>{clients}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {PARTNER_CLIENT_STEPS.map((n) => {
                      const active = clients === n
                      return (
                        <button key={n} type="button" onClick={() => setClients(n)} style={{ all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center', padding: '10px 4px', borderRadius: 10, fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-lato), Lato, sans-serif', color: active ? '#FFFFFF' : '#4B5D6E', background: active ? 'var(--navy)' : 'var(--cream-deep)' }}>{n}</button>
                      )
                    })}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <span style={{ fontSize: 12, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#5A6F82', fontWeight: 600 }}>Plan they choose</span>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {PARTNER_PLAN_PICKS.map((p) => {
                      const active = plan === p
                      return (
                        <button key={p} type="button" onClick={() => setPlan(p)} style={{ all: 'unset', cursor: 'pointer', padding: '9px 15px', borderRadius: 999, fontSize: 12.5, fontWeight: 600, color: active ? '#FFFFFF' : '#3B5063', background: active ? 'var(--navy)' : '#FFFFFF', border: `1.5px solid ${active ? 'var(--navy)' : 'rgba(4,18,31,0.14)'}` }}>{p}</button>
                      )
                    })}
                  </div>
                </div>
                <div style={{ paddingTop: 18, borderTop: '1px solid rgba(4,18,31,0.09)', display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ fontSize: 12.5, color: '#5A6F82' }}>Your recurring monthly commission</span>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 36, letterSpacing: '-1.3px', color: 'var(--navy)' }}>{monthlyEarn}</span>
                  <span style={{ fontSize: 12.5, color: 'var(--olive)', fontWeight: 600 }}>{yearlyEarn} over a year</span>
                </div>
              </div>
            </div>
          </section>

          {/* Apply form */}
          <section id="apply" style={{ maxWidth: 860, margin: '0 auto', padding: '68px 24px 74px' }}>
            <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 'clamp(24px, 4vw, 38px) clamp(20px, 3.5vw, 38px) clamp(26px, 4vw, 40px)', borderRadius: 26, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 30, letterSpacing: '-1px', color: '#04121F' }}>Apply to become a partner</h2>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.62, color: '#4B5D6E' }}>We review applications within two working days. No minimum volume to join.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 16 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#5A6F82', fontWeight: 600 }}>Your name</span>
                  <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ahmed Khan" className="input" style={{ width: '100%' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#5A6F82', fontWeight: 600 }}>Company</span>
                  <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your agency or practice" className="input" style={{ width: '100%' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#5A6F82', fontWeight: 600 }}>Email</span>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.pk" className="input" style={{ width: '100%' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#5A6F82', fontWeight: 600 }}>Phone / WhatsApp</span>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0300 441 2887" className="input" style={{ width: '100%' }} />
                </label>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <span style={{ fontSize: 11.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#5A6F82', fontWeight: 600 }}>What best describes you?</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {PARTNER_TYPES.map((label) => {
                    const active = ptype === label
                    return (
                      <button key={label} type="button" onClick={() => setPtype(label)} style={{ all: 'unset', cursor: 'pointer', padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', color: active ? '#FFFFFF' : '#3B5063', background: active ? 'var(--navy)' : 'var(--cream)', border: `1.5px solid ${active ? 'var(--navy)' : 'rgba(4,18,31,0.14)'}` }}>{label}</button>
                    )
                  })}
                </div>
              </div>

              <button type="submit" disabled={status === 'submitting'} className="btn-navy" style={{ textAlign: 'center', boxShadow: '0 12px 28px rgba(0,51,102,0.24)' }}>{status === 'submitting' ? 'Sending…' : 'Submit application'}</button>
              {status === 'error' && <p style={{ margin: 0, fontSize: 13, color: '#B4543C' }}>Something went wrong — please try again, or message us on WhatsApp.</p>}
              <span style={{ fontSize: 12.5, lineHeight: 1.55, color: '#5A6F82' }}>By applying you agree to our <Link href={routes.legal('terms')} style={{ fontWeight: 600 }}>partner terms</Link> and <Link href={routes.legal('privacy')} style={{ fontWeight: 600 }}>privacy policy</Link>.</span>
            </form>
          </section>

          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
