import type { Metadata } from 'next'
import ComparisonContent, { type ComparisonContentShape } from '@/components/comparisons/ComparisonContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'
import { RIVAL_DATA } from '@/lib/comparison-data'

const rival = RIVAL_DATA['howmuch-pos']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('comparisons/howmuch-pos')
  return {
    alternates: { canonical: '/alternatives/matjarx-vs-howmuch-pos' },
    title: pageTitle(seo?.title || `MatjarX vs ${rival.name}`),
    description: seo?.description || rival.intro[0],
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ComparisonContentShape>('comparisons/howmuch-pos')
  return <ComparisonContent rivalKey="howmuch-pos" content={content} />
}
