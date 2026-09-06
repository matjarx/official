import type { Metadata } from 'next'
import ComparisonContent from '@/components/comparisons/ComparisonContent'
import { RIVAL_DATA } from '@/lib/comparison-data'

const rival = RIVAL_DATA['dominant-marketers']

export const metadata: Metadata = {
  alternates: { canonical: '/alternatives/matjarx-vs-dominant-marketers' },
  title: `MatjarX vs ${rival.name}`,
  description: rival.intro[0],
}

export default function Page() {
  return <ComparisonContent rivalKey="dominant-marketers" />
}
