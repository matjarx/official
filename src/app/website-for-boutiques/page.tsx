import type { Metadata } from 'next'
import IndustryContent from '@/components/industries/IndustryContent'

export const metadata: Metadata = {
  alternates: { canonical: '/website-for-boutiques' },
  title: 'Websites for Boutiques',
  description: '3,600 boutique and retail websites built. Full webstore with variants, cash on delivery, size guides, and an Instagram feed built in — 0% commission.',
}

export default function Page() {
  return <IndustryContent industryKey="boutiques" />
}
