import type { Metadata } from 'next'
import IndustryContent, { type IndustryContentShape } from '@/components/industries/IndustryContent'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/website-for-clinics' },
  title: 'Websites for Clinics',
  description: '890 clinic and practice websites built. Appointment booking, doctor profiles, and local SEO for your area — built in 7 days.',
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<IndustryContentShape>('industries/clinics')
  return <IndustryContent industryKey="clinics" content={content} />
}
