// Data for the Partner page — from Marketing - Partner.dc.html

export type PlanKey = 'Launch' | 'Boost' | 'Growth' | 'Platinum'

export const PARTNER_PLAN_RATES: Record<PlanKey, number> = {
  Launch: 4500,
  Boost: 15600,
  Growth: 27000,
  Platinum: 55000,
}

export const PARTNER_COMMISSION_PCT = 0.15

export function money(n: number) {
  return 'Rs. ' + Math.round(n).toLocaleString('en-US')
}

export type PartnerTier = {
  name: string; who: string; rate: string; bonus: string; tag: string
  features: string[]; dark: boolean
}

export const PARTNER_TIERS: PartnerTier[] = [
  { name: 'Referral', who: 'Anyone with clients who need a website.', rate: '10%', bonus: 'Paid monthly, for the life of the client.', tag: '', dark: false,
    features: ['Your own referral link and dashboard', 'Commission on the monthly plan fee', 'We handle the sale and the build', 'Payouts on the 1st of each month'] },
  { name: 'Partner', who: 'Agencies, freelancers and consultants referring regularly.', rate: '15%', bonus: 'Plus Rs. 5,000 bonus on each setup fee.', tag: 'Most partners', dark: true,
    features: ['Everything in Referral', 'Rs. 5,000 bonus per completed build', 'A named partner manager', 'Co-branded proposals you can send clients', 'Priority build slots for your referrals'] },
  { name: 'White label', who: 'Agencies who want to resell under their own name.', rate: '25%', bonus: 'Or set your own client pricing and keep the margin.', tag: 'Invite only', dark: false,
    features: ['Everything in Partner', 'Your brand on the client dashboard', 'Set your own retail prices', 'Direct line to our build team', 'Quarterly business review with us'] },
]

export const PARTNER_STEPS = [
  { n: '1', title: 'Apply and get approved', body: "Two working days. We'll set up your link, your dashboard and your partner manager." },
  { n: '2', title: 'Refer a business', body: 'Send your link, or just introduce us over WhatsApp. We take it from there.' },
  { n: '3', title: 'We build and launch', body: 'Design, copy, SEO, launch call — all handled by our team, in seven days.' },
  { n: '4', title: 'You get paid monthly', body: 'Recurring commission for as long as the client stays. Paid on the 1st.' },
]

export const PARTNER_CLIENT_STEPS = [1, 3, 5, 10, 25, 50]
export const PARTNER_PLAN_PICKS: PlanKey[] = ['Launch', 'Boost', 'Growth', 'Platinum']
export const PARTNER_TYPES = ['Agency', 'Freelancer', 'Accountant', 'Consultant', 'Other']
