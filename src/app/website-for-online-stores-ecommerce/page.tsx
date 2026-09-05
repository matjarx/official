import type { Metadata } from 'next'
import IndustryContent from '@/components/industries/IndustryContent'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['online-stores-ecommerce']

export const metadata: Metadata = {
  title: industry.metaTitle,
  description: industry.metaDesc,
}

export default function Page() {
  return <IndustryContent industryKey="online-stores-ecommerce" />
}
