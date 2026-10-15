"""SQL that removes undocumented client results from the database copies (15 Oct).

marketing_content holds full copies of /done-for-you-website,
/growth-marketing-service and /website-examples that override the code, so
the same removals as the code change are applied here:

  services/dfy      detail.caseStudies ("How Done-For-You Websites Drive Results")
  services/growth   detail.caseStudies, detail.slaviStory, the Slavi quote,
                    and two named result stats (Zulfay Hair's stays)
  website-examples  the result chip on five example cards (Zulfay Hair's stays)

  python3 -I scripts/seo/gen-case-studies-sql.py /seo-data/supabase-export/marketing_content.json /seo-data/migrations

Writes case-studies.sql and case-studies-rollback.sql. Unlike plan-copy.sql,
each change is a targeted JSON edit guarded by the exact value it removes,
so the file can run after plan-copy.sql (which rewrites the same rows), and a
second run changes nothing. Never connects to a database.
"""
import json
import os
import sys

SRC, OUT = sys.argv[1], sys.argv[2]
rows = {r['slug']: r['data'] for r in json.load(open(SRC, encoding='utf-8'))}

DFY_CASES = 'How Done-For-You Websites Drive Results'
GROWTH_CASES = 'Real Results: Growth Members Achieving Massive Success'
SLAVI = 'Slavi’s Story: 2500% ROI in 6 Months'
# All three are checked against the export; only the last two are removed.
# Zulfay Hair's 1,520 messages is a real, documented result (kept 15 Oct).
EXPORTED_STATS = ['messages for Zulfay Hair', 'orders in the first quarter', 'return for Perun Roofing']
STAT_LABELS = ['orders in the first quarter', 'return for Perun Roofing']
EXAMPLE_RESULTS = {  # card name -> result chip removed
    'Bin Adam Textile': '#1 on Google',
    'Eebeel Home': '2,000+ leads',
    'Askari Estates': '3× more enquiries',
    'IronCore Fitness': '200+ sign-ups online',
    'Speedway Auto Care': 'Bookings up 2.5×',
}


def lit(v):
    return "'" + json.dumps(v, ensure_ascii=False).replace("'", "''") + "'::jsonb"


def s(v):
    return "'" + str(v).replace("'", "''") + "'"


dfy, growth, examples = rows['services/dfy'], rows['services/growth'], rows['website-examples']
assert dfy['detail']['caseStudies']['title'] == DFY_CASES
assert growth['detail']['caseStudies']['title'] == GROWTH_CASES
assert growth['detail']['slaviStory']['title'] == SLAVI
assert growth['quoteName'] == 'Slavi'
assert [x['label'] for x in growth['resultStats']] == EXPORTED_STATS
found = {e['name']: e.get('result') for e in examples['examples'] if e['name'] in EXAMPLE_RESULTS}
assert found == EXAMPLE_RESULTS, found

names = 'ARRAY[' + ', '.join(s(n) for n in EXAMPLE_RESULTS) + ']'
results = 'ARRAY[' + ', '.join(s(r) for r in EXAMPLE_RESULTS.values()) + ']'
labels = 'ARRAY[' + ', '.join(s(x) for x in STAT_LABELS) + ']'

