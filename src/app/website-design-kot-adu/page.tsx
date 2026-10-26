import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { robotsFor } from '@/lib/seo-indexing'
import { getBlogPosts, getMergedContent, getSeoOverride, pageSeo, pageTitle, pageDescription, toCard } from '@/lib/marketing-content'
import { postsInPillar } from '@/lib/pillars'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['kot-adu']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/kot-adu')
  return {
    alternates: { canonical: '/website-design-kot-adu' },
    ...robotsFor('/website-design-kot-adu'),
    ...pageSeo('/website-design-kot-adu', seo?.title || city.metaTitle, seo?.description || city.metaDesc),
  }
}

export const revalidate = 60

export default async function Page() {
  const [content, posts] = await Promise.all([getMergedContent<LocationContentShape>('cities/kot-adu'), getBlogPosts()])
  // City pages belong to pillar 1, website design & development.
  return <LocationContent locationKey="kot-adu" content={content} related={postsInPillar('P1', posts).map(toCard)} />
}
