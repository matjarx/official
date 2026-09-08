import type { Metadata } from 'next'
import ComparisonContent, { type ComparisonContentShape } from '@/components/comparisons/ComparisonContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('comparisons/godaddy')
  return {
    alternates: { canonical: '/alternatives/matjarx-vs-godaddy' },
    title: pageTitle(seo?.title || 'MatjarX vs GoDaddy'),
    description: seo?.description || 'An honest comparison of MatjarX and GoDaddy — no renewal upsells, no add-on subscriptions, and when GoDaddy is genuinely the better pick.',
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ComparisonContentShape>('comparisons/godaddy')
  return <ComparisonContent rivalKey="godaddy" content={content} />
}
