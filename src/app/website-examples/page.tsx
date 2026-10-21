import type { Metadata } from 'next'
import WebsiteExamplesContent, { type WebsiteExamplesContentShape } from '@/components/examples/WebsiteExamplesContent'
import { getMergedContent, getSeoOverride, pageTitle, pageDescription } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('website-examples')
  return {
    alternates: { canonical: '/website-examples' },
    title: pageTitle(seo?.title || 'Website Examples'),
    description: pageDescription(seo?.description || 'Our team has 7+ years of experience and has built 70,000+ websites, first under our US brand and now in Pakistan. Browse real MatjarX sites.'),
  }
}

export const revalidate = 60

export default async function WebsiteExamplesPage() {
  const content = await getMergedContent<WebsiteExamplesContentShape>('website-examples')
  return <WebsiteExamplesContent content={content} />
}
