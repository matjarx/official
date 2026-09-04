# Handoff: MatjarX Marketing Site

## Overview
The public marketing site for **MatjarX**, a Pakistan-based SaaS that builds done-for-you websites for small businesses on four plans (Launch, Boost, Growth, Platinum). Twenty-six page designs, plus three shared components.

The site is deliberately the **inverse of the product**: a light cream marketing site (`#FCFAF3`) that hands off to a dark navy dashboard. Glassmorphism carries across both so they read as one brand.

## About the Design Files
These are **design references created in HTML** — prototypes showing intended look and behaviour. They are **not production code to copy**.

Recreate them in the target codebase (MatjarX runs Node.js + TypeScript) using its existing framework, routing and component library. Match the visuals precisely; do not port the HTML verbatim.

On the prototype format: each `.dc.html` has a markup template plus a logic class. `<sc-for list="{{ items }}" as="item">` is a map, `<sc-if value="{{ flag }}">` a conditional, `{{ x }}` holes are values returned from `renderVals()`, and `<dc-import name="Site Header">` mounts a sibling component. Treat these as ordinary render logic, state and component composition.

## Fidelity
**High-fidelity.** Final colours, type, spacing, radii, shadows, hover states and copy.

**The copy is signed off — do not rewrite it.** The client explicitly instructed that page copy stay as authored; layout and section structure may change, copy may not. Sample business data (client names, product names, prices, blog titles) is placeholder and should be replaced with real content.

---

## Design Tokens

### Palette
| Token | Hex | Use |
|---|---|---|
| Cream page | `#FCFAF3` | site background |
| Cream deep | `#F2EEE2` | alternate section bands, inset tracks |
| Ink 1 | `#04121F` | headings |
| Ink 2 | `#0B2135` | body base |
| Ink 3 | `#24384A` / `#33485B` | long-form prose |
| Ink 4 | `#435A70` / `#3B5063` | secondary body |
| Ink 5 | `#4B5D6E` | card body |
| Ink muted | `#6A7F92` | meta, labels |
| Ink faint | `#90A2B1` | timestamps, placeholders |
| Deep navy | `#003366` | primary CTA, icon tiles, dark bands |
| Navy gradient | `linear-gradient(160deg, #0A4278, #002E5C)` | header CTA, avatar |
| Navy deepest | `#04121F` | footer, quote panels |
| Mid blue | `#2E6EA8` | secondary gradients |
| Butter | `#F4F2AE` | accent, badges, dark-panel CTA |
| Butter deep | `#E7E49B` | primary button base |
| Butter light | `#F7F5C0` | primary button highlight |
| Olive / moss | `#707538` | links hover, positive, kickers |
| Moss light | `#C6CB8A` | marker highlight, dark-panel kickers |
| Olive slider active | `#8A8F4A` | active category chip |
| Ink on butter | `#16210B` / `#3D3A08` | text on butter |
| Terracotta | `#B4874F` / `#E5A97F` | negative cells, warnings |
| Trustpilot green | `#00B67A` | rating stars |
| WhatsApp green | `#25D366` | WhatsApp glyph |
| Google blue | `#4285F4` | Google Reviews badge |
| Clutch red | `#E63A35` | Clutch badge |

### The glass recipe (critical)
Light glass — every card:
```css
background: rgba(255,255,255,0.62);
border: 1px solid rgba(255,255,255,0.85);
backdrop-filter: blur(22px);
box-shadow: 0 16px 40px rgba(4,18,31,0.07),
            inset 0 1px 0 rgba(255,255,255,0.9);
```
Variants: chips/buttons `0.66` fill + `blur(20px)`; cream-tinted panels `rgba(242,238,226,0.6)` + `rgba(255,255,255,0.7)` border; header `rgba(252,250,243,0.72)` + `blur(26px)`; nav pill `rgba(255,255,255,0.5)` + `blur(24px)`.

Dark glass — navy panels (calculator, compare bands, quote panels):
```css
background: linear-gradient(160deg, rgba(0,51,102,0.96), rgba(0,28,51,0.96));
border: 1px solid rgba(255,255,255,0.16);
backdrop-filter: blur(26px);
box-shadow: 0 34px 76px rgba(4,18,31,0.34),
            inset 0 1px 0 rgba(255,255,255,0.2);
```
Inner cards on dark: `rgba(255,255,255,0.07)` fill, `rgba(255,255,255,0.14)` border, `blur(18px)`.

