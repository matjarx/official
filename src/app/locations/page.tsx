import type { Metadata } from 'next'
import LocationsContent from '@/components/locations/LocationsContent'
import { getSeoOverride, pageDescription } from '@/lib/marketing-content'

// Title, description and H1 from the SEO sheet, tab "Metadata (all
// pages)", row /locations. An admin __seo override on slug `locations`
// still wins, as on every other page.
const SHEET = {
  title: 'Website Design by City Across Pakistan | MatjarX',
  description: 'Website design and development for businesses in Karachi, Lahore, Islamabad and 60+ cities across Pakistan. Find your city and see local plans.',
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('locations')
  return {
    alternates: { canonical: '/locations' },
    title: { absolute: seo?.title || SHEET.title },
    description: pageDescription(seo?.description || SHEET.description),
  }
}

export default function Page() {
  return <LocationsContent />
}
