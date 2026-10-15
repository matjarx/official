"""Export the tabs of the SEO spec workbook to CSV so the changes are reviewable.

Usage: python3 -I scripts/seo/export-sheet.py /seo-data/MatjarX_Structure_and_Keywords_v5.xlsx /seo-data
"""
import csv
import re
import sys

import openpyxl

TABS = [
    'B. Redirects & technical',
    'Metadata (all pages)',
    'Internal links',
    'Pillars & clusters',
    'Pillars (revised)',
    'CRO & visual changes',
    'A. Current page changes',
    'C. New pages & content',
]

src, out = sys.argv[1], sys.argv[2]
wb = openpyxl.load_workbook(src, read_only=True, data_only=True)
for name in TABS:
    rows = [r for r in wb[name].iter_rows(values_only=True) if any(c is not None for c in r)]
    fname = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-') + '.csv'
    with open(f'{out}/{fname}', 'w', newline='', encoding='utf-8') as f:
        csv.writer(f).writerows(['' if c is None else c for c in r] for r in rows)
    print(f'{fname}: {len(rows) - 1} rows')
