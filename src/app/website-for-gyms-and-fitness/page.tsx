import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent } from '@/lib/marketing-content'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['gyms-and-fitness']

export const metadata: Metadata = {
  alternates: { canonical: '/website-for-gyms-and-fitness' },
  title: industry.metaTitle,
  description: industry.metaDesc,
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/gyms-and-fitness')
  return <IndustryContent industryKey="gyms-and-fitness" content={content} />
}