**The inset top highlight is what makes it read as glass** — never drop it.

### Ambient orbs
Three fixed radial gradients sit behind every page in an `inset: 0; overflow: hidden; pointer-events: none; z-index: 0` layer, with all page content in a `position: relative; z-index: 1` wrapper:
```
860×860 at left:-250px top:-300px   radial-gradient(circle, rgba(198,203,138,0.40), transparent 68%)
720×720 at right:-190px top:340px   radial-gradient(circle, rgba(120,170,215,0.32), transparent 68%)
780×780 at left:20%  top:1400px     radial-gradient(circle, rgba(244,242,174,0.36), transparent 70%)
```
Dark home uses `rgba(112,117,56,0.55)`, `rgba(41,110,177,0.48)`, `rgba(198,203,138,0.30)`.

### The marker highlight — the brand signature
Taken from the client's live site and carried through every page's H1 and most H2s:
```html
<span style="background: #C6CB8A; color: #16210B; padding: 0 10px; border-radius: 4px;
             box-decoration-break: clone; -webkit-box-decoration-break: clone;">phrase</span>
```
`#F4F2AE` butter is the lighter alternate. `box-decoration-break: clone` is required — without it a wrapped highlight loses its padding on the second line.

### Typography
- **Lato** 400/700/900 — headings, buttons, numbers, brand
- **Open Sans** 400/500/600 — body, labels, table cells

| Role | Size |
|---|---|
| H1 | `clamp(30px, 5.2vw, 56px)` / 900 Lato / `-1.9px` to `-2px` / lh 1.06 |
| H2 section | `clamp(25px, 4vw, 38px)` / 900 Lato / `-1.2px` / lh 1.14 |
| H2 panel | `clamp(24px, 3.6vw, 34px)` / 900 Lato / `-1.1px` |
| H3 card | 18–19px / 700 Lato / `-0.35px` |
| Kicker | 12px / 600 / `2.2px` tracking / uppercase |
| Lead paragraph | `clamp(14.5px, 1.7vw, 17.5px)` / lh 1.6–1.62 |
| Card body | 14px / lh 1.6 |
| Meta | 12–13px |
| Button | 13.5–15px / 700 Lato; uppercase CTAs add `0.8px` tracking |
| Table header | 13.5–14.5px / 900 Lato |
| Nav link | 13.5–14px / 500 (700 when active) |

All headlines use `text-wrap: balance`; body copy uses `text-wrap: pretty`.

### Geometry
- Radii: 30px hero panels · 26px form/comparison cards · 22px standard card · 20px preview card · 18px accordion · 16px chip/input · 999px pills
- Section rhythm: `padding: 76px 24px 0` between sections; `max-width` 1240px wide / 1080px medium / 1000px narrow / 860px prose
- Grids: always `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` — never fixed column counts
- Tables: `overflow-x: auto` on the card + a `min-width` floor on the grid (620–860px)
- Transitions: `160ms ease` chip fill · `180ms ease` nav/tab · `200ms ease` accordion chevron + overlay fade

### Buttons
**Primary** (butter):
```css
padding: 16px 30px; border-radius: 999px;
font: 700 14px Lato; letter-spacing: 0.8px; text-transform: uppercase;
color: #16210B; background: linear-gradient(160deg, #F7F5C0, #E7E49B);
box-shadow: 0 14px 30px rgba(244,242,174,0.4), inset 0 1px 0 rgba(255,255,255,0.7);
/* hover: background #FFFDD8 */
```
**Secondary** (glass): `rgba(255,255,255,0.66)` fill, `1.5px solid rgba(255,255,255,0.9)`, `blur(20px)`, `color: #04121F`; hover border `#707538`.
**Navy** (header CTA): `linear-gradient(160deg, #0A4278, #002E5C)`, `box-shadow: 0 10px 24px rgba(0,51,102,0.26), inset 0 1px 0 rgba(255,255,255,0.22)`.
**On dark panels**: butter flat `#F4F2AE`, or ghost `rgba(255,255,255,0.09)` + `1.5px solid rgba(255,255,255,0.2)`.

### Inputs
`padding: 14px 15px; border-radius: 12px; font-size: 14.5px; background: #FCFAF3; border: 1.5px solid rgba(4,18,31,0.13); outline: none`. Textareas add `line-height: 1.65; resize: vertical`.

---

## Shared components

