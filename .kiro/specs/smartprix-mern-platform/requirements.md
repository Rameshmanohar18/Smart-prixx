# Requirements Document

## Introduction

A full-featured Smartprix-like product comparison and price tracking platform built on the MERN stack (MongoDB, Express, React 18 + Vite, Node.js). The platform enables users to browse, compare, and track prices for consumer electronics across multiple online stores. It includes a CMS for editorial articles, a wishlist with price-drop alerts, a background scraping pipeline, full-text search with faceted filtering, a spec-scoring engine, and an admin panel — all deployed as a monorepo with `client/`, `server/`, `scraper/`, and `shared/` packages.

---

## Glossary

- **Platform**: The complete Smartprix-like MERN application described in this document.
- **Client**: The React 18 + Vite frontend application located in `client/`.
- **Server**: The Node.js + Express REST API located in `server/`.
- **Scraper**: The Puppeteer-based price-scraping service located in `scraper/`.
- **Shared**: Common TypeScript types, constants, and utilities in `shared/`.
- **User**: An authenticated end-user with role `user`.
- **Editor**: An authenticated user with role `editor`, permitted to manage articles.
- **Admin**: An authenticated user with role `admin`, permitted to manage all resources.
- **Guest**: An unauthenticated visitor.
- **Product**: A consumer-electronics item with specs, images, and store listings.
- **Store_Listing**: A record of a Product's price and availability at a specific retailer.
- **Price_History**: A time-series record of a Product's price at a specific store, retained for 90 days.
- **Wishlist_Item**: A User's saved Product with an optional price-alert threshold.
- **Article**: An editorial piece (review, news, guide) managed through the CMS.
- **Review**: A user-submitted rating and written evaluation of a Product.
- **Spec_Score**: A computed 0–100 score representing a Product's specification quality within its category.
- **Compare_Bar**: A persistent UI element allowing side-by-side comparison of up to 4 Products.
- **Alert_Job**: A BullMQ background job that evaluates Wishlist_Items and dispatches price-drop notifications.
- **Scrape_Job**: A BullMQ background job that fetches current prices from retailer pages via Puppeteer.
- **Access_Token**: A short-lived JWT (15-minute TTL) used to authenticate API requests.
- **Refresh_Token**: A long-lived JWT (7-day TTL) used to obtain new Access_Tokens.
- **Redis**: The in-memory data store used for caching and BullMQ job queues.
- **Atlas_Search**: MongoDB Atlas Search used for full-text product and article search.
- **Cloudinary**: The cloud image storage and transformation service.
- **FCM**: Firebase Cloud Messaging, used for browser push notifications.
- **Nodemailer**: The email-sending library using Gmail SMTP.
- **Spec_Scoring_Engine**: The server-side module that computes Spec_Score values per category.
- **Rate_Limiter**: Express middleware that restricts request frequency per IP or user.

---

## Requirements

### Requirement 1: Monorepo Project Structure

**User Story:** As a developer, I want the codebase organized as a monorepo with clearly separated packages, so that client, server, scraper, and shared code can be developed and deployed independently.

#### Acceptance Criteria

1. THE Platform SHALL organize source code into four top-level directories: `client/`, `server/`, `scraper/`, and `shared/`.
2. THE Platform SHALL provide a root `package.json` with workspace scripts to install dependencies and run all packages concurrently during development.
3. THE `shared/` package SHALL export TypeScript type definitions for all database models, API request/response shapes, and constants used by both Client and Server.
4. THE Platform SHALL include a `docker-compose.yml` that defines services for MongoDB, Redis, the Server, and the Scraper.
5. THE Platform SHALL include a GitHub Actions CI/CD workflow that runs lint, tests, and build steps on every pull request targeting the main branch.

---

### Requirement 2: Authentication and Authorization

**User Story:** As a User, I want to register, log in, and stay authenticated across sessions, so that I can access personalized features like wishlists and price alerts.

#### Acceptance Criteria

