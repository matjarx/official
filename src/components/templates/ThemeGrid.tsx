// The industry listing on /templates. A server component on purpose.
//
// The whole point of this section is that it is the one part of the page
// a crawler should see: real theme names, real industries, real links.
// Its first draft lived inside ThemeModal, which calls useSearchParams --
// and on a statically generated route that forces everything beneath the
// Suspense boundary to render in the browser, so `curl /templates`
// returned the fallback and zero theme cards.
//
// So: plain <Link>s here, rendered on the server. Pressing one puts
// ?<slug>-website-template in the URL; ThemeModal reads it and draws the
// preview over the top.

import Link from 'next/link'
import Image from 'next/image'
import { templateParam, type IndustryGroup, type Theme } from '@/lib/theme-catalogue'

function anchorId(s: string) {
  return `industry-${s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
}

function ThemeCard({ theme }: { theme: Theme }) {
  const band = theme.primaryColor
    ? `linear-gradient(150deg, ${theme.primaryColor}, ${theme.secondaryColor || theme.primaryColor})`
    : 'linear-gradient(150deg, #003366, #0A2647)'

  return (
    <li className="theme-card-wrap">
      <Link
        href={`/templates?${templateParam(theme.slug)}`}
        scroll={false}
        className="theme-card"
        aria-label={`Preview the ${theme.name} template`}
      >
        <span className="theme-card-band" style={{ background: band }}>
          {theme.previewImageUrl && (
            <Image src={theme.previewImageUrl} alt={`${theme.name} template preview`} fill sizes="(max-width: 700px) 100vw, 360px" style={{ objectFit: 'cover' }} />
          )}
          {/* Independent, not either/or. Bakery & Café is flagged
              coming_soon and has a finished, published demo behind it —
              under the old `!comingSoon && demoUrl` rule that theme
              advertised no preview while the page's own intro line
              promised one. A theme can be both still in build and
              already walkable. */}
          {theme.demoUrl && <span className="theme-chip theme-chip-live">Live preview</span>}
          {theme.comingSoon && <span className={`theme-chip theme-chip-soon${theme.demoUrl ? ' theme-chip-second' : ''}`}>Coming soon</span>}
        </span>
        <span className="theme-card-body">
          <span className="theme-card-name">{theme.name}</span>
          {theme.description && <span className="theme-card-desc">{theme.description}</span>}
          <span className="theme-card-cta">{theme.demoUrl ? 'Preview it →' : 'See the details →'}</span>
        </span>
      </Link>
    </li>
  )
}

export default function ThemeGrid({ groups }: { groups: IndustryGroup[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
      {groups.map((g) => (
        <section key={g.industry} aria-labelledby={anchorId(g.industry)}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <h3
              id={anchorId(g.industry)}
              style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(19px, 2.6vw, 24px)', letterSpacing: '-0.6px', color: '#04121F' }}
            >
              {g.industry}
            </h3>
            <span style={{ fontSize: 13, color: '#5A6F82' }}>
              {g.themes.length} {g.themes.length === 1 ? 'template' : 'templates'}
            </span>
          </div>
          <ul className="theme-grid">
            {g.themes.map((t) => (
              <ThemeCard key={`${g.industry}-${t.id}`} theme={t} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
