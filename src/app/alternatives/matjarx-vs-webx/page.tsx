import type { Metadata } from 'next'
import ComparisonContent, { type ComparisonContentShape } from '@/components/comparisons/ComparisonContent'
import { robotsFor } from '@/lib/seo-indexing'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'
import { RIVAL_DATA } from '@/lib/comparison-data'

const rival = RIVAL_DATA['webx']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('comparisons/webx')
  return {
    alternates: { canonical: '/alternatives/matjarx-vs-webx' },
    ...robotsFor('/alternatives/matjarx-vs-webx'),
    ...pageSeo('/alternatives/matjarx-vs-webx', seo?.title || `MatjarX vs ${rival.name}`, seo?.description || rival.intro[0]),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ComparisonContentShape>('comparisons/webx')
  return <ComparisonContent rivalKey="webx" content={content} />
}
