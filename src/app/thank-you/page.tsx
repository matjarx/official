import type { Metadata } from 'next'
import ThankYouContent from '@/components/thank-you/ThankYouContent'

export const metadata: Metadata = {
  alternates: { canonical: '/thank-you' },
  title: 'Thank You',
  description: "Your message is with our team. Someone will be in touch within 24 business hours — sooner over WhatsApp.",
}

export default function Page() {
  return <ThankYouContent />
}
