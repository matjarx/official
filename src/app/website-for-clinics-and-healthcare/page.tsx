import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent } from '@/lib/marketing-content'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['clinics-and-healthcare']

export const metadata: Metadata = {
  alternates: { canonical: '/website-for-clinics-and-healthcare' },
  title: industry.metaTitle,
  description: industry.metaDesc,
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/clinics-and-healthcare')
  return <IndustryContent industryKey="clinics-and-healthcare" content={content} />
}
