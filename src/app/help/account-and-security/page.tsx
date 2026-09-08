import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'
import type { HelpArticle } from '@/lib/help-articles-data'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('help/account-and-security')
  return {
    alternates: { canonical: '/help/account-and-security' },
    title: pageTitle(seo?.title || "Account & Security - Password Reset, Login Help & 2FA"),
    description: seo?.description || "Manage your MatjarX account securely. Password reset, login help, account settings, and two-factor authentication guide.",
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<HelpArticle>('help/account-and-security')
  return <HelpArticleContent slug="account-and-security" content={content} />
}
