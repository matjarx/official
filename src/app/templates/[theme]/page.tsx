// /templates/<slug> — the page that ranks for a theme.
//
// Statically generated, one per entry in THEME_LANDINGS, so a crawler gets
// real server-rendered HTML rather than /templates' client-side modal —
// which is why the query-string form (/templates?salon-website-template)
// could never be indexed: its HTML is byte-identical to /templates.
//
// No database read at all. The theme's colours were going to come from
// `themes.primary_color`, until it turned out four of the ten still hold
// the admin form's default blue — see theme-landing-data.ts. Everything
// this page needs is a literal, so it builds with no network and cannot be
// broken by a schema change.

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ThemeLandingContent from '@/components/templates/ThemeLandingContent'
import { getThemes } from '@/lib/theme-catalogue'
import { THEME_LANDINGS, themeLandingFor } from '@/lib/theme-landing-data'
import { pageTitle, pageDescription } from '@/lib/marketing-content'

type Props = { params: Promise<{ theme: string }> }

export const revalidate = 300

export function generateStaticParams() {
  return THEME_LANDINGS.map((t) => ({ theme: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { theme } = await params
  const landing = themeLandingFor(theme)
  if (!landing) return { title: 'Template not found', robots: { index: false, follow: true } }

  return {
    // The brand name is the <h1>; the <title> carries what people type.
    title: pageTitle(landing.metaTitle),
    description: pageDescription(landing.metaDesc),
    alternates: { canonical: `/templates/${landing.slug}` },
    openGraph: { title: landing.metaTitle, description: landing.metaDesc, url: `/templates/${landing.slug}` },
  }
}

export default async function ThemeLandingPage({ params }: Props) {
  const { theme } = await params
  const landing = themeLandingFor(theme)
  if (!landing) notFound()

  // Which plan this theme is actually sold on. Hardcoding Launch sent
  // people to a checkout for a plan that cannot have the theme they just
  // chose -- see minPlanFor in theme-catalogue.ts.
  const themes = await getThemes()
  const match = themes.find((t) => t.demoUrl?.endsWith(`/themes/${landing.themeKey}`))

  return <ThemeLandingContent landing={landing} minPlan={match?.minPlan ?? 'launch'} />
}
