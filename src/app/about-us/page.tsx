import type { Metadata } from 'next'
import AboutContent, { type AboutContentShape } from '@/components/about/AboutContent'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('about')
  return {
    alternates: { canonical: '/about-us' },
...pageSeo('/about-us', seo?.title || 'About Us', seo?.description || 'The story behind MatjarX and what we believe. Our team has 7+ years of experience and has built 70,000+ websites, first under our US brand and now in Pakistan.'),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<AboutContentShape>('about')
  return <AboutContent content={content} />
}
