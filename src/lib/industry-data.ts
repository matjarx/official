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

export type IndustryKey =
  | 'restaurants' | 'boutiques' | 'clinics'
  | 'real-estate' | 'clinics-and-healthcare' | 'salons-and-spas' | 'gyms-and-fitness'
  | 'construction-companies' | 'law-firms' | 'online-stores-ecommerce'
  | 'wedding-and-event-planners' | 'auto-repair-shops'
  | 'b2b-clothing-manufacturer' | 'b2b-leather-goods-manufacturer'

export const INDUSTRY_SLUGS: Record<IndustryKey, string> = {
  restaurants: 'restaurants',
  boutiques: 'boutiques',
  clinics: 'clinics',
  'real-estate': 'real-estate',
  'clinics-and-healthcare': 'clinics-and-healthcare',
  'salons-and-spas': 'salons-and-spas',
  'gyms-and-fitness': 'gyms-and-fitness',
  'construction-companies': 'construction-companies',
  'law-firms': 'law-firms',
  'online-stores-ecommerce': 'online-stores-ecommerce',
  'wedding-and-event-planners': 'wedding-and-event-planners',
  'auto-repair-shops': 'auto-repair-shops',
  'b2b-clothing-manufacturer': 'b2b-clothing-manufacturer',
  'b2b-leather-goods-manufacturer': 'b2b-leather-goods-manufacturer',
}

export type IndustryFeature = { title: string; body: string; icon: string }
export type IndustryTile = { label: string; tint: string }

