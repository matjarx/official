import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'
import { getMergedContent } from '@/lib/marketing-content'
import type { HelpArticle } from '@/lib/help-articles-data'

export const metadata: Metadata = {
  alternates: { canonical: '/help/ecommerce-and-payments' },
  title: "E-Commerce & Payments - Accept Payments Online & Gateways",
  description: "Learn to accept payments on your MatjarX website. Payment gateway setup, JazzCash integration, and online transaction processing.",
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<HelpArticle>('help/ecommerce-and-payments')
  return <HelpArticleContent slug="ecommerce-and-payments" content={content} />
}
