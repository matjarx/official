// Data for the Website Audit page — from
// files/matjarx_website_audit_page.md, used in full: this is an
// explicitly human-produced, 3-5 business day manual review service (not
// an instant automated report), described here verbatim across all 10
// audit areas, the process, timeline, benefits and FAQ.

export const HERO = {
  eyebrow: 'Website audit',
  headline: 'Complete Website Audit for Organic Visibility',
  subhead: "Discover exactly what's holding your website back from ranking on Google and getting customers online.",
}

export const PROBLEMS = [
  "Why isn't it showing up on Google?",
  "Why am I not getting customers from my website?",
  'Is my website even any good?',
  'What do I need to fix?',
  'How much will fixes cost?',
]

export const AUDIT_INTRO = 'A website audit analyzes your entire site and identifies exactly what’s working, what’s broken, and what’s preventing you from ranking on Google and converting visitors into customers.'

export const WHAT_IS_AUDIT = {
  intro: "A website audit is a comprehensive examination of your website's performance, SEO health, user experience, security, and conversion potential. Think of it like a health checkup for your website.",
  checks: ['Is it technically sound?', 'Is it optimized for Google?', 'Is it secure?', 'Is it fast?', 'Are visitors converting?', "What's broken?", 'What needs improvement?'],
  result: 'A detailed report showing exactly what’s working and what needs to be fixed.',
}

export const WHY_NEEDED = {
  stat: '70% of small business websites have serious issues preventing them from ranking on Google or converting visitors.',
  problems: [
    'Poor SEO optimization (Google doesn’t understand your content)',
    'Slow loading speed (visitors leave frustrated)',
    "Mobile responsiveness issues (doesn't work on phones)",
    'Broken links and 404 errors (bad user experience)',
    "Poor security (visitors don't trust you)",
    "Weak calls-to-action (visitors don't know what to do)",
    'Outdated content (signals your site is abandoned)',
    'Technical issues (preventing crawling and indexing)',
    'Poor site structure (confuses both users and Google)',
    "No schema markup (Google can't interpret your data)",
  ],
  closing: 'Most business owners have no idea these problems exist. A website audit brings everything to light.',
}

export type AuditArea = {
  number: number
  title: string
  analyze: { heading?: string; items: string[] }[]
  learn: string[]
}

