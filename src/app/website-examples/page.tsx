import type { Metadata } from 'next'
import WebsiteExamplesContent from '@/components/examples/WebsiteExamplesContent'

export const metadata: Metadata = {
  title: 'Website Examples',
  description: '70,000+ websites built globally. Browse real MatjarX sites across restaurants, boutiques, clinics, textiles, e-commerce and more.',
}

export default function WebsiteExamplesPage() {
  return <WebsiteExamplesContent />
}
