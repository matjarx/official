// Data for the Industry pages — from Marketing - Website For Industry.dc.html
// (restaurants) / Website For Boutiques.dc.html / Website For Clinics.dc.html.
// All three variants' data ships in one source file's class, driven by a
// prop — this is the same shape, just split out so new industries are a
// data entry + one thin route file, not a new template.

import { routes } from './routes'

const ICONS = {
  book: 'M5 5.5h14v14H5zM5 10h14M9 3.5v4M15 3.5v4',
  menu: 'M4 6h16M4 12h10M4 18h13',
  cart: 'M4 6h2.2l2.3 9.5h9L20 8H7M9.5 20a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z',
  pin: 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  star: 'M12 4l2.4 5.2 5.6.5-4.3 3.7 1.3 5.6L12 16l-5 3 1.3-5.6L4 9.7l5.6-.5Z',
  gallery: 'M4 5.5h16v13H4zM8.3 10.6a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM4 16.2l4.6-4.2 4.4 3.9 2.6-2.4L20 17',
  whatsapp: 'M12 3.2a8.7 8.7 0 0 0-7.4 13.3L3.4 21l4.6-1.2A8.7 8.7 0 1 0 12 3.2Z',
  form: 'M4 5.5h16v13H4zM8 9.5h8M8 13h5',
  doc: 'M7 3.5h7l4 4v13H7zM14 3.5v4h4M10 13h6M10 16.5h4',
  truck: 'M3.5 7h10v9h-10zM13.5 11h4l3 3v2h-7zM7 19a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Zm10 0a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Z',
  shield: 'M12 3.5 4.5 6.5v5c0 4.4 3.1 7.6 7.5 9 4.4-1.4 7.5-4.6 7.5-9v-5Z',
}

export type IndustryKey = 'restaurants' | 'boutiques' | 'clinics'

export const INDUSTRY_SLUGS: Record<IndustryKey, string> = {
  restaurants: 'restaurants',
  boutiques: 'boutiques',
  clinics: 'clinics',
}

export type IndustryFeature = { title: string; body: string; icon: string }
export type IndustryTile = { label: string; tint: string }

