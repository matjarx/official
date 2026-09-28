// The landing page for one theme, at /templates/<slug>.
//
// ── What this page is, and what it deliberately is not ───────────────────
//
// It sells the DESIGN. The industry page (/website-for-salons-and-spas and
// its thirteen siblings) already sells the service, in depth, from real
// source content — and if this page re-argued "why your salon needs a
// website" the two would compete for the same query and Google would pick
// one of them, probably the wrong one. So the pitch here is visual: here is
// the actual theme, on a desktop and on a phone, these are the pages you
// get, this is what it does that a generic template does not. The commercial
// case gets one link, near the end, where someone who wants it will look.
//
// ── The colours are the theme's own ──────────────────────────────────────
//
// Applied as CSS custom properties on the page wrapper, so Salon Matjar's
// page is gold and Flower Matjar's is sage. They are sampled from each
// theme's real CSS rather than read from `themes.primary_color`, which four
// of the ten have never changed off the admin form's default blue — see
// theme-landing-data.ts.
//
// The site's own cream/navy/butter tokens still own the furniture — header,
// footer, buttons — so the page reads as MatjarX showing you a theme, not
// as the theme having taken over matjarx.com.
//
// ── The preview is live ──────────────────────────────────────────────────
//
// Both mockups frame app.matjarx.com/themes/<key>, which renders the
// theme's real pages. Not a screenshot: it scrolls, the links work, and it
// cannot go stale when the theme is edited. That route is noindex precisely
// so this page is the one that ranks.

import Link from 'next/link'
import { CITY_DATA, type CityKey } from '@/lib/location-data'
import { routes } from '@/lib/routes'
import type { ThemeLanding } from '@/lib/theme-landing-data'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

// Environment-aware so the previews are real in development. Hardcoding
// production meant every mockup on localhost framed app.matjarx.com, which
// does not have /themes/<key> until this ships — so the whole page rendered
// with two 404s in it and there was no way to check the layout locally.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.matjarx.com'

type Props = { landing: ThemeLanding }

