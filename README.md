# AI Cockpit Explorer

An interactive, real-time 3D architecture experience for
[AI Cockpit](https://github.com/xinglun/ai-cockpit) — built so a first-time
visitor can understand its architecture and governance model in about 30
seconds, without reading a long explanation first.

This repository is a presentation and comprehension layer only. It does not
redefine AI Cockpit semantics; see [`docs/upstream.md`](docs/upstream.md) for
the upstream source of truth and the revision this visualization was derived
from.

## Interactive Architecture

Explore the architecture, governance lifecycle, evidence model, and
human-authority boundary interactively:

[Explore AI Cockpit →](https://xinglun.github.io/ai-cockpit-explorer/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see
the result.

## Stack

- Next.js 16 (App Router, static export)
- React 19 + TypeScript
- React Three Fiber / Three.js / `@react-three/drei`
- Tailwind CSS 4 (DOM UI)
- Vitest + React Testing Library (unit tests)
- Playwright (end-to-end)

## Scripts

```bash
npm run dev        # local development
npm run build      # static export to out/
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run test       # vitest
npm run test:e2e   # playwright
```

## Deployment

Static export is deployed to GitHub Pages from
`.github/workflows/deploy-pages.yml` at
`https://xinglun.github.io/ai-cockpit-explorer/`. This repository has its own
release lifecycle, independent of the AI Cockpit Runtime — a visualization
change is never Runtime evidence and never implies new Runtime capabilities.
