import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('industries/restaurants')
  return {
    alternates: { canonical: '/website-for-restaurants' },
    title: seo?.title || 'Websites for Restaurants',
    description: seo?.description || '1,240 restaurant websites built. Table bookings, a live menu, Google Maps and reviews, online ordering with 0% commission — built in 7 days.',
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/restaurants')
  return <IndustryContent industryKey="restaurants" content={content} />
}
