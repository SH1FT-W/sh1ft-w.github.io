// Renders the README title of one repository from its docs/readme-images.json, in the v2 design:
//   node render.mjs <repo dir>     docs/images/readme-title-{light,dark}.webp   2560 x 880, the README banner (shown at 1280 x 440)
//                                  docs/images/readme-title-social.png          1280 x 640, GitHub social preview and og:image
//                                  readme-title-<variant>-{light,dark}.webp for every entry in titleVariants
//   node render.mjs --footer       <this site>/readme/footer.png: every released project on one brand lane, the footer
//                                  of every README (transparent, one image for light and dark). Run it when projects.js changes.
// What it reads from "title" in readme-images.json:
//   name            the big name (HTML allowed)
//   line            the one sentence under it; without it, "lead" with its tags removed
//   lanes           three short facts for the lanes; without it, the first three "pills"
//   logo            icon, path inside the repository; "wordmark": true shows it wide without rounded corners
//                   (older files say "logoWide")
//   laneA, laneB    lane colours; without them colors.light.accent and a lighter mix of it
//   onLane          text colour on the lanes (default white; set a dark one for light accents)
// and from "colors": light/dark bg, ink, ink2. Needs the playwright package (npm install here).
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const here = path.dirname(new URL(import.meta.url).pathname);
const { chromium } = require('playwright');
const arg = process.argv[2];
if (!arg) { console.error('usage: node render.mjs <repo dir> | --footer'); process.exit(2); }
const browser = await chromium.launch();

if (arg === '--footer') {
  const out = path.resolve(here, '../../../readme/footer.png');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const ctx = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1280, height: 132 } });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(here, 'footer.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out, omitBackground: true });
  await ctx.close();
  console.log('  ' + out);
} else {
  const repo = path.resolve(arg);
  const cfg = JSON.parse(fs.readFileSync(path.join(repo, 'docs', 'readme-images.json'), 'utf8'));
  const outDir = path.join(repo, cfg.out || 'docs/images');
  fs.mkdirSync(outDir, { recursive: true });
  const strip = (s) => String(s || '').replace(/<[^>]+>/g, '');
  const titles = Object.assign({ '': cfg.title }, cfg.titleVariants || {});
  for (const [variant, tv] of Object.entries(titles)) {
    const t = Object.assign({}, cfg.title, tv);
    for (const dark of [false, true]) {
      const c = cfg.colors[dark ? 'dark' : 'light'];
      const inject = {
        name: t.name, sub: t.line || strip(t.lead), icon: t.logo, wordmark: !!(t.wordmark || t.logoWide),
        lanes: (t.lanes || (t.pills || []).map((p) => p[0])).slice(0, 3),
        laneA: t.laneA || cfg.colors.light.accent, laneB: t.laneB, onLane: t.onLane,
        bg: c.bg, ink: c.ink, ink2: c.ink2, dark, base: 'file://' + repo + '/',
      };
      const name = 'readme-title' + (variant ? '-' + variant : '') + (dark ? '-dark' : '-light');
      const png = path.join(outDir, name + '.png');
      await shoot({ ...inject, slim: true }, 2, 440, png);
      await toWebp(png, path.join(outDir, name + '.webp'));
      fs.unlinkSync(png);
      if (!dark && !variant) await shoot(inject, 1, 640, path.join(outDir, 'readme-title-social.png'));
      console.log('  ' + path.relative(repo, path.join(outDir, name + '.webp')));
    }
  }
}
await browser.close();

async function shoot(inject, scale, height, out) {
  const ctx = await browser.newContext({ deviceScaleFactor: scale, viewport: { width: 1280, height } });
  const page = await ctx.newPage();
  await page.addInitScript((c) => { window.CFG = c; }, inject);
  await page.goto('file://' + path.join(here, 'title.html'), { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.READY === true);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1280, height } });
  await ctx.close();
}

// Chromium encodes the WebP (playwright itself only writes PNG and JPEG).
async function toWebp(png, out) {
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
