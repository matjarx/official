import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { getMergedContent } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['hafizabad']

export const metadata: Metadata = {
  alternates: { canonical: '/website-design-hafizabad' },
  title: city.metaTitle,
  description: city.metaDesc,
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/hafizabad')
  return <LocationContent locationKey="hafizabad" content={content} />
}
