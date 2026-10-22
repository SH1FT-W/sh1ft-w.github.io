# README images

One template for the README of every SH1FT-W repository: a title image at the top (logo, name, one sentence, a real
screenshot in a window) and rows of feature cards instead of tables. Both follow the project's own colours and fonts,
light and dark, so the README looks like the website and GitHub shows the right version for each visitor.

```
npm install                      # once: the playwright package (Chromium)
node render.mjs ../../../casora  # renders everything for that repository
node render.mjs ../../../casora title
node render.mjs ../../../casora cards
```

Each repository keeps its content in `docs/readme-images.json` and gets the pictures in `docs/images/`:

- `readme-title-light.png` / `-dark.png` (2560 × 1280, also the social preview under Settings › Social preview)
- `readme-title-<variant>-light.png` for a `titleVariants` entry (AgentBar: `de` for README.de.md)
- `readme-cards-<set>-light.png` / `-dark.png` for every set under `cards`

A README embeds them with `<picture>` so the dark version loads in dark mode, and repeats the card texts in the
`alt` text so search and screen readers see them:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/readme-cards-new-dark.png" />
  <img src="docs/images/readme-cards-new-light.png" alt="Card one: text. Card two: text." />
</picture>
```

## `docs/readme-images.json`

| Key | Meaning |
|:--|:--|
| `title.name`, `eyebrow`, `lead`, `sub`, `pills` | The text on the left. `lead` may contain `<em>` for the accent colour and `<br>`. Pills are `["text"]` or `["text", "v"]` for the second colour. |
| `title.logo` | Path of the app icon, relative to the repository. |
| `title.nameSize` | Optional font size of the name in px (default 68) for long names that should wrap onto two lines. |
| `title.logoWide` | `true` when `logo` is a full logo with wordmark: shown alone, without the rounded icon frame and the name. |
| `title.grid` | `true` draws a faint dot grid on the background (FLODE). |
| `title.shot` | The screenshot: `light`/`dark` paths, `srcW` (its pixel width), `winW` (how many source pixels the window shows), `s` (scale), `strips` (`[[y0, y1], …]` rows of the source that are shown, the rest is skipped), `bar` (window title, `null` for a floating panel), `left`/`top` (position), `flat` (less perspective). |
| `titleVariants` | Optional: `{ "de": { …overrides… } }` renders a second title with other words or screenshots. |
| `colors.light` / `colors.dark` | The project palette, taken from its `docs/index.html`: `bg`, `bg2`, `ink`, `ink2`, `ink3`, `accentText`, `accent`, `accent2`, `glow1`, `glow2`, `frame`, `pillBg`, `pillLine`, `win` (window background), `bar` (window title bar). |
| `fonts` | Optional `display`, `body`, `mono` stacks and a `google` stylesheet URL. Default is the system font, like the websites. |
| `cards` | `{ "<set>": [{ "icon", "title", "text", "ver" }] }`, or `{ "<set>": { "cols": 3, "items": [...] } }` for three short cards in a row. Icons are [Material Design Icons](https://pictogrammers.com/library/mdi/) names (`source-branch`), the set Home Assistant uses, or a path or URL of a picture (a project's own app icon). `ver` is an optional pill (version or shortcut). |

Re-render after changing a screenshot, a sentence or a colour, then commit the pictures with the README.
The template itself only changes here; a breaking change becomes `theme/v2/readme-images/`.
