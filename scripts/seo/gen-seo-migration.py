"""Compare the database's SEO values with the spec sheet and write a migration.

Reads a read-only export of marketing_content and marketing_blog_posts (JSON
arrays as PostgREST returns them) and the sheet's "Metadata (all pages)" tab.

Writes:
  <out>/supabase-seo-export.csv           every __seo row + every blog post, DB vs sheet
  <out>/migrations/seo-overrides.sql      UPDATEs that set the sheet values (review, then run)
  <out>/migrations/seo-overrides-rollback.sql   the same rows back to today's values

Why a migration at all: marketing_content.__seo overrides the title and
description in code at request time, so changing code alone would leave
every page that has a row (147 of them) showing the old values.

Usage:
  python3 -I scripts/seo/gen-seo-migration.py /seo-data/metadata-all-pages.csv /seo-data/supabase-export /seo-data
"""
import csv
import json
import os
import re
import sys

SHEET, DB_DIR, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
T, D, H = 'New title (≤60)', 'New meta description (≤160)', 'New H1 (≤70)'
SKIP_STATUSES = {'301', 'noindex', 'New / planned'}

# Hub pages whose marketing_content slug isn't derivable from the URL.
STATIC_SLUGS = {
    '/': 'home',
    '/done-for-you-website': 'services/dfy',
    '/local-national-and-global-seo': 'services/seo',
    '/concierge-service': 'services/concierge',
    '/growth-marketing-service': 'services/growth',
    '/pricing': 'pricing',
    '/features': 'features',
    '/complete-website-audit-for-organic-visibility': 'website-audit',
    '/videos': 'videos',
    '/alternatives': 'alternatives',
    '/best-website-builder-pakistan': 'best-builder',
    '/help': 'help',
    '/blogs': 'blogs',
    '/about-us': 'about',
    '/contact': 'contact',
    '/faqs': 'faqs',
    '/careers': 'careers',
    '/become-a-partner': 'partner',
    '/thank-you': 'thank-you',
    '/website-examples': 'website-examples',
    '/templates': 'templates',
}
PATTERNS = [
    (r'^/website-design-(.+)$', 'cities/{}'),
    (r'^/website-for-(.+)$', 'industries/{}'),
    (r'^/alternatives/matjarx-vs-(.+)$', 'comparisons/{}'),
    (r'^/plans/(.+)$', 'plans/{}'),
    (r'^/help/(.+)$', 'help/{}'),
    (r'^/legal/(.+)$', 'legal/{}'),
    (r'^/blogs/(category|author)/(.+)$', 'blogs/{}/{}'),
]


def content_slug(url):
    if url in STATIC_SLUGS:
        return STATIC_SLUGS[url]
    for pat, fmt in PATTERNS:
        m = re.match(pat, url)
        if m:
            return fmt.format(*m.groups())
    return None


def url_for_slug(slug, by_slug):
    return by_slug.get(slug, '')


def current_h1(slug, data):
    """The H1 a row's own content fields currently produce, where it has one."""
    kind = slug.split('/')[0]
    if kind in ('help', 'legal') and '/' in slug:
        return data.get('title')
    if kind == 'industries':
        return data.get('headline')
    if kind == 'services' and (data.get('titleLead') or data.get('titleMark')):
        return f"{data.get('titleLead', '')} {data.get('titleMark', '')}".strip()
    if kind == 'plans':
        return data.get('headline')
    return None


def sql_str(value):
    if value is None:
        return 'NULL'
    return "'" + str(value).replace("'", "''") + "'"


sheet = {r['URL']: dict(r) for r in csv.DictReader(open(SHEET, encoding='utf-8'))}

# Reviewed rewrites (gen-review-csvs.py) replace the sheet's value field by
# field, so the migration carries exactly what was reviewed.
REVIEW_DIR = os.path.join(OUT, 'review')
COLUMN = {'title': T, 'description': D, 'h1': H}
overlaid = []
for name in sorted(os.listdir(REVIEW_DIR)) if os.path.isdir(REVIEW_DIR) else []:
    if not name.endswith('.csv'):
        continue
    for o in csv.DictReader(open(os.path.join(REVIEW_DIR, name), encoding='utf-8')):
        if o.get('field') in COLUMN and o.get('proposed') and o['url'] in sheet:
            sheet[o['url']][COLUMN[o['field']]] = o['proposed']
            overlaid.append(name)
content = json.load(open(os.path.join(DB_DIR, 'marketing_content.json'), encoding='utf-8'))
blogs = json.load(open(os.path.join(DB_DIR, 'marketing_blog_posts.json'), encoding='utf-8'))
slug_to_url = {content_slug(u): u for u in sheet if content_slug(u)}


def sheet_values(url):
    r = sheet.get(url)
    if not r:
        return None, 'not in sheet'
    if r['Status'] in SKIP_STATUSES:
        return None, f"skip: status {r['Status']}"
    if not (r[T] and r[D] and r[H]):
        return None, 'skip: sheet has no new values'
    return r, None


export_rows, updates, rollbacks = [], [], []

