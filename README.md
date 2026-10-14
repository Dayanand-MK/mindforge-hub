# MindForge Hub — redesigned platform

Start with [Run and deploy](docs/RUN-AND-DEPLOY.md) for exact PowerShell commands, local demo authentication, real Firebase configuration, secure admin setup and staging release steps.

## What is included

- Responsive public website with white and charcoal themes, persistent theme preference and the confirmed WhatsApp number.
- Google-authenticated customer workspace with enquiries, owned projects, scope/pricing, milestones, progress and profile settings.
- Separate admin workspace with enquiries, search/filtering, confirmed project conversion, project management, internal notes, customers, portfolio publication, announcements, pricing guidance and activity history.
- Firebase rules enforcing verified identity, ownership and trusted roles; emulator security and browser tests.
- Preserved public routes, prerendered SEO metadata, private noindex routes and legacy tracking/admin records.
- No fabricated portfolio cases, testimonials, notifications, chat or new payment/document-sharing features.

## Project structure

- `artifacts/mindforge-hub`: React/Vite frontend.
- `firebase` and `firebase.json`: versioned database/storage policies and emulator configuration.
- `tools/platform`: emulator tests, browser checks and trusted role-provisioning CLI.
- [Schema and migration](docs/SCHEMA-AND-MIGRATION.md): collection ownership, additive rollout and legacy continuity.
- [Redesign audit](docs/REDESIGN-AUDIT.md): retained stack and design decisions.

Public Firebase web configuration goes in `artifacts/mindforge-hub/.env.local` or deployment environment settings. No server credentials belong in the frontend. The source ZIP excludes local configuration, test data, dependencies, debug logs and compiled output.

This is a local implementation, not a production deployment. Live Google OAuth, staging/production rules, owner identity and hosting settings must be configured and verified by the project owner. Existing production data was not accessed or changed.