### Site Header (`Site Header.dc.html`)
Three stacked pieces:

1. **Announcement bar** — a six-stop multicolour gradient, the client's specific request:
   `linear-gradient(90deg, #003366 0%, #2E6EA8 20%, #707538 42%, #C9A227 60%, #C4262E 80%, #7A2E6B 100%)`
   Contains two messages: **"Get 49% discount on sign up now"** in a `rgba(0,0,0,0.26)` glass pill with a butter dot, then a divider, then **"Go digital with 100,000 business in 2026"**. Copy is exact — do not edit.

2. **Header row** — logo left (`matjarx-logo-black.png`, 132px), a **centred floating glass nav pill**, then the navy "Get started" CTA. The pill is the client's reference layout: `rgba(255,255,255,0.5)` fill, `blur(24px)`, `999px` radius, `5px 5px 5px 9px` padding, containing the nav links as `999px` pill buttons (hover fills `rgba(255,255,255,0.75)`) and closing with a **40px circular account avatar** in navy with a butter person glyph.

3. **Dropdown menus** — `rgba(255,255,255,0.86)` + `blur(28px)` panels, `18px` radius, positioned `top: calc(100% + 16px)`. Each item is a two-line block: label 13.5px/600 + optional note 11.5px muted.

Nav structure (menus in brackets):
- **Home**
- **Services** → Done-for-you website · Local/national/global SEO · Concierge service · Growth marketing · Free website audit · Websites for restaurants / boutiques / clinics · Website design Karachi / Lahore / Islamabad
- **Website examples**
- **Pricing** → All plans & pricing · Features · Launch / Boost / Growth / Platinum plan
- **Resources** → Blog · Help centre · Best website builder in Pakistan · MatjarX vs Wix / Squarespace / GoDaddy · FAQs · Partner program
- **Company** → About us · Careers · Become a partner · Get in touch

Below ~900px the pill collapses to a burger + glass drawer (`rgba(252,250,243,0.86)` + `blur(26px)`).

The `active` prop (`home | services | examples | pricing | resources | company`) sets the current item to `#707538` at weight 700.

### Site Header Dark (`Site Header Dark.dc.html`)
Same structure, dark tokens: `rgba(0,20,35,0.74)` bar, `matjarx-logo-light.png`, `rgba(255,255,255,0.07)` nav pill, `rgba(4,24,42,0.94)` dropdowns, active link `#F4F2AE`. Used only by the dark home page.

### Site Footer (`Site Footer.dc.html`)
Two parts:
1. **CTA band** — `linear-gradient(150deg, rgba(244,242,174,0.9), rgba(198,203,138,0.9))`, 30px radius, "Professional websites, ready in just 7 days." + "Completely risk-free, with unmatched customer support." + two buttons (Get started / Talk to us on WhatsApp).
2. **Footer** — `linear-gradient(168deg, #04121F, #001C33)`. Brand column (logo, blurb, phone `+92 303 372 0953`, email `office@matjarx.com`, six glass social circles) plus four link columns: Product · Services · Company · Compare. Bottom bar: `© 2012–2026 MatjarX` + Terms / Refund / Privacy.

### Editor Showcase (`Editor Showcase.dc.html`)
The centrepiece of the home and features pages — an **interactive mockup of the full MatjarX theme editor**, embedded via `<dc-import>`. It renders the whole editor shell, not just a site preview.

**Layout:** `grid-template-columns: 186px | 1fr | 216px` inside a dark navy shell, with a top bar above and a status bar below.

- **Top bar** — Exit pill · MatjarX mark · "Theme editor" › site name › page dropdown ("Home") · undo / redo (redo at `0.4` opacity) · centred device toggle (desktop active) · zoom stepper at 100% · moss "Saved just now" · Preview ghost · butter **Publish**.
- **Left panel — the section library.** Sections / Globals tabs, a "Search sections" field, then the library as **descriptive rows** grouped under *Structure* (Hero, Content block, Testimonials, FAQ), *Commerce* (Product grid, Menu, Booking form) and *Content & media* (Gallery, Blog grid). Each row is a 24px icon tile + name + plain-language hint + a 6-dot drag grip.
  **Do not render this as a grid of icon tiles** — that is the WordPress/Elementor look the client explicitly rejected. Rows with descriptions are the design.
