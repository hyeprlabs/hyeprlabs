# SEO_LOG.md — Hyepr Labs Technical SEO Optimization

**Date:** 2026-03-07  
**Engineer:** Autonomous SEO Agent  
**Scope:** Full technical and content SEO pass on `src/`

---

## Summary

A complete SEO audit and improvement pass was performed on the hyeprlabs.com codebase. All changes were applied directly to source files. The primary goals were: structured data injection, canonical tag coverage, Twitter card coverage, sitemap correctness, semantic HTML improvements, and AEO (Answer Engine Optimization) content additions.

---

## Changes Made

### 1. New File: `src/components/seo/json-ld.tsx`

**What:** Created a centralized JSON-LD structured data component library.  
**Why:** Schema.org markup is one of the highest-impact SEO signals, enabling rich snippets and improving AI engine discoverability.

Components created:
- **`OrganizationJsonLd`** — Schema.org `Organization` with name, URL, logo, sameAs (social profiles), contactPoint, and foundingDate.
- **`WebSiteJsonLd`** — Schema.org `WebSite` with `SearchAction` potential action (enables Sitelinks search box in Google).
- **`ServiceJsonLd`** — Schema.org `Service` with `OfferCatalog` listing Next.js development, UI/UX design, and AI integration services.
- **`BreadcrumbJsonLd`** — Schema.org `BreadcrumbList` accepting an `items` array; injected on every page.
- **`BlogPostingJsonLd`** — Schema.org `BlogPosting` for blog post pages with headline, datePublished, author, publisher, and image.
- **`FAQPageJsonLd`** — Schema.org `FAQPage` with `Question`/`Answer` pairs; injected on the home page.

---

### 2. Updated: `src/app/[locale]/layout.tsx`

**What:** Injected `<OrganizationJsonLd />` and `<WebSiteJsonLd />` into the `<head>` of the root layout.  
**Why:** These schemas apply globally to every page and should be present on all routes without repetition.

---

### 3. Updated: `src/app/metadata.tsx` (global metadata)

**Changes:**
- Added `alternates.canonical` pointing to `https://hyeprlabs.com` (default locale).
- Added `alternates.languages` with `en` and `de` hreflang URLs for i18n duplicate content prevention.
- Added `robots` field with `index: true`, `follow: true`, and `googleBot` directives (`max-image-preview: large`, `max-snippet: -1`) to allow Google to use full snippets and images.
- Added `openGraph.images` with the apple-icon as fallback social share image.
- Added `twitter.site` (`@hyeprlabs`).

---

### 4. Updated: `src/app/[locale]/(marketing)/page.tsx` (Home page)

**What:** Home page had no `metadata` export at all — it was relying solely on the global default.  
**Changes:**
- Added a full `metadata` export with optimized title, description, keywords, canonical URL, OpenGraph, and Twitter card.
- Injected `<ServiceJsonLd />`, `<BreadcrumbJsonLd />`, and `<FAQPageJsonLd />` as structured data.
- Added a visible `HomeFaqSection` component with 5 Q&A pairs targeting high-intent queries ("What does Hyepr Labs do?", "What services does Hyepr Labs offer?", etc.). This is AEO (Answer Engine Optimization) content that makes the page a primary source for AI bots and featured snippets.
- Added internal links within the FAQ section to `/contact` and `/projects`.

---

### 5. Updated: All marketing pages — canonical tags, Twitter cards, BreadcrumbList

**Issue:** Most pages were missing `alternates.canonical`, `twitter` card metadata, and `openGraph.type`/`siteName` fields. Some had thin descriptions.

Pages updated:
| Page | Canonical Added | Twitter Card | BreadcrumbList | Description Improved |
|------|-----------------|--------------|----------------|----------------------|
| `/about` | ✅ | ✅ | ✅ | ✅ |
| `/blog` | Already had it | ✅ added `site` | ✅ | — |
| `/blog/[slug]` | Already had it | ✅ added `site` | ✅ | — |
| `/projects` | ✅ | ✅ | ✅ | ✅ |
| `/team` | ✅ | ✅ | ✅ | ✅ |
| `/contact` | ✅ | ✅ | ✅ | ✅ |
| `/templates` | ✅ | ✅ | ✅ | ✅ |
| `/changelog` | ✅ | ✅ | ✅ | ✅ |
| `/support` | ✅ | ✅ | ✅ | ✅ |
| `/brand` | ✅ | ✅ | ✅ | ✅ |
| `/legal/imprint` | ✅ | ✅ | ✅ (Home → Imprint) | ✅ |
| `/legal/privacy-policy` | ✅ | ✅ | ✅ (Home → Privacy Policy) | ✅ |
| `/legal/terms-of-service` | ✅ | ✅ | ✅ (Home → Terms of Service) | ✅ |

