import type { Metadata } from 'next'
import ServicesContent, { type ServicesContentShape } from '@/components/services/ServicesContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'
import { SERVICE_DATA } from '@/lib/services-data'

const service = SERVICE_DATA.concierge

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('services/concierge')
  return {
    alternates: { canonical: '/concierge-service' },
    title: pageTitle(seo?.title || service.kicker),
    description: seo?.description || service.subtitle,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ServicesContentShape>('services/concierge')
  return <ServicesContent serviceKey="concierge" content={content} />
}
