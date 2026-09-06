import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['construction-companies']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('industries/construction-companies')
  return {
    alternates: { canonical: '/website-for-construction-companies' },
    title: seo?.title || industry.metaTitle,
    description: seo?.description || industry.metaDesc,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/construction-companies')
  return <IndustryContent industryKey="construction-companies" content={content} />
}
