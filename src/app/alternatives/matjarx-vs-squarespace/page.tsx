import type { Metadata } from 'next'
import ComparisonContent, { type ComparisonContentShape } from '@/components/comparisons/ComparisonContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('comparisons/squarespace')
  return {
    alternates: { canonical: '/alternatives/matjarx-vs-squarespace' },
    title: pageTitle(seo?.title || 'MatjarX vs Squarespace'),
    description: seo?.description || 'An honest comparison of MatjarX and Squarespace — local payments, PKR pricing, and when Squarespace is genuinely the better pick.',
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ComparisonContentShape>('comparisons/squarespace')
  return <ComparisonContent rivalKey="squarespace" content={content} />
}
