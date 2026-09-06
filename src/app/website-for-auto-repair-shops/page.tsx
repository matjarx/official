import type { Metadata } from 'next'
import IndustryContent from '@/components/industries/IndustryContent'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['auto-repair-shops']

export const metadata: Metadata = {
  alternates: { canonical: '/website-for-auto-repair-shops' },
  title: industry.metaTitle,
  description: industry.metaDesc,
}

export default function Page() {
  return <IndustryContent industryKey="auto-repair-shops" />
}
