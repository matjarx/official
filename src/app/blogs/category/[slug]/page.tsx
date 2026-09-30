import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogArchive from '@/components/blog/BlogArchive'
import { getBlogPosts, pageTitle, pageDescription, toCard } from '@/lib/marketing-content'
import { BLOG_CATEGORIES, type BlogCategory } from '@/lib/blog-data'
import { slugifyCategory, categoryForSlug, CATEGORY_INTROS } from '@/lib/blog-categories'

// One category, at its own URL.
//
// /blogs filters by category with client-side tabs that never change the URL,
// so the six categories have always been invisible to search -- someone
// looking for "ecommerce guides pakistan" could only ever land on the whole
// blog and be left to find the filter themselves. These are the same six
// groupings as real, linkable, indexable pages.

export const revalidate = 60

export function generateStaticParams() {
  // 'All' is /blogs itself; giving it a second URL would duplicate the blog.
  return BLOG_CATEGORIES.filter((c) => c !== 'All').map((c) => ({ slug: slugifyCategory(c as BlogCategory) }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = categoryForSlug(slug)
  if (!category) return { title: pageTitle('Category not found') }
  return {
    alternates: { canonical: `/blogs/category/${slug}` },
    title: pageTitle(`${category} articles`),
    description: pageDescription(CATEGORY_INTROS[category]),
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categoryForSlug(slug)
  if (!category) notFound()

  const posts = (await getBlogPosts()).filter((p) => p.category === category)

  return <BlogArchive heading={`${category} articles`} intro={CATEGORY_INTROS[category]} posts={posts.map(toCard)} />
}
