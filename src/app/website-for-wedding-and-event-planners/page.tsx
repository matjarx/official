import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent } from '@/lib/marketing-content'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['wedding-and-event-planners']

export const metadata: Metadata = {
  alternates: { canonical: '/website-for-wedding-and-event-planners' },
  title: industry.metaTitle,
  description: industry.metaDesc,
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/wedding-and-event-planners')
  return <IndustryContent industryKey="wedding-and-event-planners" content={content} />
}
