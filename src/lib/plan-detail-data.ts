// Full-fidelity content for the 5 plan pages, from files/matjarx_{launch,
// boost,growth,platinum,custom}_plan_page.md — verbatim. plan-data.ts (the
// original PLAN_DATA) stays as-is and still drives the compact hero/feature-
// list/audience/compare-with-one-plan view; this file adds everything each
// source file has that PLAN_DATA never carried: the "What You Get" section
// breakdowns, at-a-glance table, full "Best For" groups, pricing detail with
// annual savings and exclusions, real examples, the build process, the full
// FAQ set, the plan-to-plan comparison table, and the closing/bottom-line/
// guarantee copy. PlanContent.tsx renders PLAN_DATA's existing fields first,
// then everything here.

export type Block = { h?: string; p?: string; items?: string[]; sub?: { h: string; items: string[] }[] }
export type Section = { title: string; blocks: Block[] }
export type GlanceRow = [string, string]
export type SavingsRow = [string, string, string, string]
export type BestForGroup = { title: string; items: string[] }
export type RealExample = { title: string; lines: string[] }
export type ProcessPhase = { title: string; items: string[] }
export type PlanFaq = { q: string; a: string; items?: string[] }
export type CompareTable = { headers: string[]; rows: string[][] }
export type UpgradeGroup = { title: string; items: string[] }

export type StandardPlanDetail = {
  quickOverview: { title: string; intro: string; ticks: string[]; setupFee: string; monthlyFee: string; totalFirstMonth: string }
  whatYouGet: { title: string; intro: string; sections: Section[] }
  extraSections?: Section[]
  glance: { title: string; rows: GlanceRow[] }
  bestFor: { title: string; groups: BestForGroup[] }
  pricing: {
    setupFee: string; setupItems: string[]; monthlyFee: string; monthlyItems: string[]
    perMonthValue?: { intro: string; items: { label: string; value: string }[]; total: string }
    blogNote?: { included: string; extra: string; whyMatters: string[] }
    savings: { headers: string[]; rows: SavingsRow[] }
    notIncluded: string[]
    roi?: { intro: string; lines: string[] }
  }
  examples: { title: string; items: RealExample[] }
  process: { title: string; phases: ProcessPhase[]; closing: string }
  faqs: PlanFaq[]
  compareTitle: string
  compareTable?: CompareTable
  upgradeIntro?: string
  upgradeGroups?: UpgradeGroup[]
  allPlans: { name: string; desc: string }[]
  closing: { eyebrow: string; title: string; priceLines: string[]; note?: string; cta: string; steps: string[]; scheduleCta: string }
  bottomLine: { title: string; body: string[]; cta: string }
}

export const LAUNCH: StandardPlanDetail = {
  quickOverview: {
    title: 'Perfect for Getting Started Online',
    intro: 'The Launch Plan is designed for businesses that are just beginning their online journey.',
    ticks: ['Quick launch (7 business days)', 'Professional design', 'SEO-ready website', 'Hosting and domain included', 'Email accounts included', 'Full support included'],
    setupFee: 'PKR 22,500', monthlyFee: 'PKR 4,500', totalFirstMonth: 'PKR 27,000',
  },
  whatYouGet: {
    title: 'Launch Plan Includes Everything You Need to Start',
    intro: '',
    sections: [
      { title: 'Website Foundation', blocks: [
        { sub: [{ h: '5-10 Professional Pages', items: ['Home page', 'About page', 'Services/Products page', 'Contact page', 'Additional 1-5 custom pages'] }] },
        { sub: [{ h: 'Professional Design', items: ['Mobile-responsive theme', 'Brand-aligned colors and layout', 'Professional typography', 'Fast-loading pages'] }] },
      ] },
      { title: 'Domain & Email', blocks: [
        { sub: [{ h: 'Free Domain Registration', items: ['.com.pk or .pk domain (included for first year)', 'Domain privacy protection', 'Domain management'] }] },
        { sub: [{ h: 'Professional Email Accounts', items: ['5 email accounts included', 'Your-name@yourcompany.com', 'Email forwarding', 'Webmail access'] }] },
      ] },
      { title: 'Website Features', blocks: [
        { sub: [{ h: 'Content Management', items: ['Easy-to-use website editor', 'Photo and video uploads', 'SEO optimization tools', 'Backup and security'] }] },
        { sub: [{ h: 'Contact & Lead Capture', items: ['Contact form with email notifications', 'Lead capture capability', 'Message storage and organization'] }] },
        { sub: [{ h: 'Analytics & Monitoring', items: ['Google Analytics integration', 'Basic performance tracking', 'Security monitoring', 'Uptime monitoring'] }] },
      ] },
      { title: 'Hosting & Maintenance', blocks: [
        { sub: [{ h: 'Reliable Hosting', items: ['Fast, secure servers', '99.9% uptime guarantee', 'SSL certificate (HTTPS)', 'Daily backups'] }] },
        { sub: [{ h: 'Website Maintenance', items: ['Plugin and theme updates', 'Security patches', 'Backup management', 'Malware scanning'] }] },
      ] },
      { title: 'Support', blocks: [
        { sub: [{ h: 'Email & WhatsApp Support', items: ['Dedicated support team', 'Response within 24 hours', 'Technical assistance', 'Non-emergency support'] }] },
        { sub: [{ h: 'Support Hours', items: ['Monday-Saturday, 11 AM - 8 PM PKT', 'WhatsApp and email support', 'Average response: 24 hours'] }] },
      ] },
    ],
  },
  glance: { title: 'Launch Plan at a Glance', rows: [
    ['Pages', '5-10 pages'], ['Professional Design', '✅ Yes'], ['Mobile Responsive', '✅ Yes'], ['Domain Included', '✅ Yes (1 year)'],
    ['Email Accounts', '✅ 5 included'], ['SSL Certificate', '✅ Yes'], ['SEO Optimization', '✅ Basic'], ['Google Analytics', '✅ Yes'],
    ['Contact Forms', '✅ Yes'], ['Monthly Backups', '✅ Yes'], ['Monthly Maintenance', '✅ Yes'], ['Support', '✅ Email/WhatsApp'],
    ['VIP Phone Support', '❌ Not included'], ['Blog Posts', '❌ Not included'], ['SEO Services', '❌ Not included'], ['Marketing Services', '❌ Not included'],
  ] },
  bestFor: { title: 'Who Is the Launch Plan Perfect For?', groups: [
    { title: 'Startups Getting Online', items: ['Brand new businesses with no website', 'Starting your first online presence', 'Need to launch quickly and affordably', 'Limited budget for web development'] },
    { title: 'Small Local Businesses', items: ['Restaurants, salons, clinics', 'Local service providers', 'Need basic online presence', 'Want to establish Google presence'] },
    { title: 'Professionals & Freelancers', items: ['Consultants, coaches, freelancers', 'Need a professional portfolio site', 'Want to establish credibility online', "Don't need complex features"] },
    { title: 'Nonprofits & Organizations', items: ['Community organizations', 'Nonprofits with limited budgets', 'Need basic information website', 'Want to accept online donations'] },
  ] },
  pricing: {
    setupFee: 'PKR 22,500', setupItems: ['Website design and setup', 'Domain registration', 'Email account setup', 'Content entry', 'Testing and launch'],
    monthlyFee: 'PKR 4,500', monthlyItems: ['Hosting and servers', 'Maintenance and updates', 'Security and backups', 'Support and assistance', 'Unlimited edits (within reason)'],
    savings: { headers: ['Payment Plan', 'Setup', 'Monthly', 'Annual Total', 'You Save'], rows: [
      ['Monthly', '22,500', '4,500', '76,500'], ['Annual (Pay Yearly)', '22,500', '54,000', '76,500'], ['Two-Year (Pay Upfront)', '22,500', '108,000', '130,500'],
    ] },
    notIncluded: ['Blog posts (add later)', 'SEO services (upgrade to Boost or Growth)', 'Social media management (upgrade to Growth)', 'Phone support (available on Boost+)', 'Marketing services (upgrade to Growth)', 'Ecommerce features (available on Platinum)'],
  },
  examples: { title: 'Launch Plan Websites We’ve Built', items: [
    { title: 'Local Restaurant', lines: ['Website: 8 pages (Menu, location, reservations, photos)', 'Cost: PKR 4,500/month', 'Result: Online presence, online ordering integration, customer reviews', 'Timeline: 10 days'] },
    { title: 'Consulting Business', lines: ['Website: 7 pages (Services, team bios, case studies, contact)', 'Cost: PKR 4,500/month', 'Result: Lead capture, credibility building, email newsletter signup', 'Timeline: 8 days'] },
    { title: 'Freelance Designer', lines: ['Website: 6 pages (Portfolio, about, services, testimonials, contact)', 'Cost: PKR 4,500/month', 'Result: Portfolio showcase, client inquiries, professional presence', 'Timeline: 7 days'] },
  ] },
  process: { title: 'How Your Website Gets Built', phases: [
    { title: 'Phase 1: Initial Setup (Day 1)', items: ['Collect your information and requirements', 'Choose domain name and colors', 'Design initial layout'] },
    { title: 'Phase 2: Design & Development (Days 2-4)', items: ['Build your website using professional theme', 'Set up pages and content structure', 'Integrate your branding', 'Configure email accounts'] },
    { title: 'Phase 3: Content & Launch (Days 5-6)', items: ['Review and approve design', 'Make any adjustments', 'Set up analytics and tracking', 'Final testing'] },
    { title: 'Phase 4: Going Live (Day 7)', items: ['Deploy to live servers', 'Submit to Google Search Console', 'Create initial sitemaps', 'Start monitoring'] },
  ], closing: 'Your website is live and ready to serve customers.' },
  faqs: [
    { q: 'How many pages are included?', a: '5-10 professional pages. This typically includes:', items: ['Home page', 'About page', 'Services/Products page', 'Contact page', 'Blog page (optional)', 'FAQ page (optional)', '1-3 additional pages based on your needs'] },
    { q: 'Can I add pages later?', a: 'Yes. Add pages anytime through the website editor, or request help from our team. First 30 days include unlimited edits; after that, major changes may have additional fees.' },
    { q: 'What about the domain cost after the first year?', a: 'First year included. Year 2+ requires annual renewal (typically PKR 1,500-3,500 depending on domain). Paid through your MatjarX account.' },
    { q: 'Can I upgrade to a higher plan?', a: 'Yes, anytime. If you upgrade to Boost or Growth:', items: ['New setup fee applies for new plan', 'Old plan cancels', 'Previous work transfers'] },
    { q: 'Is hosting really included?', a: '100% included. No separate hosting fees. Everything is included:', items: ['Server costs', 'Domain costs', 'Email hosting', 'SSL certificate', 'Backups and security'] },
    { q: 'What if I need more email accounts?', a: 'First 5 are included. Additional email accounts (6+) are PKR 500/month each. Contact support to add.' },
    { q: 'Do you offer phone support?', a: 'Not on Launch Plan. Email and WhatsApp support included. Upgrade to Boost or Growth for VIP phone support.' },
    { q: 'Can I get blog posts with Launch?', a: 'No blog posts included. Launch is basic web presence. If you need blog posts, upgrade to Boost (1 blog/month) or Growth (3 blogs/month).' },
    { q: 'What if I cancel?', a: 'Cancel anytime. Provide 30 days written notice via email. Refund policy applies; setup fees are non-refundable once work starts.' },
    { q: 'Can I get a money-back guarantee?', a: "Yes. If you're unsatisfied within 24 hours and we haven't substantially started work, full refund available." },
    { q: 'How is my data secure?', a: 'Industry-standard security:', items: ['SSL/HTTPS encryption', 'Daily backups', 'Malware scanning', 'Security patches', 'DDoS protection', 'Access controls'] },
    { q: "What happens if there's an emergency?", a: 'Emergency support available. Critical issues (downtime, hacking, data loss) get priority. Response within a few hours for critical issues.' },
    { q: 'Can I migrate to a different host later?', a: 'Yes, you own your website. After full payment, you can:', items: ['Export your website', 'Download your content', 'Migrate to another host', 'Export your email', 'Take complete ownership'] },
    { q: 'What about SEO?', a: 'Basic SEO included:', items: ['SEO-friendly structure', 'Mobile optimization', 'Fast loading', 'Google Analytics setup', 'Meta tags and sitemaps'] },
    { q: 'Is there a setup deadline?', a: 'No deadline. Launch whenever ready. Pay setup fee only when ready to start.' },
    { q: 'Can I buy my own domain?', a: 'Bring your own domain: if you own a domain, we can use it. No domain fee charged.' },
  ],
  compareTitle: 'Launch vs. Other Plans',
  compareTable: { headers: ['Need', 'Launch', 'Boost', 'Growth', 'Platinum'], rows: [
    ['Just starting out', '✅ Perfect', '—', '—', '—'], ['Simple web presence', '✅ Yes', '✅ Yes', '✅ Yes', '✅ Yes'], ['Under 10 pages', '✅ Yes', '—', '—', '—'],
    ['20-30 pages', '❌ No', '✅ Yes', '✅ Yes', '✅ Yes'], ['50+ pages', '❌ No', '❌ No', '✅ Yes', '✅ Yes'], ['Blog content', '❌ No', '✅ 1/mo', '✅ 3/mo', '✅ 10/mo'],
    ['SEO services', '❌ No', '✅ Yes', '✅ Yes', '✅ Yes'], ['Marketing team', '❌ No', '❌ No', '✅ Yes', '✅ Yes'], ['Phone support', '❌ No', '✅ VIP', '✅ VIP', '✅ VIP'], ['Ecommerce', '❌ No', '❌ No', '❌ No', '✅ Yes'],
  ] },
  upgradeGroups: [
    { title: 'Stay on Launch if:', items: ['You have fewer than 10 pages', "You don't need blog content", "You don't need SEO services", 'You want the lowest price', "You're just getting started"] },
    { title: 'Upgrade to Boost if:', items: ['You need 20-30 pages', 'You want monthly blog content', 'You want SEO optimization', 'You want VIP phone support', "You're established and growing"] },
    { title: 'Upgrade to Growth if:', items: ['You need 50+ pages', 'You want aggressive growth', 'You want dedicated marketing team', 'You want 3 blogs/month', 'You want monthly strategy calls'] },
    { title: 'Choose Platinum if:', items: ["You're selling products online", 'You need ecommerce features', 'You want unlimited pages/products', 'You want complete management', 'You need ad campaign management'] },
  ],
  allPlans: [
    { name: 'Launch', desc: 'Get started affordably' }, { name: 'Boost', desc: 'More pages and services' }, { name: 'Growth', desc: 'Full marketing support' },
    { name: 'Platinum', desc: 'Ecommerce powerhouse' }, { name: 'Custom', desc: 'Enterprise solutions' },
  ],
  closing: { eyebrow: 'Ready to Launch?', title: 'Get Your Professional Website in 7 Days', priceLines: ['Setup: PKR 22,500 (one-time)', 'Monthly: PKR 4,500'], cta: 'Start Your Website Today',
    steps: ['Click "Get Started"', 'Tell us about your business', 'We build your website in 7 days', 'Your site goes live and starts working for you'], scheduleCta: 'Schedule a Quick Call' },
  bottomLine: { title: 'Launch Your Website This Week', body: ['For just PKR 4,500/month, you get a complete professional website, domain, email, hosting, and support.', 'No hidden fees. No surprises. Everything included.'], cta: 'Start with Launch Plan Now' },
}

