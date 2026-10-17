// SH1FT-W shared design, version 1 (https://sh1ft-w.github.io/theme/v1/theme.js)
//
// Load it synchronously in <head>, right after theme.css and before the page's own <style>,
// so the language and the colour scheme are set before the first paint (no flash):
//   <script src="https://sh1ft-w.github.io/theme/v1/theme.js"></script>
//
// What it does, immediately:
//   - language: localStorage "sh1ftw-lang" (shared by all SH1FT-W pages on this origin), else the
//     browser language; sets <html lang="de"|"en">
//   - colour scheme: ?theme=dark|light in the address, else localStorage "sh1ftw-theme", else the
//     system; a choice sets <html data-theme="…">, "system" leaves the attribute off
//   - ?still in the address adds class "still" to <html> (reveal animation off, for screenshots)
// And once the DOM is ready:
//   - .lang button[data-l] switches the language, saves it, marks the button with .on and aria-pressed,
//     swaps document.title with <title data-de="…"> and fires "sh1ftw-lang" on document
//   - #theme toggles light/dark, saves it, fires "sh1ftw-theme" on document; <picture> sources for
//     dark mode follow the switch
//   - .reveal elements get .in when scrolled into view (at once with ?still or reduced motion)
//
// Small API for pages that render content themselves: window.SH1FTW
//   .lang() -> "de"|"en"      .setLang("de")          fires "sh1ftw-lang"
//   .theme() -> "dark"|"light" (effective)   .setTheme("dark"|"light"|"system")
//   .reveal()                  observe .reveal elements added after load
(function () {
  var html = document.documentElement;
  var KEY_LANG = "sh1ftw-lang", KEY_THEME = "sh1ftw-theme";
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  // Before first paint
  var pref = get(KEY_LANG) || ((navigator.languages && navigator.languages[0]) || navigator.language || "en");
  html.lang = /^de/i.test(pref) ? "de" : "en";
  var theme = get(KEY_THEME);
  var m = /[?&]theme=(dark|light)\b/.exec(location.search); if (m) theme = m[1];
  if (theme === "light" || theme === "dark") html.setAttribute("data-theme", theme);
  if (/[?&]still\b/.test(location.search)) html.classList.add("still");

  var titleEl = null, titleEn = null;
  function applyLang(l) {
    html.lang = l;
    titleEl = titleEl || document.querySelector("title");
    if (titleEl) {
      if (titleEn == null) titleEn = titleEl.getAttribute("data-en") || titleEl.textContent;
      var de = titleEl.getAttribute("data-de");
      if (de) document.title = l === "de" ? de : titleEn;
    }
    document.querySelectorAll(".lang button[data-l]").forEach(function (b) {
      var on = b.dataset.l === l;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.dispatchEvent(new Event("sh1ftw-lang"));
  }
  function effectiveTheme() {
    var t = html.getAttribute("data-theme");
    return t === "dark" || t === "light" ? t : (mq.matches ? "dark" : "light");
  }
  function pictures() {
    var forced = html.getAttribute("data-theme");
    document.querySelectorAll("picture > source[srcset]").forEach(function (s) {
      s.media = forced === "dark" ? "all" : forced === "light" ? "not all" : "(prefers-color-scheme: dark)";
    });
  }
  function applyTheme(t) {
    if (t === "dark" || t === "light") html.setAttribute("data-theme", t); else html.removeAttribute("data-theme");
    pictures();
    document.dispatchEvent(new Event("sh1ftw-theme"));
  }

  var io = null;
  function reveal() {
    var els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window) || html.classList.contains("still") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (e) { e.classList.add("in"); }); return;
    }
    io = io || new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  }

  window.SH1FTW = {
    lang: function () { return html.lang === "de" ? "de" : "en"; },
    setLang: function (l) { l = l === "de" ? "de" : "en"; set(KEY_LANG, l); applyLang(l); },
    theme: effectiveTheme,
    setTheme: function (t) { set(KEY_THEME, t === "dark" || t === "light" ? t : null); applyTheme(t); },
    reveal: reveal
  };

  function ready() {
    document.querySelectorAll(".lang button[data-l]").forEach(function (b) {
      b.addEventListener("click", function () { window.SH1FTW.setLang(b.dataset.l); });
    });
    var btn = document.getElementById("theme");
    if (btn) btn.addEventListener("click", function () { window.SH1FTW.setTheme(effectiveTheme() === "dark" ? "light" : "dark"); });
    applyLang(html.lang === "de" ? "de" : "en");
    pictures();
    reveal();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready); else ready();
})();
