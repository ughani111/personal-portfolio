# Usman Ghani Portfolio

Production-ready personal portfolio built with Next.js App Router, React, strict TypeScript, Tailwind CSS, and Motion for React. The site is static-first, content-driven, SEO-ready, and structured so it can evolve into a larger personal platform later.

## Project overview

- One-page editorial portfolio for Usman Ghani
- Typed content stored in `apps/web/src/content`
- Reusable UI, layout, and motion components in `apps/web/src/components`
- Static-first contact form adapter with external-endpoint or `mailto:` fallback
- SEO metadata, JSON-LD, sitemap, robots, manifest, OG/Twitter images, legal placeholder routes
- Unit tests with Vitest and smoke tests with Playwright

## Technology stack

- Next.js 14 App Router
- React 18
- TypeScript strict mode
- Tailwind CSS 4
- Motion for React via `motion/react`
- Lucide React
- Zod
- ESLint
- Prettier
- Vitest
- Playwright

## Installation

```bash
npm install
```

## Development command

```bash
npm run dev
```

The app runs from `apps/web`.

## Production build

```bash
npm run build
npm run start
```

## Static export instructions

Static export is supported through the `STATIC_EXPORT` environment variable:

```bash
STATIC_EXPORT=true npm run build
```

This enables Next.js static output for static hosting scenarios. The contact form remains static-safe because it posts to an external endpoint when configured or falls back to `mailto:`.

## Vercel deployment

- Set the project root to `apps/web` or deploy from the repo root and use the existing scripts.
- Configure the environment variables from `.env.example`.
- Replace placeholder assets before production launch.

## Netlify or Cloudflare deployment considerations

- Use `STATIC_EXPORT=true` if you need a pure static export.
- If you later add serverless routes, remove static export mode and deploy on a platform that supports Next.js functions.
- Keep image paths local inside `apps/web/public`.

## Environment variables

Copy `.env.example` to `.env` and update values:

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@your-domain.com
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=
NEXT_PUBLIC_ANALYTICS_PROVIDER=
NEXT_PUBLIC_ANALYTICS_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
STATIC_EXPORT=false
```

Notes:

- `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` is optional.
- `NEXT_PUBLIC_ANALYTICS_PROVIDER` currently supports `plausible` or `umami`.
- Do not expose secrets through `NEXT_PUBLIC_*`.

## Replacing profile images

Real image slots expected by the app:

- `apps/web/public/images/profile/usman-hero.webp`
- `apps/web/public/images/profile/usman-about.webp`
- `apps/web/public/images/profile/usman-contact.webp`

If those files are missing, local SVG placeholders are used automatically.

## Adding projects

Edit `apps/web/src/content/projects.ts`.

Each project supports:

- `slug`
- `title`
- `shortDescription`
- `longDescription`
- `role`
- `period`
- `location`
- `technologies`
- `responsibilities`
- `challenge`
- `approach`
- `outcome`
- `images`
- `imageAlt`
- `externalUrl`
- `repositoryUrl`
- `featured`
- `published`
- `confidential`
- `draft`

Projects marked `draft` or `confidential` are filtered out automatically.

## Adding experience

Edit `apps/web/src/content/experience.ts`.

The achievements section derives real counts from this data, so keep date fields accurate.

## Adding testimonials

Edit `apps/web/src/content/testimonials.ts`.

Only testimonials with real content and `consentGiven: true` will render.

## Adding approved friends or community members

Edit `apps/web/src/content/community.ts`.

Only entries with `consentGiven: true` will render.

## Updating social links

Edit `apps/web/src/content/social-links.ts`.

Rules:

- Set `enabled: true` only when the URL is real and public.
- Leave unknown links disabled.
- Do not use `#` placeholders.

## Adding the CV

Place the final PDF here:

- `apps/web/public/documents/usman-ghani-cv.pdf`

If the file is absent, the hero button degrades safely instead of producing a broken link.

## Updating SEO metadata

Primary metadata is configured in:

- `apps/web/src/app/layout.tsx`
- `apps/web/src/lib/seo.ts`
- `apps/web/src/lib/structured-data.ts`

## Setting the production domain

Update:

- `NEXT_PUBLIC_SITE_URL`

This affects canonical URLs, Open Graph URLs, sitemap entries, and structured data.

## Connecting a contact-form provider

Set:

- `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`

Expected behavior:

- The contact form sends a JSON `POST` request to the endpoint.
- If the endpoint is not configured, the form falls back to `mailto:`.
- The UI already includes validation, honeypot protection, loading, success, and error states.

## Enabling optional analytics

Supported providers:

- `plausible`
- `umami`

Set:

- `NEXT_PUBLIC_ANALYTICS_PROVIDER`
- `NEXT_PUBLIC_ANALYTICS_ID`

Analytics stays disabled when these variables are empty.

## Running tests

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
```

## Accessibility and reduced-motion notes

- The page includes a skip link, semantic landmarks, visible focus states, and keyboard-accessible navigation.
- Motion is wrapped in `MotionConfig` with user motion preferences respected.
- CSS also disables marquee and ambient animation when `prefers-reduced-motion: reduce` is active.

## Pre-launch checklist

### Replace before launch

- Production domain
- Public contact email
- Profile photographs
- Social links
- CV file
- Project screenshots
- Real testimonials with permission
- Approved community photographs
- Travel list
- Privacy content
- Impressum content
- Search Console verification
- Contact-form endpoint

### Functional checks

- `npm run build` succeeds
- `npm run lint` succeeds
- `npm run typecheck` succeeds
- `npm run test` succeeds
- `npm run test:e2e` succeeds
- Contact form sends correctly
- All anchor links work
- Real assets replace placeholders cleanly
- No placeholder legal text remains in production
