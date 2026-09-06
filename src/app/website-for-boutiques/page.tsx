import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/website-for-boutiques' },
  title: 'Websites for Boutiques',
  description: '3,600 boutique and retail websites built. Full webstore with variants, cash on delivery, size guides, and an Instagram feed built in — 0% commission.',
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/boutiques')
  return <IndustryContent industryKey="boutiques" content={content} />
}
