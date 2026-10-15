import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'
import type { HelpArticle } from '@/lib/help-articles-data'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('help/ecommerce-and-payments')
  return {
    alternates: { canonical: '/help/ecommerce-and-payments' },
    ...pageSeo('/help/ecommerce-and-payments', seo?.title || "E-Commerce & Payments - Accept Payments Online & Gateways", seo?.description || "Learn to accept payments on your MatjarX website. Payment gateway setup, JazzCash integration, and online transaction processing."),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<HelpArticle>('help/ecommerce-and-payments')
  return <HelpArticleContent slug="ecommerce-and-payments" content={content} />
}
