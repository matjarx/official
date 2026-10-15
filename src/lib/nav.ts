import { WHATSAPP_HREF } from '@/lib/contact-details'
// Header and footer nav, defined once. The header menu follows the SEO
// spec (group 5): Services, Industries, Templates, Examples, Pricing,
// Resources.

import { routes } from './routes'

// `home` and `company` have no header item any more (spec group 5), but
// pages still pass them as `active`; they simply highlight nothing.
export type NavKey = 'home' | 'services' | 'industries' | 'templates' | 'examples' | 'pricing' | 'resources' | 'company'

export type NavMenuItem = { label: string; href: string; note?: string }
// `href` is optional: Industries has no hub page, so its label opens the
// menu instead of navigating.
export type NavItem = { label: string; href?: string; key: NavKey; menu?: NavMenuItem[] }

// The 13 live industry pages. /website-for-clinics 301s to
// /website-for-clinics-and-healthcare, so it is not listed.
export const NAV_INDUSTRIES: NavMenuItem[] = [
  { label: 'Restaurants', href: routes.industry('restaurants') },
  { label: 'Boutiques', href: routes.industry('boutiques') },
  { label: 'Clinics & healthcare', href: routes.industry('clinics-and-healthcare') },
  { label: 'Real estate', href: routes.industry('real-estate') },
  { label: 'Salons & spas', href: routes.industry('salons-and-spas') },
  { label: 'Gyms & fitness', href: routes.industry('gyms-and-fitness') },
  { label: 'Construction', href: routes.industry('construction-companies') },
  { label: 'Law firms', href: routes.industry('law-firms') },
  { label: 'Online stores', href: routes.industry('online-stores-ecommerce') },
  { label: 'Weddings & events', href: routes.industry('wedding-and-event-planners') },
  { label: 'Auto repair', href: routes.industry('auto-repair-shops') },
  { label: 'B2B clothing manufacturers', href: routes.industry('b2b-clothing-manufacturer') },
  { label: 'B2B leather goods manufacturers', href: routes.industry('b2b-leather-goods-manufacturer') },
]

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Services',
    href: routes.service('dfy'),
    key: 'services',
    menu: [
      { label: 'Website development', href: routes.service('dfy'), note: 'Built and launched in 7 business days' },
      { label: 'SEO services', href: routes.service('seo'), note: 'Get found on Google' },
      { label: 'Digital marketing', href: routes.service('growth'), note: 'Social media and ads, run for you' },
      { label: 'Website maintenance', href: routes.service('concierge'), note: 'Edits done by us, as agreed' },
    ],
  },
  { label: 'Industries', key: 'industries', menu: NAV_INDUSTRIES },
  { label: 'Templates', href: routes.templates, key: 'templates' },
  { label: 'Examples', href: routes.websiteExamples, key: 'examples' },
  { label: 'Pricing', href: routes.pricing, key: 'pricing' },
  {
    label: 'Resources',
    href: routes.blog,
    key: 'resources',
    menu: [
      { label: 'Blog', href: routes.blog, note: 'Guides for Pakistani businesses' },
      { label: 'Help', href: routes.help, note: 'Guides, and a real person to ask' },
      { label: 'Free SEO check', href: routes.websiteAudit, note: "Check your website's SEO for free" },
    ],
  },
]

// The 11 main cities. TODO: link /locations instead once that hub page
// exists (spec group 5, item 1).
export const FOOTER_CITIES: { label: string; href: string }[] = [
  ['Karachi', 'karachi'], ['Lahore', 'lahore'], ['Islamabad', 'islamabad'],
  ['Rawalpindi', 'rawalpindi'], ['Faisalabad', 'faisalabad'], ['Multan', 'multan'],
  ['Peshawar', 'peshawar'], ['Hyderabad', 'hyderabad'], ['Gujranwala', 'gujranwala'],
  ['Sialkot', 'sialkot'], ['Quetta', 'quetta'],
].map(([label, slug]) => ({ label, href: routes.location(slug) }))

