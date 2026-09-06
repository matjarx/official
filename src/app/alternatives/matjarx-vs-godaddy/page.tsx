import type { Metadata } from 'next'
import ComparisonContent from '@/components/comparisons/ComparisonContent'

export const metadata: Metadata = {
  alternates: { canonical: '/alternatives/matjarx-vs-godaddy' },
  title: 'MatjarX vs GoDaddy',
  description: 'An honest comparison of MatjarX and GoDaddy — no renewal upsells, no add-on subscriptions, and when GoDaddy is genuinely the better pick.',
}

export default function Page() {
  return <ComparisonContent rivalKey="godaddy" />
}
