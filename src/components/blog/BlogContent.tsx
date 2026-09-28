'use client'

// Blog listing — from Marketing - Blog.dc.html. Navy hero, featured
// post card + newsletter panel, category filter chips (real
// useState), post grid, "load more" (visual-only — all 9 posts already
// render; the source's pagination has no further pages authored).

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import FaqSection from '@/components/FaqSection'
import { BLOG_INDEX_FAQS } from '@/lib/page-faqs'
import AmbientOrbs from '@/components/AmbientOrbs'
import NewsletterSignup from './NewsletterSignup'
import { routes } from '@/lib/routes'
import { BLOG_CATEGORIES, FEATURED_SLUG, AUTHOR, type BlogCategory, type BlogPost } from '@/lib/blog-data'

export default function BlogContent({ posts }: { posts: BlogPost[] }) {
  const [cat, setCat] = useState<(typeof BLOG_CATEGORIES)[number]>('All')
  // Falls back to the first post if the originally-featured slug was ever
  // deleted through the admin — never crashes on an empty/edited list.
  const featuredPost = posts.find((p) => p.slug === FEATURED_SLUG) || posts[0]

  const filtered = useMemo(
    () => (cat === 'All' ? posts : posts.filter((p) => p.category === (cat as BlogCategory))),
    [cat, posts]
  )

  if (!featuredPost) {
    return (
      <div style={{ fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)' }}>
        <SiteHeader active="resources" />
        <main>
          <p style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--ink-5)' }}>No posts yet.</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'clip' }}>
      <SiteHeader active="resources" />
      <main>

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '60px 24px 52px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>MatjarX resources</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5.6vw, 50px)', lineHeight: 1.08, letterSpacing: '-1.7px', color: 'var(--ink-inverse)' }}>
            Helping small businesses <span style={{ background: 'var(--moss-light)', color: 'var(--ink-on-butter)', padding: '0 10px', borderRadius: 3 }}>grow online</span>
          </h1>
          <p style={{ margin: 0, maxWidth: '32em', fontSize: 17, lineHeight: 1.6, color: 'rgba(var(--ink-inverse-rgb), 0.72)' }}>Practical guides written for Pakistani and Gulf business owners — no jargon, no theory.</p>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <AmbientOrbs />
        <div className="page-content">

          {/* Featured + newsletter */}
          <section style={{ maxWidth: 1400, margin: '0 auto', padding: '46px 24px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 22, alignItems: 'stretch' }}>
              <Link href={routes.blogPost(featuredPost.slug)} style={{ display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden', background: 'var(--surface)', border: '1px solid rgba(var(--ink-1-rgb), 0.09)', boxShadow: '0 16px 40px rgba(var(--scrim-rgb), 0.07)' }}>
                <div style={{ position: 'relative', height: 280, background: featuredPost.coverImage ? undefined : 'linear-gradient(150deg, #1B7A3D, #08361B)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 26 }}>
                  {featuredPost.coverImage && (
                    <>
                      <Image src={featuredPost.coverImage.src} alt={featuredPost.coverImage.alt} title={featuredPost.coverImage.title} fill sizes="(max-width: 700px) 100vw, 700px" style={{ objectFit: 'cover', zIndex: 0 }} priority />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(var(--scrim-rgb), 0.75), rgba(var(--ink-1-rgb), 0.1))' }} />
                    </>
                  )}
                  <span style={{ position: 'relative', alignSelf: 'flex-start', fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999, color: 'var(--ink-on-butter)', background: 'var(--butter)', marginBottom: 14 }}>Featured</span>
                  <span style={{ position: 'relative', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 27, lineHeight: 1.14, letterSpacing: '-0.7px', color: 'var(--ink-inverse)' }}>{featuredPost.title}</span>
                </div>
                <div style={{ padding: '24px 26px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--ink-5)' }}>{featuredPost.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 4 }}>
                    <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--moss-light)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 12.5, color: 'var(--ink-on-butter)' }}>{AUTHOR.initials}</span>
                    <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{(featuredPost.author ?? AUTHOR).name} · {featuredPost.date} · {featuredPost.readTime}</span>
                  </div>
                </div>
              </Link>

              <NewsletterSignup variant="light" />
            </div>
          </section>

          {/* Category filter */}
          <section style={{ maxWidth: 1400, margin: '0 auto', padding: '46px 24px 0' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              {BLOG_CATEGORIES.map((c) => {
                const active = cat === c
                return (
                  <button key={c} type="button" onClick={() => setCat(c)} style={{ all: 'unset', cursor: 'pointer', padding: '10px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', color: active ? 'var(--ink-inverse)' : 'var(--ink-4-alt)', background: active ? 'var(--navy)' : 'var(--surface)', border: `1.5px solid ${active ? 'var(--navy)' : 'rgba(var(--ink-1-rgb), 0.14)'}` }}>{c}</button>
                )
              })}
            </div>
          </section>

          {/* Post grid */}
          <section style={{ maxWidth: 1400, margin: '0 auto', padding: '28px 24px 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 22 }}>
              {filtered.map((p) => (
                <Link key={p.slug} href={routes.blogPost(p.slug)} className="glass-card" style={{ display: 'flex', flexDirection: 'column', borderRadius: 22, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 168, background: p.coverImage ? undefined : p.tint, display: 'flex', alignItems: 'flex-start', padding: 16 }}>
                    {p.coverImage && (
                      <>
                        <Image src={p.coverImage.src} alt={p.coverImage.alt} title={p.coverImage.title} fill sizes="320px" style={{ objectFit: 'cover', zIndex: 0 }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(var(--scrim-rgb), 0.35), rgba(var(--ink-1-rgb), 0))' }} />
                      </>
                    )}
                    <span style={{ position: 'relative', fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '6px 11px', borderRadius: 999, color: 'rgba(var(--ink-inverse-rgb), 0.94)', background: 'rgba(var(--shadow-rgb), 0.3)' }}>{p.category}</span>
                  </div>
                  <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 18, lineHeight: 1.28, letterSpacing: '-0.35px', color: 'var(--ink-1)' }}>{p.title}</h3>
                    <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.58, color: 'var(--ink-5)' }}>{p.excerpt}</p>
                    <span style={{ marginTop: 'auto', paddingTop: 12, fontSize: 12, color: 'var(--ink-faint)' }}>{p.date} · {p.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '44px 0 0' }}>
              <button type="button" style={{ all: 'unset', cursor: 'pointer', padding: '15px 32px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: 'var(--ink-1)', background: 'var(--surface)', border: '1.5px solid rgba(var(--ink-1-rgb), 0.16)' }}>Load more posts</button>
            </div>
          </section>

          <div style={{ height: 60 }} />
          <FaqSection faqs={BLOG_INDEX_FAQS} intro="About these guides and the people who write them." />
          <div style={{ height: 66 }} />
        </div>
      </div>
      </main>
      <SiteFooter />
    </div>
  )
}
