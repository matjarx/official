// FAQs for the pages that had none.
//
// Six page types rendered no questions at all: /alternatives,
// /website-examples, /careers, /become-a-partner, /blogs, and all 42
// comparison pages. Each is a page somebody lands on from search with a
// specific question in mind, and the answer was a phone call away rather
// than on the page.
//
// Written as real answers rather than filler. Where a number appears it
// is one used elsewhere on the site — 7 days, Rs. 22,500, 0% commission,
// 70,000 sites — so nothing here contradicts a price or a promise made
// on another page.

export type PageFaq = { question: string; answer: string }

export const ALTERNATIVES_FAQS: PageFaq[] = [
  { question: 'Why compare MatjarX to agencies rather than to other builders?',
    answer: 'Because that is the real choice most Pakistani businesses are making. A DIY builder is cheap until you count the hours; an agency is thorough until you see the invoice. Most of these comparisons are with local agencies and POS companies because that is who a business here actually gets quotes from.' },
  { question: 'Are these comparisons fair to the other side?',
    answer: 'Each one lists what the other platform does better, not only what we do better. If a competitor is a stronger fit for what you need, the page says so — an honest comparison that loses you one sale is worth more than a dishonest one that wins it and produces a refund three months later.' },
  { question: 'How current are the prices quoted?',
    answer: 'They are the published rates at the time of writing, and competitors change them. Treat them as a guide and ask for a current quote from both sides before deciding. We will not argue with a number they give you in writing.' },
  { question: 'Can you move my existing site across?',
    answer: 'Usually yes: pages, products, customers, orders and URL redirects so your Google rankings follow you. Send us the URL and we will tell you what carries over cleanly and what has to be rebuilt, before you commit to anything.' },
  { question: 'What if I am on a contract with someone else?',
    answer: 'We will build alongside it and switch the domain over on the day your contract ends. Nothing goes down and you do not pay twice.' },
]

export const EXAMPLES_FAQS: PageFaq[] = [
  { question: 'Are these real client sites?',
    answer: 'Yes. Every example is a live site belonging to a real business, shown with their permission. Where we quote a result — a ranking, a number of enquiries — it came from that client.' },
  { question: 'Can I get a site that looks like one of these?',
    answer: 'Yes, and it will not be a copy. We start from the same foundations and rebuild the design around your trade, your photos and your words. Tell us which example you liked and what you liked about it.' },
  { question: 'How long did these take to build?',
    answer: 'Seven days for a standard build, from the day you complete the questionnaire. The larger stores took longer because of product data, not design.' },
  { question: 'How much would a site like this cost?',
    answer: 'Most of these are Launch or Boost builds: Rs. 22,500 setup, then a monthly fee from Rs. 4,500. The custom-designed stores are Platinum. The pricing page lists all of it.' },
  { question: 'Do you only build for these industries?',
    answer: 'No. These are the ones we are asked for most often. We have built across more than a thousand business categories — if your trade is not shown, it is not a problem, it is just not a common enough request to have its own page yet.' },
]

export const CAREERS_FAQS: PageFaq[] = [
  { question: 'Do you hire remotely?',
    answer: 'For most roles, yes, as long as your hours overlap with Pakistan Standard Time enough for the daily work to happen. Some roles need you in Lahore; the posting says so when it does.' },
  { question: 'What does the process look like?',
    answer: 'A conversation, a short piece of real work paid at your rate, and a conversation with the person you would work with. No unpaid take-home tests and no panel of six.' },
  { question: 'I do not match every requirement. Should I apply?',
    answer: 'Yes. We have hired several people who matched about half the list and were obviously going to be good at the job. Tell us which parts you do not have and what you would do about it.' },
  { question: 'Do you take interns or junior people?',
    answer: 'Yes, when we have someone with time to teach. Those roles are posted the same way as any other rather than being an always-open pool.' },
  { question: 'How long until I hear back?',
    answer: 'Within a week, including if the answer is no. If a fortnight has passed with nothing, email careers@matjarx.com and chase us — it means something went wrong on our end.' },
]

