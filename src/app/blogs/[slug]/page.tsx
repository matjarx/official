import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/blog/BlogPostContent'
import { BLOG_POSTS, AUTHOR, type BlogPost } from '@/lib/blog-data'
import { routes } from '@/lib/routes'
import { getMergedContent } from '@/lib/marketing-content'

// Re-checks marketing_content at most once a minute rather than only at
// build time — otherwise an admin edit would need a full redeploy to show
// up, defeating the point of a live content editor.
export const revalidate = 60

// All 28 real posts now have an authored body (see blog-data.ts) — every
// slug in BLOG_POSTS is statically generated.
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const defaultPost = BLOG_POSTS.find((p) => p.slug === slug)
  if (!defaultPost) return {}
  const post = await getMergedContent<BlogPost>(`blog/${slug}`)
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: routes.blogPost(post.slug) },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.date },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const defaultPost = BLOG_POSTS.find((p) => p.slug === slug)
  if (!defaultPost) notFound()
  const post = await getMergedContent<BlogPost>(`blog/${slug}`)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: AUTHOR.name },
    publisher: { '@type': 'Organization', name: 'MatjarX' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://matjarx.com${routes.blogPost(post.slug)}` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPostContent post={post} />
    </>
  )
}
