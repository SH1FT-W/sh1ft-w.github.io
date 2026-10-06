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
      const label = p.name + (p.soon ? " (coming soon)" : "");
      return `<a class="p${on ? " on" : ""}${p.soon ? " soon" : ""}" href="${esc(href)}" style="--c:${esc(p.color)}"
        data-name="${esc(p.name)}"${p.soon ? ' data-soon=""' : ""} aria-label="${esc(label)}"${on ? ' aria-current="page"' : ""}>
        <span class="ic${p.iconStyle ? " " + esc(p.iconStyle) : ""}"><img src="${esc(base + p.icon)}" alt=""></span>${on ? `<b aria-hidden="true">${esc(p.name)}</b>` : ""}</a>`;
    }).join("");
    root.innerHTML = `<style>
      :host { all: initial; display: block; position: relative; z-index: 2147483000; contain: layout style; }
      nav { box-sizing: border-box; height: 40px; display: flex; align-items: center; gap: 2px; padding: 0 16px;
        background: #161617; color: #f5f5f7; box-shadow: inset 0 -1px 0 rgba(255,255,255,.07);
        font: 400 13px/1 -apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, "Segoe UI", Roboto, system-ui, sans-serif;
        letter-spacing: -.01em; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
        overflow-x: auto; overflow-y: hidden; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
      nav::-webkit-scrollbar { display: none; }
      nav.more { -webkit-mask-image: linear-gradient(90deg, #000 calc(100% - 40px), transparent);
        mask-image: linear-gradient(90deg, #000 calc(100% - 40px), transparent); }
      a { color: inherit; text-decoration: none; flex: none; outline: none; -webkit-tap-highlight-color: transparent; }
      a:focus-visible { box-shadow: 0 0 0 2px #161617, 0 0 0 4px #2997ff; }
      .home { font-weight: 600; letter-spacing: .01em; color: rgba(245,245,247,.82); padding: 6px 6px; margin-left: -6px;
        border-radius: 7px; transition: color .2s; }
      .home:hover { color: #fff; }
      .sep { flex: none; width: 1px; height: 18px; background: rgba(255,255,255,.16); margin: 0 10px 0 8px; }
      .p { display: flex; align-items: center; gap: 8px; height: 32px; padding: 0 4px; border-radius: 9px;
        transition: background .2s; }
      .ic { position: relative; display: block; width: 24px; height: 24px; border-radius: 5.4px; overflow: hidden; flex: none;
        transition: opacity .2s, transform .2s cubic-bezier(.2,.8,.2,1); }
      .ic img { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
      .ic.mac img { inset: -12.15%; width: 124.3%; height: 124.3%; }
      .ic.glyph { background: #2c2c2e; }
      .ic.glyph img { inset: 15%; width: 70%; height: 70%; }
      .ic::after { content: ""; position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 0 0 0 .5px rgba(255,255,255,.14); }
      .p:not(.on) .ic { opacity: .82; }
      .p.soon:not(.on) .ic { opacity: .42; }
      .p:not(.on):hover, .p:not(.on):focus-visible { background: rgba(255,255,255,.08); }
      .p:not(.on):hover .ic, .p:not(.on):focus-visible .ic { opacity: 1; transform: scale(1.08); }
      .p.on { padding-right: 12px; cursor: default; margin: 0 2px;
        background: color-mix(in srgb, var(--c) 20%, #232325);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--c) 38%, transparent); }
      .p.on b { font-weight: 600; color: color-mix(in srgb, var(--c) 70%, #fff); white-space: nowrap; }
      .tip { position: absolute; top: 44px; left: 0; pointer-events: none; white-space: nowrap;
        padding: 6px 10px; border-radius: 8px; background: rgba(36,36,38,.96); color: #f5f5f7;
        box-shadow: 0 0 0 .5px rgba(255,255,255,.12), 0 8px 24px rgba(0,0,0,.28);
        font: 500 12px/1.2 -apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, "Segoe UI", Roboto, system-ui, sans-serif;
        letter-spacing: -.005em; -webkit-font-smoothing: antialiased;
        opacity: 0; transform: translateY(-3px); transition: opacity .15s, transform .15s; }
      .tip.show { opacity: 1; transform: none; }
      .tip i { font-style: normal; color: rgba(245,245,247,.6); margin-left: 6px; }
      @media (max-width: 440px) {
        nav { padding: 0 10px 0 12px; gap: 0; }
        .home { font-size: 12.5px; }
        .sep { margin: 0 6px 0 4px; }
        .p { padding: 0 3px; }
        .ic { width: 22px; height: 22px; border-radius: 5px; }
        .p.on { gap: 6px; padding-right: 9px; margin: 0 3px; }
      }
      @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
    </style>
    <nav aria-label="SH1FT-W projects"><a class="home" href="${esc(base + (current ? "?from=" + encodeURIComponent(current) : ""))}" title="All SH1FT-W projects">SH1FT-W</a><span class="sep" aria-hidden="true"></span>${items}</nav><div class="tip" role="presentation"></div>`;

    const nav = root.querySelector("nav");
    const tip = root.querySelector(".tip");

    // Name label under an icon on hover or keyboard focus (touch users get the start page instead).
    let hideTimer;
    const show = (a) => {
      clearTimeout(hideTimer);
      tip.innerHTML = esc(a.dataset.name) + (a.hasAttribute("data-soon") ? "<i>Coming soon</i>" : "");
      const r = a.getBoundingClientRect(), hr = host.getBoundingClientRect();
      const w = tip.offsetWidth;
      const x = Math.min(Math.max(8, r.left - hr.left + r.width / 2 - w / 2), hr.width - w - 8);
      tip.style.left = x + "px";
      tip.classList.add("show");
    };
    const hide = () => { hideTimer = setTimeout(() => tip.classList.remove("show"), 60); };
    root.querySelectorAll(".p:not(.on)").forEach((a) => {
      a.addEventListener("mouseenter", () => show(a));
      a.addEventListener("mouseleave", hide);
      a.addEventListener("focus", () => { if (a.matches(":focus-visible")) show(a); });
      a.addEventListener("blur", hide);
    });
    root.querySelector(".p.on")?.addEventListener("click", (e) => e.preventDefault());

    // Fade the right edge while more icons are hidden behind it; keep the current project in view.
    const edge = () => nav.classList.toggle("more", nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 2);
    const on = root.querySelector(".p.on");
    if (on && on.offsetLeft + on.offsetWidth > nav.clientWidth) nav.scrollLeft = on.offsetLeft - 80;
    nav.addEventListener("scroll", () => { edge(); tip.classList.remove("show"); }, { passive: true });

    // Visible part of the bar, for pages with a fixed header.
    const html = document.documentElement;
    const update = () => {
      const h = host.offsetHeight;
      html.style.setProperty("--sh1ftw-offset", Math.max(0, h - window.scrollY) + "px");
    };
    update();
    edge();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", () => { update(); edge(); });
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
