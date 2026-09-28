// Blog Post detail — from Marketing - Blog Post.dc.html. Navy hero
// with breadcrumb/byline/share icons, cover placeholder, two-column
// body (sticky "in this article" TOC + newsletter card) with heading/
// paragraph/quote/list blocks, author bio card, "want this handled"
// CTA, related-posts grid.

import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import CrossLinkRail from '@/components/CrossLinkRail'
import { crossLinksForPost } from '@/lib/cross-links'
import ArticleToc from './ArticleToc'
import AuthorCard, { AuthorByline } from './AuthorCard'
import NewsletterSignup from './NewsletterSignup'
import { routes } from '@/lib/routes'
import { AUTHOR, SHARE_LINKS, type BlogPost } from '@/lib/blog-data'

// allPosts comes from the same getBlogPosts() call the page already made
// for the listing — resolving relatedSlugs against the live table rather
// than the static BLOG_POSTS array, so an edited/deleted post's related
// links never drift out of sync with what's actually live.
// Anchor id for a heading's TOC entry — slugified from its own text, with
// the index folded in so two identically-worded headings in the same
// post (rare, but happens with "Conclusion"-style repeats) still get
// distinct anchors instead of the TOC silently landing on the first one.
function headingId(text: string, index: number): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${slug || 'section'}-${index}`
}

export default function BlogPostContent({ post, allPosts }: { post: BlogPost; allPosts: BlogPost[] }) {
  const toc = post.body
    .map((b, i) => ({ ...b, index: i }))
    .filter((b): b is typeof b & { t: 'h' } => b.t === 'h')
  const author = post.author ?? AUTHOR
  const related = post.relatedSlugs
    .map((slug) => allPosts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => !!p)

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'clip' }}>
      <SiteHeader active="resources" />
      <main>

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '46px 24px 54px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Link href={routes.blog} style={{ fontSize: 13, fontWeight: 600, color: 'var(--moss-light)' }}>← All posts</Link>
            <span style={{ fontSize: 13, color: 'rgba(var(--ink-inverse-rgb), 0.4)' }}>/</span>
            <span style={{ fontSize: 13, color: 'rgba(var(--ink-inverse-rgb), 0.6)' }}>{post.category}</span>
          </div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(29px, 5.2vw, 46px)', lineHeight: 1.1, letterSpacing: '-1.6px', color: 'var(--ink-inverse)' }}>{post.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, flexWrap: 'wrap' }}>
            <AuthorByline author={author} meta={`${post.date} · ${post.readTime}`} />
            <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
              {SHARE_LINKS.map((s) => (
                <a key={s.name} href={`#share-${s.name.toLowerCase()}`} title={`Share on ${s.name}`} style={{ width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'rgba(var(--surface-rgb), 0.08)', border: '1px solid rgba(var(--ink-inverse-rgb), 0.14)' }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="rgba(var(--ink-inverse-rgb), 0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ position: 'relative' }}>
        <AmbientOrbs />
        <div className="page-content">

          {/* Cover image — real photo/graphic from matjarx.com's media library when available */}
          <section style={{ maxWidth: 1300, margin: '0 auto', padding: '46px 24px 0' }}>
            {post.coverImage ? (
              <figure style={{ margin: 0 }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1140 / 380', borderRadius: 24, overflow: 'hidden', boxShadow: '0 22px 50px rgba(var(--scrim-rgb), 0.16)' }}>
                  <Image
                    src={post.coverImage.src}
                    alt={post.coverImage.alt}
                    title={post.coverImage.title}
                    fill
                    sizes="(max-width: 1140px) 100vw, 1140px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
                {post.coverImage.caption && (
                  <figcaption style={{ margin: '10px 4px 0', fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-muted)', textAlign: 'center' }}>{post.coverImage.caption}</figcaption>
                )}
              </figure>
            ) : (
              <div style={{ height: 380, borderRadius: 24, background: 'linear-gradient(150deg, var(--navy), var(--olive))', display: 'grid', placeItems: 'center', boxShadow: '0 22px 50px rgba(var(--scrim-rgb), 0.16)' }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 20, letterSpacing: '0.4px', color: 'rgba(var(--ink-inverse-rgb), 0.85)' }}>Article cover image</span>
              </div>
            )}
          </section>

          {/* Body + sidebar */}
          <section style={{ maxWidth: 1300, margin: '0 auto', padding: '52px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 46, alignItems: 'start' }}>

            <article style={{ minWidth: 0, maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 24 }}>
              {post.body.map((b, i) => {
                if (b.t === 'h') return <h2 key={i} id={headingId(b.text, i)} style={{ margin: '16px 0 0', scrollMarginTop: 96, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 29, lineHeight: 1.18, letterSpacing: '-0.9px', color: 'var(--ink-1)' }}>{b.text}</h2>
                if (b.t === 'p') return <p key={i} style={{ margin: 0, fontSize: 17, lineHeight: 1.72, color: 'var(--ink-3-alt)' }}>{b.text}</p>
                if (b.t === 'q') return (
                  <blockquote key={i} style={{ margin: '8px 0', padding: '24px 28px', borderRadius: 18, background: 'var(--cream-deep)', borderLeft: '4px solid var(--moss-light)' }}>
                    <p style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 20, lineHeight: 1.45, letterSpacing: '-0.4px', color: 'var(--ink-1)' }}>{b.text}</p>
                  </blockquote>
                )
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                    {b.items.map((li) => (
                      <span key={li} style={{ display: 'flex', alignItems: 'flex-start', gap: 13, fontSize: 17, lineHeight: 1.65, color: 'var(--ink-3-alt)' }}>
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

              <AuthorCard author={author} />
            </article>

            {/* maxHeight + overflow on the ASIDE, not on an ancestor: the rail
                has to stay usable on a post with fifteen headings, and a
                scroll container here only affects the rail's own contents.
                Putting overflow higher up is what broke sticky in the
                first place. */}
            <aside style={{ minWidth: 0, maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 18, position: 'sticky', top: 100, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
              <ArticleToc items={toc.map((t) => ({ id: headingId(t.text, t.index), text: t.text }))} />

              <NewsletterSignup postSlug={post.slug} />
            </aside>
          </section>

          {/* Keep reading */}
          <section style={{ maxWidth: 1400, margin: '0 auto', padding: '74px 24px 20px' }}>
            <h2 style={{ margin: '0 0 28px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 32, letterSpacing: '-1px', color: 'var(--ink-1)' }}>Keep reading</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20 }}>
              {related.map((r) => (
                <Link key={r.slug} href={routes.blogPost(r.slug)} className="keep-reading-card" style={{ display: 'flex', flexDirection: 'column', borderRadius: 20, overflow: 'hidden', background: 'var(--surface)', border: '1px solid rgba(var(--ink-1-rgb), 0.09)' }}>
                  {/* The cover, not the tint. Every one of these posts has
                      a real cover image; the card was rendering a flat
                      colour block over the top of it. `tint` stays as the
                      fallback for a post that genuinely has none. */}
                  <div style={{ position: 'relative', height: 140, background: r.tint }}>
                    {r.coverImage && (
                      <Image
                        src={r.coverImage.src}
                        alt={r.coverImage.alt}
                        title={r.coverImage.title}
                        fill
                        sizes="(max-width: 700px) 100vw, 420px"
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--olive)' }}>{r.category}</span>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, lineHeight: 1.3, letterSpacing: '-0.3px', color: 'var(--ink-1)' }}>{r.title}</h3>
                    <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{r.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <CrossLinkRail
            links={crossLinksForPost(post.slug)}
            title="Want this done for you?"
            subtitle="The work this article describes, and who we build it for."
          />

          <div style={{ height: 60 }} />
        </div>
      </div>
      </main>
      <SiteFooter />
    </div>
  )
}
