> Historical SEO-release document. For this redesigned platform, use RUN-AND-DEPLOY.md, SCHEMA-AND-MIGRATION.md and PLATFORM-VALIDATION.md. The versioned rules in firebase/ supersede earlier examples.

# Validation record — 13 October 2026

## Passed

- Dependency installation completed with pnpm 10.28.2. Initial pnpm 11 attempts were incompatible with the existing build policy; the pinned pnpm version resolved this. The package release-age policy and approved-script list remain enabled.
- `pnpm run typecheck`: passed across workspace libraries, the website, API server, mockup sandbox and scripts after final compatible dependency updates.
- `pnpm --filter @workspace/mindforge-hub build`: passed, using Vite 7.3.7. Produces 11 public HTML pages, private app shell, 404 document, sitemap and robots.
- `node --test scripts/seo.test.mjs` in the website directory: four test groups passed. They check every public page for a single H1, unique title, canonical, social metadata, JSON-LD parsing, public indexability, known internal routes, sitemap coverage, private noindex, configured 404 fallback and enquiry label/number correctness.
- Local headless Microsoft Edge browser checks: all 11 public routes and `/track` at 320, 390, 768 and 1440px viewport widths; one H1 per route and no horizontal overflow. WhatsApp draft encoding preserved ampersands/newlines and used the owner-confirmed number. The UI explicitly said nothing had been sent. Editing a field removed the stale prepared link. Mobile navigation and the local 404/noindex response passed. No unhandled JavaScript page errors were observed.
- Desktop/mobile homepage screenshots visually reviewed. Font fallbacks were corrected after the first pass. External network access was blocked for the browser checks, so fonts used the fallback and no real analytics, Firebase, email or WhatsApp traffic was sent.
- Source check found no remaining placeholder WhatsApp number, hardware/IoT advertisements, legacy project-count claim or old accuracy percentages in the public application source.

## Dependency audit

The first full-workspace `pnpm audit --json` reported **14 critical, 44 high, 29 moderate and 4 low findings**. After compatible updates, patched esbuild/gRPC overrides and removal of the unused typography dependency, the final audit reports **0 critical, 1 high, 0 moderate and 0 low**.

The remaining high advisory is `braces@3.0.3`, reached only through `artifacts/mockup-sandbox > fast-glob > micromatch > braces`. The advisory reports no patched version. This retained development sandbox is not included in the website's static deployment. Do not process untrusted glob patterns in it; update/remove that toolchain when a suitable fix is available. The workspace is not represented as vulnerability-free. [Advisory GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

Dependency audit counts are advisory findings, not evidence that the production site was exploited. The final lockfile is included. Optional Firebase/protobuf package install scripts remained blocked under the existing policy; the tested website build succeeded without them.

## Measured bundle output

| Build asset | Minified size | Gzip estimate from Vite |
|---|---:|---:|
| Initial public JavaScript | 284.04 kB | 86.65 kB |
| CSS | 122.85 kB | 20.15 kB |
| Deferred Firebase configuration/dependencies | 569.21 kB | 170.25 kB |
| Deferred admin page | 23.24 kB | 5.92 kB |
| Deferred tracking page | 10.35 kB | 3.69 kB |

Vite warns that the deferred Firebase chunk exceeds 500 kB. It is dynamically loaded for private features or enabled database submission, not required to render public content. This remains a performance optimisation opportunity. These figures are build output sizes, not network timing or Core Web Vitals measurements. No baseline speed improvement percentage is claimed.

## Not verified / release limits

- No production deployment, DNS change, GitHub transfer/push, Google verification, indexing or live lead delivery was performed.
- Firebase permission enforcement, Auth configuration, Storage rules, customer UID mapping, lead delivery and payment transaction race tests were not run against a live project or emulator. Review-only rule examples are not a tested production policy. Private workflows must not be released until the owner completes the security acceptance tests in HANDOVER.md.
- Browser checks intentionally blocked external services and did not exercise signed-in admin/customer flows. The local test server emulated the desired routing; Vercel's actual headers and 404 behaviour still need a preview check.
- No Lighthouse, axe audit, screen-reader session or field Core Web Vitals measurement was run. Manual visual review and browser assertions are narrower than a complete accessibility audit. No Lighthouse score or ranking outcome is claimed.
- No existing lint script or test suite was supplied. TypeScript, build and the new targeted tests were used. The public website build was validated; the unused mockup/API deployment was not published or operationally tested.
- The ZIP contains no Git history. Historical secrets, original repository permissions and license/attribution provenance could not be verified. The supplied environment file is excluded from the source deliverable.
- Article copy was written and reviewed for usefulness/unsupported claims; no external originality score was obtained. Prices, policies and case-study publication still require owner confirmation.
