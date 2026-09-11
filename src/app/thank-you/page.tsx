import type { Metadata } from 'next'
import ThankYouContent, { type ThankYouContentShape } from '@/components/thank-you/ThankYouContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('thank-you')
  return {
    alternates: { canonical: '/thank-you' },
    title: pageTitle(seo?.title || 'Thank You'),
    description: seo?.description || "Your message is with our team. Someone will be in touch within 24 business hours — sooner over WhatsApp.",
  }
}

// Every form on the site lands here now (was previously each form's own
// inline "thanks" message) — the ?source= tells it which one, so the
// hero subtitle can say something accurate for that specific submission
// instead of one generic line. Reading searchParams makes this render
// per-request rather than the ISR this page used before source-specific
// messaging existed.
export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }: { searchParams: Promise<{ source?: string }> }) {
  const { source } = await searchParams
  const content = await getMergedContent<ThankYouContentShape>('thank-you')
  return <ThankYouContent content={content} source={source} />
}
