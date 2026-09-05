// Data for the Templates & Examples page — from files/matjarx_templates_page.md,
// verbatim. This page has no route/component/data file yet even though the
// user's own master page inventory marks it P0. Templates themselves live
// inside the app dashboard (behind login) — there are no real template
// preview images to show here, so categories are represented as real,
// honestly-worded content cards (tint + text), not fabricated screenshots.

export const META = {
  title: 'Website Templates - Professional Design Templates for Your Business',
  description: 'Explore 100+ professional website templates for small business. Industry-specific designs, templates for every business type. Browse in dashboard.',
}

export const HERO = {
  headline: '100+ Professional Website Templates',
  subhead: 'Choose from industry-specific designs, customize, and launch your professional website in days.',
  cta: 'Browse Templates in Dashboard',
}

export type IconCard = { title: string; body: string[]; icon: string }

const ICONS = {
  rocket: 'M12 3.5 4.5 6.5v5c0 4.4 3.1 7.6 7.5 9 4.4-1.4 7.5-4.6 7.5-9v-5ZM9 12l2.2 2.2L15.5 10',
  brush: 'M9 15c-1.5 1.5-2 4.5-2 4.5s3-.5 4.5-2c1-.9 1-2.6 0-3.5-.9-1-2.6-1-3.5.5ZM13 11l6-6.5a2 2 0 1 1 2.5 2.5L15 13',
  wallet: 'M4 7.5h16v11H4zM4 10.5h16M16 15h2',
  trophy: 'M8 4.5h8v4a4 4 0 0 1-8 0v-4ZM6 6.5H4v2a3 3 0 0 0 3 3M18 6.5h2v2a3 3 0 0 1-3 3M10 15v3h4v-3M8 20.5h8',
  mobile: 'M7 3.5h10v17H7zM11 18h2',
  search: 'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM20 20l-4.3-4.3',
  target: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 11.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Z',
  sliders: 'M4 6h11M4 12h7M4 18h14M17 4v4M13 10v4M19 16v4',
  access: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 8v5l3 2',
}

export const WHY_TEMPLATES: IconCard[] = [
  { title: 'Fast Launch', icon: ICONS.rocket, body: ['Traditional custom design: 4-8 weeks', 'With templates: launch in 7-14 days', 'Result: get online faster and start attracting customers'] },
  { title: 'Professional Design', icon: ICONS.brush, body: ['Designed by professionals', 'Mobile-optimized', 'Conversion-focused', 'Industry best practices', 'Modern aesthetics'] },
  { title: 'Cost Effective', icon: ICONS.wallet, body: ['Saves design costs', 'Saves development time', 'Saves money on a custom designer', 'Saves on your launch timeline'] },
  { title: 'Proven Results', icon: ICONS.trophy, body: ['Tested across thousands of websites', 'Conversion optimization built in', 'User experience testing', 'Mobile performance', 'SEO best practices'] },
]

export const TEMPLATE_FEATURES: IconCard[] = [
  { title: 'Mobile Responsive', icon: ICONS.mobile, body: ['Perfect on phones, tablets, desktop', 'Touch-friendly buttons', 'Fast mobile loading', 'Mobile-optimized images'] },
  { title: 'SEO Optimized', icon: ICONS.search, body: ['Proper heading structure', 'Meta tags ready', 'Mobile SEO', 'Fast page speed', 'Schema markup ready'] },
  { title: 'Conversion Focused', icon: ICONS.target, body: ['Clear calls-to-action', 'Contact forms', 'Lead capture', 'Social proof', 'Trust signals'] },
  { title: 'Customizable', icon: ICONS.sliders, body: ['Change colors and fonts', 'Rearrange sections', 'Add/remove pages', 'Add your content', 'Personalize completely'] },
  { title: 'Accessibility Compliant', icon: ICONS.access, body: ['WCAG standards', 'Keyboard navigation', 'Screen reader support', 'Color contrast', 'Alt text for images'] },
]

export type TemplateCategory = { n: number; name: string; tint: string; perfectFor: string[]; features: string[]; includes: string[] }

