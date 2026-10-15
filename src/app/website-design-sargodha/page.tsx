import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { robotsFor } from '@/lib/seo-indexing'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['sargodha']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/sargodha')
  return {
    alternates: { canonical: '/website-design-sargodha' },
    ...robotsFor('/website-design-sargodha'),
    ...pageSeo('/website-design-sargodha', seo?.title || city.metaTitle, seo?.description || city.metaDesc),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/sargodha')
  return <LocationContent locationKey="sargodha" content={content} />
}
