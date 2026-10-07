# Arabic and Urdu on matjarx.com

## Where this stands

The URLs route. `/ar/pricing` and `/ur/pricing` resolve, `/fr/pricing` 404s,
English keeps every URL it has and is untouched. Nothing is translated yet, so
those URLs **serve English** and carry `X-Robots-Tag: noindex, follow`.

Everything downstream of translation is built and inert: it switches on by
itself when `translatedLocales()` starts returning more than `['en']`.

| Piece | State |
| --- | --- |
| `/ar`, `/ur` routing (rewrite, no redirects) | live |
| `noindex` on untranslated locales | live, as a response header |
| hreflang in the per-locale sitemaps | built, emits nothing until translated |
| Per-locale sitemap children (`/sitemap/ar-pages.xml`) | built, empty and omitted from the index until translated |
| Language switcher in the footer | built, renders nothing while there is one language |
| RTL (`dir="rtl"`) | **not live** — see below |
| The ~495,000 words of Arabic and Urdu | not commissioned |

## The one switch

`translatedLocales(path)` in `src/lib/locale.ts` returns `['en']`. It is the
only thing that needs to change. When it reports `ar` for a path:

- that path appears in `/sitemap/ar-pages.xml`
- every sitemap entry for it gains reciprocal `xhtml:link` hreflang
- the footer switcher appears, linking to the equivalent URL per language
- the `noindex` header stops being sent for that path

Indexing and hreflang are driven by the same function on purpose. Keying the
`noindex` on "not English" instead, which is what it originally did, would have
left a translated Arabic page advertised by hreflang and blocked by robots at
the same time — two contradictory signals where the quieter one wins, so the
page is never indexed and nothing looks broken.

## Why `dir="rtl"` is not live, and what it costs to make it live

`<html lang>` and `dir` are rendered by the **root layout**. Reading the
request's locale there means calling `headers()`, and a `headers()` call in the
root layout opts **every route in the app** into dynamic rendering.

Measured, not assumed:

| | prerendered | rendered on demand |
| --- | --- | --- |
| before the locale work | 154 | 5 |
| with `headers()` in the root layout | 6 | 159 |
| now | 154 | 5 |

Every English page would have stopped serving prerendered HTML and started
re-rendering React and re-querying Supabase per request — undoing the
round-trip work that took TTFB from 2,045ms to 1,681ms, and paying it on 100%
of today's traffic to benefit pages that have no content in them yet.

So the root layout declares `lang="en" dir="ltr"` as constants. That is not a
compromise today: `/ar/pricing` genuinely serves English, and `lang="en"` is
the accurate description of what is on the page.

**To make it per-locale without going dynamic**, every route has to live under
`app/[locale]/` so the locale is a root parameter (`next/root-params`) and all
three languages prerender. That means:

1. Moving ~105 route directories under `app/[locale]/`. Route handlers
   (`/api/*`, `sitemap.xml`, `robots.txt`) stay outside it — `next/root-params`
   does not work in route handlers in Next 16.3.
2. `src/proxy.ts` rewriting bare `/pricing` to `/en/pricing` internally, so
   English URLs do not change.
3. `generateStaticParams` on the new root layout returning `en`, `ar`, `ur` —
   roughly 460 prerendered pages instead of 154, so a longer build.
4. **The real work:** every internal `<Link href="/pricing">` in the codebase
   needs locale-prefixing, or an Arabic visitor silently drops to English on
   the first click. This is the part that is not a mechanical move.

Worth doing when there is translated content to put behind it. Not before.

## Still open

- A supplier for ~495,000 words of human translation. Nothing here is blocked
  on code; it is blocked on that.
- The `app/[locale]/` refactor above, once there is content.
- Whether client storefronts get this at all. They do not today, by decision —
  not every client needs it.
