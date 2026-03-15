# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Good Flag Great Flag" is a flag design quiz app inspired by Roman Mars' TED talk and the North American Vexillological Association's principles of good flag design. Users learn the 5 principles of good flag design, then take a quiz judging whether country flags are "good" or not.

## Tech Stack

- **Runtime**: Node 5.6.0 (pinned in `.nvmrc` and `package.json` engines)
- **Framework**: Express with EJS templates (via `express-ejs-layouts`)
- **Database**: MongoDB via Mongoose
- **Frontend**: jQuery, vanilla JS
- **Deployment**: Heroku (Procfile)

## Commands

```bash
# Install dependencies (also seeds the database via postinstall hook)
npm install

# Start the server (port 3000 by default)
node app.js

# Seed database manually (requires mongod running)
node db/seeds/principles.js
node db/seeds/flags.js
```

## Architecture

**Server entry**: `app.js` — sets up Express middleware, Mongoose connection, and mounts routes.

**Database connection**: looks for `MONGOLAB_URI` or `MONGOHQ_URL` env vars, falls back to `mongodb://localhost:27017/flags`.

**Routes** (`config/routes.js`): all routes in a single file.
- `GET /` — renders root page with vexillology principles from DB
- `GET /quiz` — renders quiz page
- `GET /flags` — JSON API endpoint returning all flags (used by quiz JS via AJAX)
- `GET /watch` — renders the TED talk video page
- `GET /about` — renders about page

**Models** (`models/`):
- `Flag` — `name`, `isoCode`, `goodFlag` (boolean), `url` (S3 image link)
- `Principle` — `order`, `title`, `subTitle`, `explanation`

**Views** (`views/`): EJS templates with a shared `layout.ejs`. Pages: `root`, `quiz`, `watch`, `about`.

**Frontend JS** (`public/scripts/`): `quiz.js` fetches `/flags` via AJAX and drives the quiz interaction. `main.js` handles UI effects.

**Seeds** (`db/seeds/`): `flags.js` and `principles.js` clear and re-populate their collections. The flags seed uses a REPL context and only calls `process.exit()` after the last flag is created (Zimbabwe), so earlier flags are created asynchronously.
