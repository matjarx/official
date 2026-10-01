'use client'

// Templates & Examples page — real content, verbatim, from
// files/matjarx_templates_page.md. Templates live inside the app dashboard
// behind login; the 12 category cards stay real, honestly-worded content
// rather than fabricated thumbnails. TEMPLATE_PREVIEWS below are real
// preview renders (from matjarx.com's own media library) for 6 niches.

import { Suspense, useState } from 'react'
import Link from 'next/link'
import SiteChrome from '@/components/SiteChrome'
import FaqSchema, { fromPairs } from '@/components/FaqSchema'
import AmbientOrbs from '@/components/AmbientOrbs'
import { routes, appLogin } from '@/lib/routes'
import ThemeGrid from './ThemeGrid'
import ThemeModal from './ThemeModal'
import type { IndustryGroup, Theme } from '@/lib/theme-catalogue'
import {
  HERO, WHY_TEMPLATES, TEMPLATE_FEATURES, CATEGORIES, SELECTION_PROCESS,
  CUSTOMIZATION, POPULAR, TEMPLATE_UPDATES, MIGRATION, TEMPLATE_FAQS, RELATED,
  TEMPLATE_PREVIEWS, type IconCard,
} from '@/lib/templates-data'
import { FaqList } from '@/components/FaqList'

