"""SQL that applies the 13 Oct plan-copy rulings to the plan pages' database rows.

marketing_content holds a full copy of /plans/boost, /plans/growth,
/plans/platinum and /plans/custom (headline, features, FAQs, detail
sections), and that copy overrides the code at request time. The code change
alone would not show on those four pages, so the same edits are applied here
to a read-only export of the rows.

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

# Whole-string replacements: a value equal to the key becomes the value.
EXACT = {
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
    'Boost is the better value — it adds unlimited done-for-you edits and advanced SEO.':
        'Boost is the better value — it adds unlimited done-for-you edits for the first 30 days and advanced SEO.',
    'Everything in Launch, plus unlimited edits done by our team, advanced SEO':
        'Everything in Launch, plus unlimited edits done by our team for the first 30 days, advanced SEO',
    "There's no monthly cap and no per-change fee.":
        "For the first 30 days there's no cap and no per-change fee. After that, major structural changes may carry additional fees.",
    'digital goods and multi-seat bookings.': 'digital goods and multi-seat bookings, plus social media management.',
}
# Lists.
LIST_EXACT = {('Pages', '5-10', '30'): ['Pages', 'Up to 10', '20–30']}
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
        if (slug == 'plans/platinum' and path == '.features' and PLATINUM_FEATURE_ANCHOR in out
                and PLATINUM_FEATURE not in out):
            out.insert(out.index(PLATINUM_FEATURE_ANCHOR) + 1, PLATINUM_FEATURE)
            hits.setdefault(slug, []).append(f'{path}: + {PLATINUM_FEATURE!r}')
        return out
    if isinstance(v, dict):
        return {k: walk(x, slug, f'{path}.{k}') for k, x in v.items()}
    return v


def lit(obj):
    return "'" + json.dumps(obj, ensure_ascii=False).replace("'", "''") + "'::jsonb"


rows = {r['slug']: r for r in json.load(open(SRC, encoding='utf-8')) if r['slug'].startswith('plans/')}
updates, rollbacks = [], []
for slug in sorted(rows):
    old = rows[slug]['data']
    new = walk(old, slug)
    if new == old:
        continue
    updates.append(f"""-- {slug}: {len(hits[slug])} change(s)
UPDATE marketing_content SET data = {lit(new)}, updated_at = now()
 WHERE slug = '{slug}' AND data = {lit(old)};
GET DIAGNOSTICS n = ROW_COUNT;
IF n <> 1 THEN RAISE EXCEPTION '{slug} changed since the export; nothing applied. Re-export and regenerate.'; END IF;
""")
    rollbacks.append(f"""UPDATE marketing_content SET data = {lit(old)}
 WHERE slug = '{slug}' AND data = {lit(new)};
GET DIAGNOSTICS n = ROW_COUNT;
IF n <> 1 THEN RAISE EXCEPTION '{slug} changed since plan-copy.sql ran; nothing rolled back.'; END IF;
""")


def wrap(head, body):
    return (f'{head}\n\nBEGIN;\nDO $mx$\nDECLARE n integer;\nBEGIN\n' + '\n'.join(body) + 'END\n$mx$;\nCOMMIT;\n')


os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, 'plan-copy.sql'), 'w', encoding='utf-8').write(wrap(
    '-- GENERATED by scripts/seo/gen-plan-copy-sql.py -- review before running.\n'
    '-- Applies the 13 Oct plan-copy rulings (Boost edits for the first 30 days,\n'
    '-- Growth "ads advice", Platinum social media management, page limits) to\n'
    '-- the plans/* rows, matching the code change in the same PR. All or nothing.', updates))
open(os.path.join(OUT, 'plan-copy-rollback.sql'), 'w', encoding='utf-8').write(wrap(
    '-- Restores the plans/* rows plan-copy.sql changes. All or nothing.', rollbacks))
for slug, h in sorted(hits.items()):
    print(f'{slug}: {len(h)} change(s)')
    for line in h:
        print('   ', line[:140])
