import type { Metadata } from 'next'
import BlogContent from '@/components/blog/BlogContent'
import { getSeoOverride, getBlogPosts, pageTitle } from '@/lib/marketing-content'

// Re-checks marketing_blog_posts at most once a minute — a new/edited post
// shows up without a redeploy.
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('blogs')
  return {
    alternates: { canonical: '/blogs' },
    title: pageTitle(seo?.title || 'Blog'),
    description: seo?.description || 'Practical guides for Pakistani and Gulf business owners — getting started, SEO, e-commerce, payments, marketing and client stories.',
  }
}

export default async function Page() {
  const posts = await getBlogPosts()
  return <BlogContent posts={posts} />
}
