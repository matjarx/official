// Single source of truth for every real route on the marketing site, so the
// header/footer/inter-page links never hard-code a path twice. Route shapes
// follow the README's stated URLs; the .dc.html prototype files referenced
// each other by literal filename (single-file constraint), which these
// replace.

export const routes = {
  home: '/',
  services: '/services',
  websiteExamples: '/website-examples',
  pricing: '/pricing',
  features: '/features',
  websiteAudit: '/website-audit',
  videos: '/videos',
  alternatives: '/alternatives',
  templates: '/templates',
  plan: (slug: 'launch' | 'boost' | 'growth' | 'platinum' | 'custom') => `/plans/${slug}`,
  industry: (slug: string) => `/website-for-${slug}`,
  location: (slug: string) => `/website-design-${slug}`,
  compare: (rival: string) => `/alternatives/matjarx-vs-${rival}`,
  bestBuilder: '/best-website-builder-pakistan',
  help: '/help',
  helpArticle: (slug: string) => `/help/${slug}`,
  blog: '/blogs',
  blogPost: (slug: string) => `/blogs/${slug}`,
  about: '/about-us',
  contact: '/contact',
  faqs: '/faqs',
  careers: '/careers',
  partner: '/become-a-partner',
  legal: (doc: 'terms' | 'refund' | 'privacy') => `/legal/${doc}`,
  thankYou: '/thank-you',
} as const

// Links out to the real platform app (app.matjarx.com), where signup and
// login actually live — the marketing site never implements those flows
// itself. Marketing's plan keys don't all match the app's own plan ids:
// notably Boost is stored there as "pro" (a historical rename). Custom
// has no backend plan at all — its own /pricing page routes that tier to
// a support conversation, not signup — so callers should send Custom's
// CTA to routes.contact instead of appSignup.
const APP_URL = 'https://app.matjarx.com'

const APP_PLAN_ID: Record<'launch' | 'boost' | 'growth' | 'platinum', string> = {
  launch: 'launch',
  boost: 'pro',
  growth: 'growth',
  platinum: 'platinum',
}

export const appLogin = `${APP_URL}/login`

export function appSignup(plan?: 'launch' | 'boost' | 'growth' | 'platinum'): string {
  if (!plan) return `${APP_URL}/signup`
  return `${APP_URL}/signup?plan=${APP_PLAN_ID[plan]}&source=marketing`
}
