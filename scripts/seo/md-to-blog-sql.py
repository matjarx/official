"""Turn a blog post in markdown (with YAML frontmatter) into an INSERT for
marketing_blog_posts, in the same shape as the rows already there.

  python3 -I scripts/seo/md-to-blog-sql.py <post.md> <out.sql> [<row.json>] [--related=a,b,c]

--related sets related_slugs when the frontmatter has none (three posts from
the same pillar, as the existing posts carry).

Body blocks (src/lib/blog-data.ts BodyBlock):
  ## heading -> {t:'h'}      ### heading -> {t:'h3'}     paragraph -> {t:'p'}
  - item     -> {t:'l'}      1. item     -> {t:'ol'}     | table | -> {t:'table'}
Inline `[label](href)` and `**bold**` are kept as written (lib/rich-text.tsx
renders them). Links to a domain in `nofollow_links` get the "nofollow" marker.

Also inserts marketing_content `blog/<slug>` with an __seo override when the
frontmatter `title`/`meta_description` differ from the H1/excerpt, so the
search title can differ from the H1.

Both INSERTs are guarded with NOT EXISTS on the slug: running the file twice
does nothing the second time. Never connects to a database.
"""
import json
import math
import re
import sys
from datetime import date
from urllib.parse import urlparse

import yaml

args = [a for a in sys.argv[1:] if not a.startswith('--')]
opts = dict(a[2:].split('=', 1) for a in sys.argv[1:] if a.startswith('--'))
SRC, OUT = args[0], args[1]
ROW_JSON = args[2] if len(args) > 2 else None

CATEGORIES = {
    'getting-started': 'Getting started', 'client-stories': 'Client stories', 'payments': 'Payments',
    'e-commerce': 'E-commerce', 'seo': 'SEO', 'marketing': 'Marketing',
}
# Same palette the existing posts use, by category.
TINTS = {
    'Getting started': 'linear-gradient(150deg, var(--navy), #2E6EA8)',
    'SEO': 'linear-gradient(150deg, #C0392B, #5B140D)',
}
# The one wording the claim may take (spec ground rules).
CLAIM = '7+ years of experience and 70,000+ websites built, first under our US brand and now in Pakistan'

raw = open(SRC, encoding='utf-8').read()
m = re.match(r'^---\n(.*?)\n---\n(.*)$', raw, re.S)
front, md = yaml.safe_load(m.group(1)), m.group(2)
notes = []

nofollow = {d.lower().removeprefix('www.') for d in front.get('nofollow_links', [])}
LINK = re.compile(r'\[([^\]]+)\]\(([^\s()[\]]+)\)')


def inline(text):
    def mark(lm):
        host = (urlparse(lm.group(2)).hostname or '').lower().removeprefix('www.')
        if any(host == d or host.endswith('.' + d) for d in nofollow):
            return f'[{lm.group(1)}]({lm.group(2)} "nofollow")'
        return lm.group(0)
    return LINK.sub(mark, text.strip())


def cells(line):
    return [inline(c) for c in line.strip().strip('|').split('|')]


blocks, para, lines = [], [], md.split('\n')
i = 0


def flush_para():
    if para:
        blocks.append({'t': 'p', 'text': inline(' '.join(para))})
        para.clear()


while i < len(lines):
    line = lines[i].rstrip()
    if not line.strip():
        flush_para()
        i += 1
        continue
    if line.startswith('### '):
        flush_para()
        blocks.append({'t': 'h3', 'text': inline(line[4:])})
    elif line.startswith('## '):
        flush_para()
        blocks.append({'t': 'h', 'text': inline(line[3:])})
    elif line.startswith('# '):
        flush_para()
        notes.append(f'Skipped a markdown H1 ("{line[2:]}"): the page renders `title` as its only H1.')
    elif line.startswith('|'):
        flush_para()
        rows = []
        while i < len(lines) and lines[i].startswith('|'):
            if not re.match(r'^\|[\s:|-]+\|$', lines[i].strip()):
                rows.append(cells(lines[i]))
            i += 1
        blocks.append({'t': 'table', 'head': rows[0], 'rows': rows[1:]})
        continue
    elif re.match(r'^[-*] ', line):
        flush_para()
        items = []
        while i < len(lines) and re.match(r'^[-*] ', lines[i]):
            items.append(inline(lines[i][2:]))
            i += 1
        blocks.append({'t': 'l', 'items': items})
        continue
    elif re.match(r'^\d+\. ', line):
        flush_para()
        items = []
        while i < len(lines) and re.match(r'^\d+\. ', lines[i]):
            items.append(inline(re.sub(r'^\d+\. ', '', lines[i])))
            i += 1
        blocks.append({'t': 'ol', 'items': items})
        continue
    else:
        para.append(line.strip())
    i += 1
