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

// The source's own "MatjarX vs The Competition" section — six named
// problems every global platform shares in Pakistan, and MatjarX's
// answer to each. Distinct from REASONS below (MatjarX's own value
// props) and from MATRIX (raw feature comparison): this is the
// problem/solution framing the source builds its case around.
export const WIN_REASONS = [
  { title: 'Local payments', problem: "Shopify, Wix, Squarespace, GoDaddy and WordPress all lean on international payment gateways — Stripe, PayPal. Your Pakistani customers don't use those. They use JazzCash, Easypaisa, bank transfer.", solution: 'All three built in. Your customers pay the way they already pay. No friction, no abandoned carts.' },
  { title: 'PKR pricing', problem: "Every global platform charges in USD. You think in PKR. Currency fluctuations change your real cost every month — today's Rs. 6,000 is tomorrow's Rs. 7,000.", solution: 'Transparent PKR pricing. No surprises, no currency games.' },
  { title: 'SEO from launch', problem: "Shopify, Wix and Squarespace need manual SEO setup. WordPress needs plugins. You don't rank for weeks or months.", solution: "Your site ranks from day one — the architecture is SEO-first. Average client ranks in the top 10 within 4–8 weeks for their target keywords." },
  { title: 'Marketing team included', problem: 'Global platforms are just platforms. Marketing is separate — hire an agency (Rs. 15,000–50,000/month) or do it yourself.', solution: 'Your monthly fee includes a dedicated marketing team: SEO, blogs, social posts, email campaigns. No extra hires, no extra cost.' },
  { title: 'Pakistani support', problem: "Shopify, Wix and Squarespace support is global, English-only and impersonal — you wait in a queue and talk to someone who doesn't know your market.", solution: 'A real Pakistani team, in your timezone, who understand your customers. Personal support, not routed.' },
  { title: 'Lower total cost', problem: 'Global platforms look cheap (Rs. 2,000–8,000/month). Add apps, payment workarounds, marketing and the real cost is Rs. 15,000–60,000/month — plus you\'re still doing the marketing yourself or hiring an agency.', solution: "Transparent costs, everything included, no hidden fees or app subscriptions. Real Year 1 cost lower than Shopify or Wix once you count what they actually need." },
]

// The source's own "Who Should Choose Each Platform?" decision guide —
// kept as a distinct honest-fit section (not just MatjarX's pitch)
// since it also states plainly when a competitor is the right call.
export const CHOOSE_GUIDE = [
  { name: 'MatjarX', points: ['Are a Pakistani small business (primary focus)', 'Want local payment support (JazzCash, Easypaisa)', 'Need SEO ranking quickly', 'Want marketing management included', 'Need a Pakistani support team', 'Want transparent, all-in-one pricing', 'Want to launch fast (5–10 days)', "Don't want to hire developers or agencies"], mine: true },
  { name: 'Shopify', points: ['Are selling internationally, not just in Pakistan', 'Need enterprise-level e-commerce', 'Are comfortable with USD pricing and app costs', 'Have budget for an external marketing agency', 'Want access to millions of apps and integrations'] },
  { name: 'Wix', points: ['Want beautiful design without coding', "Don't need heavy e-commerce", 'Your budget is extremely tight', "Don't prioritise SEO ranking"] },
  { name: 'Squarespace', points: ['Are a creative professional — designer, photographer, writer', 'Prioritise visual storytelling over functionality', 'Have small e-commerce needs', 'Want premium aesthetics'] },
  { name: 'GoDaddy', points: ['Just need a domain and a basic site cheaply', "Don't plan to scale", 'Want quick setup without thinking too hard'] },
  { name: 'WordPress', points: ['Are technically skilled', 'Need infinite customisation', "Don't mind maintaining the platform yourself", 'Have budget for plugins and possibly a developer', 'Want absolute control'] },
]

// The source's own "Detailed Breakdown: Each Platform Explained" — a
// full profile per platform (what it is, pricing, strengths,
// weaknesses, a real Year 1 cost breakdown by line item, who should
// choose it). Kept in full even though some of it — the closing "who
// should choose" bullets, the Year 1 total — also appears in MATRIX
// and CHOOSE_GUIDE above: the source repeats itself across sections,
// and the brief is to carry the whole file rather than deduplicate it.
export type PlatformProfile = {
  name: string
  tagline: string
  what: string
  pricing: string
  bestFor: string
  strengths: string[]
  weaknesses: string[]
  costLines: string[]
  costTotal: string
  chooseIf: string[]
}

