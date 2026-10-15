import type { Metadata } from 'next'
import WebsiteAuditContent, { type WebsiteAuditContentShape } from '@/components/website-audit/WebsiteAuditContent'
import { getMergedContent, getSeoOverride, pageSeo } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('website-audit')
  return {
    alternates: { canonical: '/complete-website-audit-for-organic-visibility' },
    ...pageSeo('/complete-website-audit-for-organic-visibility', seo?.title || 'Website Audit', seo?.description || "Discover exactly what's holding your website back from ranking on Google and getting customers online — a complete audit across 10 key areas, delivered by our team."),
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<WebsiteAuditContentShape>('website-audit')
  return <WebsiteAuditContent content={content} />
}
