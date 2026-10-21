import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { robotsFor } from '@/lib/seo-indexing'
import { getBlogPosts, getMergedContent, getSeoOverride, pageTitle, pageDescription, toCard } from '@/lib/marketing-content'
import { postsInPillar } from '@/lib/pillars'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['shikarpur']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/shikarpur')
  return {
    alternates: { canonical: '/website-design-shikarpur' },
    ...robotsFor('/website-design-shikarpur'),
    title: pageTitle(seo?.title || city.metaTitle),
    description: pageDescription(seo?.description || city.metaDesc),
  }
}

export const revalidate = 60

export default async function Page() {
  const [content, posts] = await Promise.all([getMergedContent<LocationContentShape>('cities/shikarpur'), getBlogPosts()])
  // City pages belong to pillar 1, website design & development.
  return <LocationContent locationKey="shikarpur" content={content} related={postsInPillar('P1', posts).map(toCard)} />
}
