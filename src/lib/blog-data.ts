// Data for the Blog + Blog Post pages — from Marketing - Blog.dc.html
// and Marketing - Blog Post.dc.html. The design handoff fully wrote
// out only ONE post's body copy (the featured post, used as the
// template's worked example) — the other 8 listing cards are real
// posts with real excerpts, but have no authored body yet. Their
// detail routes intentionally 404 until that content is supplied,
// rather than fabricating article bodies.

export type BlogCategory = 'Getting started' | 'Client stories' | 'Payments' | 'E-commerce' | 'SEO' | 'Marketing'

export type BlogPostSummary = {
  slug: string; title: string; category: BlogCategory; excerpt: string
  date: string; readTime: string; tint: string
}

export const BLOG_POSTS: BlogPostSummary[] = [
  { slug: 'why-every-small-business-needs-a-website-2026', title: 'Why does every small business need a website in 2026?', category: 'Getting started',
    excerpt: "Without a website, customers question your reputation before they ever contact you. Here's how to fix that without breaking the bank.",
    date: '24 Aug 2026', readTime: '6 min read', tint: 'linear-gradient(150deg, var(--navy), #2E6EA8)' },
  { slug: 'elegance-embroidery-digital-makeover', title: 'How Elegance Embroidery won the ultimate digital makeover', category: 'Client stories',
    excerpt: "Inside our Zainab Market lucky draw — and what changed for Mukesh Kumar's boutique in the ninety days after launch.",
    date: '13 Aug 2026', readTime: '8 min read', tint: 'linear-gradient(150deg, #1B7A3D, #08361B)' },
  { slug: 'set-up-jazzcash-on-your-website', title: 'Set up JazzCash on your business website', category: 'Payments',
    excerpt: 'A step-by-step walkthrough of connecting Jazz Business to your checkout, including the paperwork most people miss.',
    date: '08 Aug 2026', readTime: '7 min read', tint: 'linear-gradient(150deg, #C0392B, #5B140D)' },
  { slug: 'cod-optimisation-reduce-rto-rate', title: 'COD optimisation: how to reduce your RTO rate', category: 'E-commerce',
    excerpt: 'Cash on delivery drives most Pakistani online sales — and most of the losses. Six changes that cut returns.',
    date: '02 Aug 2026', readTime: '9 min read', tint: 'linear-gradient(150deg, var(--olive), #3A3D18)' },
  { slug: 'local-seo-complete-guide', title: 'Local SEO for small business: the complete guide', category: 'SEO',
    excerpt: 'How to get your shop, clinic or restaurant showing up when someone nearby searches for what you sell.',
    date: '28 Jul 2026', readTime: '12 min read', tint: 'linear-gradient(150deg, #1E5FA8, #0A2647)' },
  { slug: 'top-5-website-mistakes-killing-conversions', title: 'Top 5 website mistakes killing your conversions', category: 'Getting started',
    excerpt: 'Slow load times, hidden phone numbers, and four other things quietly costing you customers every day.',
    date: '21 Jul 2026', readTime: '6 min read', tint: 'linear-gradient(150deg, #8E1B22, #2A0709)' },
  { slug: 'how-generative-engine-optimisation-works', title: 'How generative engine optimisation actually works', category: 'SEO',
    excerpt: 'AI answer engines are replacing blue links for some searches. What that means for a small business, in plain terms.',
    date: '16 Jul 2026', readTime: '11 min read', tint: 'linear-gradient(150deg, #4A2C8E, #1A0F3A)' },
  { slug: 'whatsapp-automation-for-your-business', title: 'Setting up WhatsApp automation for your business', category: 'Marketing',
    excerpt: "Auto-replies, catalogues and order updates — configured properly so customers don't feel they're talking to a robot.",
    date: '09 Jul 2026', readTime: '8 min read', tint: 'linear-gradient(150deg, #128C4A, #06381D)' },
  { slug: 'domain-and-hosting-explained', title: 'Domain and hosting explained, without the jargon', category: 'Getting started',
    excerpt: "What you're actually paying for, what you can safely ignore, and how to avoid the renewal traps.",
    date: '01 Jul 2026', readTime: '5 min read', tint: 'linear-gradient(150deg, #005A6E, #012B34)' },
]

export const FEATURED_SLUG = 'why-every-small-business-needs-a-website-2026'
export const BLOG_CATEGORIES = ['All', 'Getting started', 'SEO', 'E-commerce', 'Payments', 'Marketing', 'Client stories'] as const

// The Blog listing's hero card — same post as BLOG_POSTS[0], but with
// the longer excerpt + byline the source gives that top spot.
export const FEATURED_POST = {
  slug: FEATURED_SLUG,
  title: 'Why does every small business need a website in 2026?',
  excerpt: 'Without a website, customers question your reputation before they ever pick up the phone. We break down what a site actually needs to do for a Pakistani business — and how to get one without breaking the bank.',
  author: 'Yasir Hashmi', initials: 'YH', date: '24 Aug 2026', readTime: '6 min read',
}

