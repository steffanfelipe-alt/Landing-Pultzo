import { createRequire } from "node:module";
const { chromium } = createRequire(process.cwd() + "/package.json")("playwright-core");
const b = await chromium.launch({ executablePath: process.env.SCROLLCRAFT_CHROME, headless: true });
for (const [name, vp] of [["desk", { width: 1440, height: 900 }], ["phone", { width: 390, height: 844 }]]) {
  const pg = await b.newPage({ viewport: vp, deviceScaleFactor: 1 });
  const errors = []; pg.on("pageerror", e => errors.push(String(e))); pg.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  await pg.goto("http://localhost:4500/", { waitUntil: "networkidle" });
  const acts = await pg.evaluate(() => Object.fromEntries(["hero","a-agenda","a-seguimiento","a-panel","onboarding"].map(id => { const el = document.getElementById(id); return [id, { top: el.offsetTop, h: el.offsetHeight }]; })));
  const vh = vp.height;
  const at = (id, f) => acts[id].top + f * (acts[id].h - vh);
  const shots = [["hero0", at("hero", 0)], ["hero15", at("hero", 0.15)], ["hero30", at("hero", 0.30)], ["hero34", at("hero", 0.34)], ["hero36", at("hero", 0.36)], ["hero42", at("hero", 0.42)], ["hero62", at("hero", 0.62)], ["hero85", at("hero", 0.85)], ["agenda", at("a-agenda", 0.75)], ["seg", at("a-seguimiento", 0.7)], ["panel", at("a-panel", 0.55)], ["onb", acts.onboarding.top + 80]];
  // walk there in steps so the choreography sees the scroll, like a person would
  let y = 0;
  for (const [label, target] of shots) {
    while (Math.abs(target - y) > 260) { y += Math.sign(target - y) * 260; await pg.evaluate(v => scrollTo(0, v), y); await pg.waitForTimeout(90); }
    y = target; await pg.evaluate(v => scrollTo(0, v), y); await pg.waitForTimeout(1000);
    await pg.screenshot({ path: "lab/walk/" + name + "-" + label + ".png" });
  }
  console.log(name, "errors:", JSON.stringify(errors));
  await pg.close();
}
await b.close();