export const AUDIT_AREAS: AuditArea[] = [
  {
    number: 1, title: 'SEO Analysis & Keyword Performance',
    analyze: [
      { heading: 'Current Rankings', items: ['Which keywords your website currently ranks for', 'Your ranking position for each keyword (top 10, page 2, page 3, or not ranking)', 'Search volume for keywords you rank for', 'Traffic potential from current rankings'] },
      { heading: 'Keyword Opportunities', items: ["Keywords you're missing (competitors rank for but you don't)", 'Low-competition keywords worth targeting', 'High-intent keywords (people searching to buy)', 'Local keywords if you serve a geographic area'] },
      { heading: 'On-Page SEO', items: ['Title tags and meta descriptions (optimized for clicks?)', 'Header structure (H1, H2, H3 usage)', 'Keyword placement and density', 'Content depth and quality', 'Internal linking strategy', 'URL structure and optimization'] },
      { heading: 'Technical SEO', items: ['XML sitemaps and robots.txt', 'Schema markup implementation', 'Structured data for rich snippets', 'Canonical tags', 'Redirect chains and issues', 'Hreflang tags (for multi-language sites)'] },
    ],
    learn: ['Exactly which keywords you rank for and your position', "Keywords worth targeting that you're currently missing", 'On-page optimization opportunities', 'Technical issues preventing better rankings', 'Specific recommendations to improve organic visibility'],
  },
  {
    number: 2, title: 'Site Performance & Speed Analysis',
    analyze: [
      { heading: 'Page Speed Metrics', items: ['Desktop loading speed', 'Mobile loading speed', "Core Web Vitals (Google's ranking factors)", 'Time to First Paint', 'Time to Interactive', 'Cumulative Layout Shift'] },
      { heading: 'Performance Issues Identified', items: ['Large uncompressed images', 'Unminified CSS and JavaScript', 'Render-blocking resources', 'Inefficient code', 'Missing caching mechanisms', 'Server response time issues'] },
      { heading: 'Mobile Performance', items: ['Mobile responsiveness', 'Touch-friendly interface', 'Mobile-specific issues', 'Viewport configuration'] },
    ],
    learn: ['Exact page load times and where bottlenecks are', 'Which pages are slowest (and why)', 'How you compare to competitor sites', 'Specific technical fixes needed', 'Expected impact of improvements'],
  },
  {
    number: 3, title: 'Mobile Responsiveness & User Experience',
    analyze: [
      { heading: 'Mobile Compatibility', items: ['Responsive design on all screen sizes', 'Touch element sizing (buttons, links)', 'Viewport settings', 'Mobile navigation usability', 'Forms and input fields on mobile'] },
      { heading: 'Desktop User Experience', items: ['Navigation clarity and structure', 'Call-to-action visibility and placement', 'Form usability and conversion optimization', 'Readability and typography', 'Visual hierarchy and layout'] },
      { heading: 'Cross-Device Testing', items: ['Desktop (various screen sizes)', 'Tablet (portrait and landscape)', 'Mobile phones (various sizes)', 'Different browsers (Chrome, Safari, Firefox, Edge)'] },
    ],
    learn: ['How your site performs on phones, tablets, and desktops', 'Usability issues preventing conversions', 'Mobile-specific problems', 'Browser compatibility issues', 'User experience improvements needed'],
  },
  {
    number: 4, title: 'Security & SSL Analysis',
    analyze: [
      { heading: 'SSL Certificate', items: ['Valid SSL certificate', 'Certificate expiration date', 'Certificate type (DV, OV, EV)', 'Mixed content issues (HTTP on HTTPS site)', 'HSTS implementation'] },
      { heading: 'Security Issues', items: ['Known vulnerabilities', 'Outdated plugins or themes', 'Weak authentication', 'Data exposure risks', 'Malware or suspicious code', 'Security headers'] },
      { heading: 'Compliance', items: ['GDPR compliance for EU visitors', 'Cookie consent implementation', 'Privacy policy presence', 'Terms and conditions'] },
    ],
    learn: ['Whether your site is secure', 'Potential security vulnerabilities', 'Trust signals present (or missing)', 'Compliance issues', 'Visitor confidence factors'],
  },
  {
    number: 5, title: 'Technical Health & Crawlability',
    analyze: [
      { heading: 'Indexation Issues', items: ['Pages indexed vs. total pages', 'Pages blocked from indexing', 'Crawl errors and 404s', 'Orphaned pages (not linked from anywhere)', 'Duplicate content issues'] },
      { heading: 'XML Sitemaps', items: ['Sitemap validity and completeness', 'URL inclusion and prioritization', 'Images and video sitemaps'] },
      { heading: 'Robots.txt', items: ['Correct syntax and configuration', 'Proper blocking of resources', 'Disallow rules impacting crawling'] },
      { heading: 'Redirects', items: ['Redirect chains (multiple redirects in sequence)', 'Broken redirects', 'Proper 301 vs. 302 redirects'] },
      { heading: 'Crawlability', items: ['Can Google crawl your site?', 'JavaScript rendering issues', 'Navigation structure for bots', 'URL parameters issues'] },
    ],
    learn: ['Technical issues preventing Google from crawling/indexing', 'Specific 404 errors and broken links', 'Duplicate content problems', 'Crawl efficiency improvements', 'Indexation potential'],
  },
  {
    number: 6, title: 'Content Quality & Optimization',
    analyze: [
      { heading: 'Content Depth', items: ['Word count per page', 'Comprehensive coverage of topics', 'Content freshness and updates', 'Thin content pages', 'Duplicate or near-duplicate content'] },
      { heading: 'Content Structure', items: ['Proper heading hierarchy', 'Readability metrics', 'Keyword integration', 'Natural language and flow', 'Call-to-action clarity'] },
      { heading: 'Content Gaps', items: ['Missing landing pages', 'Underperforming content', 'Pages needing expansion', 'Content opportunities'] },
      { heading: 'Blog Strategy', items: ['Blog posting frequency', 'Blog post quality and length', 'Topic relevance and authority', 'Backlink potential'] },
    ],
    learn: ['Which pages need content improvements', 'Content expansion opportunities', 'Keyword integration opportunities', 'Blog strategy recommendations', "Content that's attracting and converting visitors"],
  },
  {
    number: 7, title: 'Backlink Profile & Authority',
    analyze: [
      { heading: 'Backlink Analysis', items: ['Quality and quantity of backlinks', 'Referring domains and authority', 'Anchor text distribution', 'Toxic or spammy backlinks', 'Backlink growth trend'] },
      { heading: 'Competitor Backlinks', items: ['Where competitors get backlinks', "Backlink gaps (where you're missing links)", 'High-authority linking opportunities', 'Competitor advantage analysis'] },
      { heading: 'Link Quality', items: ['Domain authority of linking sites', 'Relevance of referring sites', 'Link diversity', 'Anchor text distribution'] },
    ],
    learn: ["Your site's authority compared to competitors", 'Which backlinks help most', 'Toxic links that might hurt rankings', 'Where to build new backlinks', 'Authority gaps vs. competitors'],
  },
  {
    number: 8, title: 'Conversion Rate Optimization (CRO)',
    analyze: [
      { heading: 'Call-to-Action Analysis', items: ['CTA visibility and clarity', 'CTA button design and placement', 'CTA copy effectiveness', 'Multiple CTAs throughout site'] },
      { heading: 'Form Analysis', items: ['Form fields (too many? too few?)', 'Form placement and design', 'Conversion friction', 'Mobile form usability', 'Field validation'] },
      { heading: 'Conversion Paths', items: ['Clear journey from landing to conversion', 'Navigation clarity', 'Obstacle identification', 'Trust signals and social proof'] },
      { heading: 'Page-Specific Conversion', items: ['Homepage conversion elements', 'Service/product page optimization', 'Contact page effectiveness', 'Pricing page clarity'] },
    ],
    learn: ['Conversion rate optimization opportunities', 'Friction points preventing conversions', 'CTA improvements', 'Form optimization recommendations', 'Trust signal additions'],
  },
  {
    number: 9, title: 'Local SEO & Google Business Profile',
    analyze: [
      { heading: 'Google Business Profile', items: ['Completeness and accuracy', 'Photo count and quality', 'Business information correctness', 'Review rating and count', 'Post activity and freshness'] },
      { heading: 'Local Optimization', items: ['Local keyword optimization', 'Service area coverage', 'Local citations and directories', 'Google Maps ranking potential', 'NAP consistency (Name, Address, Phone)'] },
      { heading: 'Local Content', items: ['Local keywords on site', 'Location-based pages', 'Local testimonials and case studies'] },
    ],
    learn: ['Google Business Profile optimization opportunities', 'Local ranking potential', 'Citation and directory needs', 'Local keyword opportunities', 'Map visibility improvements'],
  },
  {
    number: 10, title: 'Competitive Analysis',
    analyze: [
      { heading: 'Competitor Benchmarking', items: ['Top 3-5 competitor analysis', 'Their ranking keywords', 'Their backlink strategies', 'Their content strategy', 'Their technical setup'] },
      { heading: 'Competitive Gaps', items: ["Where you're behind", 'Opportunities to outrank competitors', 'Content gaps', 'Technical advantages', 'Feature comparisons'] },
      { heading: 'Market Positioning', items: ['Your unique value proposition vs. competitors', 'Differentiation opportunities', 'Market saturation analysis', 'Low-competition opportunities'] },
    ],
    learn: ['Competitive landscape overview', 'Ranking and visibility gaps', 'Opportunities to outrank competitors', 'Market positioning strategy', 'Differentiation recommendations'],
  },
]

