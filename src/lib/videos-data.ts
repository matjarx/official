// Data for the Videos page — from the "MatjarX Videos Page - Complete
// Content" the user pasted directly in chat, used in full. No actual
// video files or YouTube links were supplied, so "Watch Now" is
// deliberately not a working link — each card shows an honest
// placeholder (same pattern as the blog post's "Article cover image"
// box) rather than a fake, non-functional video player.

export const HERO = {
  eyebrow: 'Videos',
  headline: 'Learn Why Small Businesses Choose MatjarX',
  subhead: 'Check out these videos to understand how we help businesses get online fast, easy, and affordable.',
}

export const INTRO = 'Video is the best way to understand MatjarX. Watch our library of educational and inspirational videos to see how we help small businesses solve "the website problem" and grow their online presence.'

export type Video = {
  number: number
  title: string
  length: string
  body: string
  items?: string[]
  extra?: string // a one-line "Perfect for:" / "Topics:" / "Tone:" note, for videos without a full bullet list
  // An instagram.com/reel/.../ or /p/.../ URL — once set, the card shows
  // the real embedded video instead of the "Video coming soon"
  // placeholder. Editable per-video from the admin's Marketing Content
  // editor (this is already part of the 'videos' content shape merged
  // from Supabase), no code change needed to fill one in.
  url?: string
}

export type VideoSection = { title: string; videos: Video[] }

