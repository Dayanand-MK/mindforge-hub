# Redesign audit and implementation plan — 14 October 2026

Baseline is the previously verified optimized-source ZIP. A separate working copy preserves that release. No Git history was supplied, so no branch/history can be preserved beyond the provided source snapshots. No production data/configuration is changed.

Stack: React 19, Vite 7.3, Wouter, TypeScript, Tailwind 4, existing Radix/shadcn components, Firebase Auth/Firestore/Storage; pnpm 10.28.2 monorepo. Public pages already prerender metadata/content. Legacy admin manages leads, clients and manual payment proofs. Legacy tracking requires Google sign-in. Rules are examples only; original production rules and ownership remain unknown. Express exposes health only; PostgreSQL is unused scaffolding.

Preserve: all public URLs, metadata/prerender pipeline, educational copy, confirmed contact details, existing Firebase collections and legacy operational data. Existing documentation price ranges are preserved with the existing confirm-current-scope-and-price notice. New custom projects use scoped quotes rather than invented prices.

Improve: charcoal/white token system, typography and spacing, Lucide icons, navigation and both themes. Replace the public homepage composition without replacing the framework or component library. Keep articles/FAQs and routes.

Add: shared Google authentication; customer-default roles using trusted Firebase custom claims plus a server-owned role record; rules enforcing every protected read/write; secure admin provisioning command; customer enquiries/projects/settings; admin overview/enquiry/customer/project/portfolio/content/activity/settings screens; separate internal notes; structured milestones/updates; versioned additive schema and access rules; local emulator security tests.

Order: dependencies and rule model; design system/public pages; shared auth and dashboards; emulator tests; build/browser checks; handover and source package. No fake messaging, billing, file sharing or notifications. Retain legacy tracking and admin tools under protected legacy routes while documenting migration.

References inspected: shadcnstore/shadcn-dashboard-landing-template (has Vite patterns), tweakcn.com (token-based themes), Kiranism/next-shadcn-dashboard-starter (dashboard information architecture). Designs are original adaptations, not copied template code. No Next.js, Supabase or second UI system introduced.
