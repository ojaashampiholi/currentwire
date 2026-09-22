# CurrentWire

Production Astro site for **CurrentWire**. For the stories worth following, and the questions worth carrying into the day.

## Requirements

Node.js 22 or newer, and npm.

## Install, build, preview

```bash
npm install
npm run build
npm run preview
```

`npm run dev` starts the local dev server.

The build is static HTML (`output: 'static'`) written to `dist/`.

## GitHub Pages

Defaults suit a site served from `/`. For a project site at `https://ojaashampiholi.github.io/currentwire/`:

```bash
BASE_PATH=/currentwire/ SITE=https://ojaashampiholi.github.io npm run build
```

Upload the contents of `dist/`. No host-specific adapter is required.

## Content

- Stories: `src/content/stories/*.md` (content collection in `src/content/config.ts`)
- Section hubs and order: `src/content/sections/*.json`
- Edition fronts: `src/data/editions/edition-YYYY-MM-DD.json`

The home page renders the latest edition. Archive pages cover the seven most recent edition days. Section hubs use the same Top Picks ladder as the front: a middle stack and a right rail.

## Theme

System, Light, and Dark. Light runs light blue, cream, and light red. Dark stays in navy, indigo, and plum. The gradient angle changes when a theme is applied.

## Credit

Built and maintained by **Ojaas Hampiholi**. Companion project: [The Cosmic Notebook](https://ojaashampiholi.github.io/the-cosmic-notebook/).
