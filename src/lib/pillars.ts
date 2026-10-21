// Content pillars: which blog posts belong together, and where each
// pillar sends a reader who is ready to act.
//
// Source: the SEO spec sheet, tabs "Pillars & clusters" and "Internal
// links" (/seo-data/pillars-clusters.csv). Each list is in the sheet's
// order -- pillar post first -- and includes posts that are planned but
// not published yet. Only posts that actually exist are ever linked
// (see relatedInPillar), so a planned post starts appearing the moment
// it goes live, without a code change.
//
// Two support clusters have no CTA of their own in the sheet and share
// their nearest pillar's: payment setup (S1) sits with selling online
// (P5), social/ad/WhatsApp setup (S2) with digital marketing (P4).

import { routes } from './routes'

export type PillarKey = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'stories'

export type PillarCta = { title: string; body: string; label: string; href: string }

export const PILLAR_CTA: Record<PillarKey, PillarCta> = {
  P1: {
    title: 'Want your website built for you?',
    body: 'Our team designs, writes and builds your website, then launches it with you and shows you how to edit it.',
    label: 'See website development',
    href: routes.service('dfy'),
  },
  P2: {
    title: 'Choosing a website builder?',
    body: 'See the options Pakistani businesses use, compared side by side on price, payments and support.',
    label: 'Compare website builders',
    href: routes.bestBuilder,
  },
  P3: {
    title: "Check your website's SEO for free",
    body: 'We check 10 areas of your website and send you what to fix, by WhatsApp or email.',
    label: 'Get my free SEO check',
    href: routes.websiteAudit,
  },
  P4: {
    title: 'Want your marketing run for you?',
    body: 'Our team plans and runs your social media and ads, and we report your results every month.',
    label: 'See digital marketing',
    href: routes.service('growth'),
  },
  P5: {
    title: 'Selling online?',
    body: 'See what we build for online stores in Pakistan, from product pages to checkout.',
    label: 'See online store websites',
    href: routes.industry('online-stores-ecommerce'),
  },
  stories: {
    title: 'See more of our work',
    body: 'Browse websites we have built for businesses like yours.',
    label: 'See website examples',
    href: routes.websiteExamples,
  },
}

// Blog slugs per pillar, in the sheet's order. `support` lists are the
// S1/S2 clusters: they share the pillar's CTA and fill its related slots
// after the pillar's own posts.
const PILLAR_POSTS: Record<PillarKey, { core: string[]; support?: string[] }> = {
  P1: {
    core: [
      'website-development-in-pakistan-guide',
      'website-price-in-pakistan',
      'best-software-houses-in-pakistan',
      'how-to-start-an-online-business-in-pakistan',
      'how-to-choose-website-company',
      'freelancer-vs-agency-vs-builder',
      'domain-and-hosting-explained',
      'website-vs-facebook-page',
      'how-long-to-build-a-website',
      'pages-a-small-business-website-needs',
      'why-website-is-important-for-business',
      'professional-website-build-trust',
      'top-5-website-mistakes-killing-conversions',
      'mobile-first-design-tips-ux',
      'b2b-website-myths-broken',
      'matjarx-complete-guide-small-business',
      'pk-domain-registration',
    ],
  },
  P2: {
    core: ['website-kaise-banaye', 'daraz-vs-own-online-store', 'ai-website-builder-vs-done-for-you'],
  },
  P3: {
    core: [
      'local-seo-for-small-business-guide',
      'best-seo-companies-in-pakistan',
      'seo-cost-in-pakistan',
      'how-to-choose-seo-company',
      'business-listing-sites-pakistan',
      'how-to-rank-on-google-maps',
      'google-business-profile-setup-pakistan',
      'google-changed-my-business-information-what-should-i-do',
      'move-website-without-losing-rankings',
      'definitive-master-guide-to-generative-engine-optimization',
      'aeo-for-faqs',
      'how-to-appear-in-chatgpt-answers',
      'hiring-a-geo-expert-agencies-and-consulting-services',
      'top-geo-and-content-automation-tools-search-strategy',
      'mastering-ai-search-best-generative-ai-geo-training-courses',
      // Not in the sheet; both are generative-engine-optimisation posts,
      // the AI-search sub-pillar of P3.
      'how-generative-engine-optimization-works',
      'beyond-blue-links-how-generative-engine-optimization-drives-traffic',
      'online-reputation-management-guide',
      'get-more-google-reviews-pakistan',
      'on-page-seo-checklist',
    ],
  },
  P4: {
    core: [
      'digital-marketing-guide-pakistan',
      'top-digital-marketing-agencies-in-pakistan',
      'what-social-media-management-includes',
      'meta-vs-tiktok-ads-cost',
      'set-up-tiktok-ads',
      'ads-vs-seo',
      'ads-management-pakistan',
      'google-ads-for-local-shops',
      'business-content-ideas-no-dancing',
      'trends-in-digital-marketing-for-pakistani-businesses',
    ],
    // S2. facebook-page-for-business is not in the sheet; it is the
    // companion of facebook-page-setup-guide.
    support: ['facebook-page-setup-guide', 'facebook-page-for-business', 'tiktok-growth-limit-switch-business-account', 'whatsapp-automation-setup'],
  },
  P5: {
    core: ['payment-gateways-in-pakistan', '11-11-sale-checklist', 'cod-optimization-reduce-rto'],
    // S1
    support: ['setup-sadapay-sadabiz-website', 'setup-easypaisa-business-website', 'setup-jazzcash-jazz-business-website', 'setup-payfast-payment-gateway'],
  },
  stories: {
    core: ['rastah-case-study-lessons-small-business', 'elegance-embroidery-mukesh-kumar-lucky-draw-winner'],
  },
}

const PILLAR_OF = new Map<string, { pillar: PillarKey; support: boolean }>()
for (const [pillar, { core, support = [] }] of Object.entries(PILLAR_POSTS) as [PillarKey, { core: string[]; support?: string[] }][]) {
  for (const s of core) PILLAR_OF.set(s, { pillar, support: false })
  for (const s of support) PILLAR_OF.set(s, { pillar, support: true })
}

export function pillarOf(slug: string): PillarKey | null {
  return PILLAR_OF.get(slug)?.pillar ?? null
}

/** Every post slug the map knows, for the check script. */
export function pillarSlugs(): string[] {
  return [...PILLAR_OF.keys()]
}

/**
 * Up to `count` posts from the same pillar, never the post itself.
 *
 * A support post (S1/S2) reads its own cluster first, then the pillar.
 * A pillar post reads its pillar first, then its support cluster.
 * `existing` is the set of slugs that are live; nothing else is linked.
 */
export function relatedInPillar(pillar: PillarKey, existing: ReadonlySet<string>, opts: { exclude?: string; count?: number } = {}): string[] {
  const { exclude, count = 3 } = opts
  const { core, support = [] } = PILLAR_POSTS[pillar]
  const fromSupport = exclude ? PILLAR_OF.get(exclude)?.support : false
  const order = fromSupport ? [...support, ...core] : [...core, ...support]
  return order.filter((s) => s !== exclude && existing.has(s)).slice(0, count)
}

/** The first `count` live posts of a pillar, in the sheet's order. */
export function postsInPillar<T extends { slug: string }>(pillar: PillarKey, posts: T[], count = 3): T[] {
  const bySlug = new Map(posts.map((p) => [p.slug, p]))
  return relatedInPillar(pillar, new Set(bySlug.keys()), { count }).map((s) => bySlug.get(s)!)
}
