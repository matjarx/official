"""Draft the metadata rewrites that need approval before they are applied.

Writes into <out>/review/:
  seven-days.csv     every sheet value saying "7 days", rewritten to business days
  plan-wording.csv   plan rows rewritten to match the live plan pages and /legal/terms
  claim-wording.csv  the /about-us 70,000 claim in the exact approved wording

Columns: url, field, current, proposed, chars, limit[, source, conflict]

gen-seo-migration.py reads every CSV in review/ as an overlay on the sheet,
so whatever is approved here is what the migration and the code both use.

Usage: python3 -I scripts/seo/gen-review-csvs.py /seo-data/metadata-all-pages.csv /seo-data
"""
import csv
import os
import re
import sys

SHEET, OUT = sys.argv[1], sys.argv[2]
FIELDS = {'title': ('New title (≤60)', 60), 'description': ('New meta description (≤160)', 160), 'h1': ('New H1 (≤70)', 70)}
SKIP = {'301', 'noindex', 'New / planned'}
rows = {r['URL']: r for r in csv.DictReader(open(SHEET, encoding='utf-8'))
        if r['Status'] not in SKIP and r['New title (≤60)']}

# ── 7 days -> business days ──────────────────────────────────────────────
SEVEN = re.compile(r'\b7[ -][Dd]ays?\b')

# Timeframe removal, tried in order; each must leave a complete phrase.
REMOVALS = [
    (r':\s*(?:your site |sites )?[Ll]ive in 7 [Dd]ays', ''),       # "...: Live in 7 Days | MatjarX", "...: sites live in 7 days"
    (r',\s*(?:[Ll]ive|[Ll]aunched) in 7 [Dd]ays', ''),               # "..., live in 7 days", ", Live in 7 Days"
    (r'\s*Live in 7 days\.', ''),                                   # trailing sentence
    (r'\bbuilt in 7 days ', 'built '),                              # "built in 7 days with bookings"
    (r'Websites in 7 Days', 'Websites'),
    (r'the 7-day build', 'the build'),
    (r'(?<=\w) in 7 days', ''),                                     # "set it up in 7 days.", "go live in 7 days,"
]


def business_days(value, as_little_as, title_case):
    unit = 'Business Days' if title_case else 'business days'
    lead = 'as little as ' if as_little_as else ''
    v = re.sub(r'\b7-day\b', '7-business-day', value)
    return re.sub(r'\b7 [Dd]ays\b', f'{lead}7 {unit}', v)


def rewrite(url, field, value, limit):
    title = field == 'title'
    # Approved rule (13 Oct): "7 business days", or drop the timeframe from
    # that field when it doesn't fit. No "as little as" variant.
    candidates = []
    candidates.append(('7 business days', business_days(value, False, title)))
    removed = value
    for pat, repl in REMOVALS:
        removed = re.sub(pat, repl, removed)
    removed = re.sub(r'\s+([,.])', r'\1', re.sub(r'\s{2,}', ' ', removed)).strip()
    removed = re.sub(r'\s*\|\s*', ' | ', removed)
    candidates.append(('timeframe removed', removed))
    for how, text in candidates:
        if len(text) <= limit and not SEVEN.search(text):
            return how, text
    return 'NEEDS MANUAL REWRITE', removed


seven = []
for url, r in rows.items():
    for field, (col, limit) in FIELDS.items():
        v = r[col]
        if not SEVEN.search(v):
            continue
        how, proposed = rewrite(url, field, v, limit)
        seven.append({'url': url, 'field': field, 'current': v, 'proposed': proposed,
                      'chars': len(proposed), 'limit': limit, 'rule': how})

# ── Launch-price pages (review of 13 Oct) ─────────────────────────────
# Pages that quote Launch's Rs. 4,500 must not promise Boost features (local
# SEO, Google Maps, reviews, edits). These descriptions replace the sheet's,
# templated as given; city and industry names come from the sheet's own text.
CITY_TEMPLATE = ('Website design and development in {city}, live in 7 business days from Rs. 4,500/month. '
                 'Add local SEO and Google Maps with the Boost plan.')
INDUSTRY_TEMPLATE = ('{industry} website design in Pakistan, live in 7 business days with WhatsApp leads and an '
                     'easy editor. From Rs. 4,500/month + setup.')
LAUNCH_PRICE_INDUSTRIES = ['restaurants', 'boutiques', 'clinics-and-healthcare', 'real-estate', 'salons-and-spas',
                           'gyms-and-fitness', 'construction-companies', 'law-firms', 'wedding-and-event-planners',
                           'auto-repair-shops']
HOME_DESCRIPTION = ('Website design and development company in Pakistan. Your business website live in 7 business '
                    'days from Rs. 4,500/month, plus SEO and marketing plans to grow.')
D_COL = FIELDS['description'][0]
launch_price = {}
for url, r in rows.items():
    if r['Page type'] == 'City':
        m = re.search(r'in (.+?), live in 7 days', r[D_COL])
        city = m.group(1) if m else url.removeprefix('/website-design-').replace('-', ' ').title()
        launch_price[url] = CITY_TEMPLATE.format(city=city)
