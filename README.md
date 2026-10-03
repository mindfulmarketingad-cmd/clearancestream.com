# ClearanceStream.com

Gaming PC hidden deals and clearances, powered by live Amazon data. Built with
Next.js 16 (App Router), statically rendered with daily incremental
regeneration.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in real values, never commit them
npm run dev
```

| Variable | Purpose |
| --- | --- |
| `AMAZON_CREDENTIAL_ID` / `AMAZON_CREDENTIAL_SECRET` | Amazon Creators API OAuth credentials (Associates Central, Tools, Creators API) |
| `AMAZON_CREDENTIAL_VERSION` | `3.1` for Login-with-Amazon credentials in North America |
| `AMAZON_PARTNER_TAG` | Associates tracking ID. Defaults to `mindfulmar026-20` |
| `AMAZON_MARKETPLACE` | `www.amazon.com` |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form delivery via Resend |

On Vercel, add these under Project Settings, Environment Variables.

## Data

- `lib/amazon/creators-api.ts` is the Creators API client (PA-API 5 was retired in 2026).
  It runs server-side only; credentials never reach the browser.
- `lib/deals.ts` pulls each brand's full Amazon catalog (Computers, Electronics, Video Games),
  keeps only items sold under that brand and discounted 20 to 50% below Amazon's reference
  price (`SITE.minDiscount` / `SITE.maxDiscount` in `lib/site.ts`), tags gaming PCs, and caches
  results for one hour. Total API failures are not cached.
- There is no sample or placeholder data. If Amazon returns nothing, pages show an empty
  state and product URLs return 404.
- Product URLs end in the lowercase ASIN (`/deals/corsair/<title>-b0xxxxxxxx`), so they keep
  resolving if Amazon edits a title. A stale slug 308-redirects to the current one.

## Categories

`lib/categories.ts` defines the categories (Gaming PCs, Laptops, Keyboards, Mice, Headsets,
Monitors, Controllers & Racing Wheels, Streaming Gear, PC Components, Accessories). Each
product is assigned one by title; order in the list decides ties.

## Refresh cadence

Prices refresh every 24 hours (`SITE.revalidate`), the longest Amazon's API terms allow
product data to be cached. Each refresh is at most ~39 API calls at 1 request/second.

## Adding a brand

Add an entry to `lib/brands.ts` (queries, include/exclude filters, editorial copy, FAQs).
Brand pages, navigation, sitemaps, and search update automatically.

## Adding a blog post or author

Create `lib/blog/<slug>.tsx` exporting a `Post` and add it to `POSTS` in `lib/blog/index.ts`.
Authors live in `lib/blog/authors.ts`.

## URL and internal linking structure

```
/                               Home: links to every hub, brands, guides, popular searches
├── /deals                      Deals hub (all live deals)
│   └── /deals/[brand]/[slug]   Product: breadcrumb Home > Brands > Brand > Category > Product
│       (/deals/[brand] 308-redirects to /brands/[brand])
├── /brands                     Brands hub
│   ├── /brands/[brand]         Brand: deals + guide, category links, guides, searches
│   └── /brands/[brand]/[cat]   Brand category (e.g. /brands/razer/mice); empty ones are noindex
├── /blog                       Blog hub
│   ├── /blog/[slug]            Post: links to brands, deals, other post, author
│   └── /author/[author]        Author profile (/author redirects to /blog)
├── /search                     Search hub
│   └── /search/[query]         Results; curated popular searches are indexable,
│                               all other queries are noindex,follow
└── /about /contact /disclaimer /privacy /terms /sitemap, plus /sitemap.xml
```

## Regenerating the logo and icons

`npm run icons` rebuilds the favicon set, logo, and Open Graph image from `scripts/generate-icons.mjs`.
