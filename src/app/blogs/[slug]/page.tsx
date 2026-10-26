import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/blog/BlogPostContent'
import { AUTHOR } from '@/lib/blog-data'
import { routes } from '@/lib/routes'
import { getBlogPost, getBlogPosts, getSeoOverride, toCard, pageSeo, getContentUpdatedAt } from '@/lib/marketing-content'
import { isoPublishDate, postLastModified } from '@/lib/blog-dates'
import { slugifyCategory } from '@/lib/blog-categories'
import { ORGANIZATION_ID, breadcrumbJsonLd } from '@/lib/schema'
import { faqFromBody } from '@/lib/blog-faq'

// Rendered per request, not cached (ISR) -- so a post shows, with its own
// title and description, the moment its row exists.
//
// Under ISR, a URL requested before its row existed was cached as a 404.
// When the row appeared, the background regeneration that replaced that
// entry ran with the cached 404 status still set, and Next 16 picks the
// metadata from the status (is404 -> the not-found boundary's): the post's
// body went out under "Page Not Found" and noindex until a SECOND
// regeneration. That is what /blogs/website-price-in-pakistan served on
// 15 Oct. Calling connection() on a miss is not an option either: switching
// an ISR route to dynamic at runtime is a 500. Rendering per request has no
// cached 404 to inherit. Hostinger's CDN does not cache these pages anyway
// (x-hcdn-cache-status: DYNAMIC), so the cost is a few database reads per view.
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const [post, seo] = await Promise.all([getBlogPost(slug), getSeoOverride(`blog/${slug}`)])
  if (!post) return {}
  // A post's `title` is its H1. Its <title> and meta description come from
  // the __seo override for `blog/<slug>` -- the spec sheet's values (SEO
  // group 3), or an admin edit on top -- falling back to the H1 and excerpt.
  const coverImage = post.coverImage && {
    url: post.coverImage.src.startsWith('http') ? post.coverImage.src : `https://matjarx.com${post.coverImage.src}`,
    width: post.coverImage.width,
    height: post.coverImage.height,
    alt: post.coverImage.alt,
  }
  const meta = pageSeo(routes.blogPost(post.slug), seo?.title || post.title, seo?.description || post.excerpt, coverImage || undefined)
  return {
    ...meta,
    alternates: { canonical: routes.blogPost(post.slug) },
    openGraph: { ...meta.openGraph, type: 'article', publishedTime: post.date },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, allPosts, seo, updated] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts(),
    getSeoOverride(`blog/${slug}`),
    getContentUpdatedAt(),
  ])
  if (!post) notFound()

  // Real dates: the publish date as ISO, and the same "last modified" the
  // sitemap uses (lib/blog-dates.ts), so the two can't disagree.
  const datePublished = isoPublishDate(post.date)
  const modified = postLastModified(post.date, updated.blog.get(post.slug))
  const postUrl = `https://matjarx.com${routes.blogPost(post.slug)}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    ...(datePublished && { datePublished }),
    ...(modified && { dateModified: modified.toISOString() }),
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
    // url is the author's page on this site; their own profile, when they
    // have one, goes in sameAs.
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author.name,
          ...(post.author.role && { jobTitle: post.author.role }),
          ...(post.authorSlug
            ? { url: `https://matjarx.com${routes.blogAuthor(post.authorSlug)}`, ...(post.author.url && { sameAs: [post.author.url] }) }
            : post.author.url && { url: post.author.url }),
          ...(post.author.avatarUrl && { image: post.author.avatarUrl }),
          ...(post.author.bio && { description: post.author.bio }),
        }
      : { '@type': 'Organization', name: AUTHOR.name },
    publisher: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: 'MatjarX', logo: { '@type': 'ImageObject', url: 'https://matjarx.com/icon.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  }

  // FAQPage from the post's own "Frequently asked questions" section --
  // see lib/blog-faq.ts. Omitted entirely when a post has none.
  const faq = faqFromBody(post.body)
  const faqJsonLd = faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
          ['Home', routes.home],
          ['Blog', routes.blog],
          [post.category, routes.blogCategory(slugifyCategory(post.category))],
          [post.title, routes.blogPost(post.slug)],
        ])) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {/* allPosts only resolves relatedSlugs to a title and a cover.
          Bodies stripped, or every post ships all 28 articles. */}
      <BlogPostContent post={post} allPosts={allPosts.map(toCard)} h1={seo?.h1} />
    </>
  )
}
