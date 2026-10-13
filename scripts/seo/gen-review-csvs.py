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

# ── Plan wording (live plan pages + /legal/terms are the source) ────────
P = 'plan page'
T = '/legal/terms §3'
PLAN = [
    # url, field, proposed (None = keep sheet value), source, conflict
    ('/plans/launch', 'description',
     'Launch plan: a themed business website of up to 10 pages, written, hosted and managed for you. Rs. 4,500/month plus Rs. 22,500 setup.',
     f'{T}: "5–10 pages, basic website, hosting, domain"; page limit confirmed 13 Oct: "up to 10 pages"',
     'Sheet said "under 50 pages".'),
    ('/plans/boost', 'description',
     'Boost plan: a 20–30 page website plus local SEO and managed business profiles on Google and Maps, so nearby customers find you. Rs. 15,600/month + setup.',
     f'{T}: "20–30 pages"; {P}: advanced SEO, Google Maps listing, review collection', 'Page limit added (confirmed 13 Oct).'),
    ('/plans/boost', '—', None,
     f'{P} /plans/boost: "Unlimited done-for-you edits"; {T}: "unlimited edits (first 30 days)"',
     'CONFLICT (not resolved): plan page promises unlimited edits with no time limit; Terms limit unlimited edits to the first 30 days. The Boost detail FAQ agrees with the Terms.'),
    ('/plans/boost', '—', None,
     f'{P} /plans/boost detail: "30 pages" / "30 professional pages"; {T}: "20–30 pages"',
     'Page limit confirmed 13 Oct as 20–30 (per Terms). The Boost detail copy still says "30 pages"; not in metadata. Listed for the content pass.'),
    ('/plans/growth', 'title', 'Growth Plan: A Marketing Team, Rs. 27,000/month | MatjarX',
     f'{P} headline: "A Marketing Team, Not Just A Website"', 'Sheet said "Full SEO, GEO & AEO", which the plan page does not describe.'),
    ('/plans/growth', 'description',
     'Growth plan: a website of up to 50 pages, a dedicated growth team, a marketing plan and monthly 1-on-1 sessions. Rs. 27,000/month + Rs. 22,500 setup.',
     f'{P} subhead; {T}: "dedicated marketing manager, 1-on-1 monthly growth meetings"', ''),
    ('/plans/growth', 'h1', 'Growth plan: a marketing team, not just a website',
     f'{P} headline', ''),
    ('/plans/growth', '—', None,
     f'{P}: "2,000 words of fresh content written monthly"; {T} and Growth detail: "3 blog posts/month"',
     'CONFLICT (not resolved): monthly content volume. Left out of the metadata.'),
    ('/plans/growth', '—', None,
     f'{P} feature: "Paid ads set up and managed"; {T}: Growth includes no ads',
     'CONFLICT (not resolved): paid ads on Growth. Left out of the metadata.'),
    ('/plans/platinum', 'title', 'Platinum Plan: Custom Store, Social Media & Ads | MatjarX',
     f'{P} headline: "A Custom Store, Built To Scale"; {T}: "social media management"; Platinum detail: Facebook/Google ads', ''),
    ('/plans/platinum', 'description',
     'Platinum plan: a custom store with unlimited pages, plus social media management, 10 blogs a month and ads managed. Rs. 55,000/month + Rs. 140,000 setup.',
     f'{P} subhead; {T}: "e-commerce management, advanced SEO, social media management, 10 blogs/month"', ''),
    ('/plans/platinum', 'h1', 'Platinum plan: a custom store, built to scale',
     f'{P} headline', ''),
    ('/plans/platinum', '—', None,
     f'{P} card and hero: no social media management listed; {T} and Platinum detail: social media management, 20 post designs/month',
     'CONFLICT (not resolved): the plan page hero and feature list omit social media management, which the Terms include. Metadata follows the Terms here.'),
    ('/plans/custom', 'title', 'Custom Plan: Built for Your Business | MatjarX',
     f'{P} headline: "Your Vision. Our Custom Solution."; {T}: "Custom projects are priced individually"', 'Sheet said "Dedicated Website & Marketing Team".'),
    ('/plans/custom', 'description',
     'Custom plan for larger businesses: a discovery call, a proposal with real pricing, and a dedicated project team for integrations, migration and custom features.',
     f'{P} subhead and features', 'Sheet said "custom setup and monthly pricing with a dedicated concierge team".'),
    ('/plans/custom', 'h1', 'Custom plan with a dedicated project team',
     f'{P} feature: "A dedicated project team, not a general queue"', ''),
    ('/growth-marketing-service', 'description', None,
     f'{T}: Platinum includes "social media management"', 'No change: consistent with the Terms. Body link to /plans/platinum will use the anchor "Platinum plan" (group 5).'),
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

# ── Claim wording (approved) ────────────────────────────────────────────
claim_text = ('MatjarX builds and runs websites for Pakistani businesses: 7+ years of experience and 70,000+ '
              'websites built, first under our US brand and now in Pakistan.')
claim = [{'url': '/about-us', 'field': 'description', 'current': rows['/about-us'][FIELDS['description'][0]],
          'proposed': claim_text, 'chars': len(claim_text), 'limit': 160, 'status': 'approved 13 Oct'}]

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
