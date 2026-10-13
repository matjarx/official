"""SQL that applies the 13 Oct plan-copy rulings to the pages' database rows.

marketing_content holds a full copy of /plans/boost, /plans/growth,
/plans/platinum and /plans/custom (headline, features, FAQs, detail
sections), and that copy overrides the code at request time. The code change
alone would not show on those four pages, so the same edits are applied here
to a read-only export of the rows. The final rulings also touch the
/done-for-you-website and /growth-marketing-service copies (services/dfy,
services/growth) and /careers, which are held the same way.

  python3 -I scripts/seo/gen-plan-copy-sql.py /seo-data/supabase-export/marketing_content.json /seo-data/migrations

Writes plan-copy.sql and plan-copy-rollback.sql. Each UPDATE matches the row
only if it is still exactly as exported, and the script aborts (changing
nothing) if any row has been edited since -- re-export and regenerate then.
Never connects to a database.
"""
import json
import os
import sys

SRC, OUT = sys.argv[1], sys.argv[2]

REFUND_ANSWER = ("The setup fee is refundable within 24 hours of payment if work hasn't started. "
                 "Monthly fees aren't refundable once a billing cycle starts. "
                 "You can cancel any time with 30 days' written notice.")
# Platinum's ads, as ruled 13 Oct: one campaign, ad spend under Rs. 50,000
# paid by the client to the platform; more is a custom ads plan.
AD_MANAGEMENT = '1 ad campaign managed (ad spend under Rs. 50,000, paid by you to the platform)'
ADS_FAQ = {'q': 'Are ads included?', 'a': (
    'We set up and manage 1 ad campaign for you, with an ad spend of up to Rs. 50,000 a month. '
    'You pay the ad spend directly to the platform (for example Meta or TikTok). '
    'Need more campaigns or a bigger budget? We quote a custom ads plan.')}
AD_SPEND_ANSWER = ("Platinum includes 1 ad campaign managed, with ad spend under Rs. 50,000 a month paid by you directly "
                   "to the platform. We'll recommend the right budget for your goal. For more campaigns or a bigger budget, "
                   "we quote a custom ads plan.")
ADS_SECTION = 'Online Advertising: Paid Ads Done Right'
ADS_SECTION_NOTE = {'p': 'On Growth, your team advises you on ads. Ad campaign management comes with the Platinum plan '
                         '(1 campaign included; more on a custom plan).'}
SLUGS = {'plans/boost', 'plans/growth', 'plans/platinum', 'plans/custom', 'services/dfy', 'services/growth', 'careers',
         'industries/restaurants', 'industries/real-estate', 'industries/clinics-and-healthcare',
         'industries/online-stores-ecommerce', 'industries/boutiques', 'industries/salons-and-spas',
         'industries/gyms-and-fitness', 'industries/construction-companies', 'industries/law-firms',
         'industries/wedding-and-event-planners', 'industries/auto-repair-shops', 'industries/b2b-clothing-manufacturer',
         'industries/b2b-leather-goods-manufacturer'}

