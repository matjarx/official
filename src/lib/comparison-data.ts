// Data for the Comparison pages — from Marketing - vs Wix.dc.html (and its
// vs Squarespace / vs GoDaddy siblings, same component + data shape).
// "Three separate pages with no toggle — the client was explicit."

import { routes } from './routes'

export type RivalKey = 'wix' | 'squarespace' | 'godaddy'

export const OUR_POINTS = [
  'Our team designs, writes and builds the whole site',
  'Live in 7 days, not 7 weekends',
  'Domain, business email, hosting and SSL included',
  'Google Business Profile created and verified for you',
  'Unlimited edits handled by your concierge',
  'JazzCash, Easypaisa and COD built in',
]

export const RIVAL_DATA: Record<RivalKey, {
  name: string; intro: string; mode: string; points: string[]
  price: string; priceNote: string; honest: string
  table: [string, string, string][]
}> = {
  wix: {
    name: 'Wix',
    intro: "Wix is a capable drag-and-drop builder. The question isn't whether it can build a good site — it's whether you will.",
    mode: 'You build it yourself',
    points: ['A blank canvas and hundreds of settings to learn', 'You write every word and source every image', 'SEO is a checklist you have to work through', 'Support is a ticket queue, not a person who knows you', 'App-store add-ons billed separately, monthly'],
    price: 'From Rs. 4,000 / mo',
    priceNote: 'plus your time, apps and any freelancer you hire',
    honest: "Wix is the better choice if you genuinely enjoy designing, have the hours to spare, and want total pixel-level control over every element. Its editor is more flexible than ours, and if building the site is the fun part for you, you'll like it.",
    table: [
      ['Who builds the site', 'Our team', 'You'],
      ['Time from start to live', '7 days', 'Weeks to months'],
      ['Copywriting included', 'Yes', 'No'],
      ['Images sourced for you', 'Yes', 'No'],
      ['Google Business Profile set up', 'Yes', 'No'],
      ['Ongoing edits done for you', 'Unlimited', 'You do them'],
      ['Transaction fees on sales', '0%', '0% + gateway'],
      ['Support', 'Named concierge, 4 hrs', 'Ticket queue'],
      ['Local payment gateways', 'Built in', 'Third-party app'],
    ],
  },
  squarespace: {
    name: 'Squarespace',
    intro: 'Squarespace makes beautiful templates. It also assumes you have the taste, time and copy to fill them.',
    mode: 'You build it yourself',
    points: ['Gorgeous templates — that all start empty', 'Your site looks as good as the content you put in it', 'Priced in USD, billed to a card that needs to work abroad', 'Limited local payment options for Pakistan and the Gulf', 'Email campaigns and scheduling cost extra'],
    price: 'From USD $16 / mo',
    priceNote: 'billed in dollars, plus domain and add-ons',
    honest: "Squarespace is the better choice if you're a designer, photographer or creative with strong visual material already prepared, selling to a Western audience in USD. Its typography and template craft are excellent.",
    table: [
      ['Who builds the site', 'Our team', 'You'],
      ['Time from start to live', '7 days', 'Weeks to months'],
      ['Billed in', 'PKR / AED', 'USD'],
      ['Copywriting included', 'Yes', 'No'],
      ['JazzCash, Easypaisa, COD', 'Built in', 'Not supported'],
      ['Ongoing edits done for you', 'Unlimited', 'You do them'],
      ['Local SEO for Pakistan / Gulf', 'Included', 'You configure'],
      ['Support', 'Named concierge, 4 hrs', 'Email, 1 business day'],
      ['Phone support', 'Yes', 'No'],
    ],
  },
  godaddy: {
    name: 'GoDaddy',
    intro: 'GoDaddy is excellent at selling you a domain. What happens after that is largely up to you.',
    mode: 'DIY builder + upsells',
    points: ['Cheap entry price, then upsells at every renewal', 'Website builder is basic compared with the alternatives', 'SEO, email and security sold as separate subscriptions', 'Renewal pricing often several times the intro rate', 'No design or copy help — you assemble it'],
    price: 'From Rs. 2,500 / mo',
    priceNote: 'intro rate; renewals and add-ons cost considerably more',
    honest: "GoDaddy is the better choice if all you need is a domain name and a single holding page, and you want the cheapest possible starting price. Their domain management is genuinely good.",
    table: [
      ['Who builds the site', 'Our team', 'You'],
      ['Time from start to live', '7 days', 'Days to weeks'],
      ['Copywriting included', 'Yes', 'No'],
      ['Business email', 'Included', 'Extra subscription'],
      ['SSL certificate', 'Included', 'Often extra'],
      ['SEO tools', 'Done for you', 'Extra subscription'],
      ['Renewal price increase', 'None', 'Common'],
      ['Ongoing edits done for you', 'Unlimited', 'You do them'],
      ['Support', 'Named concierge, 4 hrs', 'Phone, with upsells'],
    ],
  },
}

const COMPARISON_META: Record<RivalKey, { title: string; body: string; href: string }> = {
  wix: { title: 'MatjarX vs Wix', body: 'The most capable DIY builder — if you finish it.', href: routes.compare('wix') },
  squarespace: { title: 'MatjarX vs Squarespace', body: 'Beautiful templates, billed in USD, no local payments.', href: routes.compare('squarespace') },
  godaddy: { title: 'MatjarX vs GoDaddy', body: 'Cheap to start, then upsold at every renewal.', href: routes.compare('godaddy') },
}

export function otherComparisonsFor(key: RivalKey) {
  return (Object.keys(COMPARISON_META) as RivalKey[])
    .filter((k) => k !== key)
    .map((k) => COMPARISON_META[k])
    .concat([{ title: 'All alternatives', body: 'Every option available to a Pakistani business, side by side.', href: routes.bestBuilder }])
}
