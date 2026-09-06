// Data for the Services page — from Marketing - Services.dc.html.

export type ServiceBlock = { stat: string; titleLead: string; titleMark: string; points: string[]; tint: string; mediaLabel: string; image?: { src: string; alt: string; width: number; height: number } }
export type GridItem = { title: string; body: string; icon: string }
export type ResultStat = { value: string; label: string }

export type ServiceKey = 'dfy' | 'seo' | 'concierge' | 'growth'

export const SERVICE_TABS: { id: ServiceKey; label: string }[] = [
  { id: 'dfy', label: 'Done-for-you website' },
  { id: 'seo', label: 'Local & global SEO' },
  { id: 'concierge', label: 'Concierge service' },
  { id: 'growth', label: 'Growth marketing' },
]

export const SERVICE_DATA: Record<ServiceKey, {
  kicker: string; titleLead: string; titleMark: string; subtitle: string; heroCta: string
  pitchTitle: string; pitchBody: string; blocks: ServiceBlock[]
  gridTitle: string; gridItems: GridItem[]
  quote: string; quoteName: string; quoteCompany: string; resultStats: ResultStat[]
}> = {
  dfy: {
    kicker: 'Done-for-you website',
    titleLead: "We'll build your complete website in",
    titleMark: '7 days',
    subtitle: 'Designed, written and launched by our team — for the price of a DIY builder subscription.',
    heroCta: 'See plans',
    pitchTitle: 'Yes, a pro-built website is now within your reach',
    pitchBody: 'MatjarX creates ready-to-use websites that bring you sales, bookings and leads. No costly agency retainer, no complicated builder — just a website that works for your business.',
    blocks: [
      { stat: 'Step 1 · 15–30 minutes of your time', titleLead: 'You tell us about', titleMark: 'your business',
        points: ['A short questionnaire — what you do, who you serve', 'Send your logo, photos and prices, or we source them', 'Pick the functions you need: store, bookings, enquiries', 'Nothing else needed from you until review day'],
        tint: 'linear-gradient(150deg, #003366, #2E6EA8)', mediaLabel: 'Questionnaire & brief', image: { src: '/services/questionnaire-brief.webp', alt: 'A finished MatjarX-built website shown in the editor', width: 453, height: 373 } },
      { stat: 'Step 2 · 7 days', titleLead: 'A specialist in your trade', titleMark: 'builds it',
        points: ['Designed by someone who has built for your category before', 'Copy written for Pakistani and Gulf customers', 'Structured to load fast and rank on Google', 'Mobile-first — most of your visitors arrive on a phone'],
        tint: 'linear-gradient(150deg, #707538, #C6CB8A)', mediaLabel: 'Design & build', image: { src: '/services/design-build.webp', alt: 'A website design editor with font and color controls', width: 1190, height: 980 } },
      { stat: 'Step 3 · 30 minutes', titleLead: 'We launch it', titleMark: 'together',
        points: ['A live call to walk through every page', 'Final changes made while you watch', "We show you the editor so you're never stuck", '30 days of unlimited edits after launch'],
        tint: 'linear-gradient(150deg, #8E1B22, #3A0A0E)', mediaLabel: 'Launch & training call', image: { src: '/services/launch-training-call.webp', alt: 'A live video call walking through a finished website', width: 1190, height: 980 } },
    ],
    gridTitle: "What's included in every website",
    gridItems: [
      { title: 'Custom domain', body: 'A .pk or .com domain registered for you — or connect one you already own.', icon: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5' },
      { title: 'Business email', body: 'you@yourbusiness.pk instead of a Gmail address. Set up and working from day one.', icon: 'M4 6h16v12H4zM4 7l8 6 8-6' },
      { title: 'Easy-to-use editor', body: 'Change photos, text, prices and products yourself from any device.', icon: 'M4 20h16M6 16 18 4l3 3L9 19H6z' },
      { title: '0% transaction fees', body: 'Sell products or take bookings and keep every rupee. We take no commission.', icon: 'M7 17 17 7M8.5 8.5h.01M15.5 15.5h.01M5 12a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z' },
      { title: 'Hosting & SSL', body: 'Fast secure hosting with a certificate included. No separate bills to manage.', icon: 'M12 3.5 4.5 6.5v5c0 4.4 3.1 7.6 7.5 9 4.4-1.4 7.5-4.6 7.5-9v-5Z' },
      { title: 'Ready in 7 days', body: 'Brief on Monday, review on Friday, online the following week. No drifting timelines.', icon: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 8v4.5l3 2' },
    ],
    quote: 'MatjarX delivered our website in 7 days, with excellent quality and smooth communication throughout.',
    quoteName: 'Samuel Abbas Jaffri', quoteCompany: 'Verified client',
    resultStats: [
      { value: '70,000', label: 'websites built' },
      { value: '7 days', label: 'average launch time' },
      { value: 'Rs. 22,500', label: 'one-time setup' },
    ],
  },
  seo: {
    kicker: 'Local, national & global SEO',
    titleLead: 'Get discovered by',
    titleMark: 'customers near you',
    subtitle: 'Be the highest-rated business around, with five-star reviews. Available on Boost, Growth and Platinum.',
    heroCta: 'Choose a plan',
    pitchTitle: 'Customers are 70% more likely to buy from a business with a complete online presence',
    pitchBody: 'Especially on Google. We build the listings, the reviews and the on-page structure that get you found — across more than 1,000 business categories.',
    blocks: [
      { stat: 'Step 1 for local businesses to get found on Google', titleLead: 'Done-for-you Google', titleMark: 'Business Profile',
        points: ['Created, optimised and verified for you', 'Ready in 7 days alongside your website', 'Collect and respond to reviews from one place', 'Your site content synced to your profile', 'A dedicated marketing manager on Growth and above'],
        tint: 'linear-gradient(150deg, #003366, #2E6EA8)', mediaLabel: 'Google Business Profile', image: { src: '/services/google-business-profile.webp', alt: 'A professional business website presented cleanly', width: 451, height: 372 } },
      { stat: '93% of consumers use Google Maps to find a business', titleLead: 'Launch on', titleMark: 'Google Maps',
        points: ['We create and verify your Maps listing', "Get found in 'near me' searches", 'Receive and reply to Google Business messages', 'Stand out with reviews, services and product info'],
        tint: 'linear-gradient(150deg, #1B7A3D, #0C4522)', mediaLabel: 'Google Maps listing', image: { src: '/services/google-maps-listing.webp', alt: 'A dashboard tracking website traffic and lead capture', width: 1190, height: 980 } },
      { stat: '81% of consumers read Google reviews before buying', titleLead: 'Collect Google reviews with', titleMark: 'one click',
        points: ['Invite every customer to review your business', 'Reviews shown automatically on your website', 'Build a five-star reputation customers trust', 'Ongoing SEO work to rank higher every month'],
        tint: 'linear-gradient(150deg, #707538, #C6CB8A)', mediaLabel: 'Review collection', image: { src: '/services/review-collection.webp', alt: 'A dashboard tracking website traffic and lead capture', width: 1190, height: 980 } },
    ],
    gridTitle: "Plus, every month you'll get",
    gridItems: [
      { title: 'Google Business posts', body: 'Fresh offers and updates published to your profile so it never looks abandoned.', icon: 'M5 4.5h14v15H5zM5 16h14M8.5 8h7M8.5 11.5h5' },
      { title: 'SEO audit report', body: "A plain-English report on what moved, what's ranking and what we're fixing next.", icon: 'M4 18V9M9.5 18V5M15 18v-6M20.5 18v-9' },
      { title: 'Keyword tracking', body: 'We track the searches that actually bring you customers, not vanity terms.', icon: 'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM16 16l4.5 4.5' },
      { title: 'Technical fixes', body: 'Page speed, structured data, sitemaps and broken links — handled without asking you.', icon: 'M14.5 6.5a3.5 3.5 0 0 0 4.7 4.7L21 13l-8 8-2-2 8-8-1.8-1.8Z' },
      { title: 'Content written for you', body: '2,000 words a month on Growth and above, optimised for the terms you want to win.', icon: 'M7 3.5h7l4 4v13H7zM14 3.5v4h4M10 13h6M10 16.5h4' },
      { title: 'Competitor insight', body: "Who's outranking you locally, and exactly what we're doing about it.", icon: 'M4 20V6M4 6l7 4 9-5v9l-9 5-7-4Z' },
    ],
    quote: 'Ranks #1 on Google Search and Google Maps for Chinese restaurant catering. Rs. 150,000 in website sales and 4,400 customers served.',
    quoteName: 'China Friend', quoteCompany: 'MatjarX Growth member',
    resultStats: [
      { value: '70%', label: 'more likely to buy from a complete presence' },
      { value: '93%', label: 'of buyers search Maps to find a business' },
      { value: '1,000+', label: 'business categories served' },
    ],
  },
  concierge: {
    kicker: 'Concierge service',
    titleLead: 'Get the VIP experience with our',
    titleMark: 'concierge service',
    subtitle: 'Unlimited website edits, done by our team, at a do-it-yourself price.',
    heroCta: 'See plans',
    pitchTitle: 'Agency-level support, without the agency invoice',
    pitchBody: "Send a WhatsApp message and consider it done. New photos, a seasonal offer, a price change, a whole new section — your concierge handles it and replies inside four working hours.",
    blocks: [
      { stat: 'Unlimited edits, at your request', titleLead: 'Ask for anything, and', titleMark: 'we do it',
        points: ['Change a photo, a price, a phone number, a whole page', 'Add a new section, gallery or form', 'Seasonal campaigns and Ramzan offers set up for you', 'No ticket queues — a named person who knows your business'],
        tint: 'linear-gradient(150deg, #003366, #2E6EA8)', mediaLabel: 'Unlimited edit requests', image: { src: '/services/unlimited-edits.webp', alt: 'A website design editor with font and color controls', width: 1190, height: 980 } },
      { stat: 'Rich multimedia', titleLead: "We'll make your website", titleMark: 'come to life',
        points: ['Photo and video galleries, sliders and lightboxes', 'Instagram, TikTok, Facebook and YouTube feeds embedded', 'Countdown timers, discount pop-ups and scratch-and-win', 'Audio and podcast players, live streaming blocks'],
        tint: 'linear-gradient(150deg, #707538, #C6CB8A)', mediaLabel: 'Galleries, feeds & multimedia', image: { src: '/services/galleries-feeds.webp', alt: 'A product gallery with color-palette customization', width: 712, height: 508 } },
      { stat: 'Tools, connected for you', titleLead: 'Tracking, chat and', titleMark: 'lead capture',
        points: ['Google Analytics, Search Console and Tag Manager', 'Meta Pixel and TikTok tracking for your ads', 'WhatsApp, Messenger and live chat buttons', 'Newsletter signup and lead forms wired to your inbox'],
        tint: 'linear-gradient(150deg, #8E1B22, #3A0A0E)', mediaLabel: 'Integrations & tracking', image: { src: '/services/integrations-tracking.webp', alt: 'A dashboard tracking website traffic and lead capture', width: 1190, height: 980 } },
    ],
    gridTitle: 'A few popular requests',
    gridItems: [
      { title: 'Discount pop-up', body: '"Spend Rs. 5,000, save Rs. 500" — set live with a coupon code in an afternoon.', icon: 'M4 8h16v8H4zM9 8v8M4 12h16' },
      { title: 'Seasonal banner', body: 'Eid, Ramzan or Independence Day artwork across your homepage.', icon: 'M4 5.5h16v9H4zM8 19h8M12 14.5V19' },
      { title: 'New product range', body: 'Photos, descriptions and prices loaded into your store for you.', icon: 'M4 6h2.2l2.3 9.5h9L20 8H7M9.5 20a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z' },
      { title: 'Booking form', body: 'Table reservations, appointments or consultations, synced to your calendar.', icon: 'M5 5.5h14v14H5zM5 10h14M9 3.5v4M15 3.5v4' },
      { title: 'Menu or price list', body: 'A new PDF or an interactive list your customers can actually read on a phone.', icon: 'M7 3.5h10v17H7zM10 8h4M10 12h4M10 16h2' },
      { title: 'Reviews section', body: 'Your best Google reviews pulled onto your homepage automatically.', icon: 'M12 4l2.4 5.2 5.6.5-4.3 3.7 1.3 5.6L12 16l-5 3 1.3-5.6L4 9.7l5.6-.5Z' },
    ],
    quote: 'Very cooperative team. They handle strategy and consultation, and they now manage both of my websites.',
    quoteName: 'Farooq Butt', quoteCompany: 'Butt Enterprises',
    resultStats: [
      { value: '4 hours', label: 'average concierge reply time' },
      { value: 'Unlimited', label: 'edits on Boost and above' },
      { value: '0', label: 'tickets, queues or hold music' },
    ],
  },
  growth: {
    kicker: 'Available exclusively to Growth members',
    titleLead: 'Grow your business with our',
    titleMark: 'growth marketing',
    subtitle: 'Work with a dedicated marketing partner who brings you more customers, every month.',
    heroCta: 'Grow my business',
    pitchTitle: 'Hands-on marketing support every month that makes your business grow',
    pitchBody: "A dedicated marketing manager, a plan built around your business, and monthly 1-on-1 sessions. Marketing is hard — we're here to help.",
    blocks: [
      { stat: 'Month 1 to 5 and beyond', titleLead: 'A customised', titleMark: 'marketing program',
        points: ["Month 1 — define your brand's unique selling point", 'Month 2 — get five-star reviews coming in every week', 'Month 3 — email marketing set up and sending', 'Month 4 — posting on Facebook and Instagram', 'Month 5 — advanced SEO and paid search'],
        tint: 'linear-gradient(150deg, #003366, #2E6EA8)', mediaLabel: 'Your 5-month program', image: { src: '/services/five-month-program.webp', alt: "Google's AI Overview describing MatjarX as an emerging website builder", width: 850, height: 538 } },
      { stat: "Never done email campaigns? We'll show you how", titleLead: 'The highest-ROI', titleMark: 'marketing channel',
        points: ['Increase purchases and bookings by sending email', 'Start collecting subscribers from your website', 'Learn how to set up your email platform properly', 'We build and run the campaigns together'],
        tint: 'linear-gradient(150deg, #707538, #C6CB8A)', mediaLabel: 'Email marketing', image: { src: '/services/email-marketing.webp', alt: 'A business email account set up alongside a website', width: 1190, height: 980 } },
      { stat: 'Overwhelmed by posts, hashtags and reels?', titleLead: 'Social media', titleMark: 'marketing',
        points: ['Build your presence to attract new customers', 'Learn how to create posts — and then do it', 'Target the right content to the right platform', 'Only the strategies relevant to your business'],
        tint: 'linear-gradient(150deg, #8E1B22, #3A0A0E)', mediaLabel: 'Social media', image: { src: '/services/social-media.webp', alt: 'A sponsored social media ad with campaign performance stats', width: 600, height: 494 } },
      { stat: "Want to try paid ads? We'll guide you", titleLead: 'Online', titleMark: 'advertising',
        points: ['Understand the real costs, benefits and risks', 'Align campaigns with your business goals', 'Learn to set up your campaigns properly', 'Maximise your chances of success before you spend'],
        tint: 'linear-gradient(150deg, #2E4A8E, #101E44)', mediaLabel: 'Paid advertising', image: { src: '/services/paid-advertising.webp', alt: 'An ads manager showing budget and campaign performance', width: 600, height: 494 } },
    ],
    gridTitle: 'What your growth team delivers',
    gridItems: [
      { title: 'Dedicated marketing partner', body: 'A named expert focused on your business, on a 1-on-1 call every month.', icon: 'M12 12a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM4.5 20a7.5 7.5 0 0 1 15 0' },
      { title: 'SEO to rank higher', body: '2,000 words of keyword-optimised content a month, plus a monthly audit.', icon: 'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM16 16l4.5 4.5' },
      { title: 'Facebook, Instagram & Google Shopping', body: 'Your products showcased across the web and synced to your store.', icon: 'M4 6h16v12H4zM4 10h16M9 14h6' },
      { title: 'Reputation management', body: 'Get 10 five-star reviews in a month and control how you appear online.', icon: 'M12 4l2.4 5.2 5.6.5-4.3 3.7 1.3 5.6L12 16l-5 3 1.3-5.6L4 9.7l5.6-.5Z' },
      { title: 'Competitor insight', body: 'See how you rank against the businesses taking your customers.', icon: 'M4 20V6M4 6l7 4 9-5v9l-9 5-7-4Z' },
      { title: 'Monthly reporting', body: 'What we did, what it produced, and what happens next month.', icon: 'M4 18V9M9.5 18V5M15 18v-6M20.5 18v-9' },
    ],
    quote: "It's only been 6 months since MatjarX built my site, and ROI is over 2,500%. Hands down best money I ever spent — monthly growth sessions have been enlightening.",
    quoteName: 'Slavi', quoteCompany: 'Perun Roofing',
    resultStats: [
      { value: '1,520', label: 'messages for Zulfay Hair' },
      { value: '350', label: 'orders in the first quarter' },
      { value: '2,500%', label: 'return for Perun Roofing' },
    ],
  },
}
