import type { Metadata } from 'next'
import ComparisonContent, { type ComparisonContentShape } from '@/components/comparisons/ComparisonContent'
import { robotsFor } from '@/lib/seo-indexing'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'
import { RIVAL_DATA } from '@/lib/comparison-data'

const rival = RIVAL_DATA['daraz-store']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('comparisons/daraz-store')
  return {
    alternates: { canonical: '/alternatives/matjarx-vs-daraz-store' },
    ...robotsFor('/alternatives/matjarx-vs-daraz-store'),
    ...pageSeo('/alternatives/matjarx-vs-daraz-store', seo?.title || `MatjarX vs ${rival.name}`, seo?.description || rival.intro[0]),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ComparisonContentShape>('comparisons/daraz-store')
  return <ComparisonContent rivalKey="daraz-store" content={content} />
}
