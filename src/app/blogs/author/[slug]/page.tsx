import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogArchive from '@/components/blog/BlogArchive'
import { getBlogAuthors, getBlogAuthor, getBlogPosts, pageTitle, pageDescription, toCard, withAuthors } from '@/lib/marketing-content'

// Everything one person has written.
//
// The blog has always rendered a byline and never had anywhere for it to
// point. A named author with a page behind them -- role, description, the
// articles they wrote, their profiles -- is the difference between a claim
// and something a reader (or Google) can check, which is the whole of E-E-A-T.

export const revalidate = 60

export async function generateStaticParams() {
  // Built from the same table the pages read, so an author added in the
  // admin appears without a redeploy -- revalidate handles the rest.
  const authors = await getBlogAuthors()
  return authors.filter((a) => a.slug).map((a) => ({ slug: a.slug as string }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const author = await getBlogAuthor(slug)
  if (!author) return { title: pageTitle('Author not found') }
  return {
    alternates: { canonical: `/blogs/author/${slug}` },
    title: pageTitle(`${author.name}${author.role ? ` — ${author.role}` : ''}`),
    description: pageDescription(author.bio || `Articles written by ${author.name} for the MatjarX blog.`),
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [author, allPosts, authors] = await Promise.all([getBlogAuthor(slug), getBlogPosts(), getBlogAuthors()])
  // A 404 rather than an empty page: a slug matching nobody is a dead URL,
  // and serving 200 for it would let every typo into the index.
  if (!author) notFound()

  const posts = withAuthors(allPosts, authors).filter((p) => p.authorSlug === slug)

  return <BlogArchive heading={author.name} author={author} posts={posts.map(toCard)} />
}