// The 3 original industries (restaurants/boutiques/clinics) carry the design
// handoff's handcrafted sample-site hero mockup, ticks, results stats and a
// guaranteed testimonial. The industries added from the real content package
// (files/matjarx_industry_*.md) carry a real headline/features/FAQ set but no
// invented sample site or stats — those fields are optional so
// IndustryContent degrades gracefully instead of fabricating a mockup site.
export const INDUSTRY_DATA: Record<IndustryKey, {
  name: string; lower: string; subhead: string; tint: string
  features: IndustryFeature[]; faqs: [string, string][]
  built?: string; ticks?: string[]
  sample?: { domain: string; kicker: string; name: string; blurb: string; cta: string; tiles: IndustryTile[] }
  needsTitle?: string; headline?: string
  quote?: string; quoteName?: string; quoteCompany?: string
  results?: { value: string; label: string }[]
  metaTitle?: string; metaDesc?: string
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
  "real-estate": {
    name: "Real Estate", lower: "real estate",
    subhead: "Stop losing deals to agents with better websites. Showcase your properties and get qualified leads automatically.",
    headline: "Your Property Listings. Available to Everyone. Anytime.",
    tint: "linear-gradient(150deg, #2E6EA8, #0F2E4A)",
    features: [{ title: "24/7 Listing Showcase", body: "All your properties displayed beautifully. Buyers find you online anytime, anywhere.", icon: ICONS.form }, { title: "Property Search", body: "Buyers filter by price, location, bedrooms. They self-qualify. You get qualified leads only.", icon: ICONS.doc }, { title: "Instant Inquiries", body: "Buyers interested in a property? They contact you directly from the listing. Automatic email notifications.", icon: ICONS.book }, { title: "Mobile-Optimized", body: "100% of buyers browsing on phones see professional layouts. No zooming or scrolling headaches.", icon: ICONS.pin }, { title: "Lead Magnet", body: "Capture buyers before they move to competitor websites. Automatic lead database.", icon: ICONS.star }, { title: "Agent Credibility", body: "Professional website = professional agent. Builds trust immediately.", icon: ICONS.gallery }],
    faqs: [["Can I auto-update listings from MLS?", "Yes! MLS integration available (pricing varies by MLS)."], ["How do I capture buyer leads?", "Automatic lead forms on each property. You get email notifications instantly."], ["Can I add virtual tours?", "Yes! Matterport, drone photos, and video tours supported."], ["What about sold properties?", "Sold listings visible as social proof. Shows your sales activity and success."], ["Can I add multiple agents?", "Yes! Each agent gets their own profile and listings. Growth/Platinum plans support multiple agents."]],
    metaTitle: "Real Estate Website - Property Listings & Agent Profiles", metaDesc: "Professional real estate website with property listings, search functionality, and agent profiles. Generate qualified leads 24/7.",
  },
  "clinics-and-healthcare": {
    name: "Clinics & Healthcare", lower: "clinics and healthcare practices",
    subhead: "Stop missing patients. Professional website with online appointments, doctor bios, and medical credentials that build immediate trust.",
    headline: "Your Medical Practice. Professional. Trustworthy. Online.",
    tint: "linear-gradient(150deg, #C0392B, #5B140D)",
    features: [{ title: "Patient Portal Integration", body: "Patients access medical records. Upload test results", icon: ICONS.form }, { title: "Multi-Doctor Management", body: "Individual doctor profiles. Different specialty pages", icon: ICONS.doc }, { title: "Insurance Integration", body: "Verify insurance in real-time. Submit claims automatically", icon: ICONS.book }, { title: "Prescription Management", body: "E-prescription capability. Patient prescription history", icon: ICONS.pin }, { title: "Lab Results & Imaging", body: "Secure patient portal for results. Doctor interpretation available", icon: ICONS.star }, { title: "Telemedicine Integration", body: "Virtual appointment capability. Video consultation scheduling", icon: ICONS.gallery }],
    faqs: [["Is my patient data secure?", "Yes! HIPAA compliant, encrypted, and secure. Patient privacy is paramount."], ["Can patients book appointments online?", "Yes! Automatic scheduling, confirmation emails, and reminders reduce no-shows."], ["Can I add multiple doctors?", "Yes! Each doctor gets their own profile with schedules and specialties."], ["Can I show insurance information?", "Yes! Display accepted insurances, verify coverage, and explain benefits."], ["Do patients need to create accounts?", "No! Appointment booking is fast and simple. Account is optional."]],
    metaTitle: "Medical Practice Website - Online Appointments & Patient Trust", metaDesc: "Professional healthcare website with online appointment booking, doctor credentials, and patient resources. Build trust and fill your appointment schedule.",
  },
  "salons-and-spas": {
    name: "Salons & Spas", lower: "salons and spas",
    subhead: "Stop leaving clients on the waiting list. Showcase your transformations, let clients book online, and build a loyal following.",
    headline: "Your Best Work. On Display. Booking Appointments.",
    tint: "linear-gradient(150deg, #7A2E6B, #2A0F24)",
    features: [{ title: "Portfolio Showcase", body: "Your best work on display 24/7. Clients see results BEFORE they call.", icon: ICONS.form }, { title: "Stylist Profiles", body: "Each stylist builds their own following. Clients book their favorite stylist.", icon: ICONS.doc }, { title: "Online Booking", body: "Clients book online, anytime. No more \"call back, I'll put you on the list\" conversations.", icon: ICONS.book }, { title: "Service Menu", body: "Clear pricing and services. No surprises. Clients come prepared.", icon: ICONS.pin }, { title: "Before/After Gallery", body: "Visual results are your best marketing. Every transformation gets someone booking.", icon: ICONS.star }, { title: "Build Loyalty", body: "Clients come back for the results they see online.", icon: ICONS.gallery }],
    faqs: [["How do I upload before/after photos?", "Simple uploader. Organize by stylist, service type, or style. Unlimited uploads."], ["Can multiple stylists take appointments?", "Yes! Each stylist has their own schedule and client followers."], ["Can I offer online gift certificates?", "Yes! Clients buy gift certificates online. Redeemable in salon."], ["Will this bring more walk-in traffic?", "Yes! Google visibility increases significantly. Plus online booking keeps chair full."], ["Can I create service packages?", "Yes! Package pricing, special combos, and loyalty packages."]],
    metaTitle: "Salon & Spa Website - Book Appointments & Showcase Transformations", metaDesc: "Professional salon website with before/after gallery, stylist profiles, and online booking. Fill your appointment chair every day.",
  },
  "gyms-and-fitness": {
    name: "Gyms & Fitness", lower: "gyms and fitness studios",
    subhead: "Stop losing prospects to gyms with better websites. Showcase member success stories and get fitness enthusiasts to sign up today.",
    headline: "Real Members. Real Transformations. Real Results.",
    tint: "linear-gradient(150deg, #1B7A3D, #08361B)",
    features: [{ title: "Member Transformations", body: "Real before/afters inspire prospects. Motivation is contagious.", icon: ICONS.form }, { title: "Trainer Expertise", body: "Trainer credentials, certifications, specializations build confidence.", icon: ICONS.doc }, { title: "Class Schedule", body: "Transparent schedule (and schedule changes) reduce confusion.", icon: ICONS.book }, { title: "Member Testimonials", body: "Real members talking about results, community, motivation.", icon: ICONS.pin }, { title: "Membership Options", body: "Clear pricing with no surprises. Easy to choose right plan.", icon: ICONS.star }, { title: "Gym Community", body: "Photos of members, events, challenges. Sense of belonging.", icon: ICONS.gallery }],
    faqs: [["Can members book classes online?", "Yes! Class booking with email reminder reduces no-shows 40%."], ["How do I get member before/afters?", "Request permission from members achieving results. Offer incentive if needed."], ["Can I showcase multiple trainers?", "Yes! Each trainer gets their own profile with their transformation stories."], ["Will this increase class attendance?", "Yes! Transparent schedule + online booking + community = higher attendance."], ["Can I run challenges?", "Yes! Create monthly challenges with leaderboards and prizes."]],
    metaTitle: "Gym Website - Class Schedules, Trainer Profiles & Membership", metaDesc: "Professional fitness gym website with class schedules, trainer profiles, and member transformations. Inspire new members to join and commit.",
  },
  "construction-companies": {
    name: "Construction", lower: "construction companies",
    subhead: "Stop competing on price alone. Professional website showcasing your completed projects builds credibility and wins contracts.",
    headline: "Your Best Work. Under Contract. Getting More Bids.",
    tint: "linear-gradient(150deg, #6B4A22, #2A1A08)",
    features: [{ title: "Project Portfolio", body: "Every completed project visible. Clients see quality immediately.", icon: ICONS.form }, { title: "Team Credentials", body: "Licenses, certifications, years of experience. Build trust.", icon: ICONS.doc }, { title: "Client Testimonials", body: "Real clients talking about quality, reliability, professionalism.", icon: ICONS.book }, { title: "Case Studies", body: "Detailed before/afters of projects with timelines and budgets.", icon: ICONS.pin }, { title: "Awards & Recognition", body: "Industry awards, certifications, memberships displayed prominently.", icon: ICONS.star }, { title: "Fast Response", body: "Online project inquiry forms = instant lead capture. Respond faster than competitors.", icon: ICONS.gallery }],
    faqs: [["How do I show confidential projects?", "Use generic descriptions or client permission. Focus on work type and quality."], ["Should I show pricing?", "Service-based pricing vague; project-specific quotes via contact form."], ["How do I get project photos?", "Take during progress and completion. Request permission from clients."], ["Will this really get more bids?", "Yes! Professionalism increases bid inquiries significantly."], ["Can I showcase subcontractors?", "Yes! Show your network and specialization access."]],
    metaTitle: "Construction Company Website - Project Portfolio & Contractor Credibility", metaDesc: "Professional construction website with project portfolio, team credentials, and client testimonials. Win more contracts and build your reputation.",
  },
  "law-firms": {
    name: "Law Firms", lower: "law firms",
    subhead: "Clients searching for lawyers online. Professional website with attorney expertise and practice areas gets you found and builds trust immediately.",
    headline: "Trusted Legal Representation. Proven Results. Available Today.",
    tint: "linear-gradient(150deg, #4A2C8E, #1A0F3A)",
    features: [{ title: "Attorney Credentials", body: "Bar admissions, education, certifications visible immediately", icon: ICONS.form }, { title: "Practice Area Expertise", body: "Clear which lawyer handles which practice area", icon: ICONS.doc }, { title: "Case Results", body: "Settlement amounts (anonymized), case types won, outcomes achieved", icon: ICONS.book }, { title: "Client Testimonials", body: "Real clients talking about outcomes and service quality", icon: ICONS.pin }, { title: "Legal Resources", body: "Educational content showing legal knowledge and case guidance", icon: ICONS.star }, { title: "Easy Contact", body: "Multiple ways to reach you; quick response expected", icon: ICONS.gallery }],
    faqs: [["Can I show case results?", "Yes! Anonymized case results (with permission) are powerful proof."], ["Should I list my fees?", "Transparency builds trust. Hourly rates or consultation fees help."], ["How do I get client testimonials?", "Request after successful case resolution. Anonymize if needed."], ["Can I publish legal advice?", "Educational content yes; specific legal advice requires attorney-client relationship."], ["Will this get me more clients?", "Yes! Online visibility + credibility = more consultations."]],
    metaTitle: "Law Firm Website - Attorney Profiles & Practice Areas", metaDesc: "Professional law firm website with attorney credentials, practice areas, and case results. Get qualified clients and build your legal practice.",
  },
  "online-stores-ecommerce": {
    name: "E-Commerce", lower: "online stores",
    subhead: "Professional online store with shopping cart, inventory management, and payment processing. Sell while you sleep.",
    headline: "Your Store. Online. Selling 24/7.",
    tint: "linear-gradient(150deg, #128C4A, #06381D)",
    features: [{ title: "Professional Storefront", body: "Products beautifully displayed. Easy to browse.", icon: ICONS.form }, { title: "Shopping Cart", body: "Customers add items and checkout seamlessly.", icon: ICONS.doc }, { title: "Payment Processing", body: "Accept payments securely. Money in your account.", icon: ICONS.book }, { title: "Inventory Management", body: "Track stock levels. Know when you're running low.", icon: ICONS.pin }, { title: "Order Management", body: "All orders in one dashboard. Track shipments.", icon: ICONS.star }, { title: "Expand Beyond Local", body: "Sell to customers nationwide. 24/7 sales.", icon: ICONS.gallery }],
    faqs: [["How much do payment processing fees cost?", "Typically 1-3% per transaction depending on payment gateway. We can discuss options."], ["Can I sell internationally?", "Yes! Setup shipping to multiple countries. Tax/customs vary by country."], ["Can I upload lots of products?", "Yes! Bulk upload tools available. Unlimited products on Platinum plan."], ["Does this help with shipping?", "Yes! Integration with couriers automates labels and tracking."], ["Will this increase my sales?", "Yes! Online stores open new customer markets and drive 24/7 sales."]],
    metaTitle: "E-Commerce Store Website - Sell Online 24/7 with Shopping Cart", metaDesc: "Professional online store with product catalog, shopping cart, and payment processing. Sell 24/7 to customers worldwide.",
  },
  "wedding-and-event-planners": {
    name: "Wedding & Events", lower: "wedding and event planners",
    subhead: "Stop losing bookings to planners with better websites. Your event gallery is your marketing. Let beautiful photos sell your services.",
    headline: "Your Past Events. Portfolio Perfect. Booking Tomorrow's Celebrations.",
    tint: "linear-gradient(150deg, #8E1B22, #2A0709)",
    features: [{ title: "Event Portfolio", body: "Beautiful gallery of past events. Couples see exactly what you do.", icon: ICONS.form }, { title: "Package Options", body: "Clear pricing and services. Couples know what they're getting.", icon: ICONS.doc }, { title: "Service Breakdown", body: "Vendor coordination, timeline management, design, everything listed.", icon: ICONS.book }, { title: "Client Testimonials", body: "Happy couples raving about your service. Social proof.", icon: ICONS.pin }, { title: "Planning Timeline", body: "Show your process. Couples understand how you work.", icon: ICONS.star }, { title: "Easy Inquiry", body: "Couples book consultation directly from website.", icon: ICONS.gallery }],
    faqs: [["How do I protect client privacy?", "Use client permission, blur faces if needed, focus on decor/design."], ["Should I show prices?", "Yes! Transparency helps. Packages + price ranges reduce unqualified inquiries."], ["How many events should I showcase?", "Start with 20-30 diverse events. Update quarterly with new work."], ["Will this really get me more bookings?", "Yes! Portfolio websites book 250%+ more events than those without."], ["Can I showcase vendor partnerships?", "Absolutely! It builds credibility and strengthens vendor relationships."]],
    metaTitle: "Wedding & Event Planner Website - Portfolio & Booking", metaDesc: "Professional event planner website with portfolio gallery, packages, and client testimonials. Win more bookings and showcase your events.",
  },
  "auto-repair-shops": {
    name: "Auto Repair", lower: "auto repair shops",
    subhead: "Stop losing customers to repair shops with better websites. Transparent pricing and online booking build trust and fill your schedule.",
    headline: "Your Repair Shop. Online. Trustworthy. Booked Solid.",
    tint: "linear-gradient(150deg, #005A6E, #012B34)",
    features: [{ title: "Service Menu with Pricing", body: "No surprises. Customers know costs before calling.", icon: ICONS.form }, { title: "Transparent Diagnostics", body: "Explain common issues and repairs needed.", icon: ICONS.doc }, { title: "Online Booking", body: "Customers book appointments anytime. No phone tag.", icon: ICONS.book }, { title: "Customer Testimonials", body: "Real customers raving about reliability and fair pricing.", icon: ICONS.pin }, { title: "Warranty Information", body: "Show confidence in your work.", icon: ICONS.star }, { title: "Quick Contact", body: "Multiple ways to reach you; fast response expected.", icon: ICONS.gallery }],
    faqs: [["Should I show all my pricing?", "Yes! Transparency builds trust and attracts price-conscious customers."], ["What if prices vary by vehicle?", "Show ranges. Customers understand repairs vary."], ["How do I get customer testimonials?", "Request after repair completion. Most happy customers will provide."], ["Will online booking really reduce no-shows?", "Yes! Confirmation emails + reminders reduce no-shows 40-50%."], ["Can I show warranty information?", "Absolutely! Shows confidence and protects customer."]],
    metaTitle: "Auto Repair Shop Website - Services, Pricing & Online Booking", metaDesc: "Professional auto repair website with service menu, transparent pricing, and online appointment booking. Build customer trust and fill your schedule.",
  },
  "b2b-clothing-manufacturer": {
    name: "B2B Clothing", lower: "B2B clothing manufacturers",
    subhead: "Professional wholesale website with product catalog, bulk pricing, and instant sample requests. Reach retailers nationwide. Process orders online.",
    headline: "Your Clothing Catalog. Online. Open for Orders 24/7.",
    tint: "linear-gradient(150deg, #707538, #2E3115)",
    features: [{ title: "Complete Product Catalog", body: "Every product visible with photos, specs, sizing.", icon: ICONS.form }, { title: "Wholesale Pricing", body: "Clear bulk pricing tiers. Retailers know costs upfront.", icon: ICONS.doc }, { title: "Instant Sample Requests", body: "Retailers request samples online. You ship immediately.", icon: ICONS.book }, { title: "MOQ Clarity", body: "Minimum order quantities listed per product.", icon: ICONS.pin }, { title: "Online Ordering", body: "Retailers place bulk orders directly. Faster processing.", icon: ICONS.star }, { title: "24/7 Availability", body: "Retailers browse and order anytime, anywhere.", icon: ICONS.gallery }],
    faqs: [["How do I set wholesale pricing?", "Cost + margin typically 3-5x cost depending on industry. Volume discounts motivate larger orders."], ["Can I customize products?", "Yes! Setup custom options, lead times, setup fees on website."], ["How do I handle samples?", "Charge sample fee or waive for large potential orders. Track requests online."], ["Will this work internationally?", "Yes! Multi-currency support, international shipping options available."], ["Can retailers place bulk orders online?", "Yes! Online quote and order system available on Growth/Platinum plans."]],
    metaTitle: "Clothing Manufacturer B2B Website - Wholesale Catalog & Sample Requests", metaDesc: "B2B clothing manufacturer website with product catalog, bulk pricing, and sample request system. Increase wholesale orders and reach more retailers.",
  },
  "b2b-leather-goods-manufacturer": {
    name: "B2B Leather Goods", lower: "B2B leather goods manufacturers",
    subhead: "Professional B2B leather goods website showcasing quality, customization options, and manufacturing expertise. Attract high-value wholesale buyers.",
    headline: "Premium Leather Craftsmanship. Custom Orders. Direct from Artisan.",
    tint: "linear-gradient(150deg, #1E5FA8, #0A2647)",
    features: [{ title: "Leather Showcase", body: "Leather grades, tanning methods, durability specs visible.", icon: ICONS.form }, { title: "Artisan Credentials", body: "Manufacturing history, expertise, awards, certifications highlighted.", icon: ICONS.doc }, { title: "Customization Options", body: "Clear what can be customized, lead times, minimums, pricing.", icon: ICONS.book }, { title: "Sample System", body: "Buyers request samples easily. Feel quality before bulk order.", icon: ICONS.pin }, { title: "Quality Certifications", body: "Tanning certifications, environmental compliance, testing results.", icon: ICONS.star }, { title: "Process Transparency", body: "Show your craftsmanship process. Build confidence in quality.", icon: ICONS.gallery }],
    faqs: [["How do I show leather quality on a website?", "Use close-up photos, include specs (tanning method, grade), offer sample requests, include certifications."], ["Should I offer all customization options?", "Start with core options. Add more as capacity grows. Show lead times clearly."], ["How do I price custom orders?", "Base price + setup fee + customization premium. Show examples on website."], ["Can international buyers order?", "Yes! Multi-currency, international shipping, export documentation support available."], ["How do I manage customization requests?", "Online quote system + email communication. Growth/Platinum plans include custom management tools."]],
    metaTitle: "Leather Goods Manufacturer B2B Website - Custom Orders & Wholesale", metaDesc: "Artisan leather goods manufacturer B2B website with custom orders, leather quality showcase, and bulk pricing. Connect with quality buyers worldwide.",
  },
}

export function otherIndustriesFor(key: IndustryKey) {
  return (Object.keys(INDUSTRY_DATA) as IndustryKey[])
    .filter((k) => k !== key)
    .map((k) => ({ label: INDUSTRY_DATA[k].name, href: routes.industry(INDUSTRY_SLUGS[k]) }))
}
