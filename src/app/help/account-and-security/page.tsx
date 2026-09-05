import type { Metadata } from 'next'
import HelpArticleContent from '@/components/help/HelpArticleContent'

export const metadata: Metadata = {
  title: "Account & Security - Password Reset, Login Help & 2FA",
  description: "Manage your MatjarX account securely. Password reset, login help, account settings, and two-factor authentication guide.",
}

export default function Page() {
  return <HelpArticleContent slug="account-and-security" />
}
