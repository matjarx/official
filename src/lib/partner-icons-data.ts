// Real partner-ecosystem logos and category icons pulled from
// matjarx.com's WordPress media library (its old Partner Program page).
// These illustrate the kinds of complementary business tools and referral
// categories partners work across — not claims that these companies are
// MatjarX clients or built by MatjarX.

export type PartnerIcon = { src: string; label: string }

export const PARTNER_TOOL_LOGOS: PartnerIcon[] = [
  { src: '/partner/hello-alice.webp', label: 'Hello Alice logo' },
  { src: '/partner/1800accountant.webp', label: '1-800Accountant' },
  { src: '/partner/simple-business.webp', label: 'Simply Business' },
  { src: '/partner/freshbooks.webp', label: 'FreshBooks logo' },
  { src: '/partner/rocket-lawyer.webp', label: 'Rocket Lawyer logo' },
  { src: '/partner/talkroute.webp', label: 'TalkRoute logo' },
  { src: '/partner/typeform.webp', label: 'Typeform logo' },
  { src: '/partner/ruby.webp', label: 'Ruby logo' },
  { src: '/partner/monday.webp', label: 'monday.com' },
  { src: '/partner/canva.webp', label: 'Canva logo' },
  { src: '/partner/xero.webp', label: 'Xero logo' },
  { src: '/partner/fundera.webp', label: 'Fundera logo' },
  { src: '/partner/tailor-brands.webp', label: 'Tailor Brands logo' },
  { src: '/partner/shoeboxed.webp', label: 'Shoeboxed logo' },
  { src: '/partner/sanebox.webp', label: 'SaneBox logo' },
  { src: '/partner/socialbee.webp', label: 'SocialBee logo' },
  { src: '/partner/invideo.webp', label: 'InVideo logo' },
  { src: '/partner/mylo.webp', label: 'Mylo logo' },
  { src: '/partner/ecredable.webp', label: 'eCredable logo' },
  { src: '/partner/nase.webp', label: 'NASE logo' },
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
