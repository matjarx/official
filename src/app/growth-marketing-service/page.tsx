import type { Metadata } from 'next'
import ServicesContent, { type ServicesContentShape } from '@/components/services/ServicesContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'
import { SERVICE_DATA } from '@/lib/services-data'

const service = SERVICE_DATA.growth

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('services/growth')
  return {
    alternates: { canonical: '/growth-marketing-service' },
    title: seo?.title || 'Growth Marketing',
    description: seo?.description || service.subtitle,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ServicesContentShape>('services/growth')
  return <ServicesContent serviceKey="growth" content={content} />
}
