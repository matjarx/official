import type { Metadata } from 'next'
import FeaturesContent from '@/components/features/FeaturesContent'
import { getMergedContent, type FeaturesContentShape, getSeoOverride, pageTitle } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('features')
  return {
    alternates: { canonical: '/features' },
    title: pageTitle(seo?.title || 'Features'),
    description: seo?.description || 'Everything your website needs, already included — website, store & bookings, SEO & growth, hosting & admin, and free audits. No app store, no plugins, no surprise bills.',
  }
}

// Re-checks marketing_content at most once a minute rather than only at
// build time — otherwise an admin edit would need a full redeploy to show
// up, defeating the point of a live content editor.
export const revalidate = 60

export default async function FeaturesPage() {
  const content = await getMergedContent<FeaturesContentShape>('features')
  return <FeaturesContent content={content} />
}
