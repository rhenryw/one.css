# one.css

Minimal classless stylesheet inspired by pico.css. This repo contains SCSS sources for a light and a dark variant and a tiny demo page.


just use 

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rhenryw/one.css@main/dist/one.min.css">
```
before the closing `</head>` tag in your html

Or download it from [releases](https://github.com/rhenryw/one.css/releases/download/latest/one.min.css) (click to download) and then link it as
```html
<link rel="stylesheet" href="path/to/one.css">
```
before the closing `</head>` tag in your html

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

