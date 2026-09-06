import type { Metadata } from 'next'
import WebsiteExamplesContent, { type WebsiteExamplesContentShape } from '@/components/examples/WebsiteExamplesContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('website-examples')
  return {
    alternates: { canonical: '/website-examples' },
    title: seo?.title || 'Website Examples',
    description: seo?.description || '70,000+ websites built globally. Browse real MatjarX sites across restaurants, boutiques, clinics, textiles, e-commerce and more.',
  }
}

export const revalidate = 60

export default async function WebsiteExamplesPage() {
  const content = await getMergedContent<WebsiteExamplesContentShape>('website-examples')
  return <WebsiteExamplesContent content={content} />
}
