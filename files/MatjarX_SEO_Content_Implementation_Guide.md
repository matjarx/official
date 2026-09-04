# MatjarX SEO Content Roadmap & Implementation Guide

## 📊 Project Overview

**Website:** matjarx.com
**Location:** Pakistan (Karachi, Lahore, Islamabad primary)
**Business:** SaaS Website Builder for Small Businesses
**Total Pages Planned:** 61+ pages across 15 categories

---

## 📁 Deliverables

### 1. **MatjarX_SEO_Content_Roadmap.xlsx**
   - **Page Inventory** sheet: All 61+ pages with page types, priorities, and redirect mappings
   - **Summary & Instructions** sheet: Project overview, breakdown, and next steps
   
   **Use this for:** Project planning, prioritization, tracking, and team coordination

### 2. **MatjarX_SEO_Keywords_Headings.xlsx**
   - **Keywords & Heading Structure** sheet: 5 sample pages with complete SEO structure
   - **How to Use** sheet: Column-by-column guide
   
   **Use this for:** Writing content briefs, creating pages, and maintaining consistency

---

## 📋 Page Inventory Breakdown

| Category | Count | Priority | Status |
|----------|-------|----------|--------|
| **Core/Product Pages** | 9 | P0 | Ready to build |
| **Help Center** | 8 | P1-P2 | Ready to build |
| **Comparison Pages** | 10 | P0-P1 | Ready to build |
| **Industry Landings** | 10 | P1-P2 | Ready to build |
| **City Landings** | 15+ | P1-P2 | Template-ready |
| **Existing Services** | 4 | P1 | Optimize only |
| **Company/Legal** | 3 | P1 | Optimize only |
| **Other** | 2 | P1 | Optimize only |

---

## 🚀 Critical Redirects (Set Up BEFORE Going Live)

| Old URL | New URL | Type |
|---------|---------|------|
| `/pricing-table/` | `/pricing/` | 301 redirect |
| `/website-example/` | `/templates/` | 301 redirect |
| `/matjarx-vs-godaddy/` | `/alternatives/matjarx-vs-godaddy/` | 301 redirect |
| `/matjarx-vs-squarespace/` | `/alternatives/matjarx-vs-squarespace/` | 301 redirect |
| `/matjarx-vs-wix/` | `/alternatives/matjarx-vs-wix/` | 301 redirect |

### Broken Redirects to Fix Immediately
- `/set-up-tiktok-ads/` → `/blogs/set-up-tiktok-ads/` (currently causing redirect loop)
- `/setup-payfast-payment-gateway/` → `/blogs/setup-payfast-payment-gateway/` (currently causing redirect loop)

---

## 📝 Page Structure Template

Every page follows this structure:

```
Page Title (for reference)
├── URL: /your-page-slug/
├── Keywords: Primary + Secondary
├── Search Volume & Difficulty
├── H1: Main heading (includes primary keyword)
├── H2s: Major sections (3-5 per page)
├── H3s: Supporting points under H2s (1-2 per H2)
├── H4-H6: Optional supporting details
├── Meta Title: 60 characters max
├── Meta Description: 155-160 characters
└── Content Requirement: Type, word count, special elements
```

---

## 🎯 Phase-Based Implementation Plan

### **Phase 0: Fix What's Broken** (Week 1)
- [ ] Fix 2 broken redirect loops (set-up-tiktok-ads, setup-payfast)
- [ ] Verify all existing redirects work correctly
- [ ] Update .htaccess or hosting redirect rules

### **Phase 1: SaaS Core** (Weeks 2-4)
**Priority P0 Pages - Build These First**
- [x] Home page (optimize existing)
- [ ] /pricing/ (hub page with 5 plan cards)
- [ ] /plans/launch/, /plans/boost/, /plans/growth/, /plans/platinum/, /plans/custom/
- [ ] /templates/ (gallery page)
- [ ] /features/ (product hub)
- [ ] /help/ (support hub)
- [ ] Help subcategories (8 pages)
- [ ] /best-website-builder-pakistan/ (pillar)
- [ ] /alternatives/ (directory hub)
- [ ] /alternatives/matjarx-vs-[3 existing competitors]/ (3 pages)

**Expected Outcome:** Complete SaaS positioning with self-serve pricing and help center

