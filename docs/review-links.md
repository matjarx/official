# Page-by-page review list

Every page the marketing site builds: **184 routes**, exactly what `next build` emits.

Start the server first:

```
cd ~/Projects/matjarx-marketing && npm run build && npx next start -p 3999
```

Then work down the list. The checkbox is there to be ticked as you go.

## Home (1)

- [ ] <http://localhost:3999/>

## Main pages (16)

`/home-dark` and `/home-mobile` are publicly reachable and shipped in the sitemap. They look like internal variants; say the word and they get noindexed or removed.

- [ ] <http://localhost:3999/about-us>
- [ ] <http://localhost:3999/become-a-partner>
- [ ] <http://localhost:3999/best-website-builder-pakistan>
- [ ] <http://localhost:3999/careers>
- [ ] <http://localhost:3999/complete-website-audit-for-organic-visibility>
- [ ] <http://localhost:3999/concierge-service>
- [ ] <http://localhost:3999/contact>
- [ ] <http://localhost:3999/done-for-you-website>
- [ ] <http://localhost:3999/faqs>
- [ ] <http://localhost:3999/features>
- [ ] <http://localhost:3999/growth-marketing-service>
- [ ] <http://localhost:3999/home-dark>
- [ ] <http://localhost:3999/home-mobile>
- [ ] <http://localhost:3999/local-national-and-global-seo>
- [ ] <http://localhost:3999/videos>
- [ ] <http://localhost:3999/website-examples>

## Industry pages (14)

- [ ] <http://localhost:3999/website-for-auto-repair-shops>
- [ ] <http://localhost:3999/website-for-b2b-clothing-manufacturer>
- [ ] <http://localhost:3999/website-for-b2b-leather-goods-manufacturer>
- [ ] <http://localhost:3999/website-for-boutiques>
- [ ] <http://localhost:3999/website-for-clinics>
- [ ] <http://localhost:3999/website-for-clinics-and-healthcare>
- [ ] <http://localhost:3999/website-for-construction-companies>
- [ ] <http://localhost:3999/website-for-gyms-and-fitness>
- [ ] <http://localhost:3999/website-for-law-firms>
- [ ] <http://localhost:3999/website-for-online-stores-ecommerce>
- [ ] <http://localhost:3999/website-for-real-estate>
- [ ] <http://localhost:3999/website-for-restaurants>
- [ ] <http://localhost:3999/website-for-salons-and-spas>
- [ ] <http://localhost:3999/website-for-wedding-and-event-planners>

## Pricing & plans (6)

- [ ] <http://localhost:3999/plans/boost>
- [ ] <http://localhost:3999/plans/custom>
- [ ] <http://localhost:3999/plans/growth>
- [ ] <http://localhost:3999/plans/launch>
- [ ] <http://localhost:3999/plans/platinum>
- [ ] <http://localhost:3999/pricing>

## Templates (1)

Still the single old page. The industry listing, the `?industry-name-website-template` URLs and the iframe preview with the 5-second "Get This Theme" are not built yet.

- [ ] <http://localhost:3999/templates>

## Alternatives index (1)

- [ ] <http://localhost:3999/alternatives>

## Alternatives — one per competitor (42)

- [ ] <http://localhost:3999/alternatives/matjarx-vs-10pearls>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-adex360>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-arpatech>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-blink>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-boundless-technologies>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-bramerz>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-cise-pos>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-cubix>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-daraz-store>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-devbatch>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-dominant-marketers>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-dukanpk>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-easybazaar>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-ecwid>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-folio3>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-genetech-solutions>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-ginkgo-retail>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-global-dezigns>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-godaddy>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-howmuch-pos>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-magento>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-media-feathers>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-navicosoft>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-oneclick-pos>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-ordrz>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-oscar-pos>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-sellryt>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-seohubpk>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-shopify>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-splendid-accounts>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-squarespace>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-switcher-techno-pos>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-techabout>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-tengo-tech>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-viftech>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-webx>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-wix>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-woocommerce>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-wordpress>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-wp-experts>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-zapta-technologies>
- [ ] <http://localhost:3999/alternatives/matjarx-vs-znwebpro>

