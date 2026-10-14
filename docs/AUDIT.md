> Historical SEO-release document. For this redesigned platform, use RUN-AND-DEPLOY.md, SCHEMA-AND-MIGRATION.md and PLATFORM-VALIDATION.md. The versioned rules in firebase/ supersede earlier examples.

# Source audit — 13 October 2026

Baseline: user-supplied mindforge-hub-main.zip, retained unchanged in Downloads. No Git history or deployment access was supplied. Prior prompts in attached_assets are historical source material, not new instructions.

## Existing structure
React 19.1, Vite 7 (lockfile), TypeScript 5.9, Wouter client-side routes, Tailwind 4, Radix UI, pnpm workspace/catalog/lockfile. Public routes: /, /services, /domains, /portfolio, /how-it-works, /contact. Private flows: /admin and /track/:id. Firebase Auth (Google), Firestore leads/clients/paymentProofs and Storage screenshots are active code dependencies. Express API exposes only healthz; PostgreSQL/Drizzle scaffolding is not used by the public frontend. No checkout provider.

## Useful functionality to retain
Purple glass styling, logo, responsive layouts, service descriptions and existing price amounts, public routes, Firebase lead receipt, admin lead/client management, manual payment proof workflow. Static source inspection does not prove these work against the live Firebase project.

## Findings before edits
- Single generic HTML title/description; no canonicals, social metadata, sitemap, robots, or structured data. Client-only content and catch-all Vercel rewrite cause weak initial HTML and soft 404s.
- Placeholder WhatsApp number differs from footer; owner confirmed footer number during this task.
- Unverified testimonials, 500+ projects, accuracy percentages, 100% originality, 24/7 support and response-time promises. Hardware/IoT advertising conflicts with scope. Pricing is historical and must be confirmed, not silently changed.
- Labels not associated with inputs, unnamed icon buttons, zoom disabled, motion lacks reduced-motion support, logo lacks dimensions.
- No analytics or consent implementation. No spam protection in lead form.
- Firebase configuration is eagerly imported on public pages. ZIP includes .env; no env ignore entries. Firebase web config is public by design, but file must be excluded from redistributable source. No security rules included: live authorization cannot be assessed. Admin email check in UI is not a security boundary.
- Track reads full clients document without sign-in using sequential IDs. Public navbar links to a specific customer ID. Requires owner-linked authentication and server-enforced rules before release.
- Count-based client IDs can overwrite records after deletion/concurrent creation. Payment verification can double-credit and has non-atomic writes.
- Vite requires Replit-specific PORT/BASE_PATH for every build; platform-specific dependencies and excluded Windows esbuild interfere with portability.
- No test/lint scripts. No CI or ownership/rights proof; package.json says MIT but no license grant document. Git history secret scan impossible from ZIP.

## Change plan and exact targets
Retain original archive as rollback; edit package.json, pnpm-workspace.yaml, pnpm-lock.yaml, .gitignore; add portable package-manager guard. Update app vite.config.ts, vercel.json, package.json, index.html, App.tsx, index.css, Navbar/Footer/WhatsAppButton, Home/Services/Domains/Portfolio/HowItWorks/Contact/Admin/Track. Add shared site metadata/contact config, page SEO, privacy-aware analytics, FAQ/privacy/resources pages, prerender build, env example, meaningful smoke tests and deployment/growth documentation. Keep unverified portfolio entries out of public rendering; preserve their source for owner review. Add security rules as review-only examples, not a live rules replacement. No live writes, ownership transfer, DNS changes or production deployment.