# Whole-string replacements: a value equal to the key becomes the value.
EXACT = {
    # Final rulings, 13 Oct: Growth is "3 blog posts a month" (not 2,000
    # words); no refund guarantee anywhere -- the Terms' policy instead.
    'Boost: advanced SEO — Growth: 2,000 words of fresh content monthly': 'Boost: advanced SEO — Growth: 3 blog posts a month',
    '2,000 words of fresh content written monthly': '3 blog posts written for you every month',
    '2,000 words of keyword-optimised content a month, plus a monthly audit.': '3 keyword-optimised blog posts a month, plus a monthly audit.',
    '2,000 Words of Content Created By Us Every Month': '3 Blog Posts Written for You Every Month',
    'Produce 2,000 words of monthly content for Growth clients': 'Write 3 blog posts a month for each Growth client',
    'Is this a money-back guarantee really risk-free?': 'Can I get a refund?',
    # Platinum ads: every unlimited mention becomes the one-campaign line.
    'Ad campaign management': AD_MANAGEMENT,
    'Ad campaigns': AD_MANAGEMENT,
    'Ad Campaign Management': '1 Ad Campaign, Managed for You',
    'You need ad campaign management': 'You want ' + AD_MANAGEMENT,
    # Review of 13 Oct: /done-for-you-website promises no edits beyond Boost's.
    '30 days of unlimited edits after launch': 'Editor training so you can update your site yourself',
    '30 days of unlimited edits': 'Easy-to-use editor',
    'Rs. 22,500 one-time (saves Rs. 137,500 vs. typical agency pricing)': 'Rs. 22,500 one-time',
    '1-week turnaround': 'Live in 7 business days',
    'Unlimited edits (Boost+ plans)': 'Edits by our team (Boost: first 30 days)',
    'Yes — a 30-day money-back guarantee. If you’re not happy for any reason within 30 days, contact us for a full refund, no questions asked.': REFUND_ANSWER,
    # Boost edits follow /legal/terms: unlimited for the first 30 days.
    'Unlimited done-for-you edits': 'Unlimited done-for-you edits (first 30 days)',
    'Launch: you make your own edits — Boost: unlimited edits done by us':
        'Launch: you make your own edits — Boost: unlimited edits done by us for the first 30 days',
    # Growth: ads advice, not ad management.
    'Paid ads set up and managed': 'Ads advice from your growth team',
    'Boost: no ad management — Growth: paid ads set up and managed':
        'Boost: no ads advice — Growth: ads advice from your growth team',
    # Page limits: Launch up to 10, Boost 20–30, Growth up to 50, Platinum unlimited.
    '30 pages': '20–30 pages',
    '50 pages': 'Up to 50 pages',
    '30 professional pages including:': '20–30 professional pages, including:',
    '5-10 pages, affordable start': 'Up to 10 pages, affordable start',
    '30 pages with SEO and blog': '20–30 pages with SEO and blog',
    '50 pages with marketing team': 'Up to 50 pages with marketing team',
    '30 pages with blog and SEO': '20–30 pages with blog and SEO',
    '50 pages with marketing expert': 'Up to 50 pages with marketing expert',
    '5-10 pages for starters': 'Up to 10 pages for starters',
    '30 pages with SEO': '20–30 pages with SEO',
}
# Replacements inside a longer string.
SUBSTRING = {
    "a named team, a monthly plan, fresh content and paid ads managed for you — that's Growth.":
        "a named team, a monthly plan, 3 blog posts a month and ads advice — that's Growth.",
    'monthly 1-on-1 sessions and 2,000 words of fresh content every month.': 'monthly 1-on-1 sessions and 3 blog posts every month.',
    '2,000 words of content monthly, everything included.': '3 blog posts a month, everything included.',
    'SEO + email + social + ads + reputation,': 'SEO + email + social + ads advice + reputation,',
    'full team support, ad campaign management.': f'full team support and {AD_MANAGEMENT}.',
    'Boost+ plans include unlimited edits done by our team if you prefer.':
        'Prefer our team to make changes? Boost includes unlimited edits by our team for the first 30 days.',
    'dedicated marketing manager, unlimited edits (Concierge), SEO + email': 'dedicated marketing manager, SEO + email',
    'Growth Marketing is business growth strategy (customers, leads, revenue, branding). The Growth Plan includes both.':
        'Growth Marketing is business growth strategy (customers, leads, revenue, branding). The Growth Plan includes '
        'growth marketing, plus edits by our team for the first 30 days.',
    "100% refund guarantee if unsatisfied within 24 hours and we haven't substantially started work. After that:":
        "The setup fee is refundable within 24 hours of payment if work hasn't started. After that:",
    'Boost is the better value — it adds unlimited done-for-you edits and advanced SEO.':
        'Boost is the better value — it adds unlimited done-for-you edits for the first 30 days and advanced SEO.',
    'Everything in Launch, plus unlimited edits done by our team, advanced SEO':
        'Everything in Launch, plus unlimited edits done by our team for the first 30 days, advanced SEO',
    "There's no monthly cap and no per-change fee.":
        "For the first 30 days there's no cap and no per-change fee. After that, major structural changes may carry additional fees.",
    'digital goods and multi-seat bookings.': 'digital goods and multi-seat bookings, plus social media management.',
}
# Lists.
LIST_EXACT = {
    ('Is ad spend included?', 'No. We set up and manage the campaigns; the spend goes directly to Google, Meta or TikTok on your own card, so you keep full control of the budget.'):
        ['Is ad management included?', 'Growth includes ads advice from your growth team. Ad management comes with Platinum: '
         + AD_MANAGEMENT + '. More campaigns are quoted as a custom ads plan.'],
    ('Pages', '5-10', '30'): ['Pages', 'Up to 10', '20–30'],
    ('Ad Campaign Management', '✅ Yes'): ['Ad Campaign Management', '✅ 1 campaign (ad spend under Rs. 50,000, paid by you)'],
    ('Google Shopping campaigns', 'Google Search campaigns', 'Facebook/Instagram ad campaigns', 'Retargeting campaign setup',
     'Ad copywriting and optimization', 'A/B testing and optimization', 'Monthly campaign management'):
        ['1 campaign set up and managed by us', 'Ad spend under Rs. 50,000 a month, paid by you to the platform',
         'Ad copywriting and optimization', 'Monthly campaign management',
         'More campaigns or a bigger budget: custom ads plan, quoted separately'],
}
PLATINUM_FEATURE_ANCHOR, PLATINUM_FEATURE = 'Full webstore built for you', 'Social media management'

hits = {}


