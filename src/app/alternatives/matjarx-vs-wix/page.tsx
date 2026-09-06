import type { Metadata } from 'next'
import ComparisonContent from '@/components/comparisons/ComparisonContent'

export const metadata: Metadata = {
  alternates: { canonical: '/alternatives/matjarx-vs-wix' },
  title: 'MatjarX vs Wix',
  description: 'An honest comparison of MatjarX and Wix — who builds the site, how long it takes, what it costs, and when Wix is genuinely the better pick.',
}

export default function Page() {
  return <ComparisonContent rivalKey="wix" />
}
