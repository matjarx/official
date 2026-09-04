'use client'

// Home Mobile — from Marketing - Home Mobile.dc.html. A dedicated
// 390×844 phone-frame layout (not a scaled desktop, per the handoff):
// single column, horizontally-scrolling badge strip, a sun/moon skin
// toggle in the header so both themes are reviewable in one place, a
// condensed hours/rate calculator, and Editor Showcase Mobile instead
// of the desktop showcase. Like Home Dark, this is a review surface —
// not linked from navigation — since the real `/` route already
// reflows responsively; this file exists because the design gives the
// phone layout its own deliberate composition, not a CSS breakpoint.

import { useState } from 'react'
import Image from 'next/image'
import EditorShowcaseMobile from '@/components/EditorShowcaseMobile'
import { RATING_BADGES, VOICES } from '@/lib/home-data'
import { ALL_PLANS, type PlanKey } from '@/lib/plan-data'

const NAV_ITEMS = [
  { label: 'Services', href: '/services' },
  { label: 'Website examples', href: '/website-examples' },
  { label: 'Website audit', href: '/website-audit' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Get in touch', href: '/contact' },
]

const HOUR_STEPS = [10, 15, 25, 40, 60]
const RATE_STEPS = [2500, 5000, 7500, 10000]
const SETUP_FEE = 22500

const PLAN_TAGS: Record<PlanKey, string> = { launch: '', boost: 'Most popular', growth: '', platinum: 'Custom' }
const PLAN_ORDER: PlanKey[] = ['launch', 'boost', 'growth', 'platinum']

function money(n: number) {
  return 'Rs. ' + Math.round(n).toLocaleString('en-US')
}

export default function HomeMobileContent() {
  const [skin, setSkin] = useState<'dark' | 'light'>('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [hours, setHours] = useState(15)
  const [rate, setRate] = useState(5000)

  const dark = skin === 'dark'
  const diy = hours * rate
  const saved = Math.max(diy - SETUP_FEE, 0)

  const theme = dark
    ? {
        pageBg: 'linear-gradient(172deg, #001C33 0%, #00263F 55%, #001526 100%)',
        orb1: 'radial-gradient(circle, rgba(112,117,56,0.5) 0%, rgba(112,117,56,0) 68%)',
        orb2: 'radial-gradient(circle, rgba(41,110,177,0.44) 0%, rgba(41,110,177,0) 68%)',
        headerBg: 'rgba(0,20,35,0.74)', headerLine: 'rgba(255,255,255,0.12)',
        logo: '/brand/matjarx-logo-light.png',
        ink1: '#F5F8FB', ink3: 'rgba(226,236,245,0.7)', ink4: 'rgba(226,236,245,0.5)', ink5: 'rgba(226,236,245,0.4)',
        accentInk: '#C6CB8A', iconInk: '#E9EFF5',
        chipBg: 'rgba(255,255,255,0.08)', chipLine: 'rgba(255,255,255,0.16)',
        cardBg: 'linear-gradient(160deg, rgba(255,255,255,0.1), rgba(255,255,255,0.035))',
        cardLine: 'rgba(255,255,255,0.14)',
        cardShadow: '0 14px 34px rgba(0,8,18,0.3), inset 0 1px 0 rgba(255,255,255,0.16)',
        voiceBg: 'linear-gradient(160deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))',
        voiceLine: 'rgba(255,255,255,0.14)', offsetFill: 'rgba(168,173,106,0.55)',
        voiceInk: '#F5F8FB', voiceMeta: 'rgba(226,236,245,0.5)', voiceBody: 'rgba(233,239,245,0.86)',
        skinIcon: 'M12 3.5a8.5 8.5 0 1 0 8.5 8.5c0-.4 0-.8-.1-1.2A6 6 0 0 1 12 3.6Z',
        planLight: { bg: 'linear-gradient(160deg, rgba(255,255,255,0.095), rgba(255,255,255,0.03))', border: 'rgba(255,255,255,0.13)', shadow: '0 16px 40px rgba(0,8,18,0.3), inset 0 1px 0 rgba(255,255,255,0.16)', ink: '#F5F8FB', muted: 'rgba(226,236,245,0.6)' },
      }
    : {
        pageBg: 'linear-gradient(172deg, #FCFAF3 0%, #F4EFE2 100%)',
        orb1: 'radial-gradient(circle, rgba(198,203,138,0.5) 0%, rgba(198,203,138,0) 68%)',
        orb2: 'radial-gradient(circle, rgba(120,170,215,0.4) 0%, rgba(120,170,215,0) 68%)',
        headerBg: 'rgba(252,250,243,0.78)', headerLine: 'rgba(4,18,31,0.1)',
        logo: '/brand/matjarx-logo-black.png',
        ink1: '#04121F', ink3: '#435A70', ink4: '#6A7F92', ink5: '#90A2B1',
        accentInk: '#707538', iconInk: '#04121F',
        chipBg: 'rgba(255,255,255,0.7)', chipLine: 'rgba(255,255,255,0.95)',
        cardBg: 'rgba(255,255,255,0.7)', cardLine: 'rgba(255,255,255,0.95)',
        cardShadow: '0 12px 30px rgba(4,18,31,0.07), inset 0 1px 0 rgba(255,255,255,0.95)',
        voiceBg: '#FFFFFF', voiceLine: 'rgba(4,18,31,0.07)', offsetFill: '#A8AD6A',
        voiceInk: '#04121F', voiceMeta: '#6A7F92', voiceBody: '#24384A',
        skinIcon: 'M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1 5.5 18.5',
        planLight: { bg: 'rgba(255,255,255,0.66)', border: 'rgba(255,255,255,0.9)', shadow: '0 14px 34px rgba(4,18,31,0.07), inset 0 1px 0 rgba(255,255,255,0.95)', ink: '#04121F', muted: '#6A7F92' },
      }

  const planDark = { bg: 'linear-gradient(160deg, rgba(0,51,102,0.96), rgba(0,28,51,0.96))', border: 'rgba(255,255,255,0.18)', shadow: '0 20px 46px rgba(0,51,102,0.3), inset 0 1px 0 rgba(255,255,255,0.2)', ink: '#FFFFFF', muted: 'rgba(255,255,255,0.62)' }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '24px 0', background: '#00121F' }}>
      <div style={{ width: 390, height: 844, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: theme.pageBg, borderRadius: 28, boxShadow: '0 40px 90px rgba(0,0,0,0.5)' }}>

        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', width: 520, height: 520, left: -170, top: -160, borderRadius: '50%', background: theme.orb1 }} />
          <div style={{ position: 'absolute', width: 460, height: 460, right: -160, top: 380, borderRadius: '50%', background: theme.orb2 }} />
        </div>

        {/* Promo bar */}
        <div style={{ position: 'relative', zIndex: 3, flex: '0 0 auto', background: 'linear-gradient(90deg, #003366 0%, #2E6EA8 20%, #707538 42%, #C9A227 60%, #C4262E 80%, #7A2E6B 100%)', padding: '14px 14px 9px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 11px', borderRadius: 999, background: 'rgba(0,0,0,0.26)', border: '1px solid rgba(255,255,255,0.32)' }}>
            <span style={{ width: 5, height: 5, flex: '0 0 auto', borderRadius: '50%', background: 'var(--butter)' }} />
            <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 10.5, color: '#FFFFFF', whiteSpace: 'nowrap' }}>49% off on sign up</span>
          </span>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.94)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>100,000 businesses in 2026</span>
        </div>

        {/* Header */}
        <header style={{ position: 'relative', zIndex: 3, flex: '0 0 auto', padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10, background: theme.headerBg, backdropFilter: 'blur(26px)', borderBottom: `1px solid ${theme.headerLine}` }}>
          <span style={{ position: 'relative', width: 104, height: 30, flex: '0 0 auto', marginRight: 'auto' }}>
            <Image src={theme.logo} alt="MatjarX" fill style={{ objectFit: 'contain', objectPosition: 'left center' }} />
          </span>
          <button type="button" onClick={() => setSkin(dark ? 'light' : 'dark')} title="Switch skin" style={{ all: 'unset', cursor: 'pointer', width: 38, height: 38, flex: '0 0 auto', borderRadius: 12, display: 'grid', placeItems: 'center', background: theme.chipBg, border: `1px solid ${theme.chipLine}` }}>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke={theme.iconInk} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={theme.skinIcon} /></svg>
          </button>
          <a href="#login" title="Log in" style={{ width: 38, height: 38, flex: '0 0 auto', borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'linear-gradient(160deg, #0A4278, #002E5C)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22)' }}>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--butter)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM5 20a7 7 0 0 1 14 0" /></svg>
          </a>
          <button type="button" onClick={() => setMenuOpen((v) => !v)} title="Menu" style={{ all: 'unset', cursor: 'pointer', width: 38, height: 38, flex: '0 0 auto', borderRadius: 12, display: 'grid', placeItems: 'center', background: theme.chipBg, border: `1px solid ${theme.chipLine}` }}>
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke={theme.iconInk} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={menuOpen ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} /></svg>
          </button>
        </header>

        {menuOpen && (
          <div style={{ position: 'relative', zIndex: 3, flex: '0 0 auto', padding: '8px 14px 14px', background: theme.headerBg, backdropFilter: 'blur(26px)', borderBottom: `1px solid ${theme.headerLine}`, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {NAV_ITEMS.map((n) => (
              <a key={n.label} href={n.href} style={{ padding: '13px 14px', borderRadius: 12, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: theme.ink1, background: theme.chipBg }}>{n.label}</a>
            ))}
          </div>
        )}

        {/* Scrollable body */}
        <div className="mx-rail" style={{ position: 'relative', zIndex: 2, flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0, padding: '22px 16px 30px', display: 'flex', flexDirection: 'column', gap: 22 }}>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
            <span style={{ fontSize: 12, lineHeight: 1.5, color: theme.ink3 }}>Having trouble launching the right website for your business?</span>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 30, lineHeight: 1.1, letterSpacing: '-1.1px', color: theme.ink1 }}>We&rsquo;ll build complete <span style={{ background: 'var(--moss-light)', color: '#16210B', padding: '0 6px', borderRadius: 3 }}>small business websites</span> in 7 days for Rs. 22,500</h1>
            <span style={{ fontSize: 13.5, lineHeight: 1.6, color: theme.ink3 }}>Support your business growth with affordable agency services.</span>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 9, paddingTop: 4 }}>
              <a href="/pricing" className="btn-primary" style={{ textAlign: 'center' }}>Let&rsquo;s begin</a>
              <a href="/website-examples" style={{ textAlign: 'center', padding: '16px 20px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13.5, letterSpacing: '0.8px', textTransform: 'uppercase', color: theme.ink1, background: theme.chipBg, border: `1.5px solid ${theme.chipLine}` }}>See our websites</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center', paddingTop: 8 }}>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 12, color: theme.ink1 }}>RATED 4.8 EXCELLENT</span>
              <span style={{ display: 'flex', gap: 2 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} style={{ width: 17, height: 17, display: 'grid', placeItems: 'center', background: '#00B67A' }}>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="#FFFFFF"><path d="m12 3.4 2.7 6.1 6.6.5-5 4.3 1.5 6.4L12 17.2l-5.8 3.5 1.5-6.4-5-4.3 6.6-.5z" /></svg>
                  </span>
                ))}
              </span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: theme.accentInk }}>Become part of a network of over 70,000 business owners.</span>

            <div className="mx-rail" style={{ width: '100%', display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -16px', padding: '4px 16px' }}>
              {RATING_BADGES.map((b) => (
                <div key={b.name} style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 15px 10px 12px', borderRadius: 14, background: theme.cardBg, border: `1px solid ${theme.cardLine}`, backdropFilter: 'blur(20px)', boxShadow: theme.cardShadow }}>
                  <span style={{ width: 28, height: 28, flex: '0 0 auto', borderRadius: 9, display: 'grid', placeItems: 'center', background: b.tint }}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill={b.mark}><path d={b.icon} /></svg>
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'left' }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 12, color: theme.ink1, whiteSpace: 'nowrap' }}>{b.name}</span>
                    <span style={{ fontSize: 10.5, fontWeight: 600, color: theme.ink4, whiteSpace: 'nowrap' }}>{b.score}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 16px 9px 11px', borderRadius: 999, background: 'linear-gradient(160deg, #0A4278, #002E5C)', border: '1.5px solid rgba(244,242,174,0.5)', boxShadow: '0 10px 24px rgba(4,18,31,0.3), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="var(--butter)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d="M12 3.5 4.5 6.5v5c0 4.4 3.1 7.6 7.5 9 4.4-1.4 7.5-4.6 7.5-9v-5ZM9 12l2.2 2.2L15.5 10" /></svg>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 11.5, letterSpacing: '0.3px', color: 'var(--butter)', whiteSpace: 'nowrap' }}>30-day money-back guarantee</span>
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-10px -8px -12px -8px', borderRadius: 26, background: 'linear-gradient(150deg, rgba(0,51,102,0.92), rgba(112,117,56,0.86))', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, padding: 3 }}>
              <EditorShowcaseMobile />
            </div>
          </div>

          {/* Did you know */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11, textAlign: 'center' }}>
              <span style={{ fontSize: 11, letterSpacing: '2.2px', textTransform: 'uppercase', color: theme.accentInk, fontWeight: 600 }}>Did you know?</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 23, lineHeight: 1.16, letterSpacing: '-0.8px', color: theme.ink1 }}><span style={{ color: theme.accentInk }}>4 out of 5</span> small business owners either have no website, or don&rsquo;t like the one they have.</h2>
            </div>
            {VOICES.map((v) => (
              <div key={v.name} style={{ position: 'relative', marginBottom: 7 }}>
                <div style={{ position: 'absolute', inset: '7px -7px -7px 7px', borderRadius: 18, background: theme.offsetFill, zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, padding: '18px 19px 20px', borderRadius: 18, background: theme.voiceBg, border: `1px solid ${theme.voiceLine}`, backdropFilter: 'blur(20px)', boxShadow: theme.cardShadow, display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <span style={{ width: 38, height: 38, flex: '0 0 auto', borderRadius: '50%', background: v.tint, border: '2px solid rgba(255,255,255,0.9)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13, color: '#04121F' }}>{v.initials}</span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 16, letterSpacing: '-0.3px', color: theme.voiceInk }}>{v.name}</span>
                      <span style={{ fontSize: 11, color: theme.voiceMeta }}>{v.trade}</span>
                    </span>
                  </div>
                  <span style={{ fontSize: 13.5, lineHeight: 1.58, color: theme.voiceBody }}>&ldquo;{v.quote}&rdquo;</span>
                </div>
              </div>
            ))}
            <span style={{ alignSelf: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 24, letterSpacing: '-0.6px', color: theme.accentInk }}>Why?</span>
          </div>

          {/* Mascot/urgency */}
          <div style={{ borderRadius: 24, overflow: 'hidden', background: 'linear-gradient(150deg, #04121F, #0A3A63)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 22px 50px rgba(4,18,31,0.34), inset 0 1px 0 rgba(255,255,255,0.16)' }}>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 13 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 22, lineHeight: 1.14, letterSpacing: '-0.8px', color: '#FFFFFF' }}>50 milliseconds. <span style={{ color: 'rgba(255,255,255,0.6)' }}>That&rsquo;s how long you have to make a first impression.</span></h2>
              <span style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.66)' }}>After that you get 3 to 8 seconds to convince a customer you&rsquo;re worth their money. If your website doesn&rsquo;t, they leave.</span>
              <a href="/pricing" className="btn-primary" style={{ textAlign: 'center' }}>Not on my watch</a>
            </div>
          </div>

          {/* Savings calculator */}
          <div style={{ padding: '22px 20px 24px', borderRadius: 24, background: 'linear-gradient(160deg, rgba(0,51,102,0.96), rgba(0,28,51,0.96))', border: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(24px)', boxShadow: '0 22px 50px rgba(4,18,31,0.3), inset 0 1px 0 rgba(255,255,255,0.2)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <span style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>Do it yourself?</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 22, lineHeight: 1.16, letterSpacing: '-0.8px', color: '#FFFFFF' }}>Your time has a price. Work out what a DIY website costs you.</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, padding: '15px 16px', borderRadius: 16, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 12.5, color: 'rgba(233,239,245,0.82)', marginRight: 'auto' }}>Number of hours</span>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 16, color: 'var(--butter)', whiteSpace: 'nowrap' }}>{hours} hours</span>
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                {HOUR_STEPS.map((h) => {
                  const active = hours === h
                  return (
                    <button key={h} type="button" onClick={() => setHours(h)} style={{ all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center', padding: '11px 2px', borderRadius: 10, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 12.5, color: active ? '#14210b' : 'rgba(233,239,245,0.75)', background: active ? 'linear-gradient(160deg, #F7F5C0, #E7E49B)' : 'rgba(255,255,255,0.07)', border: `1px solid ${active ? '#E7E49B' : 'rgba(255,255,255,0.16)'}` }}>{h}</button>
                  )
                })}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, padding: '15px 16px', borderRadius: 16, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 12.5, color: 'rgba(233,239,245,0.82)', marginRight: 'auto' }}>Per hour cost</span>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 16, color: 'var(--butter)', whiteSpace: 'nowrap' }}>{money(rate)} / hr</span>
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                {RATE_STEPS.map((r) => {
                  const active = rate === r
                  return (
                    <button key={r} type="button" onClick={() => setRate(r)} style={{ all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center', padding: '11px 2px', borderRadius: 10, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 12.5, color: active ? '#14210b' : 'rgba(233,239,245,0.75)', background: active ? 'linear-gradient(160deg, #F7F5C0, #E7E49B)' : 'rgba(255,255,255,0.07)', border: `1px solid ${active ? '#E7E49B' : 'rgba(255,255,255,0.16)'}` }}>{r / 1000}k</button>
                  )
                })}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '18px 19px 20px', borderRadius: 18, background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.18)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, paddingBottom: 11, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 'auto', minWidth: 0 }}>
                  <span style={{ fontSize: 12.5, color: 'rgba(233,239,245,0.84)' }}>Doing it yourself</span>
                  <span style={{ fontSize: 10.5, color: 'rgba(226,236,245,0.5)' }}>{hours} hours × {money(rate)}</span>
                </span>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 18, letterSpacing: '-0.4px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>{money(diy)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, paddingBottom: 11, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 'auto', minWidth: 0 }}>
                  <span style={{ fontSize: 12.5, color: 'rgba(233,239,245,0.84)' }}>MatjarX, live in 7 days</span>
                  <span style={{ fontSize: 10.5, color: 'rgba(226,236,245,0.5)' }}>One-time Launch setup fee</span>
                </span>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 18, letterSpacing: '-0.4px', color: 'var(--moss-light)', whiteSpace: 'nowrap' }}>{money(SETUP_FEE)}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontSize: 11, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>You save</span>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 32, lineHeight: 1.05, letterSpacing: '-1.2px', color: 'var(--butter)' }}>{money(saved)}</span>
              </div>
              <a href="/pricing" style={{ textAlign: 'center', padding: '15px 20px', borderRadius: 13, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#14210b', background: 'linear-gradient(160deg, #F7F5C0, #E7E49B)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.65)' }}>Sign up now</a>
            </div>
          </div>

          {/* Plans */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 11, letterSpacing: '2.2px', textTransform: 'uppercase', color: theme.accentInk, fontWeight: 600 }}>Plans</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 23, lineHeight: 1.16, letterSpacing: '-0.8px', color: theme.ink1 }}>One setup fee. One monthly fee.</h2>
            {PLAN_ORDER.map((key) => {
              const p = ALL_PLANS[key]
              const tag = PLAN_TAGS[key]
              const t = key === 'boost' ? planDark : theme.planLight
              return (
                <div key={key} style={{ padding: 20, borderRadius: 20, background: t.bg, border: `1.5px solid ${t.border}`, backdropFilter: 'blur(22px)', boxShadow: t.shadow, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 19, letterSpacing: '-0.4px', color: t.ink, marginRight: 'auto' }}>{p.name}</span>
                    {tag && <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.7px', textTransform: 'uppercase', padding: '5px 9px', borderRadius: 999, color: '#3D3A08', background: 'var(--butter)', whiteSpace: 'nowrap' }}>{tag}</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 25, letterSpacing: '-0.9px', color: t.ink }}>{p.price}</span>
                    <span style={{ fontSize: 12, color: t.muted }}>/ mo</span>
                  </div>
                  <span style={{ fontSize: 11.5, color: t.muted }}>+ {p.setup} setup · {p.pitch}</span>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div style={{ padding: '26px 22px 28px', borderRadius: 26, background: 'linear-gradient(150deg, rgba(244,242,174,0.94), rgba(198,203,138,0.94))', border: '1px solid rgba(255,255,255,0.7)', boxShadow: '0 22px 50px rgba(112,117,56,0.24), inset 0 1px 0 rgba(255,255,255,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 13, textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 24, lineHeight: 1.12, letterSpacing: '-0.9px', color: '#1F2A08' }}>Professional websites, ready in just 7 days.</h2>
            <span style={{ fontSize: 13, lineHeight: 1.6, color: '#3D4A16' }}>Completely risk-free, with unmatched customer support.</span>
            <a href="/pricing" style={{ width: '100%', textAlign: 'center', padding: '15px 20px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#FFFFFF', background: '#04121F' }}>Get started</a>
            <a href="https://wa.me/923033720953" target="_blank" rel="noopener noreferrer" style={{ width: '100%', textAlign: 'center', padding: '15px 20px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#1F2A08', background: 'rgba(255,255,255,0.62)', border: '1.5px solid rgba(255,255,255,0.9)' }}>Talk to us on WhatsApp</a>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 6 }}>
            <Image src="/brand/matjarx-logo-light.png" alt="MatjarX" width={124} height={36} style={{ width: 124, height: 'auto' }} />
            <span style={{ fontSize: 12, lineHeight: 1.6, color: theme.ink4 }}>Done-for-you websites, SEO and growth marketing for small businesses across Pakistan and the Gulf.</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <a href="tel:+923033720953" style={{ fontSize: 12.5, color: '#E7E49B' }}>+92 303 372 0953</a>
              <a href="mailto:office@matjarx.com" style={{ fontSize: 12.5, color: '#E7E49B' }}>office@matjarx.com</a>
            </div>
            <span style={{ fontSize: 11, color: theme.ink5, paddingTop: 6, borderTop: `1px solid ${theme.headerLine}` }}>© 2012–2026 MatjarX. All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
