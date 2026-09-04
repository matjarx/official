// Data for the Best Website Builder Pakistan page — from
// Marketing - Best Website Builder Pakistan.dc.html

import { routes } from './routes'

export const HERO_STATS = [
  { value: '70,000', label: 'websites built' },
  { value: '7 days', label: 'average launch' },
  { value: '4.8 / 5', label: 'client rating' },
  { value: '0%', label: 'commission on sales' },
]

export const COL_HEADS = ['MatjarX', 'Wix', 'Squarespace', 'GoDaddy', 'Local agency'] as const

type Row = [string, string, string, string, string, string]

const ROWS: Row[] = [
  ['Who builds it', 'Our team', 'You', 'You', 'You', 'Them'],
  ['Time to live', '7 days', 'Weeks', 'Weeks', 'Days–weeks', '4–8 weeks'],
  ['Copy written for you', 'Yes', 'No', 'No', 'No', 'Sometimes'],
  ['Realistic first-year cost', 'Rs. 76,500', 'Rs. 140,000+', 'USD $190+', 'Rs. 60,000+', 'Rs. 420,000+'],
  ['JazzCash / Easypaisa / COD', 'Built in', 'Third-party app', 'Not supported', 'Limited', 'Depends'],
  ['Ongoing edits', 'Unlimited, by us', 'You', 'You', 'You', 'Billed hourly'],
  ['Google Business Profile', 'Set up for you', 'No', 'No', 'Upsell', 'Sometimes'],
  ['Support', 'Named concierge', 'Tickets', 'Email', 'Phone + upsells', 'When free'],
  ['You own the domain', 'Yes', 'Yes', 'Yes', 'Yes', 'Usually'],
]

const BAD_2 = new Set(['No', 'You'])
const BAD_3 = new Set(['No', 'You', 'Not supported'])
const BAD_4 = new Set(['No', 'You', 'Limited', 'Upsell'])

export type MatrixCell = { v: string; tone: 'us' | 'ok' | 'bad' }

export const MATRIX: { label: string; cells: MatrixCell[] }[] = ROWS.map((r) => ({
  label: r[0],
  cells: [
    { v: r[1], tone: 'us' },
    { v: r[2], tone: BAD_2.has(r[2]) ? 'bad' : 'ok' },
    { v: r[3], tone: BAD_3.has(r[3]) ? 'bad' : 'ok' },
    { v: r[4], tone: BAD_4.has(r[4]) ? 'bad' : 'ok' },
    { v: r[5], tone: 'ok' },
  ],
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
  { title: 'MatjarX vs Wix', body: 'The most capable DIY builder — if you finish it. A straight comparison of cost, time and who does the work.', href: routes.compare('wix') },
  { title: 'MatjarX vs Squarespace', body: 'Beautiful templates, billed in USD, with no local payment support. Where that helps and where it hurts.', href: routes.compare('squarespace') },
  { title: 'MatjarX vs GoDaddy', body: 'Cheap to start, then upsold at every renewal. What the real first-year and second-year cost looks like.', href: routes.compare('godaddy') },
]

export const BEST_BUILDER_FAQS: [string, string][] = [
  ['So which website builder is actually best for a Pakistani business?', "If you want to build it yourself, Wix is the most capable and Squarespace the best-looking. But most small business owners we meet never finish a DIY site — not because the tools are bad, but because writing the copy and sourcing photos is the hard part. That's the gap MatjarX fills."],
  ['Why is MatjarX cheaper than a DIY builder over a year?', "Because the DIY price you see is the entry tier. Add a custom domain, business email, an e-commerce plan and two or three apps and most businesses land well over Rs. 140,000 a year — and that's before your own time."],
  ['Do you support local payment methods?', "Yes. JazzCash, Easypaisa, PayFast and cash on delivery are built in, with 0% commission from us. Most international builders need a third-party plugin or don't support them at all."],
  ['Can I move an existing Wix or WordPress site to MatjarX?', 'Yes, and we do it often. We rebuild it on our platform, carry your content across and set up redirects so your Google rankings follow you.'],
  ['What if I want to leave later?', "Your domain is registered in your name and your content is yours. We'll export it for you — there is no lock-in contract and no exit fee."],
]
