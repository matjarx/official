// Data for the four Plan pages — from Marketing - Plan*.dc.html. The
// prototype ships four files because a prop default only seeds its editor,
// not the runtime; in production this is one route with a plan param
// (the handoff's own implementation note).

import { routes } from './routes'

export type PlanKey = 'launch' | 'boost' | 'growth' | 'platinum'

const ICONS = {
  shop: 'M4 6h2.2l2.3 9.5h9L20 8H7M9.5 20a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Zm7.5 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z',
  person: 'M12 12a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM4.5 20a7.5 7.5 0 0 1 15 0',
  search: 'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM16 16l4.5 4.5',
  chart: 'M4 18V9M9.5 18V5M15 18v-6M20.5 18v-9',
  pin: 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 8v4.5l3 2',
  globe: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5',
  spark: 'M12 4l2.4 5.2 5.6.5-4.3 3.7 1.3 5.6L12 16l-5 3 1.3-5.6L4 9.7l5.6-.5Z',
  plus: 'M12 5v14M5 12h14',
  check: 'm5 12.5 4.5 4.5L19 7',
  dash: 'M5 12h14',
}

export const ALL_PLANS: Record<PlanKey, { name: string; price: string; setup: string; pitch: string }> = {
  launch: { name: 'Launch', price: 'Rs. 4,500', setup: 'Rs. 22,500', pitch: 'We build and launch your website.' },
  boost: { name: 'Boost', price: 'Rs. 15,600', setup: 'Rs. 22,500', pitch: 'We manage your online presence.' },
  growth: { name: 'Growth', price: 'Rs. 27,000', setup: 'Rs. 22,500', pitch: 'We grow your business online.' },
  platinum: { name: 'Platinum', price: 'Rs. 55,000', setup: 'Rs. 140,000', pitch: 'We scale your e-commerce business.' },
}

