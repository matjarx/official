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
import hashlib
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
# Decisions of 13 Oct (round 2). 1: concierge edits are as agreed in the plan,
# not unlimited. 2: Growth edits by our team for the first 30 days.
# 3: no unnamed example case studies on the plan pages. 4: no promised
# results, rankings or timeframes; where a sentence is needed, REPORT.
REPORT = 'We report your results every month.'
CONCIERGE = 'Edits done by our team, as agreed in your plan'
DETAIL_DROP = {'plans/boost', 'plans/growth', 'plans/platinum', 'plans/custom'}  # detail.examples
SLUGS = {'website-examples', 'plans/boost', 'plans/growth', 'plans/platinum', 'plans/custom', 'services/dfy', 'services/growth', 'careers',
         'services/concierge', 'faqs',
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
    # Decision 4: promised results and timeframes.
    'Typical timeline: Month 1 baseline establishment, Month 2-3 initial ranking improvements, Month 3-4 traffic increase (20-40%), Month 4-6 significant growth (100-200%+), Month 6+ continuing momentum.': REPORT,
    'Typically: first 30 days initial sales and testing, month 2-3 optimization and growth, month 3-6 significant revenue increase, month 6+ scaling and expansion. Depends on your traffic sources, conversion rate, product quality, marketing execution.': REPORT,
    'Month 1: foundation and strategy. Month 2-3: early results (reviews, email subscribers, early SEO). Month 3-6: significant growth (SEO rankings, email revenue, followers). Month 6+: compounding returns.': REPORT,
    'Want aggressive growth (2-3x+ in 6 months)': 'Want aggressive growth',
    # Decision 1: concierge.
    'Unlimited website edits, done by our team, at a do-it-yourself price.': CONCIERGE + '.',
    'Unlimited edits, at your request': CONCIERGE,
    'Unlimited edit requests': CONCIERGE,
    'Unlimited edits — literally anything on your website (text, images, design, features, integrations). No limits, no tiers, just unlimited website management.':
        CONCIERGE + ': anything on your website (text, images, design, features, integrations).',
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
    # Decision 4 (after the refund rewrite above, which runs first).
    "The setup fee is refundable within 24 hours of payment if work hasn't started. After that: we focus on optimization until you see results. Our average client does.":
        "The setup fee is refundable within 24 hours of payment if work hasn't started. " + REPORT,
    ' Typical results: 2-3 months to see ranking improvements, 6+ months for major growth.': ' ' + REPORT,
    'Results vary, but typical: 150-300% traffic increase in 6-12 months with consistent blog content and SEO. Factors: starting point, competition level, blog consistency, backlink building, your market size.':
        'Results vary. Factors: starting point, competition level, blog consistency, backlink building, your market size. ' + REPORT,
    " We're confident you'll see results and want to stay.": '',
    # Decision 1 / 2.
    ' — that’s what unlimited means.': '.',
    'Yes. Boost and above include unlimited done-for-you edits — just request a change and our team handles it.':
        'Yes. Boost and Growth include edits by our team for the first 30 days, and Platinum includes unlimited edits — just request a change and our team handles it.',
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
    ('25-100% increase in website traffic within 6 months', '2-5x increase in leads and bookings', '$1-10 return for every $1 spent on marketing'): [REPORT],
}
# Undocumented client results, removed 15 Oct (Zulfay Hair's is documented and stays).
CASE_STUDY_TITLES = {'How Done-For-You Websites Drive Results', 'Real Results: Growth Members Achieving Massive Success'}
REMOVED_STATS = {'orders in the first quarter', 'return for Perun Roofing'}
REMOVED_RESULTS = {'Bin Adam Textile': '#1 on Google', 'Eebeel Home': '2,000+ leads', 'Askari Estates': '3× more enquiries',
                   'IronCore Fitness': '200+ sign-ups online', 'Speedway Auto Care': 'Bookings up 2.5×'}