export const BOOST: StandardPlanDetail = {
  quickOverview: {
    title: 'Most Popular Plan for Growing Businesses',
    intro: 'The Boost Plan is designed for established businesses that want serious online visibility and customer growth.',
    ticks: ['30-page professional website', 'Monthly blog posts for SEO', 'Complete SEO optimization', 'VIP phone support', 'Unlimited edits (first 30 days)', 'Hosting and domain included'],
    setupFee: 'PKR 22,500', monthlyFee: 'PKR 15,600', totalFirstMonth: 'PKR 38,100',
  },
  whatYouGet: {
    title: 'Boost Plan Includes Everything to Get Results',
    intro: '',
    sections: [
      { title: 'Comprehensive Website', blocks: [
        { sub: [{ h: '30-Page Professional Website', items: ['Complete site structure', 'Home, About, Services/Products', 'Team pages, testimonials', 'Blog hub and individual posts', 'Contact and lead capture', 'FAQ and resource pages', 'City/location pages (if applicable)'] }] },
        { sub: [{ h: 'Professional Design', items: ['Custom theme based on brand', 'Mobile-responsive design', 'Fast-loading optimization', 'Professional layout', 'Brand-aligned colors and fonts'] }] },
      ] },
      { title: 'SEO & Content Strategy', blocks: [
        { sub: [{ h: 'SEO Optimization', items: ['Keyword research and targeting', 'On-page SEO optimization', 'SEO-friendly site structure', 'Meta titles and descriptions', 'Internal linking strategy', 'Schema markup implementation'] }] },
        { sub: [{ h: 'Monthly Blog Content', items: ['1 professional blog post per month', 'Keyword-researched topics', '1,000-2,000 word articles', 'SEO-optimized content', 'Social media promotion'] }] },
      ] },
      { title: 'Domain & Email', blocks: [
        { sub: [{ h: 'Professional Domain', items: ['Free .com.pk or .pk domain (1 year)', 'Domain privacy', 'Domain management'] }] },
        { sub: [{ h: 'Professional Email', items: ['10 professional email accounts', 'Custom branded emails', 'Email forwarding', 'Webmail access'] }] },
      ] },
      { title: 'Advanced Features', blocks: [
        { sub: [{ h: 'Lead Capture & Forms', items: ['Advanced contact forms', 'Lead capture system', 'Form notifications', 'Lead storage and tracking', 'Email autoresponders'] }] },
        { sub: [{ h: 'Analytics & Tracking', items: ['Google Analytics setup', 'Conversion tracking', 'Goal tracking', 'Monthly performance reports', 'Keyword ranking tracking'] }] },
      ] },
      { title: 'Marketing Support', blocks: [
        { sub: [{ h: 'Social Media Integration', items: ['Social media links', 'Social sharing buttons', 'Blog to social automation', 'Social media strategy guidance'] }] },
        { sub: [{ h: 'Reputation Management', items: ['Review request system', 'Review monitoring', 'Google Business Profile optimization', 'Local SEO setup'] }] },
      ] },
      { title: 'Hosting & Maintenance', blocks: [
        { sub: [{ h: 'Reliable Hosting', items: ['Fast, secure servers', '99.9% uptime guarantee', 'SSL certificate (HTTPS)', 'Daily backups', 'CDN for fast loading'] }] },
        { sub: [{ h: 'Ongoing Maintenance', items: ['Monthly updates', 'Plugin management', 'Security patches', 'Malware scanning', 'Performance optimization'] }] },
      ] },
      { title: 'Support & Phone Access', blocks: [
        { sub: [{ h: 'Premium Support', items: ['Email and WhatsApp support', 'VIP phone support (1 call/month included)', 'Priority response times', 'Dedicated account manager', '24-hour emergency support for critical issues'] }] },
        { sub: [{ h: 'Support Hours', items: ['Monday-Saturday, 11 AM - 8 PM PKT', 'Phone support available', 'Average response: 4-8 hours'] }] },
      ] },
    ],
  },
  extraSections: [
    { title: 'Why Clients Love Boost', blocks: [
      { h: '1. Complete Professional Website', p: 'Thirty pages is enough to establish authority and serve different customer needs. Not too big to manage, not too small to be effective.' },
      { h: '2. Monthly Blog Content', p: 'One blog post per month = 12 new pages per year. More pages = more ranking opportunities = more organic traffic.', items: ['Real math: 12 blog posts/year × 1,200 monthly searches per blog topic = 14,400 additional search impressions/year'] },
      { h: '3. SEO Optimization Built-In', p: 'Not an add-on. SEO is core to Boost Plan:', items: ['Keyword research', 'On-page optimization', 'Technical SEO', 'Content optimization', 'Monthly reporting'] },
      { h: '4. VIP Phone Support', p: 'Talk to an expert. One phone call/month included to discuss:', items: ['Website performance', 'Traffic and rankings', "Next month's blog topic", 'Marketing strategy', 'Questions and issues'] },
      { h: '5. Monthly Reports', p: 'Know exactly how your website is performing:', items: ['Traffic trends', 'Top pages', 'Search keywords', 'Ranking improvements', 'Visitor behavior'] },
      { h: '6. Professional Email', p: '10 email accounts with your domain. Builds credibility and keeps communication professional.' },
    ] },
    { title: 'How the Monthly Blog Works', blocks: [
      { h: 'Month 1: Topic Selection', items: ['Our team researches high-value keywords', 'We identify topics that match your business', 'We get your approval', 'We create content brief'] },
      { h: 'Month 2-12: Content Creation', items: ['1,000-2,000 word SEO-optimized article', 'Keyword research and integration', 'Internal and external links', 'Professional formatting', 'Social media promotion'] },
      { h: 'Year 1 Results', items: ['12 blog posts published', '12 new keyword rankings', 'Increased organic traffic', 'Established authority', 'Continuous lead generation'] },
      { h: 'Example Blog Topics', items: ['Restaurant: "5 Best Pakistani Dishes for First-Time Visitors"', 'Real Estate: "Complete Guide to Buying Property in DHA Karachi"', 'Clinic: "7 Signs You Need to Visit a Dermatologist"', "Salon: \"Best Hair Care Tips for Pakistan's Climate\"", "Gym: \"Complete Beginner's Workout Plan for Home Fitness\""] },
    ] },
  ],
  glance: { title: 'Boost Plan at a Glance', rows: [
    ['Pages', '30 pages'], ['Professional Design', '✅ Yes'], ['Mobile Responsive', '✅ Yes'], ['SEO Optimization', '✅ Complete'], ['Blog Posts/Month', '✅ 1 post/month'],
    ['Keyword Research', '✅ Yes'], ['Domain Included', '✅ Yes (1 year)'], ['Email Accounts', '✅ 10 accounts'], ['SSL Certificate', '✅ Yes'], ['Google Analytics', '✅ Yes with reports'],
    ['Contact Forms', '✅ Advanced forms'], ['Monthly Maintenance', '✅ Yes'], ['VIP Phone Support', '✅ Yes (1 call/mo)'], ['Social Media Integration', '✅ Yes'], ['Review Management', '✅ Yes'],
    ['Monthly Reports', '✅ Yes'], ['SEO Services', '✅ Included'], ['Marketing Team', '❌ Not included'], ['Ecommerce', '❌ Not included'],
  ] },
  bestFor: { title: 'Who Should Choose the Boost Plan?', groups: [
    { title: 'Established Local Businesses', items: ['Restaurants, salons, clinics, gyms', 'Real estate agents, lawyers, consultants', 'Local service providers', 'Want to dominate local search', 'Need lead generation'] },
    { title: 'Professional Services', items: ['Accountants, attorneys, consultants', 'Healthcare providers', 'Coaches and trainers', 'Agencies and studios', 'Want credibility and leads'] },
    { title: 'E-commerce (Under 30 Products)', items: ['Online retailers', 'Dropshipping businesses', 'Selling services online', 'Low to medium product volume', 'Want basic online store'] },
    { title: 'Growing Small Businesses', items: ['Established 2+ years', 'Revenue PKR 500K+/month', 'Ready to invest in growth', 'Want professional online presence', 'Serious about digital marketing'] },
    { title: 'Nonprofits & Associations', items: ['Trade associations', 'Nonprofits with budget', 'Community organizations', 'Want donation capability', 'Need membership features'] },
  ] },
  pricing: {
    setupFee: 'PKR 22,500', setupItems: ['Website design and development', 'Domain and email setup', 'SEO configuration', 'Content entry', 'Launch and testing'],
    monthlyFee: 'PKR 15,600', monthlyItems: ['Hosting and servers', '1 monthly blog post (SEO content)', 'Ongoing SEO optimization', 'Maintenance and updates', 'Security and backups', 'Support and assistance', 'Phone support (1 call/month)'],
    blogNote: { included: '1 blog post/month', extra: 'PKR 3,500 each', whyMatters: ['Fresh content = better Google rankings', 'More pages = more ranking opportunities', 'Blog = lead generation machine', 'Establishes authority', 'Drives organic traffic'] },
    savings: { headers: ['Payment Plan', 'Setup', 'Monthly', 'Annual Total', 'You Save'], rows: [
      ['Monthly', '22,500', '15,600', '209,700'], ['Annual (Pay Yearly)', '22,500', '187,200', '209,700'], ['Two-Year (Pay Upfront)', '22,500', '374,400', '396,900'],
    ] },
    notIncluded: ['Additional blog posts (available at PKR 3,500 each)', 'Advanced SEO services (upgrade to Growth)', 'Dedicated marketing manager (upgrade to Growth)', 'Multiple phone calls (upgrade to Growth for unlimited)', 'Ecommerce management (upgrade to Platinum)', 'Social media management (available in Growth)'],
  },
  examples: { title: 'Boost Plan Success Stories', items: [
    { title: 'Local Restaurant', lines: ['Website: 25 pages (menu, locations, photos, reviews, blog)', 'Blog: 1 post/month about food, recipes, local events', 'Result: 340% traffic increase in 6 months, online reservations, customer reviews', 'Cost: PKR 15,600/month'] },
    { title: 'Real Estate Agent', lines: ['Website: 28 pages (listings, market insights, team, testimonials, blog)', 'Blog: 1 post/month on market trends, buying tips, neighborhood guides', 'Result: 450% leads increase, 120 property inquiries first year, 15 sales', 'Cost: PKR 15,600/month'] },
    { title: 'Dental Clinic', lines: ['Website: 30 pages (services, team, testimonials, education blog, patient forms)', 'Blog: 1 post/month on dental health, cosmetic procedures, patient tips', 'Result: 60% new patient acquisition, established authority, online booking', 'Cost: PKR 15,600/month'] },
  ] },
  process: { title: 'How Your Website Gets Built', phases: [
    { title: 'Week 1: Planning & Strategy', items: ['Discuss your business and goals', 'Keyword research and strategy', 'Site structure planning', 'Design direction'] },
    { title: 'Week 2-3: Design & Development', items: ['Website design and development', 'Page structure and layout', 'Feature implementation', 'Email setup'] },
    { title: 'Week 4: Content & Optimization', items: ['Content entry and optimization', 'SEO configuration', 'Analytics setup', 'Testing and review'] },
    { title: 'Week 5-6: Launch', items: ['Final approval', 'Deploy to live servers', 'Google Search Console setup', 'Initial promotion'] },
  ], closing: 'Your website is live. Organic traffic begins.' },
  faqs: [
    { q: 'How many pages do I actually get?', a: '30 professional pages including:', items: ['Homepage (1 page)', 'Core pages (5-7 pages: About, Services, Contact, FAQ, Team, etc.)', 'Service/Product pages (5-8 pages)', 'Blog hub and initial blog posts (3-5 pages)', 'Location/city pages (if applicable, 5-10 pages)', 'Additional custom pages (remaining space)', 'More pages needed? Upgrade to Growth (50 pages).'] },
    { q: 'Can I add pages after launch?', a: "Yes. Add pages anytime through the editor or request our team's help. First 30 days include unlimited edits; after that, major structural changes may require additional fees." },
    { q: 'What if I want more blog posts?', a: 'Included: 1 blog post/month. Additional posts: PKR 3,500 per post. Many clients add 1-2 extra blog posts/month as they see results.' },
    { q: 'Do I own the blog content?', a: 'Yes, 100%. You own all content created for your website, including blog posts. You can:', items: ['Republish elsewhere', 'Modify as needed', 'Remove content', 'Export everything'] },
    { q: 'What about SEO—is it guaranteed?', a: 'No guarantees, but excellent results. We apply industry best practices, but SEO depends on competition level, your niche, market size, backlink authority and content quality. Typical results: 2-3 months to see ranking improvements, 6+ months for major growth.' },
    { q: 'Can I upgrade or downgrade?', a: 'Yes, anytime. Want to upgrade to Growth for marketing team? Downgrade to Launch? No problem. New pricing applies on renewal date.' },
    { q: "What's included in the monthly report?", a: 'Your monthly report includes:', items: ['Traffic overview and trends', 'Top pages and content', 'Search keywords and rankings', 'User behavior and engagement', 'Conversion tracking (if set up)', 'Recommendations and next steps'] },
    { q: 'How often can I call for phone support?', a: 'Included: 1 call/month (30 minutes). Additional calls: PKR 2,500 per call. Most clients schedule their call to discuss the next month’s blog topic.' },
    { q: 'Can I cancel anytime?', a: 'Yes. Provide 30 days written notice via email. Current month services remain active. Refund policy applies.' },
    { q: 'What if I need ecommerce features?', a: 'Not included in Boost. For ecommerce: basic upgrade to Platinum; simple products can be added manually to Boost; advanced shopping requires upgrading to Platinum.' },
    { q: 'Does this include social media management?', a: 'No social media posting. Included: social media links, social sharing buttons, blog-to-social automation. Want social media posting? Upgrade to Growth Plan.' },
    { q: 'How much traffic increase should I expect?', a: 'Results vary, but typical: 150-300% traffic increase in 6-12 months with consistent blog content and SEO. Factors: starting point, competition level, blog consistency, backlink building, your market size.' },
    { q: "What if the design doesn't match my vision?", a: 'Design included: one professional theme-based design with color and font customization. Want custom design? Custom plans available (contact us for pricing).' },
    { q: 'Is phone support really included?', a: '100% included. One 30-minute call per month with your account manager to discuss website performance, traffic and ranking progress, next month’s blog topic, marketing questions, and technical issues.' },
    { q: 'What happens if my website gets hacked?', a: 'We monitor for security issues. If compromised: immediate security scan, malware removal, website recovery, data restoration, security hardening. Emergency support applies — no additional fee for security incidents.' },
    { q: 'Can I export my website if I leave?', a: 'Yes. Upon full payment and after proper notice: export all content, download website files, migrate domain, take complete ownership.' },
  ],
  compareTitle: 'Should You Upgrade to Boost?',
  compareTable: { headers: ['Need', 'Launch', 'Boost'], rows: [
    ['Pages', '5-10', '30'], ['Blog posts', 'None', '1/month'], ['SEO optimization', 'Basic', 'Complete'], ['Phone support', 'No', '1 call/mo'], ['Monthly reports', 'No', 'Yes'], ['Email accounts', '5', '10'], ['Price/month', '4,500', '15,600'],
  ] },
  upgradeIntro: 'Upgrade to Boost if you:',
  upgradeGroups: [{ title: 'Upgrade to Boost if you:', items: ['Need more than 10 pages', 'Want blog content for rankings', 'Want dedicated SEO optimization', 'Want professional phone support', 'Want monthly performance reports', 'Serious about online growth'] }],
  allPlans: [
    { name: 'Launch', desc: '5-10 pages, affordable start' }, { name: 'Boost', desc: '30 pages with SEO and blog' }, { name: 'Growth', desc: '50 pages with marketing team' },
    { name: 'Platinum', desc: 'Unlimited pages with ecommerce' }, { name: 'Custom', desc: 'Enterprise solutions' },
  ],
  closing: { eyebrow: 'Ready to Boost?', title: 'Start Growing Your Online Visibility', priceLines: ['Setup: PKR 22,500 (one-time)', 'Monthly: PKR 15,600', '1 blog post included each month'], cta: 'Start Your Boost Plan',
    steps: ['Click "Get Started"', 'Tell us about your business', 'We build your 30-page website + blog strategy', 'You start ranking and getting customers'], scheduleCta: 'Schedule a Phone Consultation' },
  bottomLine: { title: 'The Most Popular Plan for a Reason', body: ['30-page website. Monthly blog content. SEO optimization. VIP phone support.', 'Everything you need to dominate Google and grow your business.'], cta: 'Start Boosting Today' },
}

