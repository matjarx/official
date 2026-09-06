// Real partner-ecosystem logos and category icons pulled from
// matjarx.com's WordPress media library (its old Partner Program page).
// These illustrate the kinds of complementary business tools and referral
// categories partners work across — not claims that these companies are
// MatjarX clients or built by MatjarX.

export type PartnerIcon = { src: string; label: string }

export const PARTNER_TOOL_LOGOS: PartnerIcon[] = [
  { src: '/partner/hello-alice.png', label: 'Hello Alice' },
  { src: '/partner/1800accountant.png', label: '1-800Accountant' },
  { src: '/partner/simple-business.png', label: 'Simply Business' },
  { src: '/partner/freshbooks.png', label: 'FreshBooks' },
  { src: '/partner/rocket-lawyer.png', label: 'Rocket Lawyer' },
  { src: '/partner/talkroute.png', label: 'TalkRoute' },
  { src: '/partner/typeform.png', label: 'Typeform' },
  { src: '/partner/ruby.png', label: 'Ruby' },
  { src: '/partner/monday.png', label: 'monday.com' },
  { src: '/partner/canva.png', label: 'Canva' },
]

export const PARTNER_CATEGORY_ICONS: PartnerIcon[] = [
  { src: '/partner/category-legal.svg', label: 'Legal services' },
  { src: '/partner/category-accounting.svg', label: 'Accounting' },
  { src: '/partner/category-marketing.svg', label: 'Marketing services' },
  { src: '/partner/category-funding.svg', label: 'Funding' },
  { src: '/partner/category-insurance.svg', label: 'Insurance' },
  { src: '/partner/category-premium.svg', label: 'Premium services' },
]

export const PLAN_TIER_ICONS: Record<'Launch' | 'Boost' | 'Growth' | 'Platinum', string> = {
  Launch: '/pricing/icon-launch.svg',
  Boost: '/pricing/icon-boost.svg',
  Growth: '/pricing/icon-growth.svg',
  Platinum: '/pricing/icon-platinum.svg',
}
