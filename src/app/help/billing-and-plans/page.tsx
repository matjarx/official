import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'
import { getMergedContent } from '@/lib/marketing-content'
import type { HelpArticle } from '@/lib/help-articles-data'

export const metadata: Metadata = {
  alternates: { canonical: '/help/billing-and-plans' },
  title: "Billing & Plans - Manage, Cancel, Switch, & Refund Policy",
  description: "Understand your MatjarX plan, manage billing, switch plans, cancel anytime, and learn our refund policy. Transparent pricing, no surprises.",
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<HelpArticle>('help/billing-and-plans')
  return <HelpArticleContent slug="billing-and-plans" content={content} />
}
