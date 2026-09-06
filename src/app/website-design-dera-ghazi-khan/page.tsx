import type { Metadata } from 'next'
import LocationContent from '@/components/locations/LocationContent'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['dera-ghazi-khan']

export const metadata: Metadata = {
  alternates: { canonical: '/website-design-dera-ghazi-khan' },
  title: city.metaTitle,
  description: city.metaDesc,
}

export default function Page() {
  return <LocationContent locationKey="dera-ghazi-khan" />
}
