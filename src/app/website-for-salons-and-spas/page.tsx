import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['salons-and-spas']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('industries/salons-and-spas')
  return {
    alternates: { canonical: '/website-for-salons-and-spas' },
    ...pageSeo('/website-for-salons-and-spas', seo?.title || industry.metaTitle, seo?.description || industry.metaDesc),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/salons-and-spas')
  return <IndustryContent industryKey="salons-and-spas" content={content} />
}
