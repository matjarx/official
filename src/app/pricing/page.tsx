import type { Metadata } from 'next'
import PricingContent from '@/components/pricing/PricingContent'
import { getMergedContent, type PricingContentShape } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/pricing' },
  title: 'Pricing',
  description: 'One setup fee, one monthly fee, no surprises. Compare the Launch, Boost, Growth and Platinum plans and see what a DIY website really costs you.',
}

// Re-checks marketing_content at most once a minute rather than only at
// build time — otherwise an admin edit would need a full redeploy to show
// up, defeating the point of a live content editor.
export const revalidate = 60

export default async function PricingPage() {
  const content = await getMergedContent<PricingContentShape>('pricing')
  return <PricingContent content={content} />
}
