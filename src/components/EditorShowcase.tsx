'use client'

// Editor Showcase — from Editor Showcase.dc.html. An interactive mockup of
// the full MatjarX theme editor shell (top bar, section library, canvas,
// structure tree + inspector), with three overlay controls that switch the
// whole mockup between product and service business types. Centerpiece of
// the Home and Features pages.
//
// Positioning of the three overlay buttons is load-bearing per the
// handoff: they sit in the sidebar gutter and over the thumbnail strip,
// never over the hero copy or the section library. Do not move them.

import { useState } from 'react'
import Image from 'next/image'

const ICONS = {
  hero: 'M4 5.5h16v6H4zM4 15h9M4 18.5h6',
  content: 'M4 5.5h7v13H4zM14 7h6M14 11h6M14 15h4',
  grid: 'M4 4.5h6.5v6.5H4zM13.5 4.5H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z',
  quote: 'M9 7.5C6.5 8.5 5 10.5 5 13v3.5h4.5V11H7.5c0-1 .6-2 1.5-2.4ZM18 7.5c-2.5 1-4 3-4 5.5v3.5h4.5V11H16.5c0-1 .6-2 1.5-2.4Z',
  faq: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1 1-1.1 1.8M12 16.8h.01',
  menu: 'M4 6h16M4 12h10M4 18h13',
  form: 'M4 5.5h16v13H4zM8 9.5h8M8 13h5',
  gallery: 'M4 5.5h16v13H4zM8.3 10.6a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM4 16.2l4.6-4.2 4.4 3.9 2.6-2.4L20 17',
  blog: 'M5 4.5h14v15H5zM5 16h14M8.5 8h7M8.5 11.5h5',
  header: 'M4 5.5h16v4H4zM4 12h9M4 16h6',
  footer: 'M4 14.5h16v4H4zM4 6h9M4 10h6',
}

const EE = ['/showcase/ee-hanger.jpeg', '/showcase/ee-paisley.jpeg', '/showcase/ee-purple.jpeg']
const EE_POS = ['50% 38%', '50% 45%', '50% 40%']
const EE_INLINE = ['/showcase/ee-chikankari.jpeg', '/showcase/ee-necklines.jpeg', '/showcase/ee-gold-paisley.jpeg']
const EE_NAMES = ['hero-chikankari.jpg', 'hero-paisley.jpg', 'hero-purple.jpg']

const SCB = ['/showcase/scb-hero.jpg', '/showcase/scb-shelf.jpeg', '/showcase/scb-croissants.jpeg']
const SCB_POS = ['50% 48%', '50% 55%', '50% 45%']
const SCB_INLINE = ['/showcase/scb-croissants.jpeg', '/showcase/scb-cookies.jpg', '/showcase/scb-baguettes.webp']
const SCB_NAMES = ['hero-bread.jpg', 'hero-shelf.jpg', 'hero-croissants.jpg']

const EE_SCRIMS = [
  'linear-gradient(100deg, rgba(24,2,8,0.86) 0%, rgba(30,4,12,0.6) 52%, rgba(30,4,12,0.32) 100%)',
  'linear-gradient(100deg, rgba(12,6,20,0.88) 0%, rgba(20,10,30,0.62) 52%, rgba(20,10,30,0.32) 100%)',
  'linear-gradient(100deg, rgba(24,4,26,0.88) 0%, rgba(48,10,52,0.6) 52%, rgba(48,10,52,0.32) 100%)',
]
const SCB_SCRIMS = [
  'linear-gradient(100deg, rgba(253,246,234,0.94) 0%, rgba(253,246,234,0.7) 46%, rgba(253,246,234,0.2) 100%)',
  'linear-gradient(100deg, rgba(253,246,234,0.95) 0%, rgba(253,246,234,0.72) 46%, rgba(253,246,234,0.22) 100%)',
  'linear-gradient(100deg, rgba(253,246,234,0.94) 0%, rgba(253,246,234,0.7) 46%, rgba(253,246,234,0.2) 100%)',
]

const SHOP_ITEMS = [
  { name: 'Chikankari 3-piece — red', price: 'Rs. 6,400', img: '/showcase/ee-hanger.jpeg' },
  { name: 'Kashmiri paisley shawl', price: 'Rs. 12,800', img: '/showcase/ee-paisley.jpeg' },
  { name: 'Purple diamond dupatta', price: 'Rs. 5,200', img: '/showcase/ee-purple.jpeg' },
]