1. WHEN a Guest submits a valid registration payload `{ name, email, password }`, THE Server SHALL create a User record with a bcrypt-hashed password, issue an Access_Token and a Refresh_Token, and return `{ user, accessToken, refreshToken }` with HTTP 201.
2. IF a Guest submits a registration payload with an email that already exists, THEN THE Server SHALL return HTTP 409 with a descriptive error message.
3. WHEN a Guest submits valid credentials `{ email, password }`, THE Server SHALL verify the password hash, issue a new Access_Token and Refresh_Token, store the Refresh_Token on the User record, and return `{ user, accessToken, refreshToken }` with HTTP 200.
4. IF a Guest submits invalid credentials, THEN THE Server SHALL return HTTP 401 with a descriptive error message.
5. WHEN a client submits a valid `{ refreshToken }`, THE Server SHALL validate the token, rotate it by issuing a new Refresh_Token, invalidate the old one on the User record, and return `{ accessToken }` with HTTP 200.
6. IF a client submits an expired or invalid `{ refreshToken }`, THEN THE Server SHALL return HTTP 401.
7. WHEN an authenticated User calls `POST /api/auth/logout` with a valid Access_Token, THE Server SHALL clear the stored Refresh_Token from the User record and return HTTP 200.
8. WHEN an authenticated User calls `GET /api/auth/me` with a valid Access_Token, THE Server SHALL return the User's profile data excluding the password field.
9. THE Server SHALL enforce role-based access control so that endpoints designated Admin-only return HTTP 403 when called by a User or Editor.
10. THE Server SHALL enforce role-based access control so that endpoints designated Editor-or-Admin return HTTP 403 when called by a User.
11. THE Access_Token SHALL expire after 15 minutes and THE Refresh_Token SHALL expire after 7 days.

---

### Requirement 3: Product Catalog

**User Story:** As a User, I want to browse and filter a catalog of consumer-electronics products, so that I can find products that match my needs and budget.

#### Acceptance Criteria

1. WHEN a client calls `GET /api/products` with optional query parameters `category`, `brand`, `minPrice`, `maxPrice`, `page`, `limit`, and `sort`, THE Server SHALL return a paginated list of active Products matching all supplied filters.
2. THE Server SHALL default `page` to 1 and `limit` to 20 when those parameters are absent.
3. WHEN a client calls `GET /api/products/:slug`, THE Server SHALL return the full Product document including all Store_Listings, specs, and the current Spec_Score.
4. IF a client calls `GET /api/products/:slug` with a slug that does not match any active Product, THEN THE Server SHALL return HTTP 404.
5. WHEN a client calls `GET /api/products/trending` with optional `category` and `limit` parameters, THE Server SHALL return Products sorted by `viewCount` descending within the last 7 days.
6. WHEN a client calls `GET /api/products/deals`, THE Server SHALL return Products whose current `lowestPrice` is at least 10% below their 30-day average price, sorted by percentage drop descending.
7. WHEN an Admin calls `POST /api/products` with a valid product payload, THE Server SHALL create the Product, compute its Spec_Score, and return the created document with HTTP 201.
8. WHEN an Admin calls `PUT /api/products/:id` with a valid update payload, THE Server SHALL update the Product, recompute its Spec_Score if specs changed, and return the updated document.
9. WHEN an Admin calls `DELETE /api/products/:id`, THE Server SHALL set the Product's `isActive` flag to `false` and return HTTP 200.
10. WHEN a client retrieves a Product detail page, THE Server SHALL increment the Product's `viewCount` by 1.
11. THE Server SHALL cache `GET /api/products` responses in Redis with a TTL of 5 minutes, keyed by the full query string.
12. THE Server SHALL cache `GET /api/products/:slug` responses in Redis with a TTL of 10 minutes.
13. WHEN a Product is created or updated by an Admin, THE Server SHALL invalidate all cached entries for that Product's slug and the product-list cache.

---

### Requirement 4: Price History Tracking

**User Story:** As a User, I want to view the price history of a product across stores, so that I can decide the best time to buy.

#### Acceptance Criteria