export const INDUSTRY_DATA: Record<IndustryKey, {
  name: string; lower: string; built: string; subhead: string
  ticks: string[]; tint: string
  sample: { domain: string; kicker: string; name: string; blurb: string; cta: string; tiles: IndustryTile[] }
  needsTitle: string; features: IndustryFeature[]
  quote: string; quoteName: string; quoteCompany: string
  results: { value: string; label: string }[]
  faqs: [string, string][]
}> = {
  restaurants: {
    name: 'Restaurants', lower: 'restaurants', built: '1,240 restaurant websites built',
    subhead: "Table bookings, a menu people can actually read on a phone, and a Google listing that shows you're open. Built by a team that has done it for over a thousand restaurants.",
    ticks: ['Online table bookings', 'Live menu, edit any time', 'Google Maps + reviews'],
    tint: 'linear-gradient(150deg, #8E1B22, #2A0709)',
    sample: { domain: 'celestialdelicacies.pk', kicker: 'Now taking reservations', name: 'Celestial Delicacies', blurb: 'Fine dining in Clifton. Reserve a table, or let us cater your next event.', cta: 'Book a table',
      tiles: [{ label: 'Menu', tint: 'linear-gradient(150deg, #E8C48D, #C89A5C)' }, { label: 'Gallery', tint: 'linear-gradient(150deg, #C0392B, #5B140D)' }, { label: 'Book', tint: 'linear-gradient(150deg, #707538, #C6CB8A)' }] },
    needsTitle: 'Six things every restaurant website has to get right',
    features: [
      { title: 'Bookings that reach you', body: 'A reservation form that lands in your inbox and on your phone, with the covers, time and any note the guest left.', icon: ICONS.book },
      { title: 'A menu, not a PDF', body: 'Prices and dishes you can change yourself in seconds. No pinch-and-zoom on a photographed laminate sheet.', icon: ICONS.menu },
      { title: 'Photos that sell the food', body: "Gallery layouts built for food photography, and we'll tell you honestly if your current photos are letting you down.", icon: ICONS.gallery },
      { title: 'Google Maps and reviews', body: 'Verified listing, opening hours that are actually right, and your best reviews pulled onto the homepage.', icon: ICONS.pin },
      { title: 'Online ordering', body: 'Cash on delivery, JazzCash and Easypaisa built in, with 0% commission from us — unlike the delivery apps.', icon: ICONS.cart },
      { title: 'WhatsApp enquiries', body: 'A tappable button so a customer asking about a large booking reaches you in one move, not three.', icon: ICONS.whatsapp },
    ],
    quote: 'Bookings went up three times over in the first two months. The menu I can change myself in a minute, which matters when prices move.',
    quoteName: 'Celestial Delicacies', quoteCompany: 'Karachi',
    results: [{ value: '3×', label: 'increase in table bookings' }, { value: '142', label: 'Google profile views a week' }, { value: '7 days', label: 'from brief to live site' }],
    faqs: [
      ['Can customers order food directly from the site?', 'Yes. You can take orders with cash on delivery, JazzCash, Easypaisa or PayFast, and we charge no commission on any of it.'],
      ['How do bookings reach me?', 'By email and WhatsApp the moment they come in, and they appear in your dashboard under Leads so nothing gets lost during service.'],
      ['Can I change the menu myself?', "Yes, in seconds, from your phone. Or send it to your concierge and we'll do it — unlimited on Boost and above."],
      ['Do you photograph the food?', "Not directly, but we'll tell you what shots you need and can recommend a food photographer in your city."],
    ],
  },
  boutiques: {
    name: 'Boutiques', lower: 'boutiques', built: '3,600 boutique and retail websites built',
    subhead: 'A webstore that handles unstitched suits, size guides, colour variants and cash on delivery — with 0% commission and an Instagram feed that keeps itself current.',
    ticks: ['Full webstore', 'COD, JazzCash, Easypaisa', 'Instagram feed built in'],
    tint: 'linear-gradient(150deg, #7A2E6B, #2A0F24)',
    sample: { domain: 'eleganceembroidery.pk', kicker: 'New winter collection', name: 'Elegance Embroidery', blurb: 'Hand-embroidered suits and dupattas, delivered nationwide with cash on delivery.', cta: 'Shop now',
      tiles: [{ label: 'Chikankari', tint: 'linear-gradient(150deg, #E8B4C8, #B0708C)' }, { label: 'Dupattas', tint: 'linear-gradient(150deg, #C8B4E8, #7A5EB0)' }, { label: 'Sale', tint: 'linear-gradient(150deg, #C4262E, #6B0F14)' }] },
    needsTitle: "What a boutique site has to do that a template won't",
    features: [
      { title: 'Variants that make sense', body: "Colour, size and fabric handled properly, with stock per variant so you're not selling something you ran out of last week.", icon: ICONS.cart },
      { title: 'Cash on delivery, done right', body: 'COD is most of Pakistani online retail. We set it up with order confirmation so your RTO rate stays low.', icon: ICONS.truck },
      { title: 'Size guides that reduce returns', body: 'Clear measurements per garment, in inches and centimetres, shown at the point of decision rather than buried in a policy page.', icon: ICONS.doc },
      { title: 'Instagram feed built in', body: 'Your latest posts on the homepage automatically, so the site never looks abandoned between collections.', icon: ICONS.gallery },
      { title: 'Wholesale and retail pricing', body: 'Two price tiers if you sell both ways, with a bulk enquiry form for shop buyers.', icon: ICONS.form },
      { title: 'Reviews that build trust', body: 'Verified customer reviews per product, collected automatically after delivery.', icon: ICONS.star },
    ],
    quote: 'Third repeat order from the same buyers. Having the sizes and the colours right on the page stopped most of the WhatsApp back-and-forth.',
    quoteName: 'Elegance Embroidery', quoteCompany: 'Zainab Market, Karachi',
    results: [{ value: '400+', label: 'products listed' }, { value: '0%', label: 'commission on sales' }, { value: '6 days', label: 'to launch' }],
    faqs: [
      ['How many products can I list?', 'Up to 100 comfortably on Growth, and unlimited on Platinum. We load the first batch for you from your photos and price list.'],
      ['Does it work with cash on delivery?', 'Yes, and we set up order confirmation to cut down on refused deliveries — the single biggest cost in Pakistani online retail.'],
      ['Can I sell wholesale and retail from one site?', 'Yes. Two price tiers with a separate bulk enquiry route for shop buyers.'],
      ['What about Instagram?', 'Your feed embeds on the homepage and product pages, and we can syndicate your catalogue to Instagram Shopping on Boost and above.'],
    ],
  },
  clinics: {
    name: 'Clinics', lower: 'clinics and doctors', built: '890 clinic and practice websites built',
    subhead: 'Appointment booking, doctor profiles, and the trust signals patients look for before they call. Built to load fast on a phone and rank for your area.',
    ticks: ['Appointment booking', 'Doctor profiles', 'Local SEO for your area'],
    tint: 'linear-gradient(150deg, #1B5E6E, #062730)',
    sample: { domain: 'sacredwellness.pk', kicker: 'Appointments open this week', name: 'Sacred Wellness Clinic', blurb: 'Consultations, physiotherapy and wellness programmes in Model Town, Lahore.', cta: 'Book an appointment',
      tiles: [{ label: 'Services', tint: 'linear-gradient(150deg, #8FB4C8, #4E7E96)' }, { label: 'Our doctors', tint: 'linear-gradient(150deg, #C6CB8A, #707538)' }, { label: 'Contact', tint: 'linear-gradient(150deg, #2E6EA8, #10365A)' }] },
    needsTitle: 'What patients look for before they pick up the phone',
    features: [
      { title: 'Appointment booking', body: 'Patients pick a doctor, a day and a slot. You get it by email and WhatsApp; they get a confirmation.', icon: ICONS.book },
      { title: 'Doctor profiles', body: "Qualifications, specialisms and languages spoken. This is the page patients read most and most clinic sites don't have it.", icon: ICONS.form },
      { title: 'Services and fees', body: "Clear consultation fees and what's included. Being upfront reduces no-shows and time-wasting calls.", icon: ICONS.doc },
      { title: 'Found in your area', body: 'Verified Google Maps listing with correct hours, so "clinic near me" searches actually find you.', icon: ICONS.pin },
      { title: 'Patient reviews', body: 'Collected after visits and shown on the homepage — the strongest trust signal a clinic has.', icon: ICONS.star },
      { title: 'Privacy handled properly', body: "Consent notices, a privacy policy written for patient data, and forms that don't email sensitive details in plain text.", icon: ICONS.shield },
    ],
    quote: "The level of service is really good, and I'm getting loads of leads now. Patients book online instead of calling during clinic hours.",
    quoteName: 'Shahzad Ilyas', quoteCompany: 'Sacred Tantra & Wellness',
    results: [{ value: '21', label: 'calls a week from Google' }, { value: '3', label: 'areas ranking locally' }, { value: '7 days', label: 'from brief to live site' }],
    faqs: [
      ['Can patients book appointments online?', 'Yes — by doctor, day and time slot, with confirmation to both sides. Multi-seat and multi-location booking is available on Platinum.'],
      ['Is patient data handled safely?', "Forms are submitted over SSL and delivered to your chosen inbox; we don't store patient details on our platform. We'll also write you a privacy policy covering it."],
      ['Can I list several doctors?', 'Yes, each with their own profile page, specialisms and bookable availability.'],
      ['Will it help us rank for our neighbourhood?', "That's what the local SEO work is for — Google Business Profile, Maps, area pages and reviews. Included from Boost upwards."],
    ],
  },
}

export function otherIndustriesFor(key: IndustryKey) {
  return (Object.keys(INDUSTRY_DATA) as IndustryKey[])
    .filter((k) => k !== key)
    .map((k) => ({ label: INDUSTRY_DATA[k].name, href: routes.industry(INDUSTRY_SLUGS[k]) }))
}
