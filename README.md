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

To add a project: put its icon into `icons/`, add an entry to `projects.js`, and include `bar.js` on its site.
