import type { Metadata } from 'next'
import ThankYouContent from '@/components/thank-you/ThankYouContent'

export const metadata: Metadata = {
  title: 'Thank You',
  description: "Your message is with our team. Someone will be in touch within four working hours, Monday to Saturday.",
}

export default function Page() {
  return <ThankYouContent />
}
