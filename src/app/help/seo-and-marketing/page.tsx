import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'

export const metadata: Metadata = {
  title: "SEO & Marketing Help - Improve Google Rankings & Traffic",
  description: "Complete guide to improving your Google rankings and attracting customers. Local SEO, content strategy, marketing tips for MatjarX websites.",
}

export default function Page() {
  return <HelpArticleContent slug="seo-and-marketing" />
}
