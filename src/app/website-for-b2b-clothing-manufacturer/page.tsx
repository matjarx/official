import type { Metadata } from 'next'
import IndustryContent from '@/components/industries/IndustryContent'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['b2b-clothing-manufacturer']

export const metadata: Metadata = {
  alternates: { canonical: '/website-for-b2b-clothing-manufacturer' },
  title: industry.metaTitle,
  description: industry.metaDesc,
}

export default function Page() {
  return <IndustryContent industryKey="b2b-clothing-manufacturer" />
}
