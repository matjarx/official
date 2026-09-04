import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PlanContent from '@/components/plans/PlanContent'
import { ALL_PLANS, PLAN_DATA, type PlanKey } from '@/lib/plan-data'

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
  }
}

export default async function PlanPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params
  if (!isPlanKey(plan)) notFound()
  return <PlanContent planKey={plan} />
}
