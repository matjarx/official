import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'

export const metadata: Metadata = {
  alternates: { canonical: '/help/getting-started' },
  title: "Getting Started - Website Onboarding & Launch Process",
  description: "Welcome to MatjarX! Follow our step-by-step onboarding guide to get your website launched in 7 days. Includes questionnaire and launch call.",
}

export default function Page() {
  return <HelpArticleContent slug="getting-started" />
}