const TOP_ICONS = [
  { icon: 'M9 14 4 9l5-5M4 9h9a6 6 0 0 1 0 12h-2', opacity: 1 },
  { icon: 'm15 14 5-5-5-5M20 9h-9a6 6 0 0 0 0 12h2', opacity: 0.4 },
]
const DEVICES = [
  { icon: 'M3.5 5.5h17v10h-17zM9 19h6M12 15.5V19', bg: 'linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.07))', ink: '#F7FAFD' },
  { icon: 'M7 3.5h10v17H7zM11 18h2', bg: 'transparent', ink: 'rgba(226,236,245,0.55)' },
  { icon: 'M8.5 3.5h7v17h-7zM11.5 18h1', bg: 'transparent', ink: 'rgba(226,236,245,0.55)' },
]
const TOOLS = [
  { icon: 'M12 19V5M12 5l-5 5M12 5l5 5', ink: 'rgba(233,239,245,0.8)' },
  { icon: 'M12 5v14M12 19l-5-5M12 19l5-5', ink: 'rgba(233,239,245,0.8)' },
  { icon: 'M9 9h11v11H9zM15 5H4v11', ink: 'rgba(233,239,245,0.8)' },
  { icon: 'm9 8-4 4 4 4M15 8l4 4-4 4', ink: '#F4F2AE' },
  { icon: 'M5 7h14M9 7V4.5h6V7M7 7l1 13h8l1-13', ink: '#E58A6B' },
]
const ALIGN_OPTIONS = [
  { label: 'Left', bg: 'transparent', ink: 'rgba(226,236,245,0.6)' },
  { label: 'Center', bg: 'linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.07))', ink: '#F7FAFD' },
  { label: 'Right', bg: 'transparent', ink: 'rgba(226,236,245,0.6)' },
]
const SWATCHES = [
  { fill: 'radial-gradient(120% 100% at 50% 0%, #4A2A12 0%, #1C0F05 100%)', ring: '2px #F4F2AE' },
  { fill: 'linear-gradient(165deg, #FFFCF5, #F0E2CC)', ring: '1px rgba(255,255,255,0.14)' },
  { fill: 'linear-gradient(165deg, #0A3A63, #001C33)', ring: '1px rgba(255,255,255,0.14)' },
  { fill: 'linear-gradient(165deg, #8E9455, #5A5E2A)', ring: '1px rgba(255,255,255,0.14)' },
]
const LIBRARY_GROUPS = [
  { title: 'Structure', items: [
    { name: 'Hero', hint: 'Full-width banner with a call to action', icon: ICONS.hero },
    { name: 'Content block', hint: 'Image beside text', icon: ICONS.content },
    { name: 'Testimonials', hint: 'Quotes, or live Google reviews', icon: ICONS.quote },
    { name: 'FAQ', hint: 'Expandable question list', icon: ICONS.faq },
  ] },
  { title: 'Commerce', items: [
    { name: 'Product grid', hint: 'Shoppable cards with prices', icon: ICONS.grid },
    { name: 'Menu', hint: 'Priced list for food and services', icon: ICONS.menu },
    { name: 'Booking form', hint: 'Table, appointment or consultation', icon: ICONS.form },
  ] },
  { title: 'Content & media', items: [
    { name: 'Gallery', hint: 'Photo grid, slider or lightbox', icon: ICONS.gallery },
    { name: 'Blog grid', hint: 'Latest posts, auto-updating', icon: ICONS.blog },
  ] },
]

function layerRow(label: string, icon: string, on: boolean, badge = '', custom = false) {
  return {
    label, icon, badge, custom,
    bg: on ? 'rgba(244,242,174,0.13)' : 'transparent',
    rail: on ? '#F4F2AE' : 'rgba(255,255,255,0.1)',
    ink: on ? '#F7FAFD' : 'rgba(226,236,245,0.68)',
    iconInk: on ? '#F4F2AE' : 'rgba(226,236,245,0.46)',
    weight: on ? 600 : 400,
  }
}

