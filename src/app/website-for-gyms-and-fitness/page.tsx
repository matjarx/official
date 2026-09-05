import type { Metadata } from 'next'
import IndustryContent from '@/components/industries/IndustryContent'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['gyms-and-fitness']

export const metadata: Metadata = {
  title: industry.metaTitle,
  description: industry.metaDesc,
}

export default function Page() {
  return <IndustryContent industryKey="gyms-and-fitness" />
}
