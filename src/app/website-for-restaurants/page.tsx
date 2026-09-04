import type { Metadata } from 'next'
import IndustryContent from '@/components/industries/IndustryContent'

export const metadata: Metadata = {
  title: 'Websites for Restaurants',
  description: '1,240 restaurant websites built. Table bookings, a live menu, Google Maps and reviews, online ordering with 0% commission — built in 7 days.',
}

export default function Page() {
  return <IndustryContent industryKey="restaurants" />
}
