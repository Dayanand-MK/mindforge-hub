# MindForge Hub

## Overview

MindForge Hub is a Guided Project Development & Academic Support Platform for students. Built as a React + Vite frontend with Firebase backend.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **Frontend**: React + Vite (artifacts/mindforge-hub)
- **Backend**: Firebase (Firestore + Auth + Storage)
- **Styling**: Tailwind CSS v4 with glassmorphism UI
- **Routing**: Wouter
- **API framework**: Express 5 (artifacts/api-server, unused for main app)

## Artifacts

- **mindforge-hub** — Main React app at `/` (previewPath: /)
- **api-server** — Express API server at `/api`
- **mockup-sandbox** — Design sandbox at `/__mockup`

## Pages

- `/` — Home page (hero, services, pricing, upcoming, testimonials)
- `/services` — Detailed services + documentation pricing
- `/domains` — Domain cards (AI/ML, Data Science, etc.)
- `/portfolio` — Sample projects
- `/how-it-works` — Step-by-step process
- `/contact` — Custom contact form → Firestore "leads"
- `/track/:id` — Customer project tracking (no login) + payment proof submission
- `/admin` — Admin dashboard (hidden from navbar, Google Auth only)

## Firebase Collections

- **leads** — Contact form submissions
- **clients** — Customer records (ID format: MFH001, MFH002...)
- **payments** — Payment proof submissions

## Admin

- Route: `/admin` (not in navbar)
- Auth: Firebase Google Login restricted to mindforgehub26@gmail.com
- Features: Leads management, client management, payment verification

## Environment Variables (Secrets)

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Key Commands

- `pnpm --filter @workspace/mindforge-hub run dev` — run frontend
- `pnpm --filter @workspace/api-server run dev` — run API server
