// Data for the Location pages — from Marketing - Website Design City.dc.html
// (Karachi) / ...Lahore.dc.html / ...Islamabad.dc.html — all three ship in
// one source file's class, driven by a prop. Six feature cards are shared
// across every city (parameterised by city name); everything else is
// per-city real data.

import { routes } from './routes'

const ICONS = {
  pin: 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  cart: 'M4 6h2.2l2.3 9.5h9L20 8H7M9.5 20a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z',
  speed: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 8v4.5l3 2',
  star: 'M12 4l2.4 5.2 5.6.5-4.3 3.7 1.3 5.6L12 16l-5 3 1.3-5.6L4 9.7l5.6-.5Z',
  whatsapp: 'M12 3.2a8.7 8.7 0 0 0-7.4 13.3L3.4 21l4.6-1.2A8.7 8.7 0 1 0 12 3.2Z',
  search: 'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM16 16l4.5 4.5',
}

export function sharedLocationFeatures(city: string) {
  return [
    { title: `Found in ${city}, not nationally`, body: 'A verified Google Business Profile and Maps listing tuned to your actual neighbourhood, so "near me" searches reach you rather than a competitor two districts away.', icon: ICONS.pin },
    { title: 'Area pages that rank', body: 'Separate pages for the areas you serve, written properly rather than the same paragraph with the place name swapped. Google notices the difference.', icon: ICONS.search },
    { title: 'Built for local payment', body: 'JazzCash, Easypaisa, PayFast and cash on delivery configured from day one, with 0% commission from us.', icon: ICONS.cart },
    { title: 'Fast on local mobile data', body: 'Your customers are on 4G, not fibre. We optimise images and page weight for the connection people actually browse on.', icon: ICONS.speed },
    { title: 'Reviews from real customers', body: 'Automated review invitations after each sale or visit, with the best ones surfaced on your homepage.', icon: ICONS.star },
    { title: 'WhatsApp as the main channel', body: "A tappable WhatsApp button and lead routing, because in Pakistan that's where the enquiry actually happens.", icon: ICONS.whatsapp },
  ]
}

export type LocationKey = 'karachi' | 'lahore' | 'islamabad'

