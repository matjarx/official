// Data for the Thank You page — from Marketing - Thank You.dc.html

import { routes } from './routes'

export const THANK_YOU_STEPS = [
  { when: 'Within 4 hours', title: 'We read and reply', body: 'A real person on our team reads your message and answers your actual question — not a template response.' },
  { when: 'Day 1', title: 'A short call, if useful', body: 'Fifteen minutes to understand your business and recommend the right plan. No pressure to buy on the call.' },
  { when: 'Day 1 to 7', title: 'We build your site', body: "Once you're ready, you complete the questionnaire and our team builds and launches the whole thing in seven days." },
]

export const THANK_YOU_LINKS = [
  { title: 'See real MatjarX sites', body: 'Nine live client websites across restaurants, textiles, salons and e-commerce.', cta: 'Browse examples →', href: routes.websiteExamples },
  { title: 'Compare the plans', body: "Launch, Boost, Growth and Platinum — what's in each, side by side.", cta: 'See pricing →', href: routes.pricing },
  { title: 'Read the guides', body: 'Practical advice on getting found on Google, taking payments and cutting returns.', cta: 'Read the blog →', href: routes.blog },
]
