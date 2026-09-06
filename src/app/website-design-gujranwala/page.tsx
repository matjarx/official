import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { getMergedContent } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['gujranwala']

export const metadata: Metadata = {
  alternates: { canonical: '/website-design-gujranwala' },
  title: city.metaTitle,
  description: city.metaDesc,
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/gujranwala')
  return <LocationContent locationKey="gujranwala" content={content} />
}
