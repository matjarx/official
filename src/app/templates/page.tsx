import type { Metadata } from 'next'
import TemplatesContent, { type TemplatesContentShape } from '@/components/templates/TemplatesContent'
import { META } from '@/lib/templates-data'
import { getMergedContent, getSeoOverride, pageTitle, pageDescription } from '@/lib/marketing-content'
import { getThemes, groupByIndustry } from '@/lib/theme-catalogue'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('templates')
  return {
    alternates: { canonical: '/templates' },
    title: pageTitle(seo?.title || META.title),
    description: pageDescription(seo?.description || META.description),
  }
}

export const revalidate = 60

export default async function Page() {
  // Read on the server so the industry listing is in the HTML. It is the
  // only part of this page a crawler could not otherwise see, and it is
  // the part worth seeing.
  const [content, themes] = await Promise.all([
    getMergedContent<TemplatesContentShape>('templates'),
    getThemes(),
  ])
  return <TemplatesContent content={content} themes={themes} groups={groupByIndustry(themes)} />
}