export const VIDEO_SECTIONS: VideoSection[] = [
  {
    title: 'Product Overview & Demos',
    videos: [
      { number: 1, title: 'Full Product Demo — From Our Founder, Wajeeh Hassan', length: '~15 minutes',
        body: 'Our CEO and founder Wajeeh Hassan walks you through the complete MatjarX platform — from website builder to editor to marketing tools. See exactly what you get when you sign up.',
        items: ['Complete platform walkthrough', 'Website editor in action', 'Booking system setup', 'E-commerce integration', 'Marketing dashboard', 'Customer support features'] },
      { number: 2, title: "MatjarX's Boost Plan in 4 Minutes", length: '~4 minutes',
        body: "Quick overview of our Boost plan — what's included, what it costs, and why it's perfect for small business owners who want a professional website without the DIY hassle.",
        extra: 'Perfect for: Business owners considering their first website or upgrading from DIY' },
      { number: 3, title: "MatjarX's Growth Plan in 2 Minutes", length: '~2 minutes',
        body: 'See how our Growth plan includes everything in Boost plus dedicated marketing support, monthly strategy calls, and advanced SEO optimization.',
        extra: 'Perfect for: Growing businesses ready to scale online' },
      { number: 4, title: 'How We Make Your Website Unique', length: '~6 minutes',
        body: "MatjarX websites don't look like templates. In this video, our design team explains how we create custom, industry-specific websites that match your brand and convert visitors.",
        items: ['Custom design process', 'Industry-specific layouts', 'Brand identity development', 'Conversion optimization', 'Mobile responsiveness'] },
      { number: 5, title: 'How We Deliver Your Website', length: '~8 minutes',
        body: 'Ever wonder what happens during your 7-day build? Watch our team explain the entire process — from initial questionnaire to final launch call.',
        items: ['Discovery phase (what we learn about you)', 'Design and development process', 'Content creation workflow', 'Quality assurance checks', 'Launch preparation', 'Training on your new website'] },
      { number: 6, title: 'How You Can Edit Your Website', length: '~7 minutes',
        body: 'Our website editor is designed for non-technical users. This video shows you exactly how to make updates, add content, and manage your site — no coding required.',
        items: ['Text and image editing', 'Adding new pages', 'Updating products/services', 'Managing appointments and bookings', 'Blog post creation', 'Mobile editing', 'Video tutorials built-in'] },
    ],
  },
  {
    title: 'Why Choose MatjarX?',
    videos: [
      { number: 7, title: 'Why Choose MatjarX?', length: '~5 minutes',
        body: 'In this short video, we explain the core reasons small businesses choose MatjarX over DIY builders, expensive agencies, or freelancers.',
        items: ['Speed (7 days vs. 60+ days)', 'Affordability (all-in-one pricing vs. hidden fees)', 'Professional quality', 'Ongoing support', 'Guaranteed completion'] },
      { number: 8, title: 'Get More, For Less', length: '~4 minutes',
        body: "A direct comparison: what you get with MatjarX vs. what you'd get (or struggle with) using DIY website builders or expensive agencies.",
        items: ['Cost breakdown', 'Time investment', 'Quality of results', 'Support availability', 'Ongoing management'] },
      { number: 9, title: 'Avoid the Hard Labor', length: '~3 minutes',
        body: 'Stop wasting hours on DIY website building. See how MatjarX saves you 60+ hours and eliminates the frustration of doing it yourself.',
        items: ['Time saved breakdown', 'Eliminated frustrations', 'Professional peace of mind', 'Focus on your business'] },
      { number: 10, title: 'Our Websites Are F**king Great', length: '~2 minutes',
        body: 'Short, direct, and to the point — our websites are professionally designed, SEO-optimized, mobile-responsive, and actually convert visitors into customers.' },
    ],
  },
  {
    title: 'Regional & Cultural Videos',
    videos: [
      { number: 11, title: 'Hey Pakistan, Heard About MatjarX?', length: '~3 minutes',
        body: "Specifically designed for Pakistani business owners, this video explains MatjarX in context — how we've helped 70,000+ Pakistani businesses get online.",
        items: ['Local success stories', 'Pakistan-specific features (JazzCash, Easypaisa, etc.)', 'Urdu/English navigation', 'Local customer support', 'Pakistan business challenges solved'] },
    ],
  },
  {
    title: 'Myths vs. Reality',
    videos: [
      { number: 12, title: 'DIY Website Myths… Debunked', length: '~7 minutes',
        body: "Common myths about DIY website builders — and the reality. Learn why DIY isn't as easy or cheap as it seems.",
        items: ['"Building a website is easy"', '"DIY website builders save money"', '"You don\'t need a designer"', '"SEO is automatic"', '"Anyone can do it"'] },
      { number: 13, title: '4 Problems with Website Builders', length: '~5 minutes',
        body: 'Specific, honest discussion of the real problems with popular DIY website builders — and how MatjarX solves them.',
        items: ['Hidden fees and add-ons', 'Poor SEO defaults', 'Limited support', 'Template limitations', 'Time investment underestimated'] },
      { number: 14, title: 'MatjarX vs Do It Yourself Websites', length: '~6 minutes',
        body: "Head-to-head comparison: MatjarX's done-for-you approach vs. the DIY path. Honest discussion of pros, cons, time, and cost.",
        items: ['Setup time', 'Quality of results', 'Ongoing management', 'Cost comparison', 'Support availability', 'Success rate'] },
    ],
  },
  {
    title: 'Educational Content',
    videos: [
      { number: 15, title: "It's Hard to Get Online", length: '~4 minutes',
        body: 'Why is getting a professional website so difficult? This video explores "the website problem" and why so many small businesses struggle.',
        items: ['DIY complexity', 'Agency expense', 'Freelancer uncertainty', 'Missing support', 'Time commitment'] },
      { number: 16, title: '7 Features of a Good Website', length: '~8 minutes',
        body: "What separates a good website from a mediocre one? Learn the 7 essential features every small business website needs.",
        items: ['Professional design', 'Mobile responsiveness', 'Fast loading speed', 'Clear navigation', 'Strong call-to-action', 'Trust signals (testimonials, security badges)', 'SEO optimization'] },
      { number: 17, title: "Do's & Don'ts of a Great Website", length: '~6 minutes',
        body: "Practical tips for website design and user experience. Discover what works and what doesn't when building a website that converts.",
        items: ["Do: Simple, clear messaging", "Do: Professional images", "Do: Mobile-first design", "Do: Fast loading", "Do: Easy navigation", "Do: Trust badges", "Don't: Auto-playing music/video", "Don't: Cluttered layouts", "Don't: Outdated design", "Don't: Broken links", "Don't: Slow loading", "Don't: Too many ads"] },
      { number: 18, title: 'Your Website Needs Great Content', length: '~7 minutes',
        body: "Websites without great content don't convert. Learn why content matters and how MatjarX ensures every page has professional, conversion-focused copy.",
        items: ['Copywriting fundamentals', 'SEO-optimized content', 'Calls-to-action', 'Testimonials and social proof', 'FAQ sections', 'Blog strategy'] },
    ],
  },
  {
    title: 'Customer Stories & Success',
    videos: [
      { number: 19, title: 'Dream Job at a DIY Website Builder', length: '~2 minutes',
        body: "Humorous take on what it's like working at a DIY website builder — watching customers struggle with your product.",
        extra: 'Tone: Light, funny, relatable' },
      { number: 20, title: 'Considering Other Alternatives? (Christmas In July)', length: '~4 minutes',
        body: "Comparison video: why MatjarX stands out when you're considering other solutions. Honest look at DIY, agencies, and freelancers.",
        items: ['DIY website builders', 'Expensive agencies', 'Freelance developers', 'Template platforms'] },
    ],
  },
  {
    title: 'Financial Planning Videos',
    videos: [
      { number: 21, title: 'Rs. 100,000 to Spend on a Website?', length: '~5 minutes',
        body: "If you have PKR 100,000 to spend on a website, here's how to spend it wisely — and why MatjarX is the best value in that budget.",
        items: ['Budget breakdown', 'What PKR 100,000 gets you', 'Comparison to other solutions', 'ROI expectations'] },
    ],
  },
]

