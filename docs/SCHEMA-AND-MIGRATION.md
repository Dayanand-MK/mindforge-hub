# Data model and additive migration 001

The existing Firebase project is retained. Firestore rules, not client-side navigation, authorize every SDK/API request. The unused Express and PostgreSQL scaffolding is not a second backend.

| Path | Purpose | Read access | Write access |
| --- | --- | --- | --- |
| `users/{uid}` | Name, verified Google email, contact preference, timestamps | Self, admin | Self, validated fields only |
| `access/{uid}` | Trusted role and provisioning timestamp | Self, admin single-record lookup | Admin SDK only |
| `enquiries/{id}` | Owner, requirements, technology, requested deadline/budget, workflow status, project link | Owner, admin | Owner creates; admin manages status/link/archive |
| `submissionLimits/{uid}` | Last accepted enquiry and timestamp | Self | Validated atomic enquiry submission |
| `projects/{id}` | Immutable owner/source enquiry, agreed scope, price, deadline, status, timestamps | Owner, admin | Admin, with atomic audit event |
| `projects/{id}/milestones/{id}` | Title, due date, status | Project owner, admin | Admin, audited |
| `projects/{id}/updates/{id}` | Customer-visible progress history | Project owner, admin | Admin creates, audited; immutable |
| `internalNotes/{kind}-{id}` | Private operational notes | Admin only | Admin, audited |
| `portfolio/{id}` | Demonstration/verified category, title, domain, technologies, text, optional HTTPS demo, publication flag | Public published entries; admin all | Admin, audited; unpublish to remove |
| `siteContent/main` | Homepage announcement and general pricing guidance | Public | Admin, audited |
| `activity/{id}` | Actor UID, action, entity path, server timestamp | Admin | Admin creates; immutable to web clients |

Missing `access` documents and missing admin claims mean **customer**, never administrator. Privileged access requires both `admin: true` in a Firebase-signed custom claim and `access/{uid}.role == admin`. No profile field controls roles. Admin SDK operators are trusted infrastructure administrators and bypass rules by design.

Customer project/enquiry queries constrain `ownerUid == auth.uid`. Sorting/filtering happens in the client; no composite indexes are required for this release. The checked-in index file is intentionally empty. Firestore's default single-field indexes support these queries. The admin lists currently subscribe to complete collections; introduce paginated server queries and aggregation counts before a large dataset rollout. Do not describe the current list implementation as unbounded-scale ready.

## Migration sequence

1. Export/back up production Firestore and Storage with the project owner's tools. Preserve the current rules and deployed frontend revision. No production export, migration, deletion or deployment was performed in this work.
2. Rehearse in a separate staging Firebase project. Create an empty database or copy only anonymized fixtures. Enable Google authentication.
3. Provision the verified owner account with the trusted CLI. Confirm the UID separately; no hardcoded owner email is used.
4. Compare existing production rules with the new rules before replacing them. Existing `clients`, `leads`, `paymentProofs` and `verifiedTransactions` records are retained. Map each legacy `clients/{id}.ownerUid` to the verified customer's Firebase UID before sharing tracking links. Never infer ownership from a supplied client ID or public email field.
5. Deploy rules and indexes to staging explicitly. Validate a new customer, a second customer and an administrator. Test both new `/dashboard` workflows and preserved `/track/:id` workflows.
6. Deploy the frontend preview with staging environment values. Verify Google popup/redirect behavior on its authorized domain. Only after review, deploy rules and frontend to the selected production project.

New records are created lazily after login and enquiry submission. There is no destructive SQL migration or database reset. Do not automatically copy historical financial records into the new project scope/price fields: their business meaning differs. Existing operational screens remain at `/admin/legacy` behind the new role gate. Legacy operations retain their original schema and are not included in the new atomic activity log. Legacy proof files and signed download URLs require a separate access review before migration; new rules do not revoke previously issued download tokens.

New workflows archive enquiries, cancel projects and unpublish portfolio entries instead of deleting history. Account deletion remains a verified business support process; no pretend deletion or suspension control is offered.

## Validation and limits

Rules enforce allowed fields, string lengths, statuses, numeric price limits, immutable ownership, verified identity and timestamps. Customer enquiries require a matching atomic throttle record and at least 60 seconds between submissions. Conversion of a confirmed enquiry is atomic and prevents a second linked project. Client retries reuse the enquiry ID. Calendar fields use browser date validation and a server length bound; business deadlines still require agreement.

Important admin writes in the new workspace include an immutable matching audit entry in the same commit. Audit entries are operational records, not a tamper-proof log against Firebase project administrators. Add Cloud Audit Logs and centralized retention if stronger infrastructure auditing is required.

No automated email notifications, live chat, new billing, document sharing or new file-upload flow is claimed. Announcements, general pricing guidance and portfolio publication are editable in the CMS. Service descriptions, the preserved indicative price table, FAQs and learning articles remain version-controlled source content.
