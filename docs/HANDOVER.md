> Historical SEO-release document. For this redesigned platform, use RUN-AND-DEPLOY.md, SCHEMA-AND-MIGRATION.md and PLATFORM-VALIDATION.md. The versioned rules in firebase/ supersede earlier examples.

# MindForge Hub — implementation and release handover

Prepared 13 October 2026 from the ZIP supplied by the owner. No GitHub push, transfer, Firebase migration, DNS change or production deployment was performed. The original ZIP remains unchanged as a recovery copy.

## Completed and verified locally

- Retained the React/Vite/TypeScript/Wouter application, purple glass design, existing public routes, logo and Firebase integration code. The source is not Next.js.
- Centralised brand, canonical origin, email and the owner-confirmed WhatsApp number in `src/lib/site.ts`. Old placeholder WhatsApp links are gone.
- Added build-time HTML for 11 public routes, unique titles/descriptions, HTTPS canonicals, Open Graph/Twitter metadata, sitemap and robots. Client navigation updates metadata. Organization, WebSite, BreadcrumbList, Service and article schema use visible content and no ratings or invented outcomes.
- Added noindex private shells and a Vercel route configuration with an explicit 404 fallback. Robots allows assets and pages to be fetched so crawlers can see noindex; robots is not an access-control mechanism.
- Improved homepage wording, process, enquiry calls to action and internal links. Removed unsupported testimonials, project-count/accuracy guarantees, hardware/IoT advertising and response-time promises. Unverified portfolio source is retained in `PORTFOLIO-REVIEW.md` and is not rendered publicly.
- Preserved every existing pricing amount, labelled the ranges as historical and awaiting confirmation, and clarified research/similarity services as educational editing and attribution support.
- Added FAQs, a privacy information page and two original educational articles. No new paid packages, unconfirmed commercial capabilities or fake case studies are advertised.
- Added labelled enquiry fields, stage and preferred contact, input limits, a honeypot and an encoded WhatsApp draft. A click does not claim delivery. The form explains that visitors must review and send the message themselves.
- Kept database submission code behind an explicit release flag, with success only after Firestore resolves; error states retain the draft. Database enquiries default off pending secure intake verification.
- Added consent-gated analytics hooks for public page views, WhatsApp clicks, contact clicks and successful database saves. No customer identifiers or enquiry text are passed by these hooks. Analytics remains disabled until configured and reviewed.
- Added skip navigation, focus styling, input-label associations, icon names, mobile-menu state, reduced-motion support, font fallbacks, image dimensions and zoom support. Private Firebase pages load separately from public content.
- Made the public build portable outside Replit and pinned pnpm 10.28.2. Preserved the minimum package release-age policy and build-script allowlist. Compatible dependency updates and targeted fixes reduce the original advisory findings; see `VALIDATION.md` for final counts.

The audit, source change list and validation record accompany this handover. Local tests do not prove that Google has indexed the site, that messages reached the business or that live Firebase rules are secure.

## Implemented but not verified in production

- Public HTML, metadata and Vercel status-code routing must be checked on an actual preview with response headers, raw HTML and direct page refreshes.
- Admin lead acceptance now uses an atomic transaction and a stable lead-to-client reference. New clients use Firestore IDs rather than collection counts. This avoids count reuse after deletion. Existing IDs are retained.
- Payment review now checks a pending proof inside a transaction and records the transaction reference to avoid repeat credits. Admins must still reconcile the bank/provider record; screenshots do not prove settlement. Historical verified proofs require a reconciliation/backfill plan before relying on the new receipt collection for old transactions.
- Tracking now requires Google sign-in. Link each client record's `ownerUid` to the correct Firebase Authentication UID through the admin editor. Existing customers without this mapping will need onboarding. UI sign-in alone does not secure records: deploy and test server-enforced rules first.
- `firestore.rules.example` and `storage.rules.example` are conservative review-only examples, not automatically deployed rules. They deny anonymous leads, protect client records with ownership, restrict proof creation, and reserve admin writes. Adapt them to the actual schema, verified administrator identity and existing rule set. Do not blindly replace live rules or weaken them to resolve errors.
- Firebase login, storage upload, permission denial, lead receipt, concurrent lead acceptance and repeat-payment races require a test Firebase project/emulator verification. No live database writes were made in this task.

