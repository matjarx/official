import type { Metadata } from 'next'
import LocationContent, { type LocationContentShape } from '@/components/locations/LocationContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'
import { CITY_DATA } from '@/lib/location-data'

const city = CITY_DATA['chichawatni']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('cities/chichawatni')
  return {
    alternates: { canonical: '/website-design-chichawatni' },
    title: pageTitle(seo?.title || city.metaTitle),
    description: seo?.description || city.metaDesc,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<LocationContentShape>('cities/chichawatni')
  return <LocationContent locationKey="chichawatni" content={content} />
}
