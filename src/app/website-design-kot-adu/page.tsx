import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['kot-adu']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/kot-adu')
  return {
    alternates: { canonical: '/website-design-kot-adu' },
    title: seo?.title || city.metaTitle,
    description: seo?.description || city.metaDesc,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/kot-adu')
  return <LocationContent locationKey="kot-adu" content={content} />
}
