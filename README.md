<div align="center">

<img src="icons/sh1ft-w-logo.png" alt="SH1FT-W" height="48" />

<a href="https://sh1ft-w.github.io"><b>Website</b></a>&emsp;<a href="#add-a-project">Add a project</a>&emsp;<a href="#project-bar">Project bar</a>&emsp;<a href="#shared-design">Shared design</a>&emsp;<a href="#readme-pictures">README pictures</a>

</div>

<br/>

The start page for all SH1FT-W projects at **https://sh1ft-w.github.io**: three big projects with a screenshot on top, every other project as a row in a catalogue, each with its latest release.

The same repository also serves what every project site loads from here: the project bar at the top and the shared design. Changing these files changes every project site at once.

## What is where

| File | What it does |
|:--|:--|
| `projects.js` | The one list of projects (name, tagline, icon, colour, site, repo, last release). The start page and the project bar read it. |
| `index.html` | The start page |
| `bar.js` | The project bar on every project site |
| `theme/v2/` | Shared stylesheet, script and fonts for the start page and the project pages; `readme-images/` renders the README title banners and the README footer |
| `theme/v1/` | The previous design. Stays as it is for pages that still load it. |
| `shots/` | Screenshots of the featured projects on the start page (1600 px wide WebP, light and dark) |
| `readme/footer.png` | The footer of every README: all released projects on one lane |
| `icons/` | Project icons and the SH1FT-W logo |

<a id="add-a-project"></a>
## Add a project

1. **Put its icon** into `icons/`.
2. **Add an entry** to `projects.js`. `platform` decides the section, `group` the catalogue block inside it (names and order in `SH1FTW_GROUPS`); `feature` with two screenshots in `shots/` puts it on top instead. `iconStyle`: leave it out for a full-bleed square, `"mac"` for a macOS icon with its built-in margin, `"glyph"` for a transparent mark on a neutral tile.
3. **Include `bar.js`** on its site.
4. **Render the README footer again**: `node theme/v2/readme-images/render.mjs --footer`.

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
<link rel="stylesheet" href="https://sh1ft-w.github.io/theme/v2/theme.css">
<script src="https://sh1ft-w.github.io/theme/v2/theme.js"></script>
```

Put both in `<head>` **before** the page's own `<style>`. The script loads synchronously on purpose, so language and colour scheme are set before the first paint. The path is versioned: a breaking change becomes a new folder and the old one stays untouched.

| Part | What it is |
|:--|:--|
| Type | Archivo, one variable family (width 62 to 125, weight 100 to 900, upright and italic), served from `theme/v2/fonts/`. No request to a third party. Headlines are wide and heavy like the wordmark, only `h1` leans. |
| Colour | Brand colours from the logo (`--magenta`, `--pink`, `--red`, `--orange`, `--brand`), surfaces and text for light and dark. A project page overrides `--accent`, `--accent-ink`, `--on-accent`, `--lane-a`, `--lane-b` and, if it wants, the surfaces. |
| The lanes | Three slanted bars, the shape of the S in the logo: `.s-lanes > .s-lane > .s-track`. The block is skewed once, so all bars start on one slanted line; items inside stand upright. `.s-lanes.drift` moves the tracks slowly (start page). The one loud element of a page. |
| Navigation | `.navwrap > .nav` with `.brand`, `.nav-links` (`a.opt` hidden below 960 px), the light/dark button `.iconbtn#theme`, the DE/EN switch `.lang button[data-l]` |
| Buttons | `.btn`, `.btn.ghost`, `.btn.dark`, `.btn.small` |
| Bilingual | `<span class="en">` and `<span class="de">`, the page language hides the other one |

`theme.js` is the same as in v1: language from `localStorage["sh1ftw-lang"]` or the browser, colour scheme from `?theme=dark|light`, `localStorage["sh1ftw-theme"]` or the system, events `sh1ftw-lang` and `sh1ftw-theme`, API `window.SH1FTW`. `.reveal` no longer animates.

## README pictures

```bash
cd theme/v2/readme-images && npm install
node render.mjs ~/Software/<repo>     # banner 1280 x 440 light and dark, social preview 1280 x 640
node render.mjs --footer              # readme/footer.png
```

Texts and colours come from the repository's `docs/readme-images.json` (`title.name`, `title.line`, `title.lanes`, `title.logo`, `colors`). The fields are described at the top of `render.mjs`.

`build/` (ignored by git) holds the before/after comparison images from the migration.
