import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['auto-repair-shops']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('industries/auto-repair-shops')
  return {
    alternates: { canonical: '/website-for-auto-repair-shops' },
    title: pageTitle(seo?.title || industry.metaTitle),
    description: seo?.description || industry.metaDesc,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/auto-repair-shops')
  return <IndustryContent industryKey="auto-repair-shops" content={content} />
}
