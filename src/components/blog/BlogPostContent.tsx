// Blog Post detail — from Marketing - Blog Post.dc.html. Navy hero
// with breadcrumb/byline/share icons, cover placeholder, two-column
// body (sticky "in this article" TOC + newsletter card) with heading/
// paragraph/quote/list blocks, author bio card, a CTA box and three
// related posts, both matched to the post's content pillar.

import type { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SiteChrome from '@/components/SiteChrome'
import AmbientOrbs from '@/components/AmbientOrbs'
import PillarCta from '@/components/PillarCta'
import { PILLAR_CTA, pillarOf, relatedInPillar } from '@/lib/pillars'
import ArticleToc from './ArticleToc'
import AuthorCard, { AuthorByline } from './AuthorCard'
import NewsletterSignup from './NewsletterSignup'
import BlogFaqAccordion from './BlogFaqAccordion'
import type { FaqEntry } from '@/components/FaqList'
import { routes } from '@/lib/routes'
import { AUTHOR, SHARE_LINKS, type BlogPost, type BodyBlock } from '@/lib/blog-data'
import { richText, plainText } from '@/lib/rich-text'
import { slugifyCategory } from '@/lib/blog-categories'
import { FAQ_HEADING } from '@/lib/blog-faq'

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

// A short standalone paragraph that is functioning as a subheading --
// "Why Hosting Matters:", "Tips for Choosing a Domain:" -- rather than a
// sentence of body copy. Some older posts have these as their own `p`
// block (not an `h3`), which is why they render as flat body text today.
// Deliberately narrow: only a paragraph whose ENTIRE text is a short,
// colon-terminated label. A paragraph that merely contains a colon
// ("Types of Hosting Commonly Used: Shared Hosting: Cost effective...")
// is a label run on into real content in the same block -- splitting that
// safely would mean rewriting the block, which is a content change, not a
// styling one, so it is deliberately left alone and still renders as a
// normal paragraph.
function isPseudoHeading(text: string): boolean {
  const t = plainText(text).trim()
  return t.length > 0 && t.length <= 70 && t.endsWith(':') && !t.slice(0, -1).includes('. ')
}

type RenderGroup =
  | { kind: 'block'; block: BodyBlock; index: number }
  | { kind: 'pgroup'; blocks: Extract<BodyBlock, { t: 'p' }>[]; indices: number[] }
  | { kind: 'faq'; heading: Extract<BodyBlock, { t: 'h' }>; index: number; items: FaqEntry[] }

/** One answer's rich content, built from the blocks between an FAQ's `h3`
 *  and the next `h3`/`h` -- same shape blog-faq.ts assumes, but kept as
 *  JSX (richText) instead of flattened to a string, so a link or bold run
 *  in an answer survives into the accordion. */
function faqAnswerNode(blocks: BodyBlock[]): ReactNode {
  return (
    <>
      {blocks.map((b, k) => {
        if (b.t === 'p' || b.t === 'q') return <p key={k} style={{ margin: 0 }}>{richText(b.text)}</p>
        if (b.t === 'l' || b.t === 'ol') return (
          <ul key={k} style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {b.items.map((li, j) => (
              <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ width: 5, height: 5, flex: '0 0 auto', marginTop: 8, borderRadius: '50%', background: 'var(--moss-light)' }} />
                <span>{richText(li)}</span>
              </li>
            ))}
          </ul>
        )
        return null
      })}
    </>
  )
}

/**
 * Groups a post's body into render units: the in-body FAQ section (same
 * convention blog-faq.ts uses for schema -- an `h` matching FAQ_HEADING,
 * then one `h3` per question) collapses into one accordion; 3 or more
 * consecutive plain paragraphs collapse into one card; everything else
 * renders exactly as before, one block at a time.
 *
 * A pseudo-heading paragraph (see isPseudoHeading) breaks a paragraph run
 * rather than joining it -- it gets its own heading-styled block, not a
 * ride inside the card next to it.
 */
