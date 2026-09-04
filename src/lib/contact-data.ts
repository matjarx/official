// Data for the Contact page — from Marketing - Contact.dc.html

export type ContactChannel = {
  title: string; value: string; note: string; href: string; icon: string
  bg: string; border: string; shadow: string; iconBg: string; iconInk: string; ink: string; valueInk: string; muted: string
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  { title: 'Call us', value: '+92 303 372 0953', note: 'Monday to Saturday, 10am to 8pm PKT.', href: 'tel:+923033720953',
    icon: 'M6.5 4h3l1.5 3.6-2 1.4a10 10 0 0 0 5.5 5.5l1.4-2L19.5 14v3a1.6 1.6 0 0 1-1.8 1.6A14 14 0 0 1 5 6.3 1.6 1.6 0 0 1 6.5 4Z',
    bg: '#FFFFFF', border: 'rgba(4,18,31,0.1)', shadow: '0 10px 28px rgba(4,18,31,0.05)',
    iconBg: 'var(--butter)', iconInk: '#3D3A08', ink: '#04121F', valueInk: 'var(--navy)', muted: '#6A7F92' },
  { title: 'WhatsApp', value: 'Chat with us now', note: 'The fastest way to reach a real person.', href: 'https://wa.me/923033720953',
    icon: 'M12 3.2a8.7 8.7 0 0 0-7.4 13.3L3.4 21l4.6-1.2A8.7 8.7 0 1 0 12 3.2Z',
    bg: 'var(--navy)', border: 'var(--navy)', shadow: '0 20px 44px rgba(0,51,102,0.26)',
    iconBg: 'rgba(198,203,138,0.2)', iconInk: 'var(--moss-light)', ink: '#FFFFFF', valueInk: 'var(--butter)', muted: 'rgba(255,255,255,0.6)' },
  { title: 'Email us', value: 'office@matjarx.com', note: 'Detailed questions and documents welcome.', href: 'mailto:office@matjarx.com',
    icon: 'M4 6h16v12H4zM4 7l8 6 8-6',
    bg: '#FFFFFF', border: 'rgba(4,18,31,0.1)', shadow: '0 10px 28px rgba(4,18,31,0.05)',
    iconBg: 'var(--butter)', iconInk: '#3D3A08', ink: '#04121F', valueInk: 'var(--navy)', muted: '#6A7F92' },
]

export const CONTACT_TOPICS = ['A new website', 'Pricing question', 'SEO & Google', 'Existing site help', 'Partnership']

export const CONTACT_OFFICE_ROWS = [
  { label: 'Address', value: 'B27, Street 7, Jt Society, Malir, Karachi', icon: 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' },
  { label: 'Hours', value: 'Monday to Saturday, 10am to 8pm PKT', icon: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 8v4.5l3 2' },
  { label: 'Gulf clients', value: 'We work your time zone — ask for a UAE or Saudi call slot', icon: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5' },
  { label: 'Existing clients', value: 'Message your concierge from the dashboard for a 4-hour reply', icon: 'M4.5 5.5h15v10h-9L6 19.5v-4H4.5z' },
]