export default function EditorShowcase({ statusInk = 'rgba(226,236,245,0.6)' }: { statusInk?: string }) {
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
    ? ['/showcase/ee-chikankari.jpeg', '/showcase/ee-necklines.jpeg', '/showcase/ee-blockprint.jpeg', '/showcase/ee-quilt.jpeg']
    : ['/showcase/scb-croissants.jpeg', '/showcase/scb-cookies.jpg', '/showcase/scb-muffins.jpeg', '/showcase/scb-patties.jpeg']

  const domain = isProduct ? 'eleganceembroidery.pk' : 'sweetcrumbs.pk'
  const siteName = isProduct ? 'Elegance Embroidery' : 'Sweet Crumbs Bakery'
  const brandMark = isProduct ? 'ELEGANCE' : 'SWEET CRUMBS'
  const navLinks = isProduct ? ['Shop', 'Collections', 'Fabric guide', 'Contact'] : ['Menu', 'Our bakery', 'Catering', 'Contact']
  const navInk = isProduct ? 'rgba(255,255,255,0.78)' : '#4A3520'
  const navBg = isProduct ? 'rgba(12,4,10,0.92)' : '#FFFCF5'
  const navLine = isProduct ? 'rgba(255,255,255,0.12)' : 'rgba(42,22,8,0.12)'
  const navHeadInk = isProduct ? '#FFFFFF' : '#2A1608'
  const navCta = isProduct ? 'Order Now' : 'Book Now'
  const navCtaBg = isProduct ? 'linear-gradient(160deg, #F7F5C0, #E7E49B)' : '#6B4A22'
  const navCtaInk = isProduct ? '#14210b' : '#FFFFFF'

  const heroImg = isProduct ? EE[img] : SCB[img]
  const heroPos = isProduct ? EE_POS[img] : SCB_POS[img]
  const heroScrim = isProduct ? EE_SCRIMS[img] : SCB_SCRIMS[img]
  const heroBase = isProduct ? '#180208' : '#FFFCF5'
  const inlineImg = isProduct ? EE_INLINE[img] : SCB_INLINE[img]
  const bgFileName = isProduct ? EE_NAMES[img] : SCB_NAMES[img]

  const kicker = isProduct ? 'New winter collection' : 'Baked fresh, every morning'
  const kickerInk = isProduct ? '#F4F2AE' : '#A87A3A'
  const headline = isProduct ? 'Hand-stitched, made to be seen.' : 'Baked Fresh, Every Morning.'
  const headInk = isProduct ? '#FFFFFF' : '#2A1608'
  const blurb = isProduct
    ? 'Chikankari, ralli and ajrak work — delivered nationwide with cash on delivery.'
    : 'Order online for pickup, or reserve your table for the weekend.'
  const bodyInk = isProduct ? 'rgba(255,255,255,0.82)' : '#6B5340'

  const ctaBg = isProduct ? 'linear-gradient(160deg, #F7F5C0, #E7E49B)' : 'linear-gradient(160deg, #7C5628, #5A3C18)'
  const ctaInk = isProduct ? '#14210b' : '#FFFFFF'
  const ctaGhost = isProduct ? 'View collection' : 'See the menu'
  const ghostBg = isProduct ? 'rgba(255,255,255,0.12)' : 'rgba(42,22,8,0.06)'
  const ghostLine = isProduct ? 'rgba(255,255,255,0.3)' : 'rgba(42,22,8,0.22)'
  const ghostInk = isProduct ? '#FFFFFF' : '#4A3520'

  const modeIconLabel = isProduct ? 'Book Now!' : 'Sell Products'
  const modeIcon = isProduct
    ? 'M5 6h14v14H5zM5 11h14M9 3.5v4M15 3.5v4M9 15h2'
    : 'M3.5 6h2.4l2.5 9.6h9.4L20 8.4H7M10 20a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Zm7.2 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Z'

  const panelLabel = isProduct ? 'Shop products' : 'Reserve your spot'
  const panelLabelInk = isProduct ? '#C6CB8A' : '#6B4A22'
  const bookingBg = isProduct ? '#0B1B27' : '#FFFFFF'
  const shopItem = SHOP_ITEMS[img]

  const mediaThumbs = thumbSrc.map((src, k) => ({
    src,
    opacity: k === img ? 1 : 0.6,
    ring: k === img ? '2px solid #37B6F0' : '1px solid rgba(255,255,255,0.12)',
  }))

  const layerGroups = [
    { title: 'Site-wide', note: 'every page', rows: [layerRow('Header', ICONS.header, false), layerRow('Footer', ICONS.footer, false)] },
    { title: 'Home page', note: '5 sections', rows: [
      layerRow('Hero', ICONS.hero, true, '', true),
      layerRow('Content block', ICONS.content, false),
      layerRow(isProduct ? 'Product grid' : 'Booking form', isProduct ? ICONS.grid : ICONS.form, false, isProduct ? '4 items' : ''),
      layerRow('Testimonials', ICONS.quote, false),
    ] },
  ]

  const statusLine = isProduct
    ? 'Store switched on — the buttons read Order Now'
    : 'Bookings switched on — the buttons read Book Now'

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif' }}>
      <div style={{ borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(168deg, #001C33 0%, #00263F 100%)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 30px 66px rgba(0,8,18,0.44)' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', borderBottom: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 12px 6px 9px', borderRadius: 9, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', flex: '0 0 auto' }}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#E9EFF5" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M5 12l6-6M5 12l6 6" /></svg>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#E9EFF5' }}>Exit</span>
          </span>
          <span style={{ width: 1, height: 20, flex: '0 0 auto', background: 'rgba(255,255,255,0.12)' }} />
          <Image src="/brand/matjarx-mark-light.png" alt="" width={18} height={18} style={{ flex: '0 0 auto', objectFit: 'contain' }} />
          <span style={{ fontSize: 11.5, color: 'rgba(226,236,245,0.5)', whiteSpace: 'nowrap' }}>Theme editor</span>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="rgba(226,236,245,0.34)" strokeWidth="2.2" strokeLinecap="round" style={{ flex: '0 0 auto' }}><path d="m9 6 6 6-6 6" /></svg>
          <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 12.5, color: '#F2F6FA', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{siteName}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.13)', flex: '0 0 auto' }}>
            <span style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(233,239,245,0.82)' }}>Home</span>
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="rgba(226,236,245,0.55)" strokeWidth="2.4" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg>
          </span>

          <span style={{ display: 'flex', gap: 4, marginLeft: 4, flex: '0 0 auto' }}>
            {TOP_ICONS.map((t, i) => (
              <span key={i} style={{ width: 26, height: 26, borderRadius: 7, display: 'grid', placeItems: 'center', opacity: t.opacity }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="rgba(226,236,245,0.8)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={t.icon} /></svg>
              </span>
            ))}
          </span>

          <span style={{ display: 'flex', gap: 3, margin: '0 auto', padding: 3, borderRadius: 9, background: 'rgba(0,17,32,0.42)', border: '1px solid rgba(255,255,255,0.09)', flex: '0 0 auto' }}>
            {DEVICES.map((d, i) => (
              <span key={i} style={{ width: 32, height: 23, borderRadius: 6, display: 'grid', placeItems: 'center', background: d.bg }}>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke={d.ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d.icon} /></svg>
              </span>
            ))}
          </span>

          <span style={{ display: 'flex', alignItems: 'center', gap: 2, padding: 3, borderRadius: 9, background: 'rgba(0,17,32,0.42)', border: '1px solid rgba(255,255,255,0.09)', flex: '0 0 auto' }}>
            <span style={{ width: 24, height: 22, borderRadius: 6, display: 'grid', placeItems: 'center' }}>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="rgba(226,236,245,0.75)" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14" /></svg>
            </span>
            <span style={{ minWidth: 38, textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 11, color: '#E9EFF5' }}>100%</span>
            <span style={{ width: 24, height: 22, borderRadius: 6, display: 'grid', placeItems: 'center' }}>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="rgba(226,236,245,0.75)" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </span>
          </span>

          <span style={{ display: 'flex', alignItems: 'center', gap: 6, flex: '0 0 auto' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C6CB8A' }} />
            <span style={{ fontSize: 10.5, color: 'rgba(226,236,245,0.45)', whiteSpace: 'nowrap' }}>Saved just now</span>
          </span>
          <span style={{ flex: '0 0 auto', padding: '7px 13px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#E9EFF5', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', whiteSpace: 'nowrap' }}>Preview</span>
          <span style={{ flex: '0 0 auto', padding: '7px 14px', borderRadius: 8, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 11.5, color: '#14210b', background: 'linear-gradient(160deg, #F7F5C0, #E7E49B)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>Publish</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '186px minmax(0, 1fr) 216px' }}>

          {/* Left panel — section library */}
          <div style={{ padding: '12px 10px', borderRight: '1px solid rgba(255,255,255,0.09)', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 4, padding: 3, borderRadius: 9, background: 'rgba(0,17,32,0.42)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <span style={{ flex: 1, textAlign: 'center', padding: '6px 4px', borderRadius: 7, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 10.5, color: '#F7FAFD', background: 'linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.07))' }}>Sections</span>
              <span style={{ flex: 1, textAlign: 'center', padding: '6px 4px', borderRadius: 7, fontSize: 10.5, color: 'rgba(226,236,245,0.55)' }}>Globals</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 10px', borderRadius: 9, background: 'rgba(0,17,32,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="rgba(226,236,245,0.45)" strokeWidth="2" strokeLinecap="round" style={{ flex: '0 0 auto' }}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
              <span style={{ fontSize: 10, color: 'rgba(226,236,245,0.4)' }}>Search sections</span>
            </div>

            {LIBRARY_GROUPS.map((g) => (
              <div key={g.title} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ padding: '4px 4px 5px', fontSize: 8.5, letterSpacing: 1.2, textTransform: 'uppercase', color: 'rgba(226,236,245,0.34)', fontWeight: 600 }}>{g.title}</span>
                {g.items.map((w) => (
                  <span key={w.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 7px', borderRadius: 8 }}>
                    <span style={{ width: 24, height: 24, flex: '0 0 auto', borderRadius: 7, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#C6CB8A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon} /></svg>
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0, marginRight: 'auto' }}>
                      <span style={{ fontSize: 10.5, fontWeight: 600, color: '#EDF3F8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.name}</span>
                      <span style={{ fontSize: 8.5, color: 'rgba(226,236,245,0.42)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.hint}</span>
                    </span>
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="rgba(226,236,245,0.24)" strokeWidth="2" strokeLinecap="round" style={{ flex: '0 0 auto' }}><path d="M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01" /></svg>
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Center — canvas */}
          <div style={{ padding: 14, minWidth: 0 }}>
            <div style={{ borderRadius: 11, overflow: 'hidden', background: '#FFFCF5', boxShadow: '0 18px 42px rgba(0,8,18,0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 11px', background: '#0B1B27' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.16)' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.16)' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.16)' }} />
                <span style={{ margin: '0 auto', padding: '3px 12px', borderRadius: 999, fontSize: 9.5, color: 'rgba(226,236,245,0.6)', background: 'rgba(255,255,255,0.07)' }}>{domain}</span>
                <span style={{ fontSize: 8.5, color: 'rgba(226,236,245,0.38)', flex: '0 0 auto' }}>Desktop 1440</span>
              </div>

              <div style={{ position: 'relative', outline: '2px solid #F4F2AE', outlineOffset: -2 }}>
                <span style={{ position: 'absolute', top: 0, left: 0, zIndex: 8, padding: '3px 10px', borderRadius: '0 0 7px 0', background: '#E7E49B', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 8.5, letterSpacing: 0.5, textTransform: 'uppercase', color: '#14210b' }}>Hero</span>
                <span style={{ position: 'absolute', top: 6, right: 6, zIndex: 8, display: 'flex', gap: 2, padding: 3, borderRadius: 7, background: 'rgba(8,20,32,0.86)', border: '1px solid rgba(255,255,255,0.16)' }}>
                  {TOOLS.map((t, i) => (
                    <span key={i} style={{ width: 19, height: 19, borderRadius: 5, display: 'grid', placeItems: 'center' }}>
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke={t.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={t.icon} /></svg>
                    </span>
                  ))}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 16px', background: navBg, borderBottom: `1px solid ${navLine}` }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 10, letterSpacing: 1.2, lineHeight: 1.1, color: navHeadInk, whiteSpace: 'nowrap' }}>{brandMark}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 auto' }}>
                    {navLinks.map((n) => (
                      <span key={n} style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: 0.4, color: navInk, whiteSpace: 'nowrap' }}>{n}</span>
                    ))}
                  </span>
                  <span style={{ flex: '0 0 auto', padding: '6px 13px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 8.5, letterSpacing: 0.4, color: navCtaInk, background: navCtaBg, whiteSpace: 'nowrap' }}>{navCta}</span>
                </div>

                <div style={{ position: 'relative', minHeight: 226, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', alignItems: 'center', gap: 18, padding: '28px 22px 32px', overflow: 'hidden', background: heroBase }}>
                  <Image src={heroImg} alt="" fill sizes="600px" priority style={{ objectFit: 'cover', objectPosition: heroPos, zIndex: 0 }} />
                  <span style={{ position: 'absolute', inset: 0, zIndex: 1, background: heroScrim }} />

                  <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 9, minWidth: 0 }}>
                    <span style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: kickerInk, fontWeight: 600 }}>{kicker}</span>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 23, lineHeight: 1.05, letterSpacing: '-0.9px', color: headInk }}>{headline}</span>
                    <span style={{ maxWidth: '21em', fontSize: 9.5, lineHeight: 1.6, color: bodyInk }}>{blurb}</span>
                    <span style={{ display: 'flex', gap: 7, flexWrap: 'wrap', paddingTop: 5 }}>
                      <span style={{ padding: '8px 17px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 9.5, color: ctaInk, background: ctaBg, boxShadow: '0 6px 16px rgba(0,0,0,0.2)' }}>{navCta}</span>
                      <span style={{ padding: '8px 15px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 9.5, color: ghostInk, background: ghostBg, border: `1px solid ${ghostLine}` }}>{ctaGhost}</span>
                    </span>
                  </div>

                  <div style={{ position: 'relative', zIndex: 2, minWidth: 0, display: 'flex', justifyContent: 'center' }}>
                    <span style={{ display: 'block', width: '100%', maxWidth: 176, aspectRatio: '1 / 1.04', borderRadius: 10, overflow: 'hidden', boxShadow: '0 14px 34px rgba(0,0,0,0.3)', position: 'relative' }}>
                      <Image src={inlineImg} alt="" fill sizes="176px" priority style={{ objectFit: 'cover', objectPosition: '50% 45%' }} />
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, padding: '12px 16px 16px', background: '#FFFCF5' }}>
                {stripSrc.map((s, i) => (
                  <span key={i} style={{ height: 46, borderRadius: 7, overflow: 'hidden', position: 'relative' }}>
                    <Image src={s} alt="" fill sizes="80px" style={{ objectFit: 'cover' }} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel — structure tree + inspector */}
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.09)', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ padding: '12px 12px 14px', borderBottom: '1px solid rgba(255,255,255,0.09)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 8.5, letterSpacing: 1.2, textTransform: 'uppercase', color: 'rgba(226,236,245,0.34)', fontWeight: 600, marginRight: 'auto' }}>Structure</span>
                <span style={{ fontSize: 8.5, color: 'rgba(226,236,245,0.3)' }}>5 sections</span>
              </div>
              {layerGroups.map((lg) => (
                <div key={lg.title} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '3px 2px' }}>
                    <span style={{ fontSize: 8.5, fontWeight: 600, color: 'rgba(226,236,245,0.5)', marginRight: 'auto' }}>{lg.title}</span>
                    <span style={{ fontSize: 8, color: 'rgba(226,236,245,0.28)' }}>{lg.note}</span>
                  </div>
                  {lg.rows.map((row) => (
                    <span key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 7, marginLeft: 8, padding: '6px 8px', borderRadius: 7, background: row.bg, borderLeft: `2px solid ${row.rail}` }}>
                      <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="rgba(226,236,245,0.22)" strokeWidth="2" strokeLinecap="round" style={{ flex: '0 0 auto' }}><path d="M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01" /></svg>
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke={row.iconInk} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d={row.icon} /></svg>
                      <span style={{ fontSize: 10, fontWeight: row.weight, color: row.ink, marginRight: 'auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.label}</span>
                      {row.badge && <span style={{ fontSize: 8, fontWeight: 600, padding: '3px 6px', borderRadius: 999, color: 'rgba(226,236,245,0.55)', background: 'rgba(255,255,255,0.08)', whiteSpace: 'nowrap', flex: '0 0 auto' }}>{row.badge}</span>}
                      {row.custom && <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#E7E49B" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d="m9 8-4 4 4 4M15 8l4 4-4 4" /></svg>}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 13 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ width: 26, height: 26, flex: '0 0 auto', borderRadius: 8, display: 'grid', placeItems: 'center', background: 'rgba(244,242,174,0.14)', border: '1px solid rgba(244,242,174,0.3)' }}>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#F4F2AE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5h16v6H4zM4 15h9M4 18.5h6" /></svg>
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 11.5, color: '#F2F6FA' }}>Hero</span>
                  <span style={{ fontSize: 8.5, color: 'rgba(226,236,245,0.42)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Section 1 of 5 · custom code</span>
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 8.5, letterSpacing: 1.2, textTransform: 'uppercase', color: 'rgba(226,236,245,0.34)', fontWeight: 600 }}>Layout</span>
                <span style={{ fontSize: 10, color: 'rgba(226,236,245,0.6)' }}>Text alignment</span>
                <div style={{ display: 'flex', gap: 3, padding: 3, borderRadius: 8, background: 'rgba(0,17,32,0.42)', border: '1px solid rgba(255,255,255,0.09)' }}>
                  {ALIGN_OPTIONS.map((a) => (
                    <span key={a.label} style={{ flex: 1, textAlign: 'center', padding: '6px 3px', borderRadius: 6, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 9.5, color: a.ink, background: a.bg }}>{a.label}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, color: 'rgba(226,236,245,0.6)', marginRight: 'auto' }}>Padding</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2, padding: 2, borderRadius: 8, background: 'rgba(0,17,32,0.42)', border: '1px solid rgba(255,255,255,0.09)' }}>
                    <span style={{ width: 20, height: 20, borderRadius: 5, display: 'grid', placeItems: 'center' }}>
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="rgba(226,236,245,0.75)" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14" /></svg>
                    </span>
                    <span style={{ minWidth: 34, textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 10, color: '#E9EFF5' }}>62 px</span>
                    <span style={{ width: 20, height: 20, borderRadius: 5, display: 'grid', placeItems: 'center' }}>
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="rgba(226,236,245,0.75)" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                    </span>
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 8.5, letterSpacing: 1.2, textTransform: 'uppercase', color: 'rgba(226,236,245,0.34)', fontWeight: 600 }}>Background</span>
                <div style={{ display: 'flex', gap: 7 }}>
                  {SWATCHES.map((s, i) => (
                    <span key={i} style={{ flex: 1, height: 26, borderRadius: 8, background: s.fill, boxShadow: `0 0 0 ${s.ring}` }} />
                  ))}
                </div>
                <span style={{ fontSize: 10, color: 'rgba(226,236,245,0.6)' }}>Background image</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 9px', borderRadius: 9, background: 'rgba(0,17,32,0.35)', border: '1px dashed rgba(255,255,255,0.22)' }}>
                  <span style={{ width: 26, height: 26, flex: '0 0 auto', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                    <Image src={heroImg} alt="" fill sizes="26px" style={{ objectFit: 'cover' }} />
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 9.5, fontWeight: 600, color: '#EDF3F8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{bgFileName}</span>
                    <span style={{ fontSize: 8, color: 'rgba(226,236,245,0.42)' }}>Click to replace</span>
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 1, marginRight: 'auto', minWidth: 0 }}>
                  <span style={{ fontSize: 10, color: 'rgba(233,239,245,0.78)' }}>Show kicker</span>
                  <span style={{ fontSize: 8, color: 'rgba(226,236,245,0.4)' }}>Line above the heading</span>
                </span>
                <span style={{ width: 34, height: 20, flex: '0 0 auto', borderRadius: 999, padding: 2, background: '#C6CB8A' }}>
                  <span style={{ display: 'block', width: 16, height: 16, borderRadius: '50%', background: '#FFFFFF', marginLeft: 14 }} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 13px', borderTop: '1px solid rgba(255,255,255,0.09)', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, color: 'rgba(226,236,245,0.42)', marginRight: 'auto' }}>Hero selected</span>
          <span style={{ fontSize: 10, color: 'rgba(226,236,245,0.3)' }}>Version 2.4 draft</span>
        </div>
      </div>

      {/* Overlay 1 — Shop products / Reserve your spot */}
      <button
        type="button"
        onClick={toggleMode}
        title="Click to switch the business type"
        className="showcase-overlay-1"
        style={{ all: 'unset', cursor: 'pointer', position: 'absolute', zIndex: 20, left: '4%', top: '46%', width: 208, padding: '13px 15px 14px', borderRadius: 12, background: bookingBg, boxShadow: '0 22px 48px rgba(0,8,18,0.44)', display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 9, letterSpacing: 1.1, textTransform: 'uppercase', color: panelLabelInk, marginRight: 'auto' }}>{panelLabel}</span>
          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke={panelLabelInk} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d="M4 8h13l-3-3M20 16H7l3 3" /></svg>
        </span>

        {!isProduct && (
          <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[{ label: 'Table for 2' }, { label: 'Date' }, { label: 'Time' }].map((b) => (
              <span key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', borderRadius: 7, background: '#FFFCF5', border: '1px solid rgba(27,44,58,0.16)' }}>
                <span style={{ fontSize: 9, color: '#4B5D6E', marginRight: 'auto' }}>{b.label}</span>
                <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="#8A9AA6" strokeWidth="2.6" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg>
              </span>
            ))}
            <span style={{ textAlign: 'center', padding: 9, borderRadius: 7, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 9.5, letterSpacing: 0.4, color: '#FFFFFF', background: '#6B4A22' }}>Book Now</span>
          </span>
        )}

        {isProduct && (
          <span style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ width: 42, height: 42, flex: '0 0 auto', borderRadius: 7, overflow: 'hidden', position: 'relative' }}>
                <Image src={shopItem.img} alt="" fill sizes="42px" style={{ objectFit: 'cover' }} />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 600, lineHeight: 1.3, color: '#E9EFF5' }}>{shopItem.name}</span>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 10, color: '#F4F2AE' }}>{shopItem.price}</span>
              </span>
            </span>
            <span style={{ textAlign: 'center', padding: 9, borderRadius: 7, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 9.5, letterSpacing: 0.4, color: '#14210b', background: 'linear-gradient(160deg, #F7F5C0, #E7E49B)' }}>Add to Cart</span>
          </span>
        )}
      </button>

      {/* Overlay 2 — Sell Products / Book Now! mode switch tile */}
      <button
        type="button"
        onClick={toggleMode}
        title="Click to switch the business type"
        className="showcase-overlay-2"
        style={{ all: 'unset', cursor: 'pointer', position: 'absolute', zIndex: 20, left: '24%', bottom: '6.5%', padding: 5, borderRadius: 4, border: '1.5px solid #37B6F0', boxShadow: '0 20px 44px rgba(0,8,18,0.5)' }}
      >
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 9, width: 152, padding: '20px 16px 18px', background: '#1C1C1C' }}>
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d={modeIcon} /></svg>
          <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: 1.1, textTransform: 'uppercase', color: '#FFFFFF', textAlign: 'center', whiteSpace: 'nowrap' }}>{modeIconLabel}</span>
        </span>
      </button>

      {/* Overlay 3 — Media Library */}
      <button
        type="button"
        onClick={cycleImage}
        title="Click to change the banner image"
        className="showcase-overlay-3"
        style={{ all: 'unset', cursor: 'pointer', position: 'absolute', zIndex: 20, right: '8%', bottom: '16%', width: 196, borderRadius: 12, overflow: 'hidden', background: '#0B1B27', border: '1px solid #37B6F0', boxShadow: '0 22px 48px rgba(0,8,18,0.48)' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: 9.5, fontWeight: 600, color: '#E9EFF5', marginRight: 'auto' }}>Media Library</span>
          <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="rgba(226,236,245,0.6)" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </span>
        <span style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, padding: 8 }}>
          {mediaThumbs.map((m, i) => (
            <span key={i} style={{ display: 'block', width: '100%', height: 38, position: 'relative', borderRadius: 4, overflow: 'hidden', outline: m.ring, outlineOffset: -1, opacity: m.opacity }}>
              <Image src={m.src} alt="" fill sizes="60px" style={{ objectFit: 'cover' }} />
            </span>
          ))}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, margin: '0 8px 9px', padding: 8, borderRadius: 7, background: '#FFFCF5' }}>
          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#04121F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6.5h16v11H4zM8.5 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM4 15l4-3.5 3.5 3 2-2L20 16" /></svg>
          <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 9, letterSpacing: 0.4, color: '#04121F' }}>Change Image</span>
        </span>
      </button>

      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, flexWrap: 'wrap' }}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#F4F2AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d="m7 4 11 8-11 8z" /></svg>
        <span style={{ fontSize: 12, lineHeight: 1.5, color: statusInk }}>{statusLine}</span>
      </div>
    </div>
  )
}