- **Centre — the canvas.** Browser chrome (three dots, domain pill, "Desktop 1440"), then a butter-outlined **Hero** section carrying a corner name tab and a 5-button toolbar (up · down · duplicate · code in butter · delete in terracotta). Inside it: the client's own site nav (brand mark, four links, CTA) and a split hero (kicker, headline, blurb, two buttons, inline square image). Below the section, a four-tile thumbnail strip.
- **Right panel** — *Structure* tree at the top (**Site-wide · every page** → Header, Footer; **Home page · 5 sections** → Hero *selected*, Content block, Product grid, Testimonials), each row with a drag grip, glyph, indented 2px left rail, count badge and a butter code marker on Hero. Below it the **Hero inspector**: icon tile + "Hero" + "Section 1 of 5 · custom code", then *Layout* (text-alignment segmented control with Center active, padding stepper at 62px), *Background* (four gradient swatches, first selected with a `0 0 0 2px #F4F2AE` ring; a dashed background-image slot showing the live filename), and a *Show kicker* toggle in moss.
- **Status bar** — "Hero selected" · "Version 2.4 draft".

**Three interactive controls sit over the canvas.** The client rejected external buttons for these — they must read as parts of the editor:
1. **Shop products / Reserve your spot** card at `left: 4%; top: 46%` — deliberately straddling the sidebar/canvas boundary so it never covers the hero's own CTA. Product mode shows a dark card with thumbnail, name, butter price and "Add to Cart"; service mode a white card with three select rows and "Book Now". Clicking it switches business type.
2. **Sell Products / Book Now! tile** at `left: 24%; bottom: 6.5%` — a `#1C1C1C` square with a cyan `#37B6F0` border, a 34px white **stroked** line glyph and an uppercase label, sitting over the thumbnail strip. It always offers the mode you are *not* in, and also switches business type.
3. **Media Library** card at `right: 8%; bottom: 16%` — a `#37B6F0`-bordered panel with a header row, a 3×2 thumbnail grid (active thumb ringed in `#37B6F0`, others at `0.6` opacity) and a cream **Change Image** button. Cycles three banner images.

**Positioning is load-bearing.** Earlier iterations put these panels over the hero copy and over the sidebar's third library group; both were rejected as defects. Keep them in the sidebar gutter and over the thumbnail strip. Keep every icon a stroked line glyph (`fill: none; stroke-width: 1.7`) — filled compound paths flooded solid because their inner contours wound the same direction as the outer.

The two modes flip the entire theme, not just labels:

| | Product | Service |
|---|---|---|
| Business | Elegance Embroidery | Sweet Crumbs Bakery |
| Domain | eleganceembroidery.pk | sweetcrumbs.pk |
| Base | dark `#180208` | cream `#FFFCF5` |
| Nav + hero CTA | **Order Now** | **Book Now** |
| Scrim | left-weighted dark | left-weighted cream |
| Layer-tree row 3 | Product grid | Booking form |
| Thumbnail strip | Elegance photography | Sweet Crumbs photography |

State: `mode` (product|service), `img` (0–2). A `statusInk` prop lets the host tint the caption for light or dark backgrounds.

### Editor Showcase Mobile (`Editor Showcase Mobile.dc.html`)
The 390px counterpart, used by the mobile home page. **A different structure, not a scaled desktop.**

- `width: 100%` shell so it fills the phone width; canvas gutter reduced to 6px.
- **No side panels** — the section library and inspector are replaced by the mobile theme editor's **Add / Layers / Edit** bottom tab row (Edit active, butter fill + border).
- Compact header: Exit · "Theme editor" + site name + page pill · Preview eye · **Publish**; a thin "Saved just now / v2.4 draft" meta row below.
- Canvas hero is **centred single-column** with a burger in the site nav; the thumbnail strip drops to three tiles.
- **Nothing is absolutely positioned over the canvas.** At 390px the hero copy spans nearly the full canvas width, so overlays unavoidably bury it — an earlier attempt was rejected for exactly this. Instead, two **compact boxes sit in normal flow below the canvas**, side by side in a `1fr 1fr` grid, both in the `#1C1C1C` + cyan-border style at a 76px minimum height:
  - **Sell Products / Book Now!** — 22px stroked glyph + uppercase label; switches business type.
  - **Change Image** — a 3×2 thumbnail grid above the label, active thumb ringed; cycles the banner image.
- The Add-to-Cart and Reserve-your-spot cards are **removed entirely** on mobile, at the client's instruction.

---

## Pages

