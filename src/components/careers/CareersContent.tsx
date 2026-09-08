'use client'

// Careers page — from Marketing - Careers.dc.html. Navy hero, 4 perk
// cards, a category-filtered open-roles list with a single globally-
// open expandable role card (duties/needs/apply mailto), a dark
// "nothing fits?" CTA panel.

import { useMemo, useState } from 'react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { CAREERS_PERKS, CAREERS_ROLES, CAREERS_CATEGORIES } from '@/lib/careers-data'

export type CareersContentShape = { perks: typeof CAREERS_PERKS; roles: typeof CAREERS_ROLES }
const DEFAULT_CONTENT: CareersContentShape = { perks: CAREERS_PERKS, roles: CAREERS_ROLES }

export default function CareersContent({ content = DEFAULT_CONTENT }: { content?: CareersContentShape }) {
  const [filter, setFilter] = useState<(typeof CAREERS_CATEGORIES)[number]>('All')
  const [openIndex, setOpenIndex] = useState(0)
  const CAREERS_PERKS_ACTIVE = content.perks
  const CAREERS_ROLES_ACTIVE = content.roles

  const shown = useMemo(
    () => (filter === 'All' ? CAREERS_ROLES_ACTIVE : CAREERS_ROLES_ACTIVE.filter((r) => r.cat === filter)),
    [filter, CAREERS_ROLES_ACTIVE]
  )

  const roleCount = `${shown.length} ${shown.length === 1 ? 'role open' : 'roles open'}${filter === 'All' ? ' across five teams' : ` in ${filter}`}`

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="company" />

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '60px 24px 52px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>Careers at MatjarX</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5.6vw, 50px)', lineHeight: 1.08, letterSpacing: '-1.7px', color: '#FFFFFF' }}>
            Build things that put real businesses <span style={{ background: 'var(--moss-light)', color: '#16210B', padding: '0 10px', borderRadius: 3 }}>on the map</span>
          </h1>
          <p style={{ margin: 0, maxWidth: '34em', fontSize: 17, lineHeight: 1.62, color: 'rgba(255,255,255,0.72)' }}>Every site we ship belongs to someone who runs a shop, a clinic or a factory. The work lands somewhere you can point at.</p>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <div className="orb-field">
          <div style={{ position: 'absolute', width: 720, height: 720, right: -190, top: 60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,170,215,0.32) 0%, rgba(120,170,215,0) 68%)' }} />
          <div style={{ position: 'absolute', width: 780, height: 780, left: '20%', top: 1100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,242,174,0.36) 0%, rgba(244,242,174,0) 70%)' }} />
        </div>
        <div className="page-content">

          {/* Perks */}
          <section style={{ maxWidth: 1140, margin: '0 auto', padding: '48px 24px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 18 }}>
              {CAREERS_PERKS_ACTIVE.map((p) => (
                <div key={p.title} className="glass-card" style={{ padding: '26px 26px 28px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--butter)', display: 'grid', placeItems: 'center' }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#3D3A08" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
                  </span>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, letterSpacing: '-0.3px', color: '#04121F' }}>{p.title}</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.6, color: '#4B5D6E' }}>{p.body}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Open roles */}
          <section style={{ maxWidth: 1140, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22, flexWrap: 'wrap', marginBottom: 28 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginRight: 'auto' }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4.2vw, 36px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>Open roles</h2>
                <p style={{ margin: 0, fontSize: 15.5, color: '#435A70' }}>{roleCount}</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {CAREERS_CATEGORIES.map((c) => {
                  const active = filter === c
                  return (
                    <button key={c} type="button" onClick={() => { setFilter(c); setOpenIndex(-1) }} style={{ all: 'unset', cursor: 'pointer', padding: '10px 17px', borderRadius: 999, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', color: active ? '#FFFFFF' : '#3B5063', background: active ? 'var(--navy)' : '#FFFFFF', border: `1.5px solid ${active ? 'var(--navy)' : 'rgba(4,18,31,0.14)'}` }}>{c}</button>
                  )
                })}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {shown.map((r, i) => {
                const open = openIndex === i
                return (
                  <div key={r.title} className="glass-card" style={{ borderRadius: 20, overflow: 'hidden' }}>
                    <button type="button" onClick={() => setOpenIndex(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'center', gap: 18, padding: '24px 26px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginRight: 'auto', minWidth: 0, textAlign: 'left' }}>
                        <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 19, letterSpacing: '-0.35px', color: '#04121F' }}>{r.title}</span>
                        <span style={{ fontSize: 13, color: '#5A6F82' }}>{r.team} · {r.location} · {r.type}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, padding: '7px 13px', borderRadius: 999, color: '#3D3A08', background: 'var(--butter)', whiteSpace: 'nowrap' }}>{r.level}</span>
                      <span className="glass-chip" style={{ width: 30, height: 30, flex: '0 0 auto', borderRadius: '50%', display: 'grid', placeItems: 'center' }}>
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#04121F" strokeWidth="2.4" strokeLinecap="round" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="M12 5v14M5 12h14" /></svg>
                      </span>
                    </button>
                    {open && (
                      <div style={{ padding: '0 26px 26px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.68, color: '#33485B' }}>{r.summary}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 24 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, minWidth: 0 }}>
                            <span style={{ fontSize: 11.5, letterSpacing: '1.3px', textTransform: 'uppercase', color: '#8A7A5E', fontWeight: 600 }}>What you&rsquo;ll do</span>
                            {r.duties.map((d) => (
                              <span key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14.5, lineHeight: 1.58, color: '#3B5063' }}>
                                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="var(--olive)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                                {d}
                              </span>
                            ))}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, minWidth: 0 }}>
                            <span style={{ fontSize: 11.5, letterSpacing: '1.3px', textTransform: 'uppercase', color: '#8A7A5E', fontWeight: 600 }}>What we&rsquo;re looking for</span>
                            {r.needs.map((n) => (
                              <span key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14.5, lineHeight: 1.58, color: '#3B5063' }}>
                                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="var(--olive)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                                {n}
                              </span>
                            ))}
                          </div>
                        </div>
                        <a href="mailto:careers@matjarx.com" className="btn-navy" style={{ alignSelf: 'flex-start' }}>Apply for this role</a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Nothing fits CTA */}
          <section style={{ maxWidth: 1140, margin: '0 auto', padding: '66px 24px 74px' }}>
            <div style={{ padding: 'clamp(26px, 4vw, 42px) clamp(22px, 3.5vw, 44px)', borderRadius: 26, background: '#04121F', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))', gap: 36, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13, minWidth: 0 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(23px, 3.6vw, 30px)', lineHeight: 1.18, letterSpacing: '-1px', color: '#FFFFFF' }}>Nothing fits, but you&rsquo;d be good here?</h2>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.62, color: 'rgba(255,255,255,0.65)' }}>Send us your work and tell us what you&rsquo;d want to do. We&rsquo;ve hired several people who wrote in before a role existed.</p>
              </div>
              <a href="mailto:careers@matjarx.com" className="btn-primary" style={{ justifySelf: 'start' }}>careers@matjarx.com</a>
            </div>
          </section>

          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
