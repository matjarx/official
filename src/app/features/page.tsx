import type { Metadata } from 'next'
import FeaturesContent from '@/components/features/FeaturesContent'
import { getContentOverride, type FeaturesOverride } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/features' },
  title: 'Features',
  description: 'Everything your website needs, already included — website, store & bookings, SEO & growth, hosting & admin, and free audits. No app store, no plugins, no surprise bills.',
}

// Re-checks marketing_content at most once a minute rather than only at
// build time — otherwise an admin edit would need a full redeploy to show
// up, defeating the point of a live content editor.
export const revalidate = 60

export default async function FeaturesPage() {
  const override = await getContentOverride<FeaturesOverride>('features')
  return <FeaturesContent override={override} />
}
