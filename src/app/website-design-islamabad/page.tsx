import type { Metadata } from 'next'
import LocationContent from '@/components/locations/LocationContent'

export const metadata: Metadata = {
  title: 'Website Design Islamabad',
  description: '1,100+ Islamabad and Rawalpindi businesses online with MatjarX. Professional websites built and launched in 7 days, with twin-city coverage.',
}

export default function Page() {
  return <LocationContent locationKey="islamabad" />
}
