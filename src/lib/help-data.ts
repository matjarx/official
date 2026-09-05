// Data for the Help page — from Marketing - Help.dc.html

export const HELP_TOPICS = [
  { slug: 'getting-started', title: 'Getting started', icon: 'M12 3.5 5 7v10l7 3.5 7-3.5V7ZM12 12l7-4M12 12v8.5M12 12 5 8', body: 'What happens after you sign up, the questionnaire, the seven-day build and your launch call.' },
  { slug: 'billing-and-plans', title: 'Billing and plans', icon: 'M4 6h16v12H4zM4 10h16M7 14h4', body: 'Invoices, switching plans, the setup fee, refunds and how to update your payment card.' },
  { slug: 'website-editor', title: 'Website editor', icon: 'M4 20h16M6 16 18 4l3 3L9 19H6z', body: 'Changing images and text, adding sections, and switching functions like bookings or a store on.' },
  { slug: 'domains-and-email', title: 'Domains and email', icon: 'M4 6h16v12H4zM4 7l8 6 8-6', body: 'Connecting a domain you own, DNS records, setting up mailboxes and fixing delivery problems.' },
  { slug: 'ecommerce-and-payments', title: 'E-commerce and payments', icon: 'M4 6h2.2l2.3 9.5h9L20 8H7M9.5 20a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z', body: 'Products and variants, JazzCash, Easypaisa and PayFast, cash on delivery, shipping rates and refunds.' },
  { slug: 'seo-and-marketing', title: 'SEO and marketing', icon: 'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM16 16l4.5 4.5', body: 'Google Business Profile, Maps, reviews, keyword reporting and connecting Analytics or Meta Pixel.' },
  { slug: 'account-and-security', title: 'Account and security', icon: 'M12 3.5 4.5 6.5v5c0 4.4 3.1 7.6 7.5 9 4.4-1.4 7.5-4.6 7.5-9v-5Z', body: 'Passwords, changing your login email, exporting your data, backups and account deletion.' },
] as const

// The source's own "Most Popular Articles" list — 18 links across 6
// categories (Getting Started, Website Editing, Domains, Billing, SEO,
// Account), each pointing at the one real article that covers it.
export const HELP_POPULAR = [
  { title: 'How to start your website', topic: 'Getting started' },
  { title: 'Website onboarding process', topic: 'Getting started' },
  { title: 'Scheduling your launch call', topic: 'Getting started' },
  { title: 'How to edit your website', topic: 'Website editor' },
  { title: 'Adding pages and content', topic: 'Website editor' },
  { title: 'Website customization', topic: 'Website editor' },
  { title: 'Setup custom domain', topic: 'Domains and email' },
  { title: 'Create email accounts', topic: 'Domains and email' },
  { title: 'Connect domain', topic: 'Domains and email' },
  { title: 'Upgrade or downgrade plan', topic: 'Billing and plans' },
  { title: 'Cancel subscription', topic: 'Billing and plans' },
  { title: 'Understanding billing', topic: 'Billing and plans' },
  { title: 'Improve Google rankings', topic: 'SEO and marketing' },
  { title: 'Blog publishing guide', topic: 'SEO and marketing' },
  { title: 'Local SEO setup', topic: 'SEO and marketing' },
  { title: 'Password reset', topic: 'Account and security' },
  { title: 'Login help', topic: 'Account and security' },
  { title: 'Two-factor authentication', topic: 'Account and security' },
]

export const HELP_FAQS: [string, string][] = [
  ['How do I make changes to my website?', 'Use our website editor. Log in, click "Edit Website," and make changes. They save automatically.'],
  ['How do I set up my custom domain?', 'In account settings, go to "Domains" and follow the connection guide. Takes 24-48 hours.'],
  ['Can I upgrade or downgrade my plan?', 'Yes, anytime from your account settings. Changes take effect on next billing date.'],
  ['How do I accept payments online?', 'Enable a payment gateway (JazzCash or bank transfer). Setup takes 15-30 minutes.'],
  ['Can I cancel my plan?', 'Yes, with 30 days notice. Your site stays live during the notice period.'],
  ['How do I improve my Google rankings?', 'Publish regular blog content, optimize your pages, and build local presence.'],
  ['I forgot my password. What do I do?', 'Click "Forgot Password" on the login page and follow the email instructions.'],
  ['How do I create email accounts?', 'In domain settings, create email accounts with your custom domain.'],
]

