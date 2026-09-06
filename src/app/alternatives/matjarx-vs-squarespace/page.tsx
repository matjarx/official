import type { Metadata } from 'next'
import ComparisonContent, { type ComparisonContentShape } from '@/components/comparisons/ComparisonContent'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/alternatives/matjarx-vs-squarespace' },
  title: 'MatjarX vs Squarespace',
  description: 'An honest comparison of MatjarX and Squarespace — local payments, PKR pricing, and when Squarespace is genuinely the better pick.',
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ComparisonContentShape>('comparisons/squarespace')
  return <ComparisonContent rivalKey="squarespace" content={content} />
}
