import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'
import { getMergedContent } from '@/lib/marketing-content'
import type { HelpArticle } from '@/lib/help-articles-data'

export const metadata: Metadata = {
  alternates: { canonical: '/help/getting-started' },
  title: "Getting Started - Website Onboarding & Launch Process",
  description: "Welcome to MatjarX! Follow our step-by-step onboarding guide to get your website launched in 7 days. Includes questionnaire and launch call.",
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<HelpArticle>('help/getting-started')
  return <HelpArticleContent slug="getting-started" content={content} />
}