export default function ThemeLandingContent({ landing }: Props) {
  const previewUrl = `${APP_URL}/themes/${landing.themeKey}`
  // ?framed=1 drops the app's "this is a template" banner, which is noise
  // inside a mockup on a page already headed "Website template".
  const framedUrl = `${previewUrl}?framed=1`

  return (
    <div style={{ ['--theme-primary' as string]: landing.primary, ['--theme-secondary' as string]: landing.accent }}>
      {/* These ten pages shipped with no SiteHeader and no SiteFooter at
          all -- the only pages on the site without them. A visitor arriving
          from search had no navigation off the page and no legal links,
          and the footer's city and industry rows are a chunk of the
          internal linking every other page contributes. */}
      <SiteHeader active="examples" />
      <main>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)', padding: '64px 24px 0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <nav style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 22 }}>
            <Link href="/templates" style={{ color: 'var(--olive)', fontWeight: 600 }}>
              Templates
            </Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span>{landing.name}</span>
          </nav>

          <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'minmax(0, 1fr)', alignItems: 'start' }} className="theme-landing-hero">
            <div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: '1.6px',
                  textTransform: 'uppercase',
                  color: 'var(--ink-inverse)',
                  background: 'var(--theme-primary)',
                  marginBottom: 18,
                }}
              >
                Website template
              </span>
              <h1
                style={{
                  margin: '0 0 14px',
                  fontFamily: 'var(--font-lato), Lato, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(32px, 5.2vw, 52px)',
                  lineHeight: 1.06,
                  letterSpacing: '-0.5px',
                  color: 'var(--ink-1)',
                }}
              >
                {landing.name}
              </h1>
              <p style={{ margin: '0 0 26px', fontSize: 17.5, lineHeight: 1.6, color: 'var(--ink-4)', maxWidth: '34em' }}>
                {landing.tagline}
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href={routes.pricing} className="btn-primary">
                  Get this site
                </Link>
                <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Open live preview
                </a>
              </div>

              <p style={{ margin: '20px 0 0', fontSize: 13.5, color: 'var(--ink-muted)' }}>
                Live in seven days · Every page editable · No commission on sales
              </p>
            </div>

            {/* Device mockups — desktop behind, phone in front. */}
            <div className="theme-landing-devices">
              <div className="theme-landing-desktop" style={{ borderColor: 'var(--theme-primary)' }}>
                <div className="theme-landing-chrome">
                  <span /><span /><span />
                  <em>{previewUrl.replace('https://', '')}</em>
                </div>
                <div className="theme-landing-viewport">
                  <iframe
                    src={framedUrl}
                    title={`${landing.name} — desktop preview`}
                    loading="lazy"
                    scrolling="no"
                  />
                </div>
              </div>
              <div className="theme-landing-phone" style={{ borderColor: 'var(--theme-primary)' }}>
                <div className="theme-landing-viewport theme-landing-viewport-phone">
                  <iframe
                    src={framedUrl}
                    title={`${landing.name} — mobile preview`}
                    loading="lazy"
                    scrolling="no"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What makes this one different ──────────────────────────── */}
      <section style={{ background: 'var(--cream)', padding: '78px 24px 0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <h2 style={sectionHeading}>Built for this trade, not adapted to it</h2>
          <div className="theme-landing-grid-3">
            {landing.highlights.map((h) => (
              <div
                key={h.title}
                style={{
                  padding: '26px 24px',
                  borderRadius: 18,
                  background: 'var(--surface)',
                  border: '1px solid rgba(var(--ink-1-rgb), 0.08)',
                  boxShadow: '0 10px 30px rgba(var(--ink-1-rgb), 0.05)',
                }}
              >
                <span
                  aria-hidden
                  style={{ display: 'block', width: 34, height: 4, borderRadius: 999, background: 'var(--theme-secondary)', marginBottom: 16 }}
                />
                <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 17, color: 'var(--ink-1)' }}>
                  {h.title}
                </h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.62, color: 'var(--ink-4)' }}>{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pages included ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)', padding: '72px 24px 0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <h2 style={sectionHeading}>Every page, ready on day one</h2>
          <p style={{ margin: '0 0 26px', fontSize: 15.5, lineHeight: 1.62, color: 'var(--ink-4)', maxWidth: '46em' }}>
            Written, laid out and filled in before you see it. You edit anything you want to change — our team does it for
            you if you would rather not.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {landing.pages.map((p) => (
              <span
                key={p}
                style={{
                  padding: '10px 18px',
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--ink-2)',
                  background: 'var(--surface)',
                  border: '1px solid rgba(var(--ink-1-rgb), 0.1)',
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cities ─────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)', padding: '72px 24px 0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <h2 style={sectionHeading}>Built for businesses across Pakistan</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15.5, lineHeight: 1.62, color: 'var(--ink-4)', maxWidth: '46em' }}>
            We build, host and look after the site wherever you are. Delivery, payments and support all work the same in
            every city.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {landing.cities
              .filter((c): c is CityKey => c in CITY_DATA)
              .map((c) => (
                <Link
                  key={c}
                  href={routes.location(c)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 999,
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: 'var(--olive)',
                    background: 'rgba(112,117,56,0.1)',
                  }}
                >
                  {CITY_DATA[c].name} →
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ── Industry cross-link, where one exists ──────────────────── */}
      {landing.industryHref && (
        <section style={{ padding: '72px 24px 0' }}>
          <div
            style={{
              maxWidth: 1180,
              margin: '0 auto',
              padding: '30px 30px',
              borderRadius: 20,
              background: 'rgba(112,117,56,0.08)',
              border: '1px solid rgba(112,117,56,0.18)',
            }}
          >
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.62, color: 'var(--ink-3)' }}>
              Want the full case first — what it costs, what is included, how long it takes?{' '}
              <Link href={landing.industryHref} style={{ color: 'var(--olive)', fontWeight: 700 }}>
                Read about websites for {landing.industryLabel}
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      {/* ── Close ──────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 24px 90px' }}>
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '54px 32px',
            borderRadius: 26,
            textAlign: 'center',
            background: 'var(--theme-primary)',
          }}
        >
          <h2
            style={{
              margin: '0 0 12px',
              fontFamily: 'var(--font-lato), Lato, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(24px, 3.6vw, 34px)',
              color: 'var(--ink-inverse)',
            }}
          >
            Start with {landing.name}
          </h2>
          <p style={{ margin: '0 auto 26px', maxWidth: '38em', fontSize: 16, lineHeight: 1.6, color: 'rgba(var(--ink-inverse-rgb), 0.84)' }}>
            Tell us about your business and we build this out with your products, your photos and your words. Online in
            seven days.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={routes.pricing} className="btn-primary">
              See plans
            </Link>
            <Link href="/templates" className="btn-ghost">
              Browse other templates
            </Link>
          </div>
        </div>
      </section>
      </main>
      <SiteFooter />
    </div>
  )
}

const sectionHeading: React.CSSProperties = {
  margin: '0 0 14px',
  fontFamily: 'var(--font-lato), Lato, sans-serif',
  fontWeight: 900,
  fontSize: 'clamp(23px, 3.4vw, 32px)',
  letterSpacing: '-0.3px',
  color: 'var(--ink-1)',
}
