import type { Metadata } from 'next'
import ComparisonContent, { type ComparisonContentShape } from '@/components/comparisons/ComparisonContent'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/alternatives/matjarx-vs-godaddy' },
  title: 'MatjarX vs GoDaddy',
  description: 'An honest comparison of MatjarX and GoDaddy — no renewal upsells, no add-on subscriptions, and when GoDaddy is genuinely the better pick.',
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ComparisonContentShape>('comparisons/godaddy')
  return <ComparisonContent rivalKey="godaddy" content={content} />
}
