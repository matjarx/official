// The byline at the end of a post, and the small one in the hero.
//
// Every post used to say "The MatjarX Team" because that was a module
// constant rather than a field on the post. A named person with a role
// and a photo is worth more than an anonymous team byline -- to a reader
// deciding whether to trust a 3,000-word guide on payment gateways, and
// to Google, which asks explicitly who wrote a piece and what makes them
// worth reading on it.
//
// AUTHOR stays as the fallback, so a post nobody has assigned still has
// a byline rather than an empty space.

import Image from 'next/image'
import Link from 'next/link'
import { authorInitials, type BlogAuthor, avatarSrc } from '@/lib/blog-data'
import { routes } from '@/lib/routes'

/** The author's name, linked to their archive when they have one.
 *
 *  `slug` is only set on authors that came from the table, so the hardcoded
 *  team fallback stays unlinked -- it has no page to point at. That is the
 *  rule BlogAuthor's own type already states, applied in one place so the
 *  hero byline, the end-of-article card and the index cards cannot drift
 *  apart on it. */
export function AuthorName({ author, className }: { author: BlogAuthor; className?: string }) {
  if (!author.slug) return <>{author.name}</>
  return (
    <Link href={routes.blogAuthor(author.slug)} className={className ?? 'author-name-link'} rel="author">
      {author.name}
    </Link>
  )
}

function Avatar({ author, size }: { author: BlogAuthor; size: number }) {
  if (author.avatarUrl) {
    return (
      <span style={{ position: 'relative', width: size, height: size, flex: '0 0 auto', borderRadius: '50%', overflow: 'hidden' }}>
        <Image
          src={avatarSrc(author.avatarUrl)}
          alt={author.name}
          title={author.role ? `${author.name} — ${author.role}` : author.name}
          fill
          sizes={`${size}px`}
          style={{ objectFit: 'cover' }}
        />
      </span>
    )
  }
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        flex: '0 0 auto',
        borderRadius: '50%',
        background: 'linear-gradient(150deg, var(--moss-light), var(--olive))',
        display: 'grid',
        placeItems: 'center',
        fontFamily: 'var(--font-lato), Lato, sans-serif',
        fontWeight: 700,
        fontSize: Math.round(size * 0.3),
        color: 'var(--ink-on-butter)',
      }}
    >
      {authorInitials(author)}
    </span>
  )
}

/** The small byline in the navy hero: avatar, name, date, read time. */
export function AuthorByline({ author, meta, dark = true }: { author: BlogAuthor; meta: string; dark?: boolean }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar author={author} size={42} />
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: dark ? 'var(--ink-inverse)' : 'var(--ink-1)' }}>
          <AuthorName author={author} />
        </span>
        <span style={{ fontSize: 13, color: dark ? 'rgba(var(--ink-inverse-rgb), 0.6)' : 'var(--ink-muted)' }}>{meta}</span>
      </span>
    </span>
  )
}

/** The full card under the article body. */
export default function AuthorCard({ author }: { author: BlogAuthor }) {
  // The archive wins over `url` when both exist: it is this site's own page
  // for the person, carrying every post they wrote, where `url` leaves for
  // somewhere else entirely.
  const name = author.slug ? (
    <AuthorName author={author} />
  ) : author.url ? (
    <a href={author.url} target="_blank" rel="noopener noreferrer author" className="author-name-link">
      {author.name}
    </a>
  ) : (
    author.name
  )

  return (
    <div className="glass-card" style={{ marginTop: 24, padding: '26px 28px', borderRadius: 20, display: 'flex', gap: 18, alignItems: 'flex-start' }}>
      <Avatar author={author} size={56} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16.5, color: 'var(--ink-1)' }}>{name}</span>
        {author.role && <span style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>{author.role}</span>}
        {author.bio && <p style={{ margin: '4px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--ink-4-alt)' }}>{author.bio}</p>}
      </div>
    </div>
  )
}
