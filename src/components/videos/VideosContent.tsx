'use client'

// Videos page — from the "MatjarX Videos Page - Complete Content" the
// user shared directly, used in full: hero, 21 real videos across 7
// source sections, category cross-references (by purpose, by length,
// by audience), FAQ, closing CTAs. No video files or embed links were
// supplied, so each card shows an honest placeholder graphic (same
// convention as the blog post's "Article cover image" box) rather than
// a "Watch Now" link that doesn't actually play anything.

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import { routes } from '@/lib/routes'
import {
  HERO, INTRO, VIDEO_SECTIONS, CATEGORIES_BY_PURPOSE, CATEGORIES_BY_LENGTH,
  VIDEO_FAQS, RESOURCES_BY_AUDIENCE, CHANNELS,
} from '@/lib/videos-data'

function VideoCard({ video }: { video: (typeof VIDEO_SECTIONS)[number]['videos'][number] }) {
  return (
    <div className="glass-card" style={{ borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 140, background: 'linear-gradient(150deg, var(--navy), var(--olive))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <span style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.14)', display: 'grid', placeItems: 'center' }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="rgba(255,255,255,0.85)"><path d="M8 5v14l11-7z" /></svg>
        </span>
        <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.4px', color: 'rgba(255,255,255,0.7)' }}>Video coming soon</span>
      </div>
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 9 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 15.5, color: '#04121F' }}>{video.title}</span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--olive)' }}>{video.length}</span>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: '#4B5D6E' }}>{video.body}</p>
        {video.items && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 4 }}>
            {video.items.map((it) => (
              <span key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 12.5, lineHeight: 1.5, color: '#4B5D6E' }}>
                <span style={{ width: 4, height: 4, flex: '0 0 auto', marginTop: 6, borderRadius: '50%', background: 'var(--olive)' }} />
                {it}
              </span>
            ))}
          </div>
        )}
        {video.extra && <span style={{ fontSize: 12.5, fontStyle: 'italic', color: '#6A7F92', paddingTop: 2 }}>{video.extra}</span>}
      </div>
    </div>
  )
}

export default function VideosContent() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="resources" />

      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '58px 24px 52px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>{HERO.eyebrow}</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.1, letterSpacing: '-1.7px', color: '#FFFFFF' }}>{HERO.headline}</h1>
          <p style={{ margin: 0, maxWidth: '32em', fontSize: 16.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>{HERO.subhead}</p>
          <p style={{ margin: 0, maxWidth: '32em', fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.55)' }}>{INTRO}</p>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <AmbientOrbs />
        <div className="page-content">

          {/* Video sections */}
          {VIDEO_SECTIONS.map((section) => (
            <section key={section.title} style={{ maxWidth: 1240, margin: '0 auto', padding: '66px 24px 0' }}>
              <span style={{ display: 'block', marginBottom: 22, fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>{section.title}</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20 }}>
                {section.videos.map((v) => <VideoCard key={v.number} video={v} />)}
              </div>
            </section>
          ))}

          {/* Categories by purpose */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center', alignItems: 'center', marginBottom: 30 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Video categories</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 32px)', lineHeight: 1.16, letterSpacing: '-1px', color: '#04121F' }}>By purpose</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 18 }}>
              {CATEGORIES_BY_PURPOSE.map((c) => (
                <div key={c.title} style={{ padding: '20px 22px 22px', borderRadius: 18, background: '#FFFFFF', border: '1px solid rgba(4,18,31,0.08)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 15, color: '#04121F' }}>{c.title}</span>
                  {c.videos.map((v) => <span key={v} style={{ fontSize: 12.5, lineHeight: 1.5, color: '#4B5D6E' }}>{v}</span>)}
                </div>
              ))}
            </div>
          </section>

          {/* Categories by length */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '46px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center', alignItems: 'center', marginBottom: 30 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.6vw, 32px)', lineHeight: 1.16, letterSpacing: '-1px', color: '#04121F' }}>By length</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 18 }}>
              {CATEGORIES_BY_LENGTH.map((c) => (
                <div key={c.title} style={{ padding: '20px 22px 22px', borderRadius: 18, background: '#FFFFFF', border: '1px solid rgba(4,18,31,0.08)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 15, color: '#04121F' }}>{c.title}</span>
                  {c.videos.map((v) => <span key={v} style={{ fontSize: 12.5, lineHeight: 1.5, color: '#4B5D6E' }}>{v}</span>)}
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section style={{ maxWidth: 820, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center', alignItems: 'center', marginBottom: 30 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Questions about our video library</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 36px)', lineHeight: 1.16, letterSpacing: '-1.1px', color: '#04121F' }}>FAQ: MatjarX videos</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {VIDEO_FAQS.map(([q, a], i) => {
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

          {/* Resources by audience */}
          <section style={{ maxWidth: 1240, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'center', alignItems: 'center', marginBottom: 30 }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600 }}>Video resources</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(25px, 4vw, 36px)', lineHeight: 1.16, letterSpacing: '-1.1px', color: '#04121F' }}>Find the right video for you</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20 }}>
              {RESOURCES_BY_AUDIENCE.map((r) => (
                <div key={r.title} className="glass-card" style={{ padding: '24px 26px 26px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 17, color: '#04121F' }}>{r.title}</h3>
                  {r.groups.map((g) => (
                    <div key={g.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--olive)' }}>{g.label}</span>
                      {g.videos.map((v) => (
                        <span key={v} style={{ fontSize: 13, lineHeight: 1.5, color: '#4B5D6E' }}>{v}</span>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Closing CTA */}
          <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
            <div style={{ padding: 'clamp(28px, 4vw, 44px)', borderRadius: 26, background: '#04121F', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
              <span style={{ fontSize: 12, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>Your 7-day website awaits</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3.8vw, 32px)', lineHeight: 1.18, letterSpacing: '-1px', color: '#FFFFFF' }}>Videos show what we do. But they don't compare to seeing your own website built in 7 days.</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingTop: 6 }}>
                <Link href={routes.pricing} className="btn-primary">View pricing</Link>
                <a href={`https://wa.me/${CHANNELS.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ padding: '15px 22px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#FFFFFF', background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(255,255,255,0.2)' }}>Talk to our team</a>
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Call {CHANNELS.whatsapp} · {CHANNELS.email}</span>
            </div>
          </section>

          <div style={{ height: 74 }} />
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
