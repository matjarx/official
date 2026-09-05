import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'

export const metadata: Metadata = {
  title: "Billing & Plans - Manage, Cancel, Switch, & Refund Policy",
  description: "Understand your MatjarX plan, manage billing, switch plans, cancel anytime, and learn our refund policy. Transparent pricing, no surprises.",
}

export default function Page() {
  return <HelpArticleContent slug="billing-and-plans" />
}
