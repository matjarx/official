import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent } from '@/lib/marketing-content'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['b2b-leather-goods-manufacturer']

export const metadata: Metadata = {
  alternates: { canonical: '/website-for-b2b-leather-goods-manufacturer' },
  title: industry.metaTitle,
  description: industry.metaDesc,
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/b2b-leather-goods-manufacturer')
  return <IndustryContent industryKey="b2b-leather-goods-manufacturer" content={content} />
}
