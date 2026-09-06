// Full-fidelity content for the 4 Services tabs, from files/matjarx_{done_
// for_you,local_seo,concierge,growth_marketing}_content.md — verbatim.
// services-data.ts (SERVICE_DATA) stays as-is and still drives the compact
// hero/3-block/6-grid/testimonial view; this file adds everything each
// source file has that SERVICE_DATA never carried — the challenge/problem
// framing, the full step-by-step process, the complete feature catalog,
// case studies, additional testimonials, the full FAQ set, pricing detail
// and closing copy. ServiceDetailSections.tsx renders SERVICE_DATA's
// existing fields first, then everything here.

import type { Section, ProcessPhase, PlanFaq, CompareTable } from './plan-detail-data'

export type Testimonial = { quote: string; name: string }
export type CaseStudy = { title: string; lines: string[] }
export type WhyItem = { h: string; body?: string; items?: string[] }

export type ServiceDetail = {
  challenge: { title: string; intro?: string; points: string[] }
  solution: { title: string; intro?: string; steps: { title: string; body: string }[] }
  whoWeServe?: { title: string; intro: string; groups: { title: string; items: string }[] }
  timeline?: { title: string; rows: [string, string][] }
  included: { title: string; sections: Section[] }
  differentiator?: { title: string; groups: { title: string; items: string[]; positive?: boolean }[] }
  process?: { title: string; phases: ProcessPhase[] }
  numbers?: { title: string; rows: [string, string][]; footnote?: string }
  planTable?: { title: string; table: CompareTable; note?: string }
  marketingJourney?: { title: string; months: { title: string; focus: string; weDo: string[]; yourAction: string[]; outcome: string }[] }
  caseStudies: { title: string; items: CaseStudy[] }
  testimonials?: { items: Testimonial[] }
  slaviStory?: { title: string; quote: string; name: string; points: string[] }
  pricing?: { title: string; setup?: { amount: string; items: string[] }; monthly?: { amount: string; items: string[] }; note?: string }
  whyChoose: { title: string; items: WhyItem[] }
  access?: { title: string; channels: string[] }
  faqs: { title: string; items: PlanFaq[] }
  closing: { title: string; body?: string; ctas: string[] }
  bottomLine: { title: string; body: string[] }
}