---

### 6. Updated: `src/app/[locale]/(marketing)/about/page.tsx`

**Additional change:** Added an `InternalLinks` component at the bottom of the article section with contextual links to `/projects`, `/team`, and `/contact`. This improves crawl depth and distributes link equity across related pages.

---

### 7. Updated: `src/app/sitemap.ts`

**Issues found:**
- URLs for legal pages were wrong: `/imprint`, `/privacy-policy`, `/terms-of-service` should be `/legal/imprint`, `/legal/privacy-policy`, `/legal/terms-of-service`.
- Blog post URLs were missing entirely — only the `/blog` index was included.

**Changes:**
- Fixed all three legal page URLs.
- Made the sitemap `async` and integrated `blogCollection` to dynamically include all blog posts (`/blog/[slug]`) with accurate `lastModified` dates from post frontmatter.

---

### 8. Updated: `src/components/marketing/footer.tsx`

**Issue:** Footer navigation links used plain `<a>` tags instead of the i18n-aware `Link` from `@/i18n/navigation`. This caused client-side navigation to bypass the locale router.

**Changes:**
- Replaced all three footer navigation columns (`<div>` with `<a>` links) with semantic `<nav aria-label="...">` elements containing `Link` components from `@/i18n/navigation`.
- Added `aria-label` attributes to each `<nav>` for accessibility and crawler clarity.
- Added `className="col-span-3 w-full md:col-span-1"` to preserve the grid layout.

---

## SEO Issues Fixed

| # | Issue | Fix Applied |
|---|-------|-------------|
| 1 | Home page had no `metadata` export | Added full metadata with canonical, OG, Twitter |
| 2 | 11 of 13 pages missing canonical tags | Added `alternates.canonical` to all pages |
| 3 | 11 of 13 pages missing Twitter cards | Added `twitter` block to all pages |
| 4 | No Schema.org structured data anywhere | Created and injected Organization, WebSite, Service, BreadcrumbList, BlogPosting, FAQPage schemas |
| 5 | No FAQ/AEO content for AI engines | Added 5-question FAQ section to home page with FAQPage JSON-LD |
| 6 | Sitemap had wrong legal URLs (`/imprint` etc.) | Fixed to `/legal/imprint`, `/legal/privacy-policy`, `/legal/terms-of-service` |
| 7 | Sitemap missing all blog post URLs | Made sitemap async, added dynamic blog post entries |
| 8 | Footer nav used `<a>` instead of locale-aware `Link` | Replaced with `Link` from `@/i18n/navigation` |
| 9 | Footer nav used non-semantic `<div>` containers | Replaced with `<nav aria-label="...">` elements |
| 10 | Global metadata missing robots directives | Added `robots` with googleBot `max-image-preview: large` |
| 11 | No hreflang alternates for i18n (en/de) | Added `alternates.languages` to global metadata |
| 12 | Home page missing internal links to key pages | Added contextual internal links in FAQ section and About page |
| 13 | `openGraph.type` and `siteName` missing on most pages | Added to all page metadata objects |
| 14 | `twitter.site` missing on all pages | Added `site: "@hyeprlabs"` to all Twitter card metadata |

---

## Performance Notes

- All images on the site already use `next/image` with `width`/`height` props and descriptive `alt` attributes — no image SEO changes needed.
- The hero image component (`hero-image.tsx`) correctly uses `priority` for LCP images.
- Logo images in `projects-list.tsx` correctly use `next/image`.

---

## Remaining Recommendations (out of scope / require content decisions)

1. **OG images**: Add custom Open Graph images per page (`1200×630px`) for rich social previews. Currently relying on the small apple-icon fallback.
2. **Blog post images**: Add `image` frontmatter to blog posts to enable full OG image support already wired in `generateMetadata`.
3. **FAQ expansion**: Add FAQ sections to `/projects`, `/templates`, and `/services` pages once content is finalized.
4. **Core Web Vitals**: Run Lighthouse to audit CLS, LCP, and FID scores — these affect rankings.
5. **Backlink strategy**: Technical SEO is now solid; outreach and backlink acquisition are the next growth lever.
