import type { Metadata } from 'next'
import ServicesContent from '@/components/services/ServicesContent'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Done-for-you websites, local & global SEO, a concierge edit service, and growth marketing — everything MatjarX does for your business, explained.',
}

export default function ServicesPage() {
  return <ServicesContent />
}