1. WHEN a client calls `GET /api/prices/:productId/history` with optional `store` and `days` parameters, THE Server SHALL return Price_History records for the specified Product filtered by store and time range.
2. THE Server SHALL default `days` to 30 when the parameter is absent.
3. WHEN a client calls `GET /api/prices/:productId/lowest`, THE Server SHALL return the single lowest Price_History record ever recorded for that Product across all stores.
4. THE Platform SHALL automatically delete Price_History records older than 90 days using a MongoDB TTL index on the `recordedAt` field.
5. WHEN an Admin calls `POST /api/prices/trigger-scrape` with a valid product ID, THE Server SHALL enqueue a Scrape_Job for that Product in the BullMQ queue and return HTTP 202.
6. THE Client SHALL render a Recharts LineChart on the Product detail page displaying price over time per store, with each store represented as a distinct colored line.

---

### Requirement 5: Product Comparison

**User Story:** As a User, I want to compare up to 4 products side by side, so that I can evaluate their specifications and prices before making a purchase decision.

#### Acceptance Criteria

1. WHEN a client calls `GET /api/products/compare?ids=id1,id2,id3,id4`, THE Server SHALL return the full documents for all requested Products along with a `specDiff` map indicating which spec fields differ across the set.
2. IF a client calls `GET /api/products/compare` with fewer than 2 or more than 4 product IDs, THEN THE Server SHALL return HTTP 400 with a descriptive error message.
3. THE Client SHALL maintain a `compareSlice` in Redux with a maximum of 4 Product items.
4. WHEN a User adds a Product to the compare list and the list already contains 4 items, THE Client SHALL display an error notification and reject the addition.
5. THE Client SHALL render a persistent Compare_Bar at the bottom of the viewport showing thumbnails of all Products currently in the compare list.
6. THE Client SHALL render a CompareTable on the `/compare` page that displays all spec fields as rows and Products as columns, with cells highlighted where spec values differ.
7. WHEN a User removes a Product from the Compare_Bar, THE Client SHALL update the `compareSlice` and re-render the Compare_Bar immediately.

---

### Requirement 6: Search and Discovery

**User Story:** As a User, I want to search for products and articles by keyword with faceted filters, so that I can quickly find relevant results.

#### Acceptance Criteria

1. WHEN a client calls `GET /api/search?q=<query>` with optional `category`, `brand`, `minPrice`, and `maxPrice` parameters, THE Server SHALL query Atlas_Search and return matching Products with facet counts for category and brand.
2. WHEN a client calls `GET /api/search/suggestions?q=<query>`, THE Server SHALL return up to 10 autocomplete suggestions derived from Product names and brands matching the prefix.
3. THE Server SHALL return search results within 500ms for queries against an index of up to 100,000 Products.
4. IF a client calls `GET /api/search` without a `q` parameter, THEN THE Server SHALL return HTTP 400 with a descriptive error message.
5. THE Client SHALL display search results with facet filter controls in a sidebar, allowing Users to refine results without reloading the page.
6. THE Client SHALL display autocomplete suggestions in a dropdown beneath the search input as the User types, with a debounce of 300ms.

---

### Requirement 7: Wishlist and Price Alerts

**User Story:** As a User, I want to save products to a wishlist and set price-alert thresholds, so that I am notified when a product's price drops to my target.

#### Acceptance Criteria

