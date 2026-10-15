import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { robotsFor } from '@/lib/seo-indexing'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['khuzdar']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/khuzdar')
  return {
    alternates: { canonical: '/website-design-khuzdar' },
    ...robotsFor('/website-design-khuzdar'),
    ...pageSeo('/website-design-khuzdar', seo?.title || city.metaTitle, seo?.description || city.metaDesc),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/khuzdar')
  return <LocationContent locationKey="khuzdar" content={content} />
}
