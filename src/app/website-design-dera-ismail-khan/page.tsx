import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['dera-ismail-khan']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/dera-ismail-khan')
  return {
    alternates: { canonical: '/website-design-dera-ismail-khan' },
    title: pageTitle(seo?.title || city.metaTitle),
    description: seo?.description || city.metaDesc,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/dera-ismail-khan')
  return <LocationContent locationKey="dera-ismail-khan" content={content} />
}