function groupBody(body: BodyBlock[]): RenderGroup[] {
  const groups: RenderGroup[] = []
  let i = 0
  while (i < body.length) {
    const b = body[i]

    if (b.t === 'h' && FAQ_HEADING.test(plainText(b.text).trim())) {
      const items: FaqEntry[] = []
      let current: { q: string; blocks: BodyBlock[] } | null = null
      let j = i + 1
      const flush = () => { if (current && current.blocks.length) items.push({ q: current.q, a: faqAnswerNode(current.blocks) }) }
      for (; j < body.length; j++) {
        const bb = body[j]
        if (bb.t === 'h') break
        if (bb.t === 'h3') {
          flush()
          current = { q: plainText(bb.text).trim(), blocks: [] }
        } else if (current) {
          current.blocks.push(bb)
        }
      }
      flush()
      if (items.length > 0) {
        groups.push({ kind: 'faq', heading: b, index: i, items })
        i = j
        continue
      }
      // No h3-based questions found (an older post's FAQ written a
      // different way) -- fall through and render this block normally,
      // same as every post did before this change.
    }

    if (b.t === 'p' && !isPseudoHeading(b.text)) {
      const run: Extract<BodyBlock, { t: 'p' }>[] = []
      const indices: number[] = []
      let j = i
      while (j < body.length) {
        const bb = body[j]
        if (bb.t !== 'p' || isPseudoHeading(bb.text)) break
        run.push(bb)
        indices.push(j)
        j++
      }
      if (run.length >= 3) {
        groups.push({ kind: 'pgroup', blocks: run, indices })
        i = j
        continue
      }
      // 1-2 plain paragraphs: render individually, as before.
    }

    groups.push({ kind: 'block', block: b, index: i })
    i++
  }
  return groups
}

/** One body block, exactly as both layouts rendered it before -- except a
 *  `p` that isPseudoHeading() now gets heading-weight treatment (same step
 *  up from body text as a real h3, not a new size of its own), and `ol`
 *  draws its own numbers (see the comment on that branch). */
function renderBlock(b: BodyBlock, i: number): ReactNode {
  if (b.t === 'h') return <h2 key={i} id={headingId(plainText(b.text), i)} style={{ margin: '16px 0 0', scrollMarginTop: 96, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 29, lineHeight: 1.18, letterSpacing: '-0.9px', color: 'var(--ink-1)' }}>{richText(b.text)}</h2>
  if (b.t === 'h3') return <h3 key={i} id={headingId(plainText(b.text), i)} style={{ margin: '10px 0 0', scrollMarginTop: 96, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 22, lineHeight: 1.25, letterSpacing: '-0.5px', color: 'var(--ink-1)' }}>{richText(b.text)}</h3>
  if (b.t === 'p') {
    if (isPseudoHeading(b.text)) return <p key={i} style={{ margin: '6px 0 0', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 18, lineHeight: 1.3, letterSpacing: '-0.3px', color: 'var(--ink-1)' }}>{richText(b.text)}</p>
    return <p key={i} style={{ margin: 0, fontSize: 17, lineHeight: 1.72, color: 'var(--ink-3-alt)' }}>{richText(b.text)}</p>
  }
  if (b.t === 'q') return (
    <blockquote key={i} style={{ margin: '8px 0', padding: '24px 28px', borderRadius: 18, background: 'var(--cream-deep)', borderLeft: '4px solid var(--moss-light)' }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 20, lineHeight: 1.45, letterSpacing: '-0.4px', color: 'var(--ink-1)' }}>{richText(b.text)}</p>
    </blockquote>
  )
  if (b.t === 'img') return (
    <figure key={i} style={{ margin: '8px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={b.src} alt={b.alt} loading="lazy" style={{ width: '100%', height: 'auto', borderRadius: 18, display: 'block' }} />
      {b.caption && (
        <figcaption style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-3-alt)' }}>{richText(b.caption)}</figcaption>
      )}
    </figure>
  )
  if (b.t === 'table') return <TableBlock key={i} block={b} />
  if (b.t === 'ol') return (
    // Real <ol>/<li> (a screen reader still announces list length and
    // position with listStyle: none), but the number is drawn manually,
    // same idea as the 'l' block's hand-drawn dot below -- Tailwind's
    // Preflight reset (`@import "tailwindcss"` in globals.css) sets
    // `list-style: none` on every ol/ul, which silently ate the browser's
    // default numbering with nothing here to replace it. A multi-step
    // guide read as un-numbered paragraphs with no visible sequence.
    <ol key={i} style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
      {b.items.map((li, k) => (
        <li key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: 13, fontSize: 17, lineHeight: 1.65, color: 'var(--ink-3-alt)' }}>
          <span style={{ flex: '0 0 auto', minWidth: 24, fontWeight: 800, color: 'var(--ink-1)' }}>{k + 1}.</span>
          <span>{richText(li)}</span>
        </li>
      ))}
    </ol>
  )
  if (b.t === 'l') return (
    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
      {b.items.map((li, k) => (
        <span key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: 13, fontSize: 17, lineHeight: 1.65, color: 'var(--ink-3-alt)' }}>
          <span style={{ width: 7, height: 7, flex: '0 0 auto', marginTop: 10, borderRadius: '50%', background: 'var(--moss-light)' }} />
          {/* One flex child: text mixed with links or bold is several nodes. */}
          <span>{richText(li)}</span>
        </span>
      ))}
    </div>
  )
  // An unknown block renders NOTHING.
  //
  // This branch used to be the list renderer, reached by falling through --
  // so any block type this deploy did not know about hit `b.items.map` on
  // an object with no items and threw, taking the whole post page down
  // with it. The platform and this site deploy separately, so the editor
  // WILL emit a type this renderer has not learned yet; that has to cost a
  // missing paragraph, not a white screen.
  return null
}

