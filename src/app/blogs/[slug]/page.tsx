import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/blog/BlogPostContent'
import { BLOG_POSTS, AUTHOR } from '@/lib/blog-data'
import { routes } from '@/lib/routes'
import { getBlogPost, getBlogPosts, toCard } from '@/lib/marketing-content'

// Re-checks marketing_blog_posts at most once a minute rather than only at
// build time — otherwise a new/edited post would need a full redeploy to
// show up, defeating the point of a real editor.
export const revalidate = 60

// Pre-warms the 28 original posts at build time; a post created later
// through the admin still renders fine on first request (dynamicParams
// isn't disabled here, so Next falls through to on-demand rendering for
// any slug not in this list).
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: routes.blogPost(post.slug) },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.date },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([getBlogPost(slug), getBlogPosts()])
  if (!post) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    ...(post.coverImage && {
      // width/height/name/caption as well as description: Google Images
      // reads all of them, and the alternative was carrying four fields
      // on the row and publishing one.
      image: {
        '@type': 'ImageObject',
        url: post.coverImage.src.startsWith('http') ? post.coverImage.src : `https://matjarx.com${post.coverImage.src}`,
        width: post.coverImage.width,
        height: post.coverImage.height,
        ...(post.coverImage.title && { name: post.coverImage.title }),
        ...(post.coverImage.caption && { caption: post.coverImage.caption }),
        ...(post.coverImage.description && { description: post.coverImage.description }),
      },
    }),
    // A named writer is a Person with a link to whatever establishes
    // them; the house byline stays an Organization. Google asks who
    // wrote a piece, and "The MatjarX Team" is not an answer for a
    // 3,000-word guide.
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author.name,
          ...(post.author.role && { jobTitle: post.author.role }),
          ...(post.author.url && { url: post.author.url }),
          ...(post.author.avatarUrl && { image: post.author.avatarUrl }),
          ...(post.author.bio && { description: post.author.bio }),
        }
      : { '@type': 'Organization', name: AUTHOR.name },
    publisher: { '@type': 'Organization', name: 'MatjarX' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://matjarx.com${routes.blogPost(post.slug)}` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* allPosts only resolves relatedSlugs to a title and a cover.
          Bodies stripped, or every post ships all 28 articles. */}
      <BlogPostContent post={post} allPosts={allPosts.map(toCard)} />
    </>
  )
}
