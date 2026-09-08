import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('industries/clinics')
  return {
    alternates: { canonical: '/website-for-clinics' },
    title: pageTitle(seo?.title || 'Websites for Clinics'),
    description: seo?.description || '890 clinic and practice websites built. Appointment booking, doctor profiles, and local SEO for your area — built in 7 days.',
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/clinics')
  return <IndustryContent industryKey="clinics" content={content} />
}
