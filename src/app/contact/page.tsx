import type { Metadata } from 'next'
import ContactContent, { type ContactContentShape } from '@/components/contact/ContactContent'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/contact' },
  title: 'Contact Us',
  description: 'Talk to a real person about plans, timelines or what your business needs — call, WhatsApp, email, or send us a message.',
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ContactContentShape>('contact')
  return <ContactContent content={content} />
}