1. WHEN an authenticated User calls `GET /api/wishlist`, THE Server SHALL return all Wishlist_Items belonging to that User, each populated with the current Product data.
2. WHEN an authenticated User calls `POST /api/wishlist` with `{ productId, alertPrice? }`, THE Server SHALL create a Wishlist_Item and return it with HTTP 201.
3. IF an authenticated User calls `POST /api/wishlist` with a `productId` already in their wishlist, THEN THE Server SHALL return HTTP 409.
4. WHEN an authenticated User calls `PATCH /api/wishlist/:id/alert` with `{ alertPrice, alertEnabled }`, THE Server SHALL update the alert settings on the Wishlist_Item and return the updated item.
5. WHEN an authenticated User calls `DELETE /api/wishlist/:id`, THE Server SHALL remove the Wishlist_Item and return HTTP 200.
6. WHILE the Alert_Job is running, THE Server SHALL evaluate all Wishlist_Items where `alertEnabled` is `true` and the Product's current `lowestPrice` is less than or equal to `alertPrice`.
7. WHEN the Alert_Job identifies a qualifying Wishlist_Item, THE Server SHALL send a price-drop email via Nodemailer to the User's registered email address containing the Product name, current price, and a direct link.
8. WHEN the Alert_Job identifies a qualifying Wishlist_Item and the User has a stored `fcmToken`, THE Server SHALL send a push notification via FCM containing the Product name and current price.
9. WHEN the Alert_Job dispatches a notification for a Wishlist_Item, THE Server SHALL update the `notifiedAt` field on that Wishlist_Item to the current timestamp to prevent duplicate notifications within 24 hours.

---

### Requirement 8: Background Scraping Pipeline

**User Story:** As an Admin, I want product prices to be automatically scraped from Amazon, Flipkart, and Croma every 30 minutes, so that price data stays current without manual intervention.

#### Acceptance Criteria

1. THE Scraper SHALL use Puppeteer in headless mode to extract the current price and in-stock status from Amazon, Flipkart, and Croma product pages.
2. THE Scraper SHALL be scheduled via node-cron to run every 30 minutes for all active Products.
3. WHEN the Scraper successfully retrieves a price for a Product at a store, THE Scraper SHALL create a new Price_History record and update the corresponding Store_Listing on the Product document.
4. WHEN the Scraper successfully retrieves a price, THE Scraper SHALL update the Product's `lowestPrice` and `highestPrice` fields if the new price is outside the current range.
5. IF the Scraper encounters an error fetching a product page, THEN THE Scraper SHALL log the error with the product ID, store name, and timestamp, and continue processing remaining products.
6. THE Scraper SHALL run as an isolated Docker container defined in `docker-compose.yml`.
7. WHEN an Admin triggers a manual scrape via `POST /api/prices/trigger-scrape`, THE Server SHALL enqueue a high-priority Scrape_Job in BullMQ and THE Scraper SHALL process it within 60 seconds.
8. THE Scraper SHALL respect a minimum delay of 2 seconds between consecutive requests to the same retailer domain to avoid rate limiting.

---

### Requirement 9: Spec Scoring Engine

**User Story:** As a User, I want to see a spec score for each product, so that I can quickly gauge its overall quality relative to its category.

#### Acceptance Criteria

1. THE Spec_Scoring_Engine SHALL compute a Spec_Score between 0 and 100 for each Product based on its category using the defined weighted formula.
2. FOR the `mobile` category, THE Spec_Scoring_Engine SHALL apply weights: RAM 15%, Processor 20%, Battery 15%, Camera 15%, Display 15%, OS 5%, Connectivity 5%, Storage 10%.
3. FOR the `laptop` category, THE Spec_Scoring_Engine SHALL apply weights: CPU 25%, RAM 15%, GPU 20%, Storage 10%, Display 15%, and remaining specs 15%.
4. FOR the `tv` category, THE Spec_Scoring_Engine SHALL apply weights: Resolution 25%, Size 20%, SmartOS 15%, HDR 20%, and remaining specs 20%.
5. FOR the `ac` category, THE Spec_Scoring_Engine SHALL apply weights: StarRating 30%, Capacity 20%, Inverter 20%, Features 30%.
6. WHEN a Product is created or its specs are updated, THE Spec_Scoring_Engine SHALL recompute and persist the Spec_Score on the Product document.
7. THE Client SHALL display the Spec_Score as a visual gauge or progress bar on the Product detail page and Product cards.

---

### Requirement 10: CMS and Articles

**User Story:** As an Editor, I want to create and publish articles (reviews, news, guides), so that users can read editorial content alongside product data.

#### Acceptance Criteria