## Owner decisions before release

1. Confirm permission to use and publish the supplied source, attribution and the destination GitHub/Vercel accounts. The original repository returned “Repository not found”; its owner, license grant and history could not be verified. A package.json MIT label is not proof of a complete license grant.
2. Confirm the production domain remains `https://mindforge-hub-mindforge-hub.vercel.app`, or provide the domain you own. No domain changes were made.
3. Confirm current pricing: report ₹500–₹1,500; PPT ₹300–₹1,000; research support ₹1,000–₹3,000; similarity/citation support ₹300–₹800; formatting/editing ₹300–₹700. Values were not changed.
4. Approve quote terms, payment schedule, revision scope, cancellations/refunds and data-retention details. The site asks customers to agree these; it does not invent a binding policy.
5. Supply verified portfolio evidence and publication permission before restoring case studies. Do not restore the old accuracy figures or testimonials without evidence.
6. Review Firebase ownership/rules, client-account mapping and secure lead intake. Approve the analytics setup and review the privacy text for actual operations.

## Environment configuration

Use `artifacts/mindforge-hub/.env.example` as a names-only template. Configure values in your Vercel project and keep local `.env` files untracked. The deliverable excludes the supplied `.env`.

| Variable | Purpose / safe default |
|---|---|
| `VITE_SITE_URL` | HTTPS production origin, no path/query. Rebuild after changes. |
| `VITE_BRAND_NAME` | MindForge Hub; shared brand configuration supports a later rename. |
| `VITE_WHATSAPP_NUMBER` | Owner-confirmed public international digits, without `+` or spaces. |
| `VITE_CONTACT_EMAIL` | Public business enquiry address. |
| `VITE_ADMIN_EMAIL` | UI admin identity; must match server rules. This variable does not grant permissions. |
| `VITE_NOINDEX` | `true` on previews, `false` only on intended production. Vercel preview builds also enforce it automatically. |
| `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` | Public Firebase web-app configuration from your project. Firebase web keys do not replace database/storage authorization. Never use Admin SDK/private keys here. |
| `VITE_ENABLE_DATABASE_ENQUIRIES` | Default `false`; enable only after protected intake and a real test write are verified. Review-only example rules deliberately deny anonymous creation. |
| `VITE_GA_MEASUREMENT_ID` | Optional GA4 `G-...` ID. |
| `VITE_GA_SAFE_EVENTS_CONFIRMED` | Default `false`; set true only after disabling enhanced measurement/automatic URL collection and checking event payloads. |
| `VITE_GOOGLE_SITE_VERIFICATION` | Optional Search Console HTML verification token. Public, not an account password. |
| `PORT`, `BASE_PATH` | Local server defaults 5173 and `/`. The static SEO release targets root hosting. |

Legacy `VITE_WHATSAPP_URL` and `VITE_INSTAGRAM_URL` are not used by the new shared configuration. The retained Express/PostgreSQL scaffolding needs `DATABASE_URL` only if separately deployed; the public Vercel site does not use it.

## GitHub ownership and recovery

Preferred when the original owner cooperates: have a repository administrator initiate an authorised transfer, then verify branches, issues, permissions, Actions secrets and integrations. GitHub's [transfer documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository) explains access requirements and what transfers.

If transfer is unavailable and you have source-use permission, create a private repository in your own account and commit the supplied source there. Keep attribution; do not claim inherited history. This ZIP cannot preserve absent commits, branches, issues or pull requests. Before publication, obtain a history-bearing clone from the owner if historical secret scanning is required. Review GitHub Actions and branch protection; the ZIP contains no CI pipeline.