### Home (`Marketing - Home.dc.html`)
Centred hero per the client's reference: "Having trouble launching the right website for your business?" → H1 **"We'll build complete [small business websites] in 7 days for Rs. 22,500"** → "Support your business growth with affordable agency services." → **Let's begin** + **See the quality of our websites** → "RATED 4.8 EXCELLENT" with five `#00B67A` square stars + Trustpilot lockup → "Become part of a thriving network of over 70,000 business owners." → three rating badges (**Trustpilot 4.8/5**, **Google Reviews 4.8/5**, **Clutch 4.9/5**) as glass cards.

Then, in order:
1. **Editor showcase** on a navy/olive gradient plinth, with a normal-flow **30-day money-back guarantee** pill above it (right-aligned).
2. **Category marquee** — 16 trades scrolling on a 38s loop.
3. **Did you know** — "[4 out of 5] small business owners either have no website, or don't like the one they have." Three voice cards with **offset olive shadow blocks** (`inset 8px -8px -8px 8px` behind each), avatar + name + trade + quote. Ends on a large olive **"Why?"**.
4. **Three options** — DIY builders (Rs. 140,000/yr) · Web agencies (Rs. 420,000–840,000) · MatjarX (navy card, Rs. 22,500 + Rs. 4,500/mo).
5. **Mascot section** — the client's mascot video full-bleed left, "50 milliseconds. That's how much time you have to make a first impression." on the right, butter CTA "Not on my watch — I want results".
6. **How it works** — three numbered steps.
7. **Website examples** — three cards on a cream band.
8. **Savings calculator** — see below.
9. **Pricing** — four plan cards.
10. **Trust band** — 4.8/5 Trustpilot, three stats, two reviews.
11. **FAQs** — six, accordion.

Tweakable props: the "4 out of 5" figure, its headline, the "Why?" label, and all three voices' name/trade/quote.

### The savings calculator (Home + Pricing)
The client specified this exactly. Navy glass panel, two columns:
- Left: hour selector (10 / 15 / 25 / 40 / **60**, default **15**) and rate selector (2.5k / **5k** / 7.5k / 10k, default **Rs. 5,000**), both as butter-fill pill rows.
- Right: "Doing it yourself" `15 hours × Rs. 5,000` = **Rs. 75,000** · "MatjarX, live in 7 days" = **Rs. 22,500** · then **You save Rs. 52,500** at `clamp(34px, 5vw, 46px)` in butter, and a **Sign up now** button.

All values recompute live. Both selectors must drive both rows and the saving.

### Home Dark (`Marketing - Home Dark.dc.html`)
Same structure and copy on `linear-gradient(172deg, #001C33, #00263F, #001526)`. Every card becomes dark glass, every ink token inverts, navy CTAs become butter. Uses **Site Header Dark**. Treat as a theme layer over one page component, not a second page.

### Home Mobile (`Marketing - Home Mobile.dc.html`)
390×844. Not a squeezed desktop: single column, horizontally scrolling badge strip, stacked plan cards, condensed calculator, and a **sun/moon skin toggle in the header** so both skins are reviewable in one file. Nav collapses to a burger drawer. Embeds **Editor Showcase Mobile**, not the desktop showcase.

**Header logo:** both marks are rendered absolutely stacked and cross-faded by `opacity` from the skin state. Do **not** drive the `src` from a template hole — the browser fetches the literal hole string before values resolve and fires a 404 on every load.

### Pricing (`Marketing - Pricing.dc.html`)
Navy hero → **working billing toggle** (Monthly / Yearly / Two-year — recalculates all four prices and shows each plan's real annual saving; the client's live site shows a toggle that does nothing) → four plan cards ascending with **Boost as the dark "Most popular" card** → the savings calculator → a five-group comparison accordion (Done-for-you website · Pro website features · Local SEO · Concierge service · Growth marketing), each opening a real 4-column tick table → three testimonials → Trustpilot badge → FAQs.

Plans: **Launch** Rs. 4,500/mo + Rs. 22,500 · **Boost** Rs. 15,600 + Rs. 22,500 · **Growth** Rs. 27,000 + Rs. 22,500 · **Platinum** Rs. 55,000 + Rs. 140,000.

### Plan pages (4 files)
`Marketing - Plan Launch` · `Marketing - Plan` (Boost) · `Marketing - Plan Growth` · `Marketing - Plan Platinum` → `/plans/launch/` etc.

