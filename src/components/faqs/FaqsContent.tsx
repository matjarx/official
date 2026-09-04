'use client'

// FAQs page — from Marketing - FAQs.dc.html. Navy hero, a group-filter
// chip row ("All" + 5 categories), the filtered questions flattened and
// split into two columns with a single globally-open accordion item, a
// dark "still have questions?" CTA panel.

import { useMemo, useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { routes } from '@/lib/routes'
import { FAQ_GROUPS, FAQ_GROUP_NAMES, type FaqGroupName } from '@/lib/faqs-data'

type FlatQ = { key: string; question: string; answer: string }

export default function FaqsContent() {
  const [group, setGroup] = useState<'All' | FaqGroupName>('All')
  const [openKey, setOpenKey] = useState('Getting started|0')

  const flat = useMemo<FlatQ[]>(() => {
    const out: FlatQ[] = []
    FAQ_GROUP_NAMES.forEach((name) => {
      if (group === 'All' || group === name) {
        FAQ_GROUPS[name].forEach(([question, answer], i) => out.push({ key: `${name}|${i}`, question, answer }))
      }
    })
    return out
  }, [group])

  const half = Math.ceil(flat.length / 2)
  const colA = flat.slice(0, half)
  const colB = flat.slice(half)

  const renderCol = (col: FlatQ[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
      {col.map((q) => {
        const open = openKey === q.key
        return (
          <div key={q.key} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden' }}>
            <button type="button" onClick={() => setOpenKey(open ? '' : q.key)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '19px 22px' }}>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, lineHeight: 1.35, color: '#04121F', marginRight: 'auto', textAlign: 'left' }}>{q.question}</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#6A7F92" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {open && <p style={{ margin: 0, padding: '0 22px 21px', fontSize: 14.5, lineHeight: 1.68, color: '#435A70' }}>{q.answer}</p>}
          </div>
        )
      })}
    </div>
  )

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="resources" />

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '60px 24px 52px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>Help centre</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5.6vw, 50px)', lineHeight: 1.08, letterSpacing: '-1.7px', color: '#FFFFFF' }}>
            Frequently asked <span style={{ background: 'var(--moss-light)', color: '#16210B', padding: '0 10px', borderRadius: 3 }}>questions</span>
          </h1>
          <p style={{ margin: 0, maxWidth: '32em', fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>Everything you need to use MatjarX like a pro. Still stuck? We&rsquo;re a phone call away.</p>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <div className="orb-field">
          <div style={{ position: 'absolute', width: 720, height: 720, right: -190, top: 60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,170,215,0.32) 0%, rgba(120,170,215,0) 68%)' }} />
          <div style={{ position: 'absolute', width: 780, height: 780, left: '20%', top: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,242,174,0.36) 0%, rgba(244,242,174,0) 70%)' }} />
        </div>
        <div className="page-content">

          {/* Group filter chips */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 24px 0' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {(['All', ...FAQ_GROUP_NAMES] as const).map((name) => {
                const active = group === name
                return (
                  <button key={name} type="button" onClick={() => setGroup(name)} style={{ all: 'unset', cursor: 'pointer', padding: '11px 20px', borderRadius: 999, fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', color: active ? '#FFFFFF' : '#3B5063', background: active ? 'var(--navy)' : '#FFFFFF', border: `1.5px solid ${active ? 'var(--navy)' : 'rgba(4,18,31,0.14)'}`, transition: 'background 160ms ease' }}>{name}</button>
                )
              })}
            </div>
          </section>

          {/* Two-column accordion */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '36px 24px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 24, alignItems: 'start' }}>
              {renderCol(colA)}
              {renderCol(colB)}
            </div>
          </section>

          {/* Still have questions CTA */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ padding: 'clamp(26px, 4vw, 40px) clamp(22px, 3.5vw, 42px)', borderRadius: 26, background: '#04121F', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 34, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(23px, 3.6vw, 30px)', lineHeight: 1.18, letterSpacing: '-1px', color: '#FFFFFF' }}>Still have questions?</h2>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.62, color: 'rgba(255,255,255,0.65)' }}>Get started today — or just ask us anything before you commit to anything.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
                <a href="tel:+923033720953" className="btn-primary" style={{ textAlign: 'center' }}>Call +92 303 372 0953</a>
                <Link href={routes.contact} style={{ textAlign: 'center', padding: '15px 22px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#FFFFFF', background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(255,255,255,0.2)' }}>Send us a message</Link>
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
