'use client'

// Best Website Builder Pakistan page — from
// Marketing - Best Website Builder Pakistan.dc.html, reconciled against
// files/matjarx_best_website_builder_pakistan.md. Hero + stats, a
// 6-column comparison matrix (MatjarX/Shopify/Wix/Squarespace/GoDaddy/
// WordPress — the real content's actual competitor set), reasons grid,
// "when DIY is right" honest panel, vs-links to 4 comparison pages, FAQs.

import { Fragment, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import { routes } from '@/lib/routes'
import { HERO_STATS, COL_HEADS, MATRIX, PLATFORM_PROFILES, WIN_REASONS, CHOOSE_GUIDE, REASONS, DIY_CASES, VS_LINKS, BEST_BUILDER_FAQS } from '@/lib/best-builder-data'
import { PLATFORM_LOGOS } from '@/lib/platform-logos-data'

const TONE_COLOR = { us: 'var(--navy)', ok: '#3B5063', bad: '#B4874F' } as const

export type BestBuilderContentShape = { heroStats: typeof HERO_STATS; profiles: typeof PLATFORM_PROFILES; faqs: typeof BEST_BUILDER_FAQS }
const DEFAULT_CONTENT: BestBuilderContentShape = { heroStats: HERO_STATS, profiles: PLATFORM_PROFILES, faqs: BEST_BUILDER_FAQS }

export default function BestBuilderContent({ content = DEFAULT_CONTENT }: { content?: BestBuilderContentShape }) {
  const HERO_STATS_ACTIVE = content.heroStats
  const PLATFORM_PROFILES_ACTIVE = content.profiles
  const BEST_BUILDER_FAQS_ACTIVE = content.faqs
  const [openFaq, setOpenFaq] = useState(0)
  const [openProfile, setOpenProfile] = useState(0)

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <AmbientOrbs />
      <div className="page-content">
        <SiteHeader active="resources" />

        {/* Hero */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '58px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
          <span className="glass-chip" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 16px 8px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 600, color: '#3B5063' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--olive)' }} />
            Updated September 2026 · 70,000 websites built
          </span>

          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5.4vw, 56px)', lineHeight: 1.06, letterSpacing: '-2px', color: '#04121F' }}>
            The best website builder in Pakistan is the one <span className="marker">you don&rsquo;t have to use</span>
          </h1>

          <p style={{ margin: 0, maxWidth: '36em', fontSize: 'clamp(14.5px, 1.7vw, 17.5px)', lineHeight: 1.62, color: '#435A70' }}>
            Wix, Squarespace and GoDaddy all hand you a blank page. MatjarX hands you a finished website in seven days, from Rs. 22,500 — built by our team, with local payments, hosting and a real person on WhatsApp.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingTop: 4 }}>
            <Link href={routes.pricing} className="btn-primary">See plans &amp; pricing</Link>
            <a href="#compare" className="btn-secondary">Jump to the comparison</a>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', paddingTop: 18 }}>
            {HERO_STATS_ACTIVE.map((s) => (
              <div key={s.label} className="glass-chip" style={{ minWidth: 140, display: 'flex', flexDirection: 'column', gap: 4, padding: '16px 22px', borderRadius: 18 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 24, letterSpacing: '-0.8px', color: '#04121F' }}>{s.value}</span>
                <span style={{ fontSize: 12, color: '#5A6F82' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison matrix */}
        <section id="compare" style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 38 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>The six options</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.2vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>What you can actually choose from in Pakistan</h2>
          </div>

          <div className="glass-card" style={{ borderRadius: 26, overflow: 'hidden' }}>
            <div className="table-scroll">
              <div style={{ display: 'grid', gridTemplateColumns: `minmax(0, 1.4fr) repeat(${COL_HEADS.length}, minmax(110px, 0.8fr))`, minWidth: 980 }}>
                <span style={{ padding: '20px 22px', background: 'rgba(242,238,226,0.7)' }} />
                {COL_HEADS.map((h, i) => (
                  <span key={h} style={{ padding: '20px 12px', textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 13.5, letterSpacing: '-0.2px', color: i === 0 ? '#FFFFFF' : '#04121F', background: i === 0 ? 'var(--navy)' : 'rgba(242,238,226,0.7)' }}>{h}</span>
                ))}
                {MATRIX.map((row) => (
                  <Fragment key={row.label}>
                    <span style={{ padding: '15px 22px', fontSize: 14, lineHeight: 1.45, color: '#24384A', borderTop: '1px solid rgba(4,18,31,0.07)' }}>{row.label}</span>
                    {row.cells.map((cell, ci) => (
                      <span key={ci} style={{ padding: '15px 10px', textAlign: 'center', fontSize: 12.5, fontWeight: 600, color: TONE_COLOR[cell.tone], background: cell.tone === 'us' ? 'rgba(0,51,102,0.06)' : 'transparent', borderTop: '1px solid rgba(4,18,31,0.07)' }}>{cell.v}</span>
                    ))}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
          <p style={{ margin: '20px auto 0', maxWidth: 700, textAlign: 'center', fontSize: 13, lineHeight: 1.6, color: '#5A6F82' }}>Year 1 costs are the realistic total including the apps, payment workarounds and marketing help most businesses end up needing on top of the platform&rsquo;s own price.</p>
        </section>

        {/* Detailed breakdown — each platform explained */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 34 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Detailed breakdown</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.2vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>Each platform explained</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PLATFORM_PROFILES_ACTIVE.map((p, i) => {
              const open = openProfile === i
              return (
                <div key={p.name} className="glass-card" style={{ borderRadius: 20, overflow: 'hidden' }}>
                  <button type="button" onClick={() => setOpenProfile(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '20px 24px' }}>
                    {PLATFORM_LOGOS[p.name] && (
                      <span style={{ position: 'relative', width: 28, height: 28, flex: '0 0 auto' }}>
                        <Image src={PLATFORM_LOGOS[p.name]} alt="" fill sizes="28px" style={{ objectFit: 'contain' }} />
                      </span>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginRight: 'auto', minWidth: 0 }}>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 18, letterSpacing: '-0.4px', color: '#04121F' }}>{i + 1}. {p.name}</span>
                      <span style={{ fontSize: 13, color: '#5A6F82' }}>{p.tagline}</span>
                    </div>
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#5A6F82" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                  {open && (
                    <div style={{ padding: '0 24px 26px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                      <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.62, color: '#33485B' }}><strong>What it is:</strong> {p.what}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 28px' }}>
                        <span style={{ fontSize: 13.5, color: '#33485B' }}><strong>Pricing:</strong> {p.pricing}</span>
                        <span style={{ fontSize: 13.5, color: '#33485B' }}><strong>Best for:</strong> {p.bestFor}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--olive)' }}>Key strengths</span>
                          {p.strengths.map((s) => (
                            <span key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.5, color: '#33485B' }}>
                              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#3E8E5A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                              {s}
                            </span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#B4874F' }}>Key weaknesses</span>
                          {p.weaknesses.map((s) => (
                            <span key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.5, color: '#33485B' }}>
                              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#B4874F" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="M6 6l12 12M18 6 6 18" /></svg>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ padding: '16px 18px', borderRadius: 16, background: 'rgba(4,18,31,0.04)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#5A6F82' }}>Real Year 1 cost for a Pakistani business</span>
                        {p.costLines.map((l) => (
                          <span key={l} style={{ fontSize: 13.5, color: '#33485B' }}>{l}</span>
                        ))}
                        <span style={{ fontSize: 15, fontWeight: 700, color: '#04121F', paddingTop: p.costLines.length ? 4 : 0 }}>Total: {p.costTotal}</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--olive)' }}>Who should choose {p.name}</span>
                        {p.chooseIf.map((s) => (
                          <span key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.5, color: '#33485B' }}>
                            <span style={{ width: 5, height: 5, flex: '0 0 auto', marginTop: 6, borderRadius: '50%', background: 'var(--olive)' }} />
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Reasons grid */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: 20 }}>
            {REASONS.map((r) => (
              <div key={r.title} className="glass-card" style={{ padding: '26px 26px 28px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ width: 42, height: 42, borderRadius: 13, background: 'var(--navy)', display: 'grid', placeItems: 'center' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--butter)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={r.icon} /></svg>
                </span>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 18.5, letterSpacing: '-0.35px', color: '#04121F' }}>{r.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#4B5D6E' }}>{r.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why MatjarX wins — problem/solution pairs */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 38 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Why MatjarX wins for Pakistan</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.2vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>The same six problems, every global platform</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {WIN_REASONS.map((w, i) => (
              <div key={w.title} className="glass-card" style={{ padding: '24px 26px 26px', borderRadius: 22, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 20, alignItems: 'start' }}>
                <div style={{ display: 'flex', gap: 14, minWidth: 0 }}>
                  <span style={{ flex: '0 0 auto', width: 30, height: 30, borderRadius: '50%', background: 'rgba(4,18,31,0.06)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 13, color: '#5A6F82' }}>{i + 1}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 16.5, color: '#04121F' }}>{w.title}</span>
                    <span style={{ fontSize: 13.5, lineHeight: 1.55, color: '#5A6F82' }}>{w.problem}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, padding: '14px 18px', borderRadius: 16, background: 'rgba(0,51,102,0.05)', minWidth: 0 }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--navy)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 2 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                  <span style={{ fontSize: 14, lineHeight: 1.55, color: '#1B2E3F', fontWeight: 500 }}>{w.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who should choose each platform */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', marginBottom: 38 }}>
            <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Honest fit</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.2vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>Who should choose each platform?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))', gap: 18 }}>
            {CHOOSE_GUIDE.map((g) => (
              <div key={g.name} className="glass-card" style={{ padding: '24px 24px 26px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 12, ...(g.mine ? { background: 'var(--navy)', border: '1.5px solid var(--navy)' } : {}) }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 18, letterSpacing: '-0.4px', color: g.mine ? '#FFFFFF' : '#04121F' }}>Choose {g.name} if you&hellip;</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {g.points.map((p) => (
                    <span key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13.5, lineHeight: 1.5, color: g.mine ? 'rgba(255,255,255,0.82)' : '#4B5D6E' }}>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke={g.mine ? 'var(--moss-light)' : 'var(--olive)'} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* When DIY is right */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ padding: 'clamp(26px, 3.6vw, 44px)', borderRadius: 30, background: 'linear-gradient(160deg, rgba(0,51,102,0.96), rgba(0,28,51,0.96))', border: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(26px)', boxShadow: '0 34px 76px rgba(4,18,31,0.34), inset 0 1px 0 rgba(255,255,255,0.2)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(26px, 4vw, 42px)', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
              <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>Be honest with yourself</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#FFFFFF' }}>When a DIY builder genuinely is the right answer</h2>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: 'rgba(226,236,245,0.68)' }}>We&rsquo;d rather you picked correctly than picked us. If two or more of these are true, use Wix or Squarespace and keep your money.</p>
            </div>
            <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {DIY_CASES.map((c) => (
                <div key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '15px 17px', borderRadius: 15, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--moss-light)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: 'rgba(233,239,245,0.86)' }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Head to head */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 24px 0' }}>
          <span style={{ display: 'block', marginBottom: 22, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Head to head</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 18 }}>
            {VS_LINKS.map((v) => (
              <Link key={v.title} href={v.href} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '26px 28px 28px', borderRadius: 22 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 20, letterSpacing: '-0.5px', color: '#04121F' }}>{v.title}</span>
                <span style={{ fontSize: 13.5, lineHeight: 1.55, color: '#4B5D6E' }}>{v.body}</span>
                <span style={{ marginTop: 4, fontSize: 13, fontWeight: 600, color: 'var(--olive)' }}>Read the comparison →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '76px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 34, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 34px)', lineHeight: 1.14, letterSpacing: '-1.1px', color: '#04121F' }}>Common <span style={{ background: 'var(--butter)', padding: '0 8px', borderRadius: 3 }}>questions</span></h2>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#435A70' }}>Still deciding? Call +92 303 372 0953 and we&rsquo;ll tell you honestly which option fits.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
              {BEST_BUILDER_FAQS_ACTIVE.map(([question, answer], i) => {
                const open = openFaq === i
                return (
                  <div key={question} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden' }}>
                    <button type="button" onClick={() => setOpenFaq(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '19px 22px' }}>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, lineHeight: 1.35, color: '#04121F', marginRight: 'auto', textAlign: 'left' }}>{question}</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#5A6F82" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {open && <p style={{ margin: 0, padding: '0 22px 21px', fontSize: 14.5, lineHeight: 1.68, color: '#435A70' }}>{answer}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div style={{ height: 70 }} />
        <SiteFooter />
      </div>
    </div>
  )
}
