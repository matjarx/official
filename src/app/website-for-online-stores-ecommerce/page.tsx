import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent } from '@/lib/marketing-content'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['online-stores-ecommerce']

export const metadata: Metadata = {
  alternates: { canonical: '/website-for-online-stores-ecommerce' },
  title: industry.metaTitle,
  description: industry.metaDesc,
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/online-stores-ecommerce')
  return <IndustryContent industryKey="online-stores-ecommerce" content={content} />
}