export const PROCESS_STEPS = [
  { step: 1, title: 'Request Your Audit', time: '5 minutes', items: ['Your website URL', 'Your name and contact information', 'Current business goals (optional but helpful)'] },
  { step: 2, title: 'We Run Comprehensive Analysis', time: '3-5 business days', items: ['Runs automated technical analysis', 'Manually reviews content and structure', 'Analyzes SEO and keyword performance', 'Tests user experience', 'Benchmarks against competitors', 'Identifies opportunities and issues'] },
  { step: 3, title: 'Detailed Audit Report Delivery', time: 'On completion', items: ['Executive summary (high-level overview)', 'Key findings and critical issues', 'Detailed analysis across all 10 areas', 'Specific recommendations with priority levels', 'Visual charts and metrics', 'Actionable next steps'], note: 'Format: PDF report (typically 20-40 pages depending on site complexity)' },
  { step: 4, title: 'Strategy Call (Optional)', time: '30 minutes', items: ['Review audit findings together', 'Discuss priorities and quick wins', 'Answer questions', 'Discuss next steps and solutions', 'Explore MatjarX services if interested'] },
]

export const TIMELINE_ROWS = [
  ['Request', '5 minutes', 'You submit website URL and details'],
  ['Analysis', '3-5 business days', 'Our team comprehensively audits your site'],
  ['Report Preparation', '1-2 business days', 'We compile findings into detailed report'],
  ['Delivery', 'Upon completion', 'You receive full audit report'],
  ['Strategy Call', '30 minutes (optional)', 'Discuss findings and recommendations'],
]
export const TIMELINE_TOTAL = 'Total Timeline: 5-7 business days from request to report delivery'
export const RUSH_NOTE = 'Rush audits available for priority projects (contact us for details).'