export const HELP_VIDEOS = [
  { group: 'Getting Started', items: ['Introduction to MatjarX (3 min)', 'Dashboard Overview (4 min)', 'Your First Website (5 min)'] },
  { group: 'Website Editing', items: ['Website Editor Basics (5 min)', 'Adding Pages (4 min)', 'Editing Content (4 min)', 'Uploading Images (3 min)'] },
  { group: 'Advanced', items: ['SEO Optimization (7 min)', 'Blog Publishing (5 min)', 'Accepting Payments (6 min)', 'Domain Setup (4 min)'] },
]

export const HELP_BY_PLAN = [
  { plan: 'Launch', items: ['Website editing basics', 'Domain and email setup', 'Billing and account management'] },
  { plan: 'Boost', items: ['All Launch features', 'Blog publishing guide', 'SEO optimization tips', 'Monthly reports'] },
  { plan: 'Growth', items: ['All Boost features', 'Marketing strategy guides', 'Email marketing setup', 'Growth metrics'] },
  { plan: 'Platinum', items: ['All Growth features', 'E-commerce setup', 'Payment processing', 'Advanced features'] },
]

export const HELP_TROUBLESHOOTING = [
  { issue: "Can't log in?", topic: 'Account and security' },
  { issue: "Website won't load?", topic: 'Website editor' },
  { issue: 'Payment not working?', topic: 'E-commerce and payments' },
  { issue: 'Email not working?', topic: 'Domains and email' },
  { issue: 'Not ranking on Google?', topic: 'SEO and marketing' },
  { issue: 'Billing questions?', topic: 'Billing and plans' },
]

export const HELP_KNOWLEDGE_BASE = [
  { group: 'Website Building', items: ['Page creation and management', 'Content optimization', 'Design customization', 'Template selection'] },
  { group: 'Marketing', items: ['SEO best practices', 'Blog strategy', 'Local SEO', 'Traffic growth'] },
  { group: 'E-Commerce', items: ['Product management', 'Payment processing', 'Order fulfillment', 'Inventory tracking'] },
  { group: 'Account', items: ['Login and access', 'Password management', 'Security settings', 'Account recovery'] },
  { group: 'Technical', items: ['Domain configuration', 'Email setup', 'Analytics integration', 'Third-party tools'] },
]

export const HELP_BEST_PRACTICES = [
  { group: 'Website Design', items: ['Keep design clean and professional', 'Use plenty of white space', 'Make navigation clear', 'Optimize images', 'Test on mobile'] },
  { group: 'Content', items: ['Write for your customers', 'Use clear headings', 'Keep paragraphs short', 'Include images', 'Update regularly'] },
  { group: 'SEO', items: ['Use keywords naturally', 'Write substantial content (300+ words)', 'Build quality backlinks', 'Publish regularly', 'Monitor rankings'] },
  { group: 'Conversions', items: ['Clear call-to-action', 'Easy contact forms', 'Trust signals', 'Fast page load', 'Mobile optimization'] },
]

export const HELP_QUICK_LINKS = [
  { topic: 'Starting your website', goTo: 'Getting started' },
  { topic: 'Editing pages', goTo: 'Website editor' },
  { topic: 'Setting up domain', goTo: 'Domains and email' },
  { topic: 'Email accounts', goTo: 'Domains and email' },
  { topic: 'Your plan', goTo: 'Billing and plans' },
  { topic: 'Accepting payments', goTo: 'E-commerce and payments' },
  { topic: 'Google rankings', goTo: 'SEO and marketing' },
  { topic: 'Login issues', goTo: 'Account and security' },
  { topic: 'Password reset', goTo: 'Account and security' },
]

