// One landing page per theme, at /templates/<slug>.
//
// ── The naming ───────────────────────────────────────────────────────────
//
// "Matjar" is متجر — shop, in Arabic — and it is the brand's own word, so
// every theme is named as a shop rather than as a website: Flower Matjar is
// a flower shop, Salon Matjar is a salon. The suffix is the product's
// identity and it stays.
//
// The keyword is not lost, it just moves. "Salon Matjar" is the <h1> and the
// name a returning visitor remembers; "salon website template" is the
// <title> and the meta description, which is what anybody actually types
// into Google. Brand in the heading, intent in the metadata.
//
// Slugs are hand-picked here rather than derived from the theme's
// structure_key, which is inconsistent by nature — `salon` next to
// `flower-matjar` next to `minimalist-matjar-product`. A column in the
// database was drafted for this and withdrawn: this is a marketing URL, it
// belongs to the marketing site, and a literal here needs no migration and
// no second source of truth.
//
// All ten themes now have one. Coffee and MatjarX Classic were held back
// while they had no content — Coffee had four pages and no sections, Classic
// had no pages at all — because a landing page framing an empty theme reads
// as a broken product rather than an unfinished one. Both were built out on
// 2026-09-26 and joined the list.

/** Which industry page carries the full commercial pitch, where one exists.
 *  Deliberately NOT repeated on the landing page: two pages arguing the same
 *  case for "salon website" split the signal and Google picks one. The
 *  landing page sells the design; the industry page sells the service. */
export type ThemeLanding = {
  /** URL: /templates/<slug> */
  slug: string
  /** The theme's `structure_key` in the platform — what /themes/<key> serves. */
  themeKey: string
  /** Display name, Matjar convention. */
  name: string
  /** One line under the H1. Says what it is for, not why websites matter. */
  tagline: string
  /** <title> and meta description carry the search intent, not the brand. */
  metaTitle: string
  metaDesc: string
  /** Pitch: three things this theme does that a generic template does not. */
  highlights: { title: string; body: string }[]
  /** The pages a client gets on day one, in the theme's own words. */
  pages: string[]
  /** The theme's real colours, sampled from its own CSS.
   *
   *  NOT read from `themes.primary_color`: four of the ten still hold the
   *  admin form's default #2563eb, a generic blue that appears nowhere in
   *  the actual design — Salon's site is gold and near-black, Sports Shoes
   *  is acid yellow on black. A landing page painted from that column would
   *  misrepresent the very thing it is selling.
   *
   *  `primary` is dark enough to carry white text (the closing band); it is
   *  the CTA surface, not necessarily the theme's loudest colour. `accent`
   *  is the bright one, used at small sizes where contrast does not apply. */
  primary: string
  accent: string
  /** Industry page slug, or null where no matching page exists yet. */
  industryHref: string | null
  industryLabel: string | null
  /** City page keys this trade actually clusters in — used for the local
   *  links block. Every one is a real /website-design-<key> page. */
  cities: string[]
}

const COMMON_CITIES = ['lahore', 'karachi', 'islamabad', 'faisalabad', 'rawalpindi', 'multan', 'peshawar', 'gujranwala']

