'use client'

// Website Examples page — from Marketing - Website Examples.dc.html.
// Two-row category rail with clamped-scrollLeft arrow buttons (per the
// handoff: smooth-scroll/rAF approaches all produced zero movement in
// review — direct scrollLeft assignment is required), a filtered card
// grid with a hover-reveal overlay, and a full-screen iframe modal with
// a fallback layer for sites that block embedding.

import { useRef, useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { routes } from '@/lib/routes'
import { EXAMPLES, EXAMPLE_CATEGORIES, EXAMPLE_PILLARS } from '@/lib/examples-data'

export default function WebsiteExamplesContent() {
  const [filter, setFilter] = useState('All')
  const [modalIndex, setModalIndex] = useState(-1)
  const railRef = useRef<HTMLDivElement>(null)

  const shown = filter === 'All' ? EXAMPLES : EXAMPLES.filter((x) => x.cat === filter)
  const modalItem = modalIndex >= 0 ? shown[modalIndex] : null
  const modalUrl = modalItem ? `https://${modalItem.domain}` : ''

  function scrollRail(dir: 1 | -1) {
    const el = railRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const step = dir * Math.max(240, el.clientWidth - 40)
    el.scrollLeft = Math.max(0, Math.min(max, el.scrollLeft + step))
  }

  const resultLine = shown.length + (shown.length === 1 ? ' example' : ' examples') + (filter === 'All' ? ' shown · hover a site to open it' : ` in ${filter} · hover a site to open it`)

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <div className="orb-field">
        <div style={{ position: 'absolute', width: 860, height: 860, left: -250, top: -300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(198,203,138,0.4) 0%, rgba(198,203,138,0) 68%)' }} />
        <div style={{ position: 'absolute', width: 720, height: 720, right: -190, top: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,170,215,0.32) 0%, rgba(120,170,215,0) 68%)' }} />
      </div>
      <div className="page-content">
        <SiteHeader active="examples" />

        {/* Hero */}
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5.2vw, 52px)', lineHeight: 1.07, letterSpacing: '-1.9px', color: '#04121F' }}>
            <span className="marker">70,000+ Websites</span> Built Globally
          </h1>
          <p style={{ margin: 0, maxWidth: '40em', fontSize: 'clamp(14.5px, 1.7vw, 17px)', lineHeight: 1.6, color: '#435A70' }}>
            New or established, local or e-commerce, we serve businesses of all kinds. Serving over 100s of business categories.
          </p>
        </section>

        {/* Category rail */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button type="button" onClick={() => scrollRail(-1)} title="Previous categories" className="mx-rail-arrow glass-chip" style={{ all: 'unset', cursor: 'pointer', width: 38, height: 66, flex: '0 0 auto', borderRadius: 12, display: 'grid', placeItems: 'center' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#04121F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
            </button>

            <div ref={railRef} className="mx-rail" style={{ flex: 1, minWidth: 0, overflowX: 'auto', overflowY: 'hidden' }}>
              <div style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: '1fr 1fr', gridAutoColumns: 158, gap: 10, width: 'max-content' }}>
                {EXAMPLE_CATEGORIES.map((c) => {
                  const on = filter === c
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => { setFilter(c); setModalIndex(-1) }}
                      style={{ all: 'unset', cursor: 'pointer', textAlign: 'center', padding: '13px 14px', borderRadius: 10, fontSize: 13.5, fontWeight: on ? 700 : 500, color: on ? '#FFFFFF' : '#3D3A08', background: on ? 'var(--olive-active)' : 'var(--butter)', border: `1px solid ${on ? 'var(--olive-active)' : 'rgba(61,58,8,0.14)'}`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'background 180ms ease' }}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
            </div>

            <button type="button" onClick={() => scrollRail(1)} title="More categories" className="mx-rail-arrow glass-chip" style={{ all: 'unset', cursor: 'pointer', width: 38, height: 66, flex: '0 0 auto', borderRadius: 12, display: 'grid', placeItems: 'center' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#04121F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m10 6 6 6-6 6" /></svg>
            </button>
          </div>
          <p style={{ margin: '20px 0 0', textAlign: 'center', fontSize: 13.5, color: '#6A7F92' }}>{resultLine}</p>
        </section>

        {/* Example cards */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '26px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 22 }}>
            {shown.map((ex, i) => (
              <div key={ex.name} className="mx-card" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', background: ex.tint, border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 18px 44px rgba(4,18,31,0.1)' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'relative', aspectRatio: '16 / 10', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', background: 'rgba(0,0,0,0.28)' }}>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 11, letterSpacing: '1px', color: 'rgba(255,255,255,0.94)', whiteSpace: 'nowrap' }}>{ex.brand}</span>
                      <span style={{ display: 'flex', gap: 12, margin: '0 auto' }}>
                        {ex.nav.map((n) => (
                          <span key={n} style={{ fontSize: 8.5, fontWeight: 600, color: 'rgba(255,255,255,0.68)', whiteSpace: 'nowrap' }}>{n}</span>
                        ))}
                      </span>
                      <span style={{ flex: '0 0 auto', padding: '5px 11px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 8, color: ex.ctaInk, background: ex.ctaBg, whiteSpace: 'nowrap' }}>{ex.cta}</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 9, padding: '22px 26px 26px', minHeight: 0 }}>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(20px, 2.4vw, 28px)', lineHeight: 1.04, letterSpacing: '-0.9px', color: '#FFFFFF', textShadow: '0 2px 14px rgba(0,0,0,0.4)' }}>{ex.heroLine}</span>
                      <span style={{ maxWidth: '26em', fontSize: 11, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>{ex.heroBlurb}</span>
                    </div>
                  </div>

                  <div className="mx-overlay" style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', background: 'rgba(4,18,31,0.62)', backdropFilter: 'blur(2px)' }}>
                    <button type="button" onClick={() => setModalIndex(i)} className="mx-see-full" style={{ all: 'unset', cursor: 'pointer', padding: '13px 22px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13.5, color: '#FFFFFF', borderBottom: '2px solid rgba(255,255,255,0.8)' }}>See Full Example</button>
                    <Link href={routes.pricing} className="mx-get-site" style={{ padding: '13px 22px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13.5, color: '#16210B', background: 'linear-gradient(160deg, #C6CB8A, #A8AD6A)', boxShadow: '0 10px 24px rgba(0,0,0,0.28)' }}>Get A Site Like This</Link>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 18px', background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(20px)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginRight: 'auto', minWidth: 0 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, letterSpacing: '-0.2px', color: '#04121F' }}>{ex.name}</span>
                    <span style={{ fontSize: 12, color: '#6A7F92' }}>{ex.category} · {ex.domain}</span>
                  </div>
                  <span style={{ flex: '0 0 auto', fontSize: 11.5, fontWeight: 600, padding: '6px 12px', borderRadius: 999, color: '#3D3A08', background: 'var(--butter)', whiteSpace: 'nowrap' }}>{ex.result}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal */}
        {modalItem && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', flexDirection: 'column', padding: 'clamp(12px, 3vw, 34px)', background: 'rgba(2,10,18,0.86)', backdropFilter: 'blur(8px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 4px 12px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(18px)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--moss-light)' }} />
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13, color: '#FFFFFF' }}>{modalItem.name}</span>
                <span style={{ fontSize: 12, color: 'rgba(226,236,245,0.55)' }}>{modalItem.domain}</span>
              </span>
              <Link href={routes.pricing} className="mx-get-site" style={{ marginLeft: 'auto', padding: '12px 22px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13.5, color: '#16210B', background: 'linear-gradient(160deg, #C6CB8A, #A8AD6A)' }}>Get A Website Like This</Link>
              <button type="button" onClick={() => setModalIndex(-1)} title="Close" style={{ all: 'unset', cursor: 'pointer', width: 40, height: 40, flex: '0 0 auto', borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, minHeight: 0, position: 'relative', borderRadius: 16, overflow: 'hidden', background: modalItem.tint, border: '1px solid rgba(255,255,255,0.18)', boxShadow: '0 40px 90px rgba(0,0,0,0.5)' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 34, textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 34px)', letterSpacing: '-1px', color: '#FFFFFF' }}>{modalItem.name}</span>
                <span style={{ maxWidth: '30em', fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.78)' }}>If the live site doesn&rsquo;t appear, it blocks being embedded — open it in a new tab instead.</span>
                <a href={modalUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Open {modalItem.domain} in a new tab</a>
              </div>
              <iframe src={modalUrl} title={modalItem.name} loading="lazy" style={{ position: 'relative', zIndex: 1, display: 'block', width: '100%', height: '100%', border: 0 }} />
            </div>
          </div>
        )}

        {/* Pillars */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <h2 style={{ margin: '0 0 34px', textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>
            What makes MatjarX <span style={{ background: 'var(--butter)', padding: '0 9px', borderRadius: 3 }}>websites great</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: 20 }}>
            {EXAMPLE_PILLARS.map((p) => (
              <div key={p.title} className="glass-card" style={{ padding: '28px 26px 30px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 13 }}>
                <span style={{ width: 44, height: 44, borderRadius: 13, background: 'var(--navy)', display: 'grid', placeItems: 'center' }}>
                  <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="var(--butter)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
                </span>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 19, letterSpacing: '-0.3px', color: '#04121F' }}>{p.title}</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#4B5D6E' }}>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 70 }} />
        <SiteFooter />
      </div>
    </div>
  )
}
