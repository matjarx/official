import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'

export const metadata: Metadata = {
  title: "Domains & Email - Setup Custom Domain & Professional Email",
  description: "Complete guide to connecting your custom domain and setting up professional email accounts with your MatjarX website.",
}

export default function Page() {
  return <HelpArticleContent slug="domains-and-email" />
}
