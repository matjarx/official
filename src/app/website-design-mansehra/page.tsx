import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { robotsFor } from '@/lib/seo-indexing'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['mansehra']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/mansehra')
  return {
    alternates: { canonical: '/website-design-mansehra' },
    ...robotsFor('/website-design-mansehra'),
    ...pageSeo('/website-design-mansehra', seo?.title || city.metaTitle, seo?.description || city.metaDesc),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/mansehra')
  return <LocationContent locationKey="mansehra" content={content} />
}
