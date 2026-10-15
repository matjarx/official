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

check() { # url expected_code expected_hops expected_final(optional)
  out=$(curl -s -o /dev/null -L --max-time 30 -w "%{http_code} %{num_redirects} %{url_effective}" "$1")
  read -r code hops final <<<"$out"
  status=OK
  { [ "$code" = "$2" ] && [ "$hops" = "$3" ] && { [ -z "$4" ] || [ "$final" = "$4" ]; }; } || { status=FAIL; fail=1; }
  printf '%-4s %-60s %s\n' "$status" "${1#$BASE}" "$out"
}

# Infrastructure URLs: served as-is, never redirected.
echo "-- infrastructure (200, 0 redirects)"
first_child=$(curl -s --max-time 30 "$BASE/sitemap.xml" | grep -o '<loc>[^<]*' | sed 's/<loc>//' | head -1)
asset=$(curl -s --max-time 30 "$BASE/" | grep -o '/_next/static/[^"]*\.\(js\|css\)' | head -1)
[ -n "$first_child" ] || { echo "FAIL could not read a child sitemap from /sitemap.xml"; fail=1; }
[ -n "$asset" ] || { echo "FAIL could not find a /_next/static asset on /"; fail=1; }
for u in / /sitemap.xml "${first_child#https://matjarx.com}" /robots.txt "$asset"; do
  [ -n "$u" ] && check "$BASE$u" 200 0
done

# 20 random sitemap URLs requested WITH a trailing slash: exactly one
# redirect, to the slash-less URL, ending on a 200.
echo "-- 20 random sitemap URLs + trailing slash (200, 1 redirect, slash removed)"
children=$(curl -s --max-time 30 "$BASE/sitemap.xml" | grep -o '<loc>[^<]*' | sed 's/<loc>//')
all=$(for c in $children; do curl -s --max-time 30 "$BASE${c#https://matjarx.com}" | grep -o '<loc>[^<]*' | sed 's/<loc>//'; done)
sample=$(printf '%s\n' "$all" | grep -v '^https://matjarx.com/*$' | shuf -n 20)
[ "$(printf '%s\n' "$sample" | grep -c .)" = 20 ] || { echo "FAIL fewer than 20 sitemap URLs found"; fail=1; }
for loc in $sample; do
  path="${loc#https://matjarx.com}"
  check "$BASE$path/" 200 1 "$BASE$path"
done
exit $fail