/** A run of 3+ plain paragraphs, boxed the same way this page already
 *  boxes its TOC/newsletter/CTA cards -- `.glass-card` -- instead of
 *  running together as a flat, undifferentiated wall of text. 1-2
 *  paragraphs in a row stay exactly as they were: this is for the long
 *  runs, not every paragraph gap on the page. */
function ParagraphGroup({ blocks, indices }: { blocks: Extract<BodyBlock, { t: 'p' }>[]; indices: number[] }) {
  return (
    <div className="glass-card" style={{ borderRadius: 18, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {blocks.map((b, k) => <p key={indices[k]} style={{ margin: 0, fontSize: 17, lineHeight: 1.72, color: 'var(--ink-3-alt)' }}>{richText(b.text)}</p>)}
    </div>
  )
}

function renderGroups(groups: RenderGroup[]): ReactNode[] {
  return groups.map((g) => {
    if (g.kind === 'block') return renderBlock(g.block, g.index)
    if (g.kind === 'pgroup') return <ParagraphGroup key={g.indices[0]} blocks={g.blocks} indices={g.indices} />
    // 'faq': the section heading renders exactly as any other h2, the
    // questions beneath it become the shared accordion instead of plain
    // h3 + paragraph pairs.
    return (
      <div key={g.index} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {renderBlock(g.heading, g.index)}
        <BlogFaqAccordion items={g.items} />
      </div>
    )
  })
}

export default function BlogPostContent({ post, allPosts, h1 }: { post: BlogPost; allPosts: BlogPost[]; h1?: string }) {
  const toc = post.body
    .map((b, i) => ({ ...b, index: i }))
    .filter((b): b is typeof b & { t: 'h' } => b.t === 'h')
  const author = post.author ?? AUTHOR
  // Three posts from the same pillar, and that pillar's CTA (spec group
  // 5). This replaced a rail that rotated through unrelated cities and
  // industries -- the GEO guide linked Abbottabad and Attock. The post's
  // own relatedSlugs still lead, where they are in the same pillar.
  // A post not yet in the pillar map keeps its relatedSlugs and gets the
  // website-development CTA.
  const pillar = pillarOf(post.slug)
  const live = new Set(allPosts.map((p) => p.slug))
  const relatedSlugs = pillar
    ? [...new Set([
        ...post.relatedSlugs.filter((s) => s !== post.slug && live.has(s) && pillarOf(s) === pillar),
        ...relatedInPillar(pillar, live, { exclude: post.slug }),
      ])].slice(0, 3)
    : post.relatedSlugs
  const related = relatedSlugs
    .map((slug) => allPosts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => !!p)
  const cta = PILLAR_CTA[pillar ?? 'P1']
  // SEO-pillar posts also link the SEO service page from the article text
  // (decided 15 Oct): the CTA box sends readers to the free audit, which
  // left the service page itself with no link from these posts. Skipped
  // where the post's own body already links it.
  const seoServiceLine = pillar === 'P3' && !JSON.stringify(post.body).includes(routes.service('seo'))

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'clip' }}>
      <SiteChrome active="resources">

      {/* Navy hero */}
      <section style={{ background: 'var(--navy)', padding: '46px 24px 54px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Breadcrumb: Home / Blog / Category / Post (BreadcrumbList on the page) */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', fontSize: 13, minWidth: 0 }}>
            <Link href={routes.home} style={{ fontWeight: 600, color: 'var(--moss-light)' }}>Home</Link>
            <span style={{ color: 'rgba(var(--ink-inverse-rgb), 0.4)' }}>/</span>
            <Link href={routes.blog} style={{ fontWeight: 600, color: 'var(--moss-light)' }}>Blog</Link>
            <span style={{ color: 'rgba(var(--ink-inverse-rgb), 0.4)' }}>/</span>
            <Link href={routes.blogCategory(slugifyCategory(post.category))} style={{ fontWeight: 600, color: 'var(--moss-light)' }}>{post.category}</Link>
            <span style={{ color: 'rgba(var(--ink-inverse-rgb), 0.4)' }}>/</span>
            <span aria-current="page" style={{ color: 'rgba(var(--ink-inverse-rgb), 0.6)', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</span>
          </nav>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(29px, 5.2vw, 46px)', lineHeight: 1.1, letterSpacing: '-1.6px', color: 'var(--ink-inverse)' }}>{h1 || post.title}</h1>
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
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1200 / 630', borderRadius: 24, overflow: 'hidden', boxShadow: '0 22px 50px rgba(var(--scrim-rgb), 0.16)' }}>
                  <Image
                    src={post.coverImage.src}
                    alt={post.coverImage.alt}
                    title={post.coverImage.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
                {post.coverImage.caption && (
                  <figcaption style={{ margin: '10px 4px 0', fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-muted)', textAlign: 'center' }}>{post.coverImage.caption}</figcaption>
                )}
              </figure>
            ) : (
              <div style={{ aspectRatio: '1200 / 630', borderRadius: 24, background: 'linear-gradient(150deg, var(--navy), var(--olive-ground))', display: 'grid', placeItems: 'center', boxShadow: '0 22px 50px rgba(var(--scrim-rgb), 0.16)' }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 20, letterSpacing: '0.4px', color: 'rgba(var(--ink-inverse-rgb), 0.85)' }}>Article cover image</span>
              </div>
            )}
          </section>

          {/* Body + sidebar */}
          {/* Which frame the body goes in.
              `layout` names a LAYOUT, not a template row: on a client site a
              template is sections in the database, here it is a React
              component, so there is nothing to look up. An unknown name --
              or none, which is all 29 posts today -- renders the standard
              one, so adding this changed nothing until a post opts in. */}
          {post.layout === 'wide' ? (
            <>
            {/* WIDE — no sidebar.
                Same body, same blocks, same heading ids: only the frame
                differs. For a post where a 340px rail of table-of-contents
                and newsletter box beside a 680px column is noise rather
                than navigation -- a short piece, or one carrying wide
                imagery that the narrow measure crops the life out of. */}
            <section style={{ maxWidth: 820, margin: '0 auto', padding: '52px 24px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
              {toc.length > 2 && (
                <ArticleToc items={toc.map((t) => ({ id: headingId(plainText(t.text), t.index), text: plainText(t.text) }))} />
              )}
                <article style={{ minWidth: 0, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {renderGroups(groupBody(post.body))}

                  {seoServiceLine && (
                    <p style={{ margin: 0, fontSize: 17, lineHeight: 1.72, color: 'var(--ink-3-alt)' }}>
                      If you would rather have this done for you, see our <Link href={routes.service('seo')} style={{ color: 'var(--ink-1)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>SEO services in Pakistan</Link>.
                    </p>
                  )}
                  <PillarCta cta={cta} style={{ marginTop: 20 }} />

                  {/* The article body already ends with the author card --
                      this layout does not add a second one. It did, and the
                      post rendered the byline twice. */}
                  <AuthorCard author={author} />
                </article>
              {/* The sidebar's newsletter box has nowhere to live without a
                  sidebar, so it goes under the article instead. */}
              <NewsletterSignup postSlug={post.slug} />
            </section>
            </>
          ) : (
            <section style={{ maxWidth: 1300, margin: '0 auto', padding: '52px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 46, alignItems: 'start' }}>

              <article style={{ minWidth: 0, maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 24 }}>
                {renderGroups(groupBody(post.body))}

                {seoServiceLine && (
                  <p style={{ margin: 0, fontSize: 17, lineHeight: 1.72, color: 'var(--ink-3-alt)' }}>
                    If you would rather have this done for you, see our <Link href={routes.service('seo')} style={{ color: 'var(--ink-1)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>SEO services in Pakistan</Link>.
                  </p>
                )}
                <PillarCta cta={cta} style={{ marginTop: 20 }} />

                <AuthorCard author={author} />
              </article>

              {/* maxHeight + overflow on the ASIDE, not on an ancestor: the rail
                  has to stay usable on a post with fifteen headings, and a
                  scroll container here only affects the rail's own contents.
                  Putting overflow higher up is what broke sticky in the
                  first place. */}
              <aside style={{ minWidth: 0, maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 18, position: 'sticky', top: 100, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
                {/* plainText on BOTH sides. The heading's own id is built
                    from the link-stripped text, so building the contents
                    anchor from the raw text would point every entry whose
                    heading contains a link at an element that does not
                    exist -- a contents list that silently stops working on
                    exactly the headings someone bothered to link from. */}
                <ArticleToc items={toc.map((t) => ({ id: headingId(plainText(t.text), t.index), text: plainText(t.text) }))} />

                <NewsletterSignup postSlug={post.slug} />
              </aside>
            </section>
          )}

          {/* Keep reading: same-pillar posts, skipped when there are none */}
          {related.length > 0 && (
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
                    <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{r.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          )}

          <div style={{ height: 60 }} />
        </div>
      </div>
      </SiteChrome>
    </div>
  )
}

// A body table. Scrolls sideways inside its own box on a phone rather than
// widening the page; the first column stays readable as a row label.
function TableBlock({ block }: { block: Extract<BodyBlock, { t: 'table' }> }) {
  // Column borders are right-only: a left+right border on every <td> would
  // double up into a 2px seam at each boundary (adjacent cells each drawing
  // their own edge). Right-only gives one clean line between columns and
  // none after the last column.
  const cell = { padding: '12px 14px', fontSize: 15, lineHeight: 1.55, textAlign: 'left' as const, verticalAlign: 'top' as const, borderBottom: '1px solid var(--card-line)', borderRight: '1px solid var(--card-line)' }
  const lastCell = (k: number, len: number) => (k === len - 1 ? { borderRight: 'none' } : null)
  return (
    <figure style={{ margin: '4px 0' }}>
      {/* Was transparent, sitting directly on the page's cream/ambient-orb
          background with nothing but the outer border containing it --
          and the header row shared that same background as the body, so
          only font-weight marked it as a header. A surface fill + header
          tint are what make this read as a table rather than a bare grid
          of text in a rounded box.
          No `minWidth` on the table itself any more: it used to force
          520px regardless of column count, so a simple 2-column table
          went into horizontal-scroll mode on a 325px mobile content area
          even though it would have fit -- hiding the one thing a reader
          opened the table for (confirmed on payment-gateways-in-pakistan's
          PayFast fee table). Table layout now sizes to its own content;
          the wrapper's overflow-x: auto still catches a table that's
          genuinely too wide (the 4-column gateway comparison), same as
          before. */}
      <div style={{ overflowX: 'auto', borderRadius: 14, border: '1px solid var(--card-line)', background: 'var(--surface)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--ink-3-alt)' }}>
          <thead>
            <tr>
              {block.head.map((h, k) => (
                <th key={k} scope="col" style={{ ...cell, ...lastCell(k, block.head.length), fontWeight: 800, color: 'var(--ink-1)', background: 'var(--cream-deep)' }}>{richText(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, r) => (
              <tr key={r}>
                {row.map((c, k) => (k === 0
                  ? <th key={k} scope="row" style={{ ...cell, ...lastCell(k, row.length), fontWeight: 700, color: 'var(--ink-1)' }}>{richText(c)}</th>
                  : <td key={k} style={{ ...cell, ...lastCell(k, row.length) }}>{richText(c)}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.caption && <figcaption style={{ marginTop: 8, fontSize: 14, color: 'var(--ink-muted)' }}>{richText(block.caption)}</figcaption>}
    </figure>
  )
}
