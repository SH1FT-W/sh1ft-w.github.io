# README images

One template for the README of every SH1FT-W repository: a title image at the top (logo, name, one sentence, pills and a
real screenshot in a window) and feature cards as plain Markdown tables, so the text stays text: crisp on every display,
searchable, readable by screen readers, and it follows GitHub's light and dark mode on its own. The title follows the
project's own colours and fonts in both modes.

```
npm install                      # once: the playwright package (Chromium)
node render.mjs ../../../casora  # renders the title and writes the cards for that repository
node render.mjs ../../../casora title
node render.mjs ../../../casora cards
```

Each repository keeps its content in `docs/readme-images.json`:

- `docs/images/readme-title-light.webp` / `-dark.webp` (2560 × 1280, twice the width GitHub shows, WebP at quality 92)
- `docs/images/readme-title-social.png` (1280 × 640, the light title for Settings › Social preview, which takes no WebP)
- `readme-title-<variant>-light.webp` / `-dark.webp` for a `titleVariants` entry (AgentBar: `de` for README.de.md)
- the cards as `<table>` blocks between `<!-- cards:<set> -->` and `<!-- /cards:<set> -->` in every `README*.md`, with the
  icons as `docs/images/icons/<name>-light.svg` / `-dark.svg` in the project's accent colour

A README embeds the title with `<picture>` so the dark version loads in dark mode:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/readme-title-dark.webp" />
  <img src="docs/images/readme-title-light.webp" alt="Casora: Your home. At ease. The home view on a desktop." />
</picture>
```

For the cards, put an empty `<!-- cards:new --><!-- /cards:new -->` where the set belongs and render; the renderer fills
it and rewrites it on every run, so the texts live in the JSON only.

## `docs/readme-images.json`

| Key | Meaning |
|:--|:--|
| `title.name`, `eyebrow`, `lead`, `sub`, `pills` | The text on the left. `lead` may contain `<em>` for the accent colour and `<br>`. Pills are `["text"]` or `["text", "v"]` for the second colour. |
| `title.logo` | Path of the app icon, relative to the repository. |
| `title.nameSize` | Optional font size of the name in px (default 68) for long names. |
| `title.logoWide` | `true` when `logo` is a full logo with wordmark: shown alone, without the rounded icon frame and the name. |
| `title.grid` | `true` draws a faint dot grid on the background (FLODE). |
| `title.shot` | The screenshot: `light`/`dark` paths, `srcW` (its pixel width), `winW` (how many source pixels the window shows), `s` (scale, at most 0.5: the window shows `winW` source pixels at `winW · s` CSS pixels and the output is 2×, so anything above 0.5 would upscale the screenshot and is capped), `strips` (`[[y0, y1], …]` rows of the source that are shown, the rest is skipped), `bar` (window title, `null` for a floating panel), `left`/`top` (position), `flat` (less perspective). Take screenshots at 2× (`deviceScaleFactor: 2`); for integrations without a screen of their own the window shows the feature block of the project page (`docs/images/title-shot-light.png` / `-dark.png`). |
| `titleVariants` | Optional: `{ "de": { …overrides… } }` renders a second title with other words or screenshots. |
| `colors.light` / `colors.dark` | The project palette, taken from its `docs/index.html`: `bg`, `bg2`, `ink`, `ink2`, `ink3`, `accentText`, `accent`, `accent2`, `glow1`, `glow2`, `frame`, `pillBg`, `pillLine`, `win` (window background), `bar` (window title bar). |
| `fonts` | Optional `display`, `body`, `mono` stacks and a `google` stylesheet URL. Default is the system font, like the websites. |
| `cards` | `{ "<set>": [{ "icon", "title", "text", "ver" }] }`, or `{ "<set>": { "cols": 3, "items": [...] } }` for three short cards in a row. Icons are [Material Design Icons](https://pictogrammers.com/library/mdi/) names (`source-branch`), the set Home Assistant uses, or a path or URL of a picture (a project's own app icon). `ver` is an optional pill (version or shortcut). |

Re-render after changing a screenshot, a sentence or a colour, then commit the pictures and the README together.
The template itself only changes here; a breaking change becomes `theme/v2/readme-images/`.
