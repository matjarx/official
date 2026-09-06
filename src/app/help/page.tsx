import type { Metadata } from 'next'
import HelpContent, { type HelpHubContentShape } from '@/components/help/HelpContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('help')
  return {
    alternates: { canonical: '/help' },
    title: seo?.title || 'Help Centre',
    description: seo?.description || 'Guides on getting started, billing, the website editor, domains, e-commerce, SEO and your account — or talk to a real person on WhatsApp, call or email.',
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<HelpHubContentShape>('help')
  return <HelpContent content={content} />
}