export const GROWTH: StandardPlanDetail = {
  quickOverview: {
    title: 'The Plan for Ambitious Businesses',
    intro: 'The Growth Plan is built for businesses that want to scale fast and need expert marketing guidance.',
    ticks: ['50-page professional website', 'Dedicated marketing expert (just for you)', '3 blog posts per month', 'Monthly 1-on-1 growth strategy calls', 'VIP phone support', 'Complete SEO and marketing services'],
    setupFee: 'PKR 22,500', monthlyFee: 'PKR 27,000', totalFirstMonth: 'PKR 49,500',
  },
  whatYouGet: {
    title: 'Complete Growth Plan Includes',
    intro: '',
    sections: [
      { title: 'Comprehensive Website', blocks: [
        { sub: [{ h: '50-Page Professional Website', items: ['Complete site structure', 'All core business pages', 'Detailed service/product pages', 'Team and credentials pages', 'Blog hub and archive', 'Case studies and testimonials', 'Multiple location/city pages', 'Resource and educational content', 'Advanced lead capture system'] }] },
        { sub: [{ h: 'Professional Design & UX', items: ['Custom theme based on brand', 'Mobile-responsive design', 'Conversion-optimized layout', 'Professional typography', 'Fast-loading optimization', 'Accessibility compliance'] }] },
      ] },
      { title: 'Advanced Content Strategy', blocks: [
        { sub: [{ h: 'Blog Content (3 Posts/Month)', items: ['3 professional blog posts per month', 'Keyword-researched topics', '1,500-2,500 words per article', 'SEO-optimized content', 'Internal linking strategy', 'Social media promotion'] }] },
        { sub: [{ h: 'Content Calendar', items: ['3-month content planning', 'Topic selection and approval', 'Publication schedule', 'Promotional strategy'] }] },
      ] },
      { title: 'Complete SEO Services', blocks: [
        { sub: [{ h: 'SEO Strategy & Implementation', items: ['Comprehensive keyword research', 'Competitor analysis', 'On-page optimization', 'Technical SEO audit and fixes', 'Content optimization', 'Internal linking strategy', 'Schema markup implementation'] }] },
        { sub: [{ h: 'Monthly SEO Optimization', items: ['Ongoing content optimization', 'Page speed improvements', 'Mobile optimization', 'Core Web Vitals monitoring', 'Link building strategy planning'] }] },
      ] },
      { title: 'Advanced Analytics & Reporting', blocks: [
        { sub: [{ h: 'Monthly Performance Reports', items: ['Traffic analysis and trends', 'Keyword ranking tracking', 'Conversion rate analysis', 'User behavior metrics', 'ROI and growth metrics', 'Custom dashboards'] }] },
        { sub: [{ h: 'Tracking & Measurement', items: ['Google Analytics 4 setup', 'Conversion goal tracking', 'Event tracking', 'Lead tracking', 'Revenue tracking (if applicable)'] }] },
      ] },
      { title: 'Marketing Infrastructure', blocks: [
        { sub: [{ h: 'Email Marketing Setup', items: ['Email service provider integration', 'Email list building strategy', 'Welcome series setup', 'Newsletter template creation'] }] },
        { sub: [{ h: 'Social Media Integration', items: ['Social media strategy', 'Link integration', 'Social sharing optimization', 'Bio and profile optimization', 'Social media calendar planning'] }] },
        { sub: [{ h: 'Reputation Management', items: ['Google Business Profile optimization', 'Review strategy and collection', 'Review response templates', 'Reputation monitoring'] }] },
      ] },
      { title: 'Domain & Professional Email', blocks: [
        { sub: [{ h: 'Professional Domain', items: ['Free .com.pk or .pk domain (1 year)', 'Domain privacy protection', 'Domain management'] }] },
        { sub: [{ h: 'Professional Email', items: ['15 professional email accounts', 'Custom branded emails', 'Email forwarding', 'Team collaboration'] }] },
      ] },
      { title: 'Hosting & Maintenance', blocks: [
        { sub: [{ h: 'Premium Hosting', items: ['High-performance servers', '99.99% uptime guarantee', 'SSL certificate (HTTPS)', 'Daily backups', 'CDN for global speed', 'DDoS protection'] }] },
        { sub: [{ h: 'Comprehensive Maintenance', items: ['Weekly updates and monitoring', 'Security patches and hardening', 'Performance optimization', 'Malware scanning', 'Monthly performance tune-ups'] }] },
      ] },
      { title: 'Expert Support', blocks: [
        { sub: [{ h: 'Dedicated Marketing Expert', items: ['Your personal marketing advisor', 'Monthly 1-on-1 strategy calls', 'Email and WhatsApp support', 'VIP phone support (unlimited)', 'Priority response times'] }] },
        { sub: [{ h: 'Support Hours', items: ['Monday-Saturday, 11 AM - 8 PM PKT', 'Priority phone support', 'Average response: 2-4 hours', 'Emergency support 24/7 for critical issues'] }] },
      ] },
    ],
  },
  extraSections: [
    { title: 'The Dedicated Marketing Expert Difference', blocks: [
      { h: 'Your Dedicated Marketing Expert Will:', p: "With Growth Plan, you don't just get a website. You get a dedicated marketing expert working exclusively on your growth." },
      { h: 'Monthly Strategy Calls', items: ['1-on-1 video call every month', 'Review performance and results', "Plan next month's strategy", 'Discuss marketing opportunities', 'Answer questions and brainstorm'] },
      { h: 'Personalized Growth Plan', items: ['Custom 5-month growth roadmap', 'Specific, measurable objectives', 'Marketing channel priorities', 'Timeline and milestones', 'Resource allocation'] },
      { h: 'Content Strategy', items: ['Plan 3 blog topics/month for your business', 'Keyword research for your niche', 'Content calendar management', 'Distribution strategy', 'Performance tracking'] },
      { h: 'Traffic and Conversion Analysis', items: ['Monthly deep-dive into analytics', 'User behavior analysis', 'Conversion optimization recommendations', 'Traffic source optimization', 'Competitive analysis'] },
      { h: 'Marketing Channel Guidance', items: ['SEO strategy and optimization', 'Email marketing setup and strategy', 'Social media strategy and planning', 'Paid advertising recommendations (if applicable)', 'Content distribution planning'] },
      { h: 'Business Growth Support', items: ['Market analysis and competitive intelligence', 'Growth bottleneck identification', 'Customer acquisition strategy', 'Retention and loyalty planning', 'Revenue growth recommendations'] },
    ] },
    { title: 'Your Personal Growth Advisor', blocks: [
      { h: 'Who Is Your Dedicated Marketing Expert?', items: ['Experienced marketer (5+ years)', 'Specialist in your industry or similar', 'Expert in SEO, content, and growth', 'Available for monthly strategy calls', 'Responds to emails and WhatsApp', 'Manages your account personally'] },
      { h: "What They'll Develop For You — 5-Month Growth Roadmap", items: ['Month 1: Assessment and strategy', 'Month 2: Foundation building', 'Month 3: Content acceleration', 'Month 4: Traffic optimization', 'Month 5: Conversion optimization'] },
      { h: 'Monthly Action Plans', items: ['Specific tasks and priorities', 'Timeline and milestones', 'Resource allocation', 'Expected results'] },
      { h: 'Quarterly Strategy Reviews', items: ['Progress against plan', 'Adjustment and optimization', 'New opportunities', 'Competitive updates'] },
      { h: 'Example: Your First Month Strategy Call (45-60 minutes)', items: ['Website launch and initial performance', 'Keyword ranking baseline', 'Traffic and conversion baseline', 'Competitive landscape review', '5-month growth roadmap', 'Month 2 blog topics and strategy', 'Next steps and action items'] },
    ] },
  ],
  glance: { title: 'Growth Plan at a Glance', rows: [
    ['Pages', '50 pages'], ['Professional Design', '✅ Yes'], ['Mobile Responsive', '✅ Yes'], ['SEO Optimization', '✅ Complete'], ['Blog Posts/Month', '✅ 3 posts/month'],
    ['Keyword Research', '✅ Yes'], ['Dedicated Marketing Expert', '✅ Yes'], ['Monthly Strategy Calls', '✅ Yes (1-on-1)'], ['Domain Included', '✅ Yes (1 year)'], ['Email Accounts', '✅ 15 accounts'],
    ['SSL Certificate', '✅ Yes'], ['Google Analytics', '✅ Advanced setup'], ['Monthly Reports', '✅ Detailed'], ['Email Marketing Setup', '✅ Yes'], ['Social Media Strategy', '✅ Yes'],
    ['Phone Support', '✅ Unlimited'], ['Reputation Management', '✅ Yes'], ['SEO Services', '✅ Advanced'], ['Marketing Strategy', '✅ 5-month plan'], ['Ecommerce', '❌ Not included'],
  ] },
  bestFor: { title: 'Who Should Choose the Growth Plan?', groups: [
    { title: 'Established Businesses Ready to Scale', items: ['2+ years in business', 'Annual revenue PKR 1M+', 'Clear products or services', 'Existing customer base', 'Ready to invest in growth'] },
    { title: 'Ambitious Entrepreneurs', items: ['Vision for significant growth', 'Willing to invest in expert guidance', 'Want to beat competitors', 'Need structured marketing plan', 'Want measurable results'] },
    { title: 'Professional Services Firms', items: ['Consultants, coaches, agencies', 'Lawyers, accountants, healthcare', 'Need client acquisition', 'Value expert guidance', 'Want strategic partnership'] },
    { title: 'Growing E-Commerce Businesses', items: ['30-300+ products', 'Established brand', 'Want to scale sales', 'Need marketing strategy', 'Need content (product descriptions, blogs)'] },
    { title: 'Local Businesses with Growth Goals', items: ['Restaurants, gyms, salons, clinics', 'Multiple locations (current/planned)', 'Want to expand market', 'Need consistent marketing', 'Want expert guidance'] },
  ] },
  pricing: {
    setupFee: 'PKR 22,500', setupItems: ['Website design and development', 'Domain and email setup', 'Email marketing setup', 'Analytics and tracking setup', 'SEO configuration', 'Launch and optimization'],
    monthlyFee: 'PKR 27,000', monthlyItems: ['Premium hosting and servers', '3 professional blog posts', 'Complete SEO services', 'Monthly performance reports', 'Dedicated marketing expert', 'Monthly strategy calls', 'VIP phone support', 'Ongoing optimization and maintenance'],
    perMonthValue: { intro: 'For PKR 27,000/month you receive:', items: [
      { label: '1 dedicated marketing expert (part of team)', value: '' }, { label: '3 blog posts', value: 'PKR 10,500 value' }, { label: 'Monthly strategy call', value: 'PKR 5,000 value' },
      { label: 'SEO optimization services', value: 'PKR 5,000 value' }, { label: 'Analytics and reporting', value: 'PKR 3,000 value' }, { label: 'Hosting and maintenance', value: 'PKR 5,000 value' }, { label: 'Support and assistance', value: 'priceless' },
    ], total: 'Total value: ~PKR 43,500+/month for PKR 27,000' },
    savings: { headers: ['Payment Plan', 'Setup', 'Monthly', 'Annual Total', 'You Save'], rows: [
      ['Monthly', '22,500', '27,000', '346,500'], ['Annual (Pay Yearly)', '22,500', '324,000', '346,500'], ['Two-Year (Pay Upfront)', '22,500', '648,000', '670,500'],
    ] },
    notIncluded: [],
  },
  examples: { title: 'Growth Plan Success Stories', items: [
    { title: 'B2B Consulting Firm', lines: ['Baseline: 2,500 monthly visitors, 15 leads/month', 'Website: 48 pages (services, case studies, resources, blog)', 'Content: 3 blog posts/month on industry trends', 'Result after 6 months: 8,200 monthly visitors (+228%), 85 leads/month (+467%), 12 new clients (PKR 2.4M revenue)', 'Cost: PKR 162,000 · ROI: 14.8x'] },
    { title: 'E-Commerce Store', lines: ['Baseline: 800 visitors/month, 12 orders/month', 'Website: 52 pages (products, guides, customer education)', 'Content: 3 blog posts/month on product tips', 'Result after 6 months: 4,100 visitors/month (+412%), 78 orders/month (+550%), PKR 1.8M in sales', 'Cost: PKR 162,000 · ROI: 11.1x'] },
    { title: 'Local Service Business (Multi-Location)', lines: ['Baseline: 1,200 visitors/month, 8 customers/month', 'Website: 50 pages (locations, services, testimonials, blog)', 'Content: 3 blog posts/month on service tips', 'Result after 6 months: 5,800 visitors/month (+383%), 64 customers/month (+700%), PKR 3.2M in new revenue', 'Cost: PKR 162,000 · ROI: 19.7x'] },
  ] },
  process: { title: 'How Your Growth Plan Gets Implemented', phases: [
    { title: 'Week 1-2: Strategy & Planning', items: ['In-depth business consultation', 'Market and competitive analysis', 'Keyword research and opportunity identification', '5-month growth roadmap creation', 'Website structure planning', 'Content strategy development'] },
    { title: 'Week 3-4: Website Building', items: ['Website design and development (50 pages)', 'Feature implementation', 'Email marketing setup', 'Analytics and tracking configuration', 'Content organization and structure'] },
    { title: 'Week 5-6: Content & Optimization', items: ['Initial blog posts (3)', 'SEO optimization', 'Internal linking strategy', 'Conversion optimization', 'Email templates and welcome series'] },
    { title: 'Week 7: Launch', items: ['Final testing and approval', 'Deploy to live servers', 'Google Search Console setup', 'Initial promotion', 'Analytics baseline establishment'] },
    { title: 'Ongoing: Growth Phase', items: ['Monthly blog posts (3/month)', 'Monthly strategy calls', 'Ongoing SEO optimization', 'Monthly performance reporting', 'Continuous improvement'] },
  ], closing: '' },
  faqs: [
    { q: 'What makes Growth different from Boost?', a: 'Key differences:', items: ['Pages: 30 (Boost) vs 50 (Growth)', 'Blog posts: 1/month vs 3/month', 'Marketing expert: No vs Yes', 'Strategy calls: No vs Monthly', 'Phone support: 1 call/mo vs Unlimited', 'Marketing guidance: No vs Yes', '5-month roadmap: No vs Yes', 'Email strategy: No vs Yes', 'Price/month: 15,600 vs 27,000'] },
    { q: 'Do I work with the same person each month?', a: 'Yes. Your dedicated marketing expert is your personal advisor. They stay with your account, understand your business deeply, and provide consistent guidance.' },
    { q: 'Can I change my dedicated expert?', a: "Yes, if needed. If you want a different expert, let us know and we'll make a change." },
    { q: "What's a typical monthly strategy call agenda?", a: '30-45 minute call covering:', items: ["Last month's performance review", 'Traffic and ranking trends', 'Blog content performance', 'Conversion analysis', "Next month's blog topics", 'Strategic opportunities', 'Questions and discussion', "Next month's action items"] },
    { q: 'Can I call more than the monthly scheduled call?', a: 'Yes. Unlimited phone support included. You can:', items: ['Schedule additional calls (beyond monthly)', 'Quick questions via WhatsApp', 'Email support anytime', 'Priority response times'] },
    { q: "What if I'm not happy with blog topics?", a: 'We work together. Blog topics are researched for your keywords, discussed with you before writing, approved by you before publishing, and customizable based on your feedback.' },
    { q: 'How many blog posts would I get annually?', a: '36 blog posts/year (3 per month × 12 months). That’s 36 new pages, 36 new ranking opportunities, 36 leads capture opportunities.' },
    { q: 'Can I use the blog posts elsewhere?', a: 'Yes, 100%. You own all content. You can:', items: ['Republish in email newsletters', 'Share on social media', 'Use in guides or ebooks', 'Repurpose into different formats', "Sell the content (though we'd prefer you republish and link back)"] },
    { q: 'What if I need more than 50 pages?', a: 'Upgrade options:', items: ['Add pages individually (PKR 2,500 per page)', 'Upgrade to Platinum (unlimited pages)', 'Create new pages as blog posts'] },
    { q: 'Does this include social media posting?', a: 'No social media posting. Included: social media strategy planning, social media optimization, sharing templates, link integration. Want actual posting? Can add social media management (contact for pricing).' },
    { q: 'What about paid advertising (Facebook, Google Ads)?', a: 'Not included in Growth. Included: ad strategy recommendations, platform setup guidance, campaign structure advice, ROI analysis recommendations. Want us to manage ads? Platinum Plan or custom arrangement available.' },
    { q: 'How quickly will I see results?', a: 'Typical timeline: Month 1 baseline establishment, Month 2-3 initial ranking improvements, Month 3-4 traffic increase (20-40%), Month 4-6 significant growth (100-200%+), Month 6+ continuing momentum.' },
    { q: 'Is there a contract or commitment?', a: "No long-term contract required. Cancel with 30 days notice anytime. We're confident you'll see results and want to stay." },
    { q: 'What if my business pivots or changes direction?', a: 'Easy to adapt. During monthly calls, we can adjust strategy for new direction, shift content focus, replan your roadmap, update keyword targeting.' },
    { q: 'Can I downgrade to Boost?', a: 'Yes, anytime. Downgrade option available. New pricing applies on renewal date.' },
    { q: 'What if I want to upgrade to Platinum?', a: 'Yes, possible. Upgrade to Platinum for unlimited pages, ecommerce features, 10 blog posts/month, full team support, ad campaign management.' },
  ],
  compareTitle: 'Should You Upgrade to Growth?',
  compareTable: { headers: ['Need', 'Boost', 'Growth'], rows: [
    ['Pages', '30', '50'], ['Blog posts', '1/month', '3/month'], ['Marketing expert', 'No', 'Yes'], ['Strategy calls', 'No', 'Yes, monthly'], ['Phone support', 'Limited', 'Unlimited'], ['Email strategy', 'No', 'Yes'], ['Competitive analysis', 'No', 'Yes'], ['Price/month', '15,600', '27,000'],
  ] },
  upgradeGroups: [{ title: 'Upgrade to Growth if you:', items: ['Want aggressive growth (2-3x+ in 6 months)', 'Need expert marketing guidance', 'Want monthly strategy calls', 'Need content beyond 1 blog/month', 'Want to outrank competitors', 'Serious about scaling business'] }],
  allPlans: [
    { name: 'Launch', desc: 'Start online affordably' }, { name: 'Boost', desc: '30 pages with blog and SEO' }, { name: 'Growth', desc: '50 pages with marketing expert' },
    { name: 'Platinum', desc: 'Unlimited pages with ecommerce' }, { name: 'Custom', desc: 'Enterprise solutions' },
  ],
  closing: { eyebrow: 'Ready to Scale?', title: 'Get Your Dedicated Growth Expert', priceLines: ['Setup: PKR 22,500 (one-time)', 'Monthly: PKR 27,000', 'Dedicated marketing expert included'], cta: 'Start Growing Now',
    steps: ['Click "Get Started"', 'Schedule a strategy consultation', 'We create your 5-month roadmap', 'Your expert starts guiding your growth'], scheduleCta: 'Schedule Strategy Consultation' },
  bottomLine: { title: 'Expert-Guided Growth for Ambitious Businesses', body: ['Forget DIY marketing guessing games. Get a dedicated marketing expert managing your growth.', '50-page website. 3 blog posts/month. Expert guidance. Monthly strategy calls.', 'Results you can measure. Growth you can count on.'], cta: 'Start Your Growth Plan Today' },
}

