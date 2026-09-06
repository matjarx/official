import type { Metadata } from 'next'
import CareersContent, { type CareersContentShape } from '@/components/careers/CareersContent'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/careers' },
  title: 'Careers',
  description: 'Open roles in design, content, growth, client success and engineering. Build things that put real businesses on the map.',
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<CareersContentShape>('careers')
  return <CareersContent content={content} />
}
