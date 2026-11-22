'use client'

// The floating CTA dock, on every page: "Live in 7 days", WhatsApp, and
// "Get my website". It replaced the full-width phone sticky bar
// (MobileStickyBar) so phones and desktops get the same floating pill.
//
// - Appears once the reader has scrolled past the first screen, and steps
//   aside at the footer, which carries the same calls to action.
// - Hides while a form field has focus, so it never sits between the
//   on-screen keyboard and the field.
// - z-index 45, under every overlay (popup, template and portfolio modals).
// - Floats, so unlike the old bar it needs no body padding: it is gone by
//   the time the reader reaches the footer.

import { useEffect, useState } from 'react'
import { appSignup } from '@/lib/routes'
import { WHATSAPP_HREF } from '@/lib/contact-details'
import { trackEvent } from '@/lib/analytics'

const FIELD = 'input, textarea, select, [contenteditable="true"]'

export default function FloatingDock() {
  const [show, setShow] = useState(false)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const onIn = (e: FocusEvent) => { if (e.target instanceof Element && e.target.matches(FIELD)) setTyping(true) }
    const onOut = () => setTyping(false)
    document.addEventListener('focusin', onIn)
    document.addEventListener('focusout', onOut)
    return () => { document.removeEventListener('focusin', onIn); document.removeEventListener('focusout', onOut) }
  }, [])

  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const vh = window.innerHeight
      const past = window.scrollY > vh * 0.6
      const footer = document.querySelector('footer')
      const atFooter = footer ? footer.getBoundingClientRect().top < vh * 0.85 : false
      setShow(past && !atFooter)
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(check) }
    check()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])

  const on = show && !typing
  return (
    <div className="fdock" data-on={on || undefined} aria-hidden={!on} inert={!on}>
      <span className="fdock-l"><i aria-hidden="true" />Live in 7 days</span>
      <a
        className="fdock-wa"
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Talk to us on WhatsApp"
        onClick={() => trackEvent('cta_click', { label: 'dock_whatsapp' })}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8a11.6 11.6 0 0 1-4.6-4.1c-.3-.5-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.2.5.1.6 0l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.4Z" /></svg>
      </a>
      <a className="fdock-orb" href={appSignup()} onClick={() => trackEvent('cta_click', { label: 'dock_get_started' })}>
        <span className="fdock-orb-c">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
        <span className="fdock-orb-t">Get my website</span>
      </a>
    </div>
  )
}
