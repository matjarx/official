import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { robotsFor } from '@/lib/seo-indexing'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['tando-allahyar']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/tando-allahyar')
  return {
    alternates: { canonical: '/website-design-tando-allahyar' },
    ...robotsFor('/website-design-tando-allahyar'),
    ...pageSeo('/website-design-tando-allahyar', seo?.title || city.metaTitle, seo?.description || city.metaDesc),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/tando-allahyar')
  return <LocationContent locationKey="tando-allahyar" content={content} />
}
