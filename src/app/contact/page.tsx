import type { Metadata } from 'next'
import ContactContent, { type ContactContentShape } from '@/components/contact/ContactContent'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'
import { localBusinessJsonLd } from '@/lib/schema'
import { CITY_DATA, CITY_SLUGS } from '@/lib/location-data'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('contact')
  return {
    alternates: { canonical: '/contact' },
    ...pageSeo('/contact', seo?.title || 'Contact Us', seo?.description || 'Talk to a real person about plans, timelines or what your business needs — call, WhatsApp, email, or send us a message.'),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ContactContentShape>('contact')
  // The only page with LocalBusiness: the office, its hours and address.
  // Every city with a page is areaServed, plus the country.
  const localBusiness = localBusinessJsonLd([
    ...CITY_SLUGS.map((slug) => ({ '@type': 'City', name: CITY_DATA[slug].name })),
    { '@type': 'Country', name: 'Pakistan' },
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <ContactContent content={content} />
    </>
  )
}
