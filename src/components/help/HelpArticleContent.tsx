'use client'

// Shared template for the 7 Help article pages. Each category in
// help-articles-data.ts is one long-form guide (steps, feature
// breakdowns, an FAQ, related-guide links) — this renders that
// structure generically: navy hero with breadcrumb, a glass-card per
// source section, an FAQ accordion, a related-guides chip row, and the
// same "talk to us" contact panel the Help hub uses.

import { useState, Fragment, type ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import { routes } from '@/lib/routes'
import { HELP_ARTICLES, type HelpSlug, type HelpBlock, type HelpArticle } from '@/lib/help-articles-data'
import { HELP_CHANNELS } from '@/lib/help-data'

// Turns the source markdown's inline **bold** and [text](url) into real
// <strong>/<a> nodes, so the generated data can stay plain strings.
function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const [, label, href] = linkMatch
      return <Link key={i} href={mapHref(href)} style={{ fontWeight: 600 }}>{label.replace(/\s*→\s*$/, '')}</Link>
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

function mapHref(href: string): string {
  const clean = href.replace(/\/$/, '')
  if (clean.startsWith('/help/')) return routes.helpArticle(clean.slice('/help/'.length))
  if (clean === '/plans') return routes.pricing
  if (clean === '/refund-policy') return routes.legal('refund')
  if (clean === '/terms-and-conditions') return routes.legal('terms')
  if (clean === '/privacy-policy') return routes.legal('privacy')
  if (clean === '/about-us') return routes.about
  if (clean === '/contact') return routes.contact
  if (clean === '' || clean === '/') return routes.home
  return clean || '/'
}

function renderBlock(block: HelpBlock, i: number) {
  if (block.type === 'h3') {
    return <h3 key={i} style={{ margin: '4px 0 0', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 17.5, letterSpacing: '-0.3px', color: '#04121F' }}>{block.text}</h3>
  }
  if (block.type === 'h4') {
    return <h4 key={i} style={{ margin: '2px 0 0', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: '#1B4B6E' }}>{block.text}</h4>
  }
  if (block.type === 'p') {
    return <p key={i} style={{ margin: 0, fontSize: 14.5, lineHeight: 1.68, color: '#435A70' }}>{renderInline(block.text)}</p>
  }
  return (
    <ul key={i} style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {block.items.map((item, j) => {
        const isTick = item.startsWith('✅')
        const isCross = item.startsWith('❌')
        const clean = isTick || isCross ? item.replace(/^[✅❌]\s*/, '') : item
        return (
          <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14.5, lineHeight: 1.6, color: '#435A70' }}>
            <span style={{ flex: '0 0 auto', marginTop: 6, width: 5, height: 5, borderRadius: '50%', background: isTick ? '#6E8F3F' : isCross ? '#B5533C' : 'var(--olive)' }} />
            <span>{renderInline(clean)}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default function HelpArticleContent({ slug, content }: { slug: HelpSlug; content?: HelpArticle }) {
  const d = content ?? HELP_ARTICLES[slug]
  const [openFaq, setOpenFaq] = useState(0)

  const faqJsonLd = d.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: d.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      }
    : null

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <SiteHeader active="company" />

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '52px 24px 46px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>
            <Link href={routes.help} style={{ color: 'var(--moss-light)' }}>Help centre</Link>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Guide</span>
          </span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(27px, 4.6vw, 42px)', lineHeight: 1.1, letterSpacing: '-1.3px', color: '#FFFFFF' }}>{d.title}</h1>
          {d.intro && <p style={{ margin: 0, maxWidth: '34em', fontSize: 16, lineHeight: 1.62, color: 'rgba(255,255,255,0.72)' }}>{d.intro}</p>}
          {d.metaLines && d.metaLines.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 4 }}>
              {d.metaLines.map((m, i) => (
                <span key={i} style={{ fontSize: 12.5, fontWeight: 600, color: '#FFFFFF', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 999, padding: '7px 14px' }}>{m}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <AmbientOrbs />
        <div className="page-content">

          {/* Hero image */}
          {d.heroImage && (
            <section style={{ maxWidth: 820, margin: '0 auto', padding: '36px 24px 0' }}>
              <div style={{ position: 'relative', width: '100%', height: 260, borderRadius: 22, overflow: 'hidden', boxShadow: '0 20px 44px rgba(4,18,31,0.14)' }}>
                <Image src={d.heroImage.src} alt={d.heroImage.alt} fill sizes="(max-width: 860px) 100vw, 820px" style={{ objectFit: 'cover' }} />
              </div>
            </section>
          )}

          {/* Sections */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '44px 24px 0', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {d.sections.map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: '26px 28px 28px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 21, letterSpacing: '-0.5px', color: '#04121F' }}>{s.heading}</h2>
                {s.blocks.map((b, j) => renderBlock(b, j))}
              </div>
            ))}
          </section>

          {/* FAQ */}
          {d.faqs.length > 0 && (
            <section style={{ maxWidth: 820, margin: '0 auto', padding: '46px 24px 0' }}>
              <span style={{ display: 'block', marginBottom: 18, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Frequently asked</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {d.faqs.map(([q, a], i) => {
                  const open = openFaq === i
                  return (
                    <div key={i} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden' }}>
                      <button type="button" onClick={() => setOpenFaq(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 22px' }}>
                        <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, lineHeight: 1.35, color: '#04121F', marginRight: 'auto', textAlign: 'left' }}>{q}</span>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#6A7F92" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                      </button>
                      {open && <p style={{ margin: 0, padding: '0 22px 20px', fontSize: 14.5, lineHeight: 1.68, color: '#435A70' }}>{a}</p>}
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Related guides */}
          {d.related.length > 0 && (
            <section style={{ maxWidth: 820, margin: '0 auto', padding: '46px 24px 0' }}>
              <span style={{ display: 'block', marginBottom: 16, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Keep exploring</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {d.related.map(([label, href], i) => (
                  <Link key={i} href={mapHref(href)} className="glass-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 18px', borderRadius: 999, fontSize: 13.5, fontWeight: 600, color: '#3B5063' }}>
                    {label} <span style={{ color: 'var(--olive)' }}>→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Talk to us */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 18 }}>
              {HELP_CHANNELS.slice(0, 3).map((c) => (
                <div key={c.title} style={{ display: 'flex', flexDirection: 'column', gap: 11, padding: '24px 24px 26px', borderRadius: 22, background: c.bg, border: `1.5px solid ${c.line}`, backdropFilter: 'blur(22px)', boxShadow: c.shadow }}>
                  <span style={{ width: 38, height: 38, borderRadius: 12, background: c.iconBg, display: 'grid', placeItems: 'center' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={c.iconInk} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
                  </span>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16.5, letterSpacing: '-0.3px', color: c.ink }}>{c.title}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: c.valueInk, wordBreak: 'break-word' }}>{c.value}</span>
                  <span style={{ fontSize: 12.5, lineHeight: 1.55, color: c.muted }}>{c.note}</span>
                </div>
              ))}
            </div>
          </section>

          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '38px 24px 0', textAlign: 'center' }}>
            <Link href={routes.help} style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--olive)' }}>← Back to the Help centre</Link>
          </section>

          <div style={{ height: 70 }} />
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
