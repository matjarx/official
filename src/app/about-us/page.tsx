import type { Metadata } from 'next'
import AboutContent, { type AboutContentShape } from '@/components/about/AboutContent'
import { getMergedContent, getSeoOverride, pageTitle, pageDescription } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('about')
  return {
    alternates: { canonical: '/about-us' },
    title: pageTitle(seo?.title || 'About Us'),
    description: pageDescription(seo?.description || 'The story behind MatjarX and what we believe. Our team has 7+ years of experience and has built 70,000+ websites, first under our US brand and now in Pakistan.'),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<AboutContentShape>('about')
  return <AboutContent content={content} />
}
