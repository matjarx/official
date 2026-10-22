import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { robotsFor } from '@/lib/seo-indexing'
import { getBlogPosts, getMergedContent, getSeoOverride, pageSeo, pageTitle, pageDescription, toCard } from '@/lib/marketing-content'
import { postsInPillar } from '@/lib/pillars'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['hyderabad']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/hyderabad')
  return {
    alternates: { canonical: '/website-design-hyderabad' },
    ...robotsFor('/website-design-hyderabad'),
    ...pageSeo('/website-design-hyderabad', seo?.title || city.metaTitle, seo?.description || city.metaDesc),
  }
}

export const revalidate = 60

export default async function Page() {
  const [content, posts] = await Promise.all([getMergedContent<LocationContentShape>('cities/hyderabad'), getBlogPosts()])
  // City pages belong to pillar 1, website design & development.
  return <LocationContent locationKey="hyderabad" content={content} related={postsInPillar('P1', posts).map(toCard)} />
}
