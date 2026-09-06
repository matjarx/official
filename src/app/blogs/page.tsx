import type { Metadata } from 'next'
import BlogContent from '@/components/blog/BlogContent'
import { getSeoOverride } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('blogs')
  return {
    alternates: { canonical: '/blogs' },
    title: seo?.title || 'Blog',
    description: seo?.description || 'Practical guides for Pakistani and Gulf business owners — getting started, SEO, e-commerce, payments, marketing and client stories.',
  }
}

export default function Page() {
  return <BlogContent />
}
