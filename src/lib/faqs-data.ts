// Data for the FAQs page — from Marketing - FAQs.dc.html

export const FAQ_GROUPS = {
  'Getting started': [
    ['How do I get started?', "Pick a plan and check out. You'll get a short questionnaire about your business — what you do, who you serve, what the site needs to achieve. From there our team builds the whole thing and we launch it with you on a live call."],
    ['How does this all work?', 'You never touch a website builder. A designer who has worked in your trade before designs the pages, a writer produces the copy, our SEO team structures it to rank, and your concierge stays on afterwards to make changes for you.'],
    ["What's included in the Launch package?", 'A multi-page website written and designed for you, a custom domain, one professional email address, secure hosting with an SSL certificate, your Google Business Profile set up, a 1-on-1 launch and training call, and a 30-day money-back guarantee.'],
    ['How long does it take?', 'Seven days from the day we receive your completed questionnaire. Brief on Monday, review on Friday, live the following week is typical.'],
    ['What do you need from me?', "About 15 to 30 minutes for the questionnaire, your logo if you have one, and any photos or prices you want used. If you don't have images we source appropriate ones for your trade."],
  ],
  'Your website': [
    ['Once launched, can I still edit the website myself?', "Yes. Every site comes with our own editor — change photos, text, prices and products from any device, with no technical skill needed. If you'd rather not, send the change to your concierge instead."],
    ['Are these templated websites?', 'We start from themes built for specific business categories, then design around your brand, your photos and your services. Platinum plans are designed entirely from scratch in our own tool.'],
    ['What platform are the websites built on?', "Our own platform. That's deliberate — it means no plugin conflicts, no version updates to manage, and nothing that breaks when a third-party add-on changes."],
    ['Are MatjarX websites secure?', "Yes. Every site includes an SSL certificate, daily backups with restore points, and security patching handled by us. You'll never be asked to update anything yourself."],
    ['Can I transfer an existing website to MatjarX?', 'Yes, and we do this often. We rebuild the site on our platform, carry over your content and set up redirects so your Google rankings follow you across.'],
    ['Can you show me the platform and editor?', "Happily. Book a call and we'll walk you through a live site and the editor before you pay anything."],
  ],
  'Domain & email': [
    ['Are hosting and domain included? Can I use my own domain?', 'Both are included in every plan. We can register a new .pk or .com for you, or connect a domain you already own — we handle the DNS either way.'],
    ['Do I own my domain?', 'Yes. The domain is registered in your name and stays yours. If you ever leave, it goes with you.'],
    ['What about business email?', 'You get a professional address on your own domain — one inbox on Launch, four on Boost and Growth, unlimited on Platinum. Set up and working from day one.'],
    ['What happens if I stop paying?', 'Your site goes offline but nothing is deleted for 90 days, and your domain remains yours. Restart any time and we put it straight back up.'],
  ],
  'Pricing & plans': [
    ['Which plan is right for me?', 'Launch if you need a professional site online. Boost — our most popular — if you also want unlimited edits done for you, advanced SEO and selling on Google, Facebook and Instagram. Growth if you want a dedicated marketing team. Platinum for serious custom e-commerce.'],
    ['Is the setup fee charged every year?', "No, it's one-time. It covers the full build — design, copy, images, SEO and launch. After that you only pay the monthly plan fee."],
    ['Can I switch plans?', 'Any time. Upgrades apply immediately and we only charge the difference. Downgrades take effect at your next billing date.'],
    ['Do you charge commission on my sales?', "Never. 0% on sales and bookings on every plan. You only pay your payment gateway's own processing fee."],
    ['Do you work with businesses outside Pakistan?', 'Yes — we serve clients across the Gulf. UAE, Saudi and Qatar businesses are quoted in AED, and your concierge works your time zone.'],
  ],
  'Support & guarantees': [
    ["What if I don't like my website?", "You get 30 days of unlimited edits so we can get it right, plus a 30-day money-back guarantee. If you're unhappy for any reason in that window, ask and we refund you."],
    ['Can I speak with someone?', "Yes, and we'd encourage it. Call +92 303 372 0953 or message us on WhatsApp — you'll reach a person, not a menu."],
    ['How fast is support?', 'Your concierge replies within four working hours, Monday to Saturday. Boost and above include VIP phone support.'],
    ['How do I cancel?', "Message your concierge or email office@matjarx.com. There's no lock-in contract — cancel before your next billing date and you won't be charged again."],
  ],
} satisfies Record<string, [string, string][]>

export type FaqGroupName = keyof typeof FAQ_GROUPS
export const FAQ_GROUP_NAMES = Object.keys(FAQ_GROUPS) as FaqGroupName[]