export const THEME_LANDINGS: ThemeLanding[] = [
  // ── Added 2026-10-08, second batch ────────────────────────────────────
  //
  // Fightwear and Tea were built (5 pages and 20/42 sections each, and
  // both /themes/<key> previews return 200) but are still flagged
  // coming_soon with no demo site. getThemes() filters coming_soon out, so
  // until that flag is cleared these two pages fall back to the Launch
  // plan in their CTA -- which is the exact bug minPlanFor exists to
  // prevent. The flag is a data fix, not a code one.
  //
  // Tea's colours are a worked example of why `primary` is not read from
  // themes.primary_color: that column holds #a6d86b, a bright green that
  // scores 1.66 against white text and would make the closing band
  // unreadable. The near-black is `primary`; the green is `accent`, which
  // is where a bright colour belongs.
  {
    slug: 'fightwear-matjar',
    themeKey: 'fightwear-matjar',
    name: 'Fightwear Matjar',
    tagline: 'A hard-edged storefront for fight gear, gyms and combat sports brands.',
    metaTitle: 'Fightwear & Combat Sports Website Template | Fightwear Matjar',
    metaDesc:
      'A ready-made website for fight gear brands and combat sports gyms: a dark, heavy design built around product photography, with a quote route for team and club orders.',
    highlights: [
      { title: 'Dark, because the kit is', body: 'Near-black with an oxblood and brass palette. Gloves, pads and rashguards photograph against it rather than disappearing into white.' },
      { title: 'Built for club orders', body: 'The quote route assumes a gym kitting out thirty people, not one person buying one pair of gloves.' },
      { title: 'Five pages, fast', body: 'A short site that loads on a phone in a gym car park, which is where this gets read.' },
    ],
    pages: ['Home', 'Get a quote', 'Contact', 'Blog'],
    primary: '#0e0f13',
    accent: '#c9a24a',
    industryHref: '/website-for-gyms-and-fitness',
    industryLabel: 'gyms and fitness businesses',
    cities: COMMON_CITIES,
  },
  {
    slug: 'tea-matjar',
    themeKey: 'tea-matjar',
    name: 'Tea Matjar',
    tagline: 'A warm, produce-led storefront for tea growers, blenders and cafés.',
    metaTitle: 'Tea & Beverage Website Design Template | Tea Matjar',
    metaDesc:
      'A ready-made website for tea brands and blenders: a design built around origin, leaf and process, with an About page that carries the story a premium tea sells on.',
    highlights: [
      { title: 'Origin is the product', body: 'Layouts that give estate, altitude and harvest the room they need — the details a premium tea buyer reads before the price.' },
      { title: 'Green against near-black', body: 'A fresh-leaf green on a dark ground, so packaging and loose-leaf photography carry real colour.' },
      { title: 'The story has its own page', body: 'A proper About page, because a tea brand is bought on where it comes from as much as what it costs.' },
    ],
    pages: ['Home', 'About', 'Contact', 'Blog'],
    primary: '#070a08',
    accent: '#a6d86b',
    industryHref: '/website-for-restaurants',
    industryLabel: 'cafés and food businesses',
    cities: COMMON_CITIES,
  },
  // ── Added 2026-10-08 ──────────────────────────────────────────────────
  //
  // Four themes had a finished design, a published demo and no landing
  // page, so the gallery showed them and no URL could rank for them.
  //
  // Colours are the theme's own, checked against the hexes its sections
  // actually use rather than taken on trust from `themes.primary_color` --
  // the four that still hold the admin default would have painted these
  // pages a blue that appears nowhere in the design. These four do match.
  //
  // The page lists are the theme's REAL pages, read from its own rows, not
  // an idealised set: Sportwear ships five, and saying eight would be a
  // promise the template does not keep.
  {
    slug: 'interior-matjar',
    themeKey: 'interior-matjar',
    name: 'Interior Matjar',
    tagline: 'A project-led site for interior fit-out, wrapping and renovation firms.',
    metaTitle: 'Interior Design & Fit-Out Website Template | Interior Matjar',
    metaDesc:
      'A ready-made website for interior fit-out and renovation companies: a project gallery that sells the work, service pages per discipline and a quote form on every one.',
    highlights: [
      { title: 'The work does the selling', body: 'A projects grid built for before-and-after pairs, because that is the one thing a prospect wants to see.' },
      { title: 'A page per service', body: 'Each discipline gets its own URL rather than a bullet on one long page, so each can rank for what it actually is.' },
      { title: 'A quote form that follows', body: 'Every service page ends in the same short form. No hunting for a contact page.' },
    ],
    pages: ['Home', 'Services', 'Projects', 'Get a quote', 'About', 'Blog', 'Contact'],
    primary: '#171513',
    accent: '#c9ad82',
    industryHref: '/website-for-construction-companies',
    industryLabel: 'construction and fit-out firms',
    cities: COMMON_CITIES,
  },
  {
    slug: 'real-estate-matjar',
    themeKey: 'real-estate-matjar',
    name: 'Real Estate Matjar',
    tagline: 'A listings-first site for estate agents and property developers.',
    metaTitle: 'Real Estate Website Design & Template | Real Estate Matjar',
    metaDesc:
      'A ready-made estate agency website with a property listings grid, enquiry forms on every listing and an About page that builds the trust a sale needs.',
    highlights: [
      { title: 'Properties, not products', body: 'A listings layout that leads with location, size and price — the three things a buyer filters on.' },
      { title: 'An enquiry on every listing', body: 'The form sits with the property, so an interested buyer never has to go and find it.' },
      { title: 'Built to be believed', body: 'An About page with the licence, the team and the track record, because a property enquiry is a high-trust one.' },
    ],
    pages: ['Home', 'Properties', 'Get a quote', 'About us', 'Blog', 'Contact'],
    primary: '#1f2a27',
    accent: '#c8a96a',
    industryHref: '/website-for-real-estate',
    industryLabel: 'estate agents',
    cities: COMMON_CITIES,
  },
  {
    slug: 'scottish-clothing-matjar',
    themeKey: 'scotish-clothing-matjar',
    name: 'Scottish Clothing Matjar',
    tagline: 'A made-to-measure storefront for kilts, tartan and formal highland wear.',
    metaTitle: 'Kilt & Highland Wear Website Template | Scottish Clothing Matjar',
    metaDesc:
      'A ready-made storefront for made-to-measure clothing: a measuring guide, shipping and returns answered up front, and customer reviews where a buyer looks for them.',
    highlights: [
      { title: 'A measuring guide that reduces returns', body: 'Its own page, written to be followed with a tape measure in hand — the single biggest cost in made-to-measure.' },
      { title: 'Shipping answered before it is asked', body: 'Delivery times and returns have their own URL, because an international buyer checks before adding to a basket.' },
      { title: 'Reviews where the doubt is', body: 'A dedicated reviews page, which is what a first-time buyer of an expensive garment goes looking for.' },
    ],
    pages: ['Home', 'Measuring guide', 'Shipping and delivery', 'Customer reviews', 'FAQs', 'About', 'Blog', 'Contact'],
    primary: '#1f2a33',
    accent: '#9e1b2a',
    industryHref: '/website-for-boutiques',
    industryLabel: 'boutiques and clothing brands',
    cities: COMMON_CITIES,
  },
  {
    slug: 'sportwear-matjar',
    themeKey: 'sportwear-matjar',
    name: 'Sportwear Matjar',
    tagline: 'A dark, product-led storefront for sportswear and technical apparel.',
    metaTitle: 'Sportswear Website Design & Template | Sportwear Matjar',
    metaDesc:
      'A ready-made sportswear website: a dark product-led design that makes kit photography carry the page, with enquiry routing built for wholesale and custom orders.',
    highlights: [
      { title: 'Dark, so the product is not', body: 'A near-black palette with a brass accent — kit photography reads brighter against it than on white.' },
      { title: 'Built for bulk enquiries', body: 'The contact route assumes a team order or a wholesale question, not a single checkout.' },
      { title: 'Five pages, and that is the point', body: 'A short site that loads fast and says one thing, rather than ten pages nobody reads.' },
    ],
    pages: ['Home', 'About', 'Blog', 'Contact'],
    primary: '#16181b',
    accent: '#d4b27a',
    industryHref: '/website-for-online-stores-ecommerce',
    industryLabel: 'online stores',
    cities: COMMON_CITIES,
  },
  {
    slug: 'salon-matjar',
    themeKey: 'salon',
    name: 'Salon Matjar',
    tagline: 'A booking-first storefront for salons, spas and barbers.',
    metaTitle: 'Salon Website Design & Template | Salon Matjar',
    metaDesc:
      'A ready-made salon website with online booking, a service menu with prices, stylist profiles and a gallery. Live in seven days, built for you.',
    highlights: [
      { title: 'Booking before browsing', body: 'The appointment form sits above the fold on every page, because a salon site has one job.' },
      { title: 'A service menu that prices itself', body: 'Treatments, durations and prices in a layout that reads on a phone at arm’s length.' },
      { title: 'Stylists, not stock photos', body: 'Team profiles with specialities, so a client can ask for someone by name.' },
    ],
    pages: ['Home', 'Services & prices', 'Book an appointment', 'Our stylists', 'Gallery', 'About', 'Contact', 'Blog'],
    primary: '#5C4526',
    accent: '#C9A96A',
    industryHref: '/website-for-salons-and-spas',
    industryLabel: 'salons and spas',
    cities: COMMON_CITIES,
  },
  {
    slug: 'flower-matjar',
    themeKey: 'flower-matjar',
    name: 'Flower Matjar',
    tagline: 'A florist storefront built around occasions and same-day delivery.',
    metaTitle: 'Florist Website Design & Flower Shop Template | Flower Matjar',
    metaDesc:
      'A ready-made flower shop website — shop by occasion, gift sets, wedding enquiries and same-day delivery. Built for you in seven days.',
    highlights: [
      { title: 'Shop by occasion', body: 'Birthdays, condolences, weddings — how people actually buy flowers, not by stem type.' },
      { title: 'Gift sets that upsell themselves', body: 'Bundles with add-ons at checkout, because a bouquet is rarely the whole order.' },
      { title: 'Weddings get their own room', body: 'A separate enquiry path for events, kept clear of the everyday delivery flow.' },
    ],
    pages: ['Home', 'Shop by occasion', 'Gift sets', 'Weddings & events', 'About', 'Contact', 'Blog'],
    primary: '#54603F',
    accent: '#B9836F',
    industryHref: null,
    industryLabel: null,
    cities: COMMON_CITIES,
  },
  {
    slug: 'pet-store-matjar',
    themeKey: 'pet-store-matjar',
    name: 'Pet Store Matjar',
    tagline: 'A vet clinic, grooming spa and pet shop under one roof.',
    metaTitle: 'Pet Shop & Vet Clinic Website Template | Pet Store Matjar',
    metaDesc:
      'A ready-made pet store website with appointment booking, a shop by pet catalogue, grooming services and 24/7 emergency contact.',
    highlights: [
      { title: 'Two businesses, one site', body: 'A clinic that books and a shop that sells, without either burying the other.' },
      { title: 'Shop by pet', body: 'Dogs, cats, small pets — the first question every customer asks themselves.' },
      { title: 'Emergency, always visible', body: 'A 24/7 line pinned in the header, where a worried owner will find it.' },
    ],
    pages: ['Home', 'Shop', 'Book an appointment', 'Services', 'Grooming', 'Meet the vets', 'Emergency 24/7', 'Blog'],
    primary: '#173F35',
    accent: '#F0A83C',
    industryHref: null,
    industryLabel: null,
    cities: COMMON_CITIES,
  },
  {
    slug: 'sports-shoes-matjar',
    themeKey: 'sports-shoes-matjar',
    name: 'Sports Shoes Matjar',
    tagline: 'A footwear storefront with sizes, variants and a size guide.',
    metaTitle: 'Shoe Store & Footwear Website Template | Sports Shoes Matjar',
    metaDesc:
      'A ready-made online shoe store — size and colour variants, a size guide, reviews and a checkout that takes cash on delivery.',
    highlights: [
      { title: 'Sizes done properly', body: 'Variants per size and colour, with stock per variant, so nobody orders what you cannot ship.' },
      { title: 'A real size guide', body: 'Its own page, because returns in footwear are almost always a sizing problem.' },
      { title: 'Reviews near the button', body: 'Social proof beside the price, not buried at the bottom of the page.' },
    ],
    pages: ['Home', 'Shop', 'Collections', 'Size guide', 'Reviews', 'About', 'Contact', 'Blog'],
    primary: '#0B0B0B',
    accent: '#D7FF2B',
    industryHref: '/website-for-online-stores-ecommerce',
    industryLabel: 'online stores',
    cities: COMMON_CITIES,
  },
  {
    slug: 'leather-matjar',
    themeKey: 'leather-goods',
    name: 'Leather Matjar',
    tagline: 'A B2B catalogue for manufacturers who quote rather than sell.',
    metaTitle: 'Leather Goods Manufacturer Website Template | Leather Matjar',
    metaDesc:
      'A ready-made B2B leather goods website — product catalogue, quote requests instead of a cart, material specs and export enquiries.',
    highlights: [
      { title: 'Quotes, not carts', body: 'Wholesale does not check out. Every product ends in a request, with quantities and specs.' },
      { title: 'Built for export enquiries', body: 'MOQ, materials and lead times stated up front, so the first email is already qualified.' },
      { title: 'A catalogue buyers can browse', body: 'Deep category nesting for ranges that run to hundreds of SKUs.' },
    ],
    pages: ['Home', 'Catalogue', 'Request a quote', 'Materials', 'Our process', 'About', 'Contact', 'Blog'],
    primary: '#1C1917',
    accent: '#D4AF37',
    industryHref: '/website-for-b2b-leather-goods-manufacturer',
    industryLabel: 'leather goods manufacturers',
    cities: ['sialkot', 'lahore', 'karachi', 'faisalabad', 'gujranwala', 'multan'],
  },
  {
    slug: 'bakery-matjar',
    themeKey: 'bakery-and-cafe',
    name: 'Bakery Matjar',
    tagline: 'A bakery and café storefront with a menu and custom orders.',
    metaTitle: 'Bakery & Café Website Design Template | Bakery Matjar',
    metaDesc:
      'A ready-made bakery website — daily menu, custom cake orders, delivery and a shop people can actually order from.',
    highlights: [
      { title: 'The menu is the homepage', body: 'What is fresh today, priced and photographed, before anything else.' },
      { title: 'Custom orders have a form', body: 'Cakes get their own enquiry path — date, size, message, photo reference.' },
      { title: 'Built for repeat orders', body: 'Reorder from an account, because a bakery lives on the same people every week.' },
    ],
    pages: ['Home', 'Menu', 'Custom orders', 'Shop', 'About', 'Contact'],
    primary: '#7A3D11',
    accent: '#D2691E',
    industryHref: '/website-for-restaurants',
    industryLabel: 'restaurants and cafés',
    cities: COMMON_CITIES,
  },
  {
    slug: 'minimalist-matjar',
    themeKey: 'minimalist-matjar-product',
    name: 'Minimalist Matjar',
    tagline: 'A clean product storefront that gets out of the way.',
    metaTitle: 'Minimal Online Store Website Template | Minimalist Matjar',
    metaDesc:
      'A ready-made minimal ecommerce website — product catalogue, mega-menu navigation, blog and checkout. Neutral enough for any brand.',
    highlights: [
      { title: 'Your photography does the talking', body: 'Neutral type and generous space, designed to disappear behind good product shots.' },
      { title: 'A mega-menu that scales', body: 'Built for a catalogue that grows past what a simple nav can hold.' },
      { title: 'Fits any palette', body: 'Colours are tokens — change three and the whole store follows.' },
    ],
    pages: ['Home', 'Shop', 'Collections', 'Product pages', 'About', 'Contact', 'Blog'],
    primary: '#003366',
    accent: '#707538',
    industryHref: '/website-for-online-stores-ecommerce',
    industryLabel: 'online stores',
    cities: COMMON_CITIES,
  },
  {
    slug: 'minimalist-service-matjar',
    themeKey: 'minimalist-matjar-service',
    name: 'Minimalist Service Matjar',
    tagline: 'A clean service site for consultants, agencies and studios.',
    metaTitle: 'Service Business Website Template | Minimalist Service Matjar',
    metaDesc:
      'A ready-made website for a service business — service pages, enquiry forms, case studies and a blog. No cart, no clutter.',
    highlights: [
      { title: 'Enquiries, not checkout', body: 'No cart anywhere. Every page ends in a conversation instead of a transaction.' },
      { title: 'A page per service', body: 'Each one can rank on its own, which is how service businesses get found.' },
      { title: 'Proof built in', body: 'Case studies and testimonials as real sections, not an afterthought.' },
    ],
    pages: ['Home', 'Services', 'Case studies', 'About', 'Contact', 'Blog'],
    primary: '#003366',
    accent: '#707538',
    industryHref: null,
    industryLabel: null,
    cities: COMMON_CITIES,
  },
  {
    slug: 'coffee-matjar',
    themeKey: 'coffee',
    name: 'Coffee Matjar',
    tagline: 'A roastery storefront built around subscriptions.',
    metaTitle: 'Coffee Shop & Roastery Website Template | Coffee Matjar',
    metaDesc:
      'A ready-made coffee website — shop by roast, recurring subscriptions people can pause themselves, and a café page that brings them in.',
    highlights: [
      { title: 'Subscriptions that do not trap anyone', body: 'Skip, pause or cancel from an account. The reason people sign up is knowing they can stop.' },
      { title: 'Roast date on every bag', body: 'Freshness is the whole pitch for speciality coffee, so it is on the product, not buried in an FAQ.' },
      { title: 'The café gets a page', body: 'A roastery with a room is two businesses. Both are findable.' },
    ],
    pages: ['Home', 'Shop', 'Subscriptions', 'The café', 'Brew guides', 'About', 'Contact', 'Blog'],
    primary: '#1A1512',
    accent: '#C8A04A',
    industryHref: '/website-for-restaurants',
    industryLabel: 'restaurants and cafés',
    cities: COMMON_CITIES,
  },
  {
    slug: 'classic-matjar',
    themeKey: 'matjarx-classic-18',
    name: 'MatjarX Classic',
    tagline: 'A clean, conversion-focused site for any service business.',
    metaTitle: 'Professional Services Website Template | MatjarX Classic',
    metaDesc:
      'A ready-made website for consultants, agencies, clinics and trades — services, process, case studies, FAQs and a quote form that actually gets used.',
    highlights: [
      { title: 'Built to produce enquiries', body: 'No cart anywhere. Every page ends in a quote request instead of a checkout.' },
      { title: 'Your process, written down', body: 'Four steps with what happens at each — the thing that turns a browser into a caller.' },
      { title: 'Neutral enough for any trade', body: 'A clinic, a law firm and a builder can all wear it without it looking borrowed.' },
    ],
    pages: ['Home', 'Services', 'About', 'Get a quote', 'Contact', 'Thank you', 'Blog'],
    primary: '#003366',
    accent: '#707538',
    industryHref: null,
    industryLabel: null,
    cities: COMMON_CITIES,
  },
]
export function themeLandingFor(slug: string): ThemeLanding | null {
  return THEME_LANDINGS.find((t) => t.slug === slug) ?? null
}
