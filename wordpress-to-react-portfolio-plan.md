# Plan: WordPress to React Portfolio Migration

**Generated**: 2026-08-16  
**Estimated Complexity**: Medium

## Overview

The current site at `emmanuelgemegah.online` is a WordPress portfolio with mostly static content: hero, services, portfolio items, about, experience, skills, testimonials, and contact details.

From first principles, the site needs four things:

1. A content source: where text, project data, images, resume links, and contact details live.
2. A frontend: the public portfolio UI visitors see.
3. A change workflow: how updates are made quickly without manually editing WordPress theme pages.
4. A deployment path: how changes safely reach `emmanuelgemegah.online`.

Recommended approach: build a Next.js frontend first, keep WordPress as a temporary headless CMS through the WordPress REST API, deploy the frontend through a Git-based host, then later decide whether to move content into files or a lighter CMS.

This avoids a risky big-bang rewrite and gives a fast editing workflow early.

## Target Architecture

### Phase 1 Target

- WordPress remains available at the current host.
- Next.js consumes public WordPress REST API data.
- New frontend is deployed to a preview domain first.
- `emmanuelgemegah.online` is switched only after visual and SEO checks pass.

### Phase 2 Target

- Portfolio content is normalized into predictable data structures.
- Codex can update projects, copy, layout, images, and styling directly in the React codebase.
- WordPress is used only if it remains useful as a CMS.

### Possible Final State

Choose one after the migration proves stable:

- Option A: Keep WordPress as CMS, React/Next as frontend.
- Option B: Move content into Markdown/MDX or JSON files in the repo.
- Option C: Move content to a purpose-built headless CMS such as Sanity, Contentful, or Payload.

For this portfolio, Option B is likely the simplest long-term path unless frequent non-technical CMS editing is required.

## Prerequisites

- Access to WordPress admin.
- Access to current domain DNS for `emmanuelgemegah.online`.
- Access to current hosting account.
- GitHub repository for the new frontend.
- Deployment account, preferably Vercel or Netlify.
- A backup/export of the current WordPress site before changes.
- Inventory of all important pages, images, project links, resume files, and SEO metadata.

## Prerequisite Status Audit

**Checked**: 2026-08-16

| Prerequisite | Status | Evidence / Next Action |
| --- | --- | --- |
| Current WordPress site access | Verified | `emmanuelgemegah.online` is live and the WordPress REST API is publicly reachable. |
| Hostinger hPanel access | Verified through Chrome UI | hPanel is open for `emmanuelgemegah.online`; file manager is accessible. Hostinger connector tools are registered locally but did not surface in this running Codex session. |
| Hostinger file server access | Verified through Chrome UI | File Browser is open and `public_html` is visible. |
| Website backup | Verified | Hostinger Backups page shows latest website backup at `2026-08-12 16:53`; automated backups are weekly; next backup is `2026-08-19`. |
| Manual pre-migration backup | Pending user confirmation | Manual backups can be created once every 24 hours. Create one immediately before any destructive hosting/DNS change. |
| GitHub repository | Verified | Private repo created: `gemegah/emmanuel-portfolio-frontend`. |
| Frontend scaffold | Verified | Initial Next.js static-export app builds successfully. |
| Deployment target | Partially complete | Cloudflare Pages project `emmanuel-portfolio-frontend` was created on 2026-08-16. Project URL will be `emmanuel-portfolio-frontend.pages.dev` after first deployment. Build command is `npx next build`; output directory is `out`. |
| First Cloudflare deployment | Blocked on Cloudflare upload auth | Local Wrangler is installed via `npx` but not authenticated. Cloudflare API project creation works through the plugin, but file deployment requires Wrangler login, dashboard upload, or a scoped API token usable by Wrangler/CI. |
| Domain/DNS cutover | Pending | Do not change DNS until Cloudflare preview deploy is verified and a fresh backup exists. |

## Sprint 1: Discovery and Content Inventory

**Goal**: Identify exactly what must be migrated before writing the new frontend.

**Demo/Validation**:

- A content inventory exists.
- Current pages, images, project cards, and contact information are documented.
- Required WordPress REST API endpoints are known.

### Task 1.1: Crawl and inventory public pages

- **Location**: `docs/content-inventory.md`
- **Description**: List current pages and sections: homepage, portfolio details, blog if needed, contact, resume, Figma links, images, testimonials, and project categories.
- **Dependencies**: None
- **Acceptance Criteria**:
  - Every public page intended for migration is listed.
  - Every portfolio project has title, category, summary, image, URL, and case-study status.
- **Validation**:
  - Compare the inventory against the live site navigation.

### Task 1.2: Audit WordPress REST API output

- **Location**: `docs/wordpress-api-audit.md`
- **Description**: Check which data is available from `/wp-json/wp/v2/pages`, `/wp-json/wp/v2/posts`, media endpoints, and any custom post types.
- **Dependencies**: Task 1.1
- **Acceptance Criteria**:
  - Required content fields are marked as available, missing, or hardcoded in theme.
  - Media URLs and featured images can be resolved.
- **Validation**:
  - Fetch representative API responses and confirm data completeness.

