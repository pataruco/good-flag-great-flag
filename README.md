# Good Flag | Great Flag

A flag design quiz app inspired by [Roman Mars' TED talk](https://www.youtube.com/watch?v=pnv5iKB2hl4) and the [North American Vexillological Association's](https://nava.org/) (NAVA) principles of good flag design.

Users learn the 5 principles of good flag design, then take a quiz judging whether country flags are "good" or not based on those principles.

## Tech Stack

- Runtime: Node 24
- Package Manager: pnpm
- Build Tool: Vite (MPA mode)
- Language: TypeScript (strict mode)
- Styles: Vanilla CSS (native nesting, custom properties)
- Frontend: Vanilla TypeScript with Web Components (Shadow DOM)
- Flag Images: [REST Countries API](https://restcountries.com/) — SVG flags fetched at runtime
- Deployment: GitHub Pages

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 24+ (pinned in `.nvmrc`)
- [pnpm](https://pnpm.io/)

### Install and run

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:5173/good-flag-great-flag/](http://localhost:5173/good-flag-great-flag/) in your browser.

### Build for production

```bash
pnpm run build
pnpm run preview
```

## Project Structure

```
index.html              # Home — vexillology principles
quiz.html               # Interactive flag design quiz
watch.html              # TED talk video + podcast embed
about.html              # Credits
src/
  data/flags.ts         # 250 flag classifications (ISO code, official name, goodFlag)
  scripts/
    components/
      site-header.ts    # <site-header> Web Component (nav, skip link)
      principle-card.ts # <principle-card> Web Component (NAVA principles)
    quiz.ts             # Quiz logic (REST Countries API integration)
  styles/main.css       # Design tokens, layout, components
  types.ts              # TypeScript interfaces
vite.config.ts          # MPA config, base path: /good-flag-great-flag/
```

## Acknowledgements

This project was originally made by Kio McLoughlin, a Front End Web Development course student at [General Assembly](https://generalassemb.ly/) London, and refactored by [Pedro Martin](https://github.com/pataruco).

- [Roman Mars](https://romanmars.com/) & [99% Invisible](https://99percentinvisible.org/)
- [North American Vexillological Association](https://nava.org/)
