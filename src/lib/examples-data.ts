// Data for the Website Examples page — from Marketing - Website Examples.dc.html.
//
// Note: the prototype's `url` field for every example was copy-pasted as
// "https://celestialdelicacies.com" (a single placeholder), even though
// each card's own `domain` field is distinct — the modal it feeds always
// opened the same one site regardless of which card was clicked. Real
// domains generate `https://{domain}` instead, since that's clearly the
// intent (the modal header already displays that same domain) rather
// than reproducing what reads as a copy-paste bug, not a copy decision.

export type ExampleSite = {
  name: string; brand: string; domain: string; category: string; cat: string
  nav: string[]; cta: string; ctaBg: string; ctaInk: string
  heroLine: string; heroBlurb: string; result: string; tint: string
  // Real proof screenshot (Google search/Maps listing) pulled from
  // matjarx.com's WordPress media library — same file and alt text
  // already indexed by Google, not a new asset.
  proofImage?: { src: string; alt: string; width: number; height: number }
}

export const EXAMPLES: ExampleSite[] = [
  { name: 'Celestial Delicacies', brand: 'CELESTIAL', domain: 'celestialdelicacies.com', category: 'Restaurants', cat: 'Restaurants',
    nav: ['Menu', 'Reservations', 'Catering'], cta: 'Book A Table', ctaBg: '#C6A227', ctaInk: '#1A1004',
    heroLine: 'Dining worth the drive.', heroBlurb: 'Fine dining in Karachi. Reserve a table, or let us cater your next event.',
    result: 'Bookings up 3×', tint: 'linear-gradient(150deg, #8E1B22, #2A0709)' },
  { name: 'Bin Adam Textile', brand: 'BIN ADAM', domain: 'binadamtextile.pk', category: 'Textiles', cat: 'Textiles',
    nav: ['Rates', 'Bulk orders', 'About'], cta: 'Get A Quote', ctaBg: '#F4F2AE', ctaInk: '#16210B',
    heroLine: 'Fabric by the bale, priced clearly.', heroBlurb: 'Faisalabad wholesaler with live rate tables and bulk enquiry forms.',
    result: '#1 on Google', tint: 'linear-gradient(150deg, #003366, #0A2647)' },
  { name: 'Sacred Wellness', brand: 'SACRED', domain: 'sacredwellness.pk', category: 'Clinics', cat: 'Clinics',
    nav: ['Services', 'Our doctors', 'Contact'], cta: 'Book Now', ctaBg: '#C6CB8A', ctaInk: '#16210B',
    heroLine: 'Care that starts with listening.', heroBlurb: 'Consultations, physiotherapy and wellness programmes in Model Town.',
    result: 'Leads every day', tint: 'linear-gradient(150deg, #1B5E6E, #062730)' },
  { name: 'Elegance Embroidery', brand: 'ELEGANCE', domain: 'eleganceembroidery.pk', category: 'Boutiques', cat: 'Boutiques',
    nav: ['Shop', 'Collections', 'Fabric guide'], cta: 'Order Now', ctaBg: '#F4F2AE', ctaInk: '#16210B',
    heroLine: 'Hand-stitched, made to be seen.', heroBlurb: 'Chikankari and ajrak work, delivered nationwide with cash on delivery.',
    result: 'Online in 6 days', tint: 'linear-gradient(150deg, #7A2E6B, #2A0F24)' },
  { name: 'Zulfay Hair', brand: 'ZULFAY', domain: 'zulfayhair.com', category: 'Salons', cat: 'Salons',
    nav: ['Stylists', 'Price list', 'Gallery'], cta: 'Book Now', ctaBg: '#E8B4C8', ctaInk: '#2A0F1A',
    heroLine: 'Your chair is ready.', heroBlurb: "Multi-seat booking across three branches, synced to every stylist's calendar.",
    result: '1,520 messages', tint: 'linear-gradient(150deg, #A0522D, #3E1B0C)',
    proofImage: { src: '/services/zulfay-map-listing.webp', alt: 'Zulfay Hair Google search listing featuring the Zulfay logo, 4.8-star rating, salon information, and website button.', width: 1552, height: 1013 } },
  { name: 'CapActix Offshore', brand: 'CAPACTIX', domain: 'capactix.com', category: 'Accounting', cat: 'Accounting',
    nav: ['Services', 'Pricing', 'Blog'], cta: 'Request Call', ctaBg: '#C4262E', ctaInk: '#FFFFFF',
    heroLine: 'Numbers that matter.', heroBlurb: 'We turn your financial data into reporting you can actually act on.',
    result: '550+ reviews', tint: 'linear-gradient(150deg, #10265A, #050F2A)' },
  { name: 'Eebeel Home', brand: 'EEBEEL', domain: 'eebeel.pk', category: 'E-commerce', cat: 'E-commerce',
    nav: ['Shop', 'Track order', 'Support'], cta: 'Order Now', ctaBg: '#F4F2AE', ctaInk: '#16210B',
    heroLine: 'Everything for the home.', heroBlurb: '400+ products with JazzCash, Easypaisa and cash-on-delivery checkout.',
    result: '2,000+ leads', tint: 'linear-gradient(150deg, #6A2C8E, #2A0F3A)',
    proofImage: { src: '/services/eebeel-map-listing.webp', alt: 'eebeel Google search listing featuring the eebeel logo, 4.8-star rating, beauty and personal care information, and website button.', width: 1552, height: 1013 } },
  { name: 'Sweet Crumbs Bakery', brand: 'SWEET CRUMBS', domain: 'sweetcrumbs.pk', category: 'Restaurants', cat: 'Restaurants',
    nav: ['Menu', 'Our bakery', 'Catering'], cta: 'Book Now', ctaBg: '#6B4A22', ctaInk: '#FFFFFF',
    heroLine: 'Baked fresh, every morning.', heroBlurb: 'Order online for pickup, or reserve your table for the weekend.',
    result: 'Sells out daily', tint: 'linear-gradient(150deg, #7C5628, #2A1608)' },
  { name: 'Mr. Handyman Repairs', brand: 'MR. HANDYMAN', domain: 'mrhandyman.pk', category: 'Trades', cat: 'Trades',
    nav: ['Services', 'Areas', 'Reviews'], cta: 'Get A Quote', ctaBg: '#E9A94F', ctaInk: '#2A1608',
    heroLine: 'Home repairs, all jobs covered.', heroBlurb: 'Quote requests routed straight to WhatsApp, with before-and-after galleries.',
    result: 'Calls doubled', tint: 'linear-gradient(150deg, #B8621B, #4A2409)' },
  { name: 'Askari Estates', brand: 'ASKARI ESTATES', domain: 'askariestates.pk', category: 'Real Estate', cat: 'Real Estate',
    nav: ['Listings', 'Plots', 'Contact'], cta: 'View Listings', ctaBg: '#0A3D62', ctaInk: '#FFFFFF',
    heroLine: 'Find your next address in Islamabad.', heroBlurb: 'Live plot and house listings with price, size and location filters, updated daily.',
    result: '3× more enquiries', tint: 'linear-gradient(150deg, #0A3D62, #041B2E)' },
  { name: 'IronCore Fitness', brand: 'IRONCORE', domain: 'ironcorefitness.pk', category: 'Gyms And Fitness', cat: 'Gyms And Fitness',
    nav: ['Memberships', 'Classes', 'Trainers'], cta: 'Join Now', ctaBg: '#D6E63A', ctaInk: '#1A2004',
    heroLine: 'Train like it matters.', heroBlurb: 'Membership sign-up and class booking online, with trainer profiles and a live timetable.',
    result: '200+ sign-ups online', tint: 'linear-gradient(150deg, #23291A, #0A0D06)' },
  { name: 'Chaudhry & Fitzgerald Law', brand: 'C&F LAW', domain: 'cflaw.pk', category: 'Legal Services', cat: 'Legal Services',
    nav: ['Practice areas', 'Our team', 'Consult'], cta: 'Book A Consult', ctaBg: '#8A6D1E', ctaInk: '#FFFFFF',
    heroLine: 'Advice you can act on.', heroBlurb: 'Corporate, property and family law in Lahore, with a confidential online consultation form.',
    result: 'Fully booked most weeks', tint: 'linear-gradient(150deg, #2B2410, #0F0C04)' },
  { name: 'Noor & Co. Events', brand: 'NOOR & CO.', domain: 'noorandco.pk', category: 'Wedding And Caterers', cat: 'Wedding And Caterers',
    nav: ['Packages', 'Gallery', 'Enquire'], cta: 'Check Availability', ctaBg: '#E8B4C8', ctaInk: '#2A0F1A',
    heroLine: 'Your day, planned properly.', heroBlurb: 'Wedding planning and catering packages for Karachi, with a real-time date-availability form.',
    result: 'Booked out 8 months ahead', tint: 'linear-gradient(150deg, #6E1B4A, #240818)' },
  { name: 'Speedway Auto Care', brand: 'SPEEDWAY', domain: 'speedwayauto.pk', category: 'Trades', cat: 'Trades',
    nav: ['Services', 'Book a slot', 'Reviews'], cta: 'Book A Slot', ctaBg: '#C4262E', ctaInk: '#FFFFFF',
    heroLine: 'Your car, back on the road fast.', heroBlurb: 'Online booking for servicing and repairs across two Rawalpindi branches, synced to one calendar.',
    result: 'Bookings up 2.5×', tint: 'linear-gradient(150deg, #1A1A1A, #050505)' },
  { name: 'Sindh Leather Works', brand: 'SINDH LEATHER', domain: 'sindhleatherworks.pk', category: 'Textiles', cat: 'Textiles',
    nav: ['Catalogue', 'Bulk orders', 'Export'], cta: 'Request Catalogue', ctaBg: '#B8621B', ctaInk: '#FFFFFF',
    heroLine: 'Leather goods, made for export.', heroBlurb: 'Sialkot manufacturer with a wholesale catalogue, MOQ pricing and an export-enquiry form.',
    result: 'Buyers from 6 countries', tint: 'linear-gradient(150deg, #4A2409, #1A0C03)' },
  { name: 'Margalla Builders', brand: 'MARGALLA', domain: 'margallabuilders.pk', category: 'Construction', cat: 'Construction',
    nav: ['Projects', 'Services', 'Get A Quote'], cta: 'Get A Quote', ctaBg: '#E9A94F', ctaInk: '#2A1608',
    heroLine: 'Built to last, on schedule.', heroBlurb: 'Islamabad contractor with a project gallery and a quote-request form routed to the right site manager.',
    result: '40+ projects showcased', tint: 'linear-gradient(150deg, #4A3B1A, #1A1506)' },
]

