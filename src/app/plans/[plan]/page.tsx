import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PlanContent from '@/components/plans/PlanContent'
import { ALL_PLANS, PLAN_DATA, type PlanKey } from '@/lib/plan-data'
import { routes } from '@/lib/routes'

export function generateStaticParams() {
  return (Object.keys(ALL_PLANS) as PlanKey[]).map((plan) => ({ plan }))
}

function isPlanKey(v: string): v is PlanKey {
  return v in ALL_PLANS
}

export async function generateMetadata({ params }: { params: Promise<{ plan: string }> }): Promise<Metadata> {
  const { plan } = await params
  if (!isPlanKey(plan)) return {}
  const p = ALL_PLANS[plan]
  const d = PLAN_DATA[plan]
  return {
    title: `${p.name} Plan`,
    description: d.subhead,
    alternates: { canonical: routes.plan(plan) },
  }
}

export default async function PlanPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params
  if (!isPlanKey(plan)) notFound()

  const p = ALL_PLANS[plan]
  const d = PLAN_DATA[plan]
  const priceNumber = Number(p.price.replace(/[^0-9.]/g, '')) || undefined
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${p.name} Plan`,
    description: d.subhead,
    brand: { '@type': 'Brand', name: 'MatjarX' },
    ...(priceNumber
      ? { offers: { '@type': 'Offer', price: priceNumber, priceCurrency: 'PKR', url: `https://matjarx.com${routes.plan(plan)}`, availability: 'https://schema.org/InStock' } }
      : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <PlanContent planKey={plan} />
    </>
  )
}
