import type { Metadata } from 'next'
import PartnerContent, { type PartnerContentShape } from '@/components/partner/PartnerContent'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('partner')
  return {
    alternates: { canonical: '/become-a-partner' },
    title: seo?.title || 'Partner Program',
    description: seo?.description || 'Refer a business and earn recurring commission on every plan, every month. For agencies, freelancers, accountants and consultants.',
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<PartnerContentShape>('partner')
  return <PartnerContent content={content} />
}