function IconCardGrid({ items, cols = 4 }: { items: IconCard[]; cols?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${cols >= 4 ? 250 : 220}px), 1fr))`, gap: 16 }}>
      {items.map((c) => (
        <div key={c.title} className="glass-card" style={{ padding: '24px 24px 26px', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--navy)', display: 'grid', placeItems: 'center' }}>
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="var(--butter)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
          </span>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, letterSpacing: '-0.3px', color: 'var(--ink-1)' }}>{c.title}</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {c.body.map((b) => (
              <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-5)' }}>
                <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--olive)', flex: '0 0 auto' }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export type TemplatesContentShape = { hero: typeof HERO; why: typeof WHY_TEMPLATES; features: typeof TEMPLATE_FEATURES; categories: typeof CATEGORIES; faqs: typeof TEMPLATE_FAQS; previews: typeof TEMPLATE_PREVIEWS }
const DEFAULT_CONTENT: TemplatesContentShape = { hero: HERO, why: WHY_TEMPLATES, features: TEMPLATE_FEATURES, categories: CATEGORIES, faqs: TEMPLATE_FAQS, previews: TEMPLATE_PREVIEWS }

export default function TemplatesContent({
  content = DEFAULT_CONTENT,
  themes = [],
  groups = [],
}: {
  content?: TemplatesContentShape
  /** Live rows from the platform's `themes` table. Empty if it is unreachable. */
  themes?: Theme[]
  groups?: IndustryGroup[]
}) {
  const [openFaq, setOpenFaq] = useState(0)
  // A theme is walkable when it has a landing page, which frames its real
  // pages. demoUrl was the old test and it has always been false for every
  // theme — the demo sites it pointed at are empty shells — which is why
  // this page has promised a preview it could not show.
  const hasLiveDemo = themes.some((t) => !!t.landingHref || !!t.demoUrl)
  const HERO_ACTIVE = content.hero
  const WHY_TEMPLATES_ACTIVE = content.why
  const TEMPLATE_FEATURES_ACTIVE = content.features
  const TEMPLATE_FAQS_ACTIVE = content.faqs

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'clip' }}>
      <SiteChrome active="resources">

      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '58px 24px 56px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>100+ designs, ready to launch</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.1, letterSpacing: '-1.7px', color: 'var(--ink-inverse)' }}>{HERO_ACTIVE.headline}</h1>
          <p style={{ margin: 0, maxWidth: '32em', fontSize: 16.5, lineHeight: 1.62, color: 'rgba(var(--ink-inverse-rgb), 0.72)' }}>{HERO_ACTIVE.subhead}</p>
          <a href={appLogin} className="btn-primary" style={{ marginTop: 4 }}>{HERO_ACTIVE.cta}</a>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <AmbientOrbs />
        <div className="page-content">

          {/* Templates by industry — the real themes, from the
              platform's own table. This was twelve "template categories"
              (Small Business, Service Business, Blog, Corporate) written
              before any theme existed: none of them corresponded to
              anything a visitor could be shown or a client could pick,
              and the accordion made you open each one to find that out.
              The themes are real, they carry their own industries and
              demo sites, and this list cannot go stale. */}
          <section style={{ maxWidth: 1360, margin: '0 auto', padding: '66px 24px 0' }} id="browse">
            <span style={{ display: 'block', marginBottom: 8, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Browse by industry</span>
            <h2 style={{ margin: '0 0 8px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: 'var(--ink-1)' }}>Templates, by the trade they were built for</h2>
            {/* Conditional, because it is a claim. The preview frames the
                real demo site — but only two themes are finished and none
                of the six demo sites has any content in it yet, so today
                every card opens to its details. Saying "scroll the real
                site" over a page that cannot yet do that is the kind of
                copy that makes the rest of the page less believable. */}
            <p style={{ margin: '0 0 28px', maxWidth: '44em', fontSize: 15.5, lineHeight: 1.62, color: 'var(--ink-4)' }}>
              {hasLiveDemo
                ? 'Open any one and you get the real thing — the template on a desktop and a phone, every page it ships with, and what it costs to have it built for you.'
                : 'Open any one to see what it is built for and what it includes. Live previews are being fitted out now — ask us and we will walk you through one.'}
            </p>
            {groups.length > 0 ? (
              <>
                {/* Grid on the server; only the modal reads the URL. */}
                <ThemeGrid groups={groups} />
                <Suspense fallback={null}>
                  <ThemeModal themes={themes} />
                </Suspense>
              </>
            ) : (
              <p style={{ margin: 0, fontSize: 15, color: 'var(--ink-muted)' }}>
                The template list is loading from your dashboard. <Link href={appLogin} style={{ color: 'var(--olive)', fontWeight: 700 }}>Sign in</Link> to browse them all.
              </p>
            )}
          </section>

          {/* Why use templates */}
          <section style={{ maxWidth: 1360, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', marginBottom: 8, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>About our templates</span>
            <h2 style={{ margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: 'var(--ink-1)' }}>Why use templates?</h2>
            <IconCardGrid items={WHY_TEMPLATES_ACTIVE} />
          </section>

          {/* Template features */}
          <section style={{ maxWidth: 1360, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', marginBottom: 8, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Template features</span>
            <h2 style={{ margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: 'var(--ink-1)' }}>What every template includes</h2>
            <IconCardGrid items={TEMPLATE_FEATURES_ACTIVE} cols={5} />
          </section>

          {/* Selection process */}
          <section style={{ maxWidth: 1360, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', marginBottom: 8, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>How to choose your template</span>
            <h2 style={{ margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: 'var(--ink-1)' }}>Template selection process</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 18 }}>
              {SELECTION_PROCESS.map((s) => (
                <div key={s.n} className="glass-card" style={{ padding: '26px 24px', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 32, lineHeight: 1, color: 'var(--moss-light)' }}>{s.n}</span>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, color: 'var(--ink-1)' }}>{s.title}</h3>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-5)' }}>{s.lead}</span>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {s.items.map((it) => (
                      <li key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-5)' }}>
                        <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--olive)', flex: '0 0 auto' }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Customization */}
          <section style={{ maxWidth: 1360, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', marginBottom: 8, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Making templates your own</span>
            <h2 style={{ margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: 'var(--ink-1)' }}>Template customization</h2>
            <IconCardGrid items={CUSTOMIZATION} />
          </section>

          {/* Popular templates */}
          <section style={{ maxWidth: 1360, margin: '0 auto', padding: '66px 24px 0' }}>
            <span style={{ display: 'block', marginBottom: 8, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Most used templates</span>
            <h2 style={{ margin: '0 0 26px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: 'var(--ink-1)' }}>Popular templates</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 16 }}>
              {POPULAR.map((p) => (
                <div key={p.name} style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(var(--ink-1-rgb), 0.08)', boxShadow: '0 10px 26px rgba(var(--scrim-rgb), 0.08)' }}>
                  <div style={{ height: 84, background: p.tint }} />
                  <div style={{ padding: '18px 20px 20px', background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, color: 'var(--ink-1)' }}>{p.name}</span>
                    <span style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>{p.used}</span>
                    <span style={{ fontSize: 13, color: 'var(--ink-5)' }}>{p.features}</span>
                    <div style={{ display: 'flex', gap: 8, paddingTop: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, color: 'var(--ink-on-butter-alt)', background: 'var(--butter)' }}>{p.rating}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, color: 'var(--olive)', background: 'rgba(var(--olive-rgb), 0.12)' }}>{p.launch}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Updates + migration */}
          <section style={{ maxWidth: 1360, margin: '0 auto', padding: '66px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 20 }}>
            <div className="glass-card" style={{ padding: '28px 26px', borderRadius: 22 }}>
              <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 19, color: 'var(--ink-1)' }}>{TEMPLATE_UPDATES.title}</h3>
              <p style={{ margin: '0 0 12px', fontSize: 13.5, color: 'var(--ink-5)' }}>{TEMPLATE_UPDATES.intro}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                {TEMPLATE_UPDATES.items.map((it) => (
                  <li key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, color: 'var(--ink-5)' }}>
                    <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--olive)', flex: '0 0 auto' }} />{it}
                  </li>
                ))}
              </ul>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--olive)' }}>{TEMPLATE_UPDATES.note}</span>
            </div>
            <div className="glass-card" style={{ padding: '28px 26px', borderRadius: 22 }}>
              <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 19, color: 'var(--ink-1)' }}>{MIGRATION.title}</h3>
              <p style={{ margin: '0 0 12px', fontSize: 13.5, color: 'var(--ink-5)' }}>{MIGRATION.intro}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                {MIGRATION.items.map((it) => (
                  <li key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, color: 'var(--ink-5)' }}>
                    <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--olive)', flex: '0 0 auto' }} />{it}
                  </li>
                ))}
              </ul>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--olive)' }}>{MIGRATION.note}</span>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
            <h2 style={{ margin: '0 0 26px', textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', letterSpacing: '-1px', color: 'var(--ink-1)' }}>Frequently asked questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <FaqList items={TEMPLATE_FAQS_ACTIVE.map(([q, a]) => ({ q, a }))} openIdx={openFaq} onToggle={setOpenFaq} />
            </div>
          </section>

          {/* Support */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.8vw, 26px)', color: 'var(--ink-1)' }}>Questions about templates?</h2>
            <p style={{ margin: 0, fontSize: 14.5, color: 'var(--ink-5)' }}>WhatsApp / phone +92 303 372 0953 · office@matjarx.com · Monday–Saturday, 11 AM–8 PM PKT</p>
          </section>

          {/* Closing CTA */}
          <section style={{ maxWidth: 1400, margin: '0 auto', padding: '46px 24px 0' }}>
            <div style={{ padding: 'clamp(28px, 4vw, 44px)', borderRadius: 26, background: 'var(--navy-deepest)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.8vw, 32px)', lineHeight: 1.18, letterSpacing: '-1px', color: 'var(--ink-inverse)' }}>Browse templates now</h2>
              <p style={{ margin: 0, maxWidth: '30em', fontSize: 15, lineHeight: 1.6, color: 'rgba(var(--ink-inverse-rgb), 0.65)' }}>All templates are available in your MatjarX dashboard.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingTop: 6 }}>
                <a href={appLogin} className="btn-primary">Login &amp; Browse Templates</a>
                <Link href={routes.pricing} className="btn-ghost">Choose Your Plan</Link>
              </div>
            </div>
          </section>

          {/* Related */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '46px 24px 0', display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {RELATED.map((r) => (
              <Link key={r.href} href={r.href} style={{ padding: '10px 18px', borderRadius: 999, fontSize: 13.5, fontWeight: 600, color: 'var(--olive)', background: 'rgba(var(--olive-rgb), 0.1)' }}>{r.label} →</Link>
            ))}
          </section>

          <div style={{ height: 74 }} />
          {/* The questions were on the page and nowhere in the structured data. */}
          <FaqSchema faqs={fromPairs(TEMPLATE_FAQS_ACTIVE)} />
        </div>
      </div>
      </SiteChrome>
    </div>
  )
}