export const DFY: ServiceDetail = {
  challenge: { title: 'Done-For-You Website Built & Launched in 7 Days', intro: 'Stop trying to build a website yourself. Stop waiting months for an expensive agency. Get a professional, ready-to-use website built for you in just one week — with zero stress, zero hidden fees, and zero guesswork.', points: ['We handle everything. You handle your business.'] },
  solution: { title: 'How Done-For-You Really Works', intro: '3 Steps to Your Professional Website', steps: [
    { title: 'Step 1: Tell Us About Your Business (15-30 minutes)', body: 'Complete our online questionnaire. No tech skills needed — what your business does, who your customers are, what you want your website to accomplish, your branding preferences, and key information about your products/services. This questionnaire is the foundation for everything we build.' },
    { title: 'Step 2: We Build Your Website From A to Z (7 days)', body: 'Design tailored to your industry, expert copywriting, professional arrangement of your photos and videos, e-commerce/booking/contact/gallery features, SEO keyword optimization, SSL/backups/technical maintenance, and mobile optimization. You don’t touch a thing — we build it all.' },
    { title: 'Step 3: We Launch Your Website Together (30 minutes)', body: 'A website expert meets you on a personal video call to show your live website for the first time, walk through how to manage it, make any changes you’d like, answer all your questions, train you on the built-in editor, and celebrate going live.' },
  ] },
  whoWeServe: { title: 'We Build Websites for 1000+ Business Categories', intro: 'From local service businesses to e-commerce stores, from professional services to specialized trades — if you run a business, we’ve built a website for your industry.', groups: [
    { title: 'Service Businesses', items: 'Accounting, Wedding Planning, Catering, Legal Services, Real Estate, Construction, Clinics, Healthcare, Hair Care, Gyms & Fitness, Salons & Spas, Auto Repair, Event Planning, Travel & Tours' },
    { title: 'Food & Beverage', items: 'Restaurants, Cafes, Chefs, Catering, Flower Shops, Bars & Drinks' },
    { title: 'Retail & E-Commerce', items: 'Boutiques, Fashion, Furniture, Beauty Products, Sports Stores, Toy Shops, Pharmacies' },
    { title: 'Professional Services', items: 'Digital Marketing Agencies, Business Consulting, HR Consulting, Graphic Design, Tax Advisory, Insurance, Financial Advising, Career Coaching' },
    { title: 'Specialized', items: 'Pet Sitting, Motherhood Coaching, Online Counseling, Academic Tutoring, Mortgage Services, Healthcare Training, Tech Solutions, SaaS, Cybersecurity — and 900+ more categories' },
  ] },
  timeline: { title: 'Your Website Will Be Ready Next Week', rows: [
    ['Day 1', 'You complete our questionnaire (15-30 minutes)'], ['Days 2-6', 'We build your complete website from scratch'], ['Day 7', 'Launch call — see your live website and go live'], ['Launch +', 'Manage your site anytime with unlimited support'],
  ] },
  included: { title: 'Everything You Need to Succeed Online', sections: [
    { title: '🎨 Professional Website Design & Copy', blocks: [
      { sub: [{ h: 'Visually Appealing Design & Engaging Layouts', items: ['Custom design tailored to your industry', 'Mobile-responsive (works perfectly on all devices)', 'Professional color schemes and typography', 'Industry-specific layouts and features'] }] },
      { sub: [{ h: 'Expert-Written Content & SEO Copy', items: ['Product and service descriptions written by professionals', 'Blog content optimized for Google ranking', 'Meta tags and headers for SEO', 'Compelling calls-to-action on every page', 'Content structured for conversions'] }] },
      { sub: [{ h: 'Setup to Convert Visitors Into Customers', items: ['Clear navigation so visitors find what they need', 'Strategic use of images and videos', 'Trust signals and testimonials', 'Fast loading speeds (70% faster than average websites)'] }] },
    ] },
    { title: '🌐 Domain, Email & Security', blocks: [
      { sub: [{ h: 'Custom Domain Name', items: ['Choose your own domain (e.g., yourbusiness.com)', 'OR connect an existing domain you already own', 'Professional appearance from day one', 'Easy to remember and share'] }] },
      { sub: [{ h: 'Professional Email Inbox', items: ['Email address matching your domain (e.g., you@yourbusiness.com)', 'Professional appearance in every email', 'Email management through your Business Hub'] }] },
      { sub: [{ h: 'SSL Certificate & Security', items: ['SSL certificate (the "lock" showing your site is secure)', 'Automatically renewed — no action needed', 'Fast, secure hosting on premium servers', 'Daily backups of all your data', 'Zero security breaches in 8+ years serving 70,000+ customers'] }] },
    ] },
    { title: '💰 E-Commerce Ready', blocks: [
      { sub: [{ h: 'Unlimited Sales with 0% Commission', items: ['Shopping cart built into your website', 'Unlimited products (no restrictions on inventory)', 'Multiple payment methods: credit/debit cards, PayPal, JazzCash, EasyPaisa, SadaPay, PayFast', '0% MatjarX commission on every sale (you keep 100%)', 'Secure order processing', 'Automatic order notifications'] }] },
      { sub: [{ h: 'Advanced E-Commerce Features', items: ['Product variations (sizes, colors, options)', 'Inventory management system', 'Buy now, pay later functionality', 'Discounts and promotional codes', 'Automatic Google Shopping integration', 'Facebook and Instagram shopping integration'] }] },
    ] },
    { title: '📅 Booking System', blocks: [
      { sub: [{ h: 'Take Appointments 24/7/365', items: ['Online booking system ready from day one', 'Customers book anytime (even when you’re sleeping)', '2-step confirmation process (reduces no-shows)', 'Email reminders to customers', 'Calendar sync (your calendar stays updated automatically)'] }] },
      { sub: [{ h: 'Business Hub Integration', items: ['View all bookings in one place', 'Send SMS or email reminders', 'Connect third-party booking systems if you prefer', 'Appointment management on desktop or mobile'] }] },
    ] },
    { title: '📱 Easy-to-Use Editor', blocks: [
      { sub: [{ h: 'User-Friendly Website Editor', items: ['No coding or technical knowledge required', 'Edit text, images, and content anytime', 'Add new pages, products, or blog posts', 'Update opening hours, pricing, or promotions', 'One-click design changes for different looks'] }] },
      { sub: [{ h: 'Unlimited Edits (First 30 Days)', items: ['Request unlimited changes from our expert team', 'Professional edits if you prefer not to DIY', 'Ensure you love your site before you go live', 'Our goal: you’re 100% happy with your website'] }] },
    ] },
    { title: '📊 Analytics & Business Insights', blocks: [
      { sub: [{ h: 'Track What Matters', items: ['Google Analytics integration', 'See who visits your website', 'Track which pages convert visitors', 'Understand customer behavior', 'Monthly insights about your online performance'] }] },
      { sub: [{ h: 'Business Hub Dashboard', items: ['View all website metrics in one place', 'Sales, bookings, and leads tracking', 'Customer information management', 'Email integration and management', 'Access from desktop or mobile'] }] },
    ] },
    { title: '🎁 Bonus Inclusions', blocks: [
      { sub: [{ h: 'Professional Logo Builder', items: ['Create or update your logo', 'Ensure brand consistency', 'Used across your website and emails'] }] },
      { sub: [{ h: 'Testimonials & Social Proof', items: ['Showcase customer reviews', 'Build trust and credibility', 'Collect and display 5-star reviews'] }] },
      { sub: [{ h: 'Media Gallery', items: ['Unlimited image uploads', 'Video hosting and embedding', 'Professional image optimization', 'No storage limits'] }] },
      { sub: [{ h: 'Partners Marketplace', items: ['Exclusive discounts and tools', 'Access to vetted service providers', 'Marketing and business resources'] }] },
    ] },
    { title: '🎯 Your Personal Launch Call', blocks: [
      { sub: [{ h: 'One-on-One Video Call', items: ['Meet directly with a website expert', 'See your website live for the first time', 'Request any changes you’d like', 'Get personalized training', 'Q&A about features and growth'] }] },
      { sub: [{ h: 'What You’ll Learn', items: ['How to edit your website', 'How to manage bookings and orders', 'How to use analytics', 'How to promote your website', 'How to grow your business online'] }] },
    ] },
  ] },
  differentiator: { title: 'Say Goodbye to DIY Builders and Web Agencies', groups: [
    { title: 'DIY Website Builders (Wix, Squarespace, etc.)', items: ['You spend 50-100+ hours learning and building', 'Results look amateur or templated', 'No support when you’re stuck', 'Unclear what you’re doing wrong', 'Months to get it right'] },
    { title: 'Expensive Web Agencies', items: ['Cost Rs. 50,000–200,000+ upfront', 'Wait weeks or months for launch', 'You become dependent on them for any changes', 'Can’t easily switch providers', 'Ongoing maintenance costs'] },
    { title: 'MatjarX Done-For-You', items: ['Professional design in just 7 days', 'Expert copywriting and optimization included', 'Personal launch call and training', 'Easy self-editing afterward (if you want)', 'Affordable — agency quality at fraction of the cost'], positive: true },
  ] },
  caseStudies: { title: 'How Done-For-You Websites Drive Results', items: [
    { title: 'Health & Beauty Natural Oils — 5000% ROI in First 6 Months', lines: ['Challenge: an online essential oils business needed visibility', 'Solution: MatjarX built a custom e-commerce website with SEO optimization', 'Ranks #1 for primary keyword "Best Essential Oils" on Google Search', 'Ranks #1 on Google Maps for local searches', '5000% return on investment in first 6 months', 'Massive increase in customer inquiries', '"The website and SEO has played a pivotal role in elevating our reach and visibility to unprecedented levels." — Joseph Demangeat, Owner'] },
    { title: 'AtoZ Wholesale', lines: ['Ranks #1 after Yelp on Google for "Best Cutlery Provider"', 'Top ranking for "Restaurant Supply Chain Dubai"', 'Significant increase in wholesale inquiries'] },
    { title: 'ABC Handyman', lines: ['Ranks #1 on Google Maps for "Handyman Aiken"', '#1 ranking after Angi and Better Business Bureau on Google Search', 'Consistent local lead generation'] },
    { title: 'Maui Teriyaki & Sushi', lines: ['Ranks #1 on Google Maps for "Teriyaki Gainesville"', '#2 on Google Search (ahead of most competitors)', 'Increase in online orders and reservations'] },
  ] },
  pricing: { title: 'What You Pay vs. What You Get', setup: { amount: 'Rs. 22,500 one-time (saves Rs. 137,500 vs. typical agency pricing)', items: ['Complete website design and build', 'Professional copywriting', 'SEO optimization', 'E-commerce and booking setup', '1-week turnaround', 'Launch call and training', '30 days of unlimited edits'] },
    monthly: { amount: 'Rs. 4,500/month', items: ['Domain name (or use your own)', 'Professional email inbox', 'Hosting on fast, secure servers', 'SSL certificate (auto-renewed)', 'Unlimited sales, bookings, leads', '0% commission on all transactions', 'Platform updates and upgrades', 'Live chat support', 'Analytics and tracking'] },
    note: 'Annually: Rs. 22,500 + (Rs. 4,500 × 12) = Rs. 76,500/year for professional web presence. A single client, booking, or sale easily covers this investment.' },
  whyChoose: { title: 'Peace of Mind Going Online', items: [
    { h: 'Do Business From Day One', body: 'Your website is ready to generate revenue immediately — no setup time, no waiting.', items: ['Accept payments with 0% MatjarX commission', 'Take appointments 24/7', 'Capture leads and customer information', 'Never miss a customer because you’re offline'] },
    { h: 'Look Completely Professional', body: 'Showcase your business with pride.', items: ['Industry-specific design', 'Professional photos and layout', 'Compelling product/service descriptions', 'Customer testimonials and reviews', 'Consistent branding across all pages'] },
    { h: 'Get Found Online', body: 'Reach new audiences through search engines and social media.', items: ['Google My Business optimization', 'SEO-friendly structure and content', 'Mobile-responsive design', 'Social media integration', 'Built-in blog for ongoing traffic'] },
    { h: 'Have Ongoing Support', body: 'You’re never alone.', items: ['Personal launch call', 'Email, chat, and phone support', 'Monthly business insights', 'Unlimited edits (Boost+ plans)', 'Growth marketing services (Growth+ plans)'] },
  ] },
  faqs: { title: 'Everything You Need to Know About Done-For-You Websites', items: [
    { q: 'What’s included in the done-for-you website package?', a: 'A complete, multi-page, search-engine-optimized, mobile-friendly website. All websites accept appointments and are e-commerce-enabled so you can take bookings and sell products immediately with 0 commissions. Plus unlimited hosting, a custom domain name, professional email inbox, easy-to-use editor, and expert support.' },
    { q: 'How does the website design process actually work?', a: 'Sign up and select your package → fill out the 15-30 minute questionnaire → our design team builds your website (7 days) → join your 30-minute launch call, request changes, and go live. Professional website, one week, start to finish.' },
    { q: 'How is a done-for-you website different from a template or DIY builder?', a: 'DIY builders mean you spend weeks learning and building, and the design looks templated. We spend 7 days building (you spend none), custom design specific to your industry, built with SEO fundamentals from day one, expert copy and layout for conversions, personal support throughout.' },
    { q: 'Are hosting and domain included? Can I use my own domain?', a: 'Yes, hosting is included in your Rs. 4,500 monthly fee. We can register a new domain for you, or connect a domain you already own at no additional cost — we handle the technical setup.' },
    { q: 'Can I still edit the website myself after it’s launched?', a: 'Absolutely — the Website Editor lets you update text and images, add pages or products, modify hours or pricing, post blog content and manage bookings, no coding required. Boost+ plans include unlimited edits done by our team if you prefer.' },
    { q: 'What examples of done-for-you websites do you have?', a: 'Examples across 1000+ business categories — restaurants, real estate, salons, clinics, law firms, e-commerce, gyms, construction, and more. If you don’t see your industry, chat with us and we’ll show you tailored examples.' },
    { q: 'Are MatjarX websites secure?', a: '100% secure. In 8+ years serving 70,000+ customers: zero security breaches, zero cyber attacks, data stored on secured AWS servers, SSL certificate on every website, automatic updates and patches, daily backups.' },
    { q: 'What platform are the done-for-you websites built on?', a: 'MatjarX’s own platform, built specifically for small businesses. You retain ownership — if you ever leave MatjarX, you own all the content and we can export it for you.' },
    { q: 'Can I transfer an existing website to MatjarX?', a: 'Not directly, but we build you a new, improved website using content from your old site — importing text, images and product info, redesigning for better conversions and SEO. 42% of our customers come to us with existing websites from other platforms.' },
    { q: 'Is this a money-back guarantee really risk-free?', a: 'Yes — a 30-day money-back guarantee. If you’re not happy for any reason within 30 days, contact us for a full refund, no questions asked.' },
    { q: 'Can I speak with someone before deciding?', a: 'Yes — Live Chat Mon-Fri 9am-8pm, WhatsApp, Phone +92 303 372 0953, Email office@matjarx.com. No obligation, just an honest conversation.' },
    { q: 'How much does this really cost?', a: 'One-time setup Rs. 22,500 (complete design, copywriting, setup, launch), monthly Rs. 4,500 (hosting, domain, email, support, platform, 0% fees). Annual cost: Rs. 76,500/year — one sale often covers the entire year.' },
  ] },
  closing: { title: 'Get Started Today', body: 'Ready to see your business online in 7 days?', ctas: ['Get Started', 'Launch Your Done-For-You Website Today'] },
  bottomLine: { title: 'Professional website done for you. 7-day turnaround.', body: ['Completely zero-risk. Unmatched customer service.', 'Your website is the foundation of your online business. Let us build it for you — right, fast, and affordable.', 'More than 70,000 businesses trust MatjarX. Your business deserves to join them.'] },
}