flush_para()

# Claim wording: anything that states the 70,000 claim must use it verbatim.
for b in blocks:
    for key in ('text',):
        t = b.get(key, '')
        if '70,000' in t and CLAIM not in t:
            fixed = re.sub(r'Our team has 7\+ years of experience and has built 70,000\+ websites, first under our US brand and now in Pakistan',
                           f'Our team brings {CLAIM}', t)
            if CLAIM in fixed:
                notes.append(f'Claim reworded to the exact approved wording:\n    was: {t}\n    now: {fixed}')
                b[key] = fixed
            else:
                notes.append(f'CLAIM NOT IN APPROVED WORDING, left as is: {t}')

# Inline images: the frontmatter describes them but ships no files.
for img in front.get('images', []):
    notes.append(f'Inline image not added (no image file supplied): "{img["alt"]}" ({img["placement"]})')

category = CATEGORIES[front['category']]
published = front['published_at'] if isinstance(front['published_at'], date) else date.fromisoformat(str(front['published_at']))
words = len(re.sub(r'[\[\]()*|#-]', ' ', md).split())
row = {
    'slug': front['slug'],
    'title': front['h1'],
    'category': category,
    'excerpt': front['meta_description'],
    'date': f'{published.day} {published:%b %Y}',
    'read_time': f'{max(1, math.ceil(words / 200))} min read',
    'tint': TINTS.get(category, TINTS['Getting started']),
    'body': blocks,
    'related_slugs': front.get('related_slugs') or [s for s in opts.get('related', '').split(',') if s],
    'cover_image': None,
    'published': True,
    'author': None,
    'author_slug': front['author'],
    'layout': None,
    # 00:00 Pakistan time on the publish date.
    'created_at': f'{published.isoformat()}T00:00:00+05:00',
    'updated_at': f'{published.isoformat()}T00:00:00+05:00',
}
if front.get('cover_image'):
    row['cover_image'] = front['cover_image']
else:
    notes.append('No cover image supplied: cover_image is NULL, which renders the same gradient placeholder '
                 '("Article cover image") as matjarx-complete-guide-small-business, the only other post without one. '
                 f'Intended alt text for when one is uploaded: "{front.get("cover_image_alt", "")}"')

seo = {}
if front.get('title') and front['title'] != front['h1']:
    seo['title'] = front['title']
if front.get('meta_description') and front['meta_description'] != row['excerpt']:
    seo['description'] = front['meta_description']
if seo.get('title') and 'description' not in seo:
    seo['description'] = front['meta_description']


def q(v):
    if v is None:
        return 'NULL'
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if isinstance(v, (dict, list)):
        return "'" + json.dumps(v, ensure_ascii=False).replace("'", "''") + "'::jsonb"
    return "'" + str(v).replace("'", "''") + "'"


cols = [c for c in row]
sql = [
    f"-- GENERATED by scripts/seo/md-to-blog-sql.py from {front['slug']}.md -- review before running.",
    f"-- Inserts the post \"{front['h1']}\" ({front['url']}).",
    '-- Safe to re-run: each INSERT is skipped when the slug already exists.',
    '-- Needs the blog renderer from branch claude/blog-rich-blocks deployed first',
    '-- (table blocks, **bold**, "nofollow" links, FAQPage schema, blog/<slug> __seo).',
    '',
    'BEGIN;',
    '',
    f"INSERT INTO marketing_blog_posts ({', '.join(cols)})",
    f"SELECT {', '.join(q(row[c]) for c in cols)}",
    f"WHERE NOT EXISTS (SELECT 1 FROM marketing_blog_posts WHERE slug = {q(row['slug'])});",
]
if seo:
    sql += [
        '',
        '-- The search title differs from the H1, so it goes in the same __seo',
        '-- override every page uses; the post page reads blog/<slug>.',
        'INSERT INTO marketing_content (slug, data, published)',
        f"SELECT {q('blog/' + row['slug'])}, {q({'__seo': seo})}, true",
        f"WHERE NOT EXISTS (SELECT 1 FROM marketing_content WHERE slug = {q('blog/' + row['slug'])});",
    ]
sql += ['', 'COMMIT;', '']
open(OUT, 'w', encoding='utf-8').write('\n'.join(sql))
if ROW_JSON:
    json.dump({'post': row, 'seo': seo}, open(ROW_JSON, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

from collections import Counter
print('blocks:', dict(Counter(b['t'] for b in blocks)), '| words:', words, '|', row['read_time'])
print('nofollow links:', sum(t.count('"nofollow")') for b in blocks for t in [b.get('text', '')] + b.get('items', []) + [c for r in b.get('rows', []) for c in r] + b.get('head', [])))
print('notes:')
for n in notes:
    print(' -', n)
