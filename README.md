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

The seven project pages (AgentBar, Evenlight, Pulse, ShareMount, FLODE, Casora and this start page) each keep
their own copy of the floating glass navigation, the light/dark switch and the language toggle. A change therefore
has to be made seven times. A shared, versioned `theme.css` / `theme.js` served from this repository (next to
`bar.js`) is planned so that every page loads the same navigation and tokens; until then, keep the copies in sync by
hand when one of them changes. Nothing is built here yet; this section only records the plan.
