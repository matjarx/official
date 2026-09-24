# Internal link graph

Built by crawling all 184 pages of a production build and reading the
rendered HTML. **Header and footer markup is cut out** — only links that
sit in a page's own content count. Counting chrome would say every page
links to every other page, which is true and useless: the footer alone
carries 94 links including all 63 cities.

**1546 editorial links** across 184 pages.

## The shape of it

Rows are the linking page's section, columns the target's.

| from ↓ / to → | Home | Main | Industry | City | Blog | Alternatives | Help centre | Pricing | Templates | Legal |
|---|---|---|---|---|---|---|---|---|---|---|
| Home | · | **1** | **11** | · | · | · | · | **1** | · | · |
| Main pages | · | 20 | **11** | · | · | **4** | **1** | **14** | · | **4** |
| Industry pages | **14** | **14** | 182 | · | · | · | · | **14** | · | · |
| City pages | **63** | · | · | 501 | · | · | · | **63** | · | · |
| Blog | · | · | · | · | 140 | · | · | **28** | · | · |
| Alternatives | **42** | **85** | · | · | · | 207 | · | **42** | · | · |
| Help centre | · | · | · | · | · | · | 29 | **4** | · | **5** |
| Pricing & plans | **5** | **6** | · | · | · | · | · | 26 | · | · |
| Templates | · | **1** | · | · | · | · | **1** | **1** | · | · |
| Legal | · | · | · | · | · | · | · | · | · | 6 |

### What that says

**The sections are sealed off from each other.** Industry pages link to
industry pages, blog posts link to blog posts, comparisons link to
comparisons, help articles link to help articles. Almost nothing crosses.

Concretely, and each of these is a gap worth closing:

- **The blog links to nothing outside the blog** except `/pricing`. 28 posts
  on local SEO, payment gateways, TikTok ads and COD, and not one of them
  links to the service page that sells exactly that work, or to a city
  page, or to an industry page.
- **City pages link only to other cities, home and pricing.** A page about
  website design in Multan says nothing about the industry pages or the
  services a Multan business would buy.
- **Industry pages never link to the blog or to a city.**
- **`/templates` receives zero editorial links** from anywhere.

## Pages with no editorial inbound link (7)

Reachable only through the header or footer. Not invisible to Google —
the footer is a real link — but carrying no contextual signal at all.

- `/about-us`
- `/complete-website-audit-for-organic-visibility`
- `/faqs`
- `/home-dark` — internal variant, also in the sitemap
- `/home-mobile` — internal variant, also in the sitemap
- `/templates`
- `/videos`

## Every page, in and out

### Home (1)

| page | links out | links in | links out to |
|---|---|---|---|
| `/` | 13 | 124 | `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-boutiques`, `/website-for-clinics-and-healthcare` … +7 |

### Main pages (16)

