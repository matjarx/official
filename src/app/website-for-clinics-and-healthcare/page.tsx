import type { Metadata } from 'next'
import IndustryContent from '@/components/industries/IndustryContent'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['clinics-and-healthcare']

export const metadata: Metadata = {
  alternates: { canonical: '/website-for-clinics-and-healthcare' },
  title: industry.metaTitle,
  description: industry.metaDesc,
}

export default function Page() {
  return <IndustryContent industryKey="clinics-and-healthcare" />
}