export const SEO: ServiceDetail = {
  challenge: { title: 'Ranking Higher on Google Feels Impossible', intro: 'You built a beautiful website. Now what? Your website exists, but customers can’t find you. They’re searching "website for [your service] near me" and seeing your competitors instead.', points: ['Customers search "salons near me" and find competitors, not you', 'Your Google Business Profile is missing or incomplete', 'You have few (or no) customer reviews', 'Your business doesn’t appear on Google Maps', 'You don’t rank for local keywords', 'Competitors who invested in SEO steal your customers'] },
  solution: { title: 'Rank Higher on Google Maps and Get Found by Local Customers', intro: 'MatjarX Local, National & Global SEO services handle everything Google requires to rank your business at the top of search results and maps — part of your MatjarX team, working alongside your website.', steps: [
    { title: 'Step 1: Optimize Your Google Business Profile', body: 'We create, optimize, and verify your Google Business Profile — THE most important factor for local ranking.' },
    { title: 'Step 2: Launch Your Google Maps Listing', body: 'Your business appears on Google Maps with complete information, photos, and customer reviews.' },
    { title: 'Step 3: Build Your Reputation', body: 'We help you collect 5-star reviews and display them on your website and Google Business Profile.' },
    { title: 'Step 4: Monthly SEO Optimization', body: 'Each month, we optimize your profile with fresh content, posts, and keyword updates to keep you ranking higher.' },
  ] },
  included: { title: 'What’s Included in Local SEO Services', sections: [
    { title: '1️⃣ Google Business Profile Optimization (Created in 7 Days)', blocks: [
      { sub: [{ h: 'Complete Business Information', items: ['Business name, address, phone (NAP consistency)', 'Hours of operation', 'Service areas and coverage zones', 'Business category and subcategories', 'Website and social media links'] }] },
      { sub: [{ h: 'Professional Photos', items: ['Business exterior and interior', 'Team photos', 'Product/service photos', 'Before/after galleries (for service businesses)', 'Professional layout and presentation'] }] },
      { sub: [{ h: 'Business Description', items: ['Compelling description of your services', 'Unique value propositions', 'Keyword optimization for local search', 'Call-to-action directing customers to contact you'] }] },
      { sub: [{ h: 'Verification & Optimization', items: ['Verified and activated (critical for ranking)', 'Optimized for Google’s ranking algorithm', 'Set up for customer messaging', 'Connected to your website'] }] },
      { p: 'Why this matters: businesses with complete, optimized profiles rank 5-10x higher than those with incomplete profiles.' },
    ] },
    { title: '2️⃣ Google Maps Launch & Visibility', blocks: [
      { sub: [{ h: 'What We Set Up', items: ['Complete Google Maps listing', 'Prominent placement in local search results', 'Accurate location with service areas', 'Customer messaging directly from Maps', 'Photo galleries and business information', 'Professional presentation that encourages clicks'] }] },
      { p: '70% of local searches result in a visit to a business within 24 hours. "Near me" searches have grown 900% in the last 5 years. 80% of customers check Google Maps or Google Business Profile before visiting.' },
    ] },
    { title: '3️⃣ Customer Review Management & Collection', blocks: [
      { sub: [{ h: 'Automated Review Collection', items: ['One-click review invitations to customers', 'Automated after appointments, purchases, or services', 'SMS and email reminders to leave reviews', 'Customized review request templates'] }] },
      { sub: [{ h: 'Response & Management', items: ['We respond professionally to all reviews (positive and negative)', 'Turn negative reviews into positive outcomes', 'Thank happy customers and encourage more reviews', 'Address concerns and show customer care'] }] },
      { sub: [{ h: 'Display Reviews Across Your Online Presence', items: ['Showcase reviews automatically on your website', 'Display stars and testimonials prominently', 'Build social proof and customer trust', 'Increase conversion rates (reviews increase sales by 30%+)'] }] },
    ] },
    { title: '4️⃣ Content Sync & Brand Consistency', blocks: [
      { sub: [{ h: 'We Synchronize', items: ['Business information (hours, phone, address)', 'Service descriptions and pricing', 'Photos and galleries', 'Updated content and promotions', 'Links and calls-to-action'] }] },
    ] },
    { title: '5️⃣ Monthly SEO Optimization & Content Updates', blocks: [
      { sub: [{ h: 'Google Business Profile Posts', items: ['Promote new services', 'Share customer testimonials', 'Announce special offers', 'Drive traffic to your website'] }] },
      { sub: [{ h: 'SEO Content Optimization', items: ['Update your profile with new keywords', 'Refresh descriptions and offerings', 'Ensure pricing and information is current', 'Optimize for seasonal keywords'] }] },
      { sub: [{ h: 'Performance Insights', items: ['Track how customers find you', 'Monitor search impressions and clicks', 'Measure customer actions (calls, directions, website visits)', 'Identify optimization opportunities'] }] },
      { sub: [{ h: 'Bonus: SEO Audit Report', items: ['How you’re ranking locally', 'Which keywords are working', 'Where you can improve', 'What competitors are doing', 'Specific action items for the coming month'] }] },
    ] },
    { title: '6️⃣ Ranking Higher on Google Search', blocks: [
      { sub: [{ h: 'Keyword Optimization', items: ['Research keywords customers are searching', 'Optimize your website content for those keywords', 'Target local keywords ("best pizza in Karachi")', 'Target national keywords ("best pizza in Pakistan")', 'Track ranking progress monthly'] }] },
      { sub: [{ h: 'On-Page Optimization', items: ['Title tags and meta descriptions (written for clicks)', 'Header structure (H1, H2, H3 optimization)', 'Content quality and depth', 'Internal linking strategy', 'Page speed optimization'] }] },
      { sub: [{ h: 'Technical SEO', items: ['Site structure and navigation', 'Mobile responsiveness (critical for ranking)', 'XML sitemaps and robots.txt', 'Schema markup (helps Google understand your content)', 'Security (SSL certificate)'] }] },
      { sub: [{ h: 'Off-Page SEO', items: ['Citation building (listings in directories)', 'Backlink strategy', 'Social signals', 'Brand mentions'] }] },
      { sub: [{ h: 'Local SEO Specific', items: ['Local keyword targeting', 'Google My Business optimization', 'Local citations and directories', 'Review management and response', 'Local content creation (blogs targeting local keywords)'] }] },
    ] },
  ] },
  process: { title: 'How Local SEO Works: Step-by-Step', phases: [
    { title: 'Month 1, Week 1-2: Discovery & Planning', items: ['Analyze your current online presence', 'Research local keywords and competitor landscape', 'Develop SEO strategy specific to your business and location'] },
    { title: 'Month 1, Week 3-4: Implementation', items: ['Create and verify Google Business Profile', 'Launch Google Maps listing', 'Set up review collection system', 'Optimize website for local keywords'] },
    { title: 'Month 2+: Growth & Refinement (Ongoing Monthly)', items: ['Monitor ranking progress', 'Create Google Business Profile posts', 'Collect and respond to reviews', 'Update content based on performance', 'Adjust strategy based on keyword data', 'Provide detailed audit report'] },
  ] },
  numbers: { title: 'The Numbers: Why Local SEO ROI is Massive', rows: [
    ['Monthly local searches for your service', '500 searches'], ['Current ranking (before SEO)', 'Page 2-3 (1-2% click rate)'], ['Current customers from search', '5-10 per month'], ['Current revenue from search', 'Rs. 25,000-50,000/month'],
    ['After Local SEO ranking (Position #1)', '15-20% click rate'], ['New customers from search', '75-100 per month'], ['New revenue from search', 'Rs. 375,000-500,000/month'],
    ['Monthly Increase', '+Rs. 325,000-450,000/month'], ['Annual Impact', '+Rs. 3,900,000-5,400,000/year'],
  ], footnote: 'Your investment: Rs. 15,600-27,000/month (Boost or Growth plan). Your return: Rs. 325,000+/month in new revenue from search customers. ROI: 1000%+ in month 2, and it compounds from there. These are conservative estimates — many businesses see 2-5x these results.' },
  planTable: { title: 'Local SEO Services Included by Plan', table: { headers: ['Feature', 'Boost', 'Growth', 'Platinum'], rows: [
    ['Google Business Profile Setup', '✅ Included', '✅ Included', '✅ Included'], ['Google Maps Optimization', '✅ Included', '✅ Included', '✅ Included'], ['Review Management', '✅ Basic', '✅ Advanced', '✅ Full Service'],
    ['Monthly Profile Posts', '2', '3-4', '4+'], ['SEO Audit Report', '✅ Monthly', '✅ Monthly', '✅ Monthly'], ['Keyword Optimization', '✅ Basic', '✅ Advanced', '✅ Advanced'],
    ['Dedicated SEO Expert', '❌', '✅ Growth Expert', '✅ SEO Team'], ['Monthly Strategy Session', '❌', '✅ 1-on-1', '✅ 1-on-1'],
  ] }, note: 'All plans include all Local SEO fundamentals. Growth and Platinum add dedicated expert support.' },
  caseStudies: { title: 'Real Results From Businesses Like Yours', items: [
    { title: 'Local Service Business: Handyman Services', lines: ['Before: ranked page 3 for "handyman near me," getting 2-3 calls per week', 'After (6 months): ranks #1 on Google Maps, #1 on Google Search, getting 15-20 calls per week', 'Result: 5x increase in business, booked out weeks in advance'] },
    { title: 'Restaurant: Local Pizza Shop', lines: ['Before: 10-15 walk-in customers per day, unknown online', 'After (3 months): ranks #1 for "pizza near me," gets 30+ online orders daily', 'Result: online orders now exceed walk-in traffic, revenue doubled in 4 months'] },
    { title: 'Professional Services: Legal Firm', lines: ['Before: relied on referrals, minimal online visibility', 'After (6 months): ranks #1 locally for multiple practice areas, getting 20+ inquiry calls per month', 'Result: tripled new client intake, now expanding team to handle demand'] },
  ] },
  whyChoose: { title: 'Be the Highest-Ranked, Most Visible Business in Your Area', items: [
    { h: 'Local SEO done right transforms your online visibility from invisible to dominant.', body: 'Customers searching for your services see you first. You get more calls, bookings, and sales. Local, National & Global SEO is part of every MatjarX plan.' },
  ] },
  faqs: { title: 'Everything You Need to Know', items: [
    { q: 'How long does it take to rank on Google Maps and Google Search?', a: 'Google Maps: usually 1-4 weeks to appear once profile is verified. Google Search: basic improvements 4-8 weeks, first page ranking 2-3 months, top 3 ranking 3-6 months. Timeline depends on competition and keyword difficulty.' },
    { q: 'Will my business definitely rank #1?', a: 'Probably, yes — most local businesses don’t do SEO at all. If competitors aren’t optimizing, ranking #1 is achievable in 2-3 months. If there’s strong local competition, we aim for top 3-5. We’ll be honest about difficulty during our initial audit.' },
    { q: 'Do you guarantee results?', a: 'We can’t guarantee specific rankings (no ethical SEO company can). We guarantee we’ll implement comprehensive local SEO best practices and track progress monthly. If you don’t see significant improvement in 3-6 months, we’ll adjust strategy.' },
    { q: 'What’s the difference between Local SEO and regular SEO?', a: 'Local SEO optimizes to rank in a specific geographic area (Google Business Profile, Maps, local keywords). Regular SEO ranks nationally or globally for broader keywords. We do both.' },
    { q: 'Can you help if I already have reviews?', a: 'Absolutely — we migrate your existing reviews to your new Google Business Profile, continue collecting more, respond to all reviews professionally, and showcase them on your website.' },
    { q: 'What if my business doesn’t have a physical location?', a: 'If you serve customers at their locations, we set up your service area on Google Business Profile for "near me" visibility without a storefront. If you’re fully online, we optimize your website for keywords and focus on national/global SEO instead.' },
    { q: 'How much does Local SEO cost?', a: 'Included in Boost (Rs. 15,600/month, basic local SEO), Growth (Rs. 27,000/month, advanced + dedicated expert), and Platinum (Rs. 55,000/month, full SEO team). No additional cost — it’s part of your plan.' },
    { q: 'Will this help me compete with chain businesses?', a: 'Yes — chain businesses often don’t invest heavily in local SEO. Local businesses with strong Google Business Profiles and reviews consistently outrank national chains in local search.' },
    { q: 'Can you handle multiple locations?', a: 'Yes — each location gets its own optimized profile, consistent branding across locations, coordinated review and content strategy. Pricing varies by number of locations — contact us for details.' },
  ] },
  closing: { title: 'Get Found by Customers Actively Searching for Your Services', body: '70% of local searches result in a purchase within 24 hours. Your competitors who invest in SEO are stealing your customers right now.', ctas: ['Start with Boost — Rs. 15,600/month', 'Start with Growth — Rs. 27,000/month + Dedicated Expert', 'Talk to Our SEO Team'] },
  bottomLine: { title: 'Be the Highest-Ranked, Most Visible Business in Your Area', body: ['Local SEO done right transforms your online visibility from invisible to dominant.', 'Local, National & Global SEO is part of every MatjarX plan.'] },
}

