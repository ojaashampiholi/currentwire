# CurrentWire

Static HTML preview of **CurrentWire** — a morning news front for the stories worth following, and the questions worth carrying into the day.

Repo: [ojaashampiholi/currentwire](https://github.com/ojaashampiholi/currentwire)

## Open locally

Open `index.html` in a browser (`file://` works), or serve the folder:

```bash
python3 -m http.server 8080 --directory .
# then visit http://localhost:8080/
```

Story pages live under `stories/`. Images under `images/`.

## What’s here

- Front page (`index.html`) with Top Picks, hubs, theme toggle (system / light / dark), and a random gradient angle on each theme apply
- Light theme: soft blue → cream → soft red loop; dark theme: navy wash
- Relative links only — no build step required for this preview

## Roadmap

An Astro (or similar) migration may follow for routing, components, and deployment. This folder is the push-ready static snapshot.

## Credit

Built and maintained by **Ojaas Hampiholi**. Companion project: [The Cosmic Notebook](https://ojaashampiholi.github.io/the-cosmic-notebook/).
