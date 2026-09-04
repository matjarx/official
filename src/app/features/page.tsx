import type { Metadata } from 'next'
import FeaturesContent from '@/components/features/FeaturesContent'

export const metadata: Metadata = {
  title: 'Features',
  description: 'Everything your website needs, already included — website, store & bookings, SEO & growth, hosting & admin, and free audits. No app store, no plugins, no surprise bills.',
}

export default function FeaturesPage() {
  return <FeaturesContent />
}