export const PLATINUM: StandardPlanDetail = {
  quickOverview: {
    title: 'For Serious Online Sellers',
    intro: 'The Platinum Plan is your complete e-commerce solution. No limitations. No compromises. Full support.',
    ticks: ['Unlimited pages and products', 'Advanced e-commerce features', '10 blog posts per month', '20 social media designs', 'Full team management', 'Ad campaign management', '30-45 day build timeline'],
    setupFee: 'PKR 140,000', monthlyFee: 'PKR 55,000', totalFirstMonth: 'PKR 195,000',
  },
  whatYouGet: {
    title: 'Platinum Plan: Everything for E-Commerce Success',
    intro: '',
    sections: [
      { title: 'Unlimited Website Foundation', blocks: [
        { sub: [{ h: 'Unlimited Pages & Products', items: ['Unlimited product listings', 'Unlimited product categories', 'Unlimited product variations', 'Detailed product descriptions', 'Product image galleries', 'Product reviews and ratings', 'Related products recommendations'] }] },
        { sub: [{ h: 'Advanced Store Pages', items: ['Professional homepage', 'Complete about/company pages', 'Team and leadership pages', 'Blog hub and archive (100+ posts/year)', 'Resource center', 'Customer reviews page', 'Testimonials and case studies', 'FAQ and help pages', 'Terms and privacy pages', 'Return/refund policy pages'] }] },
      ] },
      { title: 'Advanced E-Commerce Features', blocks: [
        { sub: [{ h: 'Complete Shopping Experience', items: ['Professional product catalog', 'Advanced product filtering', 'Search functionality', 'Shopping cart', 'Secure checkout', 'Guest checkout option', 'Account creation and login', 'Order tracking', 'Saved items/wishlist'] }] },
        { sub: [{ h: 'Payment Processing', items: ['Multiple payment gateway integration', 'Credit card processing', 'Bank transfer options', 'Secure payment processing', 'Invoice generation', 'Payment receipt emails'] }] },
        { sub: [{ h: 'Inventory Management', items: ['Real-time inventory tracking', 'Stock level management', 'Low stock alerts', 'Automatic reorder points', 'Product variant tracking', 'Bulk import/export'] }] },
        { sub: [{ h: 'Order Management', items: ['Order management system', 'Customer order history', 'Order status updates', 'Automated order notifications', 'Order analytics and reporting'] }] },
      ] },
      { title: 'Content & SEO Strategy', blocks: [
        { sub: [{ h: 'Blog Content (10 Posts/Month)', items: ['10 professional blog posts per month', 'Product guides and reviews', 'Industry tips and trends', 'Customer education content', 'SEO-optimized articles', '2,000+ words per article'] }] },
        { sub: [{ h: 'Social Media Content', items: ['20 social media post designs per month', 'Product showcases', 'Educational content', 'Promotional content', 'Seasonal campaigns', 'Professionally designed graphics'] }] },
      ] },
      { title: 'Complete E-Commerce SEO', blocks: [
        { sub: [{ h: 'E-Commerce SEO Services', items: ['Product page optimization', 'Category page optimization', 'Schema markup for products', 'Product rich snippets', 'Internal linking strategy', 'Image optimization', 'Related products setup'] }] },
        { sub: [{ h: 'Marketplace Optimization', items: ['Multi-marketplace listing (if applicable)', 'Product data syndication', 'Marketplace keyword optimization'] }] },
      ] },
      { title: 'Marketing & Growth Services', blocks: [
        { sub: [{ h: 'Email Marketing', items: ['Email marketing setup', 'Segmentation strategy', 'Automated email sequences', 'Welcome series', 'Abandoned cart recovery', 'Post-purchase follow-up', 'Promotional campaigns'] }] },
        { sub: [{ h: 'Reputation Management', items: ['Review collection strategy', 'Review monitoring', 'Response templates', 'Google Business Profile optimization', 'Rating aggregation'] }] },
        { sub: [{ h: 'Ad Campaign Management', items: ['Google Shopping campaigns', 'Google Search campaigns', 'Facebook/Instagram ad campaigns', 'Retargeting campaign setup', 'Ad copywriting and optimization', 'A/B testing and optimization', 'Monthly campaign management'] }] },
      ] },
      { title: 'Advanced Analytics & Reporting', blocks: [
        { sub: [{ h: 'E-Commerce Analytics', items: ['Sales and revenue tracking', 'Conversion rate analysis', 'Average order value tracking', 'Customer lifetime value', 'Product performance analysis', 'Traffic source attribution', 'Marketing ROI tracking'] }] },
        { sub: [{ h: 'Monthly Reports', items: ['Comprehensive sales reports', 'Traffic and visitor analysis', 'Conversion analysis', 'Product performance rankings', 'Customer acquisition metrics', 'Marketing performance reports'] }] },
      ] },
      { title: 'Full Team Support', blocks: [
        { sub: [{ h: 'Dedicated Account Management', items: ['Primary account manager', 'Full team support access', 'Direct phone and email contact', 'Priority response times', 'Unlimited consultations'] }] },
        { sub: [{ h: 'Dedicated Support Channels', items: ['Personal account manager', 'Dedicated WhatsApp line', 'Priority phone support', 'Direct email support', 'Video call consultations', '24/7 emergency support'] }] },
      ] },
      { title: 'Website Design & Management', blocks: [
        { sub: [{ h: 'Professional Custom Design', items: ['Custom e-commerce theme design', 'Brand integration', 'Professional product showcase', 'Mobile-optimized design', 'Fast-loading optimization', 'Accessibility compliance'] }] },
        { sub: [{ h: 'Ongoing Website Management', items: ['Content updates and changes', 'Product additions and management', 'Photo editing and optimization', 'Banner and promotional updates', 'Feature requests and customization', 'Performance optimization'] }] },
      ] },
      { title: 'Premium Hosting & Security', blocks: [
        { sub: [{ h: 'Enterprise Hosting', items: ['High-performance servers', '99.99% uptime guarantee', 'SSL certificate (HTTPS)', 'DDoS protection', 'Daily backups', 'CDN for global speed', 'Unlimited bandwidth'] }] },
        { sub: [{ h: 'Security & Compliance', items: ['PCI DSS compliance', 'Regular security audits', 'Malware monitoring', 'Security patch management', 'Data protection', 'GDPR compliance (EU customers)'] }] },
      ] },
      { title: 'Professional Infrastructure', blocks: [
        { sub: [{ h: 'Professional Domain & Email', items: ['Free premium domain (1 year)', '25 professional email accounts', 'Custom email addresses', 'Email forwarding'] }] },
        { sub: [{ h: 'Integration Capabilities', items: ['E-commerce platform integrations', 'Payment gateway integrations', 'Email marketing integrations', 'Analytics integrations', 'Accounting software integration', 'Shipping management integration'] }] },
      ] },
    ],
  },
  extraSections: [
    { title: 'Your Full Team Support', blocks: [
      { h: 'Your Dedicated Account Manager', items: ['Primary contact for all needs', 'Monthly strategic reviews', 'Performance monitoring', 'Quarterly goal planning'] },
      { h: 'E-Commerce Specialists', items: ['Product page optimization', 'Inventory management', 'Order fulfillment guidance', 'Customer service setup'] },
      { h: 'SEO & Content Team', items: ['Blog writing (10 posts/month)', 'Keyword research', 'Product page optimization', 'Link building strategy'] },
      { h: 'Marketing Specialists', items: ['Email marketing campaigns', 'Social media content (20 designs/month)', 'Ad campaign management', 'Campaign optimization'] },
      { h: 'Technical Support', items: ['Website maintenance', 'Security monitoring', 'Performance optimization', 'Technical issue resolution'] },
      { h: 'Total Team', p: '5+ specialists dedicated to your success' },
    ] },
  ],
  glance: { title: 'Platinum Plan at a Glance', rows: [
    ['Pages', 'Unlimited'], ['Products', 'Unlimited'], ['Professional Design', '✅ Custom Design'], ['Mobile Responsive', '✅ Yes'], ['Shopping Cart', '✅ Full e-commerce'],
    ['Payment Processing', '✅ Multiple gateways'], ['Blog Posts/Month', '✅ 10 posts/month'], ['Social Media Designs', '✅ 20 designs/month'], ['Email Marketing', '✅ Full setup'], ['Ad Campaign Management', '✅ Yes'],
    ['Domain Included', '✅ Yes (1 year)'], ['Email Accounts', '✅ 25 accounts'], ['SSL Certificate', '✅ Yes'], ['Advanced Analytics', '✅ E-commerce focused'], ['Monthly Reports', '✅ Comprehensive'],
    ['Phone Support', '✅ Unlimited'], ['Account Manager', '✅ Dedicated'], ['SEO Services', '✅ E-commerce SEO'], ['Inventory Management', '✅ Yes'], ['Order Management', '✅ Yes'], ['Security & Compliance', '✅ PCI-DSS compliant'],
  ] },
  bestFor: { title: 'Who Should Choose the Platinum Plan?', groups: [
    { title: 'Serious E-Commerce Sellers', items: ['50+ products currently', 'Already making sales', 'Scaling to next level', 'Want to expand inventory', 'Need professional management'] },
    { title: 'Growing Online Stores', items: ['2+ years in business', 'Monthly revenue PKR 500K+', 'Clear product line', 'Customer base established', 'Ready to scale significantly'] },
    { title: 'Multi-Location Retailers', items: ['Multiple physical locations', 'Want online presence', 'Need inventory sync', 'Want unified management', 'Planning rapid expansion'] },
    { title: 'Wholesale & B2B', items: ['Selling to businesses', 'Multiple product tiers', 'Complex pricing structures', 'Volume discounts', 'B2B-focused marketing'] },
    { title: 'Digital Product Sellers', items: ['Selling courses, software, templates', 'Digital downloads', 'Membership sites', 'Online training', 'SaaS or digital products'] },
    { title: 'Affiliate & Content Marketers', items: ['Selling through blog content', 'Promoting products', 'Monetizing audience', 'Need professional store', 'Integrated marketing needed'] },
  ] },
  pricing: {
    setupFee: 'PKR 140,000', setupItems: ['Custom e-commerce design', 'Domain and email setup', 'Payment gateway integration', 'Email marketing setup', 'Analytics and tracking setup', 'Initial product import', 'SEO configuration', '30-45 day build and launch'],
    monthlyFee: 'PKR 55,000', monthlyItems: ['Hosting and servers', '10 monthly blog posts', '20 monthly social designs', 'Ad campaign management', 'Email marketing management', 'E-commerce maintenance', 'Inventory management support', 'Full team access', 'Account manager', 'Phone and email support'],
    perMonthValue: { intro: 'For PKR 55,000/month you receive:', items: [
      { label: 'Full team support (5+ specialists)', value: '' }, { label: '10 blog posts', value: 'PKR 35,000 value' }, { label: '20 social designs', value: 'PKR 10,000 value' },
      { label: 'Ad campaign management', value: 'PKR 15,000 value' }, { label: 'Email marketing setup', value: 'PKR 5,000 value' }, { label: 'Account manager support', value: 'PKR 10,000 value' }, { label: 'Hosting and maintenance', value: 'PKR 5,000 value' }, { label: 'Plus much more', value: '' },
    ], total: 'Total value: ~PKR 100,000+/month for PKR 55,000' },
    savings: { headers: ['Payment Plan', 'Setup', 'Monthly', 'Annual Total', 'You Save'], rows: [
      ['Monthly', '140,000', '55,000', '800,000'], ['Annual (Pay Yearly)', '140,000', '660,000', '800,000'], ['Two-Year (Pay Upfront)', '140,000', '1,320,000', '1,460,000'],
    ] },
    notIncluded: [],
    roi: { intro: 'Investment: PKR 55,000/month · Average client increase: 3-5x sales in 6 months', lines: ['Starting sales: PKR 500K/month', 'After 6 months: PKR 1.5M-2.5M/month', 'Sales increase: PKR 1M-2M/month', 'Platinum investment: PKR 330K (6 months)', 'ROI: 3-6x in first 6 months'] },
  },
  examples: { title: 'Platinum Plan Success Stories', items: [
    { title: 'Fashion E-Commerce', lines: ['Baseline: 150 products, PKR 400K/month sales', 'Website: unlimited products, custom design, blog, social', 'Content: 10 blogs, 20 social designs/month', 'Ads: Google Shopping, Facebook ads', 'Result after 6 months: 500+ products online, PKR 1.8M/month sales (+350%), 40% repeat customer rate', 'Cost: PKR 330,000 · Revenue gain: PKR 8.4M · ROI: 25.4x'] },
    { title: 'Digital Products (Online Courses)', lines: ['Baseline: 8 courses, 120 students, PKR 250K/month', 'Website: unlimited pages, course platform, blog', 'Content: 10 educational blogs/month', 'Ads: Facebook and Google ads', 'Result after 6 months: 35 courses available, 620 active students (+416%), PKR 1.6M/month revenue', 'Cost: PKR 330,000 · Revenue gain: PKR 8.1M · ROI: 24.5x'] },
    { title: 'Multi-Location Retail', lines: ['Baseline: 3 stores, 200 products, PKR 800K/month sales', 'Website: unified online store, inventory sync', 'Content: 10 blogs, 20 social/month', 'Ads: location-based Google/Facebook campaigns', 'Result after 6 months: unified online + offline, PKR 3.2M/month sales, 20% online of total revenue', 'Cost: PKR 330,000 · Revenue gain: PKR 14.4M · ROI: 43.6x'] },
  ] },
  process: { title: 'Your E-Commerce Store Launch Timeline', phases: [
    { title: 'Phase 1: Strategy & Design (Days 1-7)', items: ['Business and product analysis', 'Market and competitive research', 'E-commerce strategy', 'Custom design mockups', 'Feature planning'] },
    { title: 'Phase 2: Development (Days 8-25)', items: ['Website development', 'Shopping cart setup', 'Payment integration', 'Email marketing setup', 'Analytics configuration'] },
    { title: 'Phase 3: Content & Products (Days 26-35)', items: ['Product data import', 'Product descriptions', 'Product photography optimization', 'Blog strategy and first posts', 'Social media template creation'] },
    { title: 'Phase 4: Testing & Launch (Days 36-45)', items: ['Functionality testing', 'Payment processing testing', 'Security audit', 'Performance optimization', 'Google Shopping setup', 'Ad account setup and launch'] },
  ], closing: 'Your complete e-commerce store is live and generating sales.' },
  faqs: [
    { q: 'How many products can I sell?', a: 'Unlimited products. No cap on:', items: ['Number of products', 'Product categories', 'Product variations', 'Digital vs. physical', 'Unlimited growth'] },
    { q: 'Do you handle order fulfillment?', a: 'Not physically. We handle order management system, order notifications, customer communication, tracking and delivery, returns management. You handle physical packing/shipping or integrate with fulfillment partner.' },
    { q: 'Can I integrate shipping management?', a: 'Yes. Integration options include:', items: ['Courier APIs', 'Manual shipping tracking', 'Automated shipping labels', 'Real-time tracking', 'Customer notifications'] },
    { q: 'What payment gateways do you support?', a: 'Multiple integrations: credit card processing, bank transfers, PayPal or Stripe, local Pakistani options, and more available (contact for details).' },
    { q: 'Do you offer inventory management?', a: 'Complete inventory system:', items: ['Real-time stock tracking', 'Low-stock alerts', 'Automatic reorder points', 'Multiple warehouse support', 'Inventory forecasting'] },
    { q: 'How many ads can you manage?', a: 'Unlimited campaigns. Includes:', items: ['Google Shopping ads', 'Google Search ads', 'Facebook ads', 'Instagram ads', 'Retargeting campaigns', 'All actively managed and optimized'] },
    { q: "What's the average ad spend recommendation?", a: 'Depends on your business. Typical ranges: Google Shopping PKR 10K-50K/month, Facebook/Instagram PKR 5K-30K/month, Search ads PKR 5K-20K/month. We’ll discuss your budget and ROI expectations.' },
    { q: 'Can I sell digital products?', a: 'Absolutely. We support:', items: ['Digital downloads', 'Online courses', 'Software/templates', 'eBooks and guides', 'Membership access', 'Recurring subscriptions'] },
    { q: 'Do you handle customer support?', a: 'We set it up. You handle it. Includes helpdesk setup, FAQ pages, support email templates, customer communication guides. Optional: we can train your team or provide support guidance.' },
    { q: 'What about email marketing?', a: 'Full setup included. Includes:', items: ['Email service integration', 'Welcome series setup', 'Abandoned cart recovery', 'Post-purchase sequences', 'Newsletter management', 'Segmentation strategies'] },
    { q: 'Can I do dropshipping?', a: 'Yes. Suitable for connecting to supplier APIs, automated order forwarding, inventory syncing, dropship supplier integration, affiliate product selling. Contact for specific setup needs.' },
    { q: 'Is there a setup deadline?', a: "No deadline. Get the infrastructure ready whenever you're prepared to launch." },
    { q: 'Can I upgrade or downgrade?', a: 'Yes, anytime. Downgrade to Growth or Boost anytime. Upgrade available if needed.' },
    { q: "What if I'm not happy with results?", a: "100% refund guarantee if unsatisfied within 24 hours and we haven't substantially started work. After that: we focus on optimization until you see results. Our average client does." },
    { q: 'How quickly will I make money?', a: 'Typically: first 30 days initial sales and testing, month 2-3 optimization and growth, month 3-6 significant revenue increase, month 6+ scaling and expansion. Depends on your traffic sources, conversion rate, product quality, marketing execution.' },
    { q: 'Can I integrate with my POS system?', a: 'Yes, possibly. Integration options include inventory sync, sales sync, multi-channel selling, unified reporting. Contact for your specific system.' },
    { q: 'Do you provide training?', a: 'Yes. Training included on dashboard and analytics, product management, order management, email marketing, basic optimization. Video tutorials and documentation included.' },
    { q: 'What if I need custom features?', a: 'Custom development available. Discuss special requirements: custom functionality, specialized integrations, unique workflows, advanced features. Additional costs apply for custom work.' },
  ],
  compareTitle: 'Compare All Plans',
  allPlans: [
    { name: 'Launch', desc: '5-10 pages for starters' }, { name: 'Boost', desc: '30 pages with SEO' }, { name: 'Growth', desc: '50 pages with marketing expert' },
    { name: 'Platinum', desc: 'Unlimited e-commerce' }, { name: 'Custom', desc: 'Enterprise solutions' },
  ],
  closing: { eyebrow: 'Ready to Launch Your E-Commerce Store?', title: 'Build Your Online Business Today', priceLines: ['Setup: PKR 140,000 (one-time)', 'Monthly: PKR 55,000', 'Everything included'], cta: 'Start Your E-Commerce Store',
    steps: ['Click "Get Started"', 'Schedule strategy consultation', 'We build your complete store', 'You start selling'], scheduleCta: 'Schedule E-Commerce Consultation' },
  bottomLine: { title: 'Unlimited Products. Unlimited Potential.', body: ['Stop compromising on your e-commerce store. Get a professional, fully-managed platform designed to sell.', 'Unlimited pages. Unlimited products. Unlimited support.'], cta: 'Launch Your E-Commerce Empire' },
}

