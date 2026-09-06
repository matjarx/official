import type { Metadata } from 'next'
import WebsiteExamplesContent, { type WebsiteExamplesContentShape } from '@/components/examples/WebsiteExamplesContent'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/website-examples' },
  title: 'Website Examples',
  description: '70,000+ websites built globally. Browse real MatjarX sites across restaurants, boutiques, clinics, textiles, e-commerce and more.',
}

export const revalidate = 60

export default async function WebsiteExamplesPage() {
  const content = await getMergedContent<WebsiteExamplesContentShape>('website-examples')
  return <WebsiteExamplesContent content={content} />
}
