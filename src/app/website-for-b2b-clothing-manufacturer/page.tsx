import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['b2b-clothing-manufacturer']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('industries/b2b-clothing-manufacturer')
  return {
    alternates: { canonical: '/website-for-b2b-clothing-manufacturer' },
    title: pageTitle(seo?.title || industry.metaTitle),
    description: seo?.description || industry.metaDesc,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/b2b-clothing-manufacturer')
  return <IndustryContent industryKey="b2b-clothing-manufacturer" content={content} />
}
