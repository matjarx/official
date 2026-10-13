#!/usr/bin/env bash
# Group 1 acceptance check: every URL must end on a 200 after exactly ONE
# redirect. Usage: scripts/seo/check-redirects.sh [base-url]  (default https://matjarx.com)
BASE="${1:-https://matjarx.com}"
URLS=(
  /web-development-karachi
  /web-development-karachi/
  /faq-items
  /faq-items/how-long-does-it-take
  /faq-items/how-long-does-it-take/
  /blogs/you-can-too-lessons-from-rastah
  /blogs/you-can-too-lessons-from-rastah/
  /website-for-clinics
  /website-for-clinics/
  /blog/setup-sadapay-sadabiz-website/
  /blog/setup-sadapay-sadabiz-website
  /pricing-table/
  /pricing-table
  /resources-tools/setup-sadapay-sadabiz-website/
  /setup-sadapay-sadabiz-website/
  /website-audit/
  /pricing/
  /blogs/setup-sadapay-sadabiz-website/
)
fail=0
for u in "${URLS[@]}"; do
  out=$(curl -s -o /dev/null -L --max-time 30 -w "%{http_code} %{num_redirects} %{url_effective}" "$BASE$u")
  read -r code hops final <<<"$out"
  status=OK; { [ "$code" = 200 ] && [ "$hops" = 1 ]; } || { status=FAIL; fail=1; }
  printf '%-4s %-50s %s\n' "$status" "$u" "$out"
done
# Not to be added yet (content merge pending) -- must still be 200 with 0 hops.
for u in /blogs/how-generative-engine-optimization-works /blogs/beyond-blue-links-how-generative-engine-optimization-drives-traffic /blogs/facebook-page-for-business; do
  out=$(curl -s -o /dev/null -L --max-time 30 -w "%{http_code} %{num_redirects} %{url_effective}" "$BASE$u")
  read -r code hops final <<<"$out"
  status=OK; { [ "$code" = 200 ] && [ "$hops" = 0 ]; } || { status=FAIL; fail=1; }
  printf '%-4s %-50s %s (must not redirect yet)\n' "$status" "$u" "$out"
done
exit $fail
