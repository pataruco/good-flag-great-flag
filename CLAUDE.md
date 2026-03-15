# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Good Flag Great Flag" is a flag design quiz app inspired by Roman Mars' TED talk and the North American Vexillological Association's (NAVA) principles of good flag design. Users learn the 5 principles of good flag design, then take a quiz judging whether country flags are "good" or not.

## Tech Stack

- **Runtime**: Node 24 (pinned in `.nvmrc`)
- **Package Manager**: pnpm
- **Build Tool**: Vite 8 (MPA mode — 4 separate HTML entry points)
- **Language**: TypeScript 5 (strict mode)
- **Styles**: Vanilla CSS (native nesting, custom properties — no preprocessor)
- **Frontend**: Vanilla TypeScript with Web Components (Shadow DOM), no frameworks
- **Flag Images**: REST Countries API (`restcountries.com/v3.1`) — SVG flags fetched at runtime
- **Deployment**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`, manual dispatch)
- **Accessibility**: WCAG 2.2 AAA target

## Commands

```bash
# Install dependencies
pnpm install

# Start dev server (port 5173 by default)
pnpm run dev

# Type-check and build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Architecture

**Static MPA**: 4 HTML files at the root (`index.html`, `quiz.html`, `watch.html`, `about.html`), each loading its own TypeScript entry point via `<script type="module">`.

**Vite Config** (`vite.config.ts`): MPA with `rollupOptions.input` for all 4 pages. Base path: `/good-flag-great-flag/`.

**Data** (`src/data/`):
- `flags.ts` — 250 flag classifications (`isoCode`, `name`, `goodFlag`) covering all countries and territories from the REST Countries API. Names use the official English form. Each flag is evaluated against the 5 NAVA principles.

**Types** (`src/types.ts`): `FlagClassification`, `FlagData` interfaces.

**Scripts** (`src/scripts/`):
- `components/site-header.ts` — `<site-header>` Web Component (Shadow DOM) for header/nav. Mobile menu uses `popover="auto"` for light-dismiss. Includes skip link, brand link, and responsive layout (hamburger on mobile, inline nav on desktop ≥769px).
- `components/principle-card.ts` — `<principle-card>` Web Component (Shadow DOM) for NAVA principle sections. Configured via HTML attributes (`order`, `card-title`, `subtitle`, `explanation`, `bg-color`, `card-color`, `text-color`). Uses CSS Grid, fluid sizing with `clamp()`, and sets `role="region"` with `aria-label`.
- `quiz.ts` — quiz logic: fetches flag SVGs from REST Countries API, merges with local `goodFlag` data, runs 10-round quiz. Map overlay uses `popover="manual"`. Includes progress bar with `role="progressbar"`.

**Styles** (`src/styles/main.css`): Single vanilla CSS file using native nesting and custom properties (design tokens for fonts, colors, spacing, shadows). Nav styles are inside `<site-header>` Shadow DOM, principle card styles are inside `<principle-card>` Shadow DOM. Includes `prefers-reduced-motion` media query and `.visually-hidden` utility.

**Routes**:
- `index.html` — home page with vexillology principles (uses `<principle-card>` components)
- `quiz.html` — interactive flag design quiz
- `watch.html` — TED talk video + SoundCloud embed
- `about.html` — credits page with links to Roman Mars and NAVA
