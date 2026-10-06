// SH1FT-W project bar. Include on a project site with:
//   <script src="https://sh1ft-w.github.io/bar.js" data-project="casora" defer></script>
// Renders a small dock at the very top of <body> (in a shadow root, so page styles never leak in or out).
// Pages with a position:fixed header can follow the bar with `top: var(--sh1ftw-offset, 0px)`:
// the variable is the part of the bar still visible while scrolling.
(function () {
  const script = document.currentScript;
  if (!script) return;
  const current = script.dataset.project || "";
  const base = new URL(".", script.src).href;

  function render() {
    const projects = window.SH1FTW_PROJECTS || [];
    if (document.getElementById("sh1ftw-bar")) return;
    const host = document.createElement("div");
    host.id = "sh1ftw-bar";
    document.body.prepend(host);
    const root = host.attachShadow({ mode: "open" });
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    const items = projects.map((p) => {
      const on = p.id === current;
      const href = on ? "#" : p.site || base + "#" + p.id;
      return `<a class="p${on ? " on" : ""}${p.soon ? " soon" : ""}" href="${esc(href)}" style="--c:${esc(p.color)}"
        title="${esc(p.name)}${p.soon ? " (coming soon)" : ""}"${on ? ' aria-current="page"' : ""}>
        <img src="${esc(base + p.icon)}" alt="">${on ? `<b>${esc(p.name)}</b>` : `<span class="sr">${esc(p.name)}</span>`}</a>`;
    }).join("");
    root.innerHTML = `<style>
      :host { all: initial; display: block; position: relative; z-index: 2147483000; }
      nav { box-sizing: border-box; height: 38px; display: flex; align-items: center; gap: 4px; padding: 0 14px;
        background: #0f1116; color: #eef0f4; border-bottom: 1px solid #22252d;
        font: 500 13px/1 Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
        overflow-x: auto; scrollbar-width: none; -webkit-font-smoothing: antialiased; }
      nav::-webkit-scrollbar { display: none; }
      a { color: inherit; text-decoration: none; flex: none; }
      a:focus-visible { outline: 2px solid #8ab4ff; outline-offset: 1px; border-radius: 8px; }
      .home { font-weight: 750; letter-spacing: .03em; margin-right: 8px; opacity: .8; padding: 6px 4px; }
      .home:hover { opacity: 1; }
      .p { display: flex; align-items: center; gap: 7px; padding: 4px; border-radius: 9px; transition: background .15s; }
      .p img { width: 22px; height: 22px; border-radius: 6px; display: block; transition: filter .15s, opacity .15s; }
      .p:not(.on) img { filter: saturate(.6); opacity: .72; }
      .p:not(.on):hover { background: #1d2029; }
      .p:not(.on):hover img { filter: none; opacity: 1; }
      .p.soon:not(:hover) img { opacity: .4; }
      .p.on { padding-right: 11px; cursor: default;
        background: color-mix(in srgb, var(--c) 22%, #151821);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--c) 45%, transparent); }
      .p.on b { font-weight: 650; }
      .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
    </style>
    <nav aria-label="SH1FT-W projects"><a class="home" href="${esc(base + (current ? "?from=" + encodeURIComponent(current) : ""))}">SH1FT-W</a>${items}</nav>`;

    // Visible part of the bar, for pages with a fixed header.
    const html = document.documentElement;
    const update = () => {
      const h = host.offsetHeight;
      html.style.setProperty("--sh1ftw-offset", Math.max(0, h - window.scrollY) + "px");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function start() {
    if (window.SH1FTW_PROJECTS) return render();
    const s = document.createElement("script");
    s.src = base + "projects.js";
    s.onload = render;
    document.head.appendChild(s);
  }
  if (document.body) start();
  else document.addEventListener("DOMContentLoaded", start);
})();
