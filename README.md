<p align="center">
  <img src="https://raw.githubusercontent.com/rhenryw/one.css/main/img/logo.svg" 
       alt="one.css logo" 
       width="30%">
</p>

Micro design system framework inspired by pico.css and tailwind. This repo contains SCSS sources for a light and a dark variant and a tiny demo page.

[![](https://data.jsdelivr.com/v1/package/gh/rhenryw/one.css/badge?style=rounded)](https://www.jsdelivr.com/package/gh/rhenryw/one.css)

just use 

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rhenryw/one.css@main/dist/one.min.css">
```

or, if you want classless (`3kb` build)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rhenryw/one.css@main/dist/one.light.min.css">
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
- `dist/one.light.css` — classless + light/dark variable bundle (no component classes)
- `dist/one.light.min.css` — minified version of the light bundle for drag-and-drop HTML use

Open `index.html` to view the demo. Theme switching is now done by toggling the `.dark` class on `<html>` (the demo saves your preference).