## Blog index (1)

- [ ] <http://localhost:3999/blogs>

## Blog posts (28)

Cover images all resolve locally now — the `/blog/:slug` redirect used to swallow `/blog/*.webp`, which is why they were broken.

- [ ] <http://localhost:3999/blogs/b2b-website-myths-broken>
- [ ] <http://localhost:3999/blogs/beyond-blue-links-how-generative-engine-optimization-drives-traffic>
- [ ] <http://localhost:3999/blogs/business-content-ideas-no-dancing>
- [ ] <http://localhost:3999/blogs/cod-optimization-reduce-rto>
- [ ] <http://localhost:3999/blogs/definitive-master-guide-to-generative-engine-optimization>
- [ ] <http://localhost:3999/blogs/domain-and-hosting-explained>
- [ ] <http://localhost:3999/blogs/elegance-embroidery-mukesh-kumar-lucky-draw-winner>
- [ ] <http://localhost:3999/blogs/facebook-page-for-business>
- [ ] <http://localhost:3999/blogs/facebook-page-setup-guide>
- [ ] <http://localhost:3999/blogs/hiring-a-geo-expert-agencies-and-consulting-services>
- [ ] <http://localhost:3999/blogs/how-generative-engine-optimization-works>
- [ ] <http://localhost:3999/blogs/local-seo-for-small-business-guide>
- [ ] <http://localhost:3999/blogs/mastering-ai-search-best-generative-ai-geo-training-courses>
- [ ] <http://localhost:3999/blogs/matjarx-complete-guide-small-business>
- [ ] <http://localhost:3999/blogs/mobile-first-design-tips-ux>
- [ ] <http://localhost:3999/blogs/professional-website-build-trust>
- [ ] <http://localhost:3999/blogs/rastah-case-study-lessons-small-business>
- [ ] <http://localhost:3999/blogs/set-up-tiktok-ads>
- [ ] <http://localhost:3999/blogs/setup-easypaisa-business-website>
- [ ] <http://localhost:3999/blogs/setup-jazzcash-jazz-business-website>
- [ ] <http://localhost:3999/blogs/setup-payfast-payment-gateway>
- [ ] <http://localhost:3999/blogs/setup-sadapay-sadabiz-website>
- [ ] <http://localhost:3999/blogs/tiktok-growth-limit-switch-business-account>
- [ ] <http://localhost:3999/blogs/top-5-website-mistakes-killing-conversions>
- [ ] <http://localhost:3999/blogs/top-geo-and-content-automation-tools-search-strategy>
- [ ] <http://localhost:3999/blogs/trends-in-digital-marketing-for-pakistani-businesses>
- [ ] <http://localhost:3999/blogs/whatsapp-automation-setup>
- [ ] <http://localhost:3999/blogs/why-website-is-important-for-business>

## Help centre index (1)

- [ ] <http://localhost:3999/help>

## Help articles (7)

- [ ] <http://localhost:3999/help/account-and-security>
- [ ] <http://localhost:3999/help/billing-and-plans>
- [ ] <http://localhost:3999/help/domains-and-email>
- [ ] <http://localhost:3999/help/ecommerce-and-payments>
- [ ] <http://localhost:3999/help/getting-started>
- [ ] <http://localhost:3999/help/seo-and-marketing>
- [ ] <http://localhost:3999/help/website-editor>

## City pages (63)

All 63 now carry real inbound links — a rotating rail at the foot of each city page, plus one line in the footer of every page on the site. Spot-check any three and confirm the "other cities" rail differs between them.

