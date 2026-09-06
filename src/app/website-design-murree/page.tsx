import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['murree']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/murree')
  return {
    alternates: { canonical: '/website-design-murree' },
    title: seo?.title || city.metaTitle,
    description: seo?.description || city.metaDesc,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/murree')
  return <LocationContent locationKey="murree" content={content} />
}
