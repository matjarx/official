import type { Metadata } from 'next'
import IndustryContent from '@/components/industries/IndustryContent'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['salons-and-spas']

export const metadata: Metadata = {
  alternates: { canonical: '/website-for-salons-and-spas' },
  title: industry.metaTitle,
  description: industry.metaDesc,
}

export default function Page() {
  return <IndustryContent industryKey="salons-and-spas" />
}
