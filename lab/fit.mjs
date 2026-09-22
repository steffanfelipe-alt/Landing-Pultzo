// Does every act's copy fit above the fold on a phone once all items are in?
import { createRequire } from "node:module";
const { chromium } = createRequire(process.cwd() + "/package.json")("playwright-core");
const b = await chromium.launch({ executablePath: process.env.SCROLLCRAFT_CHROME, headless: true });
for (const vp of [{ width: 390, height: 844 }, { width: 360, height: 640 }]) {
  const pg = await b.newPage({ viewport: vp });
  await pg.goto("http://localhost:4500/", { waitUntil: "networkidle" });
  const acts = await pg.evaluate(() => ["hero","a-agenda","a-seguimiento","a-panel"].map(id => { const el = document.getElementById(id); return { id, top: el.offsetTop, h: el.offsetHeight }; }));
  let y = 0; const out = [];
  for (const [a, f] of [[acts[0], 0.9], [acts[1], 0.78], [acts[2], 0.78], [acts[3], 0.7]]) {
    const target = a.top + f * (a.h - vp.height);
    while (Math.abs(target - y) > 260) { y += Math.sign(target - y) * 260; await pg.evaluate(v => scrollTo(0, v), y); await pg.waitForTimeout(60); }
    y = target; await pg.evaluate(v => scrollTo(0, v), y); await pg.waitForTimeout(900);
    out.push(await pg.evaluate((id) => {
      const act = document.getElementById(id); const copy = act.querySelector(".tour__copy");
      const items = [...act.querySelectorAll(".feat li")].map(li => ({ op: +getComputedStyle(li).opacity, bottom: Math.round(li.getBoundingClientRect().bottom) }));
      const r = copy.getBoundingClientRect();
      return { id, copyTop: Math.round(r.top), copyBottom: Math.round(r.bottom), vh: innerHeight, items, clipped: items.some(i => i.bottom > innerHeight) };
    }, a.id));
  }
  console.log(vp.width + "x" + vp.height, JSON.stringify(out));
  await pg.close();
}
await b.close();
