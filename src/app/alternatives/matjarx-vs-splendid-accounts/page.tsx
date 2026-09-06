import type { Metadata } from 'next'
import ComparisonContent, { type ComparisonContentShape } from '@/components/comparisons/ComparisonContent'
import { getMergedContent } from '@/lib/marketing-content'
import { RIVAL_DATA } from '@/lib/comparison-data'

const rival = RIVAL_DATA['splendid-accounts']

export const metadata: Metadata = {
  alternates: { canonical: '/alternatives/matjarx-vs-splendid-accounts' },
  title: `MatjarX vs ${rival.name}`,
  description: rival.intro[0],
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<ComparisonContentShape>('comparisons/splendid-accounts')
  return <ComparisonContent rivalKey="splendid-accounts" content={content} />
}
