import type { Metadata } from 'next'
import BlogContent from '@/components/blog/BlogContent'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical guides for Pakistani and Gulf business owners — getting started, SEO, e-commerce, payments, marketing and client stories.',
}

export default function Page() {
  return <BlogContent />
}
