'use client'

// Site Header — from Site Header.dc.html / Site Header Dark.dc.html. One
// component for both themes (`dark` prop) rather than two files, since the
// only difference is tokens, not structure or behavior — the README asks
// for "one theme layer, not three" across the whole handoff.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_ITEMS, type NavKey } from '@/lib/nav'
import { routes, appLogin, appSignup } from '@/lib/routes'
import { trackEvent } from '@/lib/analytics'
import { useTheme } from '@/components/ThemeProvider'

export default function SiteHeader({ active, dark: darkProp, onToggleDark }: { active: NavKey; dark?: boolean; onToggleDark?: () => void }) {
  // The theme comes from context unless a caller overrides it. That is what
  // gives all 27 pages the toggle without editing 27 files: they render
  // <SiteHeader active="..."/> exactly as before and pick it up.
  //
  // HomeContent still passes both explicitly, because its own `dark` prop
  // drives ~40 JS branches that the CSS tokens do not cover yet. Its
  // override wins, so the two mechanisms cannot disagree on one page.
  const theme = useTheme()
  const dark = darkProp ?? theme.dark
  const toggleDark = onToggleDark ?? theme.toggle
  const [narrow, setNarrow] = useState(false)
  const [open, setOpen] = useState(-1)
  const [drawer, setDrawer] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  // Wraps the desktop nav AND the mobile drawer — see the outside-click
  // effect below for why that distinction mattered.
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 940px)')
    const sync = () => {
      setNarrow(mq.matches)
      setOpen(-1)
      setDrawer(false)
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Not in the original prototype (single-file sandbox had no room for it),
  // but a dropdown that only closes by re-clicking its own trigger is a
  // real usability regression on a live site — close on outside click too.
  //
  // Scoped to the whole header, not just the desktop nav. navRef sits on
  // <nav className="site-header-nav-desktop">, and the mobile drawer is a
  // SIBLING of it -- so on a phone every tap inside the drawer counted as
  // "outside", including taps on the submenu links themselves. mousedown
  // closed the submenu, the link unmounted, and the click that followed
  // landed on nothing: the mobile dropdown links could not be opened at
  // all. headerRef wraps both, so a tap anywhere in the header is inside.
  useEffect(() => {
    if (open < 0) return
    function onDocClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(-1)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  const logo = dark ? '/brand/matjarx-logo-light.png' : '/brand/matjarx-logo-black.png'
  const drawerOpen = narrow && drawer

  return (
    // The sticky lives HERE, not on the <header> inside it.
    //
    // A sticky element sticks within its own parent's box. This wrapper
    // was exactly as tall as the header it contained -- 83px of room for
    // an 83px element -- so `position: sticky` on the header computed as
    // sticky, reported as sticky, and scrolled straight off the top of
    // the page with everything else. Measured: header top went to -2000
    // at 2000px of scroll.
    //
    // On the wrapper the containing block is the page, which is where
    // the room is.
    <div style={{ position: 'sticky', top: 0, zIndex: 40 }}>
      {/* The gradient announcement strip that used to sit here is now
          <AnnouncementBar>, rendered from the root layout and edited in
          the admin. Its markup and copy moved across unchanged; this
          header rendering its own hardcoded copy on top of it was why
          the site showed two strips and editing the admin one appeared
          to do nothing. */}
      <header
        ref={headerRef}
        style={{
          background: dark ? 'rgba(0,20,35,0.74)' : 'rgba(var(--cream-rgb), 0.72)',
          backdropFilter: 'blur(26px)',
          borderBottom: dark ? '1px solid rgba(var(--ink-inverse-rgb), 0.12)' : '1px solid rgba(var(--ink-inverse-rgb), 0.8)',
          boxShadow: dark ? '0 10px 30px rgba(0,8,18,0.3), inset 0 1px 0 rgba(var(--ink-inverse-rgb), 0.14)' : '0 10px 30px rgba(var(--scrim-rgb), 0.05), inset 0 1px 0 rgba(var(--ink-inverse-rgb), 0.9)',
        }}
      >
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href={routes.home} style={{ flex: '0 0 auto', display: 'block' }}>
            <Image src={logo} alt="MatjarX" width={128} height={34} style={{ width: 128, height: 'auto', display: 'block' }} priority />
          </Link>

          <nav
            ref={navRef}
            className="site-header-nav-desktop"
            style={{
              alignItems: 'center',
              gap: 3,
              margin: '0 auto',
              // Symmetric, and it was not: '5px 5px 5px 9px' put 9px on the
              // left against 5px on the right, so the first item's hover pill
              // sat 4px further in than the last one's and the highlight read
              // as misaligned with the row it belongs to.
              padding: '5px',
              borderRadius: 999,
              // No background, border, blur or shadow on the nav itself.
              // The hover and active states are the affordance; a second
              // container behind them was a surface competing with the pills
              // it held, and on a dark ground it read as a misplaced layer
              // rather than a frame.
            }}
          >
              {NAV_ITEMS.map((item, i) => {
                const isActive = active === item.key
                const isOpen = open === i
                const color = isActive ? (dark ? 'var(--butter)' : 'var(--olive)') : dark ? 'rgba(var(--ink-on-dark-rgb), 0.78)' : '#1C3B56'
                return (
                  <div key={item.key} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    {/* The label is a real link — clicking "Pricing" (or any
                        top-level item) navigates to its own page. The
                        chevron is a separate click target so the dropdown
                        can still be browsed without leaving the page. */}
                    <a
                      href={item.href}
                      className={dark ? 'nav-link-dark' : 'nav-link-light'}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, padding: item.menu ? '9px 4px 9px 15px' : '9px 15px', borderRadius: 999, fontSize: 13.5, fontWeight: isActive ? 700 : 500, color, whiteSpace: 'nowrap' }}
                    >
                      {item.label}
                    </a>
                    {item.menu && (
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-label={`${item.label} menu`}
                        style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '9px 12px 9px 4px', borderRadius: 999, color }}
                      >
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 180ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                      </button>
                    )}
                    {/* Rendered ALWAYS, hidden with CSS, never unmounted.
                        It used to be `isOpen && <div>`, so the eight links
                        inside each menu existed only after a human clicked.
                        A crawler never clicks: /templates, /faqs, /features,
                        /videos, /alternatives, /careers and /become-a-partner
                        are all reachable ONLY from these menus, and a crawl of
                        all 149 pages found zero inbound links to them. They
                        were invisible to search engines while looking
                        perfectly linked to us. */}
                    {item.menu && (
                      <div
                        aria-hidden={!isOpen}
                        style={{
                          visibility: isOpen ? 'visible' : 'hidden',
                          opacity: isOpen ? 1 : 0,
                          pointerEvents: isOpen ? 'auto' : 'none',
                          position: 'absolute',
                          top: 'calc(100% + 16px)',
                          left: -8,
                          minWidth: 250,
                          padding: 10,
                          borderRadius: 18,
                          background: dark ? 'rgba(4,24,42,0.94)' : 'rgba(var(--ink-inverse-rgb), 0.86)',
                          border: dark ? '1px solid rgba(var(--ink-inverse-rgb), 0.14)' : '1px solid rgba(var(--ink-inverse-rgb), 0.9)',
                          backdropFilter: 'blur(28px)',
                          boxShadow: dark ? '0 22px 50px rgba(0,8,18,0.5), inset 0 1px 0 rgba(var(--ink-inverse-rgb), 0.14)' : '0 22px 50px rgba(var(--scrim-rgb), 0.16), inset 0 1px 0 rgba(var(--ink-inverse-rgb), 0.9)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}
                      >
                        {item.menu.map((m) => (
                          <Link key={m.label} href={m.href} className={dark ? 'menu-item-dark' : 'menu-item-light'} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '11px 14px', borderRadius: 12 }}>
                            <span style={{ fontSize: 13.5, fontWeight: 600, color: dark ? '#F2F6FA' : 'var(--ink-1)' }}>{m.label}</span>
                            {m.note && <span style={{ fontSize: 11.5, color: dark ? 'rgba(var(--ink-on-dark-rgb), 0.5)' : 'var(--ink-muted)' }}>{m.note}</span>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
              <a
                href={appLogin}
                title="Log in"
                style={{ width: 40, height: 40, flex: '0 0 auto', borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--navy-gradient)', boxShadow: '0 8px 18px rgba(var(--navy-rgb), 0.28), inset 0 1px 0 rgba(var(--ink-inverse-rgb), 0.22)' }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--butter)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM5 20a7 7 0 0 1 14 0" /></svg>
              </a>
            </nav>

          <div className="site-header-actions" style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '0 0 auto' }}>
            {/* Every page gets the toggle. A caller may still pass
                onToggleDark to drive its own dark treatment -- HomeContent
                does, because its `dark` prop controls ~40 JS branches the
                tokens do not cover. Its override wins so the two
                mechanisms cannot disagree on one page. */}
            {(

              <button
                type="button"
                onClick={toggleDark}
                title={dark ? 'Switch to light' : 'Switch to dark'}
                style={{
                  all: 'unset', cursor: 'pointer', flex: '0 0 auto', width: 40, height: 40, borderRadius: 12,
                  display: 'grid', placeItems: 'center',
                  background: dark ? 'rgba(var(--ink-inverse-rgb), 0.08)' : 'rgba(var(--ink-inverse-rgb), 0.66)',
                  border: dark ? '1.5px solid rgba(var(--ink-inverse-rgb), 0.18)' : '1.5px solid rgba(var(--ink-inverse-rgb), 0.9)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: dark ? 'inset 0 1px 0 rgba(var(--ink-inverse-rgb), 0.16)' : 'inset 0 1px 0 rgba(var(--ink-inverse-rgb), 0.9)',
                }}
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke={dark ? '#E9EFF5' : 'var(--ink-1)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={dark
                    ? 'M12 3.5a8.5 8.5 0 1 0 8.5 8.5c0-.4 0-.8-.1-1.2A6 6 0 0 1 12 3.6Z'
                    : 'M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1 5.5 18.5'} />
                </svg>
              </button>
            )}

            <a href={appSignup()} onClick={() => trackEvent('cta_click', { label: 'header_get_started' })} className="btn-navy btn-pulse" style={{ flex: '0 0 auto' }}>Get started</a>

            <button
              type="button"
              onClick={() => setDrawer((v) => !v)}
              title="Menu"
              className="site-header-mobile-toggle"
              style={{
                all: 'unset',
                cursor: 'pointer',
                flex: '0 0 auto',
                width: 44,
                height: 44,
                borderRadius: 13,
                placeItems: 'center',
                background: dark ? 'rgba(var(--ink-inverse-rgb), 0.08)' : 'rgba(var(--ink-inverse-rgb), 0.66)',
                border: dark ? '1.5px solid rgba(var(--ink-inverse-rgb), 0.18)' : '1.5px solid rgba(var(--ink-inverse-rgb), 0.9)',
                backdropFilter: 'blur(20px)',
                boxShadow: dark ? 'inset 0 1px 0 rgba(var(--ink-inverse-rgb), 0.16)' : 'inset 0 1px 0 rgba(var(--ink-inverse-rgb), 0.9)',
              }}
            >
              <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke={dark ? '#E9EFF5' : 'var(--ink-1)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={drawer ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} />
              </svg>
            </button>
          </div>
        </div>

        {drawerOpen && (
          <div
            style={{
              borderTop: dark ? '1px solid rgba(var(--ink-inverse-rgb), 0.12)' : '1px solid rgba(var(--ink-1-rgb), 0.09)',
              background: dark ? 'rgba(0,20,35,0.92)' : 'rgba(var(--cream-rgb), 0.86)',
              backdropFilter: 'blur(26px)',
              padding: '14px 20px 22px',
              maxHeight: '70vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {NAV_ITEMS.map((item, i) => {
              const isActive = active === item.key
              const isOpen = open === i
              const color = isActive ? (dark ? 'var(--butter)' : 'var(--olive)') : dark ? 'rgba(var(--ink-on-dark-rgb), 0.78)' : '#1C3B56'
              return (
                <div key={item.key} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <a
                      href={item.href}
                      onClick={() => setDrawer(false)}
                      className={dark ? 'mobile-link-dark' : 'mobile-link-light'}
                      style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, gap: 10, padding: '15px 14px', borderRadius: 13, fontFamily: 'var(--font-lato), Lato, sans-serif', fontSize: 16, fontWeight: isActive ? 700 : 500, color }}
                    >
                      <span>{item.label}</span>
                    </a>
                    {item.menu && (
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-label={`${item.label} menu`}
                        style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '15px 14px', color }}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 180ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                      </button>
                    )}
                  </div>
                  {item.menu && isOpen && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, margin: '2px 0 8px 16px', paddingLeft: 16, borderLeft: '2px solid rgba(var(--moss-light-rgb), 0.7)' }}>
                      {item.menu.map((m) => (
                        <Link key={m.label} href={m.href} onClick={() => setDrawer(false)} className={dark ? 'mobile-submenu-dark' : 'mobile-submenu-light'} style={{ display: 'block', padding: '12px 12px', borderRadius: 11, fontSize: 14.5, color: dark ? 'rgba(var(--ink-on-dark-rgb), 0.76)' : 'var(--ink-4-alt)' }}>
                          {m.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            <a
              href={appLogin}
              style={{
                marginTop: 8,
                textAlign: 'center',
                padding: '15px 18px',
                borderRadius: 13,
                fontFamily: 'var(--font-lato), Lato, sans-serif',
                fontWeight: 700,
                fontSize: 15,
                color: dark ? '#F7FAFD' : 'var(--ink-1)',
                background: dark ? 'rgba(var(--ink-inverse-rgb), 0.08)' : 'rgba(var(--ink-inverse-rgb), 0.66)',
                border: dark ? '1.5px solid rgba(var(--ink-inverse-rgb), 0.18)' : '1.5px solid rgba(var(--ink-inverse-rgb), 0.9)',
                backdropFilter: 'blur(20px)',
              }}
            >
              Log in
            </a>
          </div>
        )}
      </header>
    </div>
  )
}
