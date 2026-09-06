import type { Metadata } from 'next'
import ServicesContent from '@/components/services/ServicesContent'
import { getMergedContent } from '@/lib/marketing-content'
import type { SERVICE_DATA } from '@/lib/services-data'

export const metadata: Metadata = {
  alternates: { canonical: '/services' },
  title: 'Services',
  description: 'Done-for-you websites, local & global SEO, a concierge edit service, and growth marketing — everything MatjarX does for your business, explained.',
}

// Re-checks marketing_content at most once a minute rather than only at
// build time — otherwise an admin edit would need a full redeploy to show
// up, defeating the point of a live content editor.
export const revalidate = 60

export default async function ServicesPage() {
  const content = await getMergedContent<{ tabs: typeof SERVICE_DATA }>('services')
  return <ServicesContent tabs={content.tabs} />
}
