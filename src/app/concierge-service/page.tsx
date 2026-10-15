import type { Metadata } from 'next'
import ServicesContent, { type ServicesContentShape } from '@/components/services/ServicesContent'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'
import { SERVICE_DATA } from '@/lib/services-data'

const service = SERVICE_DATA.concierge

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('services/concierge')
  return {
    alternates: { canonical: '/concierge-service' },
    ...pageSeo('/concierge-service', seo?.title || service.kicker, seo?.description || service.subtitle),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ServicesContentShape>('services/concierge')
  return <ServicesContent serviceKey="concierge" content={content} />
}
