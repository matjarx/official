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
]

export const EXAMPLE_CATEGORIES = [
  'All', 'Accounting', 'Restaurants', 'Chefs', 'Flower Store', 'Legal Services', 'Digital Marketing', 'Real Estate',
  'Wedding And Caterers', 'Drinks', 'Coffee', 'Travel', 'Yacht Services', 'Construction', 'Builders And Fit-out',
  'Boutiques', 'Clinics', 'Salons', 'Textiles', 'E-commerce', 'Trades', 'Gyms And Fitness', 'Photography',
]

export const EXAMPLE_PILLARS = [
  { title: 'Category expertise', body: 'Your site is built by a designer who has worked in your trade before — so the layout, the words and the features actually fit how you sell.', icon: 'M12 3.5 4.5 7.5v9L12 20.5l7.5-4v-9ZM12 12l7.5-4.5M12 12v8.5M12 12 4.5 7.5' },
  { title: 'Personalisation', body: "We showcase your brand and your unique selling points. Your website tells your story — not a template's.", icon: 'M12 12a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM4.5 20a7.5 7.5 0 0 1 15 0' },
  { title: 'Easy to run', body: 'Simple to launch, use and update. And help from a real person is always a message or a phone call away.', icon: 'M12 15.1a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2ZM4.6 12a7.4 7.4 0 0 1 .1-1.2l-2-1.5 2-3.4 2.3 1a7.6 7.6 0 0 1 2-1.2l.3-2.5h4l.3 2.5a7.6 7.6 0 0 1 2 1.2l2.3-1 2 3.4-2 1.5a7.4 7.4 0 0 1 0 2.4l2 1.5-2 3.4-2.3-1a7.6 7.6 0 0 1-2 1.2l-.3 2.5h-4l-.3-2.5a7.6 7.6 0 0 1-2-1.2l-2.3 1-2-3.4 2-1.5A7.4 7.4 0 0 1 4.6 12Z' },
]