// No footer link may point at a noindexed page; check-internal-links.mjs
// enforces it against seo-noindex-list.ts.
export const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Pricing', href: routes.pricing },
      { label: 'Features', href: routes.features },
      { label: 'Templates', href: routes.templates },
      { label: 'Website examples', href: routes.websiteExamples },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Website development', href: routes.service('dfy') },
      { label: 'SEO services', href: routes.service('seo') },
      { label: 'Digital marketing', href: routes.service('growth') },
      { label: 'Website maintenance', href: routes.service('concierge') },
      { label: 'Free SEO check', href: routes.websiteAudit },
    ],
  },
  {
    // These pages lost their header links in the new menu; listing them
    // here keeps each one linked from every page.
    title: 'Resources',
    links: [
      { label: 'Blog', href: routes.blog },
      { label: 'Help centre', href: routes.help },
      { label: 'FAQs', href: routes.faqs },
      { label: 'Videos', href: routes.videos },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: routes.about },
      { label: 'Careers', href: routes.careers },
      { label: 'Get in touch', href: routes.contact },
      { label: 'Become a partner', href: routes.partner },
    ],
  },
  {
    title: 'Compare',
    links: [
      { label: 'MatjarX vs Wix', href: routes.compare('wix') },
      { label: 'MatjarX vs Squarespace', href: routes.compare('squarespace') },
      { label: 'MatjarX vs GoDaddy', href: routes.compare('godaddy') },
      { label: 'Best builder in Pakistan', href: routes.bestBuilder },
      { label: 'All alternatives', href: routes.alternatives },
    ],
  },
]

export const FOOTER_SOCIALS = [
  { name: 'WhatsApp', href: WHATSAPP_HREF, icon: 'M12 3.2a8.7 8.7 0 0 0-7.4 13.3L3.4 21l4.6-1.2A8.7 8.7 0 1 0 12 3.2Z' },
  { name: 'Facebook', href: 'https://www.facebook.com/matjarxpakistan/', icon: 'M14 8.5h2.5V5.2H14c-2 0-3.4 1.5-3.4 3.5v1.6H8.5v3.3h2.1V21h3.4v-7.4h2.4l.5-3.3h-2.9V8.9c0-.3.2-.4.5-.4Z' },
  { name: 'Instagram', href: 'https://www.instagram.com/matjarxpakistan/', icon: 'M8 3.5h8a4.5 4.5 0 0 1 4.5 4.5v8A4.5 4.5 0 0 1 16 20.5H8A4.5 4.5 0 0 1 3.5 16V8A4.5 4.5 0 0 1 8 3.5Zm4 5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm4.6-1.1h.01' },
  { name: 'X', href: 'https://x.com/matjar_X', icon: 'M5 5l14 14M19 5 5 19' },
  { name: 'Threads', href: 'https://www.threads.com/@matjarxpakistan', icon: 'M12 3.5a8.5 8.5 0 1 0 0 17c2.3 0 3.9-.7 4.9-1.8.9-1 1.3-2.3 1.1-3.7-.2-1.5-1.2-2.5-2.7-2.9-1.1-.3-2.3-.2-3.2.3M12 8a3 3 0 1 0 0 6 3 3 0 0 0 3-2.7' },
  { name: 'Google Business Profile', href: 'https://share.google/YaxpOFsUcIr1elr7G', icon: 'M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Zm0-8.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@matjarxofficial', icon: 'M14 3.5v10.8a3.6 3.6 0 1 1-3.6-3.6M14 3.5a5 5 0 0 0 5 5' },
  { name: 'LinkedIn', href: 'http://linkedin.com/company/matjarx/', icon: 'M5 9.5v10M5 5.6h.01M10.5 19.5v-10M10.5 13.2c0-2 1.4-3.7 3.4-3.7s3.6 1.7 3.6 3.7v6.3' },
  { name: 'YouTube', href: 'https://www.youtube.com/@matjarxofficial', icon: 'M3.5 8.5a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3ZM10.5 9.5l4 2.5-4 2.5Z' },
]