forward = f"""-- services/dfy: named case studies
UPDATE marketing_content SET data = data #- '{{detail,caseStudies}}', updated_at = now()
 WHERE slug = 'services/dfy' AND data->'detail'->'caseStudies'->>'title' = {s(DFY_CASES)};

-- services/growth: named case studies, Slavi's story, the Slavi quote, named result stats
UPDATE marketing_content SET data = data #- '{{detail,caseStudies}}', updated_at = now()
 WHERE slug = 'services/growth' AND data->'detail'->'caseStudies'->>'title' = {s(GROWTH_CASES)};
UPDATE marketing_content SET data = data #- '{{detail,slaviStory}}', updated_at = now()
 WHERE slug = 'services/growth' AND data->'detail'->'slaviStory'->>'title' = {s(SLAVI)};
UPDATE marketing_content SET data = data - 'quote' - 'quoteName' - 'quoteCompany', updated_at = now()
 WHERE slug = 'services/growth' AND data->>'quoteName' = 'Slavi';
UPDATE marketing_content
   SET data = jsonb_set(data, '{{resultStats}}', COALESCE((
         SELECT jsonb_agg(x ORDER BY i) FROM jsonb_array_elements(data->'resultStats') WITH ORDINALITY t(x, i)
          WHERE NOT (x->>'label' = ANY({labels}))), '[]'::jsonb)),
       updated_at = now()
 WHERE slug = 'services/growth'
   AND EXISTS (SELECT 1 FROM jsonb_array_elements(data->'resultStats') x WHERE x->>'label' = ANY({labels}));

-- website-examples: result chips that state an outcome of our work
UPDATE marketing_content
   SET data = jsonb_set(data, '{{examples}}', (
         SELECT jsonb_agg(CASE WHEN e->>'name' = ANY({names}) AND e->>'result' = ANY({results}) THEN e - 'result' ELSE e END ORDER BY i)
           FROM jsonb_array_elements(data->'examples') WITH ORDINALITY t(e, i))),
       updated_at = now()
 WHERE slug = 'website-examples'
   AND EXISTS (SELECT 1 FROM jsonb_array_elements(data->'examples') e
                WHERE e->>'name' = ANY({names}) AND e->>'result' = ANY({results}));
"""

restore_results = ' '.join(
    f"WHEN e->>'name' = {s(n)} AND NOT e ? 'result' THEN e || jsonb_build_object('result', {s(r)})"
    for n, r in EXAMPLE_RESULTS.items())
rollback = f"""UPDATE marketing_content SET data = jsonb_set(data, '{{detail,caseStudies}}', {lit(dfy['detail']['caseStudies'])})
 WHERE slug = 'services/dfy' AND NOT (data->'detail' ? 'caseStudies');
UPDATE marketing_content SET data = jsonb_set(data, '{{detail,caseStudies}}', {lit(growth['detail']['caseStudies'])})
 WHERE slug = 'services/growth' AND NOT (data->'detail' ? 'caseStudies');
UPDATE marketing_content SET data = jsonb_set(data, '{{detail,slaviStory}}', {lit(growth['detail']['slaviStory'])})
 WHERE slug = 'services/growth' AND NOT (data->'detail' ? 'slaviStory');
UPDATE marketing_content SET data = data || jsonb_build_object('quote', {s(growth['quote'])}, 'quoteName', {s(growth['quoteName'])}, 'quoteCompany', {s(growth['quoteCompany'])})
 WHERE slug = 'services/growth' AND NOT (data ? 'quote');
UPDATE marketing_content SET data = jsonb_set(data, '{{resultStats}}', {lit(growth['resultStats'])})
 WHERE slug = 'services/growth' AND jsonb_array_length(data->'resultStats') < 3;
UPDATE marketing_content
   SET data = jsonb_set(data, '{{examples}}', (
         SELECT jsonb_agg(CASE {restore_results} ELSE e END ORDER BY i)
           FROM jsonb_array_elements(data->'examples') WITH ORDINALITY t(e, i)))
 WHERE slug = 'website-examples';
"""

os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, 'case-studies.sql'), 'w', encoding='utf-8').write(
    '-- GENERATED by scripts/seo/gen-case-studies-sql.py -- review before running.\n'
    '-- Removes undocumented client results from the database copies of\n'
    '-- /done-for-you-website, /growth-marketing-service and /website-examples,\n'
    '-- matching the code change. Run after plan-copy.sql. Safe to re-run: every\n'
    '-- change is guarded by the exact value it removes.\n\nBEGIN;\n\n' + forward + '\nCOMMIT;\n')
open(os.path.join(OUT, 'case-studies-rollback.sql'), 'w', encoding='utf-8').write(
    '-- Puts back what case-studies.sql removed (values from the export).\n\nBEGIN;\n\n' + rollback + '\nCOMMIT;\n')
print('wrote case-studies.sql and case-studies-rollback.sql')
