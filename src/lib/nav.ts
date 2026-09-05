// Header nav structure — shared by SiteHeader (light) and SiteHeaderDark so
// the menu is defined once. Mirrors the `defs` array in the Site Header
// design files exactly (labels, notes, grouping); hrefs point at real
// routes instead of the prototype's .dc.html filenames.

import { routes } from './routes'

export type NavKey = 'home' | 'services' | 'examples' | 'pricing' | 'resources' | 'company'

export type NavMenuItem = { label: string; href: string; note?: string }
export type NavItem = { label: string; href: string; key: NavKey; menu?: NavMenuItem[] }

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: routes.home, key: 'home' },
  {
    label: 'Services',
    href: routes.services,
    key: 'services',
    menu: [
      { label: 'Done-for-you website', href: routes.services, note: 'Built and launched in 7 days' },
      { label: 'Local, national & global SEO', href: routes.services, note: 'Get found on Google' },
      { label: 'Concierge service', href: routes.services, note: 'Unlimited edits, done by us' },
      { label: 'Growth marketing', href: routes.services, note: 'A team that grows your revenue' },
      { label: 'Website audit', href: routes.websiteAudit, note: '10 areas checked, delivered by WhatsApp or email' },
      { label: 'Websites for restaurants', href: routes.industry('restaurants'), note: 'Bookings, menus and Google Maps' },
      { label: 'Websites for boutiques', href: routes.industry('boutiques'), note: 'Webstore, COD and variants' },
      { label: 'Websites for clinics', href: routes.industry('clinics'), note: 'Appointments and doctor profiles' },
      { label: 'Website design Karachi', href: routes.location('karachi'), note: 'Office in Clifton' },
      { label: 'Website design Lahore', href: routes.location('lahore') },
      { label: 'Website design Islamabad', href: routes.location('islamabad') },
    ],
  },
  { label: 'Website examples', href: routes.websiteExamples, key: 'examples' },
  {
    label: 'Pricing',
    href: routes.pricing,
    key: 'pricing',
    menu: [
      { label: 'All plans & pricing', href: routes.pricing, note: 'Compare the four plans' },
      { label: 'Features', href: routes.features, note: 'Everything included, by plan' },
      { label: 'Launch plan', href: routes.plan('launch'), note: 'Get online properly, in 7 days' },
      { label: 'Boost plan', href: routes.plan('boost'), note: 'More pages, more SEO, more growth' },
      { label: 'Growth plan', href: routes.plan('growth'), note: 'A marketing team, not just a website' },
      { label: 'Platinum plan', href: routes.plan('platinum'), note: 'A custom store, built to scale' },
    ],
  },
  {
    label: 'Resources',
    href: routes.blog,
    key: 'resources',
    menu: [
      { label: 'Blog', href: routes.blog, note: 'Guides for Pakistani businesses' },
      { label: 'FAQs', href: routes.faqs },
      { label: 'Help centre', href: routes.help, note: 'Guides, and a real person to ask' },
      { label: 'Best website builder in Pakistan', href: routes.bestBuilder, note: 'Every option, side by side' },
      { label: 'MatjarX vs Wix', href: routes.compare('wix') },
      { label: 'MatjarX vs Squarespace', href: routes.compare('squarespace') },
      { label: 'MatjarX vs GoDaddy', href: routes.compare('godaddy') },
      { label: 'Partner program', href: routes.partner },
    ],
  },
  {
    label: 'Company',
    href: routes.about,
    key: 'company',
    menu: [
      { label: 'About us', href: routes.about },
      { label: 'Careers', href: routes.careers, note: "We're hiring in Lahore" },
      { label: 'Become a partner', href: routes.partner },
      { label: 'Get in touch', href: routes.contact },
    ],
  },
]

export const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Pricing', href: routes.pricing },
      { label: 'Features', href: routes.features },
      { label: 'Website examples', href: routes.websiteExamples },
      { label: 'Done-for-you website', href: routes.services },
      { label: 'Help centre', href: routes.help },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Local & global SEO', href: routes.services },
      { label: 'Concierge service', href: routes.services },
      { label: 'Growth marketing', href: routes.services },
      { label: 'Websites for restaurants', href: routes.industry('restaurants') },
      { label: 'Websites for boutiques', href: routes.industry('boutiques') },
      { label: 'Website design Karachi', href: routes.location('karachi') },
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
    ],
  },
]

export const FOOTER_SOCIALS = [
  { name: 'WhatsApp', href: 'https://wa.me/923033720953', icon: 'M12 3.2a8.7 8.7 0 0 0-7.4 13.3L3.4 21l4.6-1.2A8.7 8.7 0 1 0 12 3.2Z' },
  { name: 'Facebook', href: '#facebook', icon: 'M14 8.5h2.5V5.2H14c-2 0-3.4 1.5-3.4 3.5v1.6H8.5v3.3h2.1V21h3.4v-7.4h2.4l.5-3.3h-2.9V8.9c0-.3.2-.4.5-.4Z' },
  { name: 'Instagram', href: '#instagram', icon: 'M8 3.5h8a4.5 4.5 0 0 1 4.5 4.5v8A4.5 4.5 0 0 1 16 20.5H8A4.5 4.5 0 0 1 3.5 16V8A4.5 4.5 0 0 1 8 3.5Zm4 5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm4.6-1.1h.01' },
  { name: 'YouTube', href: '#youtube', icon: 'M3.5 8.5a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3ZM10.5 9.5l4 2.5-4 2.5Z' },
  { name: 'LinkedIn', href: '#linkedin', icon: 'M5 9.5v10M5 5.6h.01M10.5 19.5v-10M10.5 13.2c0-2 1.4-3.7 3.4-3.7s3.6 1.7 3.6 3.7v6.3' },
  { name: 'TikTok', href: '#tiktok', icon: 'M14 3.5v10.8a3.6 3.6 0 1 1-3.6-3.6M14 3.5a5 5 0 0 0 5 5' },
]
