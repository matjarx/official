import type { Metadata } from 'next'
import ComparisonContent, { type ComparisonContentShape } from '@/components/comparisons/ComparisonContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'
import { RIVAL_DATA } from '@/lib/comparison-data'

const rival = RIVAL_DATA['daraz-store']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('comparisons/daraz-store')
  return {
    alternates: { canonical: '/alternatives/matjarx-vs-daraz-store' },
    title: seo?.title || `MatjarX vs ${rival.name}`,
    description: seo?.description || rival.intro[0],
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ComparisonContentShape>('comparisons/daraz-store')
  return <ComparisonContent rivalKey="daraz-store" content={content} />
}
