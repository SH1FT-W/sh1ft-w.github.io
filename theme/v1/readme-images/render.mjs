// Renders the README pictures of one repository from its docs/readme-images.json and writes the feature cards
// into the README as plain Markdown tables:
//   node render.mjs <repo dir>            title image(s) and cards
//   node render.mjs <repo dir> title      only the title image(s)
//   node render.mjs <repo dir> cards      only the cards (README tables and icons, no pictures)
// Title output: <repo>/docs/images/readme-title-{light,dark}.webp (2560×1280, twice the width GitHub shows),
// readme-title-<variant>-*.webp for titleVariants and readme-title-social.png (1280×640, for the GitHub social preview).
// Cards: every `<!-- cards:<set> -->…<!-- /cards:<set> -->` block in README*.md is rewritten with a table from the
// set; an old `<picture>` that still embeds readme-cards-<set>-light.png is replaced by such a block. Icons go to
// docs/images/icons/<name>-{light,dark}.svg in the project's accent colour. Needs the playwright package (npm install here).
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const here = path.dirname(new URL(import.meta.url).pathname);
const [repoArg, only] = process.argv.slice(2);
if (!repoArg) { console.error('usage: node render.mjs <repo dir> [title|cards]'); process.exit(2); }
const repo = path.resolve(repoArg);
const cfgPath = path.join(repo, 'docs', 'readme-images.json');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const outDir = path.join(repo, cfg.out || 'docs/images');
fs.mkdirSync(outDir, { recursive: true });
const base = 'file://' + repo + '/';

const FONTS = Object.assign({
  display: '-apple-system, "SF Pro Display", system-ui, sans-serif',
  body: '-apple-system, "SF Pro Text", system-ui, sans-serif',
  mono: 'ui-monospace, "SF Mono", Menlo, monospace',
  google: '',
}, cfg.fonts || {});

// ---------- Title ----------
if (!only || only === 'title') {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const titles = Object.assign({ '': cfg.title }, cfg.titleVariants || {});
  for (const [variant, t] of Object.entries(titles)) {
    const title = Object.assign({}, cfg.title, t, { shot: Object.assign({}, cfg.title.shot, (t && t.shot) || {}) });
    // The window shows `winW` source pixels at winW·s CSS pixels; at the 2× output that is 2·s device pixels per source
    // pixel. Above 0.5 the screenshot would be upscaled and go soft, so the scale is capped there.
    if (title.shot.s > 0.5) { console.warn(`  shot scale ${title.shot.s} would upscale the screenshot, using 0.5`); title.shot.s = 0.5; }
    for (const dark of [false, true]) {
      const name = 'readme-title' + (variant ? '-' + variant : '') + (dark ? '-dark' : '-light');
      const png = path.join(outDir, name + '.png');
      await shoot(browser, 'title.html', { ...title, colors: cfg.colors, fonts: FONTS, dark, base }, 2, png);
      await toWebp(browser, png, path.join(outDir, name + '.webp'));
      if (!dark && !variant) await shoot(browser, 'title.html', { ...title, colors: cfg.colors, fonts: FONTS, dark, base }, 1, path.join(outDir, 'readme-title-social.png'));
      fs.unlinkSync(png);
      console.log('  ' + path.relative(repo, path.join(outDir, name + '.webp')));
    }
  }
  await browser.close();
}

async function shoot(browser, file, inject, scale, out) {
  const ctx = await browser.newContext({ deviceScaleFactor: scale, viewport: { width: 1280, height: 640 } });
  const page = await ctx.newPage();
  await page.addInitScript((c) => { window.CFG = c; }, inject);
  await page.goto('file://' + path.join(here, file), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1280, height: 640 } });
  await ctx.close();
}

// Chromium encodes the WebP (playwright itself only writes PNG and JPEG).
async function toWebp(browser, png, out) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto('file://' + png);
  const data = await page.evaluate(async () => {
    const img = document.querySelector('img'); await img.decode();
    const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
    c.getContext('2d').drawImage(img, 0, 0); return c.toDataURL('image/webp', 0.92);
  });
  fs.writeFileSync(out, Buffer.from(data.split(',')[1], 'base64'));
  await ctx.close();
}

