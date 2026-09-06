import type { Metadata } from 'next'
import HelpContent from '@/components/help/HelpContent'

export const metadata: Metadata = {
  alternates: { canonical: '/help' },
  title: 'Help Centre',
  description: 'Guides on getting started, billing, the website editor, domains, e-commerce, SEO and your account — or talk to a real person on WhatsApp, call or email.',
}

export default function Page() {
  return <HelpContent />
}
