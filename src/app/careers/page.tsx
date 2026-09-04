import type { Metadata } from 'next'
import CareersContent from '@/components/careers/CareersContent'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Open roles in design, content, growth, client success and engineering. Build things that put real businesses on the map.',
}

export default function Page() {
  return <CareersContent />
}
