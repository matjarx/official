// Blog Post detail — from Marketing - Blog Post.dc.html. Navy hero
// with breadcrumb/byline/share icons, cover placeholder, two-column
// body (sticky "in this article" TOC + newsletter card) with heading/
// paragraph/quote/list blocks, author bio card, "want this handled"
// CTA, related-posts grid.

import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { routes } from '@/lib/routes'
import {
  BLOG_POSTS, FEATURED_POST_BODY, FEATURED_POST_AUTHOR, FEATURED_POST_RELATED_SLUGS, SHARE_LINKS,
  type BlogPostSummary,
} from '@/lib/blog-data'

export default function BlogPostContent({ post }: { post: BlogPostSummary }) {
  const toc = FEATURED_POST_BODY.filter((b) => b.t === 'h')
  const related = FEATURED_POST_RELATED_SLUGS
    .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
    .filter((p): p is BlogPostSummary => !!p)

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="resources" />

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '46px 24px 54px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Link href={routes.blog} style={{ fontSize: 13, fontWeight: 600, color: 'var(--moss-light)' }}>← All posts</Link>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{post.category}</span>
          </div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(29px, 5.2vw, 46px)', lineHeight: 1.1, letterSpacing: '-1.6px', color: '#FFFFFF' }}>{post.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, flexWrap: 'wrap' }}>
            <span style={{ width: 42, height: 42, flex: '0 0 auto', borderRadius: '50%', background: 'linear-gradient(150deg, var(--moss-light), var(--olive))', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#16210B' }}>{FEATURED_POST_AUTHOR.initials}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#FFFFFF' }}>{FEATURED_POST_AUTHOR.name}</span>
              <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)' }}>{post.date} · {post.readTime}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
              {SHARE_LINKS.map((s) => (
                <a key={s.name} href={`#share-${s.name.toLowerCase()}`} title={`Share on ${s.name}`} style={{ width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <div className="orb-field">
          <div style={{ position: 'absolute', width: 720, height: 720, right: -190, top: 60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,170,215,0.32) 0%, rgba(120,170,215,0) 68%)' }} />
          <div style={{ position: 'absolute', width: 780, height: 780, left: '20%', top: 1400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,242,174,0.36) 0%, rgba(244,242,174,0) 70%)' }} />
        </div>
        <div className="page-content">

          {/* Cover placeholder */}
          <section style={{ maxWidth: 1140, margin: '0 auto', padding: '46px 24px 0' }}>
            <div style={{ height: 380, borderRadius: 24, background: 'linear-gradient(150deg, var(--navy), var(--olive))', display: 'grid', placeItems: 'center', boxShadow: '0 22px 50px rgba(4,18,31,0.16)' }}>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 20, letterSpacing: '0.4px', color: 'rgba(255,255,255,0.85)' }}>Article cover image</span>
            </div>
          </section>

          {/* Body + sidebar */}
          <section style={{ maxWidth: 1140, margin: '0 auto', padding: '52px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 46, alignItems: 'start' }}>

            <article style={{ minWidth: 0, maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p style={{ margin: 0, fontSize: 19.5, lineHeight: 1.6, fontWeight: 500, color: '#24384A' }}>If a customer hears about your business today, the first thing they do is search for it. What they find — or don&rsquo;t find — decides whether they call you or your competitor.</p>

              {FEATURED_POST_BODY.map((b, i) => {
                if (b.t === 'h') return <h2 key={i} style={{ margin: '16px 0 0', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 29, lineHeight: 1.18, letterSpacing: '-0.9px', color: '#04121F' }}>{b.text}</h2>
                if (b.t === 'p') return <p key={i} style={{ margin: 0, fontSize: 17, lineHeight: 1.72, color: '#33485B' }}>{b.text}</p>
                if (b.t === 'q') return (
                  <blockquote key={i} style={{ margin: '8px 0', padding: '24px 28px', borderRadius: 18, background: 'var(--cream-deep)', borderLeft: '4px solid var(--moss-light)' }}>
                    <p style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 20, lineHeight: 1.45, letterSpacing: '-0.4px', color: '#04121F' }}>{b.text}</p>
                  </blockquote>
                )
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                    {b.items.map((li) => (
                      <span key={li} style={{ display: 'flex', alignItems: 'flex-start', gap: 13, fontSize: 17, lineHeight: 1.65, color: '#33485B' }}>
                        <span style={{ width: 7, height: 7, flex: '0 0 auto', marginTop: 10, borderRadius: '50%', background: 'var(--moss-light)' }} />
                        {li}
                      </span>
                    ))}
                  </div>
                )
              })}

              <div style={{ marginTop: 20, padding: '30px 32px', borderRadius: 22, background: 'linear-gradient(150deg, var(--butter), var(--moss-light))', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 25, lineHeight: 1.16, letterSpacing: '-0.7px', color: '#1F2A08' }}>Want this handled for you?</h3>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: '#3D4A16' }}>We build the whole website — design, copy, images, Google listing — and launch it in seven days from Rs. 22,500.</p>
                <Link href={routes.pricing} className="btn-navy" style={{ alignSelf: 'flex-start', marginTop: 4 }}>See plans</Link>
              </div>

              <div className="glass-card" style={{ marginTop: 24, padding: '26px 28px', borderRadius: 20, display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <span style={{ width: 56, height: 56, flex: '0 0 auto', borderRadius: '50%', background: 'linear-gradient(150deg, var(--moss-light), var(--olive))', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, color: '#16210B' }}>{FEATURED_POST_AUTHOR.initials}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16.5, color: '#04121F' }}>{FEATURED_POST_AUTHOR.name}</span>
                  <span style={{ fontSize: 12.5, color: '#6A7F92' }}>{FEATURED_POST_AUTHOR.role}</span>
                  <p style={{ margin: '4px 0 0', fontSize: 14, lineHeight: 1.6, color: '#4B5D6E' }}>{FEATURED_POST_AUTHOR.bio}</p>
                </div>
              </div>
            </article>

            <aside style={{ minWidth: 0, maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 18, position: 'sticky', top: 100 }}>
              <div className="glass-card" style={{ padding: '24px 26px', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <span style={{ fontSize: 11.5, letterSpacing: '1.6px', textTransform: 'uppercase', color: '#8A7A5E', fontWeight: 600 }}>In this article</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {toc.map((t) => (
                    <a key={t.text} href="#" style={{ fontSize: 14, lineHeight: 1.45, color: '#3B5063' }}>{t.text}</a>
                  ))}
                </div>
              </div>

              <div style={{ padding: '24px 26px', borderRadius: 20, background: '#04121F', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, color: '#FFFFFF' }}>Get one email a month</span>
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>Practical advice for growing a business online in Pakistan and the Gulf.</p>
                <Link href={routes.blog} style={{ marginTop: 4, textAlign: 'center', padding: '13px 18px', borderRadius: 12, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13.5, color: '#16210B', background: 'var(--butter)' }}>Subscribe</Link>
              </div>
            </aside>
          </section>

          {/* Keep reading */}
          <section style={{ maxWidth: 1240, margin: '0 auto', padding: '74px 24px 20px' }}>
            <h2 style={{ margin: '0 0 28px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 32, letterSpacing: '-1px', color: '#04121F' }}>Keep reading</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20 }}>
              {related.map((r) => (
                <Link key={r.slug} href={routes.blogPost(r.slug)} style={{ display: 'flex', flexDirection: 'column', borderRadius: 20, overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(4,18,31,0.09)' }}>
                  <div style={{ height: 140, background: r.tint }} />
                  <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--olive)' }}>{r.category}</span>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, lineHeight: 1.3, letterSpacing: '-0.3px', color: '#04121F' }}>{r.title}</h3>
                    <span style={{ fontSize: 12, color: '#90A2B1' }}>{r.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <div style={{ height: 60 }} />
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