export const PLAN_DATA: Record<PlanKey, {
  tag: string; tagBg: string; tagLine: string; tagInk: string; tagDot: string
  headline: string; subhead: string; ctaLabel: string
  heroTicks: string[]; inherits: string; features: string[]
  forTitle: string; audiences: { title: string; body: string; icon: string }[]
  compareWith: string; compareTitle: string; compareBody: string
  deltas: { label: string; icon: string; ink: string }[]
  otherHref: string; otherLabel: string
  faqs: [string, string][]
}> = {
  launch: {
    tag: 'Best first step', tagBg: 'rgba(255,255,255,0.66)', tagLine: 'rgba(255,255,255,0.9)', tagInk: '#3B5063', tagDot: 'var(--olive)',
    headline: 'Get Online Properly, In Seven Days',
    subhead: 'A complete, professionally written website with your own domain, business email and hosting. Built by our team — you never touch a builder.',
    ctaLabel: 'Start with Launch',
    heroTicks: ['Live in 7 days', '0% transaction fees', '30-day money back'],
    inherits: '',
    features: ['Built-for-you website or online store', 'Personalised design, made for your trade', 'Fast loading, structured to rank on Google', 'Ready in 7 days', 'Custom domain, or connect one you own', 'Professional business email address', 'Easy-to-use editor', '0% fees on sales and bookings', '1-on-1 launch and training call', 'Secure hosting and SSL certificate', 'Google Business Profile set up', '30-day money-back guarantee'],
    forTitle: 'Launch is right if you need to exist online, credibly, this month',
    audiences: [
      { title: 'You have no website at all', body: 'Customers search your name and find nothing. Launch closes that gap in a week, with copy and images handled for you.', icon: ICONS.globe },
      { title: 'Your site was built years ago', body: 'It loads slowly, looks dated on a phone and nobody has touched it since. We rebuild it properly and take over the upkeep.', icon: ICONS.clock },
      { title: 'You sell mostly in person', body: 'You need a shopfront online that answers questions and takes enquiries — not a full e-commerce operation yet.', icon: ICONS.pin },
    ],
    compareWith: 'Boost',
    compareTitle: 'Launch gets you online. Boost keeps you growing.',
    compareBody: 'If you expect to change your site regularly, or you want to be found on Google rather than just be findable, Boost is the better value — it adds unlimited done-for-you edits and advanced SEO.',
    deltas: [
      { label: 'Launch: 1 business email — Boost: 4', icon: ICONS.plus, ink: 'var(--moss-light)' },
      { label: 'Launch: you make your own edits — Boost: unlimited edits done by us', icon: ICONS.plus, ink: 'var(--moss-light)' },
      { label: 'Launch: Google Business Profile — Boost: advanced SEO and Maps', icon: ICONS.plus, ink: 'var(--moss-light)' },
      { label: 'Launch: live chat support — Boost: VIP phone support', icon: ICONS.plus, ink: 'var(--moss-light)' },
    ],
    otherHref: routes.plan('boost'), otherLabel: 'See the Boost plan',
    faqs: [
      ['How many pages do I get?', "A complete multi-page site — typically home, about, services or products, and contact. If your business needs more, we'll say so before you pay rather than after."],
      ['Can I add a shop later?', 'Yes. Launch includes basic store functionality, and you can move up to Boost or Growth at any time — we only charge the difference.'],
      ['Who writes the words?', 'We do. You fill in a short questionnaire about your business and our copywriters produce the site copy. You approve it before launch.'],
      ['What if I already have a domain?', 'We connect it for you and handle the DNS. Your domain stays registered in your name either way.'],
    ],
  },
  boost: {
    tag: 'Most popular', tagBg: 'var(--butter)', tagLine: 'var(--butter-deep)', tagInk: '#3D3A08', tagDot: 'var(--olive)',
    headline: 'More Pages, More SEO, More Growth',
    subhead: 'Everything in Launch, plus unlimited edits done by our team, advanced SEO to rank on Google, and your products promoted across Google, Facebook and Instagram.',
    ctaLabel: 'Choose Boost',
    heroTicks: ['Unlimited done-for-you edits', 'Advanced SEO', 'VIP phone support'],
    inherits: 'Everything in Launch, plus:',
    features: ['4 business email addresses', 'Advanced SEO to rank on Google', 'Unlimited done-for-you edits', 'Live chat, lead forms and multimedia added for you', 'Promote products on Google, Facebook and Instagram', 'Google Maps listing created and verified', 'Review collection and replies', 'VIP phone support', 'Seasonal campaigns set up for you', 'Analytics and tracking connected'],
    forTitle: 'Boost is right if your website needs to work, not just exist',
    audiences: [
      { title: 'You change things often', body: "New stock, new prices, Ramzan offers, a seasonal banner. Message your concierge and it's done inside four working hours — unlimited, at no extra cost.", icon: ICONS.spark },
      { title: 'You want to be found on Google', body: 'Advanced on-page SEO, a verified Maps listing and steady review collection. This is what turns a website into an enquiry source.', icon: ICONS.search },
      { title: 'You sell across channels', body: 'Your products syndicated to Google Shopping, Facebook and Instagram, kept in step with your site automatically.', icon: ICONS.shop },
    ],
    compareWith: 'Growth',
    compareTitle: 'Boost manages your presence. Growth actively grows it.',
    compareBody: "Boost keeps your site current and ranking. If you want a marketing partner — a named team, a monthly plan, fresh content and paid ads managed for you — that's Growth.",
    deltas: [
      { label: 'Boost: our team handles your site — Growth: a dedicated growth team', icon: ICONS.plus, ink: 'var(--moss-light)' },
      { label: 'Boost: advanced SEO — Growth: 2,000 words of fresh content monthly', icon: ICONS.plus, ink: 'var(--moss-light)' },
      { label: 'Boost: no marketing sessions — Growth: 1-on-1 every month', icon: ICONS.plus, ink: 'var(--moss-light)' },
      { label: 'Boost: no ad management — Growth: paid ads set up and managed', icon: ICONS.plus, ink: 'var(--moss-light)' },
    ],
    otherHref: routes.plan('growth'), otherLabel: 'See the Growth plan',
    faqs: [
      ['What counts as an edit?', "Anything on your site: text, photos, prices, a new section, a seasonal banner, a new product range. There's no monthly cap and no per-change fee."],
      ['How fast are edits done?', 'Your concierge replies within four working hours and most changes are live the same day. Larger requests get a stated timeline up front.'],
      ['Is the SEO work ongoing?', "Yes. On-page optimisation, technical fixes, Maps and review management continue every month — it isn't a one-off setup."],
      ['Why is Boost the most popular plan?', "Because most small businesses don't want to maintain a website. Launch gets you online; Boost means you never think about it again."],
    ],
  },
  growth: {
    tag: 'For businesses scaling up', tagBg: 'rgba(198,203,138,0.4)', tagLine: 'rgba(198,203,138,0.7)', tagInk: '#3D4A16', tagDot: 'var(--olive)',
    headline: 'A Marketing Team, Not Just A Website',
    subhead: 'Everything in Boost, plus a dedicated growth team, a marketing plan built for your business, monthly 1-on-1 sessions and 2,000 words of fresh content every month.',
    ctaLabel: 'Choose Growth',
    heroTicks: ['Dedicated growth team', 'Monthly 1-on-1 session', 'Content written for you'],
    inherits: 'Everything in Boost, plus:',
    features: ['Dedicated VIP growth team', 'A marketing plan built for your business', '1-on-1 monthly marketing sessions', '2,000 words of fresh content written monthly', 'Advice on email, social, ads, SEO and reputation', 'Paid ads set up and managed', 'Monthly SEO audit report', 'Competitor insight for your city and category', 'Reputation management', 'Advanced e-commerce features'],
    forTitle: 'Growth is right if the website is working and you want more',
    audiences: [
      { title: 'You have demand and want more', body: "Enquiries are coming in and you want to increase them deliberately — with a plan, a budget and someone accountable for the result.", icon: ICONS.chart },
      { title: "You don't have a marketing person", body: 'You get a named marketing partner and a monthly session instead of hiring in-house or guessing at it yourself.', icon: ICONS.person },
      { title: "You're competing on search", body: 'Fresh content every month, technical SEO, competitor tracking and paid search running alongside your organic rankings.', icon: ICONS.search },
    ],
    compareWith: 'Platinum',
    compareTitle: 'Growth grows your business. Platinum rebuilds it from scratch.',
    compareBody: 'Growth runs on our themes, tuned for your brand. If you need a fully custom design, a full webstore with unlimited products, subscriptions or multi-seat bookings, that&apos;s Platinum.',
    deltas: [
      { label: 'Growth: theme-based design — Platinum: custom design in our own tool', icon: ICONS.plus, ink: 'var(--moss-light)' },
      { label: 'Growth: advanced store — Platinum: full webstore, unlimited products', icon: ICONS.plus, ink: 'var(--moss-light)' },
      { label: 'Growth: bookings — Platinum: multi-seat bookings and subscriptions', icon: ICONS.plus, ink: 'var(--moss-light)' },
      { label: 'Growth: 4 business emails — Platinum: unlimited', icon: ICONS.plus, ink: 'var(--moss-light)' },
    ],
    otherHref: routes.plan('platinum'), otherLabel: 'See the Platinum plan',
    faqs: [
      ['Who is my growth partner?', 'A named marketing specialist assigned to your account, who knows your business and joins your monthly call. Not a rotating support queue.'],
      ['What happens in the monthly session?', "Thirty to sixty minutes reviewing what happened last month, what we're doing next, and one skill you want to learn — email, social, ads or SEO."],
      ['Is ad spend included?', 'No. We set up and manage the campaigns; the spend goes directly to Google, Meta or TikTok on your own card, so you keep full control of the budget.'],
      ['Can I see the monthly reporting first?', "Yes. Ask us and we'll show you a real anonymised report before you commit."],
    ],
  },
  platinum: {
    tag: 'Custom built', tagBg: 'rgba(244,242,174,0.5)', tagLine: 'rgba(244,242,174,0.8)', tagInk: '#3D3A08', tagDot: '#8A7A12',
    headline: 'A Custom Store, Built To Scale',
    subhead: 'Everything in Growth, plus a fully custom design created in our own tool, a complete webstore with unlimited products, subscriptions, digital goods and multi-seat bookings.',
    ctaLabel: 'Talk to us about Platinum',
    heroTicks: ['Fully custom design', 'Unlimited products', 'Unlimited edits'],
    inherits: 'Everything in Growth, plus:',
    features: ['Custom design built in our own tool', 'Full webstore built for you', 'Unlimited products and unlimited edits', 'Sell subscriptions and digital products', 'Manage multi-seat bookings', 'Unlimited business email addresses', 'Enhanced marketing integrations', 'Direct line to our build team', 'Quarterly business review', 'Priority build and support queue'],
    forTitle: "Platinum is right if a theme can't carry your business",
    audiences: [
      { title: 'You run real e-commerce', body: 'Hundreds of products, variants, bundles and stock to keep straight. You need a store designed around your catalogue, not fitted to a template.', icon: ICONS.shop },
      { title: 'You sell subscriptions or digital goods', body: 'Recurring boxes, memberships, downloads or courses — none of which a standard theme handles well.', icon: ICONS.spark },
      { title: 'You book capacity, not appointments', body: 'Multiple seats, rooms, tables or slots across locations, with rules about what can be booked when.', icon: ICONS.clock },
    ],
    compareWith: 'Growth',
    compareTitle: 'Not sure you need Platinum yet?',
    compareBody: "Most businesses should start on Growth and move up when the catalogue or the booking rules outgrow a theme. We'll tell you honestly which side of that line you're on — Platinum is a considerably larger setup fee.",
    deltas: [
      { label: 'Start on Growth if your catalogue is under 100 products', icon: ICONS.dash, ink: 'rgba(226,236,245,0.5)' },
      { label: 'Start on Growth if bookings are single-seat', icon: ICONS.dash, ink: 'rgba(226,236,245,0.5)' },
      { label: 'Choose Platinum for subscriptions or digital products', icon: ICONS.check, ink: 'var(--moss-light)' },
      { label: 'Choose Platinum when the design has to be yours alone', icon: ICONS.check, ink: 'var(--moss-light)' },
    ],
    otherHref: routes.plan('growth'), otherLabel: 'See the Growth plan',
    faqs: [
      ['Why is the setup fee higher?', 'Because nothing is templated. Discovery, custom design, a bespoke store build and data migration are all included in the Rs. 140,000 — an agency would quote several times that.'],
      ['How long does a Platinum build take?', 'Four to six weeks typically, depending on catalogue size. We give you a dated schedule before you commit, not an estimate.'],
      ['Can you migrate an existing store?', 'Yes — products, customers, orders and URL redirects, so your Google rankings follow you across.'],
      ['Do I still get unlimited edits?', 'Yes, and a direct line to the team that built your store rather than a general queue.'],
    ],
  },
}

export function otherPlansFor(key: PlanKey) {
  return (Object.keys(ALL_PLANS) as PlanKey[])
    .filter((k) => k !== key)
    .map((k) => ({ ...ALL_PLANS[k], href: routes.plan(k) }))
}