export const CONCIERGE: ServiceDetail = {
  challenge: { title: 'Your Website Needs Constant Updates, But You Don’t Have Time', intro: 'Your website is live and working. But then life happens.', points: ['You get new product photos and want them on the site', 'You need to update pricing, services, or offerings', 'You want a design refresh', 'Hours or services change', 'You want to add customer testimonials', 'You have videos to integrate', 'You need new features or tools added', 'You want to track customer behavior'] },
  solution: { title: 'Agency-Level Support at Do-It-Yourself Pricing', intro: 'Think of it this way: you own a restaurant. You don’t cook every meal yourself — you have a kitchen team. Your MatjarX Concierge Service is your website kitchen team. You direct them; they execute.', steps: [
    { title: 'You Request a Change', body: 'Email, chat, or phone call.' },
    { title: 'We Execute', body: 'Our team updates, designs, or builds what you need.' },
    { title: 'You Review', body: 'See the changes and request adjustments if needed.' },
    { title: 'It’s Live', body: 'Once approved, your updates go live immediately. Typical turnaround: 2-5 business days.' },
  ] },
  included: { title: 'Discover MatjarX Magic: The Rich Multimedia Service', sections: [
    { title: 'Photo & Video Galleries', blocks: [{ items: ['Photo Sliders — showcase products or portfolio with elegant image transitions', 'Advanced Photo Galleries — organize by category, lightbox effects, full-screen viewing', 'Before & After Sliders — transformation galleries for salons, gyms, construction', 'Logo Banners — display trusted brand partnerships and client logos', 'Brand & Partner Sliders — rotate through partner and sponsor logos', 'Image Banners, Accordions, Carousels — multiple layout options', 'Flip Cards — hover-activated cards revealing team bios or product info', 'Image Hotspots — click on areas of an image to reveal information'] }] },
    { title: 'Social Media Feeds', blocks: [{ items: ['TikTok Feed', 'Instagram Feed', 'Facebook Feed', 'YouTube Shorts', 'YouTube Feed', 'RSS Feed', 'Threads Feed', 'Vimeo Feed'] }] },
    { title: 'Content Elements', blocks: [{ items: ['Search Bar', 'Customer Surveys', 'Data Collection Forms', 'FAQ Sections', 'Advanced Menu Formats', 'Files & PDF Embed', 'Pricing Tables', 'Biography (team member profiles)'] }] },
    { title: 'Boost Sales', blocks: [{ items: ['Coupon Pop-Up', 'Countdown Timer', 'Scratch Card', 'Display Reviews', 'Live Streaming', 'Audio Player', 'Podcast Player'] }] },
  ] },
  differentiator: { title: 'What Counts as an Edit?', groups: [
    { title: 'Text & Copy Changes', items: ['Update service descriptions', 'Change pricing and offers', 'Rewrite headers and sales copy', 'Add new product details', 'Update opening hours or contact info', 'Refresh testimonials and reviews'] },
    { title: 'Visual Updates', items: ['Replace photos and images', 'Update your logo or branding', 'Refresh color schemes', 'Redesign layouts and sections', 'Add new pages', 'Reorganize navigation'] },
    { title: 'Content Additions', items: ['Add new products or services', 'Create new blog posts', 'Add photo galleries and sliders', 'Integrate videos', 'Add customer testimonials', 'Update company information'] },
    { title: 'Feature Integrations', items: ['Add new tools and integrations', 'Connect social media feeds', 'Integrate payment processors', 'Add booking or form systems', 'Set up email capture', 'Integrate analytics and tracking'] },
  ] },
  caseStudies: { title: 'We Will Integrate Tracking, Lead-Capture & Chat Tools', items: [
    { title: 'Track Visitor Interactions', lines: ['Google Analytics — comprehensive visitor tracking', 'Hotjar — heatmaps and recordings', 'Google AdSense — monetize your website', 'Facebook Pixel — retargeting for Facebook ads', 'HubSpot Tracking — CRM-integrated visitor and lead tracking', 'Google Tag Manager — centralized tag management'] },
    { title: 'Convert Visitors Into Customers', lines: ['Mailchimp Integration — capture emails and auto-add subscribers', 'Email Capture (Embedded) — simple signup forms', 'Email Capture (With Button) — pop-up capture on click, scroll or exit intent'] },
    { title: 'Live Chat With Customers', lines: ['Intercom — chat platform with visitor tracking and chatbots', 'Freshdesk — full helpdesk and chat solution', 'Facebook Messenger — chat via Messenger app', 'Click to Call Button — one-click phone dialing'] },
    { title: 'What Else Can We Add?', lines: ['PayPal Donate Button', 'Age Verification', 'Accessibility Tool', 'Member Login Areas', 'Appointment Booking Integrations (Calendly, Acuity)', 'Inventory Management', 'Affiliate Marketing Tools', 'Custom API Integrations', 'Have a specific request? Ask us — if it’s technically possible, we can build it.'] },
  ] },
  testimonials: { items: [
    { quote: 'MatjarX’s Concierge Service has been invaluable. I can focus on running my business while the team keeps my website fresh, updated, and optimized. No more delays, no more technical headaches.', name: 'Farah K., Business Owner, Karachi' },
    { quote: 'The turnaround time is incredible. I request a change Monday morning, and it’s live by Tuesday. That’s professional service.', name: 'Hassan R., E-Commerce Store Owner, Lahore' },
    { quote: 'Having a dedicated website team feels like hiring an in-house designer without the salary. Highly recommended.', name: 'Priya M., Salon Owner, Islamabad' },
  ] },
  whyChoose: { title: 'The Real Value: Website Management & Maintenance', items: [
    { h: 'Monthly Maintenance Tasks — Security & Performance', items: ['Security updates and patches', 'Performance monitoring and optimization', 'Backup verification and testing', 'SSL certificate management', 'Server health monitoring', 'Speed optimization'] },
    { h: 'Content Freshness', items: ['Update outdated information', 'Refresh testimonials and reviews', 'Update photos with new content', 'Ensure all links work', 'Update seasonal content', 'Archive old promotions'] },
    { h: 'SEO & Marketing', items: ['Update SEO content based on keyword performance', 'Refresh meta tags for search optimization', 'Monitor ranking progress', 'Update internal links', 'Add new blog content (Growth/Platinum)', 'Optimize for new keywords'] },
    { h: 'Feature Management', items: ['Monitor integrations for issues', 'Update third-party tool connections', 'Ensure all forms and systems work', 'Test checkout and payment systems', 'Monitor analytics and tracking'] },
    { h: '✨ Agency-Level Support, Without Agency Cost', items: ['Experienced designers and developers on your team', 'Rapid response times (24-48 hours typical)', 'No 50% project markup, no long-term contracts', 'No dependency on one person, no surprise charges'] },
    { h: '🎯 Focus on Your Business, Not Your Website', items: ['Stop worrying about updates, technical issues, security, backups', 'Start focusing on growing your business, serving customers, marketing and sales'] },
  ] },
  access: { title: 'Speak With Us in Real Time', channels: ['Live Chat — Instant messaging Mon-Fri 9am-8pm (24/7 for Platinum)', 'Email — detailed requests with screenshots and descriptions', 'Phone — +92 303 372 0953', 'WhatsApp — message us directly for quick updates', 'Business Hub — submit requests through your dashboard with history tracking', 'Growth Members get a point of contact who understands your business. Platinum Members get a dedicated Concierge Manager who proactively suggests improvements.'] },
  faqs: { title: 'Everything You Need to Know About Website Management', items: [
    { q: 'What counts as an edit? Are there limits?', a: 'Unlimited edits — literally anything on your website (text, images, design, features, integrations). No limits, no tiers, just unlimited website management.' },
    { q: 'How long does it take to make changes?', a: 'Typical turnaround: 2-5 business days depending on complexity. Simple text edits: 24 hours. Image updates: 1-2 days. New page creation: 3-5 days. Complex integrations: 5-10 days. Growth and Platinum members are prioritized.' },
    { q: 'Is concierge service worth it?', a: 'Yes, if you don’t have time to manage your website, aren’t comfortable with technical updates, need frequent updates, or want a professional managing your online presence. For most owners, the time saved alone pays for itself.' },
    { q: 'Can you help with my website design refresh?', a: 'Absolutely — logo and branding updates, color scheme changes, layout modernization, mobile optimization, conversion-focused redesigns, from small tweaks to full redesigns.' },
    { q: 'What if I’m not satisfied with an edit?', a: 'We’ll redo it. If an edit doesn’t meet your expectations, we revise until you’re happy — that’s what unlimited means.' },
    { q: 'Can concierge service help with SEO?', a: 'Yes — our SEO team (Growth/Platinum) includes content optimization, meta tag refreshes, header structure improvements, internal linking strategy and fresh content creation in monthly updates.' },
    { q: 'How is this different from hiring a freelancer or agency?', a: 'A dedicated relationship (not rotating freelancers), fully integrated with your MatjarX setup, 24-48 hour typical turnaround, and agency-quality support at a fraction of agency cost.' },
    { q: 'Do you offer design consultation or strategy?', a: 'Yes — Growth and Platinum members get monthly strategy discussions, recommendations, competitive analysis, conversion optimization suggestions and traffic/analytics review.' },
  ] },
  closing: { title: 'The Better Way to Get Online', body: 'Your website is too important to neglect. Let our team make sure it’s always performing, always fresh, always converting.', ctas: ['Start with Growth — Rs. 27,000/month (includes Concierge)', 'Upgrade to Platinum — Rs. 55,000/month (full Concierge + E-commerce)', 'Talk to Our Team'] },
  bottomLine: { title: 'Agency-Quality Website Management at Do-It-Yourself Pricing', body: ['Your website shouldn’t be a burden. It should be a powerful, professionally maintained asset that drives your business.', 'Concierge Service makes that possible, every step of the way.'] },
}

