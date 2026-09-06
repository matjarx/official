import type { Metadata } from 'next'
import WebsiteAuditContent from '@/components/website-audit/WebsiteAuditContent'

export const metadata: Metadata = {
  alternates: { canonical: '/website-audit' },
  title: 'Website Audit',
  description: "Discover exactly what's holding your website back from ranking on Google and getting customers online — a complete audit across 10 key areas, delivered by our team.",
}

export default function Page() {
  return <WebsiteAuditContent />
}
