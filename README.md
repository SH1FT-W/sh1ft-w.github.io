<div align="center">

<img src="icons/sh1ft-w-logo.png" alt="SH1FT-W" height="48" />

<a href="https://sh1ft-w.github.io"><b>Website</b></a>&emsp;<a href="#add-a-project">Add a project</a>&emsp;<a href="#project-bar">Project bar</a>&emsp;<a href="#shared-design">Shared design</a>

</div>

<br/>

The start page for all SH1FT-W projects at **https://sh1ft-w.github.io**: every project as a card with its latest release, grouped by platform, with a filter.

The same repository also serves what every project site loads from here: the project bar at the top and the shared design. Changing these files changes every project site at once.

## What is where

| File | What it does |
|:--|:--|
| `projects.js` | The one list of projects (name, tagline, icon, colour, site, repo, last release). The start page and the project bar read it. |
| `index.html` | The start page |
| `bar.js` | The project bar on every project site |
| `theme/v1/` | Shared stylesheet and script for the start page and the project pages; `readme-images/` renders the README title images |
| `icons/` | Project icons and the SH1FT-W logo |

<a id="add-a-project"></a>
## Add a project

1. **Put its icon** into `icons/`.
2. **Add an entry** to `projects.js`. `platform` decides the group (in the order platforms first appear). `iconStyle`: leave it out for a full-bleed square, `"mac"` for a macOS icon with its built-in margin, `"glyph"` for a transparent mark on a neutral tile.
3. **Include `bar.js`** on its site.

`version` and `released` in `projects.js` are only the fallback. The page shows the live value from the GitHub API, cached for an hour in `localStorage` (60 requests per hour without login; after a rate limit it waits for GitHub's reset time). Update them now and then.

<a id="project-bar"></a>
## Project bar

```html
<script src="https://sh1ft-w.github.io/bar.js" data-project="casora" defer></script>
```

A page with a `position: fixed` header can follow the bar with `top: var(--sh1ftw-offset, 0px)`. Clicking **SH1FT-W** in the bar opens the start page with `?from=<project>`, which highlights that project and offers a way back.

<a id="shared-design"></a>
## Shared design

```html
<link rel="stylesheet" href="https://sh1ft-w.github.io/theme/v1/theme.css">
<script src="https://sh1ft-w.github.io/theme/v1/theme.js"></script>
```

Put both in `<head>` **before** the page's own `<style>`. The script loads synchronously on purpose, so language and colour scheme are set before the first paint. The path is versioned: a breaking change becomes `theme/v2/` next to it and `v1` stays untouched.

A page keeps its own palette (override the tokens on `:root` and in the two dark blocks, at least `--accent`), fonts, hero, sections, cards, buttons, screenshots and texts. The start page also overrides `--max`, `--nav-h`, `--nav-gap` and `--nav-pad` to stay more compact.

<details>
<summary>What <code>theme.css</code> provides</summary>

- Colour tokens for light and dark (`:root`, `@media (prefers-color-scheme: dark)` with `:root:not([data-theme="light"])`, and `:root[data-theme="dark"]`): `--bg`, `--bg-2`, `--card`, `--card-2`, `--ink`, `--ink-2`, `--ink-3`, `--line`, `--chip`, `--accent`, `--accent-ink`, `--on-accent`, `--glass`, `--glass-line`, `--shadow`, `--shadow-lg`.
- Layout and type tokens: `--radius`, `--radius-lg`, `--gutter`, `--max`, `--font`, `--font-display`, `--mono` (system font stacks, no web fonts), navigation geometry `--nav-top`, `--nav-h`, `--nav-gap`, `--nav-pad`.
- The floating glass navigation (`.navwrap > .nav`, `.brand`, `.nav-links`, `.nav-links a.opt` hidden below 960 px), the light/dark button (`.iconbtn` with `.moon` and `.sun`), the DE/EN switch (`.lang button[data-l]`, `.on`), the bilingual rule (`html[lang="de"] .en` and `html[lang="en"] .de` are hidden), `.reveal` (+ `.d1`, `.d2`, `.d3`) for reveal on scroll, the focus ring, a small base reset and the `prefers-reduced-motion` rules.

</details>

<details>
<summary>What <code>theme.js</code> provides</summary>

- Before first paint: language from `localStorage["sh1ftw-lang"]` or the browser, `<html lang>`; colour scheme from `?theme=dark|light`, `localStorage["sh1ftw-theme"]` or the system (`data-theme` on `<html>`); `?still` adds `html.still`.
- After the DOM is ready: the `.lang` buttons and `#theme` work and save their choice, `<title data-de="…">` swaps the title, `<picture>` sources for dark mode follow the switch, `.reveal` elements fade in.
- Events on `document`: `sh1ftw-lang`, `sh1ftw-theme`. API: `window.SH1FTW.lang()`, `.setLang()`, `.theme()`, `.setTheme()`, `.reveal()` (for content rendered later).

</details>

`build/` (ignored by git) holds the before/after comparison images from the migration.
