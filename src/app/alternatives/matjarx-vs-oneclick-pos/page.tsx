import type { Metadata } from 'next'
import ComparisonContent from '@/components/comparisons/ComparisonContent'
import { RIVAL_DATA } from '@/lib/comparison-data'

const rival = RIVAL_DATA['oneclick-pos']

export const metadata: Metadata = {
  alternates: { canonical: '/alternatives/matjarx-vs-oneclick-pos' },
  title: `MatjarX vs ${rival.name}`,
  description: rival.intro[0],
}

export default function Page() {
  return <ComparisonContent rivalKey="oneclick-pos" />
}
