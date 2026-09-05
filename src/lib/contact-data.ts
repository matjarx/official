// Data for the Contact page — from Marketing - Contact.dc.html

export type ContactChannel = {
  title: string; value: string; note: string; href: string; icon: string
  bg: string; border: string; shadow: string; iconBg: string; iconInk: string; ink: string; valueInk: string; muted: string
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  { title: 'Call us', value: '+92 303 372 0953', note: 'Monday to Saturday, 11am to 8pm PKT.', href: 'tel:+923033720953',
    icon: 'M6.5 4h3l1.5 3.6-2 1.4a10 10 0 0 0 5.5 5.5l1.4-2L19.5 14v3a1.6 1.6 0 0 1-1.8 1.6A14 14 0 0 1 5 6.3 1.6 1.6 0 0 1 6.5 4Z',
    bg: '#FFFFFF', border: 'rgba(4,18,31,0.1)', shadow: '0 10px 28px rgba(4,18,31,0.05)',
    iconBg: 'var(--butter)', iconInk: '#3D3A08', ink: '#04121F', valueInk: 'var(--navy)', muted: '#6A7F92' },
  { title: 'WhatsApp', value: 'Chat with us now', note: 'The fastest way to reach a real person — usually within 2-4 hours.', href: 'https://wa.me/923033720953',
    icon: 'M12 3.2a8.7 8.7 0 0 0-7.4 13.3L3.4 21l4.6-1.2A8.7 8.7 0 1 0 12 3.2Z',
    bg: 'var(--navy)', border: 'var(--navy)', shadow: '0 20px 44px rgba(0,51,102,0.26)',
    iconBg: 'rgba(198,203,138,0.2)', iconInk: 'var(--moss-light)', ink: '#FFFFFF', valueInk: 'var(--butter)', muted: 'rgba(255,255,255,0.6)' },
  { title: 'Email us', value: 'office@matjarx.com', note: 'Detailed questions and documents welcome. We reply within 24 business hours.', href: 'mailto:office@matjarx.com',
    icon: 'M4 6h16v12H4zM4 7l8 6 8-6',
    bg: '#FFFFFF', border: 'rgba(4,18,31,0.1)', shadow: '0 10px 28px rgba(4,18,31,0.05)',
    iconBg: 'var(--butter)', iconInk: '#3D3A08', ink: '#04121F', valueInk: 'var(--navy)', muted: '#6A7F92' },
]

export const CONTACT_TOPICS = ['A new website', 'Pricing question', 'SEO & Google', 'Existing site help', 'Partnership']

