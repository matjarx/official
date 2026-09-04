import type { Metadata } from 'next'
import LocationContent from '@/components/locations/LocationContent'

export const metadata: Metadata = {
  title: 'Website Design Karachi',
  description: '2,400+ Karachi businesses online with MatjarX. Websites designed, written and launched in 7 days — office in Clifton, in-person meetings available.',
}

export default function Page() {
  return <LocationContent locationKey="karachi" />
}