for slug in LAUNCH_PRICE_INDUSTRIES:
    url = f'/website-for-{slug}'
    industry = re.match(r'(.+?) website design', rows[url][D_COL]).group(1)
    launch_price[url] = INDUSTRY_TEMPLATE.format(industry=industry)
launch_price['/'] = HOME_DESCRIPTION
seen = set()
for row in seven:
    if row['field'] == 'description' and row['url'] in launch_price:
        row.update(proposed=launch_price[row['url']], chars=len(launch_price[row['url']]), rule='launch-price page (13 Oct)')
        seen.add(row['url'])
for url, text in launch_price.items():
    if url not in seen:
        seven.append({'url': url, 'field': 'description', 'current': rows[url][D_COL], 'proposed': text,
                      'chars': len(text), 'limit': 160, 'rule': 'launch-price page (13 Oct)'})

# ── Industry pages: sentence case, ecommerce description (13 Oct) ──────
# Descriptions and H1s in sentence case ("Auto repair shop website design",
# not "Auto Repair Shop website design"). Titles keep their title case.
ECOMMERCE_DESCRIPTION = ('Ecommerce website for Pakistani online stores: products, COD, JazzCash and EasyPaisa, '
                         'courier booking and WhatsApp orders, all in one dashboard.')


def sentence_case(text):
    m = re.match(r'(.+?)( website design\b.*)$', text, re.S)
    if not m:
        return text
    lead = m.group(1)
    return lead[0] + lead[1:].lower() + m.group(2)


by_key = {(row['url'], row['field']): row for row in seven}
for url, r in rows.items():
    if r['Page type'] != 'Industry':
        continue
    for field in ('description', 'h1'):
        col, limit = FIELDS[field]
        row = by_key.get((url, field))
        value = row['proposed'] if row else r[col]
        new = ECOMMERCE_DESCRIPTION if (url, field) == ('/website-for-online-stores-ecommerce', 'description') else sentence_case(value)
        if new == value:
            continue
        rule = 'set 13 Oct' if new == ECOMMERCE_DESCRIPTION else 'sentence case (13 Oct)'
        if row:
            row.update(proposed=new, chars=len(new), rule=f"{row['rule']}; {rule}")
        else:
            seven.append({'url': url, 'field': field, 'current': r[col], 'proposed': new,
                          'chars': len(new), 'limit': limit, 'rule': rule})
for row in seven:
    assert int(row['chars']) <= int(row['limit']), (row['url'], row['field'], row['chars'])

