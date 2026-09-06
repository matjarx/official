import type { Metadata } from 'next'
import LocationContent from '@/components/locations/LocationContent'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['rahim-yar-khan']

export const metadata: Metadata = {
  alternates: { canonical: '/website-design-rahim-yar-khan' },
  title: city.metaTitle,
  description: city.metaDesc,
}

export default function Page() {
  return <LocationContent locationKey="rahim-yar-khan" />
}
