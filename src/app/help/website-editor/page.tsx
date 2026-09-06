import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'
import type { HelpArticle } from '@/lib/help-articles-data'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('help/website-editor')
  return {
    alternates: { canonical: '/help/website-editor' },
    title: seo?.title || "Website Editor - Edit & Customize Your Website",
    description: seo?.description || "Learn to edit your MatjarX website. Step-by-step guide to making changes, adding content, and self-serve website customization.",
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<HelpArticle>('help/website-editor')
  return <HelpArticleContent slug="website-editor" content={content} />
}