// Full body — only authored for the featured post.
export type BodyBlock =
  | { t: 'h'; text: string }
  | { t: 'p'; text: string }
  | { t: 'q'; text: string }
  | { t: 'l'; items: string[] }

export const FEATURED_POST_BODY: BodyBlock[] = [
  { t: 'h', text: 'Your website is your reputation, not your brochure' },
  { t: 'p', text: 'Ten years ago a website was a place to list your address and phone number. Today it is the first thing a customer judges you on. When someone is recommended your business by a friend, they will search your name before they call — and if nothing credible comes up, they hesitate.' },
  { t: 'p', text: 'We see this pattern constantly with wholesalers in Faisalabad and boutiques in Karachi. The business is well known locally, has real customers and a strong reputation by word of mouth. But a buyer from another city has no way to verify any of that. A website closes that gap in about four seconds.' },
  { t: 'q', text: "4 out of 5 small business owners either have no website, or don't like the one they have." },
  { t: 'h', text: 'What a website actually needs to do' },
  { t: 'p', text: 'Most business owners overestimate how elaborate their site needs to be. In practice, a site that earns its cost does four things well:' },
  { t: 'l', items: [
    'Answers the obvious questions immediately — what you sell, where you are, how to reach you, what it costs.',
    'Shows proof — real photos of your work, real reviews from real customers, and the trust signals that matter in your trade.',
    "Makes contact effortless — a tappable phone number, a WhatsApp button, and a form that actually reaches your inbox.",
    'Appears on Google when someone searches for what you sell near where you are.',
  ] },
  { t: 'p', text: 'Everything beyond those four things is optional. A beautiful site that hides your phone number below three screens of scrolling is worse than a plain one that puts it in the header.' },
  { t: 'h', text: 'The Google problem nobody warns you about' },
  { t: 'p', text: 'Having a website and being findable are two entirely different projects. We regularly meet owners who paid for a site three years ago and have never received a single enquiry from it — because nothing was ever done to make Google aware it exists.' },
  { t: 'p', text: 'At minimum you need a verified Google Business Profile, a Maps listing, page titles that match what people actually type, and a steady flow of reviews. For a local business, the Business Profile often drives more calls than the website itself. It is also free, which makes skipping it especially painful.' },
  { t: 'h', text: 'Why most DIY attempts stall' },
  { t: 'p', text: 'The builders are not the problem — they are genuinely capable tools. The problem is that they hand you a blank page and assume you have the three things that are actually hard: knowing what should go on each page, having the words to fill it, and having photographs that look professional.' },
  { t: 'p', text: 'So the site gets to about seventy percent, sits unpublished for months, and eventually the subscription gets cancelled. We have taken over dozens of half-built sites from owners who did nothing wrong except run out of evenings.' },
  { t: 'h', text: 'What it should cost' },
  { t: 'p', text: 'A DIY builder subscription runs to well over a hundred thousand rupees a year once you add the apps, and you supply all the labour. A local agency will quote several hundred thousand for the build alone, and you will still need them every time a price changes.' },
  { t: 'p', text: 'There is a middle path, which is the one we built MatjarX around: a fixed one-time build fee, a predictable monthly cost that includes hosting, domain, email and support, and a team that makes your changes for you. For most small businesses that lands around Rs. 22,500 to start and Rs. 4,500 a month after.' },
]

export const FEATURED_POST_AUTHOR = {
  name: 'Yasir Hashmi', initials: 'YH', role: 'Head of Client Success, MatjarX',
  bio: 'Yasir has helped over 900 Pakistani businesses get their first website live. He writes about the practical side of going digital.',
}

export const FEATURED_POST_RELATED_SLUGS = ['local-seo-complete-guide', 'top-5-website-mistakes-killing-conversions', 'domain-and-hosting-explained']

export const SHARE_LINKS = [
  { name: 'WhatsApp', icon: 'M12 3.2a8.7 8.7 0 0 0-7.4 13.3L3.4 21l4.6-1.2A8.7 8.7 0 1 0 12 3.2Z' },
  { name: 'Facebook', icon: 'M14 8.5h2.5V5.2H14c-2 0-3.4 1.5-3.4 3.5v1.6H8.5v3.3h2.1V21h3.4v-7.4h2.4l.5-3.3h-2.9V8.9c0-.3.2-.4.5-.4Z' },
  { name: 'LinkedIn', icon: 'M5 9.5v10M5 5.6h.01M10.5 19.5v-10M10.5 13.2c0-2 1.4-3.7 3.4-3.7s3.6 1.7 3.6 3.7v6.3' },
]