export const EXAMPLE_CATEGORIES = [
  'All', 'Accounting', 'Restaurants', 'Chefs', 'Flower Store', 'Legal Services', 'Digital Marketing', 'Real Estate',
  'Wedding And Caterers', 'Drinks', 'Coffee', 'Travel', 'Yacht Services', 'Construction', 'Builders And Fit-out',
  'Boutiques', 'Clinics', 'Salons', 'Textiles', 'E-commerce', 'Trades', 'Gyms And Fitness', 'Jewelry & Luxury Goods',
  'Automotive', 'Banking & Finance', 'Agriculture', 'Telecommunications', 'Pet Industry', 'Media & Entertainment',
  'Security & Facility Management', 'Education & Training', 'Kids & Toys', 'Aviation', 'Import & Export',
  'Metal & Engineering', 'Energy & Renewables', 'Automotive Parts', 'Home Services',
  'Pharmaceutical & Healthcare Products', 'Printing & Packaging',
]

// Cross-reference from each rail category above to the matching
// industry (or industries) in the platform's own onboarding taxonomy
// (matjarx-platform/src/lib/industries.ts), plus a plain-English
// description of the businesses each category covers — kept here so
// the two taxonomies can be reconciled deliberately if either changes,
// rather than drifting apart silently. Not wired into the rail UI.
export const EXAMPLE_CATEGORY_INDUSTRIES: Record<string, string> = {
  'All': 'All Categories',
  'Accounting': 'Professional Business Services',
  'Restaurants': 'Food & Beverage, Tourism & Hospitality',
  'Chefs': 'Food & Beverage, Personal Services',
  'Flower Store': 'E-Commerce & Retail',
  'Legal Services': 'Legal Services',
  'Digital Marketing': 'Digital Marketing & Creative Services',
  'Real Estate': 'Construction & Real Estate',
  'Wedding And Caterers': 'Events & Weddings, Food & Beverage',
  'Drinks': 'Food & Beverage',
  'Coffee': 'Food & Beverage',
  'Travel': 'Tourism & Hospitality',
  'Yacht Services': 'Marine & Fisheries, Tourism & Hospitality',
  'Construction': 'Construction & Real Estate',
  'Builders And Fit-out': 'Construction & Real Estate',
  'Boutiques': 'E-Commerce & Retail',
  'Clinics': 'Healthcare & Medical',
  'Salons': 'Beauty & Personal Care, Personal Services',
  'Textiles': 'Textile & Apparel',
  'E-commerce': 'E-Commerce & Retail',
  'Trades': 'Professional Business Services, Home Services',
  'Gyms And Fitness': 'Sports & Fitness',
  'Jewelry & Luxury Goods': 'Jewelry boutiques, luxury watch retailers, designer accessory stores',
  'Automotive': 'Car dealerships, auto repair shops, car rental services, mechanics',
  'Banking & Finance': 'Banks, financial advisors, insurance brokers, fintech platforms',
  'Agriculture': 'Farms, agricultural equipment suppliers, food processors, nurseries',
  'Telecommunications': 'Mobile phone shops, internet service providers, telecom retailers',
  'Pet Industry': 'Pet stores, veterinary clinics, pet grooming, pet training centers, pet supplies',
  'Media & Entertainment': 'Publishing houses, production companies, entertainment venues, cinema',
  'Security & Facility Management': 'Security services, cleaning services, facility management companies',
  'Education & Training': 'Training centers, coaching institutes, online education platforms, universities',
  'Kids & Toys': 'Toy stores, kids clothing boutiques, play centers, daycare services',
  'Aviation': 'Airlines, flight training centers, aviation maintenance, aircraft services',
  'Import & Export': 'Trading companies, freight forwarders, customs brokers, import/export agents',
  'Metal & Engineering': 'Engineering firms, metal fabrication, welding shops, machinery suppliers',
  'Energy & Renewables': 'Solar installation, renewable energy providers, energy consulting, electrical contractors',
  'Automotive Parts': 'Auto parts stores, accessory shops, spare parts dealers',
  'Home Services': 'Plumbing services, electrical services, HVAC, painting, carpentry',
  'Pharmaceutical & Healthcare Products': 'Pharmacies, medical equipment suppliers, health product retailers',
  'Printing & Packaging': 'Printing services, packaging design, label manufacturers, graphic design studios',
}

