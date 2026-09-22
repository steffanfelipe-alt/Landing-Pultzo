// Frame-time measurement while a synthetic reader scrolls the whole page.
// Reports long frames (>20ms) and the share of frames over 16.7ms.
import { createRequire } from "node:module";
const { chromium } = createRequire(process.cwd() + "/package.json")("playwright-core");
const b = await chromium.launch({ executablePath: process.env.SCROLLCRAFT_CHROME, headless: true });
for (const [name, vp] of [["desk", { width: 1440, height: 900 }], ["phone", { width: 390, height: 844 }]]) {
  const pg = await b.newPage({ viewport: vp, deviceScaleFactor: 2 });
  const t0 = Date.now();
  await pg.goto("http://localhost:4500/", { waitUntil: "load" });
  const loadMs = Date.now() - t0;
  const nav = await pg.evaluate(() => { const n = performance.getEntriesByType("navigation")[0]; const r = performance.getEntriesByType("resource").map(e => ({ n: e.name.split("/").pop(), kb: Math.round(e.transferSize / 1024), ms: Math.round(e.responseEnd - e.startTime) })); return { dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd), res: r }; });
  await pg.waitForTimeout(2200);
  const res = await pg.evaluate(async () => {
    const H = document.documentElement.scrollHeight - innerHeight;
    const frames = [];
    let last = performance.now();
    let y = 0;
    await new Promise(done => {
      function tick(now) {
        frames.push(now - last); last = now;
        y += 14; scrollTo(0, y);
        if (y < H) requestAnimationFrame(tick); else done();
      }
      requestAnimationFrame(tick);
    });
    frames.shift();
    const long = frames.filter(f => f > 20).length, over = frames.filter(f => f > 16.7).length;
    const avg = frames.reduce((a, b) => a + b, 0) / frames.length;
    const sorted = [...frames].sort((a, b) => a - b);
    return { frames: frames.length, avg: +avg.toFixed(2), p95: +sorted[Math.floor(sorted.length * 0.95)].toFixed(2), max: +Math.max(...frames).toFixed(1), long, over };
  });
  // idle check: does the page's own loop stop when nothing moves?
  await pg.waitForTimeout(1500);
  const idle = await pg.evaluate(() => new Promise(r => { let n = 0; const s = performance.now(); (function f() { n++; if (performance.now() - s < 1000) requestAnimationFrame(f); else r(n); })(); }));
  console.log(name, JSON.stringify({ loadMs, dcl: nav.dcl, load: nav.load, resources: nav.res, scroll: res, rafPerSecIdle: idle }));
  await pg.close();
}
await b.close();
