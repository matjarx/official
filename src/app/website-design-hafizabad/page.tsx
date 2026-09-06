import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['hafizabad']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/hafizabad')
  return {
    alternates: { canonical: '/website-design-hafizabad' },
    title: seo?.title || city.metaTitle,
    description: seo?.description || city.metaDesc,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/hafizabad')
  return <LocationContent locationKey="hafizabad" content={content} />
}
