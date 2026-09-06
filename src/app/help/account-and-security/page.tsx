import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'
import { getMergedContent } from '@/lib/marketing-content'
import type { HelpArticle } from '@/lib/help-articles-data'

export const metadata: Metadata = {
  alternates: { canonical: '/help/account-and-security' },
  title: "Account & Security - Password Reset, Login Help & 2FA",
  description: "Manage your MatjarX account securely. Password reset, login help, account settings, and two-factor authentication guide.",
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<HelpArticle>('help/account-and-security')
  return <HelpArticleContent slug="account-and-security" content={content} />
}