def walk(v, slug, path=''):
    if isinstance(v, str):
        if v in EXACT:
            hits.setdefault(slug, []).append(f'{path}: {v!r} -> {EXACT[v]!r}')
            return EXACT[v]
        for old, new in SUBSTRING.items():
            if old in v:
                hits.setdefault(slug, []).append(f'{path}: ...{old[:50]!r}...')
                v = v.replace(old, new)
        return v
    if isinstance(v, list):
        if all(isinstance(x, str) for x in v) and tuple(v) in LIST_EXACT:
            hits.setdefault(slug, []).append(f'{path}: {v} -> {LIST_EXACT[tuple(v)]}')
            return list(LIST_EXACT[tuple(v)])
        out = [walk(x, slug, f'{path}[{i}]') for i, x in enumerate(v)]
        if slug == 'plans/platinum' and path == '.features' and PLATINUM_FEATURE_ANCHOR in out:
            # Social media management, then ad management, right after the webstore.
            at = out.index(PLATINUM_FEATURE_ANCHOR) + 1
            for feature in (PLATINUM_FEATURE, AD_MANAGEMENT):
                if feature not in out:
                    out.insert(at, feature)
                    hits.setdefault(slug, []).append(f'{path}: + {feature!r}')
                at = out.index(feature) + 1
        return out
    if isinstance(v, dict):
        if v.get('q') == "What's the average ad spend recommendation?" and not v.get('a', '').startswith('Platinum includes'):
            hits.setdefault(slug, []).append(f'{path}: average ad spend FAQ answer')
            return {**v, 'a': AD_SPEND_ANSWER}
        if slug == 'plans/platinum' and path == '.detail' and 'examples' in v:
            # Review of 13 Oct: the example case studies were not real, named clients.
            hits.setdefault(slug, []).append(f'{path}.examples: removed')
            v = {k: x for k, x in v.items() if k != 'examples'}
        if v.get('q') == 'How many ads can you manage?':
            hits.setdefault(slug, []).append(f'{path}: FAQ -> "Are ads included?"')
            return dict(ADS_FAQ)
        # __seo belongs to seo-overrides.sql; this migration never touches it.
        out = {k: (x if (path == '' and k == '__seo') else walk(x, slug, f'{path}.{k}')) for k, x in v.items()}
        if out.get('title') == ADS_SECTION and isinstance(out.get('blocks'), list) and ADS_SECTION_NOTE not in out['blocks']:
            out['blocks'] = out['blocks'] + [dict(ADS_SECTION_NOTE)]
            hits.setdefault(slug, []).append(f'{path}.blocks: + Platinum ads note')
        return out
    return v


def lit(obj):
    return "'" + json.dumps(obj, ensure_ascii=False).replace("'", "''") + "'::jsonb"


rows = {r['slug']: r for r in json.load(open(SRC, encoding='utf-8')) if r['slug'] in SLUGS}
updates, rollbacks = [], []
for slug in sorted(rows):
    old = rows[slug]['data']
    new = walk(old, slug)
    if new == old:
        continue
    old_body = {k: x for k, x in old.items() if k != '__seo'}
    new_body = {k: x for k, x in new.items() if k != '__seo'}
    # Everything but __seo is compared and replaced; __seo is carried over as
    # it is at run time, so this and seo-overrides.sql can run in either order.
    updates.append(f"""-- {slug}: {len(hits[slug])} change(s)
UPDATE marketing_content
   SET data = CASE WHEN data ? '__seo' THEN {lit(new_body)} || jsonb_build_object('__seo', data->'__seo') ELSE {lit(new_body)} END,
       updated_at = now()
 WHERE slug = '{slug}' AND (data - '__seo') = {lit(old_body)};
GET DIAGNOSTICS n = ROW_COUNT;
IF n <> 1 THEN RAISE EXCEPTION '{slug} changed since the export; nothing applied. Re-export and regenerate.'; END IF;
""")
    rollbacks.append(f"""UPDATE marketing_content
   SET data = CASE WHEN data ? '__seo' THEN {lit(old_body)} || jsonb_build_object('__seo', data->'__seo') ELSE {lit(old_body)} END
 WHERE slug = '{slug}' AND (data - '__seo') = {lit(new_body)};
GET DIAGNOSTICS n = ROW_COUNT;
IF n <> 1 THEN RAISE EXCEPTION '{slug} changed since plan-copy.sql ran; nothing rolled back.'; END IF;
""")


def wrap(head, body):
    return (f'{head}\n\nBEGIN;\nDO $mx$\nDECLARE n integer;\nBEGIN\n' + '\n'.join(body) + 'END\n$mx$;\nCOMMIT;\n')


os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, 'plan-copy.sql'), 'w', encoding='utf-8').write(wrap(
    '-- GENERATED by scripts/seo/gen-plan-copy-sql.py -- review before running.\n'
    '-- Applies the 13 Oct plan-copy rulings to the database copies of the plan,\n'
    '-- service and careers pages, matching the code change in the same PR: Boost\n'
    '-- edits for the first 30 days; Growth 3 blog posts a month and ads advice;\n'
    '-- Platinum social media and ad management; page limits; no refund guarantee.\n'
    '-- All or nothing.', updates))
open(os.path.join(OUT, 'plan-copy-rollback.sql'), 'w', encoding='utf-8').write(wrap(
    '-- Restores the rows plan-copy.sql changes. All or nothing.', rollbacks))
for slug, h in sorted(hits.items()):
    print(f'{slug}: {len(h)} change(s)')
    for line in h:
        print('   ', line[:140])
