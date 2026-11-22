'use client'

// The homepage's interactive chrome: the announcement ticker, and the
// header with its folding pill nav and phone menu drawer.

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { WHATSAPP_HREF } from '@/lib/contact-details'
import { Arrow, Chevron, WaIcon } from './icons'

const SIGNUP = 'https://app.matjarx.com/signup'

/* ── Announcement ticker (segmentsix) ─────────────────────────────── */
// The admin's announcement (Marketing Site > Announcements) leads whenever
// it is switched on and in date; two standing messages rotate after it.
export type TickerItem = { badge?: string; t: string; cta?: string; href?: string }

const STANDING: TickerItem[] = [
  { t: 'Your website, live in 7 days — Rs. 22,500 setup', cta: 'See plans', href: '/pricing' },
  { t: 'Questions? A real person answers on WhatsApp', cta: 'Chat now', href: WHATSAPP_HREF },
]

const isInternal = (h?: string) => !!h && h.startsWith('/')

function TickLink({ href, className, children, ...rest }: { href?: string; className?: string; children: React.ReactNode; tabIndex?: number; 'aria-hidden'?: boolean }) {
  if (!href) return <span className={className} {...rest}>{children}</span>
  return isInternal(href)
    ? <Link href={href} className={className} {...rest}>{children}</Link>
    : <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
}

export function Ann({ lead }: { lead: TickerItem | null }) {
  const items = lead ? [lead, ...STANDING] : STANDING
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 4200)
    return () => clearInterval(id)
  }, [paused, items.length])
  const badge = items[i].badge || 'New'
  return (
    <div className="hv-ann" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <span className="hv-ann-tag"><i />{badge}</span>
      <div className="hv-ann-win" aria-live="polite">
        {items.map((a, n) => (
          <TickLink key={a.t} href={a.href} className={n === i ? 'is-on' : n === (i + items.length - 1) % items.length ? 'is-out' : ''} aria-hidden={n !== i} tabIndex={n === i ? 0 : -1}>
            <span className="hv-ann-t">{a.t}</span>{a.cta && <span className="hv-ann-cta">{a.cta} <Arrow size={14} /></span>}
          </TickLink>
        ))}
      </div>
      <span className="hv-ann-n" aria-hidden="true">{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
    </div>
  )
}

/* ── Header with folding pill nav + menu drawer ───────────────────── */
const NAV = [
  { l: 'Home', h: '/', on: true },
  { l: 'Services', h: '/done-for-you-website', dd: true },
  { l: 'Industries', h: '/website-examples', dd: true },
  { l: 'Templates', h: '/templates' },
  { l: 'Examples', h: '/website-examples' },
  { l: 'Pricing', h: '/pricing' },
  { l: 'Resources', h: '/blogs', dd: true },
]

// The drawer lists the pages behind each dropdown too, since a phone has
// no hover to open them.
const MENU: { l: string; h: string; sub?: { l: string; h: string }[] }[] = [
  { l: 'Home', h: '/' },
  { l: 'Services', h: '/done-for-you-website', sub: [
    { l: 'Website development', h: '/done-for-you-website' },
    { l: 'SEO services', h: '/local-national-and-global-seo' },
    { l: 'Growth marketing', h: '/growth-marketing-service' },
    { l: 'Free SEO check', h: '/complete-website-audit-for-organic-visibility' },
  ] },
  { l: 'Industries', h: '/website-examples', sub: [
    { l: 'Restaurants', h: '/website-for-restaurants' },
    { l: 'Boutiques', h: '/website-for-boutiques' },
    { l: 'Salons & spas', h: '/website-for-salons-and-spas' },
    { l: 'Real estate', h: '/website-for-real-estate' },
  ] },
  { l: 'Templates', h: '/templates' },
  { l: 'Examples', h: '/website-examples' },
  { l: 'Pricing', h: '/pricing' },
  { l: 'Resources', h: '/blogs' },
]

function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sub, setSub] = useState<string | null>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.documentElement.style.overflow = '' }
  }, [open, onClose])
  return (
    <div className={`hv-drawer${open ? ' is-open' : ''}`} id="hv-drawer" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open} inert={!open}>
      <button type="button" className="hv-drawer-scrim" aria-label="Close menu" onClick={onClose} tabIndex={-1} />
      <div className="hv-drawer-panel">
        <div className="hv-drawer-top">
          <span className="hv-drawer-k">Menu</span>
          <button type="button" className="hv-drawer-x" onClick={onClose} aria-label="Close menu">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <ol className="hv-drawer-list">
          {MENU.map((m, n) => (
            <li key={m.l} style={{ '--i': n } as React.CSSProperties} className={sub === m.l ? 'is-sub' : ''}>
              <div className="row">
                <Link href={m.h} prefetch={false} onClick={onClose}><span className="n">{String(n + 1).padStart(2, '0')}</span>{m.l}</Link>
                {m.sub && (
                  <button type="button" aria-expanded={sub === m.l} aria-label={`${m.l} pages`} onClick={() => setSub(sub === m.l ? null : m.l)}><Chevron /></button>
                )}
              </div>
              {m.sub && (
                <ul className="subs">
                  {m.sub.map((x) => <li key={x.l}><Link href={x.h} prefetch={false} onClick={onClose}>{x.l}</Link></li>)}
                </ul>
              )}
            </li>
          ))}
        </ol>
        <div className="hv-drawer-cta">
          <a className="mx-btn mx-btn--primary mx-btn--block" href={SIGNUP}>Get started <Arrow /></a>
          <a className="mx-btn mx-btn--whatsapp mx-btn--block" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer"><WaIcon /> Talk to us on WhatsApp</a>
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="nav hv-nav" data-hv-nav>
        <div className="nav-in">
          <Link href="/" className="hv-logo"><img className="logo" src="/home-v2/7e77512d693bd2d90ab076b5b29429fc.png" alt="MatjarX" /></Link>
          <nav className="nav-pill" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.l} className={n.on ? 'on' : undefined} href={n.h}>{n.l}{n.dd && <> <Chevron /></>}</Link>
            ))}
            <button type="button" className="hv-menu" aria-label="Show menu" data-hv-unfold>
              <span /><span /><span />Menu
            </button>
          </nav>
          <div className="nav-r">
            <a className="mx-btn mx-btn--primary mx-btn--sm" href={SIGNUP}>Get started</a>
            <button className="hamb" type="button" aria-label="Open menu" aria-expanded={open} aria-controls="hv-drawer" onClick={() => setOpen(true)}>
              <svg className="ic" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </header>
      <MenuDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}

