import type { Metadata } from 'next'
import ComparisonContent, { type ComparisonContentShape } from '@/components/comparisons/ComparisonContent'
import { getMergedContent } from '@/lib/marketing-content'
import { RIVAL_DATA } from '@/lib/comparison-data'

const rival = RIVAL_DATA['techabout']

export const metadata: Metadata = {
  alternates: { canonical: '/alternatives/matjarx-vs-techabout' },
  title: `MatjarX vs ${rival.name}`,
  description: rival.intro[0],
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ComparisonContentShape>('comparisons/techabout')
  return <ComparisonContent rivalKey="techabout" content={content} />
}
