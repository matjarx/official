import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['hyderabad']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/hyderabad')
  return {
    alternates: { canonical: '/website-design-hyderabad' },
    title: pageTitle(seo?.title || city.metaTitle),
    description: seo?.description || city.metaDesc,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/hyderabad')
  return <LocationContent locationKey="hyderabad" content={content} />
}
