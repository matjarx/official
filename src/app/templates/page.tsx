import type { Metadata } from 'next'
import TemplatesContent, { type TemplatesContentShape } from '@/components/templates/TemplatesContent'
import { META } from '@/lib/templates-data'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('templates')
  return {
    alternates: { canonical: '/templates' },
    title: seo?.title || META.title,
    description: seo?.description || META.description,
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<TemplatesContentShape>('templates')
  return <TemplatesContent content={content} />
}
