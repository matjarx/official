import type { Metadata } from 'next'
import PartnerContent, { type PartnerContentShape } from '@/components/partner/PartnerContent'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/become-a-partner' },
  title: 'Partner Program',
  description: 'Refer a business and earn recurring commission on every plan, every month. For agencies, freelancers, accountants and consultants.',
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<PartnerContentShape>('partner')
  return <PartnerContent content={content} />
}
