import type { Metadata } from 'next'
import AlternativesContent, { type AlternativesContentShape } from '@/components/alternatives/AlternativesContent'
import { META } from '@/lib/alternatives-data'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/alternatives' },
  title: META.title,
  description: META.description,
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<AlternativesContentShape>('alternatives')
  return <AlternativesContent content={content} />
}