For the new repository, extract the source ZIP into a clean directory, check `.gitignore`, run `git init`, `git add .`, inspect `git diff --cached --stat` and the actual staged files, then make your initial commit. Confirm that no `.env`, credential, generated build or dependency directory is staged. Add your own remote through GitHub's authenticated UI/CLI and push only after confirming the destination. Never paste tokens or passwords in chat. If an actual private secret was previously committed, revoke/rotate it; deleting the current file does not erase history.

Keep the original supplied ZIP, the revised source ZIP and a release commit/tag. A rollback should restore a known code/configuration pair. Database rules and schema changes need their own backup and migration plan; rolling back JavaScript cannot undo data changes.

## Vercel preview and production checklist

1. Sign in to your own Vercel account and connect your authorised GitHub repository. Create a new project; do not reuse another owner's deployment.
2. Import the repository root (`.`). Use Node 22.12+ and pnpm 10.28.2 via the `packageManager` field/Corepack. Framework preset is Other because the root config drives the static build.
3. Root `vercel.json` sets `pnpm install --frozen-lockfile`, `pnpm --filter @workspace/mindforge-hub build` and output `artifacts/mindforge-hub/dist/public`. Keep the root directory as the repository root so workspace packages resolve. Do not deploy `dist/server` or the whole repository as static output.
4. Add the needed variables through Vercel's environment UI. Use a test Firebase project for preview. Set `VITE_NOINDEX=true` for Preview and `false` for Production. Leave database intake and analytics gates off initially.
5. Deploy a preview. Check all public routes, direct refresh, missing URLs returning 404, private routes carrying noindex, sitemap/robots, logo/social image, mobile navigation and WhatsApp drafts. Check response headers on Vercel rather than assuming the local test server proves platform behaviour.
6. In the test Firebase project, configure Google sign-in and authorised domains. Back up current rules, test owner/non-owner/admin access, rules validation, positive and negative uploads, duplicate payment references and simultaneous lead acceptance. Map customer UIDs. Verify unauthorized reads using the SDK directly, not just the UI.
7. Before enabling anonymous database enquiries, implement and verify a protected intake design with App Check plus server-side validation/rate controls and monitoring. A client honeypot alone cannot prevent direct Firestore abuse. Keep WhatsApp available while this work is pending.
8. Test a real controlled enquiry with your own accounts and confirm it appears in the intended admin project. Confirm the error path against denied rules. Remove test records according to the agreed test plan.
9. After owner approval and acceptance checks, promote the preview to the new project's production deployment. Connect a custom domain only after confirming ownership/readiness. If the origin changes, update `VITE_SITE_URL`, rebuild all canonicals/sitemap/schema/social URLs and arrange redirects on the old origin only with its owner's authorization.
10. Recheck production HTTPS, status codes, robots/indexability, Firebase authorised domains and contact links. Record the deployment ID, source commit and variable names, retain the previous deployment and test the rollback path. Do not regard a successful build as proof of operational delivery.

