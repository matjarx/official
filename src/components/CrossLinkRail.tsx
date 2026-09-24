// The "where to next" rail, shared by blog posts, city pages and industry
// pages. See src/lib/cross-links.ts for why these links exist at all.
//
// Deliberately compact. Every one of these pages is already long, and the
// point of the rail is to be scanned in two seconds on the way out -- not
// to add another screen of reading. Three columns of one-line cards, a
// kind chip so a reader can tell a service from an article at a glance,
// and no illustration.

import Link from 'next/link'
import type { CrossLink } from '@/lib/cross-links'

const KIND_LABEL: Record<CrossLink['kind'], string> = {
  service: 'Service',
  industry: 'Industry',
  city: 'Location',
  blog: 'Read',
  plan: 'Plan',
  page: 'Page',
}

const KIND_TINT: Record<CrossLink['kind'], string> = {
  service: '#003366',
  industry: '#707538',
  city: '#8E1B22',
  blog: '#2E6EA8',
  plan: '#C9A227',
  page: '#5A6F82',
}

export default function CrossLinkRail({
  links,
  title = 'Where to next',
  subtitle,
  dark = false,
}: {
  links: CrossLink[]
  title?: string
  subtitle?: string
  dark?: boolean
}) {
  if (links.length === 0) return null

  const ink = dark ? '#FFFFFF' : '#04121F'
  const muted = dark ? 'rgba(255,255,255,0.62)' : '#5A6F82'
  const cardBg = dark ? 'rgba(255,255,255,0.05)' : '#FFFFFF'
  const cardLine = dark ? 'rgba(255,255,255,0.13)' : 'rgba(4,18,31,0.09)'

  return (
    <section
      aria-labelledby="cross-link-rail"
      style={{ maxWidth: 1300, margin: '0 auto', padding: '54px 24px 10px' }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 18 }}>
        <h2
          id="cross-link-rail"
          style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(19px, 2.4vw, 23px)', color: ink }}
        >
          {title}
        </h2>
        {subtitle && <p style={{ margin: 0, fontSize: 13.5, color: muted }}>{subtitle}</p>}
      </div>

      {/* Three across on desktop rather than auto-fit, which gave four
          and left six cards as a row of four and a stray row of two. */}
      <ul className="cross-link-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {links.map((l) => (
          <li key={`${l.kind}-${l.href}`}>
            <Link
              href={l.href}
              className="cross-link-card"
              style={{
                display: 'block',
                height: '100%',
                padding: '13px 15px 14px',
                borderRadius: 13,
                border: `1px solid ${cardLine}`,
                background: cardBg,
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 9.5,
                  fontWeight: 800,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  color: KIND_TINT[l.kind],
                  marginBottom: 5,
                }}
              >
                {KIND_LABEL[l.kind]}
              </span>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 700, lineHeight: 1.35, color: ink }}>
                {l.label}
              </span>
              {l.note && (
                <span style={{ display: 'block', marginTop: 4, fontSize: 12, lineHeight: 1.45, color: muted }}>
                  {l.note}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
