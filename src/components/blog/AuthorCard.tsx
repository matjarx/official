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
import { authorInitials, type BlogAuthor } from '@/lib/blog-data'

function Avatar({ author, size }: { author: BlogAuthor; size: number }) {
  if (author.avatarUrl) {
    return (
      <span style={{ position: 'relative', width: size, height: size, flex: '0 0 auto', borderRadius: '50%', overflow: 'hidden' }}>
        <Image
          src={author.avatarUrl}
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
        <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: dark ? '#FFFFFF' : '#04121F' }}>
          {author.name}
        </span>
        <span style={{ fontSize: 13, color: dark ? 'rgba(255,255,255,0.6)' : '#5A6E81' }}>{meta}</span>
      </span>
    </span>
  )
}

/** The full card under the article body. */
export default function AuthorCard({ author }: { author: BlogAuthor }) {
  const name = author.url ? (
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
