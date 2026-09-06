import type { Metadata } from 'next'
import PartnerContent from '@/components/partner/PartnerContent'

export const metadata: Metadata = {
  alternates: { canonical: '/become-a-partner' },
  title: 'Partner Program',
  description: 'Refer a business and earn recurring commission on every plan, every month. For agencies, freelancers, accountants and consultants.',
}

export default function Page() {
  return <PartnerContent />
}
