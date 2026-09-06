import type { Metadata } from 'next'
import PricingContent from '@/components/pricing/PricingContent'

export const metadata: Metadata = {
  alternates: { canonical: '/pricing' },
  title: 'Pricing',
  description: 'One setup fee, one monthly fee, no surprises. Compare the Launch, Boost, Growth and Platinum plans and see what a DIY website really costs you.',
}

export default function PricingPage() {
  return <PricingContent />
}
