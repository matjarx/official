import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('industries/boutiques')
  return {
    alternates: { canonical: '/website-for-boutiques' },
    title: seo?.title || 'Websites for Boutiques',
    description: seo?.description || '3,600 boutique and retail websites built. Full webstore with variants, cash on delivery, size guides, and an Instagram feed built in — 0% commission.',
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/boutiques')
  return <IndustryContent industryKey="boutiques" content={content} />
}
