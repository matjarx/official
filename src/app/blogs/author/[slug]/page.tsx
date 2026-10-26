import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogArchive from '@/components/blog/BlogArchive'
import { getBlogAuthors, getBlogAuthor, getBlogPosts, getSeoOverride, pageTitle, pageSeo, toCard, withAuthors } from '@/lib/marketing-content'

// Everything one person has written.
//
// The blog has always rendered a byline and never had anywhere for it to
// point. A named author with a page behind them -- role, description, the
// articles they wrote, their profiles -- is the difference between a claim
// and something a reader (or Google) can check, which is the whole of E-E-A-T.

// Per request, like the post pages, and for the same reason: an author
// URL requested before its row existed would otherwise be cached as a 404
// whose status leaks into the next regeneration's metadata. See the note in
// blogs/[slug]/page.tsx.
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const author = await getBlogAuthor(slug)
  if (!author) return { title: pageTitle('Author not found') }

  const seo = await getSeoOverride(`blogs/author/${slug}`)
  const title = seo?.title || `${author.name}${author.role ? ` — ${author.role}` : ''}`
  const description = seo?.description || author.bio || `Articles written by ${author.name} for the MatjarX blog.`
  const url = `/blogs/author/${slug}`

  const meta = pageSeo(url, title, description)
  return {
    alternates: { canonical: url },
    ...meta,
    // 'profile' rather than 'website': this page is a person, and without
    // these it inherited the sitewide defaults, so sharing an author link
    // previewed as the homepage instead of them.
    openGraph: {
      ...meta.openGraph,
      type: 'profile',
      ...(author.avatarUrl ? { images: [{ url: author.avatarUrl, alt: author.name }] } : {}),
    },
    twitter: {
      ...meta.twitter,
      ...(author.avatarUrl ? { images: [author.avatarUrl] } : {}),
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [author, allPosts, authors, seo] = await Promise.all([getBlogAuthor(slug), getBlogPosts(), getBlogAuthors(), getSeoOverride(`blogs/author/${slug}`)])
  // A 404 rather than an empty page: a slug matching nobody is a dead URL,
  // and serving 200 for it would let every typo into the index.
  if (!author) notFound()

  const posts = withAuthors(allPosts, authors).filter((p) => p.authorSlug === slug)

  return <BlogArchive heading={author.name} h1={seo?.h1} author={author} posts={posts.map(toCard)} />
}
