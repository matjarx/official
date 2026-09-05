// Full-fidelity content for the 12 real-content industry pages, from
// files/matjarx_industry_{1-12}_*.md — verbatim. industry-data.ts
// (INDUSTRY_DATA) stays as-is and still drives the compact hero/features/
// FAQ view; this file adds everything each source file has that
// INDUSTRY_DATA never carried — the problem framing, the full "what's
// included" catalog, real success-story numbers, industry-specific
// features, the marketing playbook, the 3-tier plan breakdown, getting-
// started steps and the full FAQ. IndustryDetailSections.tsx renders
// INDUSTRY_DATA's existing fields first, then everything here.
//
// Boutiques and Clinics (the 2 original design-handoff industries) have no
// source content file and are out of scope — INDUSTRY_KEYS below lists
// only the 12 with real content.

import type { Section, PlanFaq } from './plan-detail-data'
import type { IndustryKey } from './industry-data'

export type StoryItem = { title: string; lines: string[] }
export type PlanTier = { name: string; audience: string; items: string[]; price?: string }
export type ExtraSection = { title: string; body: string[] }

export type IndustryDetail = {
  reality: { title: string; intro?: string; points: string[] }
  solution: { title: string; intro?: string; points: string[] }
  included: { title: string; sections: Section[] }
  successStories: { title: string; items: StoryItem[] }
  featuresSpecific: { title: string; sections: Section[] }
  marketing: { title: string; sections: Section[] }
  testimonials?: { title: string; items: { quote: string; name: string }[] }
  plans: { title: string; tiers: PlanTier[] }
  gettingStarted: { title: string; steps: string[] }
  extras?: ExtraSection[]
  faqs: PlanFaq[]
  closing: { title: string; body: string; cta: string }
}

export const INDUSTRY_KEYS: IndustryKey[] = [
  'restaurants', 'real-estate', 'clinics-and-healthcare', 'salons-and-spas', 'gyms-and-fitness',
  'construction-companies', 'law-firms', 'online-stores-ecommerce', 'wedding-and-event-planners',
  'auto-repair-shops', 'b2b-clothing-manufacturer', 'b2b-leather-goods-manufacturer',
]

