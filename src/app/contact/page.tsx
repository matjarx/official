import type { Metadata } from 'next'
import ContactContent from '@/components/contact/ContactContent'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Talk to a real person about plans, timelines or what your business needs — call, WhatsApp, email, or send us a message.',
}

export default function Page() {
  return <ContactContent />
}
