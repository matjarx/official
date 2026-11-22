'use client'

// The homepage's announcement ticker. (The header is the shared
// SiteHeader, the same on every page.)

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { WHATSAPP_HREF } from '@/lib/contact-details'
import { Arrow } from './icons'

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