### Task 1.3: Decide content ownership model for v1

- **Location**: `docs/content-strategy.md`
- **Description**: Choose whether v1 reads live WordPress data, statically copies data into repo files, or uses a hybrid.
- **Dependencies**: Task 1.2
- **Acceptance Criteria**:
  - One model is selected for launch.
  - Tradeoffs are documented.
- **Validation**:
  - Confirm the selected model supports the desired editing workflow.

## Sprint 2: Next.js Foundation

**Goal**: Create a clean, deployable React/Next.js application.

**Demo/Validation**:

- App runs locally.
- App deploys to a preview URL.
- Basic route, layout, SEO, and styling foundations exist.

### Task 2.1: Initialize Next.js app

- **Location**: repository root
- **Description**: Create a Next.js app with TypeScript, App Router, ESLint, and a simple styling system.
- **Dependencies**: Sprint 1 decision on content model
- **Acceptance Criteria**:
  - `npm run dev` starts locally.
  - `npm run lint` passes.
  - Project has predictable folders for components, sections, data, and utilities.
- **Validation**:
  - Local browser check of homepage route.

### Task 2.2: Define content types

- **Location**: `src/lib/content/types.ts`
- **Description**: Create TypeScript types for hero, services, projects, experience, education, certifications, skills, testimonials, and contact.
- **Dependencies**: Task 1.1
- **Acceptance Criteria**:
  - Types match actual portfolio sections.
  - Missing fields are explicit instead of implicit.
- **Validation**:
  - TypeScript compile succeeds.

### Task 2.3: Add WordPress API client

- **Location**: `src/lib/wordpress/client.ts`
- **Description**: Add a read-only client for WordPress REST API calls, including error handling, response normalization, and cache/revalidation settings.
- **Dependencies**: Task 1.2
- **Acceptance Criteria**:
  - Can fetch pages, posts, media, and selected project data if exposed.
  - Network failures have safe fallback behavior.
- **Validation**:
  - Unit or integration test for representative API response parsing.

### Task 2.4: Add static fallback data

- **Location**: `src/data/portfolio.ts`
- **Description**: Add normalized fallback portfolio data for critical homepage content.
- **Dependencies**: Task 2.2
- **Acceptance Criteria**:
  - Homepage can render even if WordPress API is temporarily unavailable.
  - Data is easy for Codex to edit directly.
- **Validation**:
  - Disable API calls locally and confirm the page still renders.

## Sprint 3: Rebuild the Public Portfolio UI

**Goal**: Recreate the current portfolio in React with cleaner, maintainable components.

**Demo/Validation**:

- Homepage visually matches or improves the current site.
- Core content appears correctly on desktop and mobile.

### Task 3.1: Build global layout and navigation

- **Location**: `src/app/layout.tsx`, `src/components/site-header.tsx`, `src/components/site-footer.tsx`
- **Description**: Build shell, navigation, footer, metadata, font setup, and base responsive layout.
- **Dependencies**: Task 2.1
- **Acceptance Criteria**:
  - Header links scroll or navigate correctly.
  - Footer contains contact information.
  - Metadata includes title and description.
- **Validation**:
  - Desktop and mobile viewport checks.

### Task 3.2: Build homepage sections

- **Location**: `src/components/sections/*`
- **Description**: Implement hero, services, project grid, about, experience, education, certifications, skills, testimonials, and contact sections.
- **Dependencies**: Task 2.2, Task 2.4, Task 3.1
- **Acceptance Criteria**:
  - All major live-site sections exist.
  - Text and project data match inventory.
  - Layout does not depend on WordPress theme markup.
- **Validation**:
  - Compare against current site screenshots.

### Task 3.3: Build project detail routes

- **Location**: `src/app/projects/[slug]/page.tsx`
- **Description**: Create optional case-study pages for portfolio items that need deeper detail.
- **Dependencies**: Task 3.2
- **Acceptance Criteria**:
  - Project cards can link to internal pages or external Figma/live URLs.
  - Missing case studies degrade gracefully.
- **Validation**:
  - Test representative internal and external project links.

### Task 3.4: Add contact call-to-action

- **Location**: `src/components/sections/contact.tsx`
- **Description**: Add clear email, phone, and optional contact form behavior.
- **Dependencies**: Task 3.2
- **Acceptance Criteria**:
  - Email link works.
  - Phone link works on mobile.
  - If a form is added, spam protection and submission destination are defined.
- **Validation**:
  - Manual click tests.

## Sprint 4: Performance, SEO, Accessibility, and Editing Workflow

**Goal**: Make the new site production-quality and easy to update.

**Demo/Validation**:

- Lighthouse checks are healthy.
- Codex can update content through Git.
- SEO metadata and redirects are ready.

### Task 4.1: Optimize images

- **Location**: `public/images/*`, `src/components/*`
- **Description**: Export or migrate images, use optimized image components, add alt text, and remove oversized assets.
- **Dependencies**: Task 3.2
- **Acceptance Criteria**:
  - Important images are locally controlled or reliably loaded.
  - Every meaningful image has alt text.
  - No broken images.
- **Validation**:
  - Browser network panel or build output confirms image loading.

