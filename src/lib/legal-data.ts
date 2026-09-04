// Data for the Legal page — from Marketing - Legal.dc.html

export type LegalDoc = 'terms' | 'refund' | 'privacy'

export type LegalSection = { heading: string; paras: string[]; items: string[] }

export const LEGAL_DATA: Record<LegalDoc, { label: string; title: string; updated: string; intro: string; sections: LegalSection[] }> = {
  terms: {
    label: 'Terms & conditions',
    title: 'Terms and conditions',
    updated: '1 September 2026',
    intro: 'These terms govern your use of MatjarX website design, hosting and marketing services. By purchasing a plan you agree to them. We have tried to write them in plain language rather than legalese.',
    sections: [
      { heading: '1. What we provide', paras: ['MatjarX designs, builds, hosts and maintains websites for businesses. The specific deliverables depend on the plan you purchase, as described on our pricing page at the time of purchase.'],
        items: ['A website built by our team, to the page count of your plan', 'A custom domain, or connection of a domain you already own', "Business email addresses on your domain, to your plan's limit", 'Hosting, SSL certificate, daily backups and security patching', "Support and edits at the level your plan specifies"] },
      { heading: '2. What we need from you', paras: ['We cannot build your website without information from you. You agree to provide a completed questionnaire, and any logos, images, prices or copy you want used.', 'Our seven-day build timeline begins the day we receive your completed questionnaire, not the day you purchase. If we are waiting on information from you, the clock pauses.'],
        items: ['Accurate business information', 'The legal right to use any images, logos or text you send us', 'A response to review requests within five working days', 'Access to any existing domain or hosting account, where relevant'] },
      { heading: '3. Fees and payment', paras: ['Setup fees are one-time and payable before work begins. Monthly plan fees are billed in advance on the same date each month. All prices are in Pakistani Rupees unless we have quoted you in AED.', 'Prices shown exclude any applicable taxes. If a payment fails, we will attempt it again and notify you; if it remains unpaid after fourteen days we may suspend your site.'], items: [] },
      { heading: '4. Ownership', paras: ['Your domain is registered in your name and remains yours. The content on your site — your text, your images, your product data — belongs to you.', 'The MatjarX platform, our themes and our editor remain our property and are licensed to you for the duration of your subscription. You are not purchasing the underlying software.'], items: [] },
      { heading: '5. Cancellation', paras: ['There is no lock-in contract. You may cancel at any time by contacting your concierge or emailing us; your plan then runs until the end of the current billing period and is not renewed.', 'Setup fees are non-refundable after the build has begun, except under the money-back guarantee described in our refund policy. On cancellation your site is taken offline but your data is retained for ninety days.'], items: [] },
      { heading: '6. Acceptable use', paras: ["You may not use a MatjarX website to host unlawful content, infringe someone else's intellectual property, distribute malware, or send unsolicited bulk email. We may suspend a site that does, and will tell you why."], items: [] },
      { heading: '7. Liability', paras: ['We work hard to keep your site online and secure, but we do not warrant uninterrupted availability. Our total liability to you in any twelve-month period is limited to the fees you paid us in that period.', 'We are not liable for indirect or consequential losses, including lost profits or lost business opportunities.'], items: [] },
      { heading: '8. Changes and governing law', paras: ['We may update these terms; material changes will be notified to you by email at least thirty days before they take effect. These terms are governed by the laws of Pakistan and subject to the exclusive jurisdiction of the courts of Karachi.'], items: [] },
    ],
  },
  refund: {
    label: 'Refund policy',
    title: 'Refund policy',
    updated: '1 September 2026',
    intro: 'We offer a 30-day money-back guarantee on new website builds. This page explains exactly what that covers, what it does not, and how to claim it.',
    sections: [
      { heading: 'The 30-day money-back guarantee', paras: ['If you are not happy with your new website, you may request a full refund of your setup fee and your first monthly payment within thirty days of your site going live.', 'We would much rather fix the problem than refund you, which is why the first thirty days also include unlimited edits. Tell your concierge what is wrong and we will change it.'], items: [] },
      { heading: 'How to request a refund', paras: ['Email office@matjarx.com or message your concierge from your dashboard. Tell us your domain and, if you are willing, what went wrong — it helps us improve.', 'Approved refunds are processed within ten working days to the original payment method. Bank transfer refunds may take longer depending on your bank.'], items: [] },
      { heading: 'What is refundable', paras: [], items: ['Your one-time setup fee, if claimed within thirty days of launch', 'Your first monthly plan payment', 'Any monthly payment charged in error or after a valid cancellation'] },
      { heading: 'What is not refundable', paras: ['Some costs are paid to third parties on your behalf and cannot be recovered by us.'],
        items: ['Domain registration fees — the domain remains yours regardless', 'Monthly plan fees for months already served, after the first thirty days', 'Growth marketing ad spend already placed with Google, Meta or TikTok', 'Platinum custom builds after the design has been approved by you'] },
      { heading: 'Cancellations after thirty days', paras: ['You may cancel at any time with no penalty. Your plan runs to the end of the current billing period and is not renewed. We do not pro-rate part-months, and we do not charge an exit fee.'], items: [] },
      { heading: 'Chargebacks', paras: ['If you have a problem, please contact us first. Raising a chargeback without contacting us costs us a fee and takes longer for you than a direct refund would. We have never refused a valid guarantee claim.'], items: [] },
    ],
  },
  privacy: {
    label: 'Privacy & cookies',
    title: 'Privacy and cookies policy',
    updated: '1 September 2026',
    intro: 'This policy explains what personal data MatjarX collects, why we collect it, and what you can do about it. We do not sell your data to anyone, ever.',
    sections: [
      { heading: 'What we collect', paras: ['We collect only what we need to build your website, bill you correctly, and support you.'],
        items: ['Contact details: your name, business name, email, phone number', 'Business information you provide in the questionnaire', 'Billing information, processed by our payment provider — we never store full card numbers', 'Usage data from your dashboard, such as which screens you visit', 'Website analytics from visitors to matjarx.com'] },
      { heading: 'Why we collect it', paras: ['To deliver the service you purchased, to take payment, to provide support, and to send you service notices. With your consent we also send a monthly newsletter, which you can unsubscribe from in one click.'], items: [] },
      { heading: 'Who we share it with', paras: ['We share data only with the providers needed to run the service, and only what they need: our hosting provider, our payment gateways, our email delivery provider, and Google for analytics and your Business Profile.', 'We do not sell personal data. We do not share your customer lists or order data with anyone.'], items: [] },
      { heading: 'Cookies', paras: ['Our own site uses cookies for essential functions, and analytics cookies if you consent to them via our banner. You can decline analytics cookies without losing any functionality.', 'Your MatjarX website can show its own cookie banner — you control this from Settings, under Customer Privacy.'], items: [] },
      { heading: 'How long we keep it', paras: ['We keep your account data for as long as you are a customer, and for ninety days after cancellation so you can restart without losing anything. Billing records are kept for seven years as required by Pakistani tax law.'], items: [] },
      { heading: 'Your rights', paras: ['You can ask us for a copy of your data, ask us to correct it, or ask us to delete your account entirely. You can start both from Settings, under Customer Privacy, or by emailing us.', 'Deletion requests are confirmed with you first, because they are irreversible.'], items: [] },
      { heading: 'Contact and complaints', paras: ['Email office@matjarx.com with any privacy question and we will respond within five working days. If you are not satisfied with our response, you may escalate to the relevant data protection authority in your jurisdiction.'], items: [] },
    ],
  },
}

export const LEGAL_DOC_KEYS: LegalDoc[] = ['terms', 'refund', 'privacy']
