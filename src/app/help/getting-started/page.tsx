import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'
import type { HelpArticle } from '@/lib/help-articles-data'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('help/getting-started')
  return {
    alternates: { canonical: '/help/getting-started' },
    title: pageTitle(seo?.title || "Getting Started - Website Onboarding & Launch Process"),
    description: seo?.description || "Welcome to MatjarX! Follow our step-by-step onboarding guide to get your website launched in 7 days. Includes questionnaire and launch call.",
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<HelpArticle>('help/getting-started')
  return <HelpArticleContent slug="getting-started" content={content} />
}
