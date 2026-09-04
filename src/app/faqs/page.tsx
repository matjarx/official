import type { Metadata } from 'next'
import FaqsContent from '@/components/faqs/FaqsContent'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Everything you need to know about getting started, your website, domains and email, pricing and plans, and support and guarantees.',
}

export default function Page() {
  return <FaqsContent />
}
