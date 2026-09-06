import type { Metadata } from 'next'
import ContactContent, { type ContactContentShape } from '@/components/contact/ContactContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('contact')
  return {
    alternates: { canonical: '/contact' },
    title: seo?.title || 'Contact Us',
    description: seo?.description || 'Talk to a real person about plans, timelines or what your business needs — call, WhatsApp, email, or send us a message.',
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ContactContentShape>('contact')
  return <ContactContent content={content} />
}
