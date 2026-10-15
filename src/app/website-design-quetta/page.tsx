import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { robotsFor } from '@/lib/seo-indexing'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['quetta']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/quetta')
  return {
    alternates: { canonical: '/website-design-quetta' },
    ...robotsFor('/website-design-quetta'),
    ...pageSeo('/website-design-quetta', seo?.title || city.metaTitle, seo?.description || city.metaDesc),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/quetta')
  return <LocationContent locationKey="quetta" content={content} />
}
