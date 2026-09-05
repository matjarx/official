import type { Metadata } from 'next'
import AboutContent from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'We think every business deserves to be findable. The story behind MatjarX, what we believe, and the team behind 70,000+ websites in 8+ years.',
}

export default function Page() {
  return <AboutContent />
}
