import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { robotsFor } from '@/lib/seo-indexing'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['muridke']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/muridke')
  return {
    alternates: { canonical: '/website-design-muridke' },
    ...robotsFor('/website-design-muridke'),
    ...pageSeo('/website-design-muridke', seo?.title || city.metaTitle, seo?.description || city.metaDesc),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/muridke')
  return <LocationContent locationKey="muridke" content={content} />
}
