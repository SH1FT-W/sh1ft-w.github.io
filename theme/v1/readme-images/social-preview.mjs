// Sets the GitHub social preview of every SH1FT-W repository to its docs/images/readme-title-social.png.
// GitHub has no API for the social preview, so this drives the settings page in a visible Chromium window:
//   node social-preview.mjs            all repositories below
//   node social-preview.mjs casora     only one (the local folder name)
// A window opens on github.com; sign in once (with 2FA if asked), then the script continues on its own and
// prints one line per repository. Needs the playwright package of this folder (npm install) and a screen.
// Passkey sign-in does not work in this window. Instead, copy the `user_session` cookie of github.com from a
// browser you are signed in with (DevTools › Application › Cookies › https://github.com › user_session) and run
//   GITHUB_SESSION=<value> node social-preview.mjs
// The script then runs without a window and never stores the cookie.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const software = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../../..');

// local folder -> GitHub repository
const REPOS = {
  casora: 'casora', flode: 'flode', pulse: 'pulse', 'jbl-bar': 'jbl-bar', ps5: 'playstation-5', helialux: 'helialux',
  fluval: 'fluval', chihiros: 'chihiros', 'ring-plus': 'ring-intercom-plus', unas: 'unifi-unas',
  'unifi-dreamrouter7': 'unifi-dreamrouter7', 'pflanzenmonitor-plus': 'pflanzenmonitor-plus', wetter: 'wetter-warnungen',
  recall: 'recall', agentbar: 'agentbar', sharemount: 'sharemount', 'SH1FT-W': 'SH1FT-W',
};
const only = process.argv[2];
const jobs = Object.entries(REPOS).filter(([dir]) => !only || dir === only);

const profile = path.join(process.env.HOME, '.cache', 'sh1ft-w-social-preview');   // keeps the GitHub sign-in between runs
const session = process.env.GITHUB_SESSION;
const ctx = session
  ? await chromium.launchPersistentContext(profile + '-cookie', { headless: true, viewport: { width: 1280, height: 900 } })
  : await chromium.launchPersistentContext(profile, { headless: false, viewport: { width: 1280, height: 900 } });
if (session) {
  const c = (name, value, extra = {}) => ({ name, value, domain: 'github.com', path: '/', secure: true, sameSite: 'Lax', ...extra });
  await ctx.addCookies([c('user_session', session, { httpOnly: true }), c('__Host-user_session_same_site', session, { httpOnly: true, sameSite: 'Strict' }), c('logged_in', 'yes')]);
}
const page = await ctx.newPage();

await page.goto('https://github.com/login');
if (!page.url().startsWith('https://github.com/login')) console.log('signed in');
else if (session) { console.log('the cookie did not sign in, it may have expired'); await ctx.close(); process.exit(1); }
else {
  console.log('please sign in to GitHub in the window');
  await page.waitForURL((u) => !u.href.includes('/login') && !u.href.includes('/sessions/'), { timeout: 10 * 60 * 1000 });
}

for (const [dir, repo] of jobs) {
  const file = path.join(software, dir, 'docs', 'images', 'readme-title-social.png');
  if (!fs.existsSync(file)) { console.log(`${repo}: no readme-title-social.png, skipped`); continue; }
  try {
    await page.goto(`https://github.com/SH1FT-W/${repo}/settings`, { waitUntil: 'domcontentloaded' });
    const section = page.locator('#social-preview, [id*="social"]').first();
    await section.waitFor({ timeout: 20000 });
    // The "Edit" button opens a menu with "Upload an image..."; the hidden file input takes the picture directly.
    const input = page.locator('input[type="file"][name*="social"], input[type="file"][accept*="image"]').first();
    await input.setInputFiles(file);
    await page.waitForTimeout(4000);   // GitHub uploads on change and reloads the preview
    const ok = await page.locator('img[src*="repository-images"]').count();
    console.log(`${repo}: ${ok ? 'uploaded' : 'uploaded? check the page'}`);
  } catch (e) {
    console.log(`${repo}: failed (${e.message.split('\n')[0]})`);
  }
}
if (session) { await ctx.close(); fs.rmSync(profile + '-cookie', { recursive: true, force: true }); console.log('done'); }
else {
  console.log('done, the window stays open for a look; close it to finish');
  await page.waitForEvent('close', { timeout: 0 }).catch(() => {});
  await ctx.close();
}