export const INDUSTRY_DETAIL: Partial<Record<IndustryKey, IndustryDetail>> = {
  restaurants: {
    reality: { title: 'The Problem Most Restaurants Face', intro: 'You know the struggle.', points: ['People can’t find you online — customers Google "restaurants near me" but you’re nowhere to be found', 'No way to show your food — your delicious dishes aren’t visible to potential customers', 'Lost reservation opportunities — people call during busy hours; reservations aren’t tracked', 'No way to keep customers informed — specials, new dishes, and events don’t reach your audience', 'Competing with big chains — international chains have websites; you’re stuck with nothing'] },
    solution: { title: 'How MatjarX Solves It', intro: 'Your restaurant online, with your MatjarX website:', points: ['Online Menu Display — showcase your full menu with beautiful food photos and descriptions, customers browse anytime', 'Reservation System — easy booking for customers, you manage all reservations in one place, no missed bookings', 'Location & Hours — always visible on Google, customers know exactly how to find you and when you’re open', 'Customer Engagement — share new dishes, specials, events, keep customers coming back', 'Professional Presence — compete with bigger restaurants, show you’re serious about your business'] },
    included: { title: 'Everything You Need', sections: [
      { title: 'Menu Page', blocks: [{ sub: [{ h: 'Full digital menu', items: ['All dishes with descriptions', 'High-quality food photos', 'Prices', 'Special ingredients highlighted', 'Dietary information (vegan, gluten-free, etc.)'] }, { h: 'Organized menu', items: ['Appetizers, main courses, desserts', 'Beverages', 'Catering menu (if applicable)', 'Seasonal specials', 'Featured dishes'] }] }] },
      { title: 'Reservation System', blocks: [{ sub: [{ h: 'Easy booking', items: ['Date and time selection', 'Party size', 'Special requests', 'Email confirmation', 'Reminder notifications'] }, { h: 'Management', items: ['All reservations in one place', 'Daily view', 'Customer information', 'Special notes', 'No-show tracking'] }] }] },
      { title: 'Gallery', blocks: [{ sub: [{ h: 'Showcase your restaurant', items: ['Restaurant interior photos', 'Plated dish photos', 'Ambiance images', 'Team photos', 'Customer moments'] }, { h: 'Professional photography', items: ['Make food look amazing', 'Build appetite appeal', 'Create desire to visit'] }] }] },
      { title: 'Location & Hours', blocks: [{ items: ['Address prominently displayed', 'Google Maps integration', 'Directions link', 'Phone number', 'Hours (with notes for special days)'] }] },
      { title: 'Testimonials & Reviews', blocks: [{ items: ['Customer quotes', 'Star ratings', 'Review aggregation', 'Google reviews display', 'Video testimonials'] }] },
    ] },
    successStories: { title: 'Real Restaurant Success', items: [
      { title: 'Mumbai Restaurant Chain', lines: ['Before: 60 customers/week from word-of-mouth', 'After: 240 customers/week (200% increase)', 'Added online menu visibility and Google presence', 'Cost: PKR 15,600/month'] },
      { title: 'Karachi Fine Dining', lines: ['Before: 15 reservations/month through phone', 'After: 65 reservations/month online', 'Cost: PKR 27,000/month (includes marketing expert)', 'Result: 4x reservation increase in 6 months'] },
      { title: 'Lahore Quick Service Restaurant', lines: ['Before: missed online orders during busy times', 'After: online ordering system integrated', 'Cost: PKR 55,000/month (Platinum)', 'Result: 35% revenue increase from online orders'] },
    ] },
    featuresSpecific: { title: 'Features Specific to Restaurants', sections: [
      { title: 'Menu Management', blocks: [{ items: ['Multiple menu formats (PDF, web, print)', 'Easy updates (add new dishes, seasonal items)', 'Photo highlighting (feature your best dishes)', 'Ingredient specifications', 'Allergen information'] }] },
      { title: 'Online Ordering Integration', blocks: [{ items: ['Connect to delivery apps', 'Setup for online orders', 'Order management', 'Payment processing'] }] },
      { title: 'Special Offers', blocks: [{ items: ['Display current specials', 'Happy hour times', 'Discount codes', 'Limited-time offerings', 'Seasonal menus'] }] },
      { title: 'Ambiance Photos', blocks: [{ items: ['Interior design showcase', 'Table settings', 'Event spaces', 'Private dining areas', 'Banquet capabilities'] }] },
      { title: 'Chef/Team Showcase', blocks: [{ items: ['Owner/chef bio', 'Cuisine expertise', 'Years of experience', 'Awards and recognition', 'Personal touch'] }] },
      { title: 'Events & Catering', blocks: [{ items: ['Catering menu page', 'Event space details', 'Party packages', 'Contact for customization', 'Booking system'] }] },
    ] },
    marketing: { title: 'Marketing Your Restaurant', sections: [
      { title: 'Local SEO', blocks: [{ items: ['Google Business Profile optimization', 'Local keyword ranking', '"Restaurants near me" discovery', 'Map visibility', 'Review generation'] }] },
      { title: 'Blog Content', blocks: [{ items: ['Cooking tips', 'Ingredient highlights', 'Recipe features', 'Food trends', 'Restaurant news'] }] },
      { title: 'Social Media Integration', blocks: [{ items: ['Menu updates to Facebook', 'Instagram food photos', 'Special announcements', 'Customer engagement', 'Review sharing'] }] },
      { title: 'Email Marketing', blocks: [{ items: ['Loyalty programs', 'Specials notifications', 'New dish announcements', 'Event invitations', 'Birthday offers'] }] },
    ] },
    testimonials: { title: 'What Restaurant Owners Say', items: [
      { quote: 'Our reservations tripled in the first month. People find us on Google and book online immediately. It’s changed our business.', name: 'Malik, Restaurant Owner, Islamabad' },
      { quote: 'The menu photos make our food look irresistible. Customers tell us they came because of how good the pictures looked online.', name: 'Fatima, Cafe Owner, Karachi' },
      { quote: 'Managing reservations through the website is so much easier. No more missed bookings, no confusion about party sizes.', name: 'Ahmed, Dining Manager, Lahore' },
    ] },
    plans: { title: 'Which Plan Fits Your Restaurant?', tiers: [
      { name: 'Launch Plan', audience: 'Basic online presence', items: ['5-10 pages', 'Menu display', 'Location and hours', 'Contact form'] },
      { name: 'Boost Plan', audience: 'Growing restaurant', items: ['30 pages', 'Menu with photos', 'Reservations system', 'Blog for specials and updates', 'VIP phone support'], price: 'PKR 15,600/month' },
      { name: 'Growth Plan', audience: 'Established restaurant', items: ['50 pages', 'Full menu management', 'Reservation system', 'Dedicated marketing expert', 'Monthly strategy calls', 'Blog posts and social media'], price: 'PKR 27,000/month' },
      { name: 'Platinum Plan', audience: 'Multi-location or chain', items: ['Unlimited pages', 'Online ordering integration', 'Reservation system', 'Multiple location management', 'Ad campaign management', 'Full team support'], price: 'PKR 55,000/month' },
    ] },
    gettingStarted: { title: 'Your Restaurant Online in 7 Days', steps: ['Choose your plan', 'Answer our restaurant questionnaire', 'Schedule launch call with our team', 'We build your website with menu setup', 'Review and approve', 'Launch!', 'Start getting customers'] },
    faqs: [
      { q: 'Can I update my menu myself?', a: 'Yes! Use our editor to add/remove items, update prices, change descriptions anytime.' },
      { q: 'Does it work for online orders?', a: 'Yes! We can integrate with delivery apps and setup online ordering on your site.' },
      { q: 'How do reservations work?', a: 'Customers book on your website. You receive notifications and manage in your dashboard.' },
      { q: 'Can I add event spaces and catering info?', a: 'Yes! Dedicated pages for events, catering menus, and special requests.' },
      { q: 'How much does it help with Google visibility?', a: 'Significantly! We optimize for "restaurants near me" searches. Most clients see results in 2-3 months.' },
    ],
    closing: { title: 'Get Your Restaurant Website Now', body: 'See your restaurant when customers search for dining.', cta: 'Launch Your Restaurant Website' },
  },

  'real-estate': {
    reality: { title: 'You’re Leaving Money On The Table', points: ['Buyers search online first — 90% of buyers start their search online, but your listings aren’t there', 'No central listing hub — your properties scattered across 5 different portals instead of one professional site', 'Missing lead generation — buyers interested in properties but no way to contact you directly', 'No mobile presence — buyers searching on phones can’t view or inquire about properties', 'Competitors have better websites — other agents’ websites are more professional, more complete, more effective', 'Manual follow-up only — every lead requires manual contact; leads slip through'] },
    solution: { title: 'Your Properties. Your Rules. Your Leads.', points: ['24/7 Listing Showcase — all your properties displayed beautifully; buyers find you online anytime, anywhere', 'Property Search — buyers filter by price, location, bedrooms; they self-qualify, you get qualified leads only', 'Instant Inquiries — buyers interested in a property contact you directly from the listing, automatic email notifications', 'Mobile-Optimized — 100% of buyers browsing on phones see professional layouts, no zooming or scrolling headaches', 'Lead Magnet — capture buyers before they move to competitor websites, automatic lead database', 'Agent Credibility — professional website = professional agent, builds trust immediately'] },
    included: { title: 'Everything for Listing Success', sections: [
      { title: 'Property Listing Pages', blocks: [{ sub: [{ h: 'Complete listing details', items: ['Price (highlighted)', 'Location with Google Maps', 'Bedrooms, bathrooms, sq. ft.', 'Year built, property type', 'Lot size and amenities', 'HOA information', 'Tax information'] }, { h: 'Organized by status', items: ['Active listings', 'Coming soon', 'Sold (social proof)', 'Leasing properties'] }] }] },
      { title: 'Photo Gallery', blocks: [{ sub: [{ h: 'Professional presentation', items: ['Multiple photos per property', 'Lightbox slideshow', '360° property views (if available)', 'Virtual tour capability', 'Drone photography integration'] }, { h: 'Photo optimization', items: ['Professional presentation', 'Mobile-optimized loading', 'High-quality display', 'Fast loading speeds'] }] }] },
      { title: 'Property Search', blocks: [{ sub: [{ h: 'Buyer self-qualification', items: ['Filter by price range', 'Filter by location', 'Filter by bedrooms/bathrooms', 'Property type filter', 'School district filter', 'Save favorites feature'] }, { h: 'Smart search', items: ['Auto-complete suggestions', 'Nearby amenities', 'Commute time calculator', 'Neighborhood information'] }] }] },
      { title: 'Agent Profiles', blocks: [{ sub: [{ h: 'Build credibility', items: ['Agent bio and photo', 'Years of experience', 'Specializations', 'Awards and recognition', 'Client testimonials', 'Social media links'] }, { h: 'Expertise showcase', items: ['Market knowledge display', 'Neighborhood expertise', 'Transaction history (sanitized)', 'Awards and certifications'] }] }] },
      { title: 'Lead Capture', blocks: [{ sub: [{ h: 'Convert interest to contacts', items: ['Property inquiry forms', 'Mortgage calculator', 'Request property info', 'Schedule showings', 'Email notifications for saved properties'] }, { h: 'Automatic follow-up', items: ['Email confirmations', 'Lead database', 'CRM integration', 'Email automation'] }] }] },
      { title: 'Blog Section', blocks: [{ items: ['Neighborhood guides', 'Buying tips', 'Selling tips', 'Market updates', 'Home improvement ideas', 'School information'] }] },
      { title: 'Testimonials & Reviews', blocks: [{ items: ['Client success stories', 'Before/after sales', 'Closing timelines', 'Client quotes', 'Video testimonials'] }] },
    ] },
    successStories: { title: 'Agents Making More Money', items: [
      { title: 'Karachi Real Estate Agent', lines: ['Before: 8 sales/month, leads from personal network only', 'After: 22 sales/month, 60% from website', 'Added property listings and lead capture', 'Cost: PKR 15,600/month · ROI: 200% increase in 6 months'] },
      { title: 'Lahore Brokerage Firm', lines: ['Before: 5 agents, manual lead handling', 'After: integrated all agents and listings, automated lead distribution', 'Cost: PKR 27,000/month', 'Result: 45 sales/month (up from 18)'] },
      { title: 'Islamabad Real Estate Team', lines: ['Before: 3,000 website visitors/month, low conversion', 'After: 12,000 visitors/month, 18% inquiry conversion', 'Added property search and CRM integration', 'Cost: PKR 55,000/month (Platinum)', 'Result: leads automatically qualified and distributed'] },
    ] },
    featuresSpecific: { title: 'Features Real Estate Agents Love', sections: [
      { title: 'MLS Integration', blocks: [{ items: ['Connect MLS feeds', 'Auto-update listings', 'Sold data integration', 'Automatic property removal', 'Multi-MLS support'] }] },
      { title: 'Virtual Tours', blocks: [{ items: ['3D property tours', 'Matterport integration', 'Drone photography gallery', 'Video walkthroughs', '360° photos'] }] },
      { title: 'Neighborhood Pages', blocks: [{ items: ['School ratings', 'Crime statistics', 'Walkability scores', 'Nearby amenities', 'Market statistics'] }] },
      { title: 'Market Analysis', blocks: [{ items: ['Sold price data (if available)', 'Market trends', 'Days on market', 'Price per sq. ft.', 'Comparative analysis'] }] },
      { title: 'Lead Management', blocks: [{ items: ['Automatic lead capture', 'Lead scoring', 'CRM integration', 'Automated follow-up', 'Lead attribution tracking'] }] },
      { title: 'Email Automation', blocks: [{ items: ['New listing alerts', 'Price reduction notifications', 'Sold notifications', 'Open house invitations', 'Market updates'] }] },
    ] },
    marketing: { title: 'Marketing Your Real Estate Services', sections: [
      { title: 'Local SEO', blocks: [{ items: ['Rank for "homes for sale in [city]"', 'Rank for neighborhood searches', 'Google Business Profile optimization', '"Real estate agent near me" visibility', 'Map pack domination'] }] },
      { title: 'Content Marketing', blocks: [{ items: ['Neighborhood guides (SEO gold)', 'Buyer/seller guides', 'Market statistics', 'Investment tips', 'School information guides'] }] },
      { title: 'Lead Magnet', blocks: [{ items: ['Free home valuation tool', 'Buyer’s guide (PDF)', 'Neighborhood reports', 'Market analysis reports', 'First-time buyer guide'] }] },
      { title: 'Social Media Integration', blocks: [{ items: ['Facebook property listings', 'Instagram photo galleries', 'Virtual tour sharing', 'Market update posts', 'Success story sharing'] }] },
    ] },
    plans: { title: 'Choose Your Level', tiers: [
      { name: 'Boost Plan', audience: 'Solo agent', items: ['30 property listings', 'Agent profile', 'Search functionality', 'Blog for market updates', 'VIP phone support'], price: 'PKR 15,600/month' },
      { name: 'Growth Plan', audience: 'Growing team', items: ['50 properties', 'Multiple agent profiles', 'Lead management', 'Dedicated marketing expert', 'Monthly strategy calls'], price: 'PKR 27,000/month' },
      { name: 'Platinum Plan', audience: 'Brokerage or large team', items: ['Unlimited listings', 'Multiple agents', 'CRM integration', 'Lead distribution', 'Ad campaign management'], price: 'PKR 55,000/month' },
    ] },
    gettingStarted: { title: 'Your Real Estate Website in 7-14 Days', steps: ['Choose your plan', 'Provide property inventory', 'Setup agent profiles', 'Configure listing options', 'Property photos and details', 'Review and test', 'Launch!'] },
    faqs: [
      { q: 'Can I auto-update listings from MLS?', a: 'Yes! MLS integration available (pricing varies by MLS).' },
      { q: 'How do I capture buyer leads?', a: 'Automatic lead forms on each property. You get email notifications instantly.' },
      { q: 'Can I add virtual tours?', a: 'Yes! Matterport, drone photos, and video tours supported.' },
      { q: 'What about sold properties?', a: 'Sold listings visible as social proof. Shows your sales activity and success.' },
      { q: 'Can I add multiple agents?', a: 'Yes! Each agent gets their own profile and listings. Growth/Platinum plans support multiple agents.' },
      { q: 'How fast will I rank?', a: 'Property pages rank quickly. New listings typically visible in search within 2-4 weeks.' },
    ],
    closing: { title: 'Get Your Real Estate Website Now', body: 'Beat competitors with better technology.', cta: 'Launch Your Real Estate Website' },
  },

  'clinics-and-healthcare': {
    reality: { title: 'The Trust Factor', points: ['Professional websites build credibility — patients trust doctors with professional websites 3x more than those without', 'Online booking is expected — 60% of patients won’t call to book, they want to book online', 'Credentials matter — patients want to see your qualifications, board certifications, and experience upfront', '24/7 accessibility — new patients can find you, learn about your services, and book anytime', 'Competitive advantage — practices with websites attract more patients than those without'] },
    solution: { title: 'Streamlined Patient Experience', intro: 'Patient finds you online → learns about your services → sees doctor credentials → books appointment online → gets confirmation → shows up prepared.', points: ['Result: more booked appointments, better prepared patients, smoother practice.'] },
    included: { title: 'Everything Patients Expect', sections: [
      { title: 'Doctor & Specialist Profiles', blocks: [{ sub: [{ h: 'Complete credentials', items: ['Medical degree and school', 'Board certifications', 'Years of experience', 'Specializations', 'Languages spoken', 'Professional photo'] }, { h: 'Build patient trust', items: ['Published articles/research', 'Hospital affiliations', 'Awards and recognition', 'Patient testimonials', 'Approach to care philosophy'] }] }] },
      { title: 'Services & Specialties', blocks: [{ sub: [{ h: 'Detailed service descriptions', items: ['What the service is', 'Who needs it', 'What to expect', 'Cost information', 'Appointment duration', 'Preparation instructions'] }, { h: 'Multiple specialties organized', items: ['Cardiology, Dermatology, Pediatrics, etc.', 'Each with dedicated page', 'Doctor assigned to each service', 'Clear differentiation'] }] }] },
      { title: 'Online Appointment Booking', blocks: [{ sub: [{ h: 'Patient convenience', items: ['See available time slots', 'Choose preferred doctor', 'Select service type', 'Book instantly', 'Email confirmation'] }, { h: 'Practice efficiency', items: ['Automatic scheduling', 'Reduced no-shows', 'Patient pre-registration', 'Insurance verification form', 'Medical history collection'] }] }] },
      { title: 'Patient Resources', blocks: [{ sub: [{ h: 'Educational content', items: ['Health articles and guides', 'Treatment information', 'Symptom guides', 'Prevention tips', 'FAQ about common conditions'] }, { h: 'Preparation guides', items: ['What to bring to appointment', 'Insurance and payment info', 'New patient forms', 'Medical history form', 'Emergency contact form'] }] }] },
      { title: 'Insurance & Payment Information', blocks: [{ sub: [{ h: 'Clear transparency', items: ['Accepted insurance providers', 'Payment methods', 'Billing procedures', 'Financial policies', 'In-network status'] }, { h: 'No surprises', items: ['Cost estimators', 'Payment plans', 'Insurance verification', 'Transparent pricing'] }] }] },
      { title: 'Testimonials & Success Stories', blocks: [{ items: ['Patient success stories (anonymized)', 'Patient testimonials', 'Case studies', 'Before/after improvements', 'Patient satisfaction ratings'] }] },
      { title: 'Facility & Office Information', blocks: [{ sub: [{ h: 'Location & hours', items: ['Clear address', 'Google Maps', 'Parking information', 'Hours of operation', 'Emergency hours', 'Telehealth availability'] }, { h: 'Modern facility showcase', items: ['Office photos', 'Equipment showcase', 'Waiting area', 'Consultation rooms', 'Lab facilities'] }] }] },
    ] },
    successStories: { title: 'What Practices Are Seeing', items: [
      { title: 'Delhi Multi-Specialty Clinic', lines: ['Before: 30 appointments/week from walk-ins and phone calls', 'After: 85 appointments/week (65% increase)', 'Added online booking + doctor profiles', 'Cost: PKR 15,600/month', 'Result: 55 extra patients per week'] },
      { title: 'Karachi Dental Practice', lines: ['Before: 15 new patient inquiries/month', 'After: 48 new patient inquiries/month (220% increase)', 'Added service pages + specialist profiles', 'Cost: PKR 27,000/month', 'Result: fully booked 3 months in advance'] },
      { title: 'Lahore Dermatology Clinic', lines: ['Before: 40% no-show rate, limited online presence', 'After: 8% no-show rate with online booking', 'Better patient preparation + email reminders', 'Cost: PKR 15,600/month', 'Result: more predictable schedule, happier staff'] },
    ] },
    featuresSpecific: { title: 'Features Healthcare Practices Love', sections: [
      { title: 'Patient Portal Integration', blocks: [{ items: ['Patients access medical records', 'Upload test results', 'Message doctors', 'Refill prescriptions', 'Track health metrics'] }] },
      { title: 'Multi-Doctor Management', blocks: [{ items: ['Individual doctor profiles', 'Different specialty pages', 'Doctor-specific schedules', 'Patient can choose preferred doctor'] }] },
      { title: 'Insurance Integration', blocks: [{ items: ['Verify insurance in real-time', 'Submit claims automatically', 'Track coverage', 'Explain benefits', 'Handle denials'] }] },
      { title: 'Prescription Management', blocks: [{ items: ['E-prescription capability', 'Patient prescription history', 'Pharmacy integration', 'Refill tracking', 'Medication reminders'] }] },
      { title: 'Lab Results & Imaging', blocks: [{ items: ['Secure patient portal for results', 'Doctor interpretation available', 'Historical tracking', 'Download capability', 'Patient education'] }] },
      { title: 'Telemedicine Integration', blocks: [{ items: ['Virtual appointment capability', 'Video consultation scheduling', 'Secure video platform', 'Electronic prescriptions from virtual visits'] }] },
    ] },
    marketing: { title: 'Marketing Your Healthcare Practice', sections: [
      { title: 'Local SEO for Healthcare', blocks: [{ items: ['Rank for "doctors near me" searches', 'Rank for "specialist in [city]"', 'Google Business Profile optimization', 'Insurance provider directory listings', 'HealthGrades and WebMD presence'] }] },
      { title: 'Content Marketing', blocks: [{ items: ['Health condition guides', 'Treatment comparison articles', 'Wellness tips', 'Symptom guides', 'Prevention information'] }] },
      { title: 'Patient Education', blocks: [{ items: ['Video explaining procedures', 'Before/after education', 'Treatment option comparison', 'Recovery guides', 'FAQ videos with doctors'] }] },
      { title: 'Email Engagement', blocks: [{ items: ['Welcome series for new patients', 'Health tips and updates', 'Appointment reminders', 'Seasonal health alerts', 'Wellness newsletters'] }] },
    ] },
    plans: { title: 'Choose Your Level', tiers: [
      { name: 'Boost Plan', audience: 'Solo practitioner', items: ['Doctor profile', 'Service descriptions', 'Online appointment booking', 'Patient resources', 'VIP phone support'], price: 'PKR 15,600/month' },
      { name: 'Growth Plan', audience: 'Growing practice', items: ['Multiple doctor profiles', 'Advanced appointment system', 'Patient portal', 'Email reminders', 'Dedicated marketing expert', 'Monthly strategy calls'], price: 'PKR 27,000/month' },
      { name: 'Platinum Plan', audience: 'Multi-specialty clinic', items: ['Unlimited doctors', 'Advanced scheduling', 'Patient portal + messaging', 'Insurance integration', 'Lab results integration', 'Ad campaign management'], price: 'PKR 55,000/month' },
    ] },
    gettingStarted: { title: 'Your Healthcare Website in 7-14 Days', steps: ['Choose your plan', 'Provide doctor credentials and bios', 'List services and specialties', 'Configure appointment system', 'Add patient resources and FAQs', 'Review and test', 'Launch!'] },
    extras: [
      { title: 'Building Patient Trust Online', body: ['Medical Board Verification — state medical board license displayed, verification numbers, board certifications listed, no disciplinary history noted.', 'Accreditations & Affiliations — hospital affiliations, accredited facility certifications, professional memberships, research publications, academic appointments.', 'Patient Reviews — Google reviews integrated, Healthgrades ratings, WebMD ratings, verified patient testimonials, response to reviews (showing you care).', 'HIPAA Compliance — privacy commitment visible, secure patient data handling, confidentiality assurance, encryption disclosure, data protection explained.', 'Professional Content — medical articles written by doctors, evidence-based information, links to peer-reviewed research, acknowledgment of latest treatments, continuing education commitment.'] },
      { title: 'Compliance & Security', body: ['HIPAA Compliant: patient data encryption, secure portal, access controls, audit logs, regular security updates.', 'Data Protection: daily backups, disaster recovery, security monitoring, threat detection, SSL/HTTPS encryption.'] },
    ],
    faqs: [
      { q: 'Is my patient data secure?', a: 'Yes! HIPAA compliant, encrypted, and secure. Patient privacy is paramount.' },
      { q: 'Can patients book appointments online?', a: 'Yes! Automatic scheduling, confirmation emails, and reminders reduce no-shows.' },
      { q: 'Can I add multiple doctors?', a: 'Yes! Each doctor gets their own profile with schedules and specialties.' },
      { q: 'Can I show insurance information?', a: 'Yes! Display accepted insurances, verify coverage, and explain benefits.' },
      { q: 'Do patients need to create accounts?', a: 'No! Appointment booking is fast and simple. Account is optional.' },
      { q: 'Can I add patient testimonials?', a: 'Yes! Build trust with real patient success stories (anonymized).' },
    ],
    closing: { title: 'Get Your Healthcare Website Now', body: 'More bookings. Better patient care. Professional presence.', cta: 'Launch Your Medical Practice Website' },
  },

  'salons-and-spas': {
    reality: { title: 'You’re Leaving Money On The Table', points: ['Clients can’t see your work — portfolio stuck on Instagram; potential clients never find you', 'Can’t fill every chair — appointment book has gaps; clients call during busy times', 'Clients don’t know your services — no clear menu of services, pricing, or what to expect', 'You lose followers on social media — Instagram followers don’t become regular clients', 'New clients hesitate — first-timers unsure about quality, results, or what to expect', 'No online presence — competitors have websites; you’re barely findable'] },
    solution: { title: 'Transformations Sell Transformations', points: ['Portfolio Showcase — your best work on display 24/7, clients see results BEFORE they call', 'Stylist Profiles — each stylist builds their own following, clients book their favorite stylist', 'Online Booking — clients book online, anytime, no more "call back, I’ll put you on the list" conversations', 'Service Menu — clear pricing and services, no surprises, clients come prepared', 'Before/After Gallery — visual results are your best marketing, every transformation gets someone booking', 'Build Loyalty — clients come back for the results they see online'] },
    included: { title: 'Everything Beautiful Salons Need', sections: [
      { title: 'Stylist Profiles', blocks: [{ sub: [{ h: 'Individual profiles with', items: ['Professional photo', 'Bio and specializations', 'Years of experience', 'Services offered', 'Client testimonials', 'Social media links', 'Booking calendar'] }, { h: 'Build personal brands', items: ['Stylist followers become regular clients', 'Specializations highlighted (balayage, color correction, cuts, etc.)', 'Awards and recognition', 'Before/after gallery'] }] }] },
      { title: 'Service Menu with Pricing', blocks: [{ sub: [{ h: 'Clear service offerings', items: ['Hair services (cut, color, highlights, treatments)', 'Nail services (manicure, pedicure, designs)', 'Spa services (facials, massages, waxing)', 'Makeup services', 'Special occasion styling'] }, { h: 'Transparent pricing', items: ['Service prices clearly listed', 'Package deals', 'Loyalty discounts', 'First-time client offers', 'Seasonal promotions'] }] }] },
      { title: 'Before/After Photo Gallery', blocks: [{ sub: [{ h: 'Showcase transformations', items: ['Hair color before/after', 'Haircut styles before/after', 'Makeover transformations', 'Bridal makeup/hair', 'Special event styling', 'Multiple angles for each transformation'] }, { h: 'Organized by category', items: ['By service type', 'By hair type (curly, fine, thick, etc.)', 'By color (blonde, brunette, red, etc.)', 'By look (trendy, classic, bold, etc.)', 'By stylist'] }] }] },
      { title: 'Online Appointment Booking', blocks: [{ sub: [{ h: 'Easy scheduling', items: ['See available times', 'Choose preferred stylist', 'Select service', 'Book instantly', 'Get confirmation with prep instructions'] }, { h: 'Reduce no-shows', items: ['Automatic reminder emails', 'SMS reminders (optional)', 'Rebook easy', 'Waitlist for cancellations'] }] }] },
      { title: 'Service Descriptions', blocks: [{ items: ['What the service includes', 'How long it takes', 'What to expect', 'Aftercare instructions', 'Product recommendations', 'When to rebook'] }] },
      { title: 'Testimonials & Reviews', blocks: [{ items: ['Client testimonials', 'Star ratings', 'Google reviews', 'Success stories', 'Before/after testimonials', 'Video testimonials (optional)'] }] },
      { title: 'Promotions & Special Offers', blocks: [{ items: ['New client special', 'Seasonal promotions', 'Loyalty rewards', 'Group packages', 'Gift certificates (online purchase)', 'Holiday specials'] }] },
      { title: 'Blog Section', blocks: [{ items: ['Hair care tips', 'Trending styles', 'Color care guides', 'Styling tutorials', 'Makeup tips', 'Wellness articles'] }] },
    ] },
    successStories: { title: 'What Salons Are Experiencing', items: [
      { title: 'Karachi High-End Salon', lines: ['Before: 60 appointments/week through phone/walk-ins', 'After: 140 appointments/week (130% increase)', 'Added before/after gallery + stylist profiles + online booking', 'Cost: PKR 15,600/month', 'Result: chair was always full; 3-week booking wait'] },
      { title: 'Lahore Beauty Studio', lines: ['Before: Instagram followers (3,000) didn’t convert to clients', 'After: website + Instagram integration = regular clients', 'Added portfolio showcase + booking link', 'Cost: PKR 15,600/month', 'Result: Instagram followers became regular clients with 60% conversion'] },
      { title: 'Islamabad Bridal Salon', lines: ['Before: lost seasonal business; couldn’t scale beyond walk-ins', 'After: online booking + stylist profiles = consistent revenue', 'Seasonal promotions on website', 'Cost: PKR 27,000/month', 'Result: fully booked during wedding season; steady business off-season'] },
    ] },
    featuresSpecific: { title: 'Built for Beauty Professionals', sections: [
      { title: 'Stylist Booking Preferences', blocks: [{ items: ['Clients select preferred stylist', 'Each stylist manages own schedule', 'Stylist builds own client base', 'Incentivize top stylists (they attract clients)'] }] },
      { title: 'Service Duration Management', blocks: [{ items: ['Automatic booking based on service', 'Prevents double-booking', 'Buffer time between appointments', 'Lunch break scheduling', 'Vacation blocking'] }] },
      { title: 'Waitlist Management', blocks: [{ items: ['Clients get notified of cancellations', 'Easy rebook process', 'Walk-in list', 'Last-minute appointments filled'] }] },
      { title: 'Package Management', blocks: [{ items: ['Sell package deals', 'Track usage', 'Expiration dates', 'Upsell similar services'] }] },
      { title: 'Review Management', blocks: [{ items: ['Google reviews aggregated', 'Respond to reviews', 'Build reputation', 'Showcase testimonials'] }] },
    ] },
    marketing: { title: 'Attract Beauty-Conscious Clients', sections: [
      { title: 'Instagram Integration', blocks: [{ items: ['Auto-post before/afters', 'Link to booking', 'Hashtag strategy guidance', 'Client sharing'] }] },
      { title: 'Local SEO', blocks: [{ items: ['Rank for "salon near me"', 'Rank for "hair salon in [neighborhood]"', 'Google Business Profile', 'Local directory listings', 'Map visibility'] }] },
      { title: 'Email Marketing', blocks: [{ items: ['New service announcements', 'Promotion offers', 'Reactivate inactive clients', 'Birthday/anniversary specials', 'VIP client exclusives'] }] },
      { title: 'Content Marketing', blocks: [{ items: ['Styling guides', 'Hair care tips', 'Trending styles', 'Product recommendations', 'Makeup tutorials'] }] },
    ] },
    plans: { title: 'Choose Your Level', tiers: [
      { name: 'Boost Plan', audience: 'Solo stylist or small salon', items: ['Service menu', 'Before/after gallery', 'Online booking', 'Stylist profile', 'VIP phone support'], price: 'PKR 15,600/month' },
      { name: 'Growth Plan', audience: 'Growing salon', items: ['Multiple stylist profiles', 'Advanced booking system', 'Email reminders', 'Review management', 'Dedicated marketing expert'], price: 'PKR 27,000/month' },
      { name: 'Platinum Plan', audience: 'Large salon or multi-location', items: ['Unlimited stylists', 'Advanced scheduling', 'Waitlist management', 'Loyalty program', 'Ad campaigns', 'Gift card sales'], price: 'PKR 55,000/month' },
    ] },
    gettingStarted: { title: 'Your Salon Website in 7 Days', steps: ['Choose your plan', 'Provide stylist photos and bios', 'List services and pricing', 'Upload before/after photos', 'Setup appointment system', 'Add promotions', 'Launch!'] },
    extras: [
      { title: 'Social Media Integration: Instagram Meets Salon Booking', body: ['Before/afters auto-sync', 'Swipe-up link to booking (Instagram Business)', 'Direct booking from stories', 'Client user-generated content', 'Hashtag collection'] },
    ],
    faqs: [
      { q: 'How do I upload before/after photos?', a: 'Simple uploader. Organize by stylist, service type, or style. Unlimited uploads.' },
      { q: 'Can multiple stylists take appointments?', a: 'Yes! Each stylist has their own schedule and client followers.' },
      { q: 'Can I offer online gift certificates?', a: 'Yes! Clients buy gift certificates online. Redeemable in salon.' },
      { q: 'Will this bring more walk-in traffic?', a: 'Yes! Google visibility increases significantly. Plus online booking keeps chair full.' },
      { q: 'Can I create service packages?', a: 'Yes! Package pricing, special combos, and loyalty packages.' },
      { q: 'How do I manage multiple locations?', a: 'Platinum plan supports multiple location management and combined scheduling.' },
    ],
    closing: { title: 'Get Your Salon Website Now', body: 'Showcase your transformations. Book every appointment. Build your legacy.', cta: 'Launch Your Salon Website' },
  },

  'gyms-and-fitness': {
    reality: { title: 'Motivation Through Transformation', points: ['Prospects want proof of results — they need to see member transformations before committing', 'Unsure about trainer expertise — can’t verify if trainers actually know what they’re doing', 'No way to see class schedule — last-minute changes or schedule uncertainty = no sign-ups', 'Unaware of membership options — pricing confusion keeps prospects away', 'Don’t know community culture — worried they’ll feel out of place in the gym', 'No proof of member success — "results not typical" but members want to see real transformations'] },
    solution: { title: 'Before/After That Converts', points: ['Member Transformations — real before/afters inspire prospects, motivation is contagious', 'Trainer Expertise — trainer credentials, certifications, specializations build confidence', 'Class Schedule — transparent schedule (and schedule changes) reduce confusion', 'Member Testimonials — real members talking about results, community, motivation', 'Membership Options — clear pricing with no surprises, easy to choose right plan', 'Gym Community — photos of members, events, challenges, sense of belonging'] },
    included: { title: 'Everything Fitness Gyms Need', sections: [
      { title: 'Member Transformation Gallery', blocks: [{ sub: [{ h: 'Real before/afters', items: ['Weight loss transformations', 'Muscle gain transformations', 'Fitness goal achievements', 'Multiple angles per transformation', 'Timeline (3 months, 6 months, 1 year)', 'Member permission/privacy'] }, { h: 'Organized by goal', items: ['Weight loss', 'Muscle building', 'Fitness/endurance', 'General health', 'Sport-specific training', 'Age-based categories'] }] }] },
      { title: 'Trainer Profiles', blocks: [{ sub: [{ h: 'Build trust with expertise', items: ['Professional photo', 'Certifications (NASM, ACE, etc.)', 'Specializations (weight loss, bodybuilding, sports training)', 'Years of experience', 'Trainer testimonials', 'Success stories with clients'] }, { h: 'Personal brand', items: ['Training philosophy', 'Client transformation stories', 'Articles/tips written', 'Social media links', 'Online coaching availability'] }] }] },
      { title: 'Class Schedule', blocks: [{ sub: [{ h: 'Easy to find classes', items: ['All classes listed by day/time', 'Class name and description', 'Instructor assigned', 'Duration', 'Difficulty level', 'Capacity/waitlist', 'Online sign-up (reduces no-shows)'] }, { h: 'Multiple formats', items: ['Group fitness classes', 'Personal training', 'Bootcamp', 'Yoga/meditation', 'Specialized classes (boxing, CrossFit, HIIT)'] }] }] },
      { title: 'Membership Plans', blocks: [{ sub: [{ h: 'Clear pricing', items: ['Basic membership', 'Premium membership', 'Trainer packages', 'Class packages', 'Annual discounts', 'Trial offers', 'No hidden fees'] }, { h: 'Comparison table', items: ['What’s included in each plan', 'Trainer access', 'Class access', 'Locker/shower', 'Member benefits'] }] }] },
      { title: 'Facility Showcase', blocks: [{ items: ['Equipment showcase', 'Cardio area', 'Weight training area', 'Functional training space', 'Locker room/showers', 'Member lounge', 'Cleanliness standards'] }] },
      { title: 'Testimonials & Success Stories', blocks: [{ items: ['Success stories (detailed)', 'Video testimonials', 'Star ratings', 'Quote testimonials', 'Results achieved', 'Timeline to results', 'Community feedback'] }] },
      { title: 'Fitness Resources', blocks: [{ items: ['Workout tips by trainer', 'Nutrition guides', 'Recovery articles', 'Fitness goal setting', 'Progress tracking tips'] }] },
    ] },
    successStories: { title: 'Members & Revenue Growth', items: [
      { title: 'Karachi Premium Gym', lines: ['Before: 200 active members, 30 new sign-ups/month', 'After: 420 active members, 85 new sign-ups/month (183% increase)', 'Added member transformations + trainer profiles + class schedule', 'Cost: PKR 27,000/month', 'Result: transformation photos drove member referrals'] },
      { title: 'Lahore Fitness Studio', lines: ['Before: seasonal memberships (busy winter, quiet summer)', 'After: consistent memberships year-round', 'Online challenge + community posts', 'Cost: PKR 15,600/month', 'Result: 40% increase in non-peak season memberships'] },
      { title: 'Islamabad CrossFit Box', lines: ['Before: unknown to broader market, 60 members', 'After: local celebrity gym, 180+ members', 'Showcased transformations + athlete profiles', 'Cost: PKR 27,000/month', 'Result: 200% growth in 6 months from website visibility'] },
    ] },
    featuresSpecific: { title: 'Built for Fitness Businesses', sections: [
      { title: 'Class Booking System', blocks: [{ items: ['Members can pre-book classes', 'Reduces no-shows with email reminders', 'Waitlist for full classes', 'Trainer can manage max class size', 'HIIT class priority (popular classes book fast)'] }] },
      { title: 'Challenge Management', blocks: [{ items: ['Create monthly/quarterly challenges', 'Transformation tracking', 'Leaderboards', 'Prize management', 'Team vs individual tracking'] }] },
      { title: 'Membership Management', blocks: [{ items: ['Track membership status', 'Auto-renewal management', 'Pause membership feature', 'Trial conversion tracking', 'Churn prevention'] }] },
      { title: 'Trainer Scheduling', blocks: [{ items: ['Trainer bio and availability', 'Personal training booking', 'Nutrition consultation booking', 'Group class teaching'] }] },
      { title: 'Community Features', blocks: [{ items: ['Member photos/wall', 'Achievements showcase', 'Member spotlights', 'Referral program', 'Event promotion'] }] },
    ] },
    marketing: { title: 'Fill Classes and Retain Members', sections: [
      { title: 'Member Testimonial Strategy', blocks: [{ items: ['Monthly member spotlight', 'Transformation showcase', 'Success story emails', 'Referral incentives'] }] },
      { title: 'Social Media Integration', blocks: [{ items: ['Transformation photos → Instagram', 'Class schedule → Facebook', 'Workout tips → TikTok', 'Member testimonials → YouTube shorts'] }] },
      { title: 'Email Marketing', blocks: [{ items: ['New class announcements', 'Challenge participation', 'Member achievements', 'Retention campaigns', 'Re-engagement for inactive members'] }] },
      { title: 'Referral Program', blocks: [{ items: ['Incentivize member referrals', '"Bring a friend" free class', 'Referral tracking on website'] }] },
    ] },
    plans: { title: 'Choose Your Level', tiers: [
      { name: 'Boost Plan', audience: 'Solo trainer or small gym', items: ['Trainer profiles', 'Class schedule', 'Membership info', 'Member testimonials'], price: 'PKR 15,600/month' },
      { name: 'Growth Plan', audience: 'Growing gym', items: ['Multiple trainer profiles', 'Online class booking', 'Transformation gallery', 'Email reminders', 'Dedicated marketing expert'], price: 'PKR 27,000/month' },
      { name: 'Platinum Plan', audience: 'Large gym or multi-location', items: ['Unlimited trainer profiles', 'Advanced booking system', 'Challenge management', 'Member referral program', 'Loyalty program', 'Ad campaigns'], price: 'PKR 55,000/month' },
    ] },
    gettingStarted: { title: 'Your Gym Website in 7 Days', steps: ['Choose your plan', 'Provide trainer profiles and certifications', 'List all classes and schedules', 'Upload member transformation photos', 'Create membership pricing', 'Add facility photos', 'Launch!'] },
    extras: [
      { title: 'Member Benefits: Why Members Love Gyms With Websites', body: ['Convenience: find class schedule, book, get reminders', 'Inspiration: see transformations of members like them', 'Community: feel part of something bigger', 'Progress: track achievements alongside others', 'Access: message trainers, get tips, stay motivated'] },
    ],
    faqs: [
      { q: 'Can members book classes online?', a: 'Yes! Class booking with email reminder reduces no-shows 40%.' },
      { q: 'How do I get member before/afters?', a: 'Request permission from members achieving results. Offer incentive if needed.' },
      { q: 'Can I showcase multiple trainers?', a: 'Yes! Each trainer gets their own profile with their transformation stories.' },
      { q: 'Will this increase class attendance?', a: 'Yes! Transparent schedule + online booking + community = higher attendance.' },
      { q: 'Can I run challenges?', a: 'Yes! Create monthly challenges with leaderboards and prizes.' },
      { q: 'How does this help member retention?', a: 'Community + transformation inspiration + easy booking = members stay longer.' },
    ],
    closing: { title: 'Get Your Fitness Website Now', body: 'Fill classes. Transform members. Build community.', cta: 'Launch Your Gym Website' },
  },

  'construction-companies': {
    reality: { title: 'You’re Losing Bids Without Realizing It', points: ['Clients research before calling — they Google your company first; if you’re not there, they call a competitor', 'No way to show previous work — your best projects unknown to potential clients; can’t showcase quality', 'Competitors make you look small — contractors with websites look bigger, more professional, more trustworthy', 'No proof of experience — new clients have no way to verify you can handle their project', 'Missing testimonials from past clients — no social proof = clients nervous about quality and reliability', 'Bid response takes forever — manual back-and-forth; slow process loses deals to faster competitors'] },
    solution: { title: 'Credibility Gets Contracts', points: ['Project Portfolio — every completed project visible, clients see quality immediately', 'Team Credentials — licenses, certifications, years of experience, build trust', 'Client Testimonials — real clients talking about quality, reliability, professionalism', 'Case Studies — detailed before/afters of projects with timelines and budgets', 'Awards & Recognition — industry awards, certifications, memberships displayed prominently', 'Fast Response — online project inquiry forms = instant lead capture, respond faster than competitors'] },
    included: { title: 'Everything Contractors Need', sections: [
      { title: 'Project Portfolio Gallery', blocks: [{ sub: [{ h: 'Showcase completed work', items: ['Before/during/after photos', 'Project description', 'Project scope and details', 'Timeline (start to finish)', 'Team involvement', 'Any special challenges overcome'] }, { h: 'Organized by type', items: ['Residential construction', 'Commercial projects', 'Renovation projects', 'Specialized work (roofing, concrete, etc.)', 'Project size', 'Timeline (recent, archive)'] }] }] },
      { title: 'Service Offerings', blocks: [{ sub: [{ h: 'Clear service descriptions', items: ['New construction', 'Renovation/remodeling', 'Additions', 'Roofing', 'Foundation work', 'Specialized trades', 'Commercial vs residential'] }, { h: 'Detailed explanations', items: ['What’s included', 'Timeline expectations', 'Process explanation', 'Quality standards', 'Warranty information'] }] }] },
      { title: 'Team Credentials', blocks: [{ sub: [{ h: 'Build confidence', items: ['Project manager bios', 'Foreman profiles', 'Specialty contractor credentials', 'Licenses displayed', 'Insurance information', 'Certifications'] }, { h: 'Experience showcase', items: ['Years in business', 'Projects completed', 'Team size', 'Specializations', 'Awards and recognition'] }] }] },
      { title: 'Client Testimonials', blocks: [{ items: ['Client testimonials (with project)', 'Before/after results', 'Timeline adherence', 'Budget accuracy', 'Quality satisfaction', 'Video testimonials (powerful)', 'Repeat client indicators'] }] },
      { title: 'Case Studies', blocks: [{ items: ['Project overview', 'Challenges encountered', 'Solutions implemented', 'Timeline and budget', 'Before/during/after photos', 'Client testimonial', 'Impact on client'] }] },
      { title: 'Equipment & Capabilities', blocks: [{ items: ['Heavy equipment owned', 'Safety equipment', 'Technology (3D modeling, drones, etc.)', 'Workforce size', 'Capacity for large projects', 'Production capabilities'] }] },
      { title: 'Contact & Inquiry Forms', blocks: [{ items: ['Project description', 'Timeline needed', 'Budget range', 'Contact information', 'Automatic quote process', 'Project inquiry tracking'] }] },
    ] },
    successStories: { title: 'Contracts & Revenue Growth', items: [
      { title: 'Karachi Construction Firm', lines: ['Before: 2-3 bids/week, 20% bid win rate', 'After: 8-10 bids/week, 45% bid win rate (4x more revenue)', 'Added project portfolio + team credentials', 'Cost: PKR 27,000/month', 'Result: credibility increased; price competitiveness less important'] },
      { title: 'Lahore Renovation Contractor', lines: ['Before: mostly word-of-mouth; seasonal work', 'After: steady pipeline of leads year-round', 'Google visibility + project showcase', 'Cost: PKR 15,600/month', 'Result: calendar booked 4 months in advance'] },
      { title: 'Islamabad Multi-Specialty Construction', lines: ['Before: competed mainly with local firms; limited to region', 'After: competitive for larger regional projects', 'Professional website + detailed case studies', 'Cost: PKR 27,000/month', 'Result: 3x project value from larger commercial work'] },
    ] },
    featuresSpecific: { title: 'Built for Your Trade', sections: [
      { title: 'Quote Request System', blocks: [{ items: ['Automated project intake forms', 'Lead scoring by project size', 'Automatic quote generation', 'Project timeline management', 'Progress tracking'] }] },
      { title: 'Project Timeline Showcase', blocks: [{ items: ['Start date → completion date', 'Key milestones highlighted', 'On-time performance metric', 'Budget adherence shown', 'Variations managed'] }] },
      { title: 'Safety Record Display', blocks: [{ items: ['OSHA compliance highlighted', 'Safety certifications', 'Zero-incident records', 'Worker safety statistics', 'Insurance ratings'] }] },
      { title: 'Subcontractor Network', blocks: [{ items: ['Specialty contractors listed', 'Trusted partners highlighted', 'Joint project capability', 'Expertise showcase'] }] },
      { title: 'Equipment Inventory', blocks: [{ items: ['Available equipment listed', 'Specialized equipment highlighted', 'Rental vs owned', 'Capacity visualization'] }] },
    ] },
    marketing: { title: 'Build Reputation and Win Contracts', sections: [
      { title: 'Case Study Strategy', blocks: [{ items: ['Document every major project', 'Detailed before/afters', 'Timeline and budget', 'Challenge and solution', 'Client testimonial'] }] },
      { title: 'Referral Program', blocks: [{ items: ['Incentivize client referrals', 'Easy sharing mechanism', 'Tracking for rewards'] }] },
      { title: 'Local Search Strategy', blocks: [{ items: ['"Construction near me" ranking', 'Google Business Profile optimization', 'Local directory listings', 'Industry-specific directories'] }] },
      { title: 'Testimonial Generation', blocks: [{ items: ['Request client testimonials', 'Video testimonial incentive', 'Detailed case study collaboration', 'Portfolio permission'] }] },
    ] },
    plans: { title: 'Choose Your Level', tiers: [
      { name: 'Boost Plan', audience: 'Solo or small team', items: ['Project portfolio (30 projects)', 'Team credentials', 'Contact/quote form', 'Testimonials'], price: 'PKR 15,600/month' },
      { name: 'Growth Plan', audience: 'Growing company', items: ['Project portfolio (50+ projects)', 'Case studies with timelines/budgets', 'Team profiles', 'Quote request system', 'Dedicated marketing expert'], price: 'PKR 27,000/month' },
      { name: 'Platinum Plan', audience: 'Large firm or multi-specialty', items: ['Unlimited project portfolio', 'Advanced case studies', 'Multi-team management', 'Quote automation', 'Lead scoring', 'Ad campaigns'], price: 'PKR 55,000/month' },
    ] },
    gettingStarted: { title: 'Your Construction Website in 7-14 Days', steps: ['Choose your plan', 'Gather project photos (before/during/after)', 'Provide team credentials and licenses', 'List services and specialties', 'Write project descriptions/case studies', 'Add client testimonials', 'Launch!'] },
    faqs: [
      { q: 'How do I show confidential projects?', a: 'Use generic descriptions or client permission. Focus on work type and quality.' },
      { q: 'Should I show pricing?', a: 'Service-based pricing vague; project-specific quotes via contact form.' },
      { q: 'How do I get project photos?', a: 'Take during progress and completion. Request permission from clients.' },
      { q: 'Will this really get more bids?', a: 'Yes! Professionalism increases bid inquiries significantly.' },
      { q: 'Can I showcase subcontractors?', a: 'Yes! Show your network and specialization access.' },
    ],
    closing: { title: 'Get Your Construction Website Now', body: 'Showcase quality. Build credibility. Win contracts.', cta: 'Launch Your Construction Website' },
  },

  'law-firms': {
    reality: { title: 'Building Legal Confidence', points: ['Clients want proof of expertise — credentials, bar association status, case results matter', 'Unsure about practice areas — can this lawyer handle my specific case type?', 'No testimonials or results — have they won similar cases? What are outcomes?', 'Uncertain about approachability — will they explain things clearly? Do they care?', 'No easy contact method — clients want to reach out easily; phone tag wastes time'] },
    solution: { title: 'Expertise on Display', points: ['Attorney Credentials — bar admissions, education, certifications visible immediately', 'Practice Area Expertise — clear which lawyer handles which practice area', 'Case Results — settlement amounts (anonymized), case types won, outcomes achieved', 'Client Testimonials — real clients talking about outcomes and service quality', 'Legal Resources — educational content showing legal knowledge and case guidance', 'Easy Contact — multiple ways to reach you; quick response expected'] },
    included: { title: 'Everything Attorneys Need', sections: [
      { title: 'Attorney Profiles', blocks: [{ sub: [{ h: 'Build client confidence', items: ['Education (law school, degrees)', 'Bar admissions (state, federal)', 'Board certifications', 'Professional honors', 'Years practicing', 'Practice areas', 'Case results (anonymized)'] }, { h: 'Personal connection', items: ['Professional photo', 'Bio/philosophy', 'Specializations', 'Client testimonials', 'Speaking engagements', 'Publications'] }] }] },
      { title: 'Practice Areas', blocks: [{ sub: [{ h: 'Detailed explanations', items: ['Family law, criminal law, corporate law, etc.', 'What cases fall under each area', 'Process explanation', 'Typical outcomes', 'Fees/billing information', 'Related practice areas'] }, { h: 'Lead attorney assigned', items: ['Clear which attorney handles which area', 'Easy client matching'] }] }] },
      { title: 'Case Results', blocks: [{ items: ['Settlement amounts (if disclosed)', 'Case types won', 'Outcomes achieved', 'Client satisfaction', 'Verdict results', 'Note confidentiality restrictions'] }] },
      { title: 'Testimonials & Reviews', blocks: [{ items: ['Client testimonials (anonymized)', 'Case outcome testimonials', 'Professional testimonials (other attorneys, judges)', 'Google reviews', 'Avvo ratings', 'Video testimonials (powerful)'] }] },
      { title: 'Legal Resources', blocks: [{ items: ['Practice area guides', 'Legal process explanations', 'FAQ by practice area', 'Blog articles', 'Videos explaining legal concepts', 'Resource guides for clients'] }] },
      { title: 'Contact & Consultation', blocks: [{ items: ['Contact form', 'Phone/email', 'Online intake form', 'Free consultation offer', 'Retainer information', 'Confidentiality assurance'] }] },
    ] },
    successStories: { title: 'Growing Practice & More Clients', items: [
      { title: 'Delhi Family Law Firm', lines: ['Before: 15 new clients/month from referrals', 'After: 45 new clients/month (200% increase)', 'Added practice areas + attorney profiles + testimonials', 'Cost: PKR 27,000/month', 'Result: became known for specific practice area'] },
      { title: 'Karachi Corporate Law Firm', lines: ['Before: competed mainly on reputation; hard to reach', 'After: easily found; professional presence', 'Added case results + legal resources', 'Cost: PKR 27,000/month', 'Result: 50% increase in initial consultations'] },
      { title: 'Lahore Criminal Defense', lines: ['Before: mostly referral clients; low online visibility', 'After: visible for "criminal defense near me"', 'Added attorney profiles + case results + testimonials', 'Cost: PKR 15,600/month', 'Result: doubled client volume in 12 months'] },
    ] },
    featuresSpecific: { title: 'Built for Law Firms', sections: [
      { title: 'Matter Management Integration', blocks: [{ items: ['Client portal for case documents', 'Secure communications', 'Document sharing', 'Timeline tracking', 'Billing transparency'] }] },
      { title: 'Confidentiality & HIPAA Compliance', blocks: [{ items: ['Client privacy protected', 'Secure communications', 'Encrypted portals', 'Compliance documentation'] }] },
      { title: 'Appointment Scheduling', blocks: [{ items: ['Consultation booking', 'Follow-up scheduling', 'Calendar management', 'Automated reminders'] }] },
      { title: 'Client Intake', blocks: [{ items: ['Online intake forms', 'Information collection', 'Conflict check process', 'Automated follow-up'] }] },
      { title: 'Legal Resources Library', blocks: [{ items: ['Practice guides', 'Process explanations', 'FAQ articles', 'Video tutorials', 'Resource documents'] }] },
    ] },
    marketing: { title: 'Build Reputation and Attract Clients', sections: [
      { title: 'Practice Area Specialization', blocks: [{ items: ['Showcase expertise in specific areas', 'Write articles about practice areas', 'Case results in relevant areas', 'Testimonials from similar cases'] }] },
      { title: 'Local SEO', blocks: [{ items: ['Rank for "attorney near me"', 'Practice area + location searches', 'Google Business Profile', 'Bar association directory listings'] }] },
      { title: 'Content Marketing', blocks: [{ items: ['Legal blog posts', 'Practice area guides', 'Video explanations', 'Resource downloads'] }] },
      { title: 'Testimonial Strategy', blocks: [{ items: ['Request client testimonials', 'Showcase successful outcomes', 'Video testimonials if possible', 'Highlight satisfaction'] }] },
    ] },
    plans: { title: 'Choose Your Level', tiers: [
      { name: 'Boost Plan', audience: 'Solo attorney', items: ['Attorney profile', 'Practice areas', 'Testimonials', 'Contact form'], price: 'PKR 15,600/month' },
      { name: 'Growth Plan', audience: 'Growing firm', items: ['Multiple attorney profiles', 'Case results (with permission)', 'Legal resources/blog', 'Client portal', 'Email consultations', 'Dedicated marketing expert'], price: 'PKR 27,000/month' },
      { name: 'Platinum Plan', audience: 'Established firm', items: ['Unlimited attorney profiles', 'Advanced case results showcase', 'Matter management integration', 'Client portal', 'Lead scoring by case type', 'Ad campaigns'], price: 'PKR 55,000/month' },
    ] },
    gettingStarted: { title: 'Your Law Firm Website in 7-14 Days', steps: ['Choose plan', 'Provide attorney credentials and bios', 'List practice areas', 'Gather (anonymized) case results', 'Add client testimonials/reviews', 'Write practice area descriptions', 'Launch!'] },
    extras: [
      { title: 'Compliance & Ethics: We Understand Attorney Requirements', body: ['Bar Association Compliance: no misleading statements, confidentiality maintained, ethics rules followed, advertising restrictions honored, client references anonymized.'] },
    ],
    faqs: [
      { q: 'Can I show case results?', a: 'Yes! Anonymized case results (with permission) are powerful proof.' },
      { q: 'Should I list my fees?', a: 'Transparency builds trust. Hourly rates or consultation fees help.' },
      { q: 'How do I get client testimonials?', a: 'Request after successful case resolution. Anonymize if needed.' },
      { q: 'Can I publish legal advice?', a: 'Educational content yes; specific legal advice requires attorney-client relationship.' },
      { q: 'Will this get me more clients?', a: 'Yes! Online visibility + credibility = more consultations.' },
    ],
    closing: { title: 'Get Your Law Firm Website Now', body: 'Build trust. Attract clients. Grow your practice.', cta: 'Launch Your Law Firm Website' },
  },

  'online-stores-ecommerce': {
    reality: { title: 'Sales Don’t Stop at Closing Time', points: ['Store hours limit sales — customers can only buy when you’re open', 'Inventory sits unsold — products are invisible to customers outside your location', 'No online sales channel — competitors selling online while you’re offline', 'Manual order tracking — each order requires manual processing', 'Local market only — stuck selling to neighborhood when you could sell nationwide'] },
    solution: { title: 'Revenue 24/7', points: ['Professional Storefront — products beautifully displayed, easy to browse', 'Shopping Cart — customers add items and checkout seamlessly', 'Payment Processing — accept payments securely, money in your account', 'Inventory Management — track stock levels, know when you’re running low', 'Order Management — all orders in one dashboard, track shipments', 'Expand Beyond Local — sell to customers nationwide, 24/7 sales'] },
    included: { title: 'Everything E-Commerce Needs', sections: [
      { title: 'Product Catalog', blocks: [{ sub: [{ h: 'Unlimited products', items: ['Product name and description', 'Multiple photos per product', 'Price and discounts', 'Product variants (size, color, etc.)', 'Stock levels', 'Product categories', 'Tags and filters'] }, { h: 'Organization', items: ['Categories and subcategories', 'Featured products', 'New arrivals', 'Best sellers', 'Sale items', 'Related products'] }] }] },
      { title: 'Shopping Cart', blocks: [{ items: ['Add to cart', 'Update quantities', 'Remove items', 'Save for later', 'Wishlist functionality', 'Cart saved across sessions', 'Mobile optimized'] }] },
      { title: 'Checkout Process', blocks: [{ items: ['One-page checkout (fast)', 'Guest checkout option', 'Account creation optional', 'Saved payment methods', 'Address autofill', 'Order summary', 'Shipping method selection'] }] },
      { title: 'Payment Processing', blocks: [{ items: ['Credit/debit cards (via gateway)', 'Bank transfers', 'JazzCash', 'Multiple payment methods', 'Secure encryption', 'PCI compliant'] }] },
      { title: 'Inventory Management', blocks: [{ items: ['Real-time inventory updates', 'Low stock alerts', 'Out of stock management', 'Inventory forecasting', 'Supplier management', 'Stock history'] }] },
      { title: 'Order Management', blocks: [{ items: ['All orders in dashboard', 'Order status tracking', 'Customer information', 'Payment confirmation', 'Shipping details', 'Refund processing', 'Order history'] }] },
      { title: 'Shipping Integration', blocks: [{ items: ['Generate shipping labels', 'Track shipments', 'Customer notifications', 'Multiple couriers supported', 'Shipping cost calculation', 'Return management'] }] },
      { title: 'Customer Reviews', blocks: [{ items: ['Product reviews', 'Star ratings', 'Review moderation', 'Customer photos', 'Review responses', 'Verified purchases'] }] },
      { title: 'Promotions & Discounts', blocks: [{ items: ['Coupon codes', 'Percentage discounts', 'Fixed amount discounts', 'Bundle deals', 'Free shipping promotions', 'Seasonal sales'] }] },
    ] },
    successStories: { title: 'Revenue Growth', items: [
      { title: 'Karachi Fashion E-Commerce', lines: ['Before: 20 online orders/month', 'After: 180 online orders/month (800% increase)', 'Professional store + payment processing', 'Cost: PKR 27,000/month', 'Result: 45% of revenue now online'] },
      { title: 'Lahore Handcrafts Store', lines: ['Before: $2,000/month local sales', 'After: $8,000/month (nationwide shipping)', 'Online store opened nationwide market', 'Cost: PKR 15,600/month', 'Result: sold out inventory within months'] },
      { title: 'Islamabad Electronics Retailer', lines: ['Before: inventory gathering dust in showroom', 'After: inventory turning over monthly', 'Online + physical store integration', 'Cost: PKR 27,000/month', 'Result: 3x sales volume'] },
    ] },
    featuresSpecific: { title: 'Built for Online Selling', sections: [
      { title: 'SEO for Products', blocks: [{ items: ['Each product SEO optimized', 'Product keywords ranking', 'Google Shopping integration', 'Product schema markup', 'Rich snippets for products'] }] },
      { title: 'Email Marketing', blocks: [{ items: ['Abandoned cart recovery', 'New product announcements', 'Sale promotions', 'Customer retention campaigns', 'Upsell recommendations'] }] },
      { title: 'Analytics', blocks: [{ items: ['Sales dashboard', 'Product performance', 'Customer behavior', 'Conversion tracking', 'Revenue reports'] }] },
      { title: 'Customer Service', blocks: [{ items: ['Live chat for shopping help', 'Email support', 'FAQ section', 'Returns process', 'Warranty information'] }] },
      { title: 'Multi-Product Management', blocks: [{ items: ['Bulk uploads', 'Batch editing', 'Variants at scale', 'Category management', 'Filter/search optimization'] }] },
    ] },
    marketing: { title: 'Drive Online Sales', sections: [
      { title: 'Product SEO', blocks: [{ items: ['Each product ranks for keywords', 'Long-tail keywords', 'High search intent', 'Conversion optimized'] }] },
      { title: 'Social Media Integration', blocks: [{ items: ['Instagram shopping', 'Facebook marketplace', 'TikTok commerce', 'Pinterest pins', 'YouTube product videos'] }] },
      { title: 'Email Campaigns', blocks: [{ items: ['Newsletter with new products', 'Abandonment recovery', 'Loyalty rewards', 'Birthday/anniversary offers', 'Seasonal promotions'] }] },
      { title: 'Paid Ads', blocks: [{ items: ['Google Shopping campaigns', 'Facebook/Instagram ads', 'Retargeting ads', 'Audience targeting', 'ROI optimization'] }] },
    ] },
    plans: { title: 'Choose Your Level', tiers: [
      { name: 'Boost Plan', audience: 'Starting seller', items: ['Product catalog (30 products)', 'Shopping cart', 'Basic payment', 'Email marketing'], price: 'PKR 15,600/month' },
      { name: 'Growth Plan', audience: 'Growing store', items: ['Product catalog (50+ products)', 'Advanced payment options', 'Email campaigns', 'Analytics dashboard', 'Dedicated marketing expert'], price: 'PKR 27,000/month' },
      { name: 'Platinum Plan', audience: 'Established store', items: ['Unlimited products', 'Advanced payment integration', 'Shipping integration', 'Inventory management', 'Email automation', 'Ad campaign management'], price: 'PKR 55,000/month' },
    ] },
    gettingStarted: { title: 'Your Online Store in 7 Days', steps: ['Choose plan', 'Gather product information and photos', 'Setup payment method', 'Add products to catalog', 'Configure shipping', 'Set pricing and promotions', 'Launch!'] },
    faqs: [
      { q: 'How much do payment processing fees cost?', a: 'Typically 1-3% per transaction depending on payment gateway. We can discuss options.' },
      { q: 'Can I sell internationally?', a: 'Yes! Setup shipping to multiple countries. Tax/customs vary by country.' },
      { q: 'Can I upload lots of products?', a: 'Yes! Bulk upload tools available. Unlimited products on Platinum plan.' },
      { q: 'Does this help with shipping?', a: 'Yes! Integration with couriers automates labels and tracking.' },
      { q: 'Will this increase my sales?', a: 'Yes! Online stores open new customer markets and drive 24/7 sales.' },
    ],
    closing: { title: 'Get Your Online Store Now', body: 'Professional store. Secure checkout. Growing revenue.', cta: 'Launch Your Online Store' },
  },

  'wedding-and-event-planners': {
    reality: { title: 'Visual Trust', points: ['Couples research planners online — they Google "wedding planner" + their city first', 'Can’t see event quality — no way to evaluate your aesthetic, taste, attention to detail', 'Unsure about your capabilities — what can you handle? Big events? Small intimate weddings?', 'No past work to reference — would love to see similar style events to what they want', 'Missing pricing information — don’t know if they can afford you'] },
    solution: { title: 'Gallery That Converts', points: ['Event Portfolio — beautiful gallery of past events, couples see exactly what you do', 'Package Options — clear pricing and services, couples know what they’re getting', 'Service Breakdown — vendor coordination, timeline management, design, everything listed', 'Client Testimonials — happy couples raving about your service, social proof', 'Planning Timeline — show your process, couples understand how you work', 'Easy Inquiry — couples book consultation directly from website'] },
    included: { title: 'Everything Planners Need', sections: [
      { title: 'Event Portfolio Gallery', blocks: [{ sub: [{ h: 'Showcase past events', items: ['Wedding photos (multiple angles)', 'Decor and design elements', 'Ceremony and reception details', 'Vendor collaborations highlighted', 'Before/after transformation', 'Timeline of event day'] }, { h: 'Organized by style', items: ['Elegant/formal weddings', 'Rustic/outdoor weddings', 'Modern/minimalist events', 'Colorful/bold celebrations', 'Budget-friendly events', 'Themed events', 'Corporate events', 'Milestone celebrations'] }] }] },
      { title: 'Service Packages', blocks: [{ sub: [{ h: 'Clear pricing tiers', items: ['Full-service planning (start-to-finish)', 'Day-of coordination only', 'Partial planning', 'Vendor-only services', 'Design consultation packages'] }, { h: 'Package details', items: ['What’s included in each package', 'Add-on services', 'Timeline (how far in advance to book)', 'Customization options', 'Budget ranges'] }] }] },
      { title: 'Planning Process & Timeline', blocks: [{ items: ['12-month planning overview', 'Key milestones and decisions', 'Your role at each stage', 'Vendor selection process', 'Budget management approach', 'Problem-solving examples'] }] },
      { title: 'Testimonials & Client Success Stories', blocks: [{ items: ['Bride/groom testimonials', 'Event success stories', 'Budget management', 'Timeline adherence', 'Vendor collaboration', 'Video testimonials (powerful)'] }] },
      { title: 'Vendor Network', blocks: [{ items: ['Florists', 'Caterers', 'Photographers', 'Venues', 'DJs/musicians', 'Venue decorators', 'Makeup artists', 'Other specialists'] }] },
      { title: 'Service Details', blocks: [{ items: ['Ceremony coordination', 'Reception management', 'Vendor communication', 'Timeline creation', 'Budget management', 'Problem solving', 'Design consultation'] }] },
      { title: 'FAQs & Planning Guide', blocks: [{ items: ['How far in advance to book', 'Budget guidance', 'Customization options', 'Your cancellation policy', 'What happens day-of', 'Payment terms'] }] },
    ] },
    successStories: { title: 'Bookings & Revenue', items: [
      { title: 'Delhi Wedding Planner', lines: ['Before: 8 bookings/year (mostly referrals)', 'After: 28 bookings/year (250% increase)', 'Added event gallery + packages + inquiry form', 'Cost: PKR 27,000/month', 'Result: fully booked 1 year in advance'] },
      { title: 'Karachi Corporate Event Planner', lines: ['Before: corporate events only; inconsistent bookings', 'After: mix of weddings + corporate + intimate events', 'Website opened new market segments', 'Cost: PKR 15,600/month', 'Result: 3x revenue from diversification'] },
      { title: 'Lahore Destination Wedding Planner', lines: ['Before: limited to local clients; word-of-mouth only', 'After: destination wedding inquiries nationwide', 'Professional website + stunning portfolio', 'Cost: PKR 27,000/month', 'Result: highest-value bookings increased significantly'] },
    ] },
    featuresSpecific: { title: 'Built for Event Businesses', sections: [
      { title: 'Portfolio Management', blocks: [{ items: ['Unlimited event photos', 'Organized by event type and style', 'Before/after transformations', 'Vendor highlights'] }] },
      { title: 'Inquiry & Booking', blocks: [{ items: ['Easy client contact forms', 'Consultation request booking', 'Automatic response', 'Lead tracking'] }] },
      { title: 'Package Management', blocks: [{ items: ['Multiple service packages', 'Tiered pricing', 'Add-on services', 'Seasonal pricing variations', 'Payment terms'] }] },
      { title: 'Timeline Creation', blocks: [{ items: ['Show your planning process', 'Educational for couples', 'Build confidence'] }] },
      { title: 'Vendor Showcase', blocks: [{ items: ['Partner network display', 'Collaborative relationships', 'Referral system'] }] },
    ] },
    marketing: { title: 'Get More Bookings', sections: [
      { title: 'Portfolio Strategy', blocks: [{ items: ['Beautiful photography essential', 'Highlight your unique aesthetic', 'Show variety (different styles)', 'Before/after transformations', 'Vendor collaborations'] }] },
      { title: 'Content Marketing', blocks: [{ items: ['Wedding planning blog', 'Timeline guides', 'Budget tips', 'Trend forecasts', 'Vendor recommendations'] }] },
      { title: 'Email Marketing', blocks: [{ items: ['Engagement announcements', 'Planning tips', 'Inspiration galleries', 'Testimonial stories', 'Special season promotions'] }] },
      { title: 'Social Media Integration', blocks: [{ items: ['Instagram showcase (essential)', 'Pinterest boards', 'Facebook event gallery', 'TikTok event highlights', 'Video testimonials'] }] },
    ] },
    plans: { title: 'Choose Your Level', tiers: [
      { name: 'Boost Plan', audience: 'Solo planner', items: ['Event portfolio (30 events)', 'Service packages', 'Testimonials', 'Inquiry form'], price: 'PKR 15,600/month' },
      { name: 'Growth Plan', audience: 'Growing business', items: ['Event portfolio (50+ events)', 'Advanced packages', 'Vendor network', 'Consultation booking', 'Email follow-up', 'Dedicated marketing expert'], price: 'PKR 27,000/month' },
      { name: 'Platinum Plan', audience: 'Established firm', items: ['Unlimited event portfolio', 'Custom package management', 'Full vendor network', 'Lead tracking', 'Event booking system', 'Ad campaigns'], price: 'PKR 55,000/month' },
    ] },
    gettingStarted: { title: 'Your Event Planner Website in 7 Days', steps: ['Choose plan', 'Gather past event photos', 'Organize by event type/style', 'Write service descriptions', 'Create package pricing', 'Gather client testimonials', 'Launch!'] },
    faqs: [
      { q: 'How do I protect client privacy?', a: 'Use client permission, blur faces if needed, focus on decor/design.' },
      { q: 'Should I show prices?', a: 'Yes! Transparency helps. Packages + price ranges reduce unqualified inquiries.' },
      { q: 'How many events should I showcase?', a: 'Start with 20-30 diverse events. Update quarterly with new work.' },
      { q: 'Will this really get me more bookings?', a: 'Yes! Portfolio websites book 250%+ more events than those without.' },
      { q: 'Can I showcase vendor partnerships?', a: 'Absolutely! It builds credibility and strengthens vendor relationships.' },
    ],
    closing: { title: 'Get Your Event Planner Website Now', body: 'Beautiful portfolio. Easy booking. Growing revenue.', cta: 'Launch Your Event Planner Website' },
  },

  'auto-repair-shops': {
    reality: { title: 'Transparency Builds Trust', points: ['Don’t know service costs — customers fear being overcharged; uncertain pricing keeps them away', 'Uncertain about shop quality — no way to verify reliability or expertise', 'Can’t book appointments online — customers call, get voicemail, feel ignored', 'No service information — customers don’t know what services you offer', 'Missing customer testimonials — would trust the shop if other customers vouched'] },
    solution: { title: 'Pricing That Sells Service', points: ['Service Menu with Pricing — no surprises, customers know costs before calling', 'Transparent Diagnostics — explain common issues and repairs needed', 'Online Booking — customers book appointments anytime, no phone tag', 'Customer Testimonials — real customers raving about reliability and fair pricing', 'Warranty Information — show confidence in your work', 'Quick Contact — multiple ways to reach you; fast response expected'] },
    included: { title: 'Everything Repair Shops Need', sections: [
      { title: 'Service Menu with Pricing', blocks: [{ sub: [{ h: 'Clear service listing', items: ['Oil changes', 'Tire services', 'Brake repair', 'Transmission service', 'Engine diagnostics', 'Electrical work', 'General maintenance', 'Custom services'] }, { h: 'Pricing transparency', items: ['Service price ranges', 'Diagnostic fee', 'Labor rates', 'Parts marking explanation', 'Discount opportunities', 'Seasonal promotions'] }] }] },
      { title: 'Online Appointment Booking', blocks: [{ sub: [{ h: 'Customer convenience', items: ['View available time slots', 'Schedule appointments online', 'Automatic confirmation email', 'Reminder notifications', 'Reduce no-shows'] }, { h: 'Shop efficiency', items: ['Automatic scheduling', 'Better time management', 'Reduced phone calls', 'Lead capture'] }] }] },
      { title: 'Technician Profiles', blocks: [{ items: ['Professional photo', 'Certifications (ASE, etc.)', 'Specializations', 'Years of experience', 'Customer testimonials', 'Expertise areas'] }] },
      { title: 'Testimonials & Reviews', blocks: [{ items: ['Customer testimonials', 'Google reviews', 'Repair success stories', 'Fair pricing feedback', 'Reliability testimonials', 'Honesty praise'] }] },
      { title: 'Service Descriptions', blocks: [{ items: ['What each service includes', 'Why it’s important', 'Recommended timeline', 'Warning signs', 'Maintenance schedule', 'Preventative tips'] }] },
      { title: 'Contact & Inquiry', blocks: [{ items: ['Online appointment booking', 'Phone/email', 'Emergency service info', 'Emergency contact', 'Hours including emergency'] }] },
      { title: 'Maintenance Tips Blog', blocks: [{ items: ['Car maintenance guides', 'Seasonal maintenance', 'Common repair issues', 'Preventative tips', 'Cost-saving advice'] }] },
    ] },
    successStories: { title: 'Bookings & Revenue Growth', items: [
      { title: 'Karachi Auto Repair Shop', lines: ['Before: 15-20 appointments/week, many no-shows', 'After: 35-40 appointments/week, 5% no-show rate', 'Added online booking + transparent pricing', 'Cost: PKR 15,600/month', 'Result: doubled revenue from fewer no-shows + repeat customers'] },
      { title: 'Lahore Brake & Tire Specialist', lines: ['Before: mostly walk-in customers', 'After: 60% of customers from online booking', 'Professional website + service pricing', 'Cost: PKR 15,600/month', 'Result: predictable schedule; happy customers from transparency'] },
      { title: 'Islamabad General Auto Service', lines: ['Before: lost customers to shops with better reputations', 'After: customer testimonials online built trust', 'Cost: PKR 15,600/month', 'Result: 40% increase in new customer bookings'] },
    ] },
    featuresSpecific: { title: 'Built for Your Shop', sections: [
      { title: 'Service Pricing', blocks: [{ items: ['Different pricing for different vehicle types', 'Labor + parts separated', 'Warranty information', 'Guarantee period shown'] }] },
      { title: 'Appointment Reminder', blocks: [{ items: ['Automatic email reminder', 'SMS reminder option', 'Reduces no-shows', 'Improves shop efficiency'] }] },
      { title: 'Technician Scheduling', blocks: [{ items: ['Assign work to specific technicians', 'Match customers with experienced techs', 'Build personal loyalty'] }] },
      { title: 'Reviews Management', blocks: [{ items: ['Google reviews aggregated', 'Respond to reviews', 'Build online reputation'] }] },
      { title: 'Maintenance Tracker', blocks: [{ items: ['Help customers understand when service is due', 'Educational value', 'Increase repeat business'] }] },
    ] },
    marketing: { title: 'Build Trust and Customer Loyalty', sections: [
      { title: 'Testimonial Strategy', blocks: [{ items: ['Request reviews from satisfied customers', 'Respond to all reviews', 'Showcase positive feedback'] }] },
      { title: 'Content Marketing', blocks: [{ items: ['Maintenance tips blog', 'Seasonal service guides', 'Common repair issues', 'Cost-saving advice', 'DIY vs professional work'] }] },
      { title: 'Local SEO', blocks: [{ items: ['Rank for "auto repair near me"', '"Mechanic in [neighborhood]"', 'Google Business Profile', 'Local directory listings'] }] },
      { title: 'Email Marketing', blocks: [{ items: ['Service reminders', 'Maintenance schedule tips', 'Special promotions', 'Seasonal service suggestions'] }] },
    ] },
    plans: { title: 'Choose Your Level', tiers: [
      { name: 'Boost Plan', audience: 'Solo shop or small team', items: ['Service menu + pricing', 'Online appointment booking', 'Testimonials', 'Email support'], price: 'PKR 15,600/month' },
      { name: 'Growth Plan', audience: 'Growing business', items: ['Multiple technician profiles', 'Advanced pricing options', 'Customer testimonials', 'Maintenance tips blog', 'Email reminders', 'Dedicated marketing expert'], price: 'PKR 27,000/month' },
      { name: 'Platinum Plan', audience: 'Large shop or multi-bay', items: ['Unlimited services', 'Advanced scheduling', 'Technician assignment', 'Review management', 'Lead tracking', 'Ad campaigns'], price: 'PKR 55,000/month' },
    ] },
    gettingStarted: { title: 'Your Auto Repair Website in 7 Days', steps: ['Choose plan', 'List all services offered', 'Research and set pricing', 'Gather technician info and certifications', 'Add customer testimonials', 'Write service descriptions', 'Launch!'] },
    faqs: [
      { q: 'Should I show all my pricing?', a: 'Yes! Transparency builds trust and attracts price-conscious customers.' },
      { q: 'What if prices vary by vehicle?', a: 'Show ranges. Customers understand repairs vary.' },
      { q: 'How do I get customer testimonials?', a: 'Request after repair completion. Most happy customers will provide.' },
      { q: 'Will online booking really reduce no-shows?', a: 'Yes! Confirmation emails + reminders reduce no-shows 40-50%.' },
      { q: 'Can I show warranty information?', a: 'Absolutely! Shows confidence and protects customer.' },
    ],
    closing: { title: 'Get Your Auto Repair Website Now', body: 'Transparent pricing. Easy booking. Trustworthy service.', cta: 'Launch Your Auto Repair Website' },
  },

  'b2b-clothing-manufacturer': {
    reality: { title: 'Convenience Changes Buying Behavior', points: ['Can’t see full product range — retailers don’t know all products you offer; missing order opportunities', 'Sample request process is manual — retailers have to call; slow process; some never follow up', 'MOQ unclear — retailers don’t know minimum order quantities; can’t quote customers', 'Pricing confusion — no transparency on wholesale pricing; retailers hesitate', 'No online ordering process — manual purchase orders slow business down'] },
    solution: { title: 'Streamlined Wholesale Experience', points: ['Complete Product Catalog — every product visible with photos, specs, sizing', 'Wholesale Pricing — clear bulk pricing tiers, retailers know costs upfront', 'Instant Sample Requests — retailers request samples online, you ship immediately', 'MOQ Clarity — minimum order quantities listed per product', 'Online Ordering — retailers place bulk orders directly, faster processing', '24/7 Availability — retailers browse and order anytime, anywhere'] },
    included: { title: 'Everything Wholesale Needs', sections: [
      { title: 'Product Catalog', blocks: [{ sub: [{ h: 'Complete product listing', items: ['Product name and SKU', 'Multiple photos (front, back, detail)', 'Colors available', 'Size range', 'Fabric/material', 'Weight and specifications', 'Available quantity (stock levels)'] }, { h: 'Organization', items: ['By product type (t-shirts, jeans, hoodies, etc.)', 'By category (men’s, women’s, children’s)', 'By fabric type', 'By price range', 'Featured items', 'New arrivals'] }] }] },
      { title: 'Wholesale Pricing', blocks: [{ sub: [{ h: 'Transparent bulk pricing', items: ['MOQ (minimum order quantity)', 'Price per unit', 'Volume discount tiers', 'Example: 100+ units, 500+ units, 1000+ units', 'Different pricing by quantity', 'Seasonal variations'] }, { h: 'Clear terms', items: ['Payment terms (net 30, net 60, etc.)', 'Lead time for orders', 'Reorder process', 'Return policy', 'Bulk order process'] }] }] },
      { title: 'Sample Request System', blocks: [{ items: ['Retailers select products', 'Request samples online', 'Email confirmation', 'Automatic tracking', 'Lead time for samples', 'Shipping information'] }] },
      { title: 'Product Specifications', blocks: [{ items: ['Fabric content and weight', 'Shrinkage information', 'Care instructions', 'Size chart/fit guide', 'Color variations', 'Packaging details', 'Shipping information'] }] },
      { title: 'Sizing Guides', blocks: [{ items: ['Size charts for each product', 'Fit guide (slim, regular, oversized)', 'International sizes (if applicable)', 'Measurement guide', 'Video fit demonstrations'] }] },
      { title: 'Bulk Order Process', blocks: [{ items: ['Online product selection', 'Quantity selection', 'Automatic quote generation', 'Payment options', 'Order confirmation', 'Tracking information'] }] },
      { title: 'Customization Options', blocks: [{ items: ['Private label options', 'Embroidery/printing', 'Custom sizing', 'Color options', 'Logo placement', 'Lead times for custom'] }] },
      { title: 'Company Information', blocks: [{ items: ['Manufacturing capabilities', 'Years in business', 'Production capacity', 'Quality certifications', 'Testing certifications', 'Awards/recognition', 'Supply chain transparency'] }] },
      { title: 'Testimonials & References', blocks: [{ items: ['Retailer testimonials', 'Brand testimonials', 'Quality feedback', 'On-time delivery feedback', 'Long-term partnership examples'] }] },
    ] },
    successStories: { title: 'Wholesale Orders & Revenue Growth', items: [
      { title: 'Punjab Clothing Manufacturer', lines: ['Before: 15-20 retailer inquiries/month', 'After: 60-80 retailer inquiries/month (300% increase)', 'Added online catalog + sample request system', 'Cost: PKR 27,000/month', 'Result: 3x wholesale orders within 6 months'] },
      { title: 'Karachi Fashion Supplier', lines: ['Before: manual sample request process; slow responses', 'After: instant sample requests processed daily', 'Streamlined wholesale operations', 'Cost: PKR 15,600/month', 'Result: 50% increase in retail partnerships'] },
      { title: 'Lahore Textile Exporter', lines: ['Before: local market focus; limited reach', 'After: national + international retail orders', 'Professional B2B website opened new markets', 'Cost: PKR 27,000/month', 'Result: 5x revenue from expanded retail reach'] },
    ] },
    featuresSpecific: { title: 'Built for Manufacturers', sections: [
      { title: 'Inventory Management', blocks: [{ items: ['Real-time stock levels', 'Low stock alerts', 'Production planning', 'Reorder management'] }] },
      { title: 'Bulk Quote System', blocks: [{ items: ['Automatic quote generation based on quantity', 'MOQ enforcement', 'Volume discounts applied', 'Lead time calculation'] }] },
      { title: 'Sample Management', blocks: [{ items: ['Track sample requests', 'Manage sample inventory', 'Shipping costs', 'Follow-up automation'] }] },
      { title: 'Customization Tracking', blocks: [{ items: ['Custom order management', 'Setup fees management', 'Lead time tracking', 'Quality checkpoints'] }] },
      { title: 'EDI/API Integration (Advanced)', blocks: [{ items: ['Direct B2B ordering from retailer systems', 'Automated order processing', 'Inventory syncing', 'Invoice automation'] }] },
    ] },
    marketing: { title: 'Reach More Retailers', sections: [
      { title: 'B2B Directory Listings', blocks: [{ items: ['Industry-specific directories', 'Wholesale supplier directories', 'Fashion industry platforms', 'Regional trade associations'] }] },
      { title: 'Content Marketing', blocks: [{ items: ['Product care guides', 'Fabric information', 'Industry trends', 'Wholesale buyer guides'] }] },
      { title: 'Email Marketing', blocks: [{ items: ['New product announcements', 'Seasonal collections', 'Bulk order incentives', 'VIP retailer offers'] }] },
      { title: 'Trade Show Presence', blocks: [{ items: ['Online alternative during off-season', 'Virtual trade show booth', 'Product showcase', 'Lead generation'] }] },
    ] },
    plans: { title: 'Choose Your Level', tiers: [
      { name: 'Boost Plan', audience: 'Starting wholesale', items: ['Product catalog (100+ products)', 'Wholesale pricing', 'Sample request form', 'Basic MOQ info'], price: 'PKR 15,600/month' },
      { name: 'Growth Plan', audience: 'Growing manufacturer', items: ['Full product catalog', 'Advanced pricing tiers', 'Customization options', 'Bulk quote system', 'Email inquiries', 'Dedicated sales support'], price: 'PKR 27,000/month' },
      { name: 'Platinum Plan', audience: 'Established supplier', items: ['Unlimited catalog management', 'Advanced wholesale pricing', 'EDI/API integration', 'Inventory management', 'Sample tracking', 'B2B analytics'], price: 'PKR 55,000/month' },
    ] },
    gettingStarted: { title: 'Your B2B Clothing Website in 7-14 Days', steps: ['Choose plan', 'Gather product information and photos', 'Organize by category/type', 'Set wholesale pricing tiers', 'Define MOQ per product', 'Add sizing/fit guides', 'Launch!'] },
    faqs: [
      { q: 'How do I set wholesale pricing?', a: 'Cost + margin typically 3-5x cost depending on industry. Volume discounts motivate larger orders.' },
      { q: 'Can I customize products?', a: 'Yes! Setup custom options, lead times, setup fees on website.' },
      { q: 'How do I handle samples?', a: 'Charge sample fee or waive for large potential orders. Track requests online.' },
      { q: 'Will this work internationally?', a: 'Yes! Multi-currency support, international shipping options available.' },
      { q: 'Can retailers place bulk orders online?', a: 'Yes! Online quote and order system available on Growth/Platinum plans.' },
    ],
    closing: { title: 'Get Your B2B Website Now', body: 'Professional catalog. Easy sampling. Growing retailers.', cta: 'Launch Your B2B Catalog' },
  },

  'b2b-leather-goods-manufacturer': {
    reality: { title: 'Authenticity Matters', points: ['Can’t verify leather quality — buyers want to see grades, tanning process, durability specs', 'Don’t understand customization options — what can you customize? Lead times? Minimums?', 'Uncertain about artisan credentials — how long have you been making leather? What’s your process?', 'No sample process — need to touch/feel leather before bulk ordering', 'Missing manufacturing transparency — where do materials come from? What’s your quality control?'] },
    solution: { title: 'Quality and Craftsmanship on Display', points: ['Leather Showcase — leather grades, tanning methods, durability specs visible', 'Artisan Credentials — manufacturing history, expertise, awards, certifications highlighted', 'Customization Options — clear what can be customized, lead times, minimums, pricing', 'Sample System — buyers request samples easily, feel quality before bulk order', 'Quality Certifications — tanning certifications, environmental compliance, testing results', 'Process Transparency — show your craftsmanship process, build confidence in quality'] },
    included: { title: 'Everything Leather Artisans Need', sections: [
      { title: 'Product Catalog', blocks: [{ sub: [{ h: 'Complete product showcase', items: ['Product name and SKU', 'High-quality photography (multiple angles)', 'Leather type and grade', 'Colors available', 'Dimensions and specifications', 'Weight and material details', 'Available quantity'] }, { h: 'Organization', items: ['By product type (wallets, belts, bags, etc.)', 'By leather type (full-grain, top-grain, etc.)', 'By use case (men’s, women’s, luxury, etc.)', 'Featured/bestselling products', 'New designs', 'Seasonal collections'] }] }] },
      { title: 'Leather Quality Information', blocks: [{ items: ['Leather grades explained', 'Full-grain vs top-grain', 'Tanning process (vegetable, chrome, etc.)', 'Durability specifications', 'Aging/patina characteristics', 'Care instructions', 'Quality guarantees'] }] },
      { title: 'Wholesale Pricing', blocks: [{ sub: [{ h: 'Transparent B2B pricing', items: ['MOQ (minimum order quantity)', 'Price per unit by volume', 'Volume discount tiers', 'Payment terms (net 30, net 60, etc.)', 'Lead time information', 'Custom order pricing'] }, { h: 'Clear pricing structure', items: ['Example: 10-50 units, 51-200, 200+', 'Different pricing by leather grade', 'Custom order setup fees', 'Rush order premiums'] }] }] },
      { title: 'Customization Options', blocks: [{ items: ['Custom leather selection', 'Custom colors/dyes', 'Monogramming/embossing', 'Size variations', 'Hardware choices', 'Lining options', 'Custom designs', 'Lead times for customization', 'Setup fees for custom'] }] },
      { title: 'Sample Request System', blocks: [{ items: ['Select products and leather types', 'Request samples online', 'Specify leather preferences', 'Email confirmation with shipping', 'Automatic tracking', 'Lead time for samples'] }] },
      { title: 'Artisan & Craftsmanship Information', blocks: [{ items: ['Founder/artisan bio', 'Years crafting leather', 'Training and certifications', 'Awards and recognition', 'Philosophy about quality', 'Manufacturing process video', 'Commitment to excellence'] }] },
      { title: 'Quality Certifications', blocks: [{ items: ['Leather testing certifications', 'Environmental certifications (Eco-friendly tanning, etc.)', 'Fair trade credentials', 'Export certifications', 'Quality assurance processes', 'Returns and warranty'] }] },
      { title: 'Manufacturing Capabilities', blocks: [{ items: ['Production capacity (units per month)', 'Available customizations', 'Turnaround times', 'Quality control process', 'Workshop capacity', 'Team size', 'Expansion possibilities'] }] },
      { title: 'Testimonials & Client References', blocks: [{ items: ['Designer testimonials', 'Retailer testimonials', 'Luxury brand testimonials', 'Quality feedback', 'Customization capability feedback', 'On-time delivery testimonials', 'Long-term partnership examples'] }] },
      { title: 'Process Documentation', blocks: [{ items: ['Step-by-step process photos', 'Leather selection photos', 'Cutting and stitching process', 'Quality control checkpoints', 'Finishing details', 'Packaging process'] }] },
    ] },
    successStories: { title: 'High-Value Orders & Partnerships', items: [
      { title: 'Faisalabad Leather Workshop', lines: ['Before: 5-8 bulk inquiries/month, mostly local', 'After: 25-35 inquiries/month, nationwide + international', 'Added online catalog + customization options + artisan story', 'Cost: PKR 27,000/month', 'Result: 3x order value from premium brand partnerships'] },
      { title: 'Karachi Leather Artisan', lines: ['Before: manual customization process; slow response', 'After: instant custom quotes generated online', 'Streamlined B2B ordering process', 'Cost: PKR 15,600/month', 'Result: 60% increase in custom orders in 3 months'] },
      { title: 'Lahore Luxury Leather', lines: ['Before: limited to direct relationships; hard to scale', 'After: worldwide buyer inquiries from website', 'Professional B2B platform built credibility', 'Cost: PKR 27,000/month', 'Result: 5x revenue from international luxury brand orders'] },
    ] },
    featuresSpecific: { title: 'Built for Artisan Manufacturers', sections: [
      { title: 'Leather Inventory Management', blocks: [{ items: ['Track leather grades and colors', 'Supplier tracking', 'Stock availability', 'Tanning batch information'] }] },
      { title: 'Custom Order Management', blocks: [{ items: ['Track custom orders from inquiry to delivery', 'Timeline management', 'Setup fee tracking', 'Quality checkpoints', 'Proof-of-progress updates'] }] },
      { title: 'Sample Inventory & Tracking', blocks: [{ items: ['Track sample requests', 'Manage sample leather pieces', 'Shipping and cost tracking', 'Follow-up automation', 'Lead time management'] }] },
      { title: 'Customization Pricing', blocks: [{ items: ['Dynamic pricing based on customization level', 'Setup fees for custom designs', 'Rush order pricing', 'Volume discounts with customization'] }] },
      { title: 'Production Planning', blocks: [{ items: ['Orders feed into production schedule', 'Lead time tracking', 'Quality control checkpoints', 'Shipping and delivery tracking'] }] },
      { title: 'Quality Documentation', blocks: [{ items: ['Photo documentation per order', 'Quality assurance tracking', 'Returns/warranty management', 'Customer approval workflows'] }] },
    ] },
    marketing: { title: 'Reach Quality-Focused Buyers', sections: [
      { title: 'Artisan Story Marketing', blocks: [{ items: ['Share your craftsmanship journey', 'Emphasize quality and heritage', 'Show the process', 'Build emotional connection', 'Sustainability focus'] }] },
      { title: 'Content Marketing', blocks: [{ items: ['Leather care guides', 'Leather education content', 'Craftsmanship behind-the-scenes', 'Material sourcing information', 'Sustainability practices'] }] },
      { title: 'B2B Networking', blocks: [{ items: ['Luxury brand directories', 'Manufacturer directories', 'Wholesale buyer communities', 'Industry associations', 'Trade show presence'] }] },
      { title: 'Email Marketing', blocks: [{ items: ['New product introductions', 'Customization capabilities', 'Seasonal collections', 'VIP buyer offers', 'Artisan stories'] }] },
      { title: 'Visual Marketing', blocks: [{ items: ['Beautiful product photography', 'Process videos', 'Leather texture close-ups', 'Craftsmanship documentation', 'Before/after customization'] }] },
    ] },
    plans: { title: 'Choose Your Level', tiers: [
      { name: 'Boost Plan', audience: 'Artisan starting wholesale', items: ['Product catalog (50+ products)', 'Leather quality info', 'Wholesale pricing', 'Sample request form'], price: 'PKR 15,600/month' },
      { name: 'Growth Plan', audience: 'Growing leather business', items: ['Full product catalog', 'Advanced customization options', 'Artisan story showcase', 'Custom quote system', 'Email customization support', 'Dedicated sales support'], price: 'PKR 27,000/month' },
      { name: 'Platinum Plan', audience: 'Established manufacturer', items: ['Unlimited catalog', 'Advanced customization management', 'Production planning integration', 'Sample tracking system', 'Custom order management', 'B2B analytics', 'International buyer reach'], price: 'PKR 55,000/month' },
    ] },
    gettingStarted: { title: 'Your Leather Goods B2B Website in 7-14 Days', steps: ['Choose plan', 'Photograph your product line', 'Document leather grades and specifications', 'Write artisan/company story', 'Set customization options and pricing', 'Define lead times and MOQs', 'Launch!'] },
    faqs: [
      { q: 'How do I show leather quality on a website?', a: 'Use close-up photos, include specs (tanning method, grade), offer sample requests, include certifications.' },
      { q: 'Should I offer all customization options?', a: 'Start with core options. Add more as capacity grows. Show lead times clearly.' },
      { q: 'How do I price custom orders?', a: 'Base price + setup fee + customization premium. Show examples on website.' },
      { q: 'Can international buyers order?', a: 'Yes! Multi-currency, international shipping, export documentation support available.' },
      { q: 'How do I manage customization requests?', a: 'Online quote system + email communication. Growth/Platinum plans include custom management tools.' },
    ],
    closing: { title: 'Get Your Leather Goods B2B Site Now', body: 'Artisan quality. Custom craftsmanship. Global buyers.', cta: 'Launch Your B2B Leather Goods Site' },
  },
}