export const PARTNER_FAQS: PageFaq[] = [
  { question: 'What does a partner actually do?',
    answer: 'You bring us businesses that need a website, and we build, launch and look after them. You keep the client relationship; we do the work that you either cannot do or would rather not.' },
  { question: 'How and when do I get paid?',
    answer: 'On every build you refer and on the recurring fee for as long as that client stays. Paid monthly, to a Pakistani bank account or internationally.' },
  { question: 'Do I need to be a designer or a developer?',
    answer: 'No. Most of our partners are marketing agencies, printers, accountants and consultants who are already trusted by businesses that need a site. You do not need to touch the build.' },
  { question: 'Can I put my own name on the work?',
    answer: 'Yes. White-label is available from the second tier: your branding, your invoice, your client relationship, and we stay out of sight.' },
  { question: 'Is there a minimum?',
    answer: 'No quota and no joining fee. Refer one business a year or one a week — the rate is the same.' },
]

export const BLOG_INDEX_FAQS: PageFaq[] = [
  { question: 'Who writes these?',
    answer: 'Our own team — the people who build the sites, set up the payment gateways and run the campaigns. Nothing here is outsourced to someone who has not done the thing they are writing about.' },
  { question: 'How often do you publish?',
    answer: 'Roughly twice a month, and we update older guides when something changes. A payments or ads walkthrough that is a year stale is worse than no walkthrough, so those get revisited first.' },
  { question: 'Can I use these guides without buying anything?',
    answer: 'Yes, that is what they are for. Every setup guide here is written so you can follow it yourself. If you would rather not, that is what the plans are for.' },
  { question: 'Can you write about something specific?',
    answer: 'Ask. A good share of what is here started as a question a client emailed us. office@matjarx.com.' },
  { question: 'Do you accept guest posts?',
    answer: 'No. Everything here is written by someone who did the work, which is the whole point of it.' },
]

/**
 * The comparison pages.
 *
 * Templated on purpose, and the template is filled with that rival's own
 * numbers and positioning rather than the same five sentences 42 times.
 * The questions are the ones a person actually types before switching —
 * cost, migration, lock-in, who it suits — and each answer differs
 * wherever the underlying data differs.
 */
export function comparisonFaqs(rival: string, price?: string, mode?: string): PageFaq[] {
  const kind = mode || 'platform'
  return [
    { question: `Can I move my site from ${rival} to MatjarX?`,
      answer: `Usually yes. We migrate pages, products, customers, orders and — the part people forget — the URL redirects, so the rankings you built on ${rival} follow you across instead of starting again. Send us the URL and we will tell you what carries cleanly before you commit.` },
    { question: `What does ${rival} actually cost over a year?`,
      answer: price
        ? `${price} is the headline. The real figure is that plus the add-ons, the transaction fees and the hours you spend, which is where the gap usually is. The table above is our honest attempt at the full year — check it against a written quote from them.`
        : `The headline price is rarely the year-one price once add-ons, transaction fees and your own hours are counted. The table above is our attempt at the full figure — check it against a written quote from them.` },
    { question: `Is MatjarX better than ${rival}?`,
      answer: `For a small business in Pakistan or the Gulf that wants the site built for them and looked after, we think so, and this page says where ${rival} is the better answer instead. If you want to build and maintain it yourself, a ${kind} like theirs may suit you better, and we would rather tell you that now.` },
    { question: 'Am I locked in if I switch?',
      answer: 'No. No long-term contract, the domain stays registered in your name, and you can take your content with you. Cancel with 30 days’ notice.' },
    { question: 'How long does the switch take?',
      answer: `Seven days from the day you complete the questionnaire, same as any build. We keep your ${rival} site live the whole time and only point the domain across once you have seen and approved the new one.` },
  ]
}
