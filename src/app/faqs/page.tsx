import type { Metadata } from 'next'
import FaqsContent, { type FaqsContentShape } from '@/components/faqs/FaqsContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('faqs')
  return {
    alternates: { canonical: '/faqs' },
    title: seo?.title || 'Frequently Asked Questions',
    description: seo?.description || 'Everything you need to know about getting started, your website, domains and email, pricing and plans, and support and guarantees.',
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<FaqsContentShape>('faqs')
  return <FaqsContent content={content} />
}
