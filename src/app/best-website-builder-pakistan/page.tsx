import type { Metadata } from 'next'
import BestBuilderContent from '@/components/best-builder/BestBuilderContent'

export const metadata: Metadata = {
  title: 'Best Website Builder in Pakistan',
  description: 'MatjarX vs Wix, Squarespace, GoDaddy and local agencies — real first-year costs, who builds the site, and when a DIY builder is genuinely the right answer.',
}

export default function Page() {
  return <BestBuilderContent />
}
