import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/website-for-restaurants' },
  title: 'Websites for Restaurants',
  description: '1,240 restaurant websites built. Table bookings, a live menu, Google Maps and reviews, online ordering with 0% commission — built in 7 days.',
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/restaurants')
  return <IndustryContent industryKey="restaurants" content={content} />
}
