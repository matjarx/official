'use client'

// Editor Showcase Mobile — from Editor Showcase Mobile.dc.html. The 390px
// counterpart to EditorShowcase: no side panels (the section library/
// inspector are replaced by the Add/Layers/Edit bottom tab row), nothing
// absolutely positioned over the canvas (two compact controls sit in
// normal flow below it instead), and only a 3-tile thumbnail strip.

import { useState } from 'react'
import Image from 'next/image'

const EE = ['/showcase/ee-hanger.jpeg', '/showcase/ee-paisley.jpeg', '/showcase/ee-purple.jpeg']
const EE_POS = ['50% 38%', '50% 45%', '50% 40%']
const SCB = ['/showcase/scb-hero.jpg', '/showcase/scb-shelf.jpeg', '/showcase/scb-croissants.jpeg']
const SCB_POS = ['50% 48%', '50% 55%', '50% 45%']

const EE_SCRIMS = [
  'linear-gradient(180deg, rgba(24,2,8,0.62) 0%, rgba(30,4,12,0.86) 100%)',
  'linear-gradient(180deg, rgba(12,6,20,0.64) 0%, rgba(20,10,30,0.88) 100%)',
  'linear-gradient(180deg, rgba(24,4,26,0.64) 0%, rgba(48,10,52,0.88) 100%)',
]
const SCB_SCRIMS = [
  'linear-gradient(180deg, rgba(253,246,234,0.72) 0%, rgba(253,246,234,0.94) 100%)',
  'linear-gradient(180deg, rgba(253,246,234,0.74) 0%, rgba(253,246,234,0.95) 100%)',
  'linear-gradient(180deg, rgba(253,246,234,0.72) 0%, rgba(253,246,234,0.94) 100%)',
]

const TABS = [
  { label: 'Add', icon: 'M12 5v14M5 12h14', on: false },
  { label: 'Layers', icon: 'M12 3.5 4 7.5l8 4 8-4ZM4 12l8 4 8-4M4 16.5l8 4 8-4', on: false },
  { label: 'Edit', icon: 'M5 7h9M18 7h1M5 12h4M13 12h6M5 17h11M20 17h.01M14 4.5v5M9 9.5v5M16 14.5v5', on: true },
].map((t) => ({
  label: t.label,
  icon: t.icon,
  bg: t.on ? 'rgba(244,242,174,0.14)' : 'rgba(255,255,255,0.06)',
  line: t.on ? 'rgba(244,242,174,0.34)' : 'rgba(255,255,255,0.11)',
  ink: t.on ? '#F4F2AE' : 'rgba(226,236,245,0.6)',
  weight: t.on ? 2.1 : 1.75,
}))

