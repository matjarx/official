import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'
import { getMergedContent } from '@/lib/marketing-content'
import type { HelpArticle } from '@/lib/help-articles-data'

export const metadata: Metadata = {
  alternates: { canonical: '/help/domains-and-email' },
  title: "Domains & Email - Setup Custom Domain & Professional Email",
  description: "Complete guide to connecting your custom domain and setting up professional email accounts with your MatjarX website.",
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<HelpArticle>('help/domains-and-email')
  return <HelpArticleContent slug="domains-and-email" content={content} />
}