| page | links out | links in | links out to |
|---|---|---|---|
| `/about-us` | 2 | 0 | `/become-a-partner`, `/careers` |
| `/become-a-partner` | 2 | 1 | `/legal/privacy`, `/legal/terms` |
| `/best-website-builder-pakistan` | 5 | 42 | `/alternatives/matjarx-vs-shopify`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/alternatives/matjarx-vs-wordpress`, `/pricing` |
| `/careers` | 0 | 1 | — |
| `/complete-website-audit-for-organic-visibility` | 1 | 0 | `/legal/privacy` |
| `/concierge-service` | 7 | 3 | `/contact`, `/done-for-you-website`, `/growth-marketing-service`, `/local-national-and-global-seo`, `/plans/growth`, `/plans/platinum` … +1 |
| `/contact` | 1 | 11 | `/legal/privacy` |
| `/done-for-you-website` | 4 | 3 | `/concierge-service`, `/growth-marketing-service`, `/local-national-and-global-seo`, `/pricing` |
| `/faqs` | 1 | 0 | `/contact` |
| `/features` | 3 | 1 | `/help`, `/pricing`, `/website-examples` |
| `/growth-marketing-service` | 6 | 3 | `/concierge-service`, `/contact`, `/done-for-you-website`, `/local-national-and-global-seo`, `/plans/growth`, `/pricing` |
| `/home-dark` | 13 | 0 | `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-boutiques`, `/website-for-clinics-and-healthcare` … +7 |
| `/home-mobile` | 0 | 0 | — |
| `/local-national-and-global-seo` | 7 | 3 | `/concierge-service`, `/contact`, `/done-for-you-website`, `/growth-marketing-service`, `/plans/boost`, `/plans/growth` … +1 |
| `/videos` | 1 | 0 | `/pricing` |
| `/website-examples` | 1 | 59 | `/pricing` |

### Industry pages (14)

| page | links out | links in | links out to |
|---|---|---|---|
| `/website-for-auto-repair-shops` | 16 | 15 | `/`, `/pricing`, `/website-examples`, `/website-for-b2b-clothing-manufacturer`, `/website-for-b2b-leather-goods-manufacturer`, `/website-for-boutiques` … +10 |
| `/website-for-b2b-clothing-manufacturer` | 16 | 15 | `/`, `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-leather-goods-manufacturer`, `/website-for-boutiques` … +10 |
| `/website-for-b2b-leather-goods-manufacturer` | 16 | 13 | `/`, `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-boutiques` … +10 |
| `/website-for-boutiques` | 16 | 15 | `/`, `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-b2b-leather-goods-manufacturer` … +10 |
| `/website-for-clinics` | 16 | 13 | `/`, `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-b2b-leather-goods-manufacturer` … +10 |
| `/website-for-clinics-and-healthcare` | 16 | 15 | `/`, `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-b2b-leather-goods-manufacturer` … +10 |
| `/website-for-construction-companies` | 16 | 15 | `/`, `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-b2b-leather-goods-manufacturer` … +10 |
| `/website-for-gyms-and-fitness` | 16 | 15 | `/`, `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-b2b-leather-goods-manufacturer` … +10 |
| `/website-for-law-firms` | 16 | 15 | `/`, `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-b2b-leather-goods-manufacturer` … +10 |
| `/website-for-online-stores-ecommerce` | 16 | 13 | `/`, `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-b2b-leather-goods-manufacturer` … +10 |
| `/website-for-real-estate` | 16 | 15 | `/`, `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-b2b-leather-goods-manufacturer` … +10 |
| `/website-for-restaurants` | 16 | 15 | `/`, `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-b2b-leather-goods-manufacturer` … +10 |
| `/website-for-salons-and-spas` | 16 | 15 | `/`, `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-b2b-leather-goods-manufacturer` … +10 |
| `/website-for-wedding-and-event-planners` | 16 | 15 | `/`, `/pricing`, `/website-examples`, `/website-for-auto-repair-shops`, `/website-for-b2b-clothing-manufacturer`, `/website-for-b2b-leather-goods-manufacturer` … +10 |

### City pages (63)

| page | links out | links in | links out to |
|---|---|---|---|
| `/website-design-abbottabad` | 10 | 5 | `/`, `/pricing`, `/website-design-attock`, `/website-design-bahawalnagar`, `/website-design-bahawalpur`, `/website-design-burewala` … +4 |
| `/website-design-attock` | 10 | 6 | `/`, `/pricing`, `/website-design-bahawalnagar`, `/website-design-bahawalpur`, `/website-design-burewala`, `/website-design-charsadda` … +4 |
| `/website-design-bahawalnagar` | 10 | 7 | `/`, `/pricing`, `/website-design-bahawalpur`, `/website-design-burewala`, `/website-design-charsadda`, `/website-design-chichawatni` … +4 |
| `/website-design-bahawalpur` | 10 | 8 | `/`, `/pricing`, `/website-design-burewala`, `/website-design-charsadda`, `/website-design-chichawatni`, `/website-design-chiniot` … +4 |
| `/website-design-burewala` | 10 | 8 | `/`, `/pricing`, `/website-design-charsadda`, `/website-design-chichawatni`, `/website-design-chiniot`, `/website-design-dadu` … +4 |
| `/website-design-charsadda` | 10 | 8 | `/`, `/pricing`, `/website-design-chichawatni`, `/website-design-chiniot`, `/website-design-dadu`, `/website-design-daska` … +4 |
| `/website-design-chichawatni` | 10 | 7 | `/`, `/pricing`, `/website-design-chiniot`, `/website-design-dadu`, `/website-design-daska`, `/website-design-dera-ghazi-khan` … +4 |
| `/website-design-chiniot` | 10 | 6 | `/`, `/pricing`, `/website-design-dadu`, `/website-design-daska`, `/website-design-dera-ghazi-khan`, `/website-design-dera-ismail-khan` … +4 |
| `/website-design-dadu` | 10 | 5 | `/`, `/pricing`, `/website-design-daska`, `/website-design-dera-ghazi-khan`, `/website-design-dera-ismail-khan`, `/website-design-faisalabad` … +4 |
| `/website-design-daska` | 10 | 5 | `/`, `/pricing`, `/website-design-dera-ghazi-khan`, `/website-design-dera-ismail-khan`, `/website-design-faisalabad`, `/website-design-gojra` … +4 |
| `/website-design-dera-ghazi-khan` | 10 | 5 | `/`, `/pricing`, `/website-design-dera-ismail-khan`, `/website-design-faisalabad`, `/website-design-gojra`, `/website-design-gujranwala` … +4 |
| `/website-design-dera-ismail-khan` | 10 | 5 | `/`, `/pricing`, `/website-design-faisalabad`, `/website-design-gojra`, `/website-design-gujranwala`, `/website-design-gujrat` … +4 |
| `/website-design-faisalabad` | 10 | 5 | `/`, `/pricing`, `/website-design-gojra`, `/website-design-gujranwala`, `/website-design-gujrat`, `/website-design-hafizabad` … +4 |
| `/website-design-gojra` | 10 | 5 | `/`, `/pricing`, `/website-design-gujranwala`, `/website-design-gujrat`, `/website-design-hafizabad`, `/website-design-haripur` … +4 |
| `/website-design-gujranwala` | 10 | 5 | `/`, `/pricing`, `/website-design-gujrat`, `/website-design-hafizabad`, `/website-design-haripur`, `/website-design-hyderabad` … +4 |
| `/website-design-gujrat` | 10 | 5 | `/`, `/pricing`, `/website-design-hafizabad`, `/website-design-haripur`, `/website-design-hyderabad`, `/website-design-islamabad` … +4 |
| `/website-design-hafizabad` | 10 | 5 | `/`, `/pricing`, `/website-design-haripur`, `/website-design-hyderabad`, `/website-design-islamabad`, `/website-design-jacobabad` … +4 |
| `/website-design-haripur` | 10 | 5 | `/`, `/pricing`, `/website-design-hyderabad`, `/website-design-islamabad`, `/website-design-jacobabad`, `/website-design-jhang` … +4 |
| `/website-design-hyderabad` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-jacobabad`, `/website-design-jhang`, `/website-design-jhelum` … +4 |
| `/website-design-islamabad` | 9 | 62 | `/`, `/pricing`, `/website-design-jacobabad`, `/website-design-jhang`, `/website-design-jhelum`, `/website-design-kamoke` … +3 |
| `/website-design-jacobabad` | 10 | 6 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-jhelum`, `/website-design-kamoke`, `/website-design-kandhkot` … +4 |
| `/website-design-jhang` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-kamoke`, `/website-design-kandhkot`, `/website-design-karachi` … +4 |
| `/website-design-jhelum` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-kandhkot`, `/website-design-karachi`, `/website-design-khairpur` … +4 |
| `/website-design-kamoke` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-khairpur`, `/website-design-khanewal` … +4 |
| `/website-design-kandhkot` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-khanewal`, `/website-design-khanpur` … +4 |
| `/website-design-karachi` | 9 | 62 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-khanewal`, `/website-design-khanpur`, `/website-design-khuzdar` … +3 |
| `/website-design-khairpur` | 10 | 4 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-khuzdar`, `/website-design-kohat` … +4 |
| `/website-design-khanewal` | 10 | 6 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-kohat`, `/website-design-kot-adu` … +4 |
| `/website-design-khanpur` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-kot-adu`, `/website-design-lahore` … +4 |
| `/website-design-khuzdar` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-larkana` … +4 |
| `/website-design-kohat` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-mandi-bahauddin` … +4 |
| `/website-design-kot-adu` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-mansehra` … +4 |
| `/website-design-lahore` | 9 | 62 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-mansehra`, `/website-design-mardan` … +3 |
| `/website-design-larkana` | 10 | 4 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-mianwali` … +4 |
| `/website-design-mandi-bahauddin` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-mirpur-khas` … +4 |
| `/website-design-mansehra` | 10 | 6 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-multan` … +4 |
| `/website-design-mardan` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-muridke` … +4 |
| `/website-design-mianwali` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-murree` … +4 |
| `/website-design-mirpur-khas` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-muzaffargarh` … +4 |
| `/website-design-multan` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-nawabshah` … +4 |
| `/website-design-muridke` | 10 | 4 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-nowshera` … +4 |
| `/website-design-murree` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-okara` … +4 |
| `/website-design-muzaffargarh` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-pakpattan` … +4 |
| `/website-design-nawabshah` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-peshawar` … +4 |
| `/website-design-nowshera` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-quetta` … +4 |
| `/website-design-okara` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-rahim-yar-khan` … +4 |
| `/website-design-pakpattan` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-rawalpindi` … +4 |
| `/website-design-peshawar` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-sadiqabad` … +4 |
| `/website-design-quetta` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-sahiwal` … +4 |
| `/website-design-rahim-yar-khan` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-sargodha` … +4 |
| `/website-design-rawalpindi` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-sheikhupura` … +4 |
| `/website-design-sadiqabad` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-shikarpur` … +4 |
| `/website-design-sahiwal` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-sialkot` … +4 |
| `/website-design-sargodha` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-sukkur` … +4 |
| `/website-design-sheikhupura` | 10 | 5 | `/`, `/pricing`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore`, `/website-design-swabi` … +4 |
| `/website-design-shikarpur` | 10 | 5 | `/`, `/pricing`, `/website-design-abbottabad`, `/website-design-islamabad`, `/website-design-karachi`, `/website-design-lahore` … +4 |
| `/website-design-sialkot` | 10 | 5 | `/`, `/pricing`, `/website-design-abbottabad`, `/website-design-attock`, `/website-design-islamabad`, `/website-design-karachi` … +4 |
| `/website-design-sukkur` | 10 | 5 | `/`, `/pricing`, `/website-design-abbottabad`, `/website-design-attock`, `/website-design-bahawalnagar`, `/website-design-islamabad` … +4 |
| `/website-design-swabi` | 10 | 5 | `/`, `/pricing`, `/website-design-abbottabad`, `/website-design-attock`, `/website-design-bahawalnagar`, `/website-design-bahawalpur` … +4 |
| `/website-design-tando-allahyar` | 10 | 5 | `/`, `/pricing`, `/website-design-abbottabad`, `/website-design-attock`, `/website-design-bahawalnagar`, `/website-design-bahawalpur` … +4 |
| `/website-design-vehari` | 10 | 5 | `/`, `/pricing`, `/website-design-attock`, `/website-design-bahawalnagar`, `/website-design-bahawalpur`, `/website-design-burewala` … +4 |
| `/website-design-wah-cantonment` | 10 | 5 | `/`, `/pricing`, `/website-design-bahawalnagar`, `/website-design-bahawalpur`, `/website-design-burewala`, `/website-design-charsadda` … +4 |
| `/website-design-zhob` | 10 | 5 | `/`, `/pricing`, `/website-design-bahawalpur`, `/website-design-burewala`, `/website-design-charsadda`, `/website-design-chichawatni` … +4 |

### Blog (29)

| page | links out | links in | links out to |
|---|---|---|---|
| `/blogs` | 28 | 28 | `/blogs/b2b-website-myths-broken`, `/blogs/beyond-blue-links-how-generative-engine-optimization-drives-traffic`, `/blogs/business-content-ideas-no-dancing`, `/blogs/cod-optimization-reduce-rto`, `/blogs/definitive-master-guide-to-generative-engine-optimization`, `/blogs/domain-and-hosting-explained` … +22 |
| `/blogs/b2b-website-myths-broken` | 5 | 1 | `/blogs`, `/blogs/matjarx-complete-guide-small-business`, `/blogs/professional-website-build-trust`, `/blogs/top-5-website-mistakes-killing-conversions`, `/pricing` |
| `/blogs/beyond-blue-links-how-generative-engine-optimization-drives-traffic` | 5 | 4 | `/blogs`, `/blogs/definitive-master-guide-to-generative-engine-optimization`, `/blogs/how-generative-engine-optimization-works`, `/blogs/local-seo-for-small-business-guide`, `/pricing` |
| `/blogs/business-content-ideas-no-dancing` | 5 | 1 | `/blogs`, `/blogs/rastah-case-study-lessons-small-business`, `/blogs/trends-in-digital-marketing-for-pakistani-businesses`, `/blogs/whatsapp-automation-setup`, `/pricing` |
| `/blogs/cod-optimization-reduce-rto` | 5 | 1 | `/blogs`, `/blogs/matjarx-complete-guide-small-business`, `/blogs/professional-website-build-trust`, `/blogs/rastah-case-study-lessons-small-business`, `/pricing` |
| `/blogs/definitive-master-guide-to-generative-engine-optimization` | 5 | 7 | `/blogs`, `/blogs/beyond-blue-links-how-generative-engine-optimization-drives-traffic`, `/blogs/how-generative-engine-optimization-works`, `/blogs/local-seo-for-small-business-guide`, `/pricing` |
| `/blogs/domain-and-hosting-explained` | 5 | 1 | `/blogs`, `/blogs/matjarx-complete-guide-small-business`, `/blogs/professional-website-build-trust`, `/blogs/top-5-website-mistakes-killing-conversions`, `/pricing` |
| `/blogs/elegance-embroidery-mukesh-kumar-lucky-draw-winner` | 5 | 1 | `/blogs`, `/blogs/matjarx-complete-guide-small-business`, `/blogs/professional-website-build-trust`, `/blogs/rastah-case-study-lessons-small-business`, `/pricing` |
| `/blogs/facebook-page-for-business` | 5 | 1 | `/blogs`, `/blogs/rastah-case-study-lessons-small-business`, `/blogs/trends-in-digital-marketing-for-pakistani-businesses`, `/blogs/whatsapp-automation-setup`, `/pricing` |
| `/blogs/facebook-page-setup-guide` | 5 | 1 | `/blogs`, `/blogs/rastah-case-study-lessons-small-business`, `/blogs/trends-in-digital-marketing-for-pakistani-businesses`, `/blogs/whatsapp-automation-setup`, `/pricing` |
| `/blogs/hiring-a-geo-expert-agencies-and-consulting-services` | 5 | 1 | `/blogs`, `/blogs/definitive-master-guide-to-generative-engine-optimization`, `/blogs/how-generative-engine-optimization-works`, `/blogs/local-seo-for-small-business-guide`, `/pricing` |
| `/blogs/how-generative-engine-optimization-works` | 5 | 7 | `/blogs`, `/blogs/beyond-blue-links-how-generative-engine-optimization-drives-traffic`, `/blogs/definitive-master-guide-to-generative-engine-optimization`, `/blogs/local-seo-for-small-business-guide`, `/pricing` |
| `/blogs/local-seo-for-small-business-guide` | 5 | 7 | `/blogs`, `/blogs/beyond-blue-links-how-generative-engine-optimization-drives-traffic`, `/blogs/definitive-master-guide-to-generative-engine-optimization`, `/blogs/how-generative-engine-optimization-works`, `/pricing` |
| `/blogs/mastering-ai-search-best-generative-ai-geo-training-courses` | 5 | 1 | `/blogs`, `/blogs/definitive-master-guide-to-generative-engine-optimization`, `/blogs/how-generative-engine-optimization-works`, `/blogs/local-seo-for-small-business-guide`, `/pricing` |
| `/blogs/matjarx-complete-guide-small-business` | 5 | 9 | `/blogs`, `/blogs/mobile-first-design-tips-ux`, `/blogs/professional-website-build-trust`, `/blogs/top-5-website-mistakes-killing-conversions`, `/pricing` |
| `/blogs/mobile-first-design-tips-ux` | 5 | 4 | `/blogs`, `/blogs/matjarx-complete-guide-small-business`, `/blogs/professional-website-build-trust`, `/blogs/top-5-website-mistakes-killing-conversions`, `/pricing` |
| `/blogs/professional-website-build-trust` | 5 | 9 | `/blogs`, `/blogs/matjarx-complete-guide-small-business`, `/blogs/mobile-first-design-tips-ux`, `/blogs/top-5-website-mistakes-killing-conversions`, `/pricing` |
| `/blogs/rastah-case-study-lessons-small-business` | 5 | 10 | `/blogs`, `/blogs/tiktok-growth-limit-switch-business-account`, `/blogs/trends-in-digital-marketing-for-pakistani-businesses`, `/blogs/whatsapp-automation-setup`, `/pricing` |
| `/blogs/set-up-tiktok-ads` | 5 | 1 | `/blogs`, `/blogs/rastah-case-study-lessons-small-business`, `/blogs/trends-in-digital-marketing-for-pakistani-businesses`, `/blogs/whatsapp-automation-setup`, `/pricing` |
| `/blogs/setup-easypaisa-business-website` | 5 | 4 | `/blogs`, `/blogs/setup-jazzcash-jazz-business-website`, `/blogs/setup-payfast-payment-gateway`, `/blogs/setup-sadapay-sadabiz-website`, `/pricing` |
| `/blogs/setup-jazzcash-jazz-business-website` | 5 | 4 | `/blogs`, `/blogs/setup-easypaisa-business-website`, `/blogs/setup-payfast-payment-gateway`, `/blogs/setup-sadapay-sadabiz-website`, `/pricing` |
| `/blogs/setup-payfast-payment-gateway` | 5 | 4 | `/blogs`, `/blogs/setup-easypaisa-business-website`, `/blogs/setup-jazzcash-jazz-business-website`, `/blogs/setup-sadapay-sadabiz-website`, `/pricing` |
| `/blogs/setup-sadapay-sadabiz-website` | 5 | 4 | `/blogs`, `/blogs/setup-easypaisa-business-website`, `/blogs/setup-jazzcash-jazz-business-website`, `/blogs/setup-payfast-payment-gateway`, `/pricing` |
| `/blogs/tiktok-growth-limit-switch-business-account` | 5 | 4 | `/blogs`, `/blogs/rastah-case-study-lessons-small-business`, `/blogs/trends-in-digital-marketing-for-pakistani-businesses`, `/blogs/whatsapp-automation-setup`, `/pricing` |
| `/blogs/top-5-website-mistakes-killing-conversions` | 5 | 7 | `/blogs`, `/blogs/matjarx-complete-guide-small-business`, `/blogs/mobile-first-design-tips-ux`, `/blogs/professional-website-build-trust`, `/pricing` |
| `/blogs/top-geo-and-content-automation-tools-search-strategy` | 5 | 1 | `/blogs`, `/blogs/definitive-master-guide-to-generative-engine-optimization`, `/blogs/how-generative-engine-optimization-works`, `/blogs/local-seo-for-small-business-guide`, `/pricing` |
| `/blogs/trends-in-digital-marketing-for-pakistani-businesses` | 5 | 8 | `/blogs`, `/blogs/rastah-case-study-lessons-small-business`, `/blogs/tiktok-growth-limit-switch-business-account`, `/blogs/whatsapp-automation-setup`, `/pricing` |
| `/blogs/whatsapp-automation-setup` | 5 | 8 | `/blogs`, `/blogs/rastah-case-study-lessons-small-business`, `/blogs/tiktok-growth-limit-switch-business-account`, `/blogs/trends-in-digital-marketing-for-pakistani-businesses`, `/pricing` |
| `/blogs/why-website-is-important-for-business` | 5 | 1 | `/blogs`, `/blogs/matjarx-complete-guide-small-business`, `/blogs/professional-website-build-trust`, `/blogs/top-5-website-mistakes-killing-conversions`, `/pricing` |

### Alternatives (43)

| page | links out | links in | links out to |
|---|---|---|---|
| `/alternatives` | 43 | 42 | `/alternatives/matjarx-vs-10pearls`, `/alternatives/matjarx-vs-adex360`, `/alternatives/matjarx-vs-arpatech`, `/alternatives/matjarx-vs-blink`, `/alternatives/matjarx-vs-boundless-technologies`, `/alternatives/matjarx-vs-bramerz` … +37 |
| `/alternatives/matjarx-vs-10pearls` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-adex360` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-arpatech` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-blink` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-boundless-technologies` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-bramerz` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-cise-pos` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-cubix` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-daraz-store` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-devbatch` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-dominant-marketers` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-dukanpk` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-easybazaar` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-ecwid` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-folio3` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-genetech-solutions` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-ginkgo-retail` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-global-dezigns` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-godaddy` | 7 | 42 | `/`, `/alternatives`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan`, `/pricing` … +1 |
| `/alternatives/matjarx-vs-howmuch-pos` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-magento` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-media-feathers` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-navicosoft` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-oneclick-pos` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-ordrz` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-oscar-pos` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-sellryt` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-seohubpk` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-shopify` | 8 | 2 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-splendid-accounts` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-squarespace` | 7 | 43 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan`, `/pricing` … +1 |
| `/alternatives/matjarx-vs-switcher-techno-pos` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-techabout` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-tengo-tech` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-viftech` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-webx` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-wix` | 7 | 43 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/best-website-builder-pakistan`, `/pricing` … +1 |
| `/alternatives/matjarx-vs-woocommerce` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-wordpress` | 8 | 2 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-wp-experts` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-zapta-technologies` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |
| `/alternatives/matjarx-vs-znwebpro` | 8 | 1 | `/`, `/alternatives`, `/alternatives/matjarx-vs-godaddy`, `/alternatives/matjarx-vs-squarespace`, `/alternatives/matjarx-vs-wix`, `/best-website-builder-pakistan` … +2 |

### Help centre (8)

| page | links out | links in | links out to |
|---|---|---|---|
| `/help` | 8 | 8 | `/help/account-and-security`, `/help/billing-and-plans`, `/help/domains-and-email`, `/help/ecommerce-and-payments`, `/help/getting-started`, `/help/seo-and-marketing` … +2 |
| `/help/account-and-security` | 5 | 1 | `/help`, `/help/billing-and-plans`, `/help/getting-started`, `/legal/privacy`, `/legal/terms` |
| `/help/billing-and-plans` | 5 | 4 | `/help`, `/help/getting-started`, `/legal/refund`, `/legal/terms`, `/pricing` |
| `/help/domains-and-email` | 4 | 2 | `/help`, `/help/billing-and-plans`, `/help/getting-started`, `/help/website-editor` |
| `/help/ecommerce-and-payments` | 4 | 1 | `/help`, `/help/getting-started`, `/help/website-editor`, `/plans/platinum` |
| `/help/getting-started` | 5 | 7 | `/help`, `/help/billing-and-plans`, `/help/domains-and-email`, `/help/seo-and-marketing`, `/help/website-editor` |
| `/help/seo-and-marketing` | 4 | 3 | `/help`, `/help/website-editor`, `/plans/boost`, `/plans/growth` |
| `/help/website-editor` | 3 | 5 | `/help`, `/help/getting-started`, `/help/seo-and-marketing` |

### Pricing & plans (6)

| page | links out | links in | links out to |
|---|---|---|---|
| `/plans/boost` | 7 | 6 | `/`, `/contact`, `/plans/custom`, `/plans/growth`, `/plans/launch`, `/plans/platinum` … +1 |
| `/plans/custom` | 7 | 5 | `/`, `/contact`, `/plans/boost`, `/plans/growth`, `/plans/launch`, `/plans/platinum` … +1 |
| `/plans/growth` | 7 | 8 | `/`, `/contact`, `/plans/boost`, `/plans/custom`, `/plans/launch`, `/plans/platinum` … +1 |
| `/plans/launch` | 7 | 4 | `/`, `/contact`, `/plans/boost`, `/plans/custom`, `/plans/growth`, `/plans/platinum` … +1 |
| `/plans/platinum` | 7 | 6 | `/`, `/contact`, `/plans/boost`, `/plans/custom`, `/plans/growth`, `/plans/launch` … +1 |
| `/pricing` | 2 | 164 | `/contact`, `/plans/custom` |

### Templates (1)

| page | links out | links in | links out to |
|---|---|---|---|
| `/templates` | 3 | 0 | `/features`, `/help/getting-started`, `/pricing` |

### Legal (3)

| page | links out | links in | links out to |
|---|---|---|---|
| `/legal/privacy` | 2 | 7 | `/legal/refund`, `/legal/terms` |
| `/legal/refund` | 2 | 3 | `/legal/privacy`, `/legal/terms` |
| `/legal/terms` | 2 | 5 | `/legal/privacy`, `/legal/refund` |
