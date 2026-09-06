import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'
import { getMergedContent } from '@/lib/marketing-content'
import type { HelpArticle } from '@/lib/help-articles-data'

export const metadata: Metadata = {
  alternates: { canonical: '/help/seo-and-marketing' },
  title: "SEO & Marketing Help - Improve Google Rankings & Traffic",
  description: "Complete guide to improving your Google rankings and attracting customers. Local SEO, content strategy, marketing tips for MatjarX websites.",
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<HelpArticle>('help/seo-and-marketing')
  return <HelpArticleContent slug="seo-and-marketing" content={content} />
}
