// A filtered list of posts — one author's, or one category's.
//
// /blogs already lists everything with client-side category tabs, which is
// good for browsing and useless for search: the tabs never change the URL, so
// there has only ever been one indexable blog page. A reader arriving from
// Google on "SEO" lands on the whole blog and has to find the filter.
//
// These archives are real URLs with their own title, description and
// canonical, so a category or a person is something that can rank and be
// linked to. Deliberately a server component with no filter UI of its own —
// the URL is the filter.
//
// Card markup matches BlogContent's grid exactly, so an archive does not look
// like a different site.

import Link from 'next/link'
import Image from 'next/image'
import SiteChrome from '@/components/SiteChrome'
import AmbientOrbs from '@/components/AmbientOrbs'
import PostCard from './PostCard'
import { routes } from '@/lib/routes'
import type { BlogCard } from '@/lib/marketing-content'
import { type BlogAuthor, authorInitials, avatarSrc } from '@/lib/blog-data'

function AuthorHeader({ author, postCount }: { author: BlogAuthor; postCount: number }) {
  const socials = Object.entries(author.socials || {}).filter(([, url]) => url)
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {author.avatarUrl ? (
        <Image
          src={avatarSrc(author.avatarUrl)}
          alt={author.name}
          width={96}
          height={96}
          style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', flex: '0 0 auto' }}
        />
      ) : (
        <span
          aria-hidden
          style={{
            width: 96, height: 96, borderRadius: '50%', flex: '0 0 auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--moss-light, #E7EDD8)', color: 'var(--ink-1)',
            fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 32,
          }}
        >
          {authorInitials(author)}
        </span>
      )}
      <div style={{ flex: '1 1 320px', minWidth: 0 }}>
        {author.role && (
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--olive, #6B7B3C)' }}>
            {author.role}
          </p>
        )}
        <h1 style={{ margin: '6px 0 0', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 34, lineHeight: 1.16, letterSpacing: '-0.8px', color: 'var(--ink-1)' }}>
          {author.name}
        </h1>
        {author.bio && (
          <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.62, color: 'var(--ink-5)', maxWidth: 560 }}>{author.bio}</p>
        )}
        <p style={{ margin: '12px 0 0', fontSize: 13, color: 'var(--ink-muted)' }}>
          {postCount} {postCount === 1 ? 'article' : 'articles'}
        </p>
        {(socials.length > 0 || author.url) && (
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 14 }}>
            {author.url && (
              <a href={author.url} target="_blank" rel="noopener noreferrer me" style={{ fontSize: 13, fontWeight: 600, color: 'var(--olive, #5F7138)' }}>
                Profile
              </a>
            )}
            {socials.map(([platform, url]) => (
              // rel="me" is what ties these profiles to this person for
              // anything reading the page as an identity rather than a list
              // of outbound links.
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer me" style={{ fontSize: 13, fontWeight: 600, color: 'var(--olive, #5F7138)', textTransform: 'capitalize' }}>
                {platform === 'x' ? 'X' : platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function BlogArchive({
  heading,
  intro,
  author,
  posts,
}: {
  heading: string
  intro?: string
  author?: BlogAuthor
  posts: BlogCard[]
}) {
  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'clip' }}>
      <AmbientOrbs />
      <div className="page-content">
        <SiteChrome active="resources">
          <section style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 20px 0' }}>
            <p style={{ margin: '0 0 18px', fontSize: 13 }}>
              <Link href={routes.blog} style={{ color: 'var(--ink-muted)' }}>← All articles</Link>
            </p>

            {author ? (
              <AuthorHeader author={author} postCount={posts.length} />
            ) : (
              <>
                <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 38, lineHeight: 1.14, letterSpacing: '-0.9px', color: 'var(--ink-1)' }}>
                  {heading}
                </h1>
                {intro && <p style={{ margin: '14px 0 0', fontSize: 15.5, lineHeight: 1.62, color: 'var(--ink-5)', maxWidth: 620 }}>{intro}</p>}
                <p style={{ margin: '12px 0 0', fontSize: 13, color: 'var(--ink-faint)' }}>
                  {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                </p>
              </>
            )}
          </section>

          <section style={{ maxWidth: 1120, margin: '0 auto', padding: '36px 20px 72px' }}>
            {posts.length === 0 ? (
              <p style={{ fontSize: 15, color: 'var(--ink-5)' }}>
                Nothing published here yet. <Link href={routes.blog} style={{ color: 'var(--olive, #5F7138)', fontWeight: 600 }}>Browse all articles</Link>.
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 26 }}>
                {posts.map((p) => (
                  <PostCard key={p.slug} post={p} as="h2" />
                ))}
              </div>
            )}
          </section>
        </SiteChrome>
      </div>
    </div>
  )
}
