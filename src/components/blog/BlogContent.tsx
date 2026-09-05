'use client'

// Blog listing — from Marketing - Blog.dc.html. Navy hero, featured
// post card + newsletter panel, category filter chips (real
// useState), post grid, "load more" (visual-only — all 9 posts already
// render; the source's pagination has no further pages authored).

import { useMemo, useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { routes } from '@/lib/routes'
import { BLOG_POSTS, BLOG_CATEGORIES, FEATURED_SLUG, AUTHOR, type BlogCategory } from '@/lib/blog-data'

export default function BlogContent() {
  const [cat, setCat] = useState<(typeof BLOG_CATEGORIES)[number]>('All')
  const featuredPost = BLOG_POSTS.find((p) => p.slug === FEATURED_SLUG)!

  const filtered = useMemo(
    () => (cat === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === (cat as BlogCategory))),
    [cat]
  )

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="resources" />

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '60px 24px 52px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>MatjarX resources</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5.6vw, 50px)', lineHeight: 1.08, letterSpacing: '-1.7px', color: '#FFFFFF' }}>
            Helping small businesses <span style={{ background: 'var(--moss-light)', color: '#16210B', padding: '0 10px', borderRadius: 3 }}>grow online</span>
          </h1>
          <p style={{ margin: 0, maxWidth: '32em', fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>Practical guides written for Pakistani and Gulf business owners — no jargon, no theory.</p>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <div className="orb-field">
          <div style={{ position: 'absolute', width: 720, height: 720, right: -190, top: 60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,170,215,0.32) 0%, rgba(120,170,215,0) 68%)' }} />
          <div style={{ position: 'absolute', width: 780, height: 780, left: '20%', top: 1100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,242,174,0.36) 0%, rgba(244,242,174,0) 70%)' }} />
        </div>
        <div className="page-content">

          {/* Featured + newsletter */}
          <section style={{ maxWidth: 1240, margin: '0 auto', padding: '46px 24px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 22, alignItems: 'stretch' }}>
              <Link href={routes.blogPost(featuredPost.slug)} style={{ display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(4,18,31,0.09)', boxShadow: '0 16px 40px rgba(4,18,31,0.07)' }}>
                <div style={{ height: 280, background: 'linear-gradient(150deg, #1B7A3D, #08361B)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 26 }}>
                  <span style={{ alignSelf: 'flex-start', fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999, color: '#16210B', background: 'var(--butter)', marginBottom: 14 }}>Featured</span>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 27, lineHeight: 1.14, letterSpacing: '-0.7px', color: '#FFFFFF' }}>{featuredPost.title}</span>
                </div>
                <div style={{ padding: '24px 26px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#4B5D6E' }}>{featuredPost.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 4 }}>
                    <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--moss-light)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 12.5, color: '#16210B' }}>{AUTHOR.initials}</span>
                    <span style={{ fontSize: 13, color: '#6A7F92' }}>{AUTHOR.name} · {featuredPost.date} · {featuredPost.readTime}</span>
                  </div>
                </div>
              </Link>

              <div style={{ padding: '34px 32px', borderRadius: 24, background: 'linear-gradient(150deg, var(--butter), var(--moss-light))', display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
                <span style={{ fontSize: 12, letterSpacing: '1.8px', textTransform: 'uppercase', color: '#4A5518', fontWeight: 700 }}>Newsletter</span>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 30, lineHeight: 1.12, letterSpacing: '-1px', color: '#1F2A08' }}>Get monthly advice and exclusive deals</h2>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#3D4A16' }}>One email a month: what&rsquo;s working for businesses like yours, plus partner offers.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 4 }}>
                  <input type="email" placeholder="you@yourbusiness.pk" style={{ width: '100%', padding: '15px 17px', borderRadius: 13, fontFamily: 'var(--font-open-sans), sans-serif', fontSize: 14.5, color: '#1F2A08', background: 'rgba(255,255,255,0.75)', border: '1.5px solid rgba(31,42,8,0.18)', outline: 'none' }} />
                  <button type="button" className="btn-navy" style={{ textAlign: 'center' }}>Subscribe</button>
                </div>
                <span style={{ fontSize: 11.5, lineHeight: 1.5, color: '#4A5518' }}>By subscribing you agree to the MatjarX privacy policy. Unsubscribe any time.</span>
              </div>
            </div>
          </section>

          {/* Category filter */}
          <section style={{ maxWidth: 1240, margin: '0 auto', padding: '46px 24px 0' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              {BLOG_CATEGORIES.map((c) => {
                const active = cat === c
                return (
                  <button key={c} type="button" onClick={() => setCat(c)} style={{ all: 'unset', cursor: 'pointer', padding: '10px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', color: active ? '#FFFFFF' : '#3B5063', background: active ? 'var(--navy)' : '#FFFFFF', border: `1.5px solid ${active ? 'var(--navy)' : 'rgba(4,18,31,0.14)'}` }}>{c}</button>
                )
              })}
            </div>
          </section>

          {/* Post grid */}
          <section style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 24px 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 22 }}>
              {filtered.map((p) => (
                <Link key={p.slug} href={routes.blogPost(p.slug)} className="glass-card" style={{ display: 'flex', flexDirection: 'column', borderRadius: 22, overflow: 'hidden' }}>
                  <div style={{ height: 168, background: p.tint, display: 'flex', alignItems: 'flex-start', padding: 16 }}>
                    <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '6px 11px', borderRadius: 999, color: 'rgba(255,255,255,0.94)', background: 'rgba(0,0,0,0.3)' }}>{p.category}</span>
                  </div>
                  <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 18, lineHeight: 1.28, letterSpacing: '-0.35px', color: '#04121F' }}>{p.title}</h3>
                    <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.58, color: '#4B5D6E' }}>{p.excerpt}</p>
                    <span style={{ marginTop: 'auto', paddingTop: 12, fontSize: 12, color: '#90A2B1' }}>{p.date} · {p.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '44px 0 0' }}>
              <button type="button" style={{ all: 'unset', cursor: 'pointer', padding: '15px 32px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#04121F', background: '#FFFFFF', border: '1.5px solid rgba(4,18,31,0.16)' }}>Load more posts</button>
            </div>
          </section>

          <div style={{ height: 60 }} />
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
