import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'

export const metadata: Metadata = {
  title: "E-Commerce & Payments - Accept Payments Online & Gateways",
  description: "Learn to accept payments on your MatjarX website. Payment gateway setup, JazzCash integration, and online transaction processing.",
}

export default function Page() {
  return <HelpArticleContent slug="ecommerce-and-payments" />
}