1. WHEN a client calls `GET /api/articles?status=published` with optional `tag`, `page`, and `limit` parameters, THE Server SHALL return a paginated list of published Articles sorted by `publishedAt` descending.
2. WHEN a client calls `GET /api/articles/:slug`, THE Server SHALL return the full Article document along with up to 3 related Articles sharing at least one tag.
3. IF a client calls `GET /api/articles/:slug` with a slug that does not match any Article, THEN THE Server SHALL return HTTP 404.
4. WHEN an Editor or Admin calls `POST /api/articles` with a valid article payload, THE Server SHALL create the Article with status `draft` and return it with HTTP 201.
5. WHEN an Editor or Admin calls `PUT /api/articles/:id` with a valid update payload, THE Server SHALL update the Article and return the updated document.
6. WHEN an Admin calls `DELETE /api/articles/:id`, THE Server SHALL set the Article's status to `archived` and return HTTP 200.
7. THE Client SHALL render article body content produced by the TipTap rich-text editor, supporting headings, bold, italic, links, images, and ordered/unordered lists.
8. THE Server SHALL cache `GET /api/articles` responses in Redis with a TTL of 5 minutes.

---

### Requirement 11: User Reviews

**User Story:** As a User, I want to submit and read reviews for products, so that I can share my experience and benefit from others' opinions.

#### Acceptance Criteria

1. WHEN a client calls `GET /api/reviews/:productId` with optional `page` and `limit` parameters, THE Server SHALL return a paginated list of Reviews for that Product along with the computed `avgRating`.
2. WHEN an authenticated User calls `POST /api/reviews/:productId` with `{ rating, title, body, pros, cons }`, THE Server SHALL create the Review and update the Product's `avgRating` and `reviewCount` fields atomically.
3. IF an authenticated User calls `POST /api/reviews/:productId` for a Product they have already reviewed, THEN THE Server SHALL return HTTP 409.
4. WHEN an Admin calls `DELETE /api/reviews/:reviewId`, THE Server SHALL remove the Review and recompute the Product's `avgRating` and `reviewCount`.
5. THE Server SHALL validate that `rating` is an integer between 1 and 5 inclusive; IF the value is outside this range, THEN THE Server SHALL return HTTP 400.

---

### Requirement 12: User Profile Management

**User Story:** As a User, I want to view and update my profile, so that I can keep my personal information and notification preferences current.

#### Acceptance Criteria

1. WHEN a client calls `GET /api/users/:id/profile`, THE Server SHALL return the User's public profile data (name, avatar, review count) excluding sensitive fields.
2. WHEN an authenticated User calls `PUT /api/users/:id/profile` with `{ name, avatar, fcmToken }`, THE Server SHALL update the User record and return the updated profile.
3. IF an authenticated User calls `PUT /api/users/:id/profile` for a different user's ID, THEN THE Server SHALL return HTTP 403.
4. WHEN an authenticated User calls `PUT /api/users/:id/password` with `{ currentPassword, newPassword }`, THE Server SHALL verify `currentPassword` against the stored hash, hash `newPassword` with bcrypt, update the record, and return HTTP 200.
5. IF the `currentPassword` does not match the stored hash, THEN THE Server SHALL return HTTP 401.
6. WHEN an Admin calls `GET /api/users`, THE Server SHALL return a paginated list of all Users excluding password fields.
7. WHEN an authenticated User uploads an avatar image, THE Server SHALL upload the file via Multer to Cloudinary and store the returned URL on the User record.

---

### Requirement 13: Frontend Application Structure

**User Story:** As a User, I want a fast, responsive single-page application, so that I can navigate the platform without full-page reloads.

#### Acceptance Criteria