One template, four hard-set variants. Each: breadcrumb · tag pill · H1 `"{Plan} Plan — [headline]"` (Boost's is **"More Pages, More SEO, More Growth"**, the client's own line) · monthly + setup price pair · two CTAs · three hero ticks · a full feature card with "Everything in {lower tier}, plus:" · three "who it's for" cards · a navy band comparing against the adjacent tier with four delta rows · four FAQs · cards linking the other three plans.

**Implementation note:** in the prototype these are four files because a prop default only seeds the editor, not the runtime. In production this is one route with a plan parameter.

### Features (`Marketing - Features.dc.html`)
Five tabs — Website · Store & bookings · SEO & growth · Hosting & admin · Audits & reports — six cards each, every card badged with the tier that unlocks it (All plans / Boost + / Growth + / Platinum). The editor showcase is embedded mid-page on a navy panel. Then an "included on every plan" strip of eight items, then FAQs.

### Website Examples (`Marketing - Website Examples.dc.html`)
Rebuilt to the client's screenshot.

- H1 **"[70,000+ Websites] Built Globally"** + "New or established, local or e-commerce, we serve businesses of all kinds. Serving over 100s of business categories."
- **Category slider** — 23 butter chips in a **two-row** grid (`grid-auto-flow: column; grid-template-rows: 1fr 1fr; grid-auto-columns: 158px`) inside an `overflow-x: auto` rail with hidden scrollbars, flanked by 38×66px glass `<` `>` buttons. Active chip is olive `#8A8F4A` with white text.
  **Critical:** the arrows must assign `scrollLeft` **synchronously**, clamped to `scrollWidth - clientWidth`. Three earlier attempts using CSS `scroll-behavior: smooth`, `scrollBy({behavior:'smooth'})` and a `requestAnimationFrame` tween all produced zero movement in the review environment. If you want animation in production, drive it from `setInterval` steps, never rAF.
- **Example cards** — each renders a *miniature site hero* (brand mark, three nav links, coloured CTA, headline, blurb) in that business's palette, with a glass info footer below (name, category · domain, butter result badge).
- **Hover overlay** — scoped to the **preview block only** so the info footer stays readable. Contains **See Full Example** (underlined text button) and **Get A Site Like This** (olive pill). Reveals on `:hover` and `:focus-within`, and is **permanently visible under `@media (hover: none)`** so touch users get an affordance.
- **iframe modal** — full-screen `rgba(2,10,18,0.86)` + `blur(8px)` overlay with a header (site name, domain, "Get A Website Like This", ✕) and the live site in an iframe. Behind the iframe sits a **fallback layer** in the site's gradient with its name and an "Open {domain} in a new tab" button, for sites sending `X-Frame-Options: DENY`.

Nine examples: Celestial Delicacies · Bin Adam Textile · Sacred Wellness · Elegance Embroidery · Zulfay Hair · CapActix Offshore · Eebeel Home · Sweet Crumbs Bakery · Mr. Handyman Repairs.

### Services (`Marketing - Services.dc.html`)
Four services behind tabs — Done-for-you website · Local/national/global SEO · Concierge service · Growth marketing. Navy hero with the editor image bleeding into the next section, then per-service: alternating image/text blocks (`order` swaps on odd rows), a six-card grid, and a navy testimonial panel with three result stats.

### Website Audit (`Marketing - Website Audit.dc.html`)
Lead-generation page for the client's audit service. Domain + WhatsApp capture, a **WhatsApp / Email delivery toggle**, then the nine checks they specified: heading structure · meta data · image optimisation · sitemap & robots.txt · llms.txt · indexed pages via `site:` search · backlink profile · domain authority · speed & mobile. Then a navy panel containing a **mock WhatsApp thread** delivering the PDF (score 54/100, six-row score breakdown with coloured bars), a four-step process, and six FAQs.

### Industry pages (3 files)
`Marketing - Website For Industry` (restaurants) · `Marketing - Website For Boutiques` · `Marketing - Website For Clinics` → `/website-for-restaurants/` etc.

Each: breadcrumb · built-count pill · H1 "Websites for [industry] — built in 7 days" · a live site mockup in that trade's palette on a gradient plinth · six trade-specific feature cards · a navy quote panel with three results · four FAQs · chips linking the other industries.

Restaurants covers bookings, menus, food photography, Maps, ordering, WhatsApp. Boutiques covers variants, COD, size guides, Instagram, wholesale tiers, reviews. Clinics covers appointments, doctor profiles, fees, local search, patient reviews, privacy.

