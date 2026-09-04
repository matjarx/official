import type { Metadata } from 'next'
import IndustryContent from '@/components/industries/IndustryContent'

export const metadata: Metadata = {
  title: 'Websites for Clinics',
  description: '890 clinic and practice websites built. Appointment booking, doctor profiles, and local SEO for your area — built in 7 days.',
}

export default function Page() {
  return <IndustryContent industryKey="clinics" />
}
