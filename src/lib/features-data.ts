// Data for the Features page — from Marketing - Features.dc.html.

export type FeatureTag = { tag: string; tagInk: string; tagBg: string }
export type Feature = { title: string; plan: string; body: string; icon: string } & Partial<FeatureTag>

const TAG_LAUNCH: FeatureTag = { tag: 'All plans', tagInk: '#3D4A16', tagBg: 'rgba(198,203,138,0.5)' }
const TAG_BOOST: FeatureTag = { tag: 'Boost +', tagInk: '#3D3A08', tagBg: 'var(--butter)' }
const TAG_GROWTH: FeatureTag = { tag: 'Growth +', tagInk: '#FFFFFF', tagBg: 'var(--navy)' }
const TAG_PLATINUM: FeatureTag = { tag: 'Platinum', tagInk: '#FFFFFF', tagBg: '#7A2E6B' }

export type FeatureGroupKey = 'website' | 'commerce' | 'growth' | 'operations' | 'audit'

export const FEATURE_GROUPS: Record<FeatureGroupKey, { label: string; title: string; body: string; features: Feature[] }> = {
  website: {
    label: 'Website',
    title: 'The website itself',
    body: 'Written, designed and built by our team — then handed to you with an editor simple enough to actually use.',
    features: [
      { title: 'Done-for-you build', plan: 'Every plan', body: 'A complete multi-page site with copy, images and layout produced by a specialist in your trade. You fill in a questionnaire; we do the rest.', icon: 'M12 3.5 4.5 7.5v9L12 20.5l7.5-4v-9ZM12 12l7.5-4.5M12 12v8.5M12 12 4.5 7.5', ...TAG_LAUNCH },
      { title: 'Visual editor', plan: 'Every plan', body: 'Click any photo, heading or price and change it. Sections can be reordered, duplicated or switched off without touching code.', icon: 'M4 20h16M6 16 18 4l3 3L9 19H6z', ...TAG_LAUNCH },
      { title: 'Mobile-first layouts', plan: 'Every plan', body: "Every section is designed for a phone on 4G first, then widened for desktop — because that's how your customers actually arrive.", icon: 'M8 3.5h8v17H8zM11 18h2', ...TAG_LAUNCH },
      { title: 'Unlimited edits by us', plan: 'Boost, Growth, Platinum', body: "Message your concierge and it's done inside four working hours. New photos, a price change, a seasonal banner — no cap, no per-change fee.", icon: 'M12 3.2a8.7 8.7 0 0 0-7.4 13.3L3.4 21l4.6-1.2A8.7 8.7 0 1 0 12 3.2Z', ...TAG_BOOST },
      { title: 'Custom design', plan: 'Platinum', body: "Designed from scratch in our own tool rather than adapted from a theme — for businesses whose catalogue or brand a template can't carry.", icon: 'M12 4l2.4 5.2 5.6.5-4.3 3.7 1.3 5.6L12 16l-5 3 1.3-5.6L4 9.7l5.6-.5Z', ...TAG_PLATINUM },
      { title: 'Custom HTML blocks', plan: 'Every plan', body: "Paste an embed, a tracking snippet or a third-party widget anywhere on the page when you need something we don't cover.", icon: 'm9 8-4 4 4 4M15 8l4 4-4 4', ...TAG_LAUNCH },
    ],
  },
  commerce: {
    label: 'Store & bookings',
    title: 'Selling and taking bookings',
    body: 'Products, bookings and local payments built into the platform — with no commission taken by us on anything you sell.',
    features: [
      { title: 'Product catalogue', plan: 'Every plan', body: 'Products with variants, stock per variant, compare-at pricing, badges and collections. Up to 100 on Growth, unlimited on Platinum.', icon: 'M4 6h2.2l2.3 9.5h9L20 8H7M9.5 20a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z', ...TAG_LAUNCH },
      { title: 'Local payments', plan: 'Every plan', body: 'JazzCash, Easypaisa, PayFast and cash on delivery configured from day one, plus card payments where you need them.', icon: 'M4 6h16v12H4zM4 10h16M7 14h4', ...TAG_LAUNCH },
      { title: '0% commission', plan: 'Every plan', body: "We take nothing from your sales or bookings. You pay only your payment gateway's own processing fee.", icon: 'M7 17 17 7M8.5 8.5h.01M15.5 15.5h.01M5 12a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z', ...TAG_LAUNCH },
      { title: 'Bookings and reservations', plan: 'Every plan', body: 'Tables, appointments or consultations, with confirmation to both sides and the booking pushed to your WhatsApp.', icon: 'M5 5.5h14v14H5zM5 10h14M9 3.5v4M15 3.5v4', ...TAG_LAUNCH },
      { title: 'COD order confirmation', plan: 'Boost +', body: 'Automatic confirmation before dispatch, which is the single most effective way to cut refused deliveries and RTO cost.', icon: 'M3.5 7h10v9h-10zM13.5 11h4l3 3v2h-7zM7 19a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Z', ...TAG_BOOST },
      { title: 'Subscriptions & digital goods', plan: 'Platinum', body: 'Recurring boxes, memberships, downloads and courses — plus multi-seat booking across rooms, tables or locations.', icon: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 8v4.5l3 2', ...TAG_PLATINUM },
    ],
  },
  growth: {
    label: 'SEO & growth',
    title: 'Being found, not just being online',
    body: "A website nobody can find isn't worth having. This is the work that turns a site into an enquiry source.",
    features: [
      { title: 'Google Business Profile', plan: 'Every plan', body: 'Created, optimised and verified for you, with correct hours, services and photos — often the biggest driver of local calls.', icon: 'M12 3.5a8.5 8.5 0 1 0 8.4 9.9h-8.4V10h11.5v2a11.5 11.5 0 1 1-3.4-8.2l-2.1 2.1A8.4 8.4 0 0 0 12 3.5Z', ...TAG_LAUNCH },
      { title: 'Advanced on-page SEO', plan: 'Boost +', body: 'Titles, descriptions, structured data, internal linking and page speed handled every month rather than set once and forgotten.', icon: 'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM16 16l4.5 4.5', ...TAG_BOOST },
      { title: 'Google Maps listing', plan: 'Boost +', body: 'Created and verified so "near me" searches find you, with Business messages routed to somewhere you\'ll actually read them.', icon: 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z', ...TAG_BOOST },
      { title: 'Review collection', plan: 'Boost +', body: 'One-click review invitations after each sale or visit, with your best reviews surfaced automatically on the site.', icon: 'M12 4l2.4 5.2 5.6.5-4.3 3.7 1.3 5.6L12 16l-5 3 1.3-5.6L4 9.7l5.6-.5Z', ...TAG_BOOST },
      { title: 'Content written monthly', plan: 'Growth +', body: '2,000 words a month written for the searches that bring you customers, published and internally linked for you.', icon: 'M7 3.5h7l4 4v13H7zM14 3.5v4h4M10 13h6M10 16.5h4', ...TAG_GROWTH },
      { title: 'Paid ads managed', plan: 'Growth +', body: 'Google, Meta and TikTok campaigns set up and managed by your growth team. Spend goes on your own card, so you keep control.', icon: 'M4 18V9M9.5 18V5M15 18v-6M20.5 18v-9', ...TAG_GROWTH },
    ],
  },
  operations: {
    label: 'Hosting & admin',
    title: 'The plumbing, handled',
    body: 'Domain, email, hosting, security and backups included and maintained. Nothing here is ever a separate invoice.',
    features: [
      { title: 'Custom domain', plan: 'Every plan', body: 'A .pk or .com registered in your name, or we connect one you already own and handle the DNS. It stays yours if you leave.', icon: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5', ...TAG_LAUNCH },
      { title: 'Business email', plan: 'Every plan', body: 'you@yourbusiness.pk instead of a Gmail address. One mailbox on Launch, four on Boost and Growth, unlimited on Platinum.', icon: 'M4 6h16v12H4zM4 7l8 6 8-6', ...TAG_LAUNCH },
      { title: 'Hosting and SSL', plan: 'Every plan', body: 'Fast, secure hosting with a certificate included and renewed automatically. No separate hosting bill to manage or forget.', icon: 'M12 3.5 4.5 6.5v5c0 4.4 3.1 7.6 7.5 9 4.4-1.4 7.5-4.6 7.5-9v-5Z', ...TAG_LAUNCH },
      { title: 'Daily backups', plan: 'Every plan', body: "A restore point every day, kept for 30 days. If something breaks, we roll it back — you don't need to know how.", icon: 'M12 6.5V3.5l4 3-4 3v-3a5.5 5.5 0 1 0 5.5 5.5M4.5 12A7.5 7.5 0 0 0 12 19.5', ...TAG_LAUNCH },
      { title: 'Analytics and tracking', plan: 'Boost +', body: 'Google Analytics, Search Console, Tag Manager, Meta Pixel and TikTok tracking connected and verified for you.', icon: 'M4 18V9M9.5 18V5M15 18v-6M20.5 18v-9', ...TAG_BOOST },
      { title: 'Named concierge', plan: 'Growth +', body: 'One person who knows your business, replies in four working hours, and makes your changes rather than logging them.', icon: 'M12 12a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM4.5 20a7.5 7.5 0 0 1 15 0', ...TAG_GROWTH },
    ],
  },
  audit: {
    label: 'Audits & reports',
    title: "Knowing what's actually wrong",
    body: 'Before we rebuild anything, we tell you what your current site is doing to you — in plain words, with the fixes ranked.',
    features: [
      { title: 'Nine-point website audit', plan: 'Free, first 100 monthly', body: 'Headings, meta data, images, sitemap, robots.txt, llms.txt, indexed pages, backlinks and domain authority — all checked by hand and by tool.', icon: 'M7 3.5h7l4 4v13H7zM14 3.5v4h4M10 13h6M10 16.5h4' },
      { title: 'Report on WhatsApp or email', plan: 'Free audit', body: 'A 12 to 16 page PDF delivered inside one working day, ranked by what each issue is costing you rather than how technical it is.', icon: 'M12 3.2a8.7 8.7 0 0 0-7.4 13.3L3.4 21l4.6-1.2A8.7 8.7 0 1 0 12 3.2Z' },
      { title: 'Competitor comparison', plan: 'Free audit', body: "Send a competitor's domain alongside yours and the report puts the two side by side — rankings, backlinks and authority.", icon: 'M4 20V6M4 6l7 4 9-5v9l-9 5-7-4Z' },
      { title: 'Monthly SEO audit', plan: 'Growth +', body: "The same checks re-run every month with a plain-English note on what moved, what's ranking and what we're fixing next.", icon: 'M12 6.5V3.5l4 3-4 3v-3a5.5 5.5 0 1 0 5.5 5.5', ...TAG_GROWTH },
      { title: 'Keyword tracking', plan: 'Boost +', body: 'We track the searches that bring you customers rather than vanity terms, and show position movement over time.', icon: 'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM16 16l4.5 4.5', ...TAG_BOOST },
      { title: 'Leads dashboard', plan: 'Every plan', body: 'Every website enquiry, WhatsApp message and order in one place, with reply times and where each lead came from.', icon: 'M4.5 5.5h15v10h-9L6 19.5v-4H4.5z', ...TAG_LAUNCH },
    ],
  },
}

export const ALWAYS_ON = [
  'Custom domain in your name',
  'Professional business email',
  'Fast hosting and SSL',
  'Daily backups, 30-day restore',
  '0% commission on sales',
  'Google Business Profile setup',
  'Mobile-first design',
  'No long-term contract',
]

export const FEATURES_FAQ: [string, string][] = [
  ['Do I need to pay extra for any of these?', 'No. Everything on this page is part of the platform — the plan you choose decides which features are switched on, not which ones you can buy. There is no app store and no per-feature billing.'],
  ['Can I switch a feature on later?', 'Yes. Bookings, a store, a blog or a gallery can be added at any time. If the feature belongs to a higher plan, upgrading applies immediately and we only charge the difference.'],
  ["What if I need something not listed here?", "Ask us. Some things we already build and haven't listed; others we'll quote as custom work on Platinum. If it isn't sensible for your business, we'll say so rather than sell it to you."],
  ['Do features work on mobile?', "Every one of them. The editor, the store, bookings and the dashboard are all designed for a phone first — most of our clients run their business from one."],
  ['Are there limits on products or pages?', 'Launch and Boost cover a normal small-business site comfortably. Growth handles around 100 products; Platinum is unlimited on both products and pages.'],
]