### Location pages (3 files)
`Marketing - Website Design City` (Karachi) · `Marketing - Website Design Lahore` · `Marketing - Website Design Islamabad` → `/website-design-karachi/` etc.

Each: H1 "Website design in [city] — done for you in 7 days" · a navy "city at a glance" panel with four stats · six shared local-SEO feature cards (parameterised by city name) · an area-chip panel (14 real neighbourhoods per city) · a navy quote panel with three local wins · city-specific FAQs · chips to the other cities. Karachi names the Zamzama office and offers in-person meetings.

### Comparison pages (3 files)
`Marketing - vs GoDaddy` · `Marketing - vs Wix` · `Marketing - vs Squarespace` → `/alternatives/matjarx-vs-godaddy/` etc.

**Three separate pages with no toggle** — the client was explicit. Each: breadcrumb · H1 "MatjarX vs [rival]" · **the two-card comparison** (navy MatjarX card with six moss ticks and "Rs. 22,500 once", light rival card with five terracotta crosses and their price) · a 3-column side-by-side table of nine rows · a cream "When [rival] is the better choice" panel giving the rival an honest case · a navy testimonial · cards to the other two comparisons.

### Best Website Builder Pakistan (`Marketing - Best Website Builder Pakistan.dc.html`)
SEO landing page → `/best-website-builder-pakistan/`. H1 "The best website builder in Pakistan is the one [you don't have to use]" · four hero stats · a **five-column matrix** (MatjarX / Wix / Squarespace / GoDaddy / local agency) across nine rows with negative cells in terracotta · six differentiator cards · a navy "when a DIY builder genuinely is the right answer" panel · three comparison links · five FAQs.

### Help (`Marketing - Help.dc.html`)
Serves `/help/` and all seven sub-slugs. Search field · **eight topic cards** matching the client's slugs exactly (getting-started, billing-and-plans, website-editor, domains-and-email, ecommerce-and-payments, seo-and-marketing, account-and-security) with article counts · six most-read links · four contact channels (WhatsApp on navy, Call, Email, Gulf clients) · the full contact form with a five-chip subject selector · a navy contact-information panel · a butter "already a client?" panel.

Contact details are verbatim from the client:
- **Address:** 6c, Ln 4, Zamzama Boulevard, Clifton, Karachi.
- **Hours:** Monday – Friday, 11am to 8pm.
- **Gulf Clients:** Connect support to schedule.
- **Existing clients:** Message your concierge from the dashboard for a 30 minutes reply.

### Remaining pages
| File | Route | Notes |
|---|---|---|
| `Marketing - Blog.dc.html` | `/blogs/` | Featured post + newsletter panel, seven category chips, nine post cards, load more |
| `Marketing - Blog Post.dc.html` | `/blogs/{slug}/` | Navy hero with share buttons, cover, prose with pull-quotes and lists, sticky TOC + newsletter sidebar, author card, three related |
| `Marketing - About.dc.html` | `/about-us/` | Four-stat strip overlapping the hero, story column, four values, four team cards, careers/partner CTA |
| `Marketing - Contact.dc.html` | `/contact/` | Three channel cards, form with topic chips, navy office panel, WhatsApp panel |
| `Marketing - FAQs.dc.html` | `/faqs/` | 24 questions in five filterable groups, two-column accordion |
| `Marketing - Careers.dc.html` | `/careers/` | Four perks, five expandable roles with duties/requirements, speculative-application CTA |
| `Marketing - Partner.dc.html` | `/become-a-partner/` | Three tiers (Referral 10% / Partner 15% / White label 25%), four steps, **live commission calculator** (client count × plan → monthly and annual), application form |
| `Marketing - Legal.dc.html` | `/terms-and-conditions/` etc. | Sticky doc switcher, three documents (Terms, Refund, Privacy) with numbered sections |
| `Marketing - Thank You.dc.html` | `/thank-you/` | Moss tick, three next-steps cards, WhatsApp panel, three onward links |
| `Marketing - Compare.dc.html` | — | **Superseded** by the three separate vs-pages. Do not port. |

---

## Interactions & Behavior