# None of these may appear anywhere in plan-copy.sql -- not even in its guards.
MUST_NOT_APPEAR = ['3-5x', 'Top 10 Google', '5000%', '2500%', 'Slavi', 'Unlimited edits, at your request', 'No limits']
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
        kept = []
        for i, x in enumerate(v):
            # Decision 4: "Example results" paragraphs and "Year 1 Results"; decision 1: the unlimited-edits stat.
            if isinstance(x, dict) and (str(x.get('p', '')).startswith('Example results:') or x.get('h') == 'Year 1 Results'
                                        or x.get('label') == 'edits on Boost and above'
                                        or (path == '.resultStats' and x.get('label') in REMOVED_STATS)):
                hits.setdefault(slug, []).append(f'{path}[{i}]: removed {json.dumps(x, ensure_ascii=False)[:90]}')
                continue
            kept.append(walk(x, slug, f'{path}[{i}]'))
        out = kept
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
        if slug in DETAIL_DROP and path == '.detail' and 'examples' in v:
            # The example case studies were not real, named clients (decision 3).
            hits.setdefault(slug, []).append(f'{path}.examples: removed')
            v = {k: x for k, x in v.items() if k != 'examples'}
        # Undocumented client results (15 Oct), same as case-studies.sql: the
        # named case studies, Slavi's story and quote. Zulfay Hair's result is
        # documented and stays.
        if slug in ('services/dfy', 'services/growth') and path == '.detail':
            for key in ('caseStudies', 'slaviStory'):
                if key in v and (key == 'slaviStory' or v[key].get('title') in CASE_STUDY_TITLES):
                    hits.setdefault(slug, []).append(f'{path}.{key}: removed')
                    v = {k: x for k, x in v.items() if k != key}
        if slug == 'services/growth' and path == '' and v.get('quoteName') == 'Slavi':
            hits.setdefault(slug, []).append('.quote: Slavi quote removed')
            v = {k: x for k, x in v.items() if k not in ('quote', 'quoteName', 'quoteCompany')}
        if slug == 'website-examples' and v.get('name') in REMOVED_RESULTS and REMOVED_RESULTS[v['name']] == v.get('result'):
            hits.setdefault(slug, []).append(f'{path}.result: {v["result"]!r} removed')
            v = {k: x for k, x in v.items() if k != 'result'}
        if slug == 'plans/platinum' and path == '.detail.pricing' and 'roi' in v:
            hits.setdefault(slug, []).append(f'{path}.roi: removed ("Average client increase: 3-5x sales")')
            v = {k: x for k, x in v.items() if k != 'roi'}
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


def _jstr(s):
    esc = {'"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t'}
    return '"' + ''.join(esc.get(c) or ('\\u%04x' % ord(c) if ord(c) < 0x20 else c) for c in s) + '"'


def jsonb_text(v):
    """What Postgres prints for v::jsonb::text -- keys by byte length then bytes, ', ' and ': '."""
    if v is None:
        return 'null'
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if isinstance(v, (int, float)):
        return json.dumps(v)
    if isinstance(v, str):
        return _jstr(v)
    if isinstance(v, list):
        return '[' + ', '.join(jsonb_text(x) for x in v) + ']'
    keys = sorted(v, key=lambda k: (len(k.encode()), k.encode()))
    return '{' + ', '.join(_jstr(k) + ': ' + jsonb_text(v[k]) for k in keys) + '}'


def fingerprint(obj):
    # The drift guard compares an md5 of the row rather than the row itself,
    # so plan-copy.sql does not carry the old copy it is replacing.
    return hashlib.md5(jsonb_text(obj).encode()).hexdigest()


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
 WHERE slug = '{slug}' AND md5((data - '__seo')::text) = '{fingerprint(old_body)}';
GET DIAGNOSTICS n = ROW_COUNT;
IF n <> 1 THEN RAISE EXCEPTION '{slug} changed since the export; nothing applied. Re-export and regenerate.'; END IF;
""")
    rollbacks.append(f"""UPDATE marketing_content
   SET data = CASE WHEN data ? '__seo' THEN {lit(old_body)} || jsonb_build_object('__seo', data->'__seo') ELSE {lit(old_body)} END
 WHERE slug = '{slug}' AND md5((data - '__seo')::text) = '{fingerprint(new_body)}';
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
    '-- Round 2: concierge edits as agreed in the plan; Growth edits for the first\n'
    '-- 30 days; no unnamed example case studies; no promised results or timeframes.\n'
    '-- 15 Oct: undocumented client results removed (as case-studies.sql, which is a\n'
    '-- no-op after this). Each row is matched by an md5 of its exported content.\n'
    '-- All or nothing.', updates))
open(os.path.join(OUT, 'plan-copy-rollback.sql'), 'w', encoding='utf-8').write(wrap(
    '-- Restores the rows plan-copy.sql changes. All or nothing.', rollbacks))
forward = open(os.path.join(OUT, 'plan-copy.sql'), encoding='utf-8').read()
for phrase in MUST_NOT_APPEAR:
    assert phrase.replace("'", "''") not in forward, f'{phrase!r} is in plan-copy.sql'
for slug, h in sorted(hits.items()):
    print(f'{slug}: {len(h)} change(s)')
    for line in h:
        print('   ', line[:140])
