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

export default function SiteHeader({ active, dark = false, onToggleDark }: { active: NavKey; dark?: boolean; onToggleDark?: () => void }) {
  const [narrow, setNarrow] = useState(false)
  const [open, setOpen] = useState(-1)
  const [drawer, setDrawer] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

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
  useEffect(() => {
    if (open < 0) return
    function onDocClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(-1)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  const logo = dark ? '/brand/matjarx-logo-light.png' : '/brand/matjarx-logo-black.png'
  const drawerOpen = narrow && drawer

  return (
    <div style={{ position: 'relative', zIndex: 40 }}>
      <div
        style={{
          background: 'linear-gradient(90deg, #003366 0%, #2E6EA8 20%, #707538 42%, #C9A227 60%, #C4262E 80%, #7A2E6B 100%)',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px 18px',
          flexWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, background: 'rgba(0,0,0,0.26)', border: '1px solid rgba(255,255,255,0.32)', backdropFilter: 'blur(10px)' }}>
          <span style={{ width: 6, height: 6, flex: '0 0 auto', borderRadius: '50%', background: 'var(--butter)' }} />
          <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 12.5, letterSpacing: 0.2, color: '#FFFFFF' }}>Get 49% discount on sign up now</span>
        </span>
        <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.36)' }} />
        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.95)', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>Go digital with 100,000 business in 2026</span>
      </div>

      <header
        style={{
          position: 'sticky',
          top: 0,
          background: dark ? 'rgba(0,20,35,0.74)' : 'rgba(252,250,243,0.72)',
          backdropFilter: 'blur(26px)',
          borderBottom: dark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.8)',
          boxShadow: dark ? '0 10px 30px rgba(0,8,18,0.3), inset 0 1px 0 rgba(255,255,255,0.14)' : '0 10px 30px rgba(4,18,31,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href={routes.home} style={{ flex: '0 0 auto', display: 'block' }}>
            <Image src={logo} alt="MatjarX" width={128} height={34} style={{ width: 128, height: 'auto', display: 'block' }} priority />
          </Link>

          {!narrow && (
            <nav
              ref={navRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                margin: '0 auto',
                padding: '5px 5px 5px 9px',
                borderRadius: 999,
                background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.5)',
                border: dark ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(255,255,255,0.85)',
                backdropFilter: 'blur(24px)',
                boxShadow: dark ? '0 14px 34px rgba(0,8,18,0.32), inset 0 1px 0 rgba(255,255,255,0.16)' : '0 14px 34px rgba(4,18,31,0.09), inset 0 1px 0 rgba(255,255,255,0.95)',
              }}
            >
              {NAV_ITEMS.map((item, i) => {
                const isActive = active === item.key
                const isOpen = open === i
                const color = isActive ? (dark ? 'var(--butter)' : 'var(--olive)') : dark ? 'rgba(226,236,245,0.78)' : '#1C3B56'
                return (
                  <div key={item.key} style={{ position: 'relative' }}>
                    <a
                      href={item.href}
                      onClick={item.menu ? (e) => { e.preventDefault(); setOpen(isOpen ? -1 : i) } : undefined}
                      className={dark ? 'nav-link-dark' : 'nav-link-light'}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '9px 15px', borderRadius: 999, fontSize: 13.5, fontWeight: isActive ? 700 : 500, color, whiteSpace: 'nowrap' }}
                    >
                      {item.label}
                      {item.menu && (
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 180ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                      )}
                    </a>
                    {item.menu && isOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 16px)',
                          left: -8,
                          minWidth: 250,
                          padding: 10,
                          borderRadius: 18,
                          background: dark ? 'rgba(4,24,42,0.94)' : 'rgba(255,255,255,0.86)',
                          border: dark ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(255,255,255,0.9)',
                          backdropFilter: 'blur(28px)',
                          boxShadow: dark ? '0 22px 50px rgba(0,8,18,0.5), inset 0 1px 0 rgba(255,255,255,0.14)' : '0 22px 50px rgba(4,18,31,0.16), inset 0 1px 0 rgba(255,255,255,0.9)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}
                      >
                        {item.menu.map((m) => (
                          <Link key={m.label} href={m.href} className={dark ? 'menu-item-dark' : 'menu-item-light'} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '11px 14px', borderRadius: 12 }}>
                            <span style={{ fontSize: 13.5, fontWeight: 600, color: dark ? '#F2F6FA' : '#04121F' }}>{m.label}</span>
                            {m.note && <span style={{ fontSize: 11.5, color: dark ? 'rgba(226,236,245,0.5)' : '#6A7F92' }}>{m.note}</span>}
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
                style={{ width: 40, height: 40, flex: '0 0 auto', borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--navy-gradient)', boxShadow: '0 8px 18px rgba(0,51,102,0.28), inset 0 1px 0 rgba(255,255,255,0.22)' }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--butter)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM5 20a7 7 0 0 1 14 0" /></svg>
              </a>
            </nav>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '0 0 auto', marginLeft: narrow ? 'auto' : 0 }}>
            {onToggleDark && (
              <button
                type="button"
                onClick={onToggleDark}
                title={dark ? 'Switch to light' : 'Switch to dark'}
                style={{
                  all: 'unset', cursor: 'pointer', flex: '0 0 auto', width: 40, height: 40, borderRadius: 12,
                  display: 'grid', placeItems: 'center',
                  background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.66)',
                  border: dark ? '1.5px solid rgba(255,255,255,0.18)' : '1.5px solid rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: dark ? 'inset 0 1px 0 rgba(255,255,255,0.16)' : 'inset 0 1px 0 rgba(255,255,255,0.9)',
                }}
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke={dark ? '#E9EFF5' : '#04121F'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={dark
                    ? 'M12 3.5a8.5 8.5 0 1 0 8.5 8.5c0-.4 0-.8-.1-1.2A6 6 0 0 1 12 3.6Z'
                    : 'M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1 5.5 18.5'} />
                </svg>
              </button>
            )}

            <a href={appSignup()} onClick={() => trackEvent('cta_click', { label: 'header_get_started' })} className="btn-navy" style={{ flex: '0 0 auto' }}>Get started</a>

            {narrow && (
              <button
                type="button"
                onClick={() => setDrawer((v) => !v)}
                title="Menu"
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  flex: '0 0 auto',
                  width: 44,
                  height: 44,
                  borderRadius: 13,
                  display: 'grid',
                  placeItems: 'center',
                  background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.66)',
                  border: dark ? '1.5px solid rgba(255,255,255,0.18)' : '1.5px solid rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: dark ? 'inset 0 1px 0 rgba(255,255,255,0.16)' : 'inset 0 1px 0 rgba(255,255,255,0.9)',
                }}
              >
                <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke={dark ? '#E9EFF5' : '#04121F'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={drawer ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} />
                </svg>
              </button>
            )}
          </div>
        </div>

        {drawerOpen && (
          <div
            style={{
              borderTop: dark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(4,18,31,0.09)',
              background: dark ? 'rgba(0,20,35,0.92)' : 'rgba(252,250,243,0.86)',
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
              const color = isActive ? (dark ? 'var(--butter)' : 'var(--olive)') : dark ? 'rgba(226,236,245,0.78)' : '#1C3B56'
              return (
                <div key={item.key} style={{ display: 'flex', flexDirection: 'column' }}>
                  <a
                    href={item.href}
                    onClick={item.menu ? (e) => { e.preventDefault(); setOpen(isOpen ? -1 : i) } : () => setDrawer(false)}
                    className={dark ? 'mobile-link-dark' : 'mobile-link-light'}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '15px 14px', borderRadius: 13, fontFamily: 'var(--font-lato), Lato, sans-serif', fontSize: 16, fontWeight: isActive ? 700 : 500, color }}
                  >
                    <span style={{ marginRight: 'auto' }}>{item.label}</span>
                    {item.menu && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 180ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                    )}
                  </a>
                  {item.menu && isOpen && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, margin: '2px 0 8px 16px', paddingLeft: 16, borderLeft: '2px solid rgba(198,203,138,0.7)' }}>
                      {item.menu.map((m) => (
                        <Link key={m.label} href={m.href} onClick={() => setDrawer(false)} className={dark ? 'mobile-submenu-dark' : 'mobile-submenu-light'} style={{ display: 'block', padding: '12px 12px', borderRadius: 11, fontSize: 14.5, color: dark ? 'rgba(226,236,245,0.76)' : '#3B5063' }}>
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
                color: dark ? '#F7FAFD' : '#04121F',
                background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.66)',
                border: dark ? '1.5px solid rgba(255,255,255,0.18)' : '1.5px solid rgba(255,255,255,0.9)',
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
