'use client'

// Site Footer — from Site Footer.dc.html. Two parts: the CTA band and the
// dark footer with brand column + 4 link columns.

import Link from 'next/link'
import Image from 'next/image'
import { FOOTER_COLUMNS, FOOTER_SOCIALS } from '@/lib/nav'
import { routes, appSignup } from '@/lib/routes'
import { trackEvent } from '@/lib/analytics'

export default function SiteFooter() {
  return (
    <div>
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 78px' }}>
        <div
          style={{
            padding: '58px 48px',
            borderRadius: 30,
            background: 'linear-gradient(150deg, rgba(244,242,174,0.9), rgba(198,203,138,0.9))',
            border: '1px solid rgba(255,255,255,0.7)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 26px 60px rgba(112,117,56,0.24), inset 0 1px 0 rgba(255,255,255,0.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
            textAlign: 'center',
          }}
        >
          <h2 style={{ margin: 0, maxWidth: '22em', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 40, lineHeight: 1.08, letterSpacing: '-1.4px', color: '#1F2A08' }}>
            Professional websites, ready in just 7 days.
          </h2>
          <p style={{ margin: 0, maxWidth: '34em', fontSize: 16.5, lineHeight: 1.6, color: '#3D4A16' }}>Built by a real team, with unmatched customer support.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingTop: 8 }}>
            <a
              href={appSignup()}
              onClick={() => trackEvent('cta_click', { label: 'footer_get_started' })}
              style={{ padding: '17px 32px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, color: '#FFFFFF', background: 'linear-gradient(160deg, #10293D, #04121F)', boxShadow: '0 12px 26px rgba(4,18,31,0.28), inset 0 1px 0 rgba(255,255,255,0.18)' }}
              className="footer-cta-primary"
            >
              Get started
            </a>
            <a
              href="https://wa.me/923033720953"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '17px 30px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, color: '#1F2A08', background: 'rgba(255,255,255,0.62)', border: '1.5px solid rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)' }}
              className="footer-cta-secondary"
            >
              Talk to us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer style={{ background: 'linear-gradient(168deg, #04121F 0%, #001C33 100%)', padding: '62px 24px 34px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(200px, 1.4fr) repeat(auto-fit, minmax(148px, 1fr))', gap: '40px 30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            <Image src="/brand/matjarx-logo-light.png" alt="MatjarX" width={148} height={40} style={{ width: 148, height: 'auto' }} />
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.55)', maxWidth: '26em' }}>
              Done-for-you websites, SEO and growth marketing for small businesses across Pakistan and the Gulf.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 4 }}>
              <a href="tel:+923033720953" style={{ fontSize: 13.5, color: 'var(--butter)' }}>+92 303 372 0953</a>
              <a href="mailto:office@matjarx.com" style={{ fontSize: 13.5, color: 'var(--butter)' }}>office@matjarx.com</a>
            </div>
            <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
              {FOOTER_SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  title={s.name}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="footer-social"
                  style={{ width: 34, height: 34, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(18px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16)' }}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: 13, minWidth: 0 }}>
              <span style={{ fontSize: 11, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)', fontWeight: 600 }}>{col.title}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href} className="footer-link" style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.72)' }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 1200, margin: '44px auto 0', paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.42)', marginRight: 'auto' }}>&copy; 2018&ndash;2026 MatjarX. All rights reserved.</span>
          <Link href={routes.legal('terms')} className="footer-link" style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)' }}>Terms &amp; conditions</Link>
          <Link href={routes.legal('refund')} className="footer-link" style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)' }}>Refund policy</Link>
          <Link href={routes.legal('privacy')} className="footer-link" style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)' }}>Privacy &amp; cookies</Link>
        </div>
      </footer>
    </div>
  )
}
