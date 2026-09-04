'use client'

// The savings calculator panel — used identically on Home and Pricing
// (README: "The client specified this exactly"). Hour/rate steppers drive
// both the comparison rows and the headline saving figure live.

import { useState } from 'react'
import Link from 'next/link'
import { routes } from '@/lib/routes'

const HOUR_STEPS = [10, 15, 25, 40, 60]
const RATE_STEPS = [2500, 5000, 7500, 10000]
const MATJARX_FEE = 22500

function money(n: number) {
  return 'Rs. ' + n.toLocaleString('en-US')
}

export default function SavingsCalculator() {
  const [hours, setHours] = useState(15)
  const [rate, setRate] = useState(5000)

  const diyTotal = hours * rate
  const saving = diyTotal - MATJARX_FEE

  return (
    <div className="glass-dark-panel" style={{ padding: 'clamp(28px, 4vw, 46px)', borderRadius: 30, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(26px, 4vw, 46px)', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
        <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>What it really costs to do it yourself</span>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#FFFFFF' }}>Your time has a price. Work out what a DIY website costs you.</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 4 }}>
          <div className="glass-dark-inner" style={{ display: 'flex', flexDirection: 'column', gap: 11, padding: '18px 20px', borderRadius: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13.5, color: 'rgba(233,239,245,0.82)', marginRight: 'auto' }}>Number of hours</span>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 19, letterSpacing: '-0.4px', color: 'var(--butter)', whiteSpace: 'nowrap' }}>{hours} hours</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {HOUR_STEPS.map((h) => {
                const on = hours === h
                return (
                  <button key={h} type="button" onClick={() => setHours(h)} style={{ all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center', padding: '11px 4px', borderRadius: 11, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13, color: on ? '#14210b' : 'rgba(233,239,245,0.75)', background: on ? 'linear-gradient(160deg, #F7F5C0, #E7E49B)' : 'rgba(255,255,255,0.07)', border: `1px solid ${on ? '#E7E49B' : 'rgba(255,255,255,0.16)'}`, transition: 'background 160ms ease' }}>{h}</button>
                )
              })}
            </div>
          </div>

          <div className="glass-dark-inner" style={{ display: 'flex', flexDirection: 'column', gap: 11, padding: '18px 20px', borderRadius: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13.5, color: 'rgba(233,239,245,0.82)', marginRight: 'auto' }}>Per hour cost</span>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 19, letterSpacing: '-0.4px', color: 'var(--butter)', whiteSpace: 'nowrap' }}>{money(rate)} / hour</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {RATE_STEPS.map((r) => {
                const on = rate === r
                return (
                  <button key={r} type="button" onClick={() => setRate(r)} style={{ all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center', padding: '11px 4px', borderRadius: 11, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13, color: on ? '#14210b' : 'rgba(233,239,245,0.75)', background: on ? 'linear-gradient(160deg, #F7F5C0, #E7E49B)' : 'rgba(255,255,255,0.07)', border: `1px solid ${on ? '#E7E49B' : 'rgba(255,255,255,0.16)'}`, transition: 'background 160ms ease' }}>{r / 1000}k</button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '26px 28px', borderRadius: 22, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(22px)', boxShadow: '0 20px 46px rgba(0,10,25,0.28), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, paddingBottom: 13, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginRight: 'auto', minWidth: 0 }}>
              <span style={{ fontSize: 13.5, color: 'rgba(233,239,245,0.84)' }}>Doing it yourself</span>
              <span style={{ fontSize: 11.5, color: 'rgba(226,236,245,0.5)' }}>{hours} hours × {money(rate)} / hour</span>
            </div>
            <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 22, letterSpacing: '-0.6px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>{money(diyTotal)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, paddingBottom: 13, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginRight: 'auto', minWidth: 0 }}>
              <span style={{ fontSize: 13.5, color: 'rgba(233,239,245,0.84)' }}>MatjarX, live in 7 days</span>
              <span style={{ fontSize: 11.5, color: 'rgba(226,236,245,0.5)' }}>One-time Launch setup fee</span>
            </div>
            <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 22, letterSpacing: '-0.6px', color: 'var(--moss-light)', whiteSpace: 'nowrap' }}>{money(MATJARX_FEE)}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 2 }}>
            <span style={{ fontSize: 12, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>You save</span>
            <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(34px, 5vw, 46px)', lineHeight: 1.05, letterSpacing: '-1.6px', color: 'var(--butter)' }}>{money(saving > 0 ? saving : 0)}</span>
            <span style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(226,236,245,0.6)' }}>
              {saving > 0 ? `And you don't spend a single one of those ${hours} hours.` : 'Even at this rate, your time is better spent running the business.'}
            </span>
          </div>

          <Link href={routes.pricing} className="btn-primary" style={{ marginTop: 6, display: 'block', textAlign: 'center' }}>Sign up now</Link>
        </div>
        <span style={{ fontSize: 12, lineHeight: 1.55, textAlign: 'center', color: 'rgba(226,236,245,0.45)' }}>Rs. 22,500 is the one-time Launch setup fee. Hosting, domain and business email are included.</span>
      </div>
    </div>
  )
}
