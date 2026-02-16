# one.css

Minimal classless stylesheet inspired by pico.css. This repo contains SCSS sources for a light and a dark variant and a tiny demo page.

Build
```
# install dependencies (using bun)
bun install

# build the single CSS file (supports runtime theming with `.dark` on <html>)
bun run build
```

Outputs
- `dist/one.css` — single stylesheet with CSS custom properties for light/dark themes

Open `index.html` to view the demo. Theme switching is now done by toggling the `.dark` class on `<html>` (the demo saves your preference).

Visual tests
- A small visual regression script is included at `scripts/visual-test.js` (uses Puppeteer + pixelmatch). To run it locally:

```
# install dev deps (puppeteer will need a Chromium installation)
bun install
bun run test:visual
```

If Puppeteer can't find Chrome, either install Chromium for Puppeteer or set PUPPETEER_EXECUTABLE_PATH.
# one.css
Drag and drop styles for sites