export const LOCATION_DATA: Record<LocationKey, {
  name: string; built: string; subhead: string; ticks: string[]
  stats: { value: string; label: string }[]; tint: string
  areasLine: string; areas: string[]; areasNote: string
  quote: string; quoteName: string; quoteCompany: string
  wins: string[]; officeLine: string
  faqs: [string, string][]
}> = {
  karachi: {
    name: 'Karachi',
    built: '2,400+ Karachi businesses online with MatjarX',
    subhead: "We build complete websites for Karachi shops, clinics, restaurants and wholesalers — written, designed and launched by our team in seven days. Our office is on Zamzama Boulevard, so we can meet in person if you'd rather.",
    ticks: ['Office in Clifton', 'Live in 7 days', 'From Rs. 22,500'],
    stats: [
      { value: '2,400+', label: 'Karachi websites built' },
      { value: '7 days', label: 'average launch time' },
      { value: '4.8 / 5', label: 'client rating' },
      { value: 'In person', label: 'meetings available' },
    ],
    tint: 'linear-gradient(150deg, #1B4B6E, #0A2233)',
    areasLine: 'Clifton · DHA · Gulshan · Saddar · Korangi',
    areas: ['Clifton', 'DHA Phase 1–8', 'Zamzama', 'Saddar', 'Gulshan-e-Iqbal', 'North Nazimabad', 'Korangi', 'Malir', 'Shahrah-e-Faisal', 'Tariq Road', 'Zainab Market', 'SITE Area', 'Bahadurabad', 'Gulistan-e-Johar'],
    areasNote: 'Whether you run a boutique in Zainab Market, a clinic in DHA or a factory in SITE, the site is written for the customers in that area — not a generic Karachi paragraph.',
    quote: 'Ranks first on Google for Chinese restaurant catering in Karachi now. The team understood the market here without us explaining it.',
    quoteName: 'China Friend', quoteCompany: 'Karachi',
    wins: [
      '#1 for "restaurant catering Karachi" within four months',
      '142 Google profile views a week from Clifton and DHA',
      '21 calls a week straight from the Maps listing',
    ],
    officeLine: 'Visit us at 6c, Ln 4, Zamzama Boulevard, Clifton — Monday to Friday, 11am to 8pm.',
    faqs: [
      ['Do you meet clients in person in Karachi?', "Yes. Our office is at 6c, Ln 4, Zamzama Boulevard, Clifton, open Monday to Friday 11am to 8pm. Most clients prefer WhatsApp and a call, but you're welcome to come in."],
      ['How much does a website cost in Karachi?', 'Rs. 22,500 one-time to build it, then Rs. 4,500 a month including hosting, domain, business email and support. Local agencies typically quote Rs. 400,000 or more for the build alone.'],
      ['Will my site rank for my area of Karachi?', "That's the point of the local SEO work — a verified Maps listing, area pages and review collection. Businesses in Clifton, DHA and Gulshan typically see movement inside eight weeks."],
      ['Can you take cash on delivery orders for Karachi?', 'Yes, plus JazzCash, Easypaisa and PayFast. We also set up order confirmation to reduce refused deliveries, which is the biggest hidden cost in local e-commerce.'],
    ],
  },
  lahore: {
    name: 'Lahore',
    built: '1,900+ Lahore businesses online with MatjarX',
    subhead: "Websites for Lahore's wholesalers, boutiques, restaurants and services — designed, written and launched by our team in seven days, with the local SEO work included.",
    ticks: ['Live in 7 days', 'Local SEO included', 'From Rs. 22,500'],
    stats: [
      { value: '1,900+', label: 'Lahore websites built' },
      { value: '7 days', label: 'average launch time' },
      { value: '4.8 / 5', label: 'client rating' },
      { value: '0%', label: 'commission on sales' },
    ],
    tint: 'linear-gradient(150deg, #6B4A22, #2A1A08)',
    areasLine: 'Gulberg · DHA · Model Town · Johar Town',
    areas: ['Gulberg', 'DHA Lahore', 'Model Town', 'Johar Town', 'Bahria Town', 'Cantt', 'Faisal Town', 'Garden Town', 'Iqbal Town', 'Shadman', 'Anarkali', 'Azam Cloth Market', 'Township', 'Wapda Town'],
    areasNote: "Lahore's trade is concentrated by area — fabric in Azam Cloth Market, services in Gulberg, clinics in Model Town. We write and structure the site for the customers who actually search in your part of the city.",
    quote: '"Fabric supplier lahore" moved from nineteenth to eleventh in a month, and the enquiries followed it.',
    quoteName: 'Al-Falah Traders', quoteCompany: 'Lahore',
    wins: [
      '4,812 monthly visitors, up 18% on the previous month',
      '96 enquiries a month, 34 of which became orders',
      'Ranking in three Lahore areas within two months',
    ],
    officeLine: 'Lahore clients work with us over WhatsApp and video call — call +92 303 372 0953, Monday to Friday, 11am to 8pm.',
    faqs: [
      ['Do you have a Lahore office?', 'Our office is in Karachi, but Lahore is our second largest client base. Everything runs over WhatsApp, email and video call — including your launch and training session.'],
      ['How much does a website cost in Lahore?', 'Rs. 22,500 one-time, then Rs. 4,500 a month with hosting, domain, business email and support included.'],
      ['Can you handle wholesale and bulk enquiries?', "Yes — rate tables, per-metre and per-bale pricing, and bulk enquiry forms routed to your WhatsApp. It's one of the most common things we build for Lahore."],
      ['Will you set up my Google listing?', 'Yes, created and verified for you, with your area, hours and services. Included from Boost upwards, and set up on Launch too.'],
    ],
  },
  islamabad: {
    name: 'Islamabad',
    built: '1,100+ Islamabad and Rawalpindi businesses online',
    subhead: "Professional websites for Islamabad's consultancies, clinics, caterers and retailers — built by our team, launched in seven days, and kept current by your concierge.",
    ticks: ['Live in 7 days', 'Twin-city coverage', 'From Rs. 22,500'],
    stats: [
      { value: '1,100+', label: 'twin-city websites built' },
      { value: '7 days', label: 'average launch time' },
      { value: '4.8 / 5', label: 'client rating' },
      { value: '4 hrs', label: 'concierge reply time' },
    ],
    tint: 'linear-gradient(150deg, #2A4A3A, #0C2018)',
    areasLine: 'Blue Area · F-6 · F-7 · Bahria · Rawalpindi',
    areas: ['Blue Area', 'F-6', 'F-7', 'F-10', 'F-11', 'G-9', 'I-8', 'Bahria Town', 'DHA Islamabad', 'Gulberg Greens', 'Saddar Rawalpindi', 'Bahria Phase 4', 'Chaklala', 'Satellite Town'],
    areasNote: 'Islamabad and Rawalpindi behave like two markets. We build for whichever one your customers are actually in, and cover both when you serve the twin cities.',
    quote: 'Quotes from agencies here were in the hundreds of thousands. MatjarX delivered in a week for a fraction, and the quality held up.',
    quoteName: 'Saeed Ahmed', quoteCompany: 'Caterer, Islamabad',
    wins: [
      'Enquiries doubled in the first quarter after launch',
      'Ranking for "catering Islamabad" inside ten weeks',
      'Bookings taken online instead of over the phone',
    ],
    officeLine: 'Islamabad and Rawalpindi clients work with us over WhatsApp and video call — call +92 303 372 0953, Monday to Friday, 11am to 8pm.',
    faqs: [
      ['Do you work with government or corporate clients?', "Yes. We handle procurement documentation and can invoice against a PO. Tell us your requirements up front and we'll confirm what we can meet."],
      ['How much does a website cost in Islamabad?', 'Rs. 22,500 one-time, then Rs. 4,500 a month. Local agencies in the Blue Area typically quote several hundred thousand for the build alone.'],
      ['Can you cover both Islamabad and Rawalpindi?', 'Yes — separate area pages and a Maps listing for each location if you serve both cities.'],
      ['Do you offer bookings for consultancies?', 'Yes. Consultation booking with your availability, confirmations to both sides, and multi-seat scheduling on Platinum.'],
    ],
  },
}

export function otherLocationsFor(key: LocationKey) {
  return (Object.keys(LOCATION_DATA) as LocationKey[])
    .filter((k) => k !== key)
    .map((k) => ({ label: LOCATION_DATA[k].name, href: routes.location(k) }))
}
