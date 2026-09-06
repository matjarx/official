import type { Metadata } from 'next'
import ComparisonContent from '@/components/comparisons/ComparisonContent'
import { RIVAL_DATA } from '@/lib/comparison-data'

const rival = RIVAL_DATA['devbatch']

export const metadata: Metadata = {
  alternates: { canonical: '/alternatives/matjarx-vs-devbatch' },
  title: `MatjarX vs ${rival.name}`,
  description: rival.intro[0],
}

export default function Page() {
  return <ComparisonContent rivalKey="devbatch" />
}
