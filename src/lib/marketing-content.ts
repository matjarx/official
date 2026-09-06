// Editable-content overrides — lets the matjarx-platform admin edit a
// curated set of marketing copy per page without a redeploy. Each page's
// hardcoded content stays in its own component as the default/seed value;
// a row here, keyed by slug, overrides only the fields it sets. A missing
// row, a missing field, or a Supabase error all fall back to the default —
// nothing regresses if this table is empty or unreachable.
//
// Only real marketing copy is editable this way (headlines, testimonials,
// FAQs, plan pitch/why/bestFor text) — never pricing numbers, signup URLs,
// or anything tied to calculations elsewhere on the site.

import { supabase } from './supabase'

export type Testimonial = { quote: string; name: string; company: string; initials: string; tint: string }
export type QA = { q: string; a: string }
export type FaqEntry = { question: string; answer: string }
export type PlanCopyOverride = { pitch?: string; why?: string; bestFor?: string; features?: string[] }

export type PricingOverride = {
  heroTicks?: string[]
  testimonials?: Testimonial[]
  howToChoose?: QA[]
  faqs?: FaqEntry[]
  plans?: Partial<Record<'Launch' | 'Boost' | 'Growth' | 'Platinum', PlanCopyOverride>>
}

export type PlanPageOverride = {
  headline?: string
  subhead?: string
  ctaLabel?: string
  heroTicks?: string[]
  faqs?: [string, string][]
}

export type HomeOverride = {
  faqs?: FaqEntry[]
}

export type FeaturesOverride = {
  faqs?: [string, string][]
}

export type MarketingContentSlug =
  | 'home' | 'pricing' | 'services' | 'features'
  | 'plans/launch' | 'plans/boost' | 'plans/growth' | 'plans/platinum' | 'plans/custom'

// Fetches the override row for a page. Server-side only (called from a
// page.tsx server component) — safe to call with the anon key since RLS
// only grants that key public SELECT, never write.
export async function getContentOverride<T>(slug: MarketingContentSlug): Promise<T | null> {
  try {
    const { data, error } = await supabase
      .from('marketing_content')
      .select('data')
      .eq('slug', slug)
      .maybeSingle()
    if (error || !data) return null
    return data.data as T
  } catch {
    return null
  }
}
