// The homepage FAQ, as structured data (FAQPage). Same questions and
// answers as the visible FAQ section (Z13 in V2Markup.tsx): keep the two
// in step, since Google expects the schema to match what is on the page.
import type { SchemaFaq } from '@/components/FaqSchema'

export const HOME_FAQ: SchemaFaq[] = [
  {
    "question": "How does it actually work?",
    "answer": "Pick a plan and check out. You fill in a short questionnaire about your business, our team builds the whole site in seven days, then we launch it with you on a live call and show you how to edit it yourself."
  },
  {
    "question": "Which plan is right for me?",
    "answer": "Launch gets you online with a professional site, domain, email and hosting. Boost adds unlimited edits done by us for the first 30 days, advanced SEO and selling on Google, Facebook and Instagram. Growth is the one most businesses settle on — it adds a dedicated team, monthly 1-on-1 marketing sessions and 3 blog posts written for you every month. Platinum is a fully custom build for serious e-commerce."
  },
  {
    "question": "Can I edit the website myself afterwards?",
    "answer": "Yes. Every site comes with our own editor — change photos, text, prices and products from any device, no technical skill needed. Boost and Growth include edits by our team for the first 30 days, and Platinum includes unlimited edits."
  },
  {
    "question": "Are hosting, domain and email included?",
    "answer": "Yes, in every plan: a custom domain (or connect one you already own), matching business email, fast secure hosting and an SSL certificate. There are no separate charges for these."
  },
  {
    "question": "What if I don't like the website?",
    "answer": "You review and approve the design before it goes live, and we make adjustments then. After launch you can edit it yourself. Boost and Growth include edits by our team for the first 30 days, and Platinum includes unlimited edits. The setup fee itself isn't refundable once work has started, but there's no long-term contract: cancel your plan at any time with 30 days' notice."
  },
  {
    "question": "Do you work with businesses outside Pakistan?",
    "answer": "Yes — we serve clients across the Gulf as well. Pricing is quoted in AED for UAE, Saudi and Qatar businesses, and your concierge works your time zone."
  }
]
