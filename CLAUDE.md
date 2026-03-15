# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Good Flag Great Flag" is a flag design quiz app inspired by Roman Mars' TED talk and the North American Vexillological Association's principles of good flag design. Users learn the 5 principles of good flag design, then take a quiz judging whether country flags are "good" or not.

## Tech Stack

- **Runtime**: Node 24 (pinned in `.nvmrc`)
- **Build Tool**: Vite (MPA mode — 4 separate HTML entry points)
- **Language**: TypeScript (strict mode)
- **Styles**: Vanilla CSS (native nesting, custom properties — no preprocessor)
- **Frontend**: Vanilla TypeScript, no frameworks
- **Flag Images**: REST Countries API (`restcountries.com/v3.1`) — SVG flags fetched at runtime
- **Deployment**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

## Commands

```bash
# Install dependencies
npm install

# Start dev server (port 5173 by default)
npm run dev

# Type-check and build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

**Static MPA**: 4 HTML files at the root (`index.html`, `quiz.html`, `watch.html`, `about.html`), each loading its own TypeScript entry point.

**Vite Config** (`vite.config.ts`): MPA with `rollupOptions.input` for all 4 pages. Base path: `/good-flag-great-flag/`.

**Data** (`src/data/`):
- `flags.ts` — ~196 flag classifications (`isoCode`, `name`, `goodFlag`)

**Types** (`src/types.ts`): `FlagClassification`, `FlagData` interfaces.

**Scripts** (`src/scripts/`):
- `components/site-header.ts` — `<site-header>` Web Component (Shadow DOM) for header/nav. Mobile menu uses `popover="auto"` for light-dismiss.
- `components/principle-card.ts` — `<principle-card>` Web Component (Shadow DOM) for NAVA principle sections, configured via HTML attributes.
- `index.ts` — style import only
- `quiz.ts` — quiz logic: fetches flag SVGs from REST Countries API, merges with local goodFlag data, runs 10-round quiz. Map overlay uses `popover="manual"`.
- `watch.ts` — style import only
- `about.ts` — style import only

**Styles** (`src/styles/main.css`): Single vanilla CSS file using native nesting and custom properties. Nav styles are inside `<site-header>` Shadow DOM, principle styles are inside `<principle-card>` Shadow DOM.

**Routes**:
- `index.html` — home page with vexillology principles
- `quiz.html` — quiz page
- `watch.html` — TED talk video + SoundCloud embed
- `about.html` — credits page
