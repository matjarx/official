import type { Metadata } from 'next'
import LocationContent from '@/components/locations/LocationContent'

export const metadata: Metadata = {
  title: 'Website Design Lahore',
  description: "1,900+ Lahore businesses online with MatjarX. Websites for wholesalers, boutiques, restaurants and services — designed, written and launched in 7 days.",
}

export default function Page() {
  return <LocationContent locationKey="lahore" />
}
