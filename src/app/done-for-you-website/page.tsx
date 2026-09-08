import type { Metadata } from 'next'
import ServicesContent, { type ServicesContentShape } from '@/components/services/ServicesContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'
import { SERVICE_DATA } from '@/lib/services-data'

const service = SERVICE_DATA.dfy

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('services/dfy')
  return {
    alternates: { canonical: '/done-for-you-website' },
    title: pageTitle(seo?.title || service.kicker),
    description: seo?.description || service.subtitle,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ServicesContentShape>('services/dfy')
  return <ServicesContent serviceKey="dfy" content={content} />
}
