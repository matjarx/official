// One post card, used by the blog index and by every archive page.
//
// BlogContent and BlogArchive each had their own copy — the same cover
// image, the same scrim, the same category pill, the same title/excerpt/meta
// stack, down to the `sizes="320px"`. The only real difference was the
// heading level, and that one IS a decision: on /blogs the cards sit under a
// section heading so the title is an h3, while an archive page's cards are
// the page's own content and take h2. So it is a prop rather than a copy.
//
// The prop type is structural rather than `BlogPost`, because the archive
// passes `BlogCard` (the same record with its body dropped) and the card
// reads neither.

import Link from 'next/link'
import Image from 'next/image'
import { routes } from '@/lib/routes'

export type PostCardPost = {
  slug: string
  title: string
  category: string
  excerpt: string
  date: string
  readTime: string
  tint: string
  coverImage?: { src: string; alt: string; title?: string }
}

export default function PostCard({ post: p, as: Heading = 'h3' }: {
  post: PostCardPost
  /** h3 under a section heading (the index), h2 when the cards are the page. */
  as?: 'h2' | 'h3'
}) {
  return (
    <Link href={routes.blogPost(p.slug)} className="glass-card" style={{ display: 'flex', flexDirection: 'column', borderRadius: 22, overflow: 'hidden' }}>
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
        <Heading style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 18, lineHeight: 1.28, letterSpacing: '-0.35px', color: 'var(--ink-1)' }}>{p.title}</Heading>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.58, color: 'var(--ink-5)' }}>{p.excerpt}</p>
        <span style={{ marginTop: 'auto', paddingTop: 12, fontSize: 12, color: 'var(--ink-muted)' }}>{p.date} · {p.readTime}</span>
      </div>
    </Link>
  )
}
