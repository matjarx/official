'use client'

// The site header, on every page: the homepage redesign's header.
//
// Desktop: logo, a glass pill nav, Log in and Get started. The pill turns
// glassy once the page scrolls and folds down to "Home ··· Menu" while the
// reader scrolls down past the first screens; scrolling up, hovering it or
// pressing Menu unfolds it again.
//
// Phone and tablet (< 1100px): logo, Get started and a menu button that
// opens a full-screen drawer, with each dropdown's pages one tap away.
//
// SEO: every dropdown's links are rendered ALWAYS and hidden with CSS, never
// mounted on click. A crawler never clicks, and an earlier crawl found zero
// inbound links to pages that were only reachable from click-mounted menus.
// The drawer is likewise always in the HTML (inert while closed).

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_ITEMS, type NavKey } from '@/lib/nav'
import { routes, appLogin, appSignup } from '@/lib/routes'
import { WHATSAPP_HREF } from '@/lib/contact-details'
import { trackEvent } from '@/lib/analytics'

const Chevron = () => (
  <svg className="sh-chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
)
const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

export default function SiteHeader({ active, dark = false }: { active: NavKey; dark?: boolean }) {
  const [open, setOpen] = useState(-1)       // desktop dropdown index
  const [drawer, setDrawer] = useState(false) // phone menu
  const [sub, setSub] = useState(-1)          // drawer sub-list
  const ref = useRef<HTMLElement>(null)

  // Scrolled (glass) and folded states. Written straight to data attributes
  // rather than state: this runs on every scroll frame.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let last = window.scrollY, raf = 0, hover = false, forced = false
    const tick = () => {
      raf = 0
      const y = window.scrollY
      el.toggleAttribute('data-scrolled', y > 24)
      const down = y > last + 2, up = y < last - 2
      if (up) forced = false
      if (down && y > 700 && !hover && !forced) el.setAttribute('data-folded', '')
      else if (up || y < 700) el.removeAttribute('data-folded')
      last = y
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick) }
    const enter = () => { hover = true; el.removeAttribute('data-folded') }
    const leave = () => { hover = false }
    const unfold = () => { forced = true; el.removeAttribute('data-folded') }
    const pill = el.querySelector('.sh-pill')
    const menuBtn = el.querySelector('.sh-fold')
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    pill?.addEventListener('mouseenter', enter)
    pill?.addEventListener('mouseleave', leave)
    menuBtn?.addEventListener('click', unfold)
    return () => {
      window.removeEventListener('scroll', onScroll)
      pill?.removeEventListener('mouseenter', enter)
      pill?.removeEventListener('mouseleave', leave)
      menuBtn?.removeEventListener('click', unfold)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Close a dropdown on outside click or Escape.
  useEffect(() => {
    if (open < 0) return
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(-1) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(-1) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [open])

  // Drawer: Escape closes, and the page behind cannot scroll.
  useEffect(() => {
    if (!drawer) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawer(false) }
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.documentElement.style.overflow = '' }
  }, [drawer])

  const close = () => { setDrawer(false); setOpen(-1) }

  return (
    <header ref={ref} className={`sh${dark ? ' sh--dark' : ''}`}>
      <div className="sh-in">
        <Link href={routes.home} className="sh-logo" aria-label="MatjarX home">
          <Image src={dark ? '/brand/matjarx-logo-light.png' : '/brand/matjarx-logo-black.png'} alt="MatjarX" width={128} height={34} priority />
        </Link>

        <nav className="sh-pill" aria-label="Main">
          {NAV_ITEMS.map((item, i) => {
            const on = active === item.key
            return (
              <div key={item.key} className={`sh-item${on ? ' is-on' : ''}${open === i ? ' is-open' : ''}`}>
                {item.href ? (
                  <Link href={item.href} className="sh-link" aria-current={on ? 'page' : undefined}>{item.label}</Link>
                ) : (
                  <button type="button" className="sh-link" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{item.label}</button>
                )}
                {item.menu && (
                  <>
                    <button type="button" className="sh-caret" aria-label={`${item.label} menu`} aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><Chevron /></button>
                    <div className={`sh-menu${item.menu.length > 8 ? ' sh-menu--wide' : ''}`} aria-hidden={open !== i}>
                      {item.menu.map((m) => (
                        <Link key={m.label} href={m.href} prefetch={false} className="sh-mi" tabIndex={open === i ? 0 : -1} onClick={close}>
                          <span className="t">{m.label}</span>
                          {m.note && <span className="n">{m.note}</span>}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
          <button type="button" className="sh-fold" aria-label="Show menu"><span /><span /><span />Menu</button>
        </nav>

        <div className="sh-r">
          <a href={appLogin} className="sh-login" aria-label="Log in" title="Log in">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 12a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM5 20a7 7 0 0 1 14 0" /></svg>
          </a>
          <a href={appSignup()} className="sh-cta" onClick={() => trackEvent('cta_click', { label: 'header_get_started' })}>Get started</a>
          <button type="button" className="sh-burger" aria-label="Open menu" aria-expanded={drawer} aria-controls="sh-drawer" onClick={() => setDrawer(true)}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      <div className={`sh-drawer${drawer ? ' is-open' : ''}`} id="sh-drawer" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!drawer} inert={!drawer}>
        <button type="button" className="sh-scrim" aria-label="Close menu" tabIndex={-1} onClick={close} />
        <div className="sh-panel">
          <div className="sh-top">
            <span className="sh-k">Menu</span>
            <button type="button" className="sh-x" aria-label="Close menu" onClick={close}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>
          <ol className="sh-list">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.key} style={{ '--i': i } as React.CSSProperties} className={`${sub === i ? 'is-sub' : ''}${active === item.key ? ' is-on' : ''}`}>
                <div className="row">
                  {item.href ? (
                    <Link href={item.href} prefetch={false} onClick={close}><span className="n">{String(i + 1).padStart(2, '0')}</span>{item.label}</Link>
                  ) : (
                    <button type="button" className="lbl" onClick={() => setSub(sub === i ? -1 : i)}><span className="n">{String(i + 1).padStart(2, '0')}</span>{item.label}</button>
                  )}
                  {item.menu && (
                    <button type="button" className="tog" aria-expanded={sub === i} aria-label={`${item.label} pages`} onClick={() => setSub(sub === i ? -1 : i)}><Chevron /></button>
                  )}
                </div>
                {item.menu && (
                  <ul className="subs">
                    {item.menu.map((m) => <li key={m.label}><Link href={m.href} prefetch={false} onClick={close}>{m.label}</Link></li>)}
                  </ul>
                )}
              </li>
            ))}
          </ol>
          <div className="sh-dcta">
            <a className="sh-cta sh-cta--block" href={appSignup()} onClick={() => trackEvent('cta_click', { label: 'header_get_started' })}>Get started <Arrow /></a>
            <a className="sh-wa" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">Talk to us on WhatsApp</a>
            <a className="sh-dlogin" href={appLogin}>Log in</a>
          </div>
        </div>
      </div>
    </header>
  )
}