export const CONTACT_OFFICE_ROWS = [
  { label: 'Address', value: 'B6, 4th Street, Zamzama, Clifton, Karachi', icon: 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' },
  { label: 'Hours', value: 'Monday to Saturday, 11am to 8pm PKT', icon: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 8v4.5l3 2' },
  { label: 'Gulf clients', value: 'We work your time zone — ask for a UAE or Saudi call slot', icon: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5' },
  { label: 'Existing clients', value: 'Message your concierge from the dashboard for a reply within four working hours', icon: 'M4.5 5.5h15v10h-9L6 19.5v-4H4.5z' },
]

export const CONTACT_SUPPORT_CATEGORIES = [
  { title: 'Sales & Pricing Questions', body: 'Want to know more about our plans or services?', items: ['Questions about Boost, Growth, or Platinum plans', 'Pricing and payment options', 'Service comparisons', 'Custom project inquiries'], contact: 'WhatsApp or Live Chat (fastest)' },
  { title: 'Billing & Payments', body: 'Questions about invoices, payments, or billing?', items: ['Invoice clarification', 'Payment methods and options', 'Billing cycle questions', 'Payment receipts'], contact: 'Email (office@matjarx.com) for documentation' },
  { title: 'Technical Support', body: 'Website issues, bugs, or technical problems?', items: ['Website not loading', 'Features not working', 'Design or functionality issues', 'Editor questions'], contact: 'WhatsApp or Phone (VIP/Platinum get priority)' },
  { title: 'Refunds & Cancellations', body: 'Have a question about refunds or canceling your service?', items: ['Refund eligibility', 'Refund process and timeline', 'Cancellation procedures', 'Service suspension issues'], contact: 'Email (office@matjarx.com) with details' },
  { title: 'Content & Updates', body: 'Need changes to your website content?', items: ['Blog post publishing', 'Content edits and updates', 'Page changes', 'Photo and video uploads'], contact: 'WhatsApp or dashboard (for Concierge clients)' },
  { title: 'SEO & Marketing', body: 'Questions about SEO, marketing, or growth strategies?', items: ['SEO performance questions', 'Marketing strategy discussions', 'Blog and content requests', 'Google rankings and traffic'], contact: 'WhatsApp for Growth/Platinum members' },
  { title: 'Legal & Compliance', body: 'Privacy, data, or compliance questions?', items: ['Data privacy inquiries', 'GDPR/compliance questions', 'Legal document requests', 'Website content compliance'], contact: 'Email (office@matjarx.com)' },
]

export const CONTACT_SUMMARY_TABLE = {
  headers: ['Channel', 'Details', 'Best for', 'Response time'],
  rows: [
    ['WhatsApp', '+92 303 372 0953', 'Quick questions, sales', '2-4 hours'],
    ['Phone', '+92 303 372 0953', 'Urgent issues, complex discussions', 'As available'],
    ['Email', 'office@matjarx.com', 'Documentation, billing, formal requests', '24 hours'],
    ['Live Chat', 'On matjarx.com', 'Quick clarifications, browsing', 'During business hours'],
    ['Mailing Address', 'B6, 4th Street, Zamzama, Clifton, Karachi', 'Official correspondence', 'Variable'],
  ],
}

export const CONTACT_PREP_CHECKLIST = [
  'Your website URL or project name (if existing customer)',
  'Invoice number (for billing questions)',
  'Specific error message (for technical issues)',
  'Details about your issue — the more specific, the faster we can help',
  'Photos or screenshots (if describing a visual issue)',
]

export const CONTACT_PREFERRED_CHANNEL = [
  { title: 'Quick / urgent', items: ['WhatsApp is fastest', 'Live chat for quick questions', 'Phone for emergencies'] },
  { title: 'Documentation needed', items: ['Email — creates a record', 'Formal requests or legal matters'] },
  { title: 'Detailed discussion', items: ['Phone call for complex topics', 'Video call for Growth/Platinum', 'Multiple WhatsApp messages if on-the-go'] },
  { title: 'Billing / refunds', items: ['Email for documentation', 'Follow up with WhatsApp if urgent'] },
]

export const CONTACT_COMMITMENT = [
  { title: 'Professional response', items: ['Courteous, helpful team members', 'Knowledgeable staff who understand our service', 'Patient with questions — no question is stupid'] },
  { title: 'Timely response', items: ['Most replies within 24 business hours', 'WhatsApp usually faster (2-4 hours)', 'Emergency prioritization for critical issues'] },
  { title: 'Real solutions', items: ["We don't just acknowledge problems — we fix them", 'Follow-up until your issue is resolved', 'Escalation to management if needed'] },
  { title: 'Transparency', items: ["Honest about what's possible or impossible", 'Clear explanations of issues and solutions', 'Upfront about timelines and costs'] },
]

export const CONTACT_FAQS: [string, string][] = [
  ["What's the fastest way to reach you?", 'WhatsApp is typically fastest for general inquiries. We usually respond within 2-4 hours during business hours. Live chat on our website is also quick during business hours.'],
  ["What's your response time?", 'Average response time is 24 business hours. WhatsApp and phone are usually faster, within 2-4 hours. Email may take up to 24 hours.'],
  ['Do you offer 24/7 support?', "Not for general support. We're available Monday to Saturday, 11am to 8pm PKT. VIP and Platinum clients get priority emergency support for critical website issues outside these hours."],
  ['How do I report a website emergency?', 'Call us immediately at +92 303 372 0953 or send a WhatsApp message. Website downtime, hacking, or critical functionality errors get priority attention, especially for paid plan members.'],
  ["I need help but it's Sunday. What do I do?", "For non-emergencies, send an email or WhatsApp message — we'll respond the next business day. For true emergencies affecting your business, such as the website being down or hacked, call us."],
  ['Do you offer video call support?', 'Yes, for Growth and Platinum members. Monthly strategy calls are included in these plans — contact your account manager to schedule.'],
  ['Can I schedule a consultation call?', 'Yes. Email office@matjarx.com or WhatsApp +92 303 372 0953 to schedule. Consultations are available for prospective customers and upgrade discussions.'],
  ['What languages do you support?', 'English and Urdu. Our team is bilingual, so you can communicate in either language.'],
  ['How do I track my support ticket?', "For email inquiries, you'll receive a response directly. For WhatsApp, our team keeps track of the conversation. For complex issues, we may provide a reference number."],
  ['What if I have a complaint?', "We'd like to hear it. Send details to office@matjarx.com with \"Complaint\" in the subject line. Our leadership team reviews complaints and responds within 2-3 business days."],
  ['Can I request a specific team member?', "If you have an assigned account manager (Growth or Platinum), request them directly. For new inquiries, we'll connect you with the appropriate team member."],
]