export const CATEGORIES_BY_PURPOSE = [
  { title: 'Getting Started', videos: ['Full Product Demo', "MatjarX's Boost Plan in 4 Minutes", "MatjarX's Growth Plan in 2 Minutes", 'Why Choose MatjarX?'] },
  { title: 'Understanding Our Process', videos: ['How We Make Your Website Unique', 'How We Deliver Your Website', 'How You Can Edit Your Website'] },
  { title: 'Comparisons', videos: ['DIY Website Myths… Debunked', '4 Problems with Website Builders', 'MatjarX vs Do It Yourself Websites', 'Considering Other Alternatives? (Christmas In July)'] },
  { title: 'Educational', videos: ['7 Features of a Good Website', "Do's & Don'ts of a Great Website", 'Your Website Needs Great Content', "It's Hard to Get Online"] },
  { title: 'Local & Cultural', videos: ['Hey Pakistan, Heard About MatjarX?'] },
]

export const CATEGORIES_BY_LENGTH = [
  { title: '2–3 Minutes — Quick Overview', videos: ["MatjarX's Boost Plan in 4 Minutes", "MatjarX's Growth Plan in 2 Minutes", 'Our Websites Are F**king Great', 'Dream Job at a DIY Website Builder'] },
  { title: '4–5 Minutes — Quick Deep Dive', videos: ['Why Choose MatjarX?', 'Get More, For Less', 'Avoid the Hard Labor', '4 Problems with Website Builders', "It's Hard to Get Online", 'Considering Other Alternatives? (Christmas In July)'] },
  { title: '6–8 Minutes — Comprehensive', videos: ['How We Make Your Website Unique', 'How We Deliver Your Website', 'How You Can Edit Your Website', 'MatjarX vs Do It Yourself Websites', 'DIY Website Myths… Debunked', '7 Features of a Good Website', "Do's & Don'ts of a Great Website", 'Your Website Needs Great Content'] },
  { title: '10+ Minutes — Full Details', videos: ['Full Product Demo (~15 minutes)'] },
]

export const VIDEO_FAQS: [string, string][] = [
  ['Where can I watch these videos?', 'All videos are available right here on this page, plus on our YouTube channel. You can also find many videos embedded throughout matjarx.com.'],
  ["What if I don't have time to watch videos?", "That's fine — every page on our site has detailed written content explaining the same information. But videos are great if you're a visual learner or want to see the platform in action."],
  ['Can I download these videos?', 'Some videos are available for download. Contact our support team at office@matjarx.com if you need specific videos for presentations or training.'],
  ['Do you have videos in Urdu?', "We're working on Urdu versions of our most popular videos. Check back soon, or contact us if you'd like Urdu content for a specific topic."],
  ['Which video should I watch first?', 'Start with "Why Choose MatjarX?" or "Full Product Demo" to get oriented. Then watch the specific videos relevant to your situation (Plan Overview, How We Build, etc.).'],
  ['Are there video tutorials for using the website editor?', 'Yes — "How You Can Edit Your Website" is a comprehensive tutorial. Plus, the MatjarX platform includes built-in video tutorials for every feature.'],
  ['Do you have comparison videos?', 'Yes — watch "MatjarX vs Do It Yourself Websites" or "4 Problems with Website Builders" for detailed comparisons.'],
  ['How often do you add new videos?', 'We add new videos regularly. Subscribe to our YouTube channel to stay updated on new content.'],
]

export const RESOURCES_BY_AUDIENCE = [
  { title: 'For Businesses Considering MatjarX', groups: [
    { label: 'Start Here', videos: ['Why Choose MatjarX?', 'Full Product Demo', "MatjarX's Boost Plan in 4 Minutes"] },
    { label: 'Then Explore', videos: ['How We Make Your Website Unique', 'How We Deliver Your Website', '7 Features of a Good Website'] },
  ] },
  { title: 'For People Researching Website Solutions', groups: [
    { label: 'Understand the Problem', videos: ["It's Hard to Get Online", 'DIY Website Myths… Debunked', '4 Problems with Website Builders'] },
    { label: 'See Solutions', videos: ['MatjarX vs Do It Yourself Websites', 'Get More, For Less', 'Why Choose MatjarX?'] },
  ] },
  { title: 'For Business Owners Ready to Launch', groups: [
    { label: 'Understand Our Process', videos: ['How We Make Your Website Unique', 'How We Deliver Your Website', "MatjarX's Boost Plan in 4 Minutes", "MatjarX's Growth Plan in 2 Minutes"] },
    { label: 'Learn to Use Your Site', videos: ['How You Can Edit Your Website', 'Your Website Needs Great Content', '7 Features of a Good Website'] },
  ] },
]

export const CHANNELS = { whatsapp: '+92 303 372 0953', email: 'office@matjarx.com' }
