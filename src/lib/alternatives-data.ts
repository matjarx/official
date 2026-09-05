// Real content, verbatim from files/matjarx_alternatives_main_hub.md.
// "MatjarX vs Daraz Seller" is deliberately omitted from the Pakistani
// E-Commerce group below — the user dropped that comparison page itself
// (keyword cannibalization against the already-built "vs Daraz Store"),
// so this hub links only to pages that actually exist. Every other link
// here corresponds 1:1 to a RivalKey in comparison-data.ts.

import type { RivalKey } from './comparison-data'

export const META = {
  title: 'Website Builder Alternatives - MatjarX vs Competitors',
  description: 'Compare MatjarX to your current platform. See how we stack up against global website builders, POS systems, agencies, and marketplaces. Find the right fit for your business.',
}

export const HERO = {
  h1: 'Find the Right Website Builder for Your Business',
  intro: [
    "Not sure MatjarX is the right fit? Compare us to what you're currently using—or considering.",
    'We stack up well against global platforms, Pakistani agencies, e-commerce marketplaces, and point-of-sale systems. See the differences in cost, features, timeline, and support.',
  ],
}

export type AltLink = { key: RivalKey; label: string; blurb?: string }

export const GROUPS: { title: string; intro: string; links: AltLink[] }[] = [
  {
    title: 'Global Website Builders',
    intro: 'Comparing MatjarX to established international platforms:',
    links: [
      { key: 'godaddy', label: 'GoDaddy', blurb: 'Domain + hosting + builder + marketing support' },
      { key: 'squarespace', label: 'Squarespace', blurb: 'Beautiful templates + e-commerce' },
      { key: 'wix', label: 'Wix', blurb: 'Drag-and-drop flexibility' },
      { key: 'shopify', label: 'Shopify', blurb: 'E-commerce powerhouse' },
      { key: 'woocommerce', label: 'WooCommerce', blurb: 'WordPress-based online store' },
      { key: 'magento', label: 'Magento', blurb: 'Enterprise e-commerce' },
      { key: 'wordpress', label: 'WordPress', blurb: 'Content-first platform' },
      { key: 'ecwid', label: 'Ecwid', blurb: 'Shopping cart on existing site' },
    ],
  },
  {
    title: 'Pakistani E-Commerce Marketplaces & Platforms',
    intro: 'Compare MatjarX to established Pakistani marketplaces:',
    links: [
      { key: 'daraz-store', label: 'Daraz Store', blurb: 'Sell on Daraz marketplace' },
      { key: 'easybazaar', label: 'EasyBazaar', blurb: 'Pakistani e-commerce platform' },
      { key: 'webx', label: 'WebX', blurb: 'Local website + store builder' },
      { key: 'ordrz', label: 'Ordrz', blurb: 'Food ordering platform' },
      { key: 'dukanpk', label: 'DukanPK', blurb: 'Pakistani online store' },
    ],
  },
  {
    title: 'Point-of-Sale & Retail Systems',
    intro: 'Already using a POS? See how MatjarX compares:',
    links: [
      { key: 'blink', label: 'Blink', blurb: 'Retail POS system' },
      { key: 'sellryt', label: 'Sellryt', blurb: 'Omnichannel retail' },
      { key: 'ginkgo-retail', label: 'Ginkgo Retail', blurb: 'Retail management' },
      { key: 'cise-pos', label: 'Cise POS', blurb: 'Pakistani POS' },
      { key: 'howmuch-pos', label: 'HowMuch POS', blurb: 'Restaurant POS' },
      { key: 'oscar-pos', label: 'Oscar POS', blurb: 'Retail operations' },
      { key: 'splendid-accounts', label: 'Splendid Accounts', blurb: 'Accounting software' },
      { key: 'oneclick-pos', label: 'OneClick POS', blurb: 'Single-location POS' },
      { key: 'switcher-techno-pos', label: 'Switcher Techno POS', blurb: 'Multi-location retail' },
    ],
  },
  {
    title: 'Pakistani Web Agencies & Developers',
    intro: 'Looking for an agency instead? See how MatjarX compares to:',
    links: [
      { key: 'media-feathers', label: 'Media Feathers' },
      { key: 'dominant-marketers', label: 'Dominant Marketers' },
      { key: 'navicosoft', label: 'Navicosoft' },
      { key: 'bramerz', label: 'Bramerz' },
      { key: 'boundless-technologies', label: 'Boundless Technologies' },
      { key: 'techabout', label: 'TechAbout' },
      { key: 'devbatch', label: 'DevBatch' },
      { key: 'global-dezigns', label: 'Global Dezigns' },
      { key: 'seohubpk', label: 'SEOHubPK' },
      { key: 'adex360', label: 'Adex360' },
      { key: 'wp-experts', label: 'WP Experts' },
      { key: 'folio3', label: 'Folio3' },
      { key: '10pearls', label: '10Pearls' },
      { key: 'genetech-solutions', label: 'Genetech Solutions' },
      { key: 'arpatech', label: 'Arpatech' },
      { key: 'viftech', label: 'Viftech' },
      { key: 'cubix', label: 'Cubix' },
      { key: 'zapta-technologies', label: 'Zapta Technologies' },
      { key: 'znwebpro', label: 'ZNWebPro' },
      { key: 'tengo-tech', label: 'Tengo Tech' },
    ],
  },
]

export const WHY_COMPARE = [
  { title: 'Cost', body: "See total annual cost vs. what you're paying now." },
  { title: 'Timeline', body: '7-day launch vs. weeks or months with agencies.' },
  { title: 'Support', body: 'Local Pakistan-based team vs. international support.' },
  { title: 'Features', body: "What's included vs. what costs extra." },
  { title: 'Ownership', body: 'Your platform vs. dependence on a third party.' },
]

export const CANT_FIND = {
  title: "Can't Find Your Platform?",
  body: "Looking for a comparison we haven't covered?",
  cta: 'Contact us',
  note: "— We're happy to compare MatjarX to whatever you're currently using.",
}

export const CLOSING = {
  eyebrow: 'Ready to switch?',
  cta: 'Start Your Free Consultation',
  note: 'Build your website in 7 days. PKR 22,500 setup. Local support.',
}