export const GROWTH: ServiceDetail = {
  challenge: { title: 'Marketing Is Complicated. You Need Expert Help.', intro: 'You’ve got your website. Now what? Building a website is just the beginning — the real work is getting customers to find you, engage with you, and buy from you.', points: ['Where do you even start with SEO?', 'Should you do Facebook ads? Instagram? Google Ads?', 'Email marketing sounds good, but how do you actually do it?', 'How do you get more 5-star reviews?', 'How do you know which marketing channels actually work for your business?', 'Who manages all of this? You don’t have time.', 'You don’t need to become a marketing expert. You need a marketing expert on your team.'] },
  solution: { title: 'Think of It Like Hiring a Part-Time Marketer', intro: 'Without the salary. Without the hiring hassle. Without the training overhead. A dedicated marketing professional who knows your business, understands your market, and works with you every month to grow revenue through proven strategies.', steps: [
    { title: 'Month 1: Discovery & Strategy', body: 'We analyze your business, market, competitors, and goals. We create a customized marketing roadmap.' },
    { title: 'Month 2+: Execution & Optimization', body: 'We implement strategies, track results, refine based on data, and help you adjust based on what’s working.' },
    { title: 'Ongoing: Monthly Meetings & Support', body: 'Every month, you meet 1-on-1 with your dedicated marketer over Zoom to discuss progress, challenges, and next steps.' },
  ] },
  included: { title: 'What’s Included: Your Marketing Toolkit', sections: [
    { title: 'SEO: Rank Higher on Google', blocks: [
      { p: '70% of clicks go to the top 3 results. If you’re not ranking, you’re invisible.' },
      { sub: [{ h: 'Ongoing Advice to Rank Higher on Google', items: ['Keyword research and strategy', 'Technical SEO optimization', 'Local SEO (if applicable)', 'Competitive analysis', 'Ranking progress monitoring'] }] },
      { sub: [{ h: '2,000 Words of Content Created By Us Every Month', items: ['Blog posts optimized for keywords', 'Service/product page content', 'FAQ and guide content', 'All SEO-optimized for ranking'] }] },
      { sub: [{ h: 'Monthly SEO Audit Report', items: ['Current ranking for target keywords', 'Traffic analysis and sources', 'Competitor benchmarking', 'Opportunities identified', 'Specific action items for next month'] }] },
      { p: 'Timeline: most businesses see ranking improvements in 1-3 months, with significant gains by month 6.' },
    ] },
    { title: 'Email Marketing: The Highest ROI Marketing Channel', blocks: [
      { p: 'Email has the highest ROI of any marketing channel (42:1 average return). But most businesses don’t use it.' },
      { sub: [{ h: 'Increase Purchases & Bookings By Sending Email', items: ['Welcome series for new customers', 'Promotional campaigns', 'Abandoned cart recovery', 'Re-engagement campaigns', 'Birthday and anniversary campaigns', 'VIP customer nurturing'] }] },
      { sub: [{ h: 'Start Collecting Leads', items: ['Embedded email capture forms', 'Pop-up strategies', 'Lead magnet creation', 'SMS opt-in (when applicable)'] }] },
      { sub: [{ h: 'Set Up Your Email Marketing Platform', items: ['Mailchimp, ConvertKit, ActiveCampaign, etc.', 'Integration with your website', 'List management and hygiene', 'Template creation and branding'] }] },
      { p: 'Example results: businesses implementing email marketing see 20-40% increase in repeat customer revenue within 3-6 months.' },
    ] },
    { title: 'Social Media Marketing: Build Your Presence', blocks: [
      { p: 'Social media is where your customers spend time, and where trust is built.' },
      { sub: [{ h: 'Learn How to Create Posts… And Then Do It', items: ['Content calendar planning', 'Post creation and design', 'Hashtag strategy', 'Posting schedule and consistency', 'Community management and engagement'] }] },
      { sub: [{ h: 'Target The Right Content For The Right Platform', items: ['Facebook strategy (community and ads)', 'Instagram strategy (visual storytelling and reels)', 'TikTok strategy (if applicable)', 'LinkedIn strategy (B2B and professional services)'] }] },
      { p: 'Example results: consistent social media marketing increases brand awareness, drives traffic, and generates 15-30% of new customer inquiries within 3-6 months.' },
    ] },
    { title: 'Online Advertising: Paid Ads Done Right', blocks: [
      { p: 'Organic reach is declining. Paid ads on Facebook, Instagram, and Google accelerate growth — if done correctly.' },
      { sub: [{ h: 'Understand The Costs, Benefits, and Risks', items: ['Budget requirements for your industry', 'Expected ROI and realistic expectations', 'Common mistakes and how to avoid them', 'Ad platform comparisons (Facebook, Google, LinkedIn, TikTok)'] }] },
      { sub: [{ h: 'Align Campaigns With Your Business Goals', items: ['Lead generation ads', 'Sales/e-commerce ads', 'Brand awareness campaigns', 'Retargeting campaigns', 'Lookalike audience targeting'] }] },
      { p: 'Example results: well-executed paid advertising campaigns typically see ROI of 200-400% within 30-90 days (highly variable by industry and competition).' },
    ] },
    { title: 'E-Commerce & Multi-Channel Sales', blocks: [
      { sub: [{ h: 'Facebook, Instagram & Google Shopping Setup', items: ['Sync your product catalog with Facebook, Instagram, and Google', 'Automatic product feed management', 'Multiple platform listings from one inventory', 'Real-time inventory updates'] }] },
      { p: 'Example results: businesses syncing products to multiple platforms typically see 25-50% increase in online sales channel diversification.' },
    ] },
    { title: 'Reputation Management: Be A 5-Star Business', blocks: [
      { p: '92% of consumers read reviews before choosing a business.' },
      { sub: [{ h: 'Get 10 Five-Star Reviews In A Month', items: ['Strategic review collection system', 'Customer touchpoints for review requests', 'Easy review invitation process', 'Follow-up for non-reviewers'] }] },
      { sub: [{ h: 'Control How You Appear Online', items: ['Google Business Profile optimization', 'Review management across platforms', 'Professional responses to all reviews', 'Negative review handling strategy'] }] },
      { p: 'Example results: reputation management typically increases review volume 50-100% within 2-3 months, improving ranking and conversion rates.' },
    ] },
  ] },
  marketingJourney: { title: 'Customized Marketing Program: Your 5-Month Journey', months: [
    { title: 'Month 1: Defining Your Brand – Unique Selling Point', focus: 'Foundation and positioning', weDo: ['Analyze your business, strengths, market position', 'Identify your unique selling points vs. competitors', 'Clarify your target customer', 'Define your brand message and voice', 'Create positioning statement'], yourAction: ['Gather information about your business and customers', 'Share feedback on positioning', 'Approve brand messaging'], outcome: 'Clear brand positioning and messaging for all marketing channels going forward.' },
    { title: 'Month 2: Getting 10 Five-Star Reviews Each Week', focus: 'Reputation and social proof', weDo: ['Set up review collection system', 'Create review invitation process', 'Identify customer touchpoints for requests', 'Respond professionally to all reviews', 'Track review growth and trends'], yourAction: ['Approve review invitation messaging', 'Help identify review request opportunities', 'Approve responses to reviews'], outcome: '40+ new 5-star reviews, higher Google ranking, improved conversion rates.' },
    { title: 'Month 3: Email Marketing', focus: 'Customer retention and revenue', weDo: ['Set up email marketing platform', 'Create email strategy and calendar', 'Design welcome series', 'Build segmentation and automation', 'Create first promotional campaign'], yourAction: ['Approve email templates and copy', 'Test campaigns before sending', 'Monitor performance and feedback', 'Identify automation opportunities'], outcome: 'Email list of 500-2000+ subscribers, ongoing customer communication, new revenue stream.' },
    { title: 'Month 4: Posting on Facebook & Instagram', focus: 'Brand presence and awareness', weDo: ['Create content calendar', 'Design and schedule posts', 'Manage community engagement', 'Analyze performance metrics', 'Optimize posting strategy'], yourAction: ['Provide content ideas and photos', 'Engage with audience responses', 'Approve content before posting', 'Share feedback on performance'], outcome: 'Consistent social presence, growing followers, increased brand awareness and website traffic.' },
    { title: 'Month 5: Advanced SEO', focus: 'Organic search ranking and traffic', weDo: ['Create SEO content strategy', 'Write and publish optimized blog posts', 'Optimize on-page elements', 'Build internal linking strategy', 'Monitor keyword rankings and traffic'], yourAction: ['Approve content topics and strategy', 'Gather information for content', 'Approve published content', 'Track ranking progress'], outcome: 'Ranking for target keywords, consistent organic traffic increase, 3-6 month compounding growth.' },
  ] },
  caseStudies: { title: 'Real Results: Growth Members Achieving Massive Success', items: [
    { title: 'China Friend Restaurant — Chinese restaurant in Barking (competitive market)', lines: ['Challenges: rank locally for "Chinese restaurant," needed more online orders and reservations, facing stiff competition', 'Focus: local SEO, Google Business Profile optimization, content marketing, review generation, Facebook/Instagram marketing', 'Ranks #1 on Google Search and Google Maps for "Chinese restaurant Barking"', '$150,000 in website sales generated · 4,400 customers served', '650+ Google reviews (4.4 rating) · 3,000+ website views monthly', 'Timeline: 6-9 months from growth program start to dominant rankings'] },
    { title: 'Spokane Taxi Service — Taxi booking service (highly competitive market)', lines: ['Challenges: competing with established taxi companies, wanted online bookings and reputation', 'Focus: local SEO (multiple locations), Google Business Profile, review generation, Google Local Ads, social media', 'Ranks #1 on Google Search & Google Maps for "Taxi Spokane"', '4,000+ phone calls generated · 1,220 messages (booking requests) · 350+ bookings via website', '87+ Google reviews (4.5 rating)', 'Timeline: 4-6 months to achieve top rankings'] },
    { title: 'Tony’s Pizza Bros — Pizza restaurant (local market)', lines: ['Challenges: page 3 or worse on Google, limited online visibility, competing with pizza chains', 'Focus: content marketing, local SEO, review generation, social media strategy, Google Business Profile', 'Page 1 ranking on Google Search for multiple pizza keywords', '2,500+ phone calls generated · 2,000+ leads captured', '350+ Google reviews (4.3 rating) · consistent order growth', 'Timeline: 3-6 months to achieve first page rankings'] },
  ] },
  testimonials: { items: [
    { quote: 'Building your dream on the internet takes a team — either yours OR an outside group of experts. The latter is what I found. Every step of the way I found help and guidance to adjust and help in my dream.', name: 'Troy A., Trustpilot 5-star review' },
    { quote: 'Dani B. from MatjarX has really made my work life so much easier. She is so patient with me in helping me understand how to use the website, SEO’s, social media and marketing strategies. MatjarX really is the whole package and so worth it.', name: 'Sherrie S., Trustpilot 5-star review' },
    { quote: 'I don’t have to know what it [SEO/marketing] is yet. They still make it better. I personally work with Mirko and he’s been nothing but phenomenal with my account and patient with me. All my ideas he works with. I trust his decisions 100%.', name: 'Travis G., Trustpilot 5-star review' },
    { quote: 'The monthly growth calls are a great knowledge and SME support resource. Having someone like Oliver supporting my business and helping me develop ideas is a great resource! Highly recommended.', name: 'Cynthia D., Trustpilot 5-star review' },
    { quote: 'I love the monthly "growth" calls (for helping me to grow my business), and I have support for any change or question through e-mail, chat, etc. This is what makes MatjarX unique, usable, and the best.', name: 'Demetrius K., Trustpilot 5-star review' },
    { quote: 'The experience has been transformative for my website. With Adolfo’s help, my website has climbed to the first page of Google results. Adolfo is a true artist in marketing and branding. I highly recommend Adolfo and MatjarX!', name: 'Lane V., Trustpilot 5-star review' },
  ] },
  slaviStory: { title: 'Slavi’s Story: 2500% ROI in 6 Months', quote: 'It’s only been 6 months or so since MatjarX built my site and ROI is over 2500% — hands down the best money I ever spent. The monthly growth sessions have been enlightening and edits are quick and easy whether you do them yourself or by their dedicated teams. If you need a good site for your new or growing business, get a MatjarX site. Excellent SEO and visibility, highly personalized services, and best of all — regular monthly meetings with a dedicated account manager. Many thanks!', name: 'Perun Roofing, Growth Member for 6 Months', points: ['$1,000 invested in Growth plan = $25,000+ in new revenue generated', 'Monthly growth sessions directly contributed to business decisions', 'Professional website + marketing expertise = compounding growth'] },
  whyChoose: { title: 'Marketing Is Hard. We’re Here to Help.', items: [
    { h: 'What You Get', items: ['Expert strategy tailored to your business', 'Hands-on support from a dedicated manager', 'Monthly accountability through regular meetings', 'Continuous learning about marketing fundamentals', 'Rapid implementation of proven tactics', 'Data-driven optimization based on what works', 'Peace of mind knowing an expert is helping'] },
    { h: 'ROI That Matters', body: 'Growth Marketing isn’t a cost — it’s an investment that generates revenue.', items: ['25-100% increase in website traffic within 6 months', '2-5x increase in leads and bookings', '$1-10 return for every $1 spent on marketing'] },
  ] },
  faqs: { title: 'Everything You Need to Know About Growth Marketing', items: [
    { q: 'What if I don’t know anything about marketing?', a: 'Perfect — that’s exactly who this service is for. Your dedicated manager explains marketing fundamentals, teaches you what’s working and why, guides implementation, and builds your marketing knowledge month by month.' },
    { q: 'How much should I budget for paid ads?', a: 'Minimum starting point: Rs. 10,000-20,000/month for testing. Recommended for growth: Rs. 25,000-50,000/month. Serious growth: Rs. 50,000-100,000+/month. Your dedicated manager helps determine what makes sense for your budget.' },
    { q: 'Can growth marketing help my e-commerce business specifically?', a: 'Absolutely — product feed optimization, email marketing (recovery, upsells, retention), retargeting ads, SEO for product pages, and review generation. Many of our highest-ROI Growth clients are e-commerce businesses.' },
    { q: 'When will I see results?', a: 'Month 1: foundation and strategy. Month 2-3: early results (reviews, email subscribers, early SEO). Month 3-6: significant growth (SEO rankings, email revenue, followers). Month 6+: compounding returns.' },
    { q: 'What if the strategies aren’t working?', a: 'We adjust. Every month your manager reviews what’s working and what’s not, and analyzes, tries a different approach, adjusts budget and effort, keeps what works and cuts what doesn’t.' },
    { q: 'Can you help with a specific marketing problem?', a: 'Yes — bring any challenge to your monthly meeting ("not enough bookings," "low open rates," "competitors outranking us") and your dedicated manager helps diagnose and solve it.' },
    { q: 'How much time will I need to invest?', a: 'Minimum: 1 hour per month (your growth call). Recommended: 2-3 hours per month for execution and feedback. Your manager handles most execution, but your input improves results significantly.' },
    { q: 'What’s the difference between Growth marketing and Concierge Service?', a: 'Concierge Service is website management (updates, edits, features, maintenance). Growth Marketing is business growth strategy (customers, leads, revenue, branding). The Growth Plan includes both.' },
  ] },
  closing: { title: 'Get Hands-On Marketing Support Every Month That Makes Your Business Grow', body: 'Stop doing marketing alone. Get expert help. Growth Plan: Rs. 27,000/month — professional website, dedicated marketing manager, unlimited edits (Concierge), SEO + email + social + ads + reputation, 2,000 words of content monthly, everything included.', ctas: ['Start With Growth — Unlock Your Potential', 'Talk to Our Team'] },
  bottomLine: { title: 'VIP Marketing Service', body: ['Marketing is hard. We’re here to help.', 'You focus on your business. We focus on growing it.'] },
}
