import type { Metadata } from 'next'
import LocationContent from '@/components/locations/LocationContent'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['mirpur-khas']

export const metadata: Metadata = {
  alternates: { canonical: '/website-design-mirpur-khas' },
  title: city.metaTitle,
  description: city.metaDesc,
}

export default function Page() {
  return <LocationContent locationKey="mirpur-khas" />
}