// Custom's shape is fundamentally different from the 4 standard plans — no
// fixed setup/monthly price, a discovery-call process instead of a fixed
// build timeline, price ranges instead of an annual-savings table.
export type PriceTier = { title: string; body: string[] }
export type ExampleSolution = { title: string; business: string; needs: string[]; solution: string; timeline: string; price: string }
export type DiscoveryPhase = { title: string; body: string; items: string[]; deliverable: string }
export type TeamRole = { title: string; items: string[] }
export type SupportOption = { title: string; items: string[]; cost: string }

export const CUSTOM = {
  quickOverview: {
    title: 'When You Need More Than Standard Plans',
    intro: "The Custom Plan is designed for unique business needs that don't fit standard packages.",
    ticks: ['Fully customized solution', 'Your exact requirements', 'Custom features and functionality', 'Flexible pricing', 'Tailored support and timeline'],
    howItWorks: ['Discovery Call — Understand your needs', 'Custom Proposal — Tailored solution + pricing', 'Development — Build exactly what you need', 'Launch — Go live with confidence', 'Support — Ongoing partnership'],
  },
  whoNeeds: { title: 'You Might Need Custom If...', groups: [
    { title: 'Unique Business Model', items: ['Not a standard service, product, or e-commerce', 'Multiple business models combined', 'Complex operations', 'Specialized requirements'] },
    { title: 'Advanced Features', items: ['Custom functionality beyond standard plans', 'API integrations not in standard packages', 'Specialized tools or systems', 'Unique user workflows'] },
    { title: 'Enterprise Scale', items: ['Large organization', 'Multiple departments', 'Complex user permissions', 'Significant traffic or transactions'] },
    { title: 'Specific Integrations', items: ['CRM integration (Salesforce, HubSpot, etc.)', 'ERP systems', 'Custom APIs', 'Specialized third-party systems'] },
    { title: 'Unique Design Needs', items: ['Complex design requirements', 'Custom brand guidelines', 'Specialized animations or interactions', 'Unique user experience'] },
    { title: 'Multiple Websites', items: ['Multiple domains/brands', 'Centralized management', 'Unified analytics', 'Shared resources'] },
  ] as BestForGroup[] },
  examples: { title: 'What We’ve Built for Other Clients', items: [
    { title: 'Multi-Marketplace E-Commerce', business: 'Reseller platform connecting suppliers and buyers', needs: ['Dual-user system (suppliers and buyers)', 'Commission tracking and reporting', 'Dispute resolution system', 'Custom rating and review system', 'Advanced analytics per supplier'], solution: 'Custom e-commerce platform with seller dashboard', timeline: '90 days', price: 'Custom (similar to Platinum, customized)' },
    { title: 'SaaS Platform', business: 'Subscription-based software service', needs: ['User accounts and subscriptions', 'Payment and billing automation', 'API access for customers', 'Custom dashboards per customer', 'Advanced security requirements'], solution: 'Custom SaaS platform with full billing system', timeline: '120 days', price: 'Custom (premium due to complexity)' },
    { title: 'Real Estate Platform', business: 'Property listing aggregation and CRM', needs: ['Multiple property listing sources', 'Agent management system', 'Lead capture and CRM', 'Advanced property filtering', 'Map integration', 'Virtual tour support'], solution: 'Custom real estate platform with integrated CRM', timeline: '100 days', price: 'Custom' },
    { title: 'Education Platform', business: 'Online school with courses and community', needs: ['Course management system', 'Student progress tracking', 'Live class scheduling', 'Certificate generation', 'Community forum', 'Parent communication portal'], solution: 'Custom education platform with learning management', timeline: '110 days', price: 'Custom' },
    { title: 'B2B Wholesale Platform', business: 'Wholesale distributor with complex pricing', needs: ['Tiered customer pricing', 'Volume discounts', 'Custom pricing per customer', 'Purchase order system', 'Credit management', 'Automated invoicing'], solution: 'Custom wholesale platform with advanced pricing', timeline: '95 days', price: 'Custom' },
  ] as ExampleSolution[] },
  discovery: { title: 'How We Build Your Custom Solution', phases: [
    { title: 'Phase 1: Initial Consultation (1-2 weeks)', body: 'Understand Your Business', items: ['In-depth business review', 'Goals and objectives', 'Current systems and workflows', 'User types and needs', 'Technical requirements', 'Budget and timeline', 'Competitive landscape'], deliverable: 'Detailed discovery document' },
    { title: 'Phase 2: Solution Design (2-3 weeks)', body: 'Create Your Custom Solution', items: ['Custom solution architecture', 'Feature and functionality design', 'User experience flows', 'Technical specifications', 'Integration planning', 'Timeline estimation', 'Detailed proposal and pricing'], deliverable: 'Detailed proposal + custom pricing' },
    { title: 'Phase 3: Approval & Planning (1 week)', body: 'Finalize and Plan', items: ['Review proposal together', 'Answer questions and adjustments', 'Agree on timeline and price', 'Sign contract', 'Begin development planning', 'Assign team'], deliverable: 'Signed contract + project plan' },
    { title: 'Phase 4: Development (6-16 weeks typical)', body: 'Build Your Solution', items: ['Initial setup and infrastructure', 'Core functionality development', 'Feature implementation', 'Integration setup', 'Testing and optimization', 'Client feedback and revisions', 'Continued quality assurance'], deliverable: 'Weekly progress updates + regular check-ins' },
    { title: 'Phase 5: Launch (1-2 weeks)', body: 'Go Live', items: ['Final testing and QA', 'Content and data migration', 'User training and documentation', 'Marketing and promotion', 'Post-launch optimization', 'Initial support and monitoring'], deliverable: 'Live, fully-functional solution' },
    { title: 'Phase 6: Ongoing Support', body: 'Continued Partnership', items: ['Regular performance monitoring', 'Updates and maintenance', 'User support and training', 'Optimization and improvements', 'Feature additions', 'Continuous improvement'], deliverable: '' },
  ] as DiscoveryPhase[] },
  pricing: {
    intro: "Custom plans don't have fixed pricing because your needs are unique.",
    factors: ['Solution complexity', 'Development time required', 'Team expertise needed', 'Integration requirements', 'Design customization', 'Post-launch support level'],
    tiers: [
      { title: 'Simple Custom Solution', body: ['Light customizations to standard platform', 'PKR 500K - 2M total', '4-8 weeks development', 'Similar to Platinum with customization'] },
      { title: 'Moderate Custom Solution', body: ['Moderate custom features', 'PKR 2M - 5M total', '8-12 weeks development', 'Unique functionality beyond standard'] },
      { title: 'Complex Custom Solution', body: ['Significant custom development', 'PKR 5M - 15M+ total', '12-16 weeks development', 'Complex integrations and features'] },
      { title: 'Enterprise Custom Solution', body: ['Highly specialized platform', 'PKR 15M+ total (unlimited)', '16+ weeks development', 'Multiple integrations, APIs, custom features'] },
    ] as PriceTier[],
    ongoingSupport: 'Ongoing Support: PKR 50K-500K+/month depending on support level',
    increaseCost: ['Complex custom functionality', 'Multiple integrations', 'Large data migration', 'Advanced security requirements', 'Real-time features', 'Mobile apps (separate from web)', 'API development', 'Specialized expertise needed'],
    decreaseCost: ['Can reuse existing components', 'Simple integrations', 'Limited customization', 'Standard design', 'Phased rollout possible', 'Smaller scope'],
    included: ['All design and development', 'All integrations specified', 'Initial training and setup', 'Launch support', 'Documentation'],
    notIncluded: ['Ongoing content creation', 'Ongoing design changes', 'Additional integrations (after launch)', 'Multiple support tiers', 'Mobile apps (priced separately)'],
  },
  features: { title: 'Examples of Custom Functionality', groups: [
    { title: 'CRM Integrations', items: ['Salesforce integration', 'HubSpot integration', 'Custom CRM systems', 'Lead management', 'Customer communication'] },
    { title: 'Payment Systems', items: ['Custom payment processing', 'Subscription billing', 'Commission tracking', 'Multi-vendor payouts', 'Advanced invoicing'] },
    { title: 'Inventory & Supply Chain', items: ['Inventory management', 'Supply chain tracking', 'Warehouse management', 'Fulfillment automation', 'Supplier portals'] },
    { title: 'User Management', items: ['Complex permission systems', 'Multi-level user roles', 'Team collaboration tools', 'Custom workflows', 'Activity tracking'] },
    { title: 'Reporting & Analytics', items: ['Custom dashboards', 'Advanced reporting', 'Data visualization', 'Real-time analytics', 'Export functionality'] },
    { title: 'API Development', items: ['Custom APIs for partners', 'Third-party integrations', 'Mobile app backend', 'System connections', 'Data synchronization'] },
    { title: 'Marketplace Features', items: ['Seller management', 'Commission tracking', 'Dispute resolution', 'Rating systems', 'Vendor dashboards'] },
    { title: 'Communication Tools', items: ['Live chat support', 'Notification systems', 'Email automation', 'SMS integration', 'Customer communication'] },
  ] as BestForGroup[] },
  whyCustom: { title: 'When Standard Plans Aren’t Enough', items: [
    { h: '1. Exact Fit to Your Business', p: 'Standard plans are one-size-fits-all. Custom solutions fit your unique needs perfectly.', result: 'A platform that works exactly how you work.' },
    { h: '2. Competitive Advantage', p: "Custom features your competitors don't have.", result: 'Unique functionality that sets you apart.' },
    { h: '3. Growth Without Rebuilding', p: 'Built to scale with your business.', result: 'No need to rebuild as you grow.' },
    { h: '4. Integration With Existing Systems', p: 'Connect your website to your current systems.', result: 'Unified operations across all platforms.' },
    { h: '5. Advanced Features', p: 'Features not available in standard plans.', result: 'Capabilities that drive results.' },
    { h: '6. Expert Guidance', p: 'Working with specialists in your industry.', result: 'Best practices and industry expertise built in.' },
  ] },
  team: { title: 'Who Builds Your Solution', roles: [
    { title: 'Solution Architect', items: ['Designs your complete system', 'Plans integrations', 'Ensures scalability', 'Oversees technical decisions'] },
    { title: 'Lead Developers', items: ['Build custom functionality', 'Manage codebase', 'Ensure quality', 'Optimize performance'] },
    { title: 'Designers', items: ['Create custom interfaces', 'Ensure exceptional UX', 'Brand alignment', 'Accessibility compliance'] },
    { title: 'QA & Testing Team', items: ['Test all functionality', 'Identify issues', 'Ensure reliability', 'Performance testing'] },
    { title: 'Account Manager', items: ['Your point of contact', 'Project coordination', 'Timeline management', 'Communication hub'] },
  ] as TeamRole[], note: 'Full team dedicated to your success' },
  timeline: { title: 'Custom Project Timeline', rows: [
    ['Simple Custom Projects', '4-8 weeks'], ['Moderate Custom Projects', '8-12 weeks'], ['Complex Custom Projects', '12-16 weeks'], ['Enterprise Custom Projects', '16+ weeks'],
  ] as GlanceRow[], factors: ['Solution complexity', 'Integration requirements', 'Your approval speed', 'Content/data preparation', 'Third-party coordination', 'Testing requirements'] },
  support: { title: 'Ongoing Support Options', options: [
    { title: 'Option 1: Included Maintenance', items: ['Monthly updates and monitoring', 'Bug fixes and patches', 'Performance optimization', 'Security maintenance', 'Basic support (email/WhatsApp)'], cost: 'PKR 50K-150K/month depending on complexity' },
    { title: 'Option 2: Premium Support', items: ['Included maintenance (above)', 'Priority support (24-hour response)', 'Phone support', 'Quarterly strategy calls', 'Proactive optimization'], cost: 'PKR 150K-300K/month' },
    { title: 'Option 3: VIP Support', items: ['Included maintenance (above)', '24/7 emergency support', 'Dedicated support engineer', 'Monthly strategy calls', 'Continuous optimization', 'Feature development budget'], cost: 'PKR 300K-500K+/month' },
  ] as SupportOption[], addOns: ['Feature development (PKR 50K-500K per feature)', 'Integrations (PKR 25K-250K per integration)', 'Design changes (PKR 10K-50K per change)', 'Content creation services', 'Marketing and SEO services'] },
  faqs: [
    { q: 'How much will my custom solution cost?', a: 'Depends on complexity. Typical range: PKR 500K - 15M+. During discovery call, we\'ll provide:', items: ['Initial estimate based on requirements', 'Detailed proposal with pricing', 'Timeline and deliverables', 'No surprises—transparent pricing'] },
    { q: 'How long will it take?', a: 'Typical timeline: 2-4 months from contract to launch. Depends on solution complexity, your feedback speed, integration requirements, testing and QA needs.' },
    { q: 'Can you integrate with [specific system]?', a: 'Probably, yes. We integrate with popular payment gateways, CRM systems (Salesforce, HubSpot, etc.), email marketing platforms, analytics systems, accounting software, and many others. Contact with specific system details.' },
    { q: 'Do you build mobile apps?', a: 'Website apps, yes — apps are responsive and work great on mobile. Native mobile apps: priced separately, typically PKR 1M-5M+. Contact to discuss specific app needs.' },
    { q: 'Can you migrate from my current system?', a: 'Yes. We handle:', items: ['Data migration planning', 'Data export and import', 'System integration during transition', 'Training for new system', 'Support during cutover', 'Cost: included in custom development or separate estimate'] },
    { q: 'What if I need to change requirements mid-project?', a: 'Expected and normal. Changes included: small tweaks and adjustments, feature clarifications, design refinements. Major changes may affect timeline/pricing — we discuss impact upfront.' },
    { q: 'Can I see a portfolio of custom work?', a: 'Yes. We have many custom examples: case studies available, client references (upon request), video walkthroughs, live project demonstrations. Ask during discovery call.' },
    { q: 'Do you provide training on the new system?', a: 'Yes, included. Training includes video tutorials, documentation, live training sessions, Q&A and support, ongoing help as you learn.' },
    { q: 'What if the launch gets delayed?', a: 'Rare, but possible. Causes include technical complexity discovered, integration delays, your feedback timing, third-party systems. We communicate delays immediately and adjust timeline.' },
    { q: 'Is there a contract?', a: 'Yes. Standard contract includes:', items: ['Scope and deliverables', 'Timeline and milestones', 'Pricing and payment terms', 'Support and maintenance', 'Intellectual property rights', 'Confidentiality', 'Fair contract protecting both parties.'] },
    { q: "What if I'm not happy with the result?", a: 'We work until you are. Our process includes regular feedback cycles, revisions built in, quality assurance testing, client approval at each phase, launch only when you\'re happy. If genuinely unsatisfied: discuss resolution — we want your success.' },
    { q: 'Can I scale it later?', a: 'Yes, built for growth. Architecture allows adding more users, adding features, increasing capacity, scaling traffic, adding integrations.' },
    { q: 'Do you offer payment plans?', a: 'Yes, possible. Payment options:', items: ['Full upfront (discount available)', '50% upfront, 50% on launch', 'Milestone-based payments', 'Monthly payment plan (with interest)'] },
    { q: 'What happens after launch?', a: 'You own it. After launch: you own the code and platform, you can migrate elsewhere if desired, ongoing support available (monthly fee), updates and maintenance available, can keep us as partner or manage yourself.' },
  ] as PlanFaq[],
  gettingStarted: { title: 'How to Get Your Custom Solution', steps: [
    { title: 'Step 1: Schedule Discovery Call', items: ['WhatsApp: +92 303 372 0953', 'Email: office@matjarx.com', 'What to prepare: business overview, current system details, key requirements, budget range (if known), timeline needs'] },
    { title: 'Step 2: Initial Consultation (1 hour)', items: ['Discuss your business and goals', 'Understand requirements', 'Explore technical needs', 'Discuss timeline and budget', 'Next steps'] },
    { title: 'Step 3: Detailed Discovery (1-2 weeks)', items: ['In-depth analysis', 'Requirements documentation', 'Solution design', 'Custom proposal creation'] },
    { title: 'Step 4: Proposal Review', items: ['Review detailed proposal', 'Discuss pricing and timeline', 'Answer all questions', 'Negotiate if needed', 'Finalize contract'] },
    { title: 'Step 5: Project Begins', items: ['Kick-off meeting', 'Team introduction', 'Initial development planning', 'Regular progress updates', 'Continued partnership'] },
  ] },
  showcase: { title: 'Featured Custom Projects', items: ['E-commerce marketplace (PKR 3.5M)', 'SaaS platform (PKR 4.2M)', 'Real estate platform (PKR 2.8M)', 'Education platform (PKR 3.1M)', 'B2B wholesale platform (PKR 2.5M)'], note: 'Video walkthroughs and client testimonials available.' },
  allPlans: [
    { name: 'Launch', desc: '5-10 pages for starters' }, { name: 'Boost', desc: '30 pages with SEO' }, { name: 'Growth', desc: '50 pages with marketing expert' },
    { name: 'Platinum', desc: 'Unlimited e-commerce' }, { name: 'Custom', desc: 'Exactly what you need' },
  ],
  closing: { title: "Let's Create Your Custom Solution", body: "Not sure if you need custom? Let's talk. During a brief discovery call, we'll understand your needs and recommend the right solution (could be standard plan or custom). No pressure. Just honest advice.", cta: 'Schedule Your Discovery Call',
    steps: ['Click "Schedule Discovery"', 'Tell us about your vision', 'Get a custom proposal', 'Build something great together'], scheduleCta: "Let's Talk Custom" },
  bottomLine: { title: "If Standard Plans Don't Fit, Let's Build Custom", body: ['Your business is unique. Your solution should be too.'], cta: 'Discuss Your Custom Solution Today' },
  guarantee: "Not satisfied with the custom solution after launch? We work until you are. Our goal is your success. Period.",
}
