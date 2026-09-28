'use client'

// The real MatjarX portfolio card + iframe-preview pattern, extracted from
// WebsiteExamplesContent.tsx so every "website examples" section on the
// site can embed the same real, interactive showcase — a hover-reveal
// card that opens a real client site in a full-screen iframe, with a
// fallback for sites that block embedding — instead of a static mockup.

import Link from 'next/link'
import Image from 'next/image'
import { routes } from '@/lib/routes'
import type { ExampleSite } from '@/lib/examples-data'

export default function PortfolioShowcase({ items, modalIndex, setModalIndex }: {
  items: ExampleSite[]
  modalIndex: number
  setModalIndex: (i: number) => void
}) {
  const modalItem = modalIndex >= 0 ? items[modalIndex] : null
  const modalUrl = modalItem ? `https://${modalItem.domain}` : ''

  return (
    <>
      {/* A rail on a phone, a grid above it. Stacked one-per-row, the
          examples ran to 21,000px — twenty-five phone screens of cards
          that are all the same shape, which nobody scrolls to the end of.
          Swiping sideways through them is both shorter and closer to how
          you would actually compare them. */}
      <div className="portfolio-grid">
        {items.map((ex, i) => (
          <div key={ex.name} className="mx-card" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', background: ex.tint, border: '1px solid rgba(var(--ink-inverse-rgb), 0.85)', boxShadow: '0 18px 44px rgba(var(--scrim-rgb), 0.1)' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'relative', aspectRatio: '16 / 10', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', background: 'rgba(var(--shadow-rgb), 0.28)' }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 11, letterSpacing: '1px', color: 'rgba(var(--ink-inverse-rgb), 0.94)', whiteSpace: 'nowrap' }}>{ex.brand}</span>
                  <span style={{ display: 'flex', gap: 12, margin: '0 auto' }}>
                    {ex.nav.map((n) => (
                      <span key={n} style={{ fontSize: 8.5, fontWeight: 600, color: 'rgba(var(--ink-inverse-rgb), 0.68)', whiteSpace: 'nowrap' }}>{n}</span>
                    ))}
                  </span>
                  <span style={{ flex: '0 0 auto', padding: '5px 11px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 8, color: ex.ctaInk, background: ex.ctaBg, whiteSpace: 'nowrap' }}>{ex.cta}</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 9, padding: '22px 26px 26px', minHeight: 0 }}>
                  <span className="mx-hero-line" style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(20px, 2.4vw, 28px)', lineHeight: 1.04, letterSpacing: '-0.9px', color: 'var(--ink-inverse)', textShadow: '0 2px 14px rgba(var(--shadow-rgb), 0.4)' }}>{ex.heroLine}</span>
                  <span style={{ maxWidth: '26em', fontSize: 11, lineHeight: 1.6, color: 'rgba(var(--ink-inverse-rgb), 0.8)' }}>{ex.heroBlurb}</span>
                </div>
              </div>

              <div className="mx-overlay" style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', background: 'rgba(var(--scrim-rgb), 0.62)', backdropFilter: 'blur(2px)' }}>
                <button type="button" onClick={() => setModalIndex(i)} className="mx-see-full" style={{ all: 'unset', cursor: 'pointer', padding: '13px 22px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13.5, color: 'var(--ink-inverse)', borderBottom: '2px solid rgba(var(--ink-inverse-rgb), 0.8)' }}>See Full Example</button>
                <Link href={routes.pricing} className="mx-get-site">Get A Site Like This</Link>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 18px', background: 'rgba(var(--surface-rgb), 0.72)', backdropFilter: 'blur(20px)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginRight: 'auto', minWidth: 0 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, letterSpacing: '-0.2px', color: 'var(--ink-1)' }}>{ex.name}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{ex.category} · {ex.domain}</span>
              </div>
              <span style={{ flex: '0 0 auto', fontSize: 11.5, fontWeight: 600, padding: '6px 12px', borderRadius: 999, color: 'var(--ink-on-butter-alt)', background: 'var(--butter)', whiteSpace: 'nowrap' }}>{ex.result}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal — real client site in an iframe, with a fallback for sites that block embedding */}
      {modalItem && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', flexDirection: 'column', padding: 'clamp(12px, 3vw, 34px)', background: 'rgba(2,10,18,0.86)', backdropFilter: 'blur(8px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 4px 12px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', borderRadius: 999, background: 'rgba(var(--surface-rgb), 0.09)', border: '1px solid rgba(var(--ink-inverse-rgb), 0.16)', backdropFilter: 'blur(18px)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--moss-light)' }} />
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--ink-inverse)' }}>{modalItem.name}</span>
              <span style={{ fontSize: 12, color: 'rgba(var(--ink-on-dark-rgb), 0.55)' }}>{modalItem.domain}</span>
            </span>
            {modalItem.proofImage && (
              <div style={{ position: 'relative', width: 132, height: 86, flex: '0 0 auto', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(var(--ink-inverse-rgb), 0.2)' }} title="Real Google listing for this client">
                <Image src={modalItem.proofImage.src} alt={modalItem.proofImage.alt} title={`${modalItem.name} — proof of results`} fill sizes="132px" style={{ objectFit: 'cover' }} />
              </div>
            )}
            <Link href={routes.pricing} className="mx-get-site" style={{ marginLeft: 'auto' }}>Get A Website Like This</Link>
            <button type="button" onClick={() => setModalIndex(-1)} title="Close" style={{ all: 'unset', cursor: 'pointer', width: 40, height: 40, flex: '0 0 auto', borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'rgba(var(--surface-rgb), 0.12)', border: '1px solid rgba(var(--ink-inverse-rgb), 0.22)' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--ink-inverse)" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>
          <div style={{ flex: 1, minHeight: 0, position: 'relative', borderRadius: 16, overflow: 'hidden', background: modalItem.tint, border: '1px solid rgba(var(--ink-inverse-rgb), 0.18)', boxShadow: '0 40px 90px rgba(var(--shadow-rgb), 0.5)' }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 34, textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 34px)', letterSpacing: '-1px', color: 'var(--ink-inverse)' }}>{modalItem.name}</span>
              <span style={{ maxWidth: '30em', fontSize: 14, lineHeight: 1.6, color: 'rgba(var(--ink-inverse-rgb), 0.78)' }}>If the live site doesn&rsquo;t appear, it blocks being embedded — open it in a new tab instead.</span>
              <a href={modalUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Open {modalItem.domain} in a new tab</a>
            </div>
            <iframe src={modalUrl} title={modalItem.name} loading="lazy" style={{ position: 'relative', zIndex: 1, display: 'block', width: '100%', height: '100%', border: 0 }} />
          </div>
        </div>
      )}
    </>
  )
}
