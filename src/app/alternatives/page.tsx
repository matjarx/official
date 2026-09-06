import type { Metadata } from 'next'
import AlternativesContent, { type AlternativesContentShape } from '@/components/alternatives/AlternativesContent'
import { META } from '@/lib/alternatives-data'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('alternatives')
  return {
    alternates: { canonical: '/alternatives' },
    title: seo?.title || META.title,
    description: seo?.description || META.description,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<AlternativesContentShape>('alternatives')
  return <AlternativesContent content={content} />
}
