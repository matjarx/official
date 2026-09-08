import type { Metadata } from 'next'
import ComparisonContent, { type ComparisonContentShape } from '@/components/comparisons/ComparisonContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'
import { RIVAL_DATA } from '@/lib/comparison-data'

const rival = RIVAL_DATA['folio3']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('comparisons/folio3')
  return {
    alternates: { canonical: '/alternatives/matjarx-vs-folio3' },
    title: pageTitle(seo?.title || `MatjarX vs ${rival.name}`),
    description: seo?.description || rival.intro[0],
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ComparisonContentShape>('comparisons/folio3')
  return <ComparisonContent rivalKey="folio3" content={content} />
}