### **Phase 2: Authority & Comparisons** (Weeks 5-8)
**Priority P0-P1 Pages**
- [ ] 7 additional /alternatives/matjarx-vs-[competitor]/ pages
- [ ] 10 industry landing pages (restaurants, real estate, clinics, etc.)
- [ ] 5 major city landing pages (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad)

**Expected Outcome:** Significant SEO authority with competitor/industry/location keyword coverage

### **Phase 3: Full City Coverage** (Weeks 9-12)
**Priority P2 Pages**
- [ ] Remaining 30+ city landing pages
- [ ] All industry-specific sub-pages

**Expected Outcome:** Comprehensive local SEO coverage for all major Pakistani cities

---

## 📊 Keyword Research Priority

**MUST VERIFY with Google Keyword Planner (Pakistan location):**

| Keyword | Current Status | Priority | Estimated Volume |
|---------|----------------|----------|------------------|
| small business website | ✓ Verified | P0 | 90,500/mo (global) |
| website builder Pakistan | Research needed | P0 | — |
| best website builder | Research needed | P0 | — |
| restaurant website Pakistan | Research needed | P1 | — |
| website design [city] | Research needed | P2 | 50-200/mo each |

**Action:** 
1. Open Google Keyword Planner (free)
2. Set location: Pakistan
3. Research each keyword listed in the Excel sheets
4. Update Search Volume & Difficulty columns
5. Prioritize based on realistic volume + low competition

---

## ✍️ Content Brief Guidelines

### For Each Page, You'll Need:

1. **Page Type** (Home/Product/Blog/Comparison/Local)
2. **Target Keyword** (From primary keyword column)
3. **Word Count** (Provided in Content Requirement)
4. **Structure** (H1-H6 headings provided)
5. **Unique Elements** (Testimonials/Comparison table/Case studies)
6. **Internal Links** (3-5 links to related pages)
7. **CTA** (Action button - "Get Started" / "Learn More" / "Contact Sales")

### Content Brief Template

```
PAGE: [Page Title]
URL: [slug]
TARGET KEYWORD: [Primary keyword]
SEARCH VOLUME: [X/month - Pakistan]

STRUCTURE:
H1: [exact heading]
  H2: [section 1]
  H2: [section 2]
  H2: [section 3]
  
WORD COUNT: 800-1,200 words
TYPE: [Service/Comparison/Industry/Local]

KEY ELEMENTS:
- Include: [testimonials/case studies/feature list/comparison table]
- Link to: [/pricing/, /plans/boost/, etc.]
- CTA: [Get Started / Book Demo]

UNIQUE ANGLE: [What makes this different from competitors]
```

---

## 🔗 Internal Linking Strategy

### Link Architecture

```
Home (matjarx.com)
├── /pricing/
│   ├── /plans/launch/
│   ├── /plans/boost/
│   ├── /plans/growth/
│   ├── /plans/platinum/
│   └── /plans/custom/
├── /templates/
├── /features/
├── /help/
│   ├── /help/getting-started/
│   ├── /help/billing-and-plans/
│   ├── /help/website-editor/
│   ├── /help/domains-and-email/
│   ├── /help/ecommerce-and-payments/
│   ├── /help/seo-and-marketing/
│   └── /help/account-and-security/
├── /best-website-builder-pakistan/ (PILLAR)
│   └── links to all /alternatives/ pages
├── /alternatives/ (HUB)
│   ├── /alternatives/matjarx-vs-godaddy/
│   ├── /alternatives/matjarx-vs-squarespace/
│   ├── /alternatives/matjarx-vs-wix/
│   └── [40+ more comparison pages]
├── /website-for-restaurants/
├── /website-for-[industry]/
├── /website-design-karachi/
├── /website-design-[city]/
└── /blogs/ (Blog hub - keep all posts here only)
```

### Linking Rules

1. **Pillar → Alternatives**: Every alternative page links back to /best-website-builder-pakistan/
2. **Service → Plan**: /done-for-you-website/ → /plans/growth/
3. **Industry → Plan**: /website-for-ecommerce/ → /plans/platinum/
4. **City → Local SEO**: /website-design-karachi/ → /help/seo-and-marketing/
5. **Help → Blog**: /help/seo-and-marketing/ → links to relevant /blogs/ posts

---

## 📅 Content Timeline Example

