# sh1ft-w.github.io

Start page for all SH1FT-W projects: **https://sh1ft-w.github.io**

- `projects.js` is the single list of projects (name, tagline, icon, colour, site, repo).
- `bar.js` is the small project bar at the top of every project site. Include it with

  ```html
  <script src="https://sh1ft-w.github.io/bar.js" data-project="casora" defer></script>
  ```

  A page with a `position: fixed` header can follow the bar with `top: var(--sh1ftw-offset, 0px)`.
- Clicking **SH1FT-W** in the bar opens this page with `?from=<project>`, which highlights that project and offers a way back.
- Release versions are read live from the GitHub API.
- The start page groups projects by their `platform` field (in the order platforms first appear). `iconStyle` tells the page how to frame an icon: omit it for a full-bleed square, `"mac"` for a macOS icon with its built-in margin, `"glyph"` for a transparent mark that gets a neutral tile.

To add a project: put its icon into `icons/`, add an entry to `projects.js`, and include `bar.js` on its site.

## Shared design ("Gemeinsames Design")

The start page and the project pages (AgentBar, Evenlight, Pulse, ShareMount, FLODE; Casora still to follow) share one
versioned stylesheet and script from this repository:

```html
<link rel="stylesheet" href="https://sh1ft-w.github.io/theme/v1/theme.css">
<script src="https://sh1ft-w.github.io/theme/v1/theme.js"></script>
```

Put both in `<head>` **before** the page's own `<style>`; the script is loaded synchronously on purpose so language and
colour scheme are set before the first paint. The path is versioned: a breaking change becomes `theme/v2/` next to it and
`v1` stays untouched, so no page breaks when another one moves on.

**What `theme.css` provides**

- Colour tokens for light and dark (`:root`, `@media (prefers-color-scheme: dark)` with `:root:not([data-theme="light"])`,
  and `:root[data-theme="dark"]`): `--bg`, `--bg-2`, `--card`, `--card-2`, `--ink`, `--ink-2`, `--ink-3`, `--line`, `--chip`,
  `--accent`, `--accent-ink`, `--on-accent`, `--glass`, `--glass-line`, `--shadow`, `--shadow-lg`.
- Layout and type tokens: `--radius`, `--radius-lg`, `--gutter`, `--max`, `--font`, `--font-display`, `--mono` (system font
  stacks, no web fonts), navigation geometry `--nav-top`, `--nav-h`, `--nav-gap`, `--nav-pad`.
- The floating glass navigation (`.navwrap > .nav`, `.brand`, `.nav-links`, `.nav-links a.opt` hidden below 960 px), the
  light/dark button (`.iconbtn` with `.moon` and `.sun`), the DE/EN switch (`.lang button[data-l]`, `.on`), the bilingual
  rule (`html[lang="de"] .en` and `html[lang="en"] .de` are hidden), `.reveal` (+ `.d1`, `.d2`, `.d3`) for reveal on scroll,
  the focus ring, a small base reset (`box-sizing`, `html`, `body`, `img`) and the `prefers-reduced-motion` rules.

**What `theme.js` provides**

- Before first paint: language from `localStorage["sh1ftw-lang"]` or the browser, `<html lang>`; colour scheme from
  `?theme=dark|light`, `localStorage["sh1ftw-theme"]` or the system (`data-theme` on `<html>`); `?still` adds `html.still`.
- After the DOM is ready: the `.lang` buttons and `#theme` work and save their choice, `<title data-de="…">` swaps the
  title, `<picture>` sources for dark mode follow the switch, `.reveal` elements fade in.
- Events on `document`: `sh1ftw-lang`, `sh1ftw-theme`. API: `window.SH1FTW.lang()`, `.setLang()`, `.theme()`, `.setTheme()`,
  `.reveal()` (for content rendered later).

**What a page keeps for itself**

Its palette (override the tokens above on `:root` and in the two dark blocks; at least `--accent`), its fonts if it has
any, the hero, sections, cards, buttons, screenshots and texts. The start page overrides `--max`, `--nav-h`, `--nav-gap`
and `--nav-pad` to stay a little more compact and styles its `.lang` like the platform filter.

`build/` (ignored by git) holds the before/after comparison images from the migration.