### Task 4.2: Add SEO metadata and social cards

- **Location**: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/projects/[slug]/page.tsx`
- **Description**: Add page titles, descriptions, canonical URLs, Open Graph metadata, and social preview images.
- **Dependencies**: Task 3.3
- **Acceptance Criteria**:
  - Homepage metadata matches portfolio positioning.
  - Project pages have unique metadata where possible.
- **Validation**:
  - Inspect generated metadata in page source.

### Task 4.3: Add redirects

- **Location**: `next.config.ts` or hosting config
- **Description**: Preserve important existing WordPress URLs, especially portfolio detail links and resume links.
- **Dependencies**: Task 1.1, Task 3.3
- **Acceptance Criteria**:
  - Known old URLs resolve to correct new locations.
  - No important indexed page becomes a 404.
- **Validation**:
  - Manual redirect test list.

### Task 4.4: Document the fast-change workflow

- **Location**: `README.md`
- **Description**: Document how to update content, add a project, update images, run locally, and deploy.
- **Dependencies**: Sprint 2 and Sprint 3
- **Acceptance Criteria**:
  - Codex can make common changes from explicit file paths.
  - User can review changes through preview deployments.
- **Validation**:
  - Perform one sample content change and preview it.

## Sprint 5: Deployment and Domain Cutover

**Goal**: Launch the Next.js frontend safely on the production domain.

**Demo/Validation**:

- Production domain serves the new frontend.
- WordPress remains recoverable.
- Rollback path is known.

### Task 5.1: Deploy preview environment

- **Location**: hosting provider project
- **Description**: Connect GitHub repo to Vercel or Netlify and deploy preview builds for every branch/pull request.
- **Dependencies**: Sprint 3
- **Acceptance Criteria**:
  - Every push creates a preview URL.
  - Build command and environment variables are configured.
- **Validation**:
  - Open preview URL and test the portfolio.

### Task 5.2: Configure environment variables

- **Location**: hosting provider settings, `.env.example`
- **Description**: Add WordPress API base URL and any future form/email service keys.
- **Dependencies**: Task 2.3, Task 5.1
- **Acceptance Criteria**:
  - Secrets are not committed to Git.
  - Local and production environments are documented.
- **Validation**:
  - Production build can fetch or fallback correctly.

### Task 5.3: DNS cutover

- **Location**: domain DNS provider
- **Description**: Point `emmanuelgemegah.online` to the new frontend hosting provider after preview approval.
- **Dependencies**: Task 5.1, Task 5.2, Task 4.3
- **Acceptance Criteria**:
  - Apex/root domain and `www` work.
  - HTTPS certificate is active.
  - Old WordPress admin remains accessible through a temporary subdomain if needed.
- **Validation**:
  - Test production URL, HTTPS, redirects, and contact links.

## Testing Strategy

- Use local browser checks for every section.
- Use responsive checks at mobile, tablet, and desktop widths.
- Run lint/type checks before deployment.
- Use a preview deployment for every meaningful change.
- Compare the new site against current screenshots before domain cutover.
- Run Lighthouse or equivalent checks for performance, accessibility, SEO, and best practices.
- Test old URLs after launch to avoid SEO loss.

## Recommended Editing Workflow After Migration

### For layout or design changes

1. Tell Codex what to change.
2. Codex edits React components.
3. Codex runs checks locally.
4. Push to GitHub.
5. Review preview deployment.
6. Merge/deploy to production.

### For content changes

If content is in repo files:

1. Edit `src/data/portfolio.ts` or MDX files.
2. Preview.
3. Push/merge.

If WordPress stays as CMS:

1. Edit content in WordPress.
2. Frontend updates based on cache/revalidation settings.
3. Use Codex only for structural/layout changes.

## Potential Risks and Gotchas

- Some homepage content may be hardcoded inside the WordPress theme and not cleanly exposed through the REST API.
- Portfolio projects may be stored as theme-specific custom post types that require extra API work.
- Images may be referenced through WordPress media URLs; if WordPress is later removed, images must be migrated.
- DNS cutover can break WordPress admin access unless WordPress is moved to a subdomain first.
- Contact forms need a new backend or service; they should not be assumed to work automatically.
- SEO can drop if old URLs are not redirected.
- The visual design may not be exactly reproducible if the original theme uses proprietary widgets or animations.

## Rollback Plan

1. Keep the WordPress site unchanged during frontend development.
2. Deploy the new frontend to a preview URL first.
3. Before DNS cutover, export WordPress and record current DNS settings.
4. If launch fails, revert DNS records to the WordPress host.
5. Keep WordPress hosting active for at least 30 days after launch.

## Decision Needed Before Implementation

The key decision is content ownership:

- If you want maximum speed with Codex, move portfolio content into the React repo as typed data or MDX.
- If you want to keep editing content in a familiar admin UI, keep WordPress as a headless CMS.
- If you want a cleaner CMS than WordPress later, migrate to a headless CMS after the React frontend is already live.

Recommended v1 decision: use a hybrid model. Start with WordPress API where useful, but normalize critical homepage and portfolio content into repo-controlled data so Codex can update the site quickly.
