import type { Metadata } from 'next'
import AboutContent, { type AboutContentShape } from '@/components/about/AboutContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('about')
  return {
    alternates: { canonical: '/about-us' },
    title: seo?.title || 'About Us',
    description: seo?.description || 'We think every business deserves to be findable. The story behind MatjarX, what we believe, and the team behind 70,000+ websites in 8+ years.',
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<AboutContentShape>('about')
  return <AboutContent content={content} />
}
