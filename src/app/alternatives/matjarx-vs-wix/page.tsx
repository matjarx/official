import type { Metadata } from 'next'
import ComparisonContent, { type ComparisonContentShape } from '@/components/comparisons/ComparisonContent'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/alternatives/matjarx-vs-wix' },
  title: 'MatjarX vs Wix',
  description: 'An honest comparison of MatjarX and Wix — who builds the site, how long it takes, what it costs, and when Wix is genuinely the better pick.',
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ComparisonContentShape>('comparisons/wix')
  return <ComparisonContent rivalKey="wix" content={content} />
}