export const EXAMPLE_PILLARS = [
  { title: 'Category expertise', body: 'Your site is built by a designer who has worked in your trade before — so the layout, the words and the features actually fit how you sell.', icon: 'M12 3.5 4.5 7.5v9L12 20.5l7.5-4v-9ZM12 12l7.5-4.5M12 12v8.5M12 12 4.5 7.5' },
  { title: 'Personalisation', body: "We showcase your brand and your unique selling points. Your website tells your story — not a template's.", icon: 'M12 12a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM4.5 20a7.5 7.5 0 0 1 15 0' },
  { title: 'Easy to run', body: 'Simple to launch, use and update. And help from a real person is always a message or a phone call away.', icon: 'M12 15.1a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2ZM4.6 12a7.4 7.4 0 0 1 .1-1.2l-2-1.5 2-3.4 2.3 1a7.6 7.6 0 0 1 2-1.2l.3-2.5h4l.3 2.5a7.6 7.6 0 0 1 2 1.2l2.3-1 2 3.4-2 1.5a7.4 7.4 0 0 1 0 2.4l2 1.5-2 3.4-2.3-1a7.6 7.6 0 0 1-2 1.2l-.3 2.5h-4l-.3-2.5a7.6 7.6 0 0 1-2-1.2l-2.3 1-2-3.4 2-1.5A7.4 7.4 0 0 1 4.6 12Z' },
]
