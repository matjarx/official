'use client'

// The industries rail under "70,000 websites built and counting".
//
// That heading used to sit above a grid of four client screenshots. It
// answered "can you prove it" and not "have you built one for a business
// like mine", which is the question someone reading a homepage headline
// about 70,000 websites is actually asking. The screenshots have their
// own page and it is one click away.
//
// Three across on desktop, sliding. Fourteen industries is too many for a
// grid -- either it runs five rows deep or it silently hides eleven of
// them behind a "see all" nobody presses.
//
// The scrolling and the arrows are CardRail, which this file used to
// carry inline before /pricing needed the same thing.

import Link from 'next/link'
import CardRail from '@/components/CardRail'
import { routes } from '@/lib/routes'
import { INDUSTRY_DATA, INDUSTRY_SLUGS, type IndustryKey } from '@/lib/industry-data'

/** Reads better than alphabetical: the trades people actually ask for first. */
const ORDER: IndustryKey[] = [
  'restaurants',
  'boutiques',
  'clinics-and-healthcare',
  'salons-and-spas',
  'real-estate',
  'gyms-and-fitness',
  'law-firms',
  'construction-companies',
  'online-stores-ecommerce',
  'auto-repair-shops',
  'wedding-and-event-planners',
  'clinics',
  'b2b-clothing-manufacturer',
  'b2b-leather-goods-manufacturer',
]

/** First sentence of the subhead — the cards are a rail, not a page. */
function oneLine(text: string): string {
  const stop = text.search(/\.\s/)
  return stop > 0 ? text.slice(0, stop + 1) : text
}

export default function IndustryRail({ dark = false }: { dark?: boolean }) {
  const ink = dark ? '#FFFFFF' : 'var(--ink-1)'
  const muted = dark ? 'rgba(255,255,255,0.62)' : 'var(--ink-muted)'
  const cardBg = dark ? 'rgba(255,255,255,0.05)' : '#FFFFFF'
  const cardLine = dark ? 'rgba(255,255,255,0.13)' : 'rgba(4,18,31,0.09)'

  return (
    <CardRail className="industry-rail" label="Industries we build websites for" dark={dark}>
      {ORDER.map((key) => {
        const d = INDUSTRY_DATA[key]
        return (
          <li key={key} className="industry-card-wrap">
            <Link
              href={routes.industry(INDUSTRY_SLUGS[key])}
              className="industry-card"
              style={{ background: cardBg, borderColor: cardLine }}
            >
              {/* The industry's own tint, which is the only visual each
                  of the fourteen reliably has -- three have photography,
                  and a rail where three cards have images and eleven
                  have placeholders looks broken, not sparse. */}
              <span className="industry-card-band" style={{ background: d.tint }} aria-hidden="true" />
              <span className="industry-card-body">
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 17, lineHeight: 1.25, color: ink }}>
                  {d.name}
                </span>
                <span style={{ fontSize: 13, lineHeight: 1.55, color: muted }}>{oneLine(d.subhead)}</span>
                <span style={{ marginTop: 'auto', paddingTop: 10, fontSize: 12.5, fontWeight: 700, color: dark ? 'var(--moss-light)' : 'var(--olive)' }}>
                  See what we build &rarr;
                </span>
              </span>
            </Link>
          </li>
        )
      })}
    </CardRail>
  )
}
