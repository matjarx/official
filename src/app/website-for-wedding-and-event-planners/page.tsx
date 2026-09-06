import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['wedding-and-event-planners']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('industries/wedding-and-event-planners')
  return {
    alternates: { canonical: '/website-for-wedding-and-event-planners' },
    title: seo?.title || industry.metaTitle,
    description: seo?.description || industry.metaDesc,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/wedding-and-event-planners')
  return <IndustryContent industryKey="wedding-and-event-planners" content={content} />
}
