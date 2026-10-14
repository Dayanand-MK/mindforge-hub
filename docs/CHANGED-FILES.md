> Historical SEO-release document. For this redesigned platform, use RUN-AND-DEPLOY.md, SCHEMA-AND-MIGRATION.md and PLATFORM-VALIDATION.md. The versioned rules in firebase/ supersede earlier examples.

# Source change list

Compared with the original owner-supplied ZIP. Environment files, dependencies, build output and TypeScript caches are excluded.

## Modified

- `.gitignore`
- `artifacts/api-server/package.json`
- `artifacts/mindforge-hub/index.html`
- `artifacts/mindforge-hub/package.json`
- `artifacts/mindforge-hub/public/opengraph.jpg`
- `artifacts/mindforge-hub/src/App.tsx`
- `artifacts/mindforge-hub/src/components/Footer.tsx`
- `artifacts/mindforge-hub/src/components/Navbar.tsx`
- `artifacts/mindforge-hub/src/components/Toast.tsx`
- `artifacts/mindforge-hub/src/components/WhatsAppButton.tsx`
- `artifacts/mindforge-hub/src/index.css`
- `artifacts/mindforge-hub/src/pages/Admin.tsx`
- `artifacts/mindforge-hub/src/pages/Contact.tsx`
- `artifacts/mindforge-hub/src/pages/Domains.tsx`
- `artifacts/mindforge-hub/src/pages/Home.tsx`
- `artifacts/mindforge-hub/src/pages/HowItWorks.tsx`
- `artifacts/mindforge-hub/src/pages/Portfolio.tsx`
- `artifacts/mindforge-hub/src/pages/Services.tsx`
- `artifacts/mindforge-hub/src/pages/Track.tsx`
- `artifacts/mindforge-hub/src/pages/not-found.tsx`
- `artifacts/mindforge-hub/vercel.json`
- `artifacts/mindforge-hub/vite.config.ts`
- `artifacts/mockup-sandbox/package.json`
- `lib/api-spec/package.json`
- `lib/db/package.json`
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`

## Added

- `README.md`
- `artifacts/mindforge-hub/.env.example`
- `artifacts/mindforge-hub/scripts/build.mjs`
- `artifacts/mindforge-hub/scripts/seo.test.mjs`
- `artifacts/mindforge-hub/scripts/social-card.html`
- `artifacts/mindforge-hub/src/components/Analytics.tsx`
- `artifacts/mindforge-hub/src/components/Seo.tsx`
- `artifacts/mindforge-hub/src/entry-server.tsx`
- `artifacts/mindforge-hub/src/lib/analytics.ts`
- `artifacts/mindforge-hub/src/lib/site.ts`
- `artifacts/mindforge-hub/src/pages/Blog.tsx`
- `artifacts/mindforge-hub/src/pages/Faq.tsx`
- `artifacts/mindforge-hub/src/pages/Privacy.tsx`
- `artifacts/mindforge-hub/src/pages/TrackLookup.tsx`
- `docs/AUDIT.md`
- `docs/HANDOVER.md`
- `docs/PORTFOLIO-REVIEW.md`
- `docs/VALIDATION.md`
- `docs/firestore.rules.example`
- `docs/storage.rules.example`
- `scripts/check-package-manager.mjs`
- `vercel.json`

## Removed

None.