// ---------- Cards ----------
if (!only || only === 'cards') {
  const iconDir = path.join(outDir, 'icons');
  fs.mkdirSync(iconDir, { recursive: true });
  const tables = {};
  for (const [set, def] of Object.entries(cfg.cards || {})) {
    const cards = Array.isArray(def) ? def : def.items, cols = Array.isArray(def) ? 2 : def.cols || 2;
    tables[set] = table(cards, cols, iconDir);
  }
  const readmes = fs.readdirSync(repo).filter((f) => /^README.*\.md$/.test(f));
  for (const f of readmes) {
    const p = path.join(repo, f);
    let md = fs.readFileSync(p, 'utf8'), before = md;
    // Old form: a <picture> that embeds the rendered cards.
    md = md.replace(/<picture>\s*<source[^>]*readme-cards-([\w-]+)-dark\.png[^>]*>\s*<img[^>]*readme-cards-\1-light\.png[^>]*>\s*<\/picture>/g,
      (m, set) => tables[set] ? block(set, tables[set]) : m);
    md = md.replace(/<img[^>]*readme-cards-([\w-]+)-light\.png[^>]*>/g, (m, set) => tables[set] ? block(set, tables[set]) : m);
    // Current form: rewrite between the markers.
    md = md.replace(/<!-- cards:([\w-]+) -->[\s\S]*?<!-- \/cards:\1 -->/g, (m, set) => tables[set] ? block(set, tables[set]) : m);
    if (md !== before) { fs.writeFileSync(p, md); console.log('  ' + f + ': cards updated'); }
  }
  for (const f of fs.readdirSync(outDir)) if (/^readme-cards-.*\.png$/.test(f)) fs.unlinkSync(path.join(outDir, f));
}

function block(set, html) { return `<!-- cards:${set} -->\n${html}\n<!-- /cards:${set} -->`; }

function table(cards, cols, iconDir) {
  const rel = path.relative(repo, iconDir).split(path.sep).join('/');
  const esc = (s) => String(s).replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;');
  const rows = [];
  for (let i = 0; i < cards.length; i += cols) {
    const cells = cards.slice(i, i + cols).map((c) => {
      let icon;
      if (/[\/]/.test(c.icon)) icon = `<img src="${c.icon}" width="22" height="22" align="absmiddle" alt="">`;
      else {
        const svg = mdi(c.icon);
        for (const [mode, color] of [['light', cfg.colors.light.accentText], ['dark', cfg.colors.dark.accentText]])
          fs.writeFileSync(path.join(iconDir, `${c.icon}-${mode}.svg`), svg.replace('<svg ', `<svg fill="${color}" `));
        icon = `<picture><source media="(prefers-color-scheme: dark)" srcset="${rel}/${c.icon}-dark.svg"><img src="${rel}/${c.icon}-light.svg" width="22" height="22" align="absmiddle" alt=""></picture>`;
      }
      const ver = c.ver ? ` <code>${esc(c.ver)}</code>` : '';
      // One cell per card: the icon sits inline before the title. A cell of its own for the icon shrinks to nothing on
      // GitHub, because an image with max-width: 100% has no minimum width in the table layout.
      return `<td width="${Math.floor(100 / cols)}%" valign="top">${icon} <b>${esc(c.title)}</b>${ver}<br>${esc(c.text)}</td>`;
    });
    rows.push('<tr>' + cells.join('') + '</tr>');
  }
  return '<table>\n' + rows.join('\n') + '\n</table>';
}

// Material Design Icons (the set Home Assistant uses), cached in node_modules/.mdi so a re-render works offline.
function mdi(name) {
  const cache = path.join(here, 'node_modules', '.mdi'); fs.mkdirSync(cache, { recursive: true });
  const f = path.join(cache, name + '.svg');
  if (!fs.existsSync(f)) {
    const svg = execFileSync('curl', ['-sfL', `https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/${name}.svg`]).toString();
    if (!svg.startsWith('<svg')) throw new Error('unknown icon ' + name);
    fs.writeFileSync(f, svg);
  }
  return fs.readFileSync(f, 'utf8');
}
