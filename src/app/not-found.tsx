// The site's real 404 — Next.js renders this automatically for any
// unmatched route (and for any page's own notFound() call), replacing
// its plain default fallback. Built to match every other page's shape
// (SiteHeader, orb-field + page-content, SiteFooter) rather than a bare
// unstyled error screen, since the sitewide header/footer suddenly
// disappearing would look broken, not "on brand."

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { routes } from '@/lib/routes'

// noindex: a 404 has no content of its own worth ranking, and without
// this Google can end up indexing whatever URL happened to 404 under
// this same rendered page.
export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
}

const QUICK_LINKS = [
  { title: 'Pricing', body: 'Compare Launch, Boost, Growth and Platinum plans.', href: routes.pricing },
  { title: 'Website examples', body: 'See real client sites we’ve built.', href: routes.websiteExamples },
  { title: 'Help Center', body: 'Answers to common questions about your site.', href: routes.help },
  { title: 'Contact us', body: 'Reach a real person on WhatsApp, call or email.', href: routes.contact },
]

export default function NotFound() {
  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="home" />

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '66px 24px 60px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 15, letterSpacing: '2px', padding: '9px 18px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', color: 'var(--moss-light)' }}>404</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5.4vw, 48px)', lineHeight: 1.08, letterSpacing: '-1.7px', color: '#FFFFFF' }}>We can&rsquo;t find that page</h1>
          <p style={{ margin: 0, maxWidth: '30em', fontSize: 17.5, lineHeight: 1.62, color: 'rgba(255,255,255,0.75)' }}>
            It may have been moved, renamed, or never existed. Let&rsquo;s get you back on track.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingTop: 4 }}>
            <Link href={routes.home} className="btn-primary">Back to homepage</Link>
            <Link href={routes.contact} className="btn-secondary">Contact support</Link>
          </div>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <div className="orb-field">
          <div style={{ position: 'absolute', width: 720, height: 720, right: -190, top: 60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,170,215,0.32) 0%, rgba(120,170,215,0) 68%)' }} />
          <div style={{ position: 'absolute', width: 780, height: 780, left: '20%', top: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,242,174,0.36) 0%, rgba(244,242,174,0) 70%)' }} />
        </div>
        <div className="page-content">

          {/* Quick links */}
          <section style={{ maxWidth: 1400, margin: '0 auto', padding: '54px 24px 0' }}>
            <h2 style={{ margin: '0 0 24px', textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 26, letterSpacing: '-0.9px', color: '#04121F' }}>Or try one of these</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 18 }}>
              {QUICK_LINKS.map((l) => (
                <Link key={l.title} href={l.href} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '24px 26px', borderRadius: 20 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, letterSpacing: '-0.3px', color: '#04121F' }}>{l.title}</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.58, color: 'var(--ink-4-alt)' }}>{l.body}</span>
                </Link>
              ))}
            </div>
          </section>

          <div style={{ height: 74 }} />
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
