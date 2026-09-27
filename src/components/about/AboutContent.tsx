'use client'

// About page — from Marketing - About.dc.html. Navy hero, a stats
// strip overlapping the hero band, story two-column with photo
// placeholders, values grid, team grid, an "About MatjarX" FAQ
// accordion, a dark "want to work with us?" CTA panel.

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import FaqSchema, { fromPairs } from '@/components/FaqSchema'
import AmbientOrbs from '@/components/AmbientOrbs'
import { routes } from '@/lib/routes'
import { ABOUT_STATS, ABOUT_VALUES, ABOUT_TEAM, ABOUT_FAQS } from '@/lib/about-data'
import { FaqList } from '@/components/FaqList'

export type AboutContentShape = { stats: typeof ABOUT_STATS; values: typeof ABOUT_VALUES; team: typeof ABOUT_TEAM; faqs: typeof ABOUT_FAQS }
const DEFAULT_CONTENT: AboutContentShape = { stats: ABOUT_STATS, values: ABOUT_VALUES, team: ABOUT_TEAM, faqs: ABOUT_FAQS }

export default function AboutContent({ content = DEFAULT_CONTENT }: { content?: AboutContentShape }) {
  const [openFaq, setOpenFaq] = useState(0)
  const { stats: ABOUT_STATS_ACTIVE, values: ABOUT_VALUES_ACTIVE, team: ABOUT_TEAM_ACTIVE, faqs: ABOUT_FAQS_ACTIVE } = content

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'clip' }}>
      <SiteHeader active="company" />

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '62px 24px 56px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>About MatjarX</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(31px, 5.8vw, 52px)', lineHeight: 1.08, letterSpacing: '-1.8px', color: '#FFFFFF' }}>
            We think every business deserves to be <span style={{ background: 'var(--moss-light)', color: '#16210B', padding: '0 10px', borderRadius: 3 }}>findable</span>
          </h1>
          <p style={{ margin: 0, maxWidth: '34em', fontSize: 17, lineHeight: 1.62, color: 'rgba(255,255,255,0.72)' }}>Not just the ones who can afford an agency, or who have the spare evenings to learn a website builder.</p>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <AmbientOrbs />
        <div className="page-content">

          {/* Stats strip, overlapping the hero */}
          <section style={{ maxWidth: 1360, margin: '0 auto', padding: 0 }}>
            <div style={{ maxWidth: 1300, margin: '-34px auto 0', padding: '0 24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(50%, 200px), 1fr))', gap: 2, borderRadius: 22, overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(4,18,31,0.09)', boxShadow: '0 20px 46px rgba(4,18,31,0.1)' }}>
                {ABOUT_STATS_ACTIVE.map((s) => (
                  <div key={s.label} style={{ padding: '30px 26px', display: 'flex', flexDirection: 'column', gap: 6, background: '#FFFFFF' }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 34, letterSpacing: '-1.2px', color: '#04121F' }}>{s.value}</span>
                    <span style={{ fontSize: 13.5, color: '#5A6E81' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Our story */}
          <section style={{ maxWidth: 1300, margin: '0 auto', padding: '74px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 48, alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
                <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Our story</span>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.3px', color: '#04121F' }}>It started with a question we couldn&rsquo;t answer well</h2>
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: '#33485B' }}>A fabric wholesaler in Faisalabad asked us what a website would cost him. The honest answer at the time was uncomfortable: either several hundred thousand rupees to an agency, or a year of his own evenings learning a builder he would probably abandon.</p>
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: '#33485B' }}>Neither answer was reasonable for a business doing solid trade with twelve staff. So we built the option that should have existed: a fixed price, a fixed timeline, and a team that does the work.</p>
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: '#33485B' }}>Eight years later we&rsquo;ve built 70,000+ websites. The model hasn&rsquo;t changed much — you tell us about your business, we build the whole thing, and we stay on to keep it working.</p>
              </div>
              {/* The real team photo, where a gradient box saying "Team
                  photo" used to sit. The two smaller gradient panels under
                  it went with it — they were placeholders for pictures that
                  were never taken, and two empty coloured rectangles under a
                  real photograph look like something failed to load.

                  aspectRatio rather than a fixed height: the source is
                  1400x933 and a fixed 300px box would have cropped it to a
                  letterbox, which is what happens to the team cards further
                  down this page. */}
              <div style={{ minWidth: 0 }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1400 / 933', borderRadius: 22, overflow: 'hidden', boxShadow: '0 20px 48px rgba(4,18,31,0.14)' }}>
                  <Image
                    src="/about/matjarx-team.webp"
                    alt="The MatjarX team together in the main office in Lahore, in navy MatjarX polo shirts, under the MatjarX &ldquo;Build. Launch. Scale.&rdquo; wall sign"
                    title="The MatjarX team at the main office"
                    fill
                    sizes="(max-width: 900px) 100vw, 640px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* What we believe */}
          <section style={{ background: 'var(--cream-deep)', padding: '76px 24px' }}>
            <div style={{ maxWidth: 1360, margin: '0 auto' }}>
              <div style={{ maxWidth: 640, margin: '0 auto 42px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.3px', color: '#04121F' }}>What we <span className="marker">believe</span></h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
                {ABOUT_VALUES_ACTIVE.map((v) => (
                  <div key={v.title} className="glass-card" style={{ padding: '30px 28px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 13 }}>
                    <span style={{ width: 44, height: 44, borderRadius: 13, background: 'var(--navy)', display: 'grid', placeItems: 'center' }}>
                      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="var(--butter)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={v.icon} /></svg>
                    </span>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 19, letterSpacing: '-0.35px', color: '#04121F' }}>{v.title}</h3>
                    <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.62, color: '#4B5D6E' }}>{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          <section style={{ maxWidth: 1360, margin: '0 auto', padding: '76px 24px' }}>
            <div style={{ maxWidth: 640, margin: '0 auto 42px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.3px', color: '#04121F' }}>The people behind it</h2>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#435A70' }}>A team of designers, writers, SEO specialists and concierges across Lahore and Karachi.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 20 }}>
              {ABOUT_TEAM_ACTIVE.map((t) => (
                <div key={t.name} style={{ borderRadius: 22, overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(4,18,31,0.08)' }}>
                  {/* Two things were wrong here.
                      The box was a fixed 210px tall and 422px wide — a 2:1
                      crop of a 1.29:1 photograph, which took the top off
                      everyone's head. aspectRatio 4/3 is close to the
                      source, so the crop is now a trim rather than a
                      decapitation, and objectPosition favours the upper
                      half where the faces are.
                      And sizes said 220px while the card renders at 422,
                      so Next served a 220px file into a box nearly twice
                      that and the browser upscaled it. That is why they
                      looked washed out. */}
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', background: t.photo ? undefined : t.tint, display: 'grid', placeItems: 'center' }}>
                    {t.photo ? (
                      <Image src={t.photo.src} alt={t.photo.alt} title={`${t.name} — ${t.role}`} fill sizes="(max-width: 700px) 100vw, 440px" style={{ objectFit: 'cover', objectPosition: '50% 22%' }} />
                    ) : (
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 30, letterSpacing: '-0.6px', color: 'rgba(255,255,255,0.92)' }}>{t.initials}</span>
                    )}
                  </div>
                  <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16.5, color: '#04121F' }}>{t.name}</span>
                    <span style={{ fontSize: 13, color: '#5A6E81' }}>{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* About FAQ */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px 76px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 30 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Questions about our company</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 32px)', lineHeight: 1.16, letterSpacing: '-1px', color: '#04121F' }}>About MatjarX</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <FaqList items={ABOUT_FAQS_ACTIVE.map(([q, a]) => ({ q, a }))} openIdx={openFaq} onToggle={setOpenFaq} itemKey={(_, i) => i} />
            </div>
          </section>

          {/* Want to work with us CTA */}
          <section style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px 76px' }}>
            <div style={{ padding: 'clamp(28px, 4vw, 44px) clamp(22px, 3.5vw, 46px)', borderRadius: 26, background: '#04121F', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 40, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.8vw, 32px)', lineHeight: 1.16, letterSpacing: '-1.1px', color: '#FFFFFF' }}>Want to work with us?</h2>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.62, color: 'rgba(255,255,255,0.65)' }}>We&rsquo;re hiring designers, copywriters and SEO specialists in Lahore — and we work with agencies and freelancers through our partner program.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
                <Link href={routes.careers} className="btn-primary" style={{ textAlign: 'center' }}>See open roles</Link>
                <Link href={routes.partner} className="btn-ghost">Become a partner</Link>
              </div>
            </div>
          </section>

          {/* The questions were on the page and nowhere in the structured data. */}

          <FaqSchema faqs={fromPairs(ABOUT_FAQS_ACTIVE)} />

          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
