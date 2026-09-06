import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['mirpur-khas']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/mirpur-khas')
  return {
    alternates: { canonical: '/website-design-mirpur-khas' },
    title: seo?.title || city.metaTitle,
    description: seo?.description || city.metaDesc,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/mirpur-khas')
  return <LocationContent locationKey="mirpur-khas" content={content} />
}
