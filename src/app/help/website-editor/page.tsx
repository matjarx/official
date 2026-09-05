import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'

export const metadata: Metadata = {
  title: "Website Editor - Edit & Customize Your Website",
  description: "Learn to edit your MatjarX website. Step-by-step guide to making changes, adding content, and self-serve website customization.",
}

export default function Page() {
  return <HelpArticleContent slug="website-editor" />
}