# ── Plan wording (live plan pages + /legal/terms are the source) ────────
P = 'plan page'
T = '/legal/terms §3'
# Final rulings, 13 Oct. Exact values given by the reviewer are marked "set 13 Oct".
AD_LINE = '1 ad campaign managed (ad spend under Rs. 50,000, paid by you to the platform)'
PLAN = [
    # url, field, proposed (None = keep sheet value), source, note
    ('/plans/launch', 'description',
     'Launch plan: a themed website of up to 10 pages, written and hosted for you, with an easy editor and launch training. Rs. 4,500/month + Rs. 22,500 setup.',
     f'{T}: "5–10 pages"; ruling 13 Oct: no edits by our team, clients edit with the theme editor after a launch training call',
     'Set 13 Oct.'),
    ('/plans/launch', '—', None, 'Ruling 13 Oct',
     'RESOLVED: Launch includes no edits by our team. "Unlimited edits (within reason)" and every Launch edit promise removed (matjarx/official#5).'),
    ('/plans/boost', 'description',
     'Boost plan: a 20–30 page website plus local SEO and managed business profiles on Google and Maps, so nearby customers find you. Rs. 15,600/month + setup.',
     f'{T}: "20–30 pages"; {P}: advanced SEO, Google Maps listing, review collection', 'Page limit added (confirmed 13 Oct).'),
    ('/plans/boost', '—', None, f'{T}: "unlimited edits (first 30 days)"',
     'RESOLVED: Boost edits are unlimited for the first 30 days, per the Terms (matjarx/official#5).'),
    ('/plans/growth', 'title', 'Growth Plan: SEO + Marketing Team, Rs. 27,000/mo | MatjarX', 'Ruling 13 Oct', 'Set 13 Oct.'),
    ('/plans/growth', 'description',
     'Growth plan: a website of up to 50 pages, a dedicated growth team, a marketing plan, 3 blog posts a month and 1-on-1 sessions. Rs. 27,000/month + setup.',
     'Ruling 13 Oct', 'Set 13 Oct.'),
    ('/plans/growth', 'h1', 'Growth plan: a marketing team, not just a website', f'{P} headline', ''),
    ('/plans/growth', '—', None, f'{T}: "3 blog posts/month"',
     'RESOLVED: Growth is "3 blog posts a month"; every "2,000 words" replaced (matjarx/official#5).'),
    ('/plans/growth', '—', None, 'Ruling 13 Oct',
     'RESOLVED: Growth includes "ads advice", not ad management; ad management is described only on Platinum.'),
    ('/plans/platinum', 'title', 'Platinum Plan: Custom Store, Social Media & Ads | MatjarX', 'Ruling 13 Oct', 'Set 13 Oct.'),
    ('/plans/platinum', 'description',
     'Platinum plan: a custom store, social media management, 10 blogs a month and 1 ad campaign managed (ad spend under Rs. 50,000). Rs. 55,000/month + setup.',
     'Ruling 13 Oct', 'Set 13 Oct.'),
    ('/plans/platinum', 'h1', 'Platinum plan: a custom store, social media and ads', 'Ruling 13 Oct', 'Set 13 Oct.'),
    ('/plans/platinum', '—', None, 'Ruling 13 Oct',
     f'RESOLVED: Platinum includes social media management and "{AD_LINE}". More campaigns or a bigger budget = custom ads plan. '
     'Plan page, /pricing, features, help and industry pages updated (matjarx/official#5). /legal/terms to be updated by the business.'),
    ('/plans/custom', 'title', 'Custom Plan: Built for Your Business | MatjarX',
     f'{P} headline: "Your Vision. Our Custom Solution."; {T}: "Custom projects are priced individually"', 'Sheet said "Dedicated Website & Marketing Team".'),
    ('/plans/custom', 'description',
     'Custom plan for larger businesses: a discovery call, a proposal with real pricing, and a dedicated project team for integrations, migration and custom features.',
     f'{P} subhead and features', 'Sheet said "custom setup and monthly pricing with a dedicated concierge team".'),
    ('/plans/custom', 'h1', 'Custom plan with a dedicated project team',
     f'{P} feature: "A dedicated project team, not a general queue"', ''),
    ('/growth-marketing-service', 'description',
     'Digital marketing agency in Pakistan for small businesses: social media, SEO and ads by one team. Platinum Rs. 55,000/month includes 1 ad campaign.',
     'Review of 13 Oct', 'Set 13 Oct.'),
    ('/concierge-service', 'description',
     'Website maintenance services with a dedicated concierge team: small edits, updates, security, speed and SEO care, handled over chat or WhatsApp.',
     'Review of 13 Oct: remove "unlimited" from "unlimited small edits"', 'Set 13 Oct.'),
]
plan = []
for url, field, proposed, source, conflict in PLAN:
    if field == '—':
        plan.append({'url': url, 'field': '—', 'current': '', 'proposed': '', 'chars': '', 'limit': '',
                     'source': source, 'conflict': conflict})
        continue
    col, limit = FIELDS[field]
    current = rows[url][col]
    new = current if proposed is None else proposed
    assert len(new) <= limit, (url, field, len(new))
    assert not SEVEN.search(new), (url, field)
    plan.append({'url': url, 'field': field, 'current': current, 'proposed': new, 'chars': len(new),
                 'limit': limit, 'source': source, 'conflict': conflict})

# ── Claim wording ────────────────────────────────────────────────────────
# The approved claim is one exact sentence (corrected 13 Oct). It is used
# whole or not at all: where it doesn't fit a field's limit it's left out,
# never shortened or reworded.
CLAIM = ('Our team has 7+ years of experience and has built 70,000+ websites, '
         'first under our US brand and now in Pakistan.')
claim = []
# /about-us: exact description set 13 Oct (the claim sentence doesn't fit 160).
ABOUT = ('MatjarX builds, hosts and runs websites for Pakistani businesses, then helps them get found on Google, '
         'Maps and AI search. Meet the team behind it.')
for url, r in rows.items():
    for field, (col, limit) in FIELDS.items():
        v = r[col]
        if '70,000' not in v or CLAIM in v:
            continue
        if (url, field) == ('/about-us', 'description'):
            proposed, status = ABOUT, 'set 13 Oct (claim left out: the sentence does not fit 160)'
        else:
            lead = re.split(r'(?<=[.:])\s+(?=[^.:]*70,000)', v)[0].rstrip(':. ') + '.'
            with_claim = f'{lead} {CLAIM}'
            proposed, status = ((with_claim, 'claim in exact wording') if len(with_claim) <= limit
                                else (lead, f'claim left out: with it the field is {len(with_claim)}/{limit}'))
        assert len(proposed) <= limit, (url, field, len(proposed))
        claim.append({'url': url, 'field': field, 'current': v, 'proposed': proposed,
                      'chars': len(proposed), 'limit': limit, 'status': status})

os.makedirs(os.path.join(OUT, 'review'), exist_ok=True)


def write(name, data, cols):
    with open(os.path.join(OUT, 'review', name), 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=cols)
        w.writeheader()
        w.writerows(data)


base = ['url', 'field', 'current', 'proposed', 'chars', 'limit']
write('seven-days.csv', seven, base + ['rule'])
write('plan-wording.csv', plan, base + ['source', 'conflict'])
write('claim-wording.csv', claim, base + ['status'])

from collections import Counter
print('seven-days:', len(seven), dict(Counter(r['rule'] for r in seven)))
print('plan-wording:', len(plan), 'rows,', sum(1 for r in plan if r['field'] == '—'), 'conflicts listed')
overlap = {(r['url'], r['field']) for r in seven} & {(r['url'], r['field']) for r in plan}
print('overlap between files:', overlap or 'none')
