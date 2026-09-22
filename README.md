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

The site is published at [https://ojaashampiholi.github.io/currentwire/](https://ojaashampiholi.github.io/currentwire/).

[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) runs on every push to `main` (and can be started manually). It installs dependencies, builds the static site, uploads `dist/`, and deploys with GitHub Actions. **GitHub Actions** is the Pages source.

After the workflow lands on `main`, open **Settings → Pages** and set **Source** to **GitHub Actions** if it is not already.

This is a project site, not a user homepage, so the workflow builds with `BASE_PATH=/currentwire` and `SITE=https://ojaashampiholi.github.io`. Astro writes the site to its default `dist/` directory, which is the Pages artifact.

A custom domain can be added later from the Pages settings.

## Content

- Stories: `src/content/stories/*.md` (content collection in `src/content/config.ts`)
- Section hubs and order: `src/content/sections/*.json`
- Edition fronts: `src/data/editions/edition-YYYY-MM-DD.json`

The home page renders the latest edition. Archive pages cover the seven most recent edition days. Section hubs use the same Top Picks ladder as the front: a middle stack and a right rail.

## Theme

System, Light, and Dark. Light runs light blue, cream, and light red. Dark stays in navy, indigo, and plum. The gradient angle changes when a theme is applied.

## Credit

Built and maintained by **Ojaas Hampiholi**. Companion project: [The Cosmic Notebook](https://ojaashampiholi.github.io/the-cosmic-notebook/).
