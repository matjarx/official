import type { Metadata } from 'next'
import CareersContent, { type CareersContentShape } from '@/components/careers/CareersContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('careers')
  return {
    alternates: { canonical: '/careers' },
    title: pageTitle(seo?.title || 'Careers'),
    description: seo?.description || 'Open roles in design, content, growth, client success and engineering. Build things that put real businesses on the map.',
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<CareersContentShape>('careers')
  return <CareersContent content={content} />
}
