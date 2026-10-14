# Platform validation — 14 October 2026

The redesigned platform is implemented and verified locally. No production deployment, DNS change, real customer-data migration or live Google OAuth configuration was performed.

## Passed

- Website TypeScript check and Vite client/SSR build. Twelve public pages are prerendered, plus the private application shell and 404 page.
- Four SEO regression groups: page content/headings/unique metadata/canonicals, sitemap and robots behavior, private noindex/404 handling, and confirmed WhatsApp contact links. Both preview noindex and production-indexing builds were checked.
- Ten Firebase emulator security groups: anonymous access, direct cross-customer reads and queries, profile escalation attempts, verified signup, dual trusted admin controls, immediate demotion with stale claims, validated/rate-limited enquiries, required immutable audit entries, atomic confirmed-enquiry conversion and duplicate prevention, public portfolio/draft separation, and private file ownership/type controls. Some groups cover more than one control.
- Public browser checks: 13 routes including legacy tracking, at 320/390/768/1440 pixels in light and dark themes; one page heading, no page-level horizontal overflow, mobile navigation, theme persistence, WhatsApp draft encoding and stale-draft removal. External requests were blocked; no messages were sent.
- Customer/browser workflow: emulated Google credential sign-in, initial profile, persistent session, enquiry submission and own enquiry list, agreed project details, milestones/progress, and internal-note exclusion. Five customer routes were checked at 320/768/1440 pixels.
- Admin/browser workflow: confirmed enquiry conversion, scope/price save, milestone/progress/internal-note creation, CMS publication, public announcement updates, 10 admin routes at 320/768/1440 in both themes, responsive sidebar, search empty/matching states, profile save and portfolio unpublication.
- A second customer was denied access through a directly guessed project URL and received an empty personal project list.
- Trusted provisioning CLI: dry-run leaves access unchanged; mismatched project confirmation is rejected; demotion removes the custom claim and changes the server-owned role; promotion sets both controls. All used synthetic emulator accounts.
- Final managed integration run exited successfully and shut down its Firebase emulators. No browser page errors were recorded. Screenshots were visually reviewed for the public homepage and both workspaces.

The local test run caught and fixed an admin timing issue: dependent conversion controls are disabled while the preceding status save is in progress. A denied project route also received a clear page heading and access-error state.

## Dependency and performance findings

Firebase CLI was updated to 15.33.0, the available FTP dependency patch was applied, and the unused mockup package was excluded from workspace installation while preserving its source. The final **production-dependency audit reports zero advisories**. The full development-tool audit still reports one high (`braces`, through Firebase CLI/chokidar, no patched version reported) and two moderate (`uuid` and OpenTelemetry core) advisories in local Firebase administration/testing dependencies. These tooling packages are not shipped in the static browser bundle. The complete audit JSON accompanies the handover; the project is not described as having a clean full dependency audit.

The final build reports approximately 88 KB gzip for the main public JavaScript and 20 KB gzip for CSS. The lazily loaded Firestore SDK chunk is approximately 166 KB gzip and triggers Vite's 500 KB uncompressed chunk warning. No Lighthouse/Core Web Vitals score, ranking improvement or traffic result is claimed.

## Owner setup and verification still required

1. Configure the intended Firebase web app, Google provider, authorized domains and real OAuth handler. Live popup/redirect behavior on the selected preview/production domains has not been verified. In particular, validate redirect fallback with browser third-party-storage restrictions using Firebase's documented setup.
2. Verify the intended administrator's Firebase UID and run the trusted provisioning command. No production email address is automatically promoted.
3. Back up production data/rules and rehearse the additive rollout in staging. Existing production rules and legacy owner mappings were not available for verification. The preserved legacy operations do not use the new atomic activity log; review existing proof-download tokens separately.
4. Review service prices, terms and approved portfolio material. No fabricated projects, testimonials or outcomes were added. Portfolio entries are empty until the business publishes approved work.
5. Test actual mobile Safari/Chrome and the live Google flow. Local visual/browser verification used desktop Edge at responsive viewport sizes; it is not a full assistive-technology or WCAG conformance audit.
6. Add pagination/aggregated counts before large-volume use. Admin lists currently subscribe to complete collections. No email notification delivery, new billing, chat, document sharing or new uploads are claimed. Service descriptions, price ranges, FAQs and articles remain source-managed; the CMS edits portfolio entries, announcements and general pricing guidance.

See `RUN-AND-DEPLOY.md` for exact commands and `SCHEMA-AND-MIGRATION.md` for ownership, access policies and rollback considerations.
