import type { Metadata } from 'next'
import TemplatesContent, { type TemplatesContentShape } from '@/components/templates/TemplatesContent'
import { META } from '@/lib/templates-data'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/templates' },
  title: META.title,
  description: META.description,
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<TemplatesContentShape>('templates')
  return <TemplatesContent content={content} />
}
