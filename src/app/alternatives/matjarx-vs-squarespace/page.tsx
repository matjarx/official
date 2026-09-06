import type { Metadata } from 'next'
import ComparisonContent from '@/components/comparisons/ComparisonContent'

export const metadata: Metadata = {
  alternates: { canonical: '/alternatives/matjarx-vs-squarespace' },
  title: 'MatjarX vs Squarespace',
  description: 'An honest comparison of MatjarX and Squarespace — local payments, PKR pricing, and when Squarespace is genuinely the better pick.',
}

export default function Page() {
  return <ComparisonContent rivalKey="squarespace" />
}
