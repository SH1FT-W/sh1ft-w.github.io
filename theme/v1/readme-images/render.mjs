// Renders the README images of one repository from its docs/readme-images.json:
//   node render.mjs <repo dir>            everything (title + all card sets)
//   node render.mjs <repo dir> title      only the title image(s)
//   node render.mjs <repo dir> cards      only the cards
// Output: <repo>/docs/images/readme-title-{light,dark}.png (2560×1280), readme-title-<variant>-*.png and
// readme-cards-<set>-{light,dark}.png (1856 px wide). Needs the playwright package (npm install in this folder).
import { createRequire } from 'node:module';
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

const { chromium } = require('playwright');
const browser = await chromium.launch();

async function shoot(file, inject, viewport, scale, out, clipFn) {
  const ctx = await browser.newContext({ deviceScaleFactor: scale, viewport });
  const page = await ctx.newPage();
  await page.addInitScript((c) => { window.CFG = c; }, inject);
  await page.goto('file://' + path.join(here, file), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  await page.screenshot({ path: out, omitBackground: file === 'cards.html', fullPage: true, clip: await clipFn(page) });
  await ctx.close();
  console.log('  ' + path.relative(repo, out));
}

const titles = Object.assign({ '': cfg.title }, cfg.titleVariants || {});
if (!only || only === 'title') {
  for (const [variant, t] of Object.entries(titles)) {
    const title = Object.assign({}, cfg.title, t, { shot: Object.assign({}, cfg.title.shot, (t && t.shot) || {}) });
    for (const dark of [false, true]) {
      const name = 'readme-title' + (variant ? '-' + variant : '') + (dark ? '-dark' : '-light') + '.png';
      await shoot('title.html', { ...title, colors: cfg.colors, fonts: FONTS, dark, base }, { width: 1280, height: 640 }, 3,
        path.join(outDir, name), async () => ({ x: 0, y: 0, width: 1280, height: 640 }));
    }
  }
}
if (!only || only === 'cards') {
  for (const [set, def] of Object.entries(cfg.cards || {})) {
    // A set is a list of cards, or { cols, items } for three columns (short cards).
    const cards = Array.isArray(def) ? def : def.items, cols = Array.isArray(def) ? 2 : def.cols || 2;
    for (const dark of [false, true]) {
      const name = 'readme-cards-' + set + (dark ? '-dark' : '-light') + '.png';
      await shoot('cards.html', { cards, cols, colors: cfg.colors, fonts: FONTS, dark }, { width: 932, height: 800 }, 3, path.join(outDir, name),
        async (page) => { const b = await page.locator('#grid').boundingBox(); return { x: 0, y: 0, width: 932, height: Math.ceil(b.y + b.height + 2) }; });
    }
  }
}
await browser.close();
