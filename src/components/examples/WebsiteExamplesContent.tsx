'use client'

// Website Examples page — from Marketing - Website Examples.dc.html.
// Two-row category rail with clamped-scrollLeft arrow buttons (per the
// handoff: smooth-scroll/rAF approaches all produced zero movement in
// review — direct scrollLeft assignment is required), a filtered card
// grid with a hover-reveal overlay, and a full-screen iframe modal with
// a fallback layer for sites that block embedding.

import { useRef, useState } from 'react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PortfolioShowcase from './PortfolioShowcase'
import { EXAMPLES, EXAMPLE_CATEGORIES, EXAMPLE_PILLARS } from '@/lib/examples-data'

export type WebsiteExamplesContentShape = { examples: typeof EXAMPLES; categories: typeof EXAMPLE_CATEGORIES; pillars: typeof EXAMPLE_PILLARS }
const DEFAULT_CONTENT: WebsiteExamplesContentShape = { examples: EXAMPLES, categories: EXAMPLE_CATEGORIES, pillars: EXAMPLE_PILLARS }

export default function WebsiteExamplesContent({ content = DEFAULT_CONTENT }: { content?: WebsiteExamplesContentShape }) {
  const EXAMPLES_ACTIVE = content.examples
  const EXAMPLE_CATEGORIES_ACTIVE = content.categories
  const EXAMPLE_PILLARS_ACTIVE = content.pillars
  const [filter, setFilter] = useState('All')
  const [modalIndex, setModalIndex] = useState(-1)
  const railRef = useRef<HTMLDivElement>(null)

  const shown = filter === 'All' ? EXAMPLES_ACTIVE : EXAMPLES_ACTIVE.filter((x) => x.cat === filter)

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
                {EXAMPLE_CATEGORIES_ACTIVE.map((c) => {
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
          <p style={{ margin: '20px 0 0', textAlign: 'center', fontSize: 13.5, color: '#5A6F82' }}>{resultLine}</p>
        </section>

        {/* Example cards + iframe modal */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '26px 24px 0' }}>
          <PortfolioShowcase items={shown} modalIndex={modalIndex} setModalIndex={setModalIndex} />
        </section>

        {/* Pillars */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <h2 style={{ margin: '0 0 34px', textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>
            What makes MatjarX <span style={{ background: 'var(--butter)', padding: '0 9px', borderRadius: 3 }}>websites great</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: 20 }}>
            {EXAMPLE_PILLARS_ACTIVE.map((p) => (
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
