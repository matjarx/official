import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'
import { INDUSTRY_DATA } from '@/lib/industry-data'

const industry = INDUSTRY_DATA['online-stores-ecommerce']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('industries/online-stores-ecommerce')
  return {
    alternates: { canonical: '/website-for-online-stores-ecommerce' },
    title: pageTitle(seo?.title || industry.metaTitle),
    description: seo?.description || industry.metaDesc,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/online-stores-ecommerce')
  return <IndustryContent industryKey="online-stores-ecommerce" content={content} />
}