export const PLATFORM_PROFILES: PlatformProfile[] = [
  {
    name: 'MatjarX', tagline: 'Best for Pakistani businesses',
    what: 'A done-for-you website builder specifically designed for Pakistani small businesses.',
    pricing: 'Rs. 4,500–55,000/month (Launch to Platinum plans)',
    bestFor: 'Restaurants, retail stores, e-commerce, local services, B2B businesses',
    strengths: [
      'Local payments built in — JazzCash, Easypaisa, bank transfer, not just international gateways',
      'PKR pricing — no currency conversion headaches',
      'Fast launch — 5–10 days, not months',
      'Included marketing team — your site ranks, plus social media, email marketing and growth strategy',
      'Pakistani support — a real team, Mon–Sat 11am–8pm PKT, your timezone',
      'SEO from day one — your site ranks immediately for local keywords',
      'Organic growth model — rank in Google, reduce ad dependency',
      'Unlimited updates — all features included in the monthly fee',
    ],
    weaknesses: ['Limited to small–medium businesses, not enterprise', 'A Pakistani platform — best for Pakistan-focused businesses'],
    costLines: [], costTotal: 'Rs. 135,000–825,000 (setup + 12 months)',
    chooseIf: ['You want a Pakistani-built solution', 'You need local payment support', 'You want your site ranking in Google within weeks', 'You want a team managing marketing alongside your site', "You don't want to hire developers or agencies"],
  },
  {
    name: 'Shopify', tagline: 'Best for global e-commerce, but expensive for Pakistan',
    what: 'Cloud-based e-commerce platform built for online stores worldwide.',
    pricing: '$29–299/month (USD) — roughly Rs. 6,000–60,000/month plus conversion fees',
    bestFor: 'Online stores with international ambitions',
    strengths: ['Powerful e-commerce features, unlimited products', '100+ payment gateways, but limited local options', 'Strong ecosystem of apps and themes', 'Good for scaling, enterprise support available', 'Monthly billing flexibility'],
    weaknesses: [
      'No local payment gateways — JazzCash/Easypaisa not natively supported',
      'USD pricing — convert to PKR manually every month',
      'Additional costs — apps like Oberlo, AliDropship, SEO tools add Rs. 5,000–15,000/month',
      'SEO is DIY — needs separate plugins and effort',
      'No marketing team — you hire an agency separately, Rs. 10,000–50,000/month',
      'International focus — optimised for US/UK sellers, not Pakistan',
      'Slow setup — 2–4 weeks to launch',
    ],
    costLines: ['Shopify: Rs. 72,000–720,000', 'Payment apps + SEO: Rs. 60,000–180,000', 'Marketing agency: Rs. 120,000–600,000'],
    costTotal: 'Rs. 252,000–1,500,000+',
    chooseIf: ["You're selling internationally, not just Pakistan", "You're comfortable with USD billing", 'You want to hire an external marketing agency', 'You need enterprise-level features'],
  },
  {
    name: 'Wix', tagline: 'Best for design, but limited for Pakistan',
    what: 'Drag-and-drop website builder focused on beautiful design and visual experience.',
    pricing: '$14–40/month (USD) — roughly Rs. 3,000–8,000/month',
    bestFor: 'Portfolios, creative agencies, small businesses',
    strengths: ['Beautiful templates, 100+', 'Drag-and-drop simplicity', 'Affordable, globally', 'Good design tools for non-technical users', 'Mobile-responsive by default'],
    weaknesses: [
      'No local payments — JazzCash/Easypaisa not supported',
      'USD pricing — currency conversion required',
      'Limited e-commerce — good for small stores, not scaling',
      'SEO is weak — limited ranking potential',
      'Design is pretty but slow — Wix sites load slowly, which hurts SEO',
      'No marketing team — completely DIY',
      'Limited customisation — less flexible than WordPress or Shopify',
    ],
    costLines: ['Wix: Rs. 36,000–96,000', 'Website hosting, if adding e-commerce: Rs. 36,000', 'Marketing, Google Ads or agency: Rs. 120,000–600,000'],
    costTotal: 'Rs. 192,000–732,000',
    chooseIf: ['You want beautiful design without coding', 'Your budget is very tight', "You're not focused on SEO ranking", 'You have small e-commerce needs'],
  },
  {
    name: 'Squarespace', tagline: 'Best for visual storytelling, but expensive',
    what: 'Premium design-focused website builder with strong visual features.',
    pricing: '$12–33/month (USD) — roughly Rs. 2,500–6,600/month',
    bestFor: 'Blogs, portfolios, creative businesses',
    strengths: ['Stunning templates, 60+', 'Strong blogging platform', 'Professional design focus', 'Integrated e-commerce', 'Good for storytelling'],
    weaknesses: [
      'No local payments — JazzCash/Easypaisa not supported',
      'USD pricing — currency conversion headaches',
      'Expensive for the features — limited e-commerce, limited customisation',
      'Slow performance — design beauty costs loading speed',
      'Limited SEO — not optimised for ranking',
      'No marketing team — you handle growth yourself',
      'Limited integrations — the apps ecosystem is limited',
    ],
    costLines: ['Squarespace: Rs. 30,000–80,000', 'Email marketing tool: Rs. 24,000', 'Marketing: Rs. 120,000–600,000'],
    costTotal: 'Rs. 174,000–704,000',
    chooseIf: ["You're a creative professional — designer, photographer, artist", 'You want visually stunning design', "You're willing to pay for aesthetics over functionality", "You don't need heavy e-commerce"],
  },
  {
    name: 'GoDaddy', tagline: 'Best for domain buyers, not as a platform',
    what: 'Domain registrar plus a basic website builder, more an afterthought product.',
    pricing: '$5.99–24.99/month (USD) — roughly Rs. 1,200–5,000/month',
    bestFor: 'Getting a domain and a quick website in one place',
    strengths: ['Affordable domain registration', 'Bundled hosting and domain', 'Cheapest entry price', 'GoDaddy brand recognition'],
    weaknesses: [
      'No local payments — international focus only',
      'USD pricing — conversion required',
      'Weak website builder — limited features compared to others',
      'Slow customer support — not Pakistan-specific',
      'Limited e-commerce — not built for stores',
      'SEO is poor — no ranking support',
      'No marketing — completely DIY',
      'Not designed for growth — just a domain and a basic site',
    ],
    costLines: ['GoDaddy: Rs. 14,000–60,000', 'E-commerce tool, if needed: Rs. 36,000–120,000', 'Marketing: Rs. 120,000–600,000'],
    costTotal: 'Rs. 170,000–780,000',
    chooseIf: ["You just want a domain and a basic site for cheap", "You don't plan to scale", 'You need a quick online presence with minimal investment', "You're comfortable with weak support"],
  },
  {
    name: 'WordPress', tagline: 'Best for power users, but complex to set up',
    what: 'Open-source blogging and website platform requiring hosting and technical knowledge.',
    pricing: '$0 software + hosting ($5–30/month) — roughly Rs. 3,000–10,000/month',
    bestFor: 'Bloggers, developers, technically-savvy business owners',
    strengths: ['Completely free WordPress software', 'Infinitely customisable with plugins', 'Excellent for blogging', 'Strong SEO capabilities with Yoast, Rank Math', 'A large ecosystem of plugins'],
    weaknesses: [
      'Setup is complex — needs WordPress knowledge or a developer',
      'Hidden costs add up — hosting (Rs. 5,000) + plugins (Rs. 10,000) + SEO apps (Rs. 5,000) + security (Rs. 2,000) = Rs. 22,000/month real cost',
      'Maintenance burden — you manage updates, security and backups',
      'Plugin conflicts — 20+ plugins fighting each other',
      'No local payments — needs manual setup via plugins',
      'No marketing team — completely DIY',
      'Slow if not optimised — database bloat, cache issues, performance problems',
      'Security is your responsibility — malware risk if not maintained',
    ],
    costLines: ['WordPress hosting: Rs. 60,000', 'Yoast/SEO plugins: Rs. 60,000', 'Security plugin: Rs. 24,000', 'Email marketing tool: Rs. 24,000', 'Marketing/Google Ads: Rs. 120,000–600,000', 'Developer for customisation: Rs. 50,000–200,000'],
    costTotal: 'Rs. 338,000–968,000',
    chooseIf: ["You're technically skilled, or hire a developer", 'You want complete customisation', "You don't mind maintaining the platform yourself", "You're willing to learn the WordPress ecosystem", 'You want the lowest possible software cost'],
  },
]

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