| Week | Focus | Pages | Estimated Time |
|------|-------|-------|-----------------|
| 1 | Fix redirects + plan | 2 | 5 hours |
| 2 | Core pages (Home, Pricing, Plans) | 6 | 20 hours |
| 3 | Help Center | 8 | 25 hours |
| 4 | Templates gallery + Features | 2 | 10 hours |
| 5 | Pillar + Alternatives hub | 2 | 8 hours |
| 6-7 | Top comparison pages | 4 | 30 hours |
| 8 | Industry landings | 10 | 40 hours |
| 9-11 | City pages (programmatic) | 36 | 60 hours |

**Total: ~11 weeks for 61 pages (approximately 10 hours per week)**

---

## 🛠️ Tools & Resources You'll Need

1. **Google Keyword Planner** (free) - Verify keyword volume
2. **Website Builder** (Existing MatjarX platform)
3. **SEO Plugin** (Yoast/Rank Math) - Meta tags, readability
4. **Google Search Console** - Monitor performance
5. **Google Analytics** - Track traffic & behavior
6. **Copywriting AI** (like Claude) - Create content drafts from briefs

---

## ✅ Quality Checklist Before Publishing

- [ ] **URL**: Matches the slug in the spreadsheet (lowercase, hyphens only)
- [ ] **H1**: Includes primary keyword naturally (exactly 1 H1 per page)
- [ ] **Meta Title**: 55-60 characters, includes primary keyword
- [ ] **Meta Description**: 155-160 characters, compelling CTA
- [ ] **Content**: Matches word count requirement (±10%)
- [ ] **Headings**: Follow H2-H6 structure provided
- [ ] **Internal Links**: 3-5 relevant links to other pages
- [ ] **CTA**: Clear call-to-action button present
- [ ] **Images**: High-quality, relevant, with alt text
- [ ] **Mobile**: Responsive and readable on all devices
- [ ] **Speed**: Page loads in <3 seconds
- [ ] **Redirects**: Old URL 301 redirects to new URL (if applicable)

---

## 🎓 Next Steps (Immediate)

### This Week:
1. ✓ Review both Excel files
2. ✓ Note any pages to add/remove
3. [ ] Verify Google Keyword Planner for Pakistan-specific volumes
4. [ ] Fix the 2 broken redirects immediately
5. [ ] Set up 301 redirects for renamed pages

### Next Week:
6. [ ] Create content briefs for Phase 1 pages (15 pages)
7. [ ] Assign writers/content creators
8. [ ] Start building Phase 1 pages

### Following Week:
9. [ ] Launch Phase 1 pages
10. [ ] Monitor performance in GSC
11. [ ] Begin Phase 2 content creation

---

## 📞 Questions & Clarifications Needed

Before you proceed, confirm:

1. **Keyword Volume**: Can you run all keywords through Google Keyword Planner for Pakistan location?
2. **Competition Research**: Should I research competitor pages for each comparison?
3. **Case Studies**: Do you have 5+ customer case studies with metrics to feature?
4. **Testimonials**: Are all Trustpilot reviews accessible for quotes?
5. **Redirect Timeline**: When does the site go live? (impacts redirect urgency)
6. **Content Writer**: Who will write the 61+ pages? (You, agency, AI-assisted?)
7. **Design System**: Should industry/city pages use a consistent template?
8. **Blog Integration**: How many existing blog posts should link into new pages?

---

## 📌 Key Metrics to Track

Once live, monitor these:

- **Click-Through Rate (CTR)** by page (should be 3-5%)
- **Average Position** for target keywords (aim for page 1)
- **Impressions** by page type (pillar pages should get most)
- **Conversion Rate** from each page type (pricing pages = highest)
- **Bounce Rate** (should be <60% for engagement)
- **Pages/Session** (internal linking success indicator)

---

## 🎉 Success Metrics (6 months)

- [ ] All 61 pages published and indexed by Google
- [ ] Pillar page ranking for "best website builder Pakistan"
- [ ] Comparison pages ranking for main competitors
- [ ] 3+ city pages ranking #1-3 for "[city] website design"
- [ ] 25-30% increase in organic traffic
- [ ] Help center reducing support emails by 20%+

---

## 📧 Support & Questions

If you have questions about:
- **Content Structure**: Refer to the Excel sheet headers
- **Keyword Research**: Use Google Keyword Planner (Pakistan location)
- **Internal Linking**: Follow the link architecture diagram
- **Writing Brief**: Use the Content Brief Template provided

---

**Created:** September 3, 2026
**Website:** matjarx.com
**Status:** Ready for Implementation
**Last Updated:** This Document