export const OUTCOMES = [
  { title: 'Executive Summary', items: ['Overall website health score', 'Critical issues requiring immediate attention', 'Top 3-5 opportunities for improvement', 'Quick wins (easy improvements with high impact)', 'Estimated impact of recommendations'] },
  { title: 'Detailed Findings', items: ['10 comprehensive sections (as outlined above)', 'Specific issues identified with severity levels', 'Data and metrics supporting findings', 'Visual charts and comparisons', 'Screenshots and examples'] },
  { title: 'Actionable Recommendations', items: ['Prioritized action list (quick wins first)', 'Implementation difficulty and effort estimates', 'Expected impact of each recommendation', 'Timeline for implementation', 'Resource requirements'] },
  { title: 'Competitor Analysis', items: ['How you stack up against top competitors', 'Their ranking keywords', 'Their content strategy', 'Your competitive advantages', 'Opportunities to outrank them'] },
  { title: 'Opportunity Summary', items: ['Keywords you could rank for', 'Content you should create', 'Technical improvements', 'Authority-building opportunities', 'Conversion optimization opportunities'] },
]

export const BENEFITS = [
  { title: 'Understand Your Current Position', body: "Before an audit, you're guessing — “My website is fine, right?” “Why aren't we getting customers?” After an audit, you know. You have concrete data showing exactly what's working and what's not." },
  { title: 'Get Clear Priorities', body: "Without an audit you don't know where to start, might fix the wrong things, and progress stalls. With an audit, quick wins are identified, priorities are clear, and resources are focused where they matter most — progress accelerates." },
  { title: 'Save Money on Website Work', body: "Blind website improvements cost money without guaranteed results. A website audit tells you exactly what needs fixing, which fixes have the most impact, which can wait, and what DIY vs. professional help you need. You invest in the right improvements, not random changes." },
  { title: 'Improve Rankings Without Guessing', body: "Most small businesses don't understand SEO. A website audit shows why you're not ranking, which keywords you could rank for, and the specific optimizations needed. You stop guessing. You start optimizing." },
  { title: 'Increase Conversions', body: 'A website audit identifies friction points in your conversion path, CTA improvements needed, form optimization opportunities, and trust signal gaps. More website visitors actually become customers.' },
  { title: 'Competitive Intelligence', body: 'Understand your competitive landscape — where competitors are winning, where they’re weak, and opportunities you can capitalize on. You know exactly how to outrank and outperform competitors.' },
  { title: 'Peace of Mind', body: 'Wondering if your website is any good? A professional audit gives you expert assessment, concrete feedback, validation of what’s working, and clear direction for improvement — confidence in your online presence.' },
]