### State by page
| Page | State |
|---|---|
| Home / Home Dark | `openFaq`, `hours` (default 15), `rate` (default 5000) |
| Home Mobile | + `skin` (dark default), `menu` |
| Pricing | `cycle` (monthly), `openGroup` (0), `openFaq`, `hours`, `rate` |
| Website Examples | `filter` ("All"), `modal` (-1) |
| Features | `tab` ("website"), `openFaq` |
| Services | `svc` ("dfy") |
| Website Audit | `channel` ("WhatsApp"), `openFaq` |
| Help / Contact | `subject` / `topic` |
| FAQs | `group` ("All"), `open` |
| Careers | `filter` ("All"), `open` (0) |
| Partner | `clients` (10), `plan` ("Boost"), `ptype` ("Agency") |
| Legal | `doc` ("terms") |
| Editor Showcase / Mobile | `mode` ("product"), `img` (0) |
| Site Header | `open` (dropdown index, -1) |

### Hover states (implement all)
Cards → border to `#707538` · glass buttons → fill to `0.8` · primary buttons → `#FFFDD8` · nav pill links → `rgba(255,255,255,0.75)` · dropdown items → `#F2EEE2` · slider arrows → `#F4F2AE` · example cards → overlay fades in over the preview · editor chips → butter/moss fill.

### Responsive
Every grid is `auto-fit` + `minmax(min(100%, N), 1fr)`, so pages reflow without breakpoints. Headings and section padding use `clamp()`. Tables scroll horizontally inside their card with a `min-width` floor rather than crushing. The header collapses to a burger below ~900px.

Mobile: only the home page has a dedicated 390px design so far. **Ask before building mobile variants of the other pages** — the desktop pages already reflow.

### Not designed yet — ask before inventing
Form validation and submitted states · blog pagination beyond "load more" · help-article detail pages · search results · newsletter double opt-in · 404 · cookie banner · language toggle (Urdu) · RTL.

---

## Content Guardrails

**The client gave three standing instructions. Honour them.**

1. **Do not change page copy.** Layout and sections may change; wording may not.
2. **One set of trust numbers everywhere: 70,000 websites built, 4.8/5 rating.** The old site variously claimed 100,000, 70,000 and 700,000 — all removed. The announcement bar's "100,000 business in 2026" is a separate forward-looking line the client wrote and wants kept.
3. **Plan names are Launch / Boost / Growth / Platinum.** The old site said "Plus" for Boost.

Also removed during design and not to be reintroduced: Walmart Business+ references, Xero/PayPal logos, "Mon-Fri 9am-8pm ET", USD prices, and the Trustpilot widget showing 4.1 from 5 reviews.

Prices in PKR; Gulf clients quoted in AED. Market is **Pakistan + Gulf**.

## Assets
In `assets/`:
- `matjarx-logo-black.png` — wordmark for light backgrounds (site header)
- `matjarx-logo-light.png` — wordmark for dark backgrounds (footer, dark header)
- `matjarx-mark-light.png` / `matjarx-mark-dark.png` — icon mark, white field knocked out to alpha
- `matjarx-icon.png` — original supplied mark, **opaque white background**; never place on dark
- `mascot.mp4` — the client's mascot animation, used in the mascot section
- `ee-*.jpeg` (10 files) — Elegance Embroidery product photography, used in the editor showcase's product mode
- `scb-*.jpg|jpeg|webp` (7 files) — Sweet Crumbs Bakery photography, used in service mode
- `food-doughnuts.jpg`, `food-cake.jpeg` — additional bakery imagery
- `editor-showcase.png` — the client's original editor screenshot, now superseded by the live `Editor Showcase` component

Icons are inline SVG line icons: `stroke-width` 1.7–2.8, `stroke-linecap/linejoin: round`, 10–24px. Keep the Trustpilot, Google, Clutch and WhatsApp brand glyphs as-is; substitute the rest with the codebase's icon set.

**Still needed from the client:** real screenshots for the nine website examples (currently rendered as styled mockups), team photographs for About, and blog cover images.

Fonts: **Lato** (400/700/900) and **Open Sans** (400/500/600) — Google Fonts in the prototype; use the codebase's font pipeline.

## Files
- Shared components: `Site Header`, `Site Header Dark`, `Site Footer`, `Editor Showcase`, `Editor Showcase Mobile`
- 26 page files (listed above)
- `assets/` as described
- `support.js` — prototype runtime only. **Do not port.**

## Related
This is one of three handoff packages. `design_handoff_matjarx_console` covers the client dashboard and auth; `design_handoff_theme_editor` covers the theme editor. All three share the same palette and glass recipe — build one theme layer, not three.