1. THE Client SHALL implement client-side routing using React Router v6 with the following routes: `/` (Home), `/category/:slug` (Category), `/product/:slug` (ProductDetail), `/compare` (Compare), `/search` (Search), `/wishlist` (Wishlist), `/news` (News), `/news/:slug` (ArticleDetail), `/login` (Login), `/register` (Register), `/profile` (Profile).
2. THE Client SHALL use Redux Toolkit with an `authSlice` (user, accessToken, isLoading, error), a `compareSlice` (items array, max 4), and a `wishlistSlice` (items array).
3. THE Client SHALL use RTK Query for all API communication, with a `productApi` service covering all product, price, search, wishlist, article, review, and user endpoints.
4. THE Client SHALL implement a `ProtectedRoute` component that redirects unauthenticated Users to `/login` when they attempt to access `/wishlist` or `/profile`.
5. THE Client SHALL automatically attach the Access_Token as a Bearer header on all authenticated RTK Query requests.
6. WHEN an RTK Query request returns HTTP 401, THE Client SHALL attempt a token refresh using the stored Refresh_Token; IF the refresh succeeds, THE Client SHALL retry the original request; IF the refresh fails, THE Client SHALL clear auth state and redirect to `/login`.
7. THE Client SHALL be styled with Tailwind CSS and SHALL be fully responsive across mobile (≥320px), tablet (≥768px), and desktop (≥1280px) viewport widths.
8. THE Client SHALL render a persistent Navbar with a search bar, category navigation links, a Compare_Bar toggle, and auth controls (login/register or user avatar + logout).
9. THE Client SHALL render a persistent Footer with links to categories, editorial pages, and legal pages.

---

### Requirement 14: Image Upload

**User Story:** As an Admin, I want to upload product and article images, so that visual content is stored reliably and served via CDN.

#### Acceptance Criteria

1. WHEN an Admin uploads a product image, THE Server SHALL accept the file via Multer, upload it to Cloudinary, and store the returned secure URL in the Product's `images` array.
2. WHEN an Editor or Admin uploads an article cover image, THE Server SHALL accept the file via Multer, upload it to Cloudinary, and store the returned secure URL in the Article's `coverImage` field.
3. THE Server SHALL reject uploads where the file MIME type is not `image/jpeg`, `image/png`, or `image/webp`, returning HTTP 415.
4. THE Server SHALL reject uploads where the file size exceeds 5 MB, returning HTTP 413.

---

### Requirement 15: Security and Infrastructure

**User Story:** As an operator, I want the platform to be secure and production-ready, so that it can be deployed safely and withstand common web attacks.

#### Acceptance Criteria

1. THE Server SHALL apply Helmet.js middleware to set secure HTTP response headers on all responses.
2. THE Server SHALL apply CORS middleware configured to allow requests only from the Client's origin domain.
3. THE Server SHALL apply the Rate_Limiter to all `/api/auth` endpoints, allowing a maximum of 10 requests per IP per 15-minute window.
4. THE Server SHALL validate all incoming request bodies using Joi or Zod schemas; IF validation fails, THEN THE Server SHALL return HTTP 400 with field-level error details.
5. THE Server SHALL store all secrets (JWT secret, MongoDB URI, Redis URL, Cloudinary credentials, FCM service account, Gmail credentials) exclusively in environment variables and SHALL NOT commit them to source control.
6. THE Platform SHALL include a `.env.example` file listing all required environment variable keys with placeholder values.
7. THE Client SHALL be deployable to Vercel and THE Server SHALL be deployable to Railway using the configurations defined in the repository.
8. THE Server SHALL log all unhandled errors with stack traces to stdout in a structured JSON format.

---

### Requirement 16: SEO and Discoverability

**User Story:** As a content manager, I want product and article pages to be SEO-optimized, so that the platform ranks well in search engines and attracts organic traffic.

#### Acceptance Criteria

1. THE Client SHALL render JSON-LD structured data (`Product` schema for product pages, `Article` schema for article pages) in a `<script type="application/ld+json">` tag in the document `<head>`.
2. THE Client SHALL set unique `<title>` and `<meta name="description">` tags for each page using React Helmet or an equivalent head-management library.
3. THE Server SHALL serve a dynamically generated `sitemap.xml` listing all active Product slugs and published Article slugs.
4. THE Server SHALL serve a `robots.txt` file that allows all crawlers and references the sitemap URL.