export const COMPARISON_TABLE = {
  headers: ['Aspect', 'Free Tools', 'MatjarX Audit'],
  rows: [
    ['Technical analysis', 'Basic', 'Comprehensive'],
    ['SEO analysis', 'Limited', 'In-depth keyword research'],
    ['Content review', 'None', 'Detailed review'],
    ['Competitive analysis', 'None', 'Included'],
    ['Conversion optimization', 'None', 'Included'],
    ['Security analysis', 'Limited', 'Complete'],
    ['Manual review', 'No', 'Yes'],
    ['Actionable recommendations', 'Generic', 'Specific and prioritized'],
    ['Expert interpretation', 'No', 'Yes'],
    ['Strategy call', 'No', 'Available'],
  ],
}

export const AUDIT_FAQS: [string, string][] = [
  ['How much does a website audit cost?', "Pricing varies based on website size and complexity — contact us on WhatsApp or by email for a quote. Many of our audit clients become clients for implementation services."],
  ['How long is the audit report?', 'Typical length is 20-40 pages, depending on website size, current issues found, complexity of analysis needed, and detail level included. Reports are comprehensive but accessible — we explain technical issues clearly.'],
  ["Can you audit a competitor's website?", 'Yes, we can analyze publicly available information about competitor websites. However, we cannot access non-public analytics or private data.'],
  ['What if my website has serious issues?', "Don't worry — that's exactly what audits are for. Our report will clearly identify all issues, explain severity and impact, provide step-by-step recommendations, and offer implementation support if interested."],
  ['How is this different from free online audit tools?', 'Free tools give you basic technical analysis with no manual review or actionable recommendations. MatjarX audits are comprehensive, manually reviewed, and include competitive analysis, conversion optimization and a strategy call — see the comparison below.'],
  ['Will you recommend your services?', "Honestly, yes, if implementation services make sense for your situation. But the audit stands alone — you can read the report, implement recommendations yourself, hire another agency, or work with MatjarX. We're not pushing services; we're providing honest assessment."],
  ["What's included in the strategy call?", 'A 30-minute conversation covering report highlights and findings, questions and clarifications, priority recommendations, implementation options, next steps, and pricing if interested in MatjarX services. Not a sales pitch — a genuine strategy discussion.'],
  ['Can you re-audit my site later?', 'Yes. Many clients get re-audits every 6-12 months to track improvement progress, identify new opportunities, benchmark against updated competitors, and adjust strategy based on results.'],
  ['Do you offer audit credits or discounts?', 'Sometimes, yes — ask us about current promotions when you request your audit.'],
  ["What if I don't like the audit?", "We stand behind our work. If you're unsatisfied, we'll review your concerns, discuss the findings, make clarifications as needed, and address any questions. We've done 1000+ audits — clients typically find them incredibly valuable."],
]

export const CHANNELS = {
  whatsapp: '+92 303 372 0953',
  email: 'office@matjarx.com',
}
