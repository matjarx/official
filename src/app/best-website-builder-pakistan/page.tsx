import type { Metadata } from 'next'
import BestBuilderContent, { type BestBuilderContentShape } from '@/components/best-builder/BestBuilderContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('best-builder')
  return {
    alternates: { canonical: '/best-website-builder-pakistan' },
    title: pageTitle(seo?.title || 'Best Website Builder in Pakistan'),
    description: seo?.description || 'MatjarX vs Wix, Squarespace, GoDaddy and local agencies — real first-year costs, who builds the site, and when a DIY builder is genuinely the right answer.',
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<BestBuilderContentShape>('best-builder')
  return <BestBuilderContent content={content} />
}
