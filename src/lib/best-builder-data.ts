// Data for the Best Website Builder Pakistan page — reconciled against
// files/matjarx_best_website_builder_pakistan.md, whose comparison set is
// MatjarX vs. Shopify, Wix, Squarespace, GoDaddy and WordPress (the
// design-handoff version compared against a fabricated "Local agency"
// column instead of Shopify/WordPress, which the real content treats as
// two of the main global competitors).

import { routes } from './routes'

export const HERO_STATS = [
  { value: '70,000+', label: 'websites built' },
  { value: '5–10 days', label: 'to launch' },
  { value: '4.8 / 5', label: 'client rating' },
  { value: '0%', label: 'commission on sales' },
]

export const COL_HEADS = ['MatjarX', 'Shopify', 'Wix', 'Squarespace', 'GoDaddy', 'WordPress'] as const

type Row = [string, string, string, string, string, string, string]

const ROWS: Row[] = [
  ['Setup time', '5–10 days', '2–4 weeks', '1–2 weeks', '1–2 weeks', '1–2 weeks', '2–4 weeks'],
  ['Monthly cost', 'Rs. 4,500–55,000', 'USD, converts to Rs. 6,000+', 'USD, converts to Rs. 8,000+', 'USD, converts to Rs. 7,000+', 'USD, converts to Rs. 5,000+', 'Free + hosting, Rs. 3,000–10,000'],
  ['Local payments', 'JazzCash, Easypaisa, bank transfer', 'Limited, international focus', 'Limited', 'Limited', 'Limited', 'DIY via plugins'],
  ['SEO ranking', 'Native from day one', 'Manual setup required', 'Limited', 'Moderate', 'Limited', 'Strong, with plugins'],
  ['Marketing team included', 'Yes', 'No', 'No', 'No', 'No', 'No'],
  ['Domain included', 'Yes, first year', 'No', 'Yes', 'Yes', 'Varies', 'No'],
  ['Hosting included', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'No, separate cost'],
  ['Support', 'Pakistani team, Mon–Sat 11am–8pm PKT', 'Chat + email, global queue', 'Chat + email', 'Chat + email', 'Chat + email', 'Community forums'],
  ['Realistic Year 1 cost (Rs.)', '76,500–800,000', '252,000–1,500,000+', '192,000–732,000', '174,000–704,000', '170,000–780,000', '338,000–968,000'],
]

// "Bad" is judged per-row against what a Pakistani small business actually
// needs (local payments, PKR pricing, included marketing) — not a generic
// good/bad reading of the raw feature.
const BAD_VALUES = new Set([
  'No', 'Varies', 'Limited', 'Limited, international focus', 'Moderate',
  'Manual setup required', 'DIY via plugins', 'No, separate cost',
  'Chat + email, global queue', 'Chat + email', 'Community forums',
])

export type MatrixCell = { v: string; tone: 'us' | 'ok' | 'bad' }

export const MATRIX: { label: string; cells: MatrixCell[] }[] = ROWS.map((r) => ({
  label: r[0],
  cells: r.slice(1).map((v, i) => ({ v, tone: i === 0 ? 'us' as const : BAD_VALUES.has(v) ? 'bad' as const : 'ok' as const })),
}))

export const REASONS = [
  { title: 'The words are the hard part', body: "Nobody abandons a website because the drag-and-drop was confusing. They abandon it because they don't know what to write on the About page. We write it.", icon: 'M7 3.5h7l4 4v13H7zM14 3.5v4h4M10 13h6M10 16.5h4' },
  { title: 'Built for how Pakistan buys', body: 'Cash on delivery, JazzCash, Easypaisa, WhatsApp enquiries and mobile-first layouts on slow connections. Not retro-fitted from a US template.', icon: 'M4 6h2.2l2.3 9.5h9L20 8H7M9.5 20a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z' },
  { title: 'One price, no renewal surprises', body: 'A stated setup fee and a stated monthly fee including hosting, domain, email and SSL. No intro rate that triples in year two.', icon: 'M12 4v16M8 8h5.5a2.5 2.5 0 0 1 0 5H10a2.5 2.5 0 0 0 0 5H16' },
  { title: 'A person on WhatsApp', body: 'Your named concierge replies in four working hours and makes the change for you. Not a help centre article and a ticket number.', icon: 'M12 3.2a8.7 8.7 0 0 0-7.4 13.3L3.4 21l4.6-1.2A8.7 8.7 0 1 0 12 3.2Z' },
  { title: 'Findable, not just built', body: "Google Business Profile created and verified, Maps listing, on-page SEO and review collection. A site nobody can find isn't worth having.", icon: 'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM16 16l4.5 4.5' },
  { title: 'Editable when you want it', body: 'You still get an editor. Change a photo or a price yourself in seconds — or send it to us and never open the editor at all.', icon: 'M4 20h16M6 16 18 4l3 3L9 19H6z' },
]

export const DIY_CASES = [
  'You genuinely enjoy design and have the evenings free',
  'You already have professional photos and written copy ready',
  'You need one holding page, not a working business site',
  'You want pixel-level control over every element yourself',
]

export const VS_LINKS = [
  { title: 'MatjarX vs Shopify', body: 'Organic growth vs. PPC dependency — Shopify without local payment gateways or a marketing team costs more than it looks.', href: routes.compare('shopify') },
  { title: 'MatjarX vs Wix', body: 'The most capable DIY builder — if you finish it. A straight comparison of cost, time and who does the work.', href: routes.compare('wix') },
  { title: 'MatjarX vs Squarespace', body: 'Beautiful templates, billed in USD, with no local payment support. Where that helps and where it hurts.', href: routes.compare('squarespace') },
  { title: 'MatjarX vs WordPress', body: 'Ultimate customisation vs. plugin hell — what WordPress really costs once hosting, plugins and a developer are added up.', href: routes.compare('wordpress') },
]

export const BEST_BUILDER_FAQS: [string, string][] = [
  ['So which website builder is actually best for a Pakistani business?', "If you want to build it yourself, Wix is the most capable and Squarespace the best-looking. But most small business owners we meet never finish a DIY site — not because the tools are bad, but because writing the copy and sourcing photos is the hard part. That's the gap MatjarX fills."],
  ['Why is MatjarX cheaper than a DIY builder over a year?', "Because the entry price you see for a DIY builder isn't the real price. Add a custom domain, business email, apps for SEO and payments, and a marketing agency, and most businesses land well over Rs. 170,000 in year one — before their own time is counted. MatjarX's Year 1 cost (Rs. 76,500–800,000 depending on plan) is transparent and all-in from the start."],
  ['Do you support local payment methods?', "Yes. JazzCash, Easypaisa, PayFast and cash on delivery are built in, with 0% commission from us. Most international builders need a third-party plugin or don't support them at all."],
  ['Can I use Shopify in Pakistan?', "Yes, but without native local payment support — your customers pay through international gateways most don't use, and you'll need to hire a marketing agency separately. Real costs for a Pakistani business often exceed Rs. 250,000 in year one."],
  ['Does WordPress really need a developer?', 'For basic setup, no. But for customisation, scaling and fixing issues, most WordPress users end up hiring one — commonly adding Rs. 50,000–200,000 to the first year, on top of hosting, plugins and security tools.'],
  ['Can I move an existing Wix or WordPress site to MatjarX?', 'Yes, and we do it often. We rebuild it on our platform, carry your content across and set up redirects so your Google rankings follow you.'],
  ['What if I want to leave later?', "Your domain is registered in your name and your content is yours. We'll export it for you — there is no lock-in contract and no exit fee."],
]