export const CATEGORIES: TemplateCategory[] = [
  { n: 1, name: 'Small Business Templates', tint: 'linear-gradient(150deg, #003366, #0A2647)',
    perfectFor: ['Startups', 'Solo entrepreneurs', 'Small service businesses', 'Local businesses', 'New ventures'],
    features: ['Simple and clean', 'Professional', 'Minimal', 'Modern', 'Bold'],
    includes: ['Home page', 'About page', 'Services page', 'Contact page', 'Testimonials section'] },
  { n: 2, name: 'Service Business Templates', tint: 'linear-gradient(150deg, #4A2C8E, #1A0F3A)',
    perfectFor: ['Consultants', 'Agencies', 'Professional services', 'Contractors', 'Freelancers'],
    features: ['Case study pages', 'Team bios', 'Portfolio sections', 'Service descriptions', 'Testimonials', 'Contact forms'],
    includes: ['Project showcase', 'Expertise highlighting', 'Client logos', 'Before/after sections', 'Investment ROI'] },
  { n: 3, name: 'E-Commerce Templates', tint: 'linear-gradient(150deg, #128C4A, #06381D)',
    perfectFor: ['Online retailers', 'Dropshippers', 'Digital products', 'Subscription boxes', 'Marketplace sellers'],
    features: ['Product grids', 'Product filters', 'Shopping cart', 'Payment integration', 'Inventory tracking', 'Order management'],
    includes: ['Product showcase', 'Category pages', 'Best sellers', 'New arrivals', 'Customer reviews'] },
  { n: 4, name: 'Blog Templates', tint: 'linear-gradient(150deg, #6B4A22, #2A1A08)',
    perfectFor: ['Content creators', 'Bloggers', 'Publishers', 'News sites', 'Thought leaders'],
    features: ['Blog archive', 'Category pages', 'Author bios', 'Comment sections', 'Social sharing', 'Subscribe forms'],
    includes: ['Featured posts', 'Related articles', 'Reading time', 'Author info', 'Social proof'] },
  { n: 5, name: 'Portfolio Templates', tint: 'linear-gradient(150deg, #7A2E6B, #2A0F24)',
    perfectFor: ['Designers', 'Photographers', 'Artists', 'Creatives', 'Freelancers'],
    features: ['Project galleries', 'Image lightbox', 'Client logos', 'Case studies', 'Testimonials', 'Resume/CV section'],
    includes: ['Beautiful layouts', 'Image optimization', 'Gallery effects', 'Professional bio', 'Contact options'] },
  { n: 6, name: 'Restaurant & Food Templates', tint: 'linear-gradient(150deg, #8E1B22, #2A0709)',
    perfectFor: ['Restaurants', 'Cafes', 'Bakeries', 'Food delivery', 'Catering'],
    features: ['Menu pages', 'Photo galleries', 'Location maps', 'Hours and reservations', 'Online ordering', 'Customer reviews'],
    includes: ['Food photography', 'Menu integration', 'Location details', 'Photo galleries', 'Reservation system'] },
  { n: 7, name: 'Healthcare Templates', tint: 'linear-gradient(150deg, #1B5E6E, #062730)',
    perfectFor: ['Doctors', 'Clinics', 'Therapists', 'Dentists', 'Healthcare providers'],
    features: ['Doctor bios', 'Service descriptions', 'Appointment booking', 'Patient forms', 'Insurance info', 'Testimonials'],
    includes: ['Appointment system', 'Doctor profiles', 'Medical information', 'Hours and location', 'Insurance details'] },
  { n: 8, name: 'Real Estate Templates', tint: 'linear-gradient(150deg, #2E6EA8, #0F2E4A)',
    perfectFor: ['Real estate agents', 'Property managers', 'Real estate companies', 'Investors', 'Brokers'],
    features: ['Property listings', 'Photo galleries', 'Property search', 'Agent profiles', 'Contact forms', 'Map integration'],
    includes: ['Listing pages', 'Property details', 'Photo galleries', 'Agent profiles', 'Contact options'] },
  { n: 9, name: 'Wedding & Event Templates', tint: 'linear-gradient(150deg, #C4262E, #6B0F14)',
    perfectFor: ['Wedding planners', 'Event coordinators', 'Venues', 'Event companies', 'Destination planners'],
    features: ['Portfolio galleries', 'Service descriptions', 'Testimonials', 'Gallery showcase', 'Contact forms', 'Blog section'],
    includes: ['Beautiful layouts', 'Photo galleries', 'Service showcase', 'Testimonials', 'Planning guides'] },
  { n: 10, name: 'Fitness & Gym Templates', tint: 'linear-gradient(150deg, #1B7A3D, #08361B)',
    perfectFor: ['Gyms', 'Personal trainers', 'Fitness studios', 'Yoga studios', 'Wellness centers'],
    features: ['Class schedules', 'Trainer profiles', 'Membership info', 'Before/after galleries', 'Testimonials', 'Contact forms'],
    includes: ['Class schedules', 'Trainer bios', 'Pricing plans', 'Before/after', 'Member reviews'] },
  { n: 11, name: 'Education Templates', tint: 'linear-gradient(150deg, #707538, #2E3115)',
    perfectFor: ['Online courses', 'Training centers', 'Tutoring services', 'Educational institutions', 'Coaching programs'],
    features: ['Course listings', 'Student testimonials', 'Instructor bios', 'Pricing tiers', 'Enrollment forms', 'Resource libraries'],
    includes: ['Course descriptions', 'Instructor profiles', 'Success stories', 'Pricing options', 'Enrollment system'] },
  { n: 12, name: 'Corporate Templates', tint: 'linear-gradient(150deg, #1E5FA8, #0A2647)',
    perfectFor: ['Corporations', 'Large companies', 'Enterprise businesses', 'B2B companies', 'Industry leaders'],
    features: ['Company info', 'Leadership team', 'Services overview', 'Solutions pages', 'Case studies', 'Industry expertise'],
    includes: ['Professional design', 'Leadership bios', 'Solutions showcase', 'Client logos', 'Industry recognition'] },
]

