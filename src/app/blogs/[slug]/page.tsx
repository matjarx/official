import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/blog/BlogPostContent'
import { BLOG_POSTS, FEATURED_SLUG } from '@/lib/blog-data'

// Only the featured post has an authored body (see blog-data.ts) — its
// route is the only one statically generated. Other post slugs exist
// in the listing (real excerpts, real cards) but 404 on their detail
// page until that copy is supplied, rather than fabricating articles.
export function generateStaticParams() {
  return [{ slug: FEATURED_SLUG }]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post || slug !== FEATURED_SLUG) notFound()
  return <BlogPostContent post={post} />
}
