import type { Metadata } from 'next'
import HelpContent, { type HelpHubContentShape } from '@/components/help/HelpContent'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/help' },
  title: 'Help Centre',
  description: 'Guides on getting started, billing, the website editor, domains, e-commerce, SEO and your account — or talk to a real person on WhatsApp, call or email.',
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<HelpHubContentShape>('help')
  return <HelpContent content={content} />
}