for row in sorted(content, key=lambda r: r['slug']):
    data = row['data'] if isinstance(row['data'], dict) else {}
    seo = data.get('__seo') or {}
    if not seo:
        continue
    slug = row['slug']
    url = url_for_slug(slug, slug_to_url)
    r, why = sheet_values(url) if url else (None, 'no page for this slug')
    h1_now = seo.get('h1') or current_h1(slug, data)
    if r:
        same = seo.get('title') == r[T] and seo.get('description') == r[D] and seo.get('h1') == r[H]
        action = 'no change' if same else 'update'
    else:
        action = why
    export_rows.append({
        'table': 'marketing_content', 'slug': slug, 'url': url, 'db_updated_at': row.get('updated_at', ''),
        'db_title': seo.get('title', ''), 'db_description': seo.get('description', ''), 'db_h1': h1_now or '',
        'sheet_title': r[T] if r else '', 'sheet_description': r[D] if r else '', 'sheet_h1': r[H] if r else '',
        'action': action,
    })
    if action == 'update':
        new = {'title': r[T], 'description': r[D], 'h1': r[H]}
        updates.append(
            f"-- {url}\n"
            f"--   title: {seo.get('title')!r} -> {r[T]!r}\n"
            f"UPDATE marketing_content\n"
            f"   SET data = jsonb_set(data, '{{__seo}}', COALESCE(data->'__seo', '{{}}'::jsonb) || {sql_str(json.dumps(new, ensure_ascii=False))}::jsonb),\n"
            f"       updated_at = now()\n"
            f" WHERE slug = {sql_str(slug)};\n"
        )
        rollbacks.append(
            f"UPDATE marketing_content\n"
            f"   SET data = jsonb_set(data, '{{__seo}}', {sql_str(json.dumps(seo, ensure_ascii=False))}::jsonb)\n"
            f" WHERE slug = {sql_str(slug)};\n"
        )

# Blog posts: no __seo. `title` is what the post page renders as its H1 (and
# on cards); the <title> and meta description come from the sheet in code,
# so only `title` changes here. Slug, published, body, excerpt: untouched.
for row in sorted(blogs, key=lambda r: r['slug']):
    url = f"/blogs/{row['slug']}"
    r, why = sheet_values(url)
    if r:
        action = 'no change' if row['title'] == r[H] else 'update'
    else:
        action = why
    export_rows.append({
        'table': 'marketing_blog_posts', 'slug': row['slug'], 'url': url, 'db_updated_at': row.get('updated_at', ''),
        'db_title': row['title'], 'db_description': row.get('excerpt', ''), 'db_h1': row['title'],
        'sheet_title': r[T] if r else '', 'sheet_description': r[D] if r else '', 'sheet_h1': r[H] if r else '',
        'action': action,
    })
    if action == 'update':
        updates.append(
            f"-- {url}\n"
            f"UPDATE marketing_blog_posts\n"
            f"   SET title = {sql_str(r[H])}, updated_at = now()\n"
            f" WHERE slug = {sql_str(row['slug'])};\n"
        )
        rollbacks.append(
            f"UPDATE marketing_blog_posts SET title = {sql_str(row['title'])} WHERE slug = {sql_str(row['slug'])};\n"
        )

fields = ['table', 'slug', 'url', 'action', 'db_updated_at', 'db_title', 'sheet_title', 'db_description',
          'sheet_description', 'db_h1', 'sheet_h1']
with open(os.path.join(OUT, 'supabase-seo-export.csv'), 'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=fields)
    w.writeheader()
    w.writerows(export_rows)

from collections import Counter as _C
overlay_note = ', '.join(f'{n} ({c})' for n, c in sorted(_C(overlaid).items())) or 'none'
header = f"""-- GENERATED by scripts/seo/gen-seo-migration.py -- review before running.
--
-- Values: the spec sheet, with these reviewed rewrites applied on top:
--   {overlay_note}
-- Run only once those review files are approved.
--
-- Sets each page's SEO title, meta description and H1 to the values in the
-- spec sheet ("Metadata (all pages)"). marketing_content.__seo overrides the
-- code at request time, so without this the code changes don't show.
--   marketing_content: merges title, description and h1 into data.__seo;
--                      no other key in `data` is touched.
--   marketing_blog_posts: sets `title` (the post's H1) only. Slug, published,
--                      body and excerpt are not touched.
-- updated_at is bumped so the sitemap's <lastmod> reflects the change.
-- Undo with seo-overrides-rollback.sql (generated from the same export).

BEGIN;

"""
os.makedirs(os.path.join(OUT, 'migrations'), exist_ok=True)
with open(os.path.join(OUT, 'migrations', 'seo-overrides.sql'), 'w', encoding='utf-8') as f:
    f.write(header + '\n'.join(updates) + '\nCOMMIT;\n')
with open(os.path.join(OUT, 'migrations', 'seo-overrides-rollback.sql'), 'w', encoding='utf-8') as f:
    f.write('-- Restores the rows seo-overrides.sql changes to their values at export time.\n\nBEGIN;\n\n'
            + '\n'.join(rollbacks) + '\nCOMMIT;\n')

from collections import Counter
print(Counter((r['table'], r['action']) for r in export_rows))
print(f'{len(updates)} UPDATE statements')
