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