export type Channel = {
  title: string; value: string; note: string; icon: string
  bg: string; line: string; shadow: string; iconBg: string; iconInk: string; ink: string; valueInk: string; muted: string
}

export const HELP_CHANNELS: Channel[] = [
  { title: 'WhatsApp', value: '+92 303 372 0953', note: 'The fastest way to reach a real person. Same working day, usually within the hour.',
    icon: 'M12 3.2a8.7 8.7 0 0 0-7.4 13.3L3.4 21l4.6-1.2A8.7 8.7 0 1 0 12 3.2Z',
    bg: 'linear-gradient(160deg, rgba(0,51,102,0.96), rgba(0,28,51,0.96))', line: 'rgba(255,255,255,0.18)',
    shadow: '0 22px 50px rgba(4,18,31,0.28), inset 0 1px 0 rgba(255,255,255,0.2)',
    iconBg: 'rgba(37,211,102,0.18)', iconInk: '#25D366', ink: '#FFFFFF', valueInk: 'var(--butter)', muted: 'rgba(226,236,245,0.6)' },
  { title: 'Call us', value: '+92 303 372 0953', note: 'Monday to Saturday, 11am to 8pm Pakistan time.',
    icon: 'M6.5 4h3l1.5 3.6-2 1.4a10 10 0 0 0 5.5 5.5l1.4-2L19.5 14v3a1.6 1.6 0 0 1-1.8 1.6A14 14 0 0 1 5 6.3 1.6 1.6 0 0 1 6.5 4Z',
    bg: 'rgba(255,255,255,0.62)', line: 'rgba(255,255,255,0.85)',
    shadow: '0 16px 40px rgba(4,18,31,0.07), inset 0 1px 0 rgba(255,255,255,0.9)',
    iconBg: 'var(--butter)', iconInk: '#3D3A08', ink: '#04121F', valueInk: 'var(--navy)', muted: '#6A7F92' },
  { title: 'Email us', value: 'office@matjarx.com', note: 'Best for detailed questions, documents and anything with attachments.',
    icon: 'M4 6h16v12H4zM4 7l8 6 8-6',
    bg: 'rgba(255,255,255,0.62)', line: 'rgba(255,255,255,0.85)',
    shadow: '0 16px 40px rgba(4,18,31,0.07), inset 0 1px 0 rgba(255,255,255,0.9)',
    iconBg: 'var(--butter)', iconInk: '#3D3A08', ink: '#04121F', valueInk: 'var(--navy)', muted: '#6A7F92' },
  { title: 'Gulf clients', value: 'Book a call slot', note: 'Connect support to schedule a call in your own time zone — UAE, Saudi or Qatar.',
    icon: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5',
    bg: 'rgba(242,238,226,0.6)', line: 'rgba(255,255,255,0.7)',
    shadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
    iconBg: 'var(--navy)', iconInk: 'var(--butter)', ink: '#04121F', valueInk: 'var(--olive)', muted: '#6A7F92' },
]

export const HELP_SUBJECTS = ['A new website', 'Billing question', 'Website editor', 'SEO & Google', 'Something else']

export const HELP_CONTACT_ROWS = [
  { label: 'Address', value: 'B6, 4th Street, Zamzama, Clifton, Karachi.', note: '', icon: 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' },
  { label: 'Hours', value: 'Monday – Saturday, 11am to 8pm.', note: '', icon: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 8v4.5l3 2' },
  { label: 'Gulf clients', value: 'Connect support to schedule.', note: 'We work your time zone — ask for a UAE, Saudi or Qatar call slot.', icon: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5' },
  { label: 'Existing clients', value: 'Message your concierge from the dashboard for a reply within four working hours.', note: '', icon: 'M4.5 5.5h15v10h-9L6 19.5v-4H4.5z' },
]