export type ProcessStep = { n: number; title: string; lead: string; items: string[] }

export const SELECTION_PROCESS: ProcessStep[] = [
  { n: 1, title: 'Browse Templates', lead: 'In your dashboard:', items: ['Go to "Templates"', 'Browse all available templates', 'Filter by industry', 'See live previews'] },
  { n: 2, title: 'Preview Templates', lead: 'For each template:', items: ['See full page preview', 'Test on mobile', 'Check navigation', 'Review sections', 'View layout'] },
  { n: 3, title: 'Select Template', lead: 'Choose your favorite:', items: ['Click "Use Template"', 'Template loads in editor', 'All pages ready to customize', 'Start editing'] },
  { n: 4, title: 'Customize', lead: 'Make it yours:', items: ['Change colors', 'Update fonts', 'Add your content', 'Adjust layout', 'Personalize sections'] },
]

export const CUSTOMIZATION: IconCard[] = [
  { title: 'Colors & Branding', icon: ICONS.brush, body: ['Change primary color', 'Change accent colors', 'Apply your brand colors', 'Custom logo placement', 'Consistent branding'] },
  { title: 'Fonts & Typography', icon: ICONS.sliders, body: ['Choose from 1,000+ fonts', 'Custom heading fonts', 'Custom body fonts', 'Font sizing', 'Typography hierarchy'] },
  { title: 'Content', icon: ICONS.target, body: ['Replace placeholder text', 'Add your content', 'Upload your images', 'Add your logo', 'Customize all sections'] },
  { title: 'Layout', icon: ICONS.mobile, body: ['Rearrange sections', 'Add/remove content blocks', 'Adjust spacing', 'Modify layouts', 'Create unique design'] },
  { title: 'Add/Remove Sections', icon: ICONS.rocket, body: ['Keep what you need', 'Remove unused sections', 'Add new sections', 'Create custom pages', 'Expand template'] },
]

export type PopularTemplate = { name: string; used: string; features: string; rating: string; launch: string; tint: string }

export const POPULAR: PopularTemplate[] = [
  { name: 'Restaurant Template', used: 'Used by 1,200+ restaurants', features: 'Menu, reservations, online ordering', rating: '4.8/5 stars', launch: '5 days', tint: 'linear-gradient(150deg, #8E1B22, #2A0709)' },
  { name: 'Real Estate Template', used: 'Used by 800+ agents', features: 'Property listings, search, agent bios', rating: '4.9/5 stars', launch: '7 days', tint: 'linear-gradient(150deg, #2E6EA8, #0F2E4A)' },
  { name: 'Fitness Template', used: 'Used by 600+ gyms', features: 'Classes, trainers, memberships', rating: '4.7/5 stars', launch: '5 days', tint: 'linear-gradient(150deg, #1B7A3D, #08361B)' },
  { name: 'E-Commerce Template', used: 'Used by 1,500+ stores', features: 'Products, cart, payments', rating: '4.8/5 stars', launch: '7 days', tint: 'linear-gradient(150deg, #128C4A, #06381D)' },
  { name: 'Service Business Template', used: 'Used by 2,000+ businesses', features: 'Services, team, portfolio', rating: '4.9/5 stars', launch: '7 days', tint: 'linear-gradient(150deg, #4A2C8E, #1A0F3A)' },
]

export const TEMPLATE_UPDATES = {
  title: 'Templates Keep Getting Better',
  intro: 'Regular updates include:',
  items: ['New templates added monthly', 'Design improvements', 'Feature enhancements', 'Performance optimization', 'Security updates'],
  note: 'All updates included in your subscription.',
}

export const MIGRATION = {
  title: 'Switching to MatjarX?',
  intro: 'We can help you:',
  items: ['Transfer your content', 'Import existing pages', 'Migrate your domain', 'Preserve your data', 'Quick transition'],
  note: 'Process: easy data migration assistance.',
}

export const TEMPLATE_FAQS: [string, string][] = [
  ['Can I change templates after launching?', 'Yes! Switch templates anytime. Your content transfers automatically.'],
  ['Can I customize templates?', 'Yes! Complete customization. Colors, fonts, layout, content — everything.'],
  ['Do templates work on mobile?', 'Yes! All templates are fully responsive and mobile-optimized.'],
  ['Are new templates added?', 'Yes! New templates added monthly. All included in your plan.'],
  ['Can I use my own design?', 'Yes! Start blank or use a custom design (Platinum/Custom plans).'],
  ['How long to launch with a template?', 'Typically 5-14 days depending on your plan and content readiness.'],
]

export const RELATED = [
  { label: 'Website Features', href: '/features' },
  { label: 'Plans & Pricing', href: '/pricing' },
  { label: 'Getting Started', href: '/help/getting-started' },
]
