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
import { escapeScriptHtml } from '@/lib/safe-script'

// Back to ISR (revalidate=60) now that publishing/editing a post calls
// POST /api/revalidate explicitly (src/app/api/revalidate/route.ts -- a
// Supabase Database Webhook, configured in the Supabase dashboard under
// Database > Webhooks, firing on insert/update of marketing_blog_posts).
// That's what actually avoids the 15 Oct bug class --
// a URL requested before its row existed got cached as a 404, and even the
// regeneration after the row appeared inherited that cached 404 status for
// metadata purposes, needing a second regeneration to self-correct. A time-
// based revalidate=60 alone doesn't fix that (the stale 404 just waits out
// the same window before quietly self-correcting); revalidatePath, called
// the moment the row is written, forces the very next request to render
// fresh rather than serve or extend the stale entry. force-dynamic was the
// blunt fix while nothing called revalidatePath; now that something does,
// it's just a few needless database reads on every single view.
export const revalidate = 60

// Without this, the route has NO generateStaticParams entries at all --
// verified locally that this, not force-dynamic vs revalidate, is what
// actually kept every blog page fully dynamic: Next only puts a dynamic
// segment's rendered output in the Full Route Cache for params this
// returns. A param outside this list still works (dynamicParams defaults
// to true) and renders on its first request -- which is also exactly what
// lets a brand new post 404 correctly before its row exists, then render
// and get cached from its first real request on.
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

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
        dangerouslySetInnerHTML={{ __html: escapeScriptHtml(JSON.stringify(articleJsonLd)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeScriptHtml(JSON.stringify(breadcrumbJsonLd([
          ['Home', routes.home],
          ['Blog', routes.blog],
          [post.category, routes.blogCategory(slugifyCategory(post.category))],
          [post.title, routes.blogPost(post.slug)],
        ]))) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeScriptHtml(JSON.stringify(faqJsonLd)) }}
        />
      )}
      {/* allPosts only resolves relatedSlugs to a title and a cover.
          Bodies stripped, or every post ships all 28 articles. */}
      <BlogPostContent post={post} allPosts={allPosts.map(toCard)} h1={seo?.h1} />
    </>
  )
}
