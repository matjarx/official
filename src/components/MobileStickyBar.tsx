'use client'

// Sticky bar on phones (< 768px): "WhatsApp us" and "See plans" (spec
// group 6, item 6).
//
// It must not cover forms or overlays:
// - globals.css pads the bottom of <body> by the bar's height on phones,
//   so the last thing on any page (a form, the footer) can scroll clear.
// - While a form field has focus it hides, so it never sits between the
//   on-screen keyboard and the field.
// - It sits at z-index 45, under every overlay (the popup, the template
//   and portfolio modals), so those cover it rather than the reverse.
// The site has no cookie banner today; one added later should sit above
// it, or offset itself by --mobile-bar-h.

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { routes } from '@/lib/routes'
import { WHATSAPP_HREF } from '@/lib/contact-details'
import { trackEvent } from '@/lib/analytics'

const FIELD = 'input, textarea, select, [contenteditable="true"]'

export default function MobileStickyBar() {
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const onIn = (e: FocusEvent) => {
      if (e.target instanceof Element && e.target.matches(FIELD)) setTyping(true)
    }
    const onOut = () => setTyping(false)
    document.addEventListener('focusin', onIn)
    document.addEventListener('focusout', onOut)
    return () => {
      document.removeEventListener('focusin', onIn)
      document.removeEventListener('focusout', onOut)
    }
  }, [])

  return (
    <div className="mobile-sticky-bar" aria-hidden={typing} data-hidden={typing || undefined}>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('cta_click', { label: 'mobile_bar_whatsapp' })}
        className="mobile-sticky-bar-btn mobile-sticky-bar-wa"
      >
        WhatsApp us
      </a>
      <Link
        href={routes.pricing}
        onClick={() => trackEvent('cta_click', { label: 'mobile_bar_plans' })}
        className="mobile-sticky-bar-btn mobile-sticky-bar-plans"
      >
        See plans
      </Link>
    </div>
  )
}