export default function EditorShowcaseMobile({ statusInk = 'rgba(226,236,245,0.6)' }: { statusInk?: string }) {
  const [mode, setMode] = useState<'product' | 'service'>('product')
  const [img, setImg] = useState(0)
  const isProduct = mode === 'product'

  function toggleMode() {
    setMode(isProduct ? 'service' : 'product')
    setImg(0)
  }
  function cycleImage() {
    setImg((v) => (v + 1) % 3)
  }

  const thumbSrc = isProduct
    ? ['/showcase/ee-hanger.jpeg', '/showcase/ee-paisley.jpeg', '/showcase/ee-purple.jpeg', '/showcase/ee-chikankari.jpeg', '/showcase/ee-necklines.jpeg', '/showcase/ee-blockprint.jpeg']
    : ['/showcase/scb-hero.jpg', '/showcase/scb-shelf.jpeg', '/showcase/scb-croissants.jpeg', '/showcase/scb-cookies.jpg', '/showcase/scb-baguettes.webp', '/showcase/scb-muffins.jpeg']
  const stripSrc = isProduct
    ? ['/showcase/ee-chikankari.jpeg', '/showcase/ee-necklines.jpeg', '/showcase/ee-blockprint.jpeg']
    : ['/showcase/scb-croissants.jpeg', '/showcase/scb-cookies.jpg', '/showcase/scb-muffins.jpeg']

  const siteName = isProduct ? 'Elegance Embroidery' : 'Sweet Crumbs Bakery'
  const domain = isProduct ? 'eleganceembroidery.pk' : 'sweetcrumbs.pk'
  const brandMark = isProduct ? 'ELEGANCE' : 'SWEET CRUMBS'
  const navBg = isProduct ? 'rgba(12,4,10,0.92)' : '#FFFCF5'
  const navLine = isProduct ? 'rgba(255,255,255,0.12)' : 'rgba(42,22,8,0.12)'
  const navInk = isProduct ? '#FFFFFF' : '#2A1608'
  const navCta = isProduct ? 'Order Now' : 'Book Now'
  const navCtaBg = isProduct ? 'linear-gradient(160deg, #F7F5C0, #E7E49B)' : '#6B4A22'
  const navCtaInk = isProduct ? '#14210b' : '#FFFFFF'

  const heroImg = isProduct ? EE[img] : SCB[img]
  const heroPos = isProduct ? EE_POS[img] : SCB_POS[img]
  const heroScrim = isProduct ? EE_SCRIMS[img] : SCB_SCRIMS[img]
  const heroBase = isProduct ? '#180208' : '#FFFCF5'

  const kicker = isProduct ? 'New winter collection' : 'Baked fresh, every morning'
  const kickerInk = isProduct ? '#F4F2AE' : '#A87A3A'
  const headline = isProduct ? 'Hand-stitched, made to be seen.' : 'Baked Fresh, Every Morning.'
  const headInk = isProduct ? '#FFFFFF' : '#2A1608'
  const blurb = isProduct ? 'Chikankari and ajrak work, delivered nationwide.' : 'Order online for pickup, or reserve your table.'
  const bodyInk = isProduct ? 'rgba(255,255,255,0.82)' : '#6B5340'
  const ctaBg = isProduct ? 'linear-gradient(160deg, #F7F5C0, #E7E49B)' : 'linear-gradient(160deg, #7C5628, #5A3C18)'
  const ctaInk = isProduct ? '#14210b' : '#FFFFFF'

  const modeIconLabel = isProduct ? 'Book Now!' : 'Sell Products'
  const modeIcon = isProduct
    ? 'M5 6h14v14H5zM5 11h14M9 3.5v4M15 3.5v4M9 15h2'
    : 'M3.5 6h2.4l2.5 9.6h9.4L20 8.4H7M10 20a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Zm7.2 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Z'

  const mediaThumbs = thumbSrc.map((src, k) => ({
    src,
    opacity: k === img ? 1 : 0.6,
    ring: k === img ? '2px solid #37B6F0' : '1px solid rgba(255,255,255,0.12)',
  }))

  const statusLine = isProduct ? 'Store on — the buttons read Order Now' : 'Bookings on — the buttons read Book Now'

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif' }}>
      <div style={{ width: '100%', borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(168deg, #001C33 0%, #00263F 100%)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 20px 46px rgba(0,8,18,0.44)' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 10px' }}>
          <span style={{ width: 26, height: 26, flex: '0 0 auto', borderRadius: 8, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)' }}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#E9EFF5" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M5 12l6-6M5 12l6 6" /></svg>
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0, marginRight: 'auto' }}>
            <span style={{ fontSize: 7.5, letterSpacing: 1.1, textTransform: 'uppercase', color: 'rgba(226,236,245,0.42)' }}>Theme editor</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, minWidth: 0 }}>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 10.5, color: '#F7FAFD', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{siteName}</span>
              <span style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 3, padding: '2px 6px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span style={{ fontSize: 7.5, fontWeight: 600, color: 'rgba(233,239,245,0.8)' }}>Home</span>
                <svg viewBox="0 0 24 24" width="7" height="7" fill="none" stroke="rgba(226,236,245,0.55)" strokeWidth="2.6" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg>
              </span>
            </span>
          </span>
          <span style={{ width: 26, height: 26, flex: '0 0 auto', borderRadius: 8, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)' }}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#E9EFF5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.8" /></svg>
          </span>
          <span style={{ flex: '0 0 auto', padding: '7px 12px', borderRadius: 8, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 10, color: '#14210b', background: 'linear-gradient(160deg, #F7F5C0, #E7E49B)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' }}>Publish</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px 8px' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C6CB8A' }} />
          <span style={{ fontSize: 8.5, color: 'rgba(226,236,245,0.42)', marginRight: 'auto' }}>Saved just now</span>
          <span style={{ fontSize: 8.5, color: 'rgba(226,236,245,0.3)' }}>v2.4 draft</span>
        </div>

        <div style={{ padding: '0 6px' }}>
          <div style={{ borderRadius: 10, overflow: 'hidden', background: '#FFFCF5', boxShadow: '0 14px 32px rgba(0,8,18,0.38)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 9px', background: '#0B1B27' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.16)' }} />
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.16)' }} />
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.16)' }} />
              <span style={{ margin: '0 auto', padding: '3px 10px', borderRadius: 999, fontSize: 8, color: 'rgba(226,236,245,0.6)', background: 'rgba(255,255,255,0.07)' }}>{domain}</span>
            </div>

            <div style={{ position: 'relative', outline: '2px solid #F4F2AE', outlineOffset: -2 }}>
              <span style={{ position: 'absolute', top: 0, left: 0, zIndex: 8, padding: '2px 8px', borderRadius: '0 0 6px 0', background: '#E7E49B', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 7.5, letterSpacing: 0.5, textTransform: 'uppercase', color: '#14210b' }}>Hero</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', background: navBg, borderBottom: `1px solid ${navLine}` }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 8.5, letterSpacing: 1, lineHeight: 1.1, color: navInk, whiteSpace: 'nowrap', marginRight: 'auto' }}>{brandMark}</span>
                <span style={{ flex: '0 0 auto', padding: '5px 11px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 7.5, color: navCtaInk, background: navCtaBg, whiteSpace: 'nowrap' }}>{navCta}</span>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke={navInk} strokeWidth="2" strokeLinecap="round" style={{ flex: '0 0 auto' }}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              </div>

              <div style={{ position: 'relative', minHeight: 210, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '26px 18px 30px', textAlign: 'center', overflow: 'hidden', background: heroBase }}>
                <Image src={heroImg} alt="" fill sizes="360px" priority style={{ objectFit: 'cover', objectPosition: heroPos, zIndex: 0 }} />
                <span style={{ position: 'absolute', inset: 0, zIndex: 1, background: heroScrim }} />
                <span style={{ position: 'relative', zIndex: 2, fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: kickerInk, fontWeight: 600 }}>{kicker}</span>
                <span style={{ position: 'relative', zIndex: 2, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 21, lineHeight: 1.06, letterSpacing: '-0.8px', color: headInk }}>{headline}</span>
                <span style={{ position: 'relative', zIndex: 2, maxWidth: '22em', fontSize: 9.5, lineHeight: 1.6, color: bodyInk }}>{blurb}</span>
                <span style={{ position: 'relative', zIndex: 2, marginTop: 6, padding: '9px 20px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 10, color: ctaInk, background: ctaBg, boxShadow: '0 6px 16px rgba(0,0,0,0.24)' }}>{navCta}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, padding: '10px 12px 12px', background: '#FFFCF5' }}>
              {stripSrc.map((s, i) => (
                <span key={i} style={{ height: 42, borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                  <Image src={s} alt="" fill sizes="120px" style={{ objectFit: 'cover' }} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 6px 0' }}>
          <button type="button" onClick={toggleMode} title="Tap to switch the business type" className="showcase-overlay-2" style={{ all: 'unset', cursor: 'pointer', padding: 4, borderRadius: 8, border: '1.5px solid #37B6F0' }}>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7, minHeight: 76, padding: '12px 8px', borderRadius: 4, background: '#1C1C1C' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d={modeIcon} /></svg>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 9, letterSpacing: 0.8, textTransform: 'uppercase', color: '#FFFFFF', textAlign: 'center', whiteSpace: 'nowrap' }}>{modeIconLabel}</span>
            </span>
          </button>

          <button type="button" onClick={cycleImage} title="Tap to change the banner image" className="showcase-overlay-2" style={{ all: 'unset', cursor: 'pointer', padding: 4, borderRadius: 8, border: '1.5px solid #37B6F0' }}>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7, minHeight: 76, padding: '10px 8px', borderRadius: 4, background: '#1C1C1C' }}>
              <span style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, width: '100%', maxWidth: 84 }}>
                {mediaThumbs.map((m, i) => (
                  <span key={i} style={{ display: 'block', width: '100%', height: 16, position: 'relative', borderRadius: 2, overflow: 'hidden', outline: m.ring, outlineOffset: -1, opacity: m.opacity }}>
                    <Image src={m.src} alt="" fill sizes="30px" style={{ objectFit: 'cover' }} />
                  </span>
                ))}
              </span>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 9, letterSpacing: 0.8, textTransform: 'uppercase', color: '#FFFFFF', textAlign: 'center', whiteSpace: 'nowrap' }}>Change Image</span>
            </span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 6px', marginTop: 8, borderTop: '1px solid rgba(255,255,255,0.09)' }}>
          {TABS.map((t) => (
            <span key={t.label} style={{ flex: 1, minHeight: 44, borderRadius: 11, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, background: t.bg, border: `1px solid ${t.line}` }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={t.ink} strokeWidth={t.weight} strokeLinecap="round" strokeLinejoin="round"><path d={t.icon} /></svg>
              <span style={{ fontSize: 8.5, fontWeight: 600, color: t.ink }}>{t.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#F4F2AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d="m7 4 11 8-11 8z" /></svg>
        <span style={{ fontSize: 11, lineHeight: 1.5, textAlign: 'center', color: statusInk }}>{statusLine}</span>
      </div>
    </div>
  )
}
