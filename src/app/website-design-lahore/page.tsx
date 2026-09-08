import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['lahore']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/lahore')
  return {
    alternates: { canonical: '/website-design-lahore' },
    title: pageTitle(seo?.title || city.metaTitle),
    description: seo?.description || city.metaDesc,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/lahore')
  return <LocationContent locationKey="lahore" content={content} />
}
