'use client'

// Real content, verbatim from files/matjarx_alternatives_main_hub.md —
// see src/lib/alternatives-data.ts for the source-of-truth groups/copy.

import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import { routes } from '@/lib/routes'
import { HERO, GROUPS, WHY_COMPARE, CANT_FIND, CLOSING } from '@/lib/alternatives-data'
import { PLATFORM_LOGOS } from '@/lib/platform-logos-data'

export type AlternativesContentShape = { hero: typeof HERO; groups: typeof GROUPS; whyCompare: typeof WHY_COMPARE }
const DEFAULT_CONTENT: AlternativesContentShape = { hero: HERO, groups: GROUPS, whyCompare: WHY_COMPARE }

export default function AlternativesContent({ content = DEFAULT_CONTENT }: { content?: AlternativesContentShape }) {
  const HERO_ACTIVE = content.hero
  const GROUPS_ACTIVE = content.groups
  const WHY_COMPARE_ACTIVE = content.whyCompare
  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="resources" />

      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '58px 24px 52px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>Compare your options</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 5vw, 46px)', lineHeight: 1.14, letterSpacing: '-1.5px', color: '#FFFFFF' }}>{HERO_ACTIVE.h1}</h1>
          {HERO_ACTIVE.intro.map((p, i) => (
            <p key={i} style={{ margin: 0, maxWidth: '34em', fontSize: 16.5, lineHeight: 1.62, color: 'rgba(255,255,255,0.72)' }}>{p}</p>
          ))}
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <AmbientOrbs />
        <div className="page-content">

          {GROUPS_ACTIVE.map((group) => (
            <section key={group.title} style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 24px 0' }}>
              <h2 style={{ margin: '0 0 6px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.6vw, 26px)', letterSpacing: '-0.6px', color: '#04121F' }}>{group.title}</h2>
              <p style={{ margin: '0 0 22px', fontSize: 14.5, color: '#4B5D6E' }}>{group.intro}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 14 }}>
                {group.links.map((link) => (
                  <Link key={link.key} href={routes.compare(link.key)} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '20px 22px 22px', borderRadius: 18 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      {PLATFORM_LOGOS[link.label] && (
                        <span style={{ position: 'relative', width: 20, height: 20, flex: '0 0 auto' }}>
                          <Image src={PLATFORM_LOGOS[link.label]} alt="" fill sizes="20px" style={{ objectFit: 'contain' }} />
                        </span>
                      )}
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 15.5, color: '#04121F' }}>MatjarX vs {link.label}</span>
                    </span>
                    {link.blurb ? (
                      <span style={{ fontSize: 13, lineHeight: 1.5, color: '#4B5D6E' }}>{link.blurb}</span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* Why Compare? */}
          <section style={{ maxWidth: 1400, margin: '0 auto', padding: '66px 24px 0' }}>
            <h2 style={{ margin: '0 0 22px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.6vw, 26px)', letterSpacing: '-0.6px', color: '#04121F' }}>Why Compare?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 14 }}>
              {WHY_COMPARE_ACTIVE.map((item) => (
                <div key={item.title} className="glass-card" style={{ padding: '20px 22px 22px', borderRadius: 18 }}>
                  <span style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 15.5, color: 'var(--olive)' }}>{item.title}</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.55, color: '#4B5D6E' }}>{item.body}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Can't find your platform? */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 10px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.6vw, 26px)', letterSpacing: '-0.6px', color: '#04121F' }}>{CANT_FIND.title}</h2>
            <p style={{ margin: '0 0 16px', fontSize: 15, color: '#4B5D6E' }}>{CANT_FIND.body}</p>
            <p style={{ margin: 0, fontSize: 15 }}>
              <Link href={routes.contact} style={{ fontWeight: 700, color: 'var(--olive)' }}>{CANT_FIND.cta}</Link>
              <span style={{ color: '#4B5D6E' }}> {CANT_FIND.note}</span>
            </p>
          </section>

          {/* Closing CTA */}
          <section style={{ maxWidth: 1400, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ padding: 'clamp(28px, 4vw, 44px)', borderRadius: 26, background: '#04121F', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>{CLOSING.eyebrow}</span>
              <Link href={routes.contact} className="btn-primary">{CLOSING.cta}</Link>
              <p style={{ margin: 0, maxWidth: '32em', fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)' }}>{CLOSING.note}</p>
            </div>
          </section>

          <div style={{ height: 74 }} />
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
