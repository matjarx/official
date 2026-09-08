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

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ThankYouContentShape>('thank-you')
  return <ThankYouContent content={content} />
}