Configuration reference: [Vercel project configuration](https://vercel.com/docs/project-configuration). Authentication and atomic-write references: [Firestore access rules](https://firebase.google.com/docs/firestore/security/rules-conditions) and [transactions](https://firebase.google.com/docs/firestore/manage-data/transactions).

## Google Search Console and analytics

1. Add a Search Console property for the actual production site. For a domain you control, use a Domain property and the DNS TXT token issued by Google. For the Vercel subdomain, use an exact HTTPS URL-prefix property and an available verification method, such as the HTML meta token configured above. Do not edit DNS belonging to another owner.
2. Deploy the token, inspect the raw production HTML and click Verify in Search Console. No verification was completed during this task. Follow Google's [ownership instructions](https://support.google.com/webmasters/answer/9008080).
3. Submit `sitemap.xml` for the verified property using the [Sitemaps report](https://support.google.com/webmasters/answer/7451001). Check the fetched sitemap lists only the intended public origin and routes.
4. Inspect `/`, `/services`, `/contact` and both article URLs. Review live rendered HTML, selected canonical and indexing eligibility; request indexing for ready pages where available. A sitemap or structured data does not guarantee indexing or rankings.
5. Review Page indexing exclusions, 404s and crawl issues weekly. Private pages should remain noindex. Do not block scripts/styles needed for rendering. See [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
6. Compare clicks, impressions, CTR and average position by page/query and country over comparable periods. Low impressions suggest discovery/relevance issues; impressions with weak CTR warrant a title/content review. Treat these as hypotheses, not guaranteed fixes.
7. Optional GA4: create a web stream, disable enhanced measurement and automatic outbound/form tracking before setting the safe-events gate. Automatic outbound tracking can include the WhatsApp destination URL containing personal draft text; [Google documents outbound link collection](https://support.google.com/analytics/answer/13566436). Verify requests in a test browser before enabling production analytics.
8. Configure the ID and safe-events gate, then test Decline (no analytics script), Allow (only approved events), and withdrawal. Inspect payloads to ensure no email, phone, draft, tracking ID, query string or referrer is sent. Use `enquiry_submitted` as a saved-lead event only when intake is verified; `whatsapp_click` is a handoff, not delivery or an order. No confirmed-order event is emitted without reliable evidence.
9. Use consistent tagged links for social campaigns, e.g. `?utm_source=instagram&utm_medium=organic_social&utm_campaign=viva_october`. The privacy-first hooks currently strip queries and do not implement campaign attribution; add a reviewed allowlist of campaign values before expecting GA campaign reports. Never put names or contact details in UTMs.
10. Compare public-page visits with genuine enquiries and manually confirmed paid orders in an access-controlled business record. Do not infer orders from clicks. Pages with visits but few enquiries may need clearer service scope, pricing context or CTA placement.

## Keyword-to-page mapping

These are qualitative search-intent hypotheses, not verified search-volume or competition measurements. No paid keyword dataset or Search Console account was available. A current search review and institutional guidance support planning, reporting and viva as useful topics; they do not prove demand levels. For example, [VTU's project guidance](https://vtu.ac.in/wp-content/uploads/2025/11/00.-Guidelines-for-Project-work-.pdf) covers project documentation and demonstration requirements. Students must follow their own institution's rules.

| Destination | Keyword theme | Intent / content boundary |
|---|---|---|
| `/` | academic project guidance, final-year project support | Understand the business and start a scoped enquiry |
| `/services` | engineering project guidance, debugging help, report formatting, viva support | Compare the three real service groups; avoid thin duplicates |
| `/domains` | Python/Java project guidance, machine learning guidance, web project support | Discuss stack fit; capabilities must be confirmed for each brief |
| `/how-it-works` | project support process | Agree deliverables and commercial terms |
| `/contact` | project guidance enquiry | Prepare a relevant WhatsApp brief |
| `/faq` | project support pricing, revisions, timeline | Resolve questions without inventing policies |
| `/portfolio` | project examples | Placeholder for evidence-backed case studies; no invented projects |
| `/blog/choose-final-year-software-project` | how to choose a final-year software project | Practical planning guide for students and teams |
| `/blog/software-project-viva` | software project viva preparation | Understanding, demonstration and evidence guide |
| Future commercial landing page | software development services | Keep unpublished until actual capability/scope is approved |

Do not create separate Python/Java/ML sales pages until there is enough confirmed scope and useful original detail to distinguish them.

## Content and monetization plan

| Article | Audience / intent | Theme and questions | Internal links / CTA |
|---|---|---|---|
| How to Choose a Final-Year Software Project — implemented | Student teams choosing scope | Feasibility; access to data; smallest demonstrable version | Services, contact; discuss a specific planning question |
| How to Prepare for a Software Project Viva — implemented | Students preparing to explain their work | Architecture; test evidence; demo failure; limitations | Services, contact; request explanation coaching |
| How to Plan a Python Project from Idea to Testing — planned | Beginner Python teams | Environment setup, data boundaries, tests and milestones | Domains, planning article, contact |
| Common Software Project Debugging Mistakes — planned | Teams with blocked implementations | Reproduction, logs, small test cases, root causes | Domains, services; send a redacted error description |
| How to Structure a Technical Project Report — planned | Students documenting their own work | Institution template, methods, evidence, citations | Services, FAQ; discuss formatting scope |

The two published articles are newly written guidance, reviewed for internal consistency and unsupported claims; no external originality/plagiarism score was obtained. Have the owner review them before publication. Do not mass-generate keyword pages or supply dishonest submissions.

Prioritise scoped paid guidance and documentation enquiries. Consider planning + development guidance, documentation + presentation support, and testing + viva preparation bundles only after defining included sessions, deliverables, revisions and price. No new package prices were invented.

Test demand for original planning checklists, report templates and viva guides before building a paid digital-product catalogue. Confirm redistribution rights, accurate descriptions and support limits. Offer no copied research, pirated resources or plagiarism-evasion products.

A future commercial page draft can use: “Software support for your next project”, followed by owner-approved capabilities, examples, scope boundaries, process and a requirements-based quote CTA. Keep website development, business applications, prototypes, maintenance and consulting unpublished until each offer is confirmed. No free-consultation promise is needed.

Avoid display ads while the site is focused on lead generation. Evaluate clearly disclosed, relevant affiliate links only when an authentic audience and useful recommendations exist. Do not add misleading downloads or forced clicks.

If a payment gateway becomes justified, evaluate an Indian provider such as Razorpay against actual business eligibility, current fees, settlement timing and supported methods. This is an evaluation candidate, not an integration or purchase. Before implementation approve refund/cancellation terms, invoicing/tax handling with a qualified adviser and business verification requirements. Use server-created orders, signature/webhook verification, idempotency and durable order records; see the provider's [security checklist](https://razorpay.com/security/checklist). No subscriptions or checkout were added.

## 30-day organic growth plan

| Days | Work | Evidence to collect |
|---|---|---|
| 1–3 | Confirm scope/prices, review articles/privacy, complete account and Firebase release gates | Signed-off content and a tested preview |
| 4–6 | Deploy when approved, verify Search Console and submit sitemap; test enquiries | URL inspection results and a controlled enquiry record |
| 7–9 | Publish/review the project-selection article; share an Instagram carousel with one relevant site link | Reach and genuine project questions, not invented conversions |
| 10–12 | Publish/review the viva guide; create a short demonstration reel | Clicks to the guide and relevant enquiries |
| 13–15 | Review search queries and FAQ gaps; ask clients for permission to document work | Actual questions and portfolio permissions |
| 16–18 | Write the Python planning guide using a small original example and tests | Technical review and working example |
| 19–21 | Write the debugging guide; share a useful redacted debugging checklist | Engagement and enquiry quality |
| 22–24 | Draft report-structure guidance; validate against institution-specific examples | Accurate references and no universal-template claims |
| 25–27 | Publish one verified case study if permission/evidence exists; otherwise improve service explanations | Demo, tests, support scope and permission record |
| 28–30 | Compare comparable periods; inspect high-visit/low-enquiry pages; test one CTA wording change | Search clicks/impressions/CTR, verified enquiries and confirmed orders |

Keep an access-controlled weekly enquiry log: source, service, stage, quote issued, confirmed order and reason lost. Avoid posting client details publicly. Do not buy ads or promise ranking/revenue targets. This is a plan, not a scheduled automation.

## Prioritised remaining work

- **P0 before release:** ownership/licensing and destination confirmation; Firebase access-rule testing and UID migration; payment-history reconciliation; accurate prices and commercial/privacy terms; preview acceptance. Keep database intake disabled until protected.
- **P1:** controlled lead-delivery test, analytics payload/consent verification, production headers and Search Console setup; resolve the remaining development-only advisory when upstream support is available.
- **P2:** authorised portfolio cases, further original resources, reviewed campaign attribution and real conversion reporting; accessibility audit and Lighthouse/field Core Web Vitals measurement on production.
- **P3:** validated bundles/digital products and a confirmed commercial-service landing page; gateway integration only after requirements and policies are approved.