- [ ] <http://localhost:3999/website-design-abbottabad>
- [ ] <http://localhost:3999/website-design-attock>
- [ ] <http://localhost:3999/website-design-bahawalnagar>
- [ ] <http://localhost:3999/website-design-bahawalpur>
- [ ] <http://localhost:3999/website-design-burewala>
- [ ] <http://localhost:3999/website-design-charsadda>
- [ ] <http://localhost:3999/website-design-chichawatni>
- [ ] <http://localhost:3999/website-design-chiniot>
- [ ] <http://localhost:3999/website-design-dadu>
- [ ] <http://localhost:3999/website-design-daska>
- [ ] <http://localhost:3999/website-design-dera-ghazi-khan>
- [ ] <http://localhost:3999/website-design-dera-ismail-khan>
- [ ] <http://localhost:3999/website-design-faisalabad>
- [ ] <http://localhost:3999/website-design-gojra>
- [ ] <http://localhost:3999/website-design-gujranwala>
- [ ] <http://localhost:3999/website-design-gujrat>
- [ ] <http://localhost:3999/website-design-hafizabad>
- [ ] <http://localhost:3999/website-design-haripur>
- [ ] <http://localhost:3999/website-design-hyderabad>
- [ ] <http://localhost:3999/website-design-islamabad>
- [ ] <http://localhost:3999/website-design-jacobabad>
- [ ] <http://localhost:3999/website-design-jhang>
- [ ] <http://localhost:3999/website-design-jhelum>
- [ ] <http://localhost:3999/website-design-kamoke>
- [ ] <http://localhost:3999/website-design-kandhkot>
- [ ] <http://localhost:3999/website-design-karachi>
- [ ] <http://localhost:3999/website-design-khairpur>
- [ ] <http://localhost:3999/website-design-khanewal>
- [ ] <http://localhost:3999/website-design-khanpur>
- [ ] <http://localhost:3999/website-design-khuzdar>
- [ ] <http://localhost:3999/website-design-kohat>
- [ ] <http://localhost:3999/website-design-kot-adu>
- [ ] <http://localhost:3999/website-design-lahore>
- [ ] <http://localhost:3999/website-design-larkana>
- [ ] <http://localhost:3999/website-design-mandi-bahauddin>
- [ ] <http://localhost:3999/website-design-mansehra>
- [ ] <http://localhost:3999/website-design-mardan>
- [ ] <http://localhost:3999/website-design-mianwali>
- [ ] <http://localhost:3999/website-design-mirpur-khas>
- [ ] <http://localhost:3999/website-design-multan>
- [ ] <http://localhost:3999/website-design-muridke>
- [ ] <http://localhost:3999/website-design-murree>
- [ ] <http://localhost:3999/website-design-muzaffargarh>
- [ ] <http://localhost:3999/website-design-nawabshah>
- [ ] <http://localhost:3999/website-design-nowshera>
- [ ] <http://localhost:3999/website-design-okara>
- [ ] <http://localhost:3999/website-design-pakpattan>
- [ ] <http://localhost:3999/website-design-peshawar>
- [ ] <http://localhost:3999/website-design-quetta>
- [ ] <http://localhost:3999/website-design-rahim-yar-khan>
- [ ] <http://localhost:3999/website-design-rawalpindi>
- [ ] <http://localhost:3999/website-design-sadiqabad>
- [ ] <http://localhost:3999/website-design-sahiwal>
- [ ] <http://localhost:3999/website-design-sargodha>
- [ ] <http://localhost:3999/website-design-sheikhupura>
- [ ] <http://localhost:3999/website-design-shikarpur>
- [ ] <http://localhost:3999/website-design-sialkot>
- [ ] <http://localhost:3999/website-design-sukkur>
- [ ] <http://localhost:3999/website-design-swabi>
- [ ] <http://localhost:3999/website-design-tando-allahyar>
- [ ] <http://localhost:3999/website-design-vehari>
- [ ] <http://localhost:3999/website-design-wah-cantonment>
- [ ] <http://localhost:3999/website-design-zhob>

## Legal (3)

- [ ] <http://localhost:3999/legal/privacy>
- [ ] <http://localhost:3999/legal/refund>
- [ ] <http://localhost:3999/legal/terms>
