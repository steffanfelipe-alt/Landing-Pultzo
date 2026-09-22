/* Pultzo landing: page-local choreography.
   The engine (scrollcraft.js) owns acts, cues, drift and the magnet. This file
   owns the one object the page is built around: the laptop, posed from the
   acts' --sc-p, and the guided cursor that operates it. On a phone the app
   leaves the lid after the hero and runs 1:1 in a flat window. Everything
   continuous is transform/opacity. */
(function () {
  "use strict";

  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var phoneMQ = matchMedia("(max-width: 860px)");

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var device = $("#device"), scene = $("#scene"), laptop = $("#laptop"), lid = $("#lid"), base = $("#base"),
      screen = $("#screen"), bezel = $("#bezel"), shadow = $("#shadow"), chrome = $("#chrome");
  var flat = $("#flat"), flatHost = $("#flat-host");
  var hero = $("#hero"), closeAct = $("#contacto");
  var tours = $$("[data-tour-view]");
  var app = $("#app"), cursor = $("#cursor");
  var navButtons = $$(".app__nav button[data-view]", app);
  var views = {};
  $$(".app__view", app).forEach(function (v) { views[v.getAttribute("data-view-id")] = v; });
  var HOME = "panel";

  if (!device || !hero || !tours.length) return;
  if (reduce) device.classList.add("is-reduced");

  // --------------------------------------------------------------- helpers
  var clamp01 = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var smooth = function (p, a, b) { var t = clamp01((p - a) / (b - a)); return t * t * (3 - 2 * t); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var P = function (el) { return parseFloat(el.style.getPropertyValue("--sc-p")) || 0; };

  // ------------------------------------------------------------- the poses
  // Boxes are measured at scale 1 with the scene at the viewport centre, so a
  // point q in scene space lands at centre + t + k * q. Measured, not assumed:
  // the projected size of a 3D pose depends on perspective and tilt.
  var vw = 0, vh = 0, phone = false, closeTopDoc = Infinity;
  var closed = null, open = null, full = null;   // {cx, cy, w, h} in scene space
  var copyEl = $(".tour__copy");
  var kH = 1, kT = 1, kF = 1, tH = { x: 0, y: 0 }, tT = { x: 0, y: 0 }, tF = { x: 0, y: 0 };
  var LID_OPEN = 110;

  function setLid(deg) { lid.style.setProperty("--lid", deg.toFixed(2) + "deg"); }

  function box(el) {
    var r = el.getBoundingClientRect();
    return { cx: r.left + r.width / 2 - vw / 2, cy: r.top + r.height / 2 - vh / 2, w: r.width, h: r.height };
  }

  function measure() {
    vw = innerWidth; vh = innerHeight; phone = phoneMQ.matches;
    device.classList.toggle("is-phone", phone);
    var wasHidden = device.classList.contains("is-hidden");
    device.classList.remove("is-hidden");
    var prevT = scene.style.transform, prevLid = lid.style.getPropertyValue("--lid");
    var prevTrans = device.classList.contains("is-reduced");
    if (prevTrans) device.classList.remove("is-reduced");
    scene.style.transform = "none";

    setLid(0);
    closed = box(laptop);
    setLid(LID_OPEN);
    open = box(screen);
    full = box(laptop);   // the whole machine, deck included: its near edge spreads in perspective

    if (phone) {
      // hero: the closed machine under the word, real laptop proportions
      kH = Math.min((vw * 0.84) / closed.w, (vh * 0.2) / closed.h);
      tH = { x: -closed.cx * kH, y: (vh * 0.6 - vh / 2) - closed.cy * kH };
      // open: a little larger, centred, before it hands over to the flat window
      kT = Math.min((vw * 0.92) / open.w, (vh * 0.34) / open.h);
      tT = { x: -open.cx * kT, y: (vh * 0.42 - vh / 2) - open.cy * kT };
      // the flat window: the screen grows until it is exactly the window's
      // panel, then the app moves over. Measured with the window at rest.
      var prevF = flat.style.transform; flat.style.transform = "none";
      var hr = flatHost.getBoundingClientRect();
      flat.style.transform = prevF;
      kF = hr.width / open.w;
      tF = { x: hr.left - vw / 2 - (open.cx - open.w / 2) * kF, y: hr.top - vh / 2 - (open.cy - open.h / 2) * kF };
    } else {
      kH = Math.min(Math.min(vw * 0.72, 1100) / closed.w, (vh * 0.34) / closed.h);
      tH = { x: -closed.cx * kH, y: (vh * 0.66 - vh / 2) - closed.cy * kH };
      // The machine may never cover the copy. Its left edge (the deck's, which
      // reaches further left than the screen) sits flush to the right of the
      // copy column, and the scale is capped so the screen stays on screen.
      var cr = copyEl ? copyEl.getBoundingClientRect() : null;
      var copyRight = cr ? cr.left + cr.width + 28 : vw * 0.42;
      var fullLeft = full.cx - full.w / 2, screenRight = open.cx + open.w / 2;
      kT = Math.min((vw * 0.56) / open.w, (vh * 0.68) / open.h, (vw - 12 - copyRight) / (screenRight - fullLeft));
      tT = { x: copyRight - vw / 2 - fullLeft * kT, y: (vh * 0.5 - vh / 2) - open.cy * kT };
    }

    scene.style.transform = prevT;
    if (prevLid) lid.style.setProperty("--lid", prevLid); else setLid(0);
    if (prevTrans) device.classList.add("is-reduced");
    if (wasHidden) device.classList.add("is-hidden");
    if (!phone && app.parentNode !== bezel) hostApp(false);
    if (closeAct) closeTopDoc = closeAct.getBoundingClientRect().top + scrollY;
    placeCursorAtRest();
    wake();
  }

  // On a phone the app node moves between the lid and the flat window. Same
  // DOM, same state, same cursor; only the container (and so the container
  // query) changes.
  var inFlat = false;
  function hostApp(toFlat) {
    if (toFlat === inFlat) return;
    inFlat = toFlat;
    (toFlat ? flatHost : bezel).appendChild(app);
    flat.classList.toggle("is-on", toFlat);
    // the content changes layout at the swap: let it arrive rather than pop
    if (!reduce) { app.classList.remove("is-arriving"); void app.offsetWidth; app.classList.add("is-arriving"); }
    placeCursorAtRest();
  }

  // ------------------------------------------------------------ the cursor
  // Virtual coordinates inside .app (untransformed layout px), so offsetLeft
  // and offsetTop of any element are the targets.
  var cur = { x: 0, y: 0, tx: 0, ty: 0, pending: null, pressAt: 0, pressEl: null };

  function restPoint() {
    var w = app.clientWidth, h = app.clientHeight;
    return { x: w * 0.56, y: h * 0.5 };
  }
  function placeCursorAtRest() {
    var r = restPoint();
    cur.x = cur.tx = r.x; cur.y = cur.ty = r.y;
    cursor.style.transform = "translate3d(" + cur.x.toFixed(1) + "px," + cur.y.toFixed(1) + "px,0)";
  }
  function buttonFor(view) {
    for (var i = 0; i < navButtons.length; i++) if (navButtons[i].getAttribute("data-view") === view) return navButtons[i];
    return null;
  }
  function targetFor(el) {
    var x = 0, y = 0, n = el;
    while (n && n !== app) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x: x + Math.min(el.offsetWidth * 0.42, 70), y: y + el.offsetHeight * 0.58 };
  }

  var current = null;   // view id currently shown

  function showView(view) {
    if (current === view) return;
    current = view;
    Object.keys(views).forEach(function (k) { views[k].classList.toggle("is-on", k === view); });
    navButtons.forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-view") === view); });
    if (!reduce) {
      app.classList.remove("is-switching");
      void app.offsetWidth;
      app.classList.add("is-switching");
    }
  }

  // send the cursor somewhere, press, then (optionally) switch the view
  function pointAt(el, view) {
    if (!el) { if (view) showView(view); return; }
    if (reduce) { var t0 = targetFor(el); cur.x = cur.tx = t0.x; cur.y = cur.ty = t0.y; if (view) showView(view); cur.pending = null; return; }
    var t = targetFor(el);
    cur.tx = t.x; cur.ty = t.y;
    cur.pending = { view: view || null, el: el };
  }
  function goTo(view) {
    if (view === current) return;
    pointAt(buttonFor(view), view);
  }

  function stepCursor(now) {
    var dx = cur.tx - cur.x, dy = cur.ty - cur.y;
    if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
      cur.x += dx * 0.16; cur.y += dy * 0.16;
      cursor.style.transform = "translate3d(" + cur.x.toFixed(1) + "px," + cur.y.toFixed(1) + "px,0)";
    }
    if (cur.pending && !cur.pressAt && Math.abs(dx) < 2 && Math.abs(dy) < 2) {
      cur.pressAt = now; cur.pressEl = cur.pending.el;
      cursor.classList.add("is-pressed"); cur.pressEl.classList.add("is-pressed");
    }
    if (cur.pressAt && now - cur.pressAt > 140) {
      cursor.classList.remove("is-pressed");
      if (cur.pressEl) cur.pressEl.classList.remove("is-pressed");
      if (cur.pending && cur.pending.view) showView(cur.pending.view);
      cur.pending = null; cur.pressAt = 0; cur.pressEl = null;
    }
  }

  // The sidebar is real navigation: a click scrolls the page to that act.
  navButtons.forEach(function (b) {
    var actId = b.getAttribute("data-act");
    if (!actId) return;
    b.addEventListener("click", function () {
      var act = document.getElementById(actId);
      if (!act) return;
      var travel = Math.max(act.offsetHeight - innerHeight, 1);
      window.scrollTo({ top: act.offsetTop + travel * 0.22, behavior: reduce ? "auto" : "smooth" });
    });
  });

  // ------------------------------------------------- progress-keyed content
  // data-at / data-until: a window of act progress. data-to swaps text (and
  // data-cls swaps a status class). data-cursor sends the cursor to an
  // element ("self" or a selector) and presses it when the beat turns on.
  var keyed = $$("[data-at]", app).map(function (el) {
    var c = el.getAttribute("data-cursor");
    return { el: el, at: parseFloat(el.getAttribute("data-at")), until: parseFloat(el.getAttribute("data-until")),
             to: el.getAttribute("data-to"), cls: el.getAttribute("data-cls"), from: el.textContent,
             base: el.className || "", cursor: c === "self" ? el : (c ? $(c, app) : null), on: false };
  });

  function driveKeyed(view, p, act) {
    // beats belong to the view on screen. While the cursor is still on its
    // way to the sidebar, nothing in the next view may steal it.
    if (view !== current) return;
    // an act may key its beats to a slice of its own progress
    var from = parseFloat(act.getAttribute("data-beat-from")) || 0;
    var to = parseFloat(act.getAttribute("data-beat-to")) || 1;
    p = clamp01((p - from) / (to - from));
    keyed.forEach(function (k) {
      if (!views[view] || !views[view].contains(k.el)) return;
      var on = p >= k.at && !(k.until && p >= k.until);
      if (k.to) {
        if (on && k.el.textContent !== k.to) {
          k.el.textContent = k.to;
          if (k.cls) k.el.className = k.base.replace(/st--\w+/, "") + " " + k.cls;
        } else if (!on && k.el.textContent !== k.from) {
          k.el.textContent = k.from;
          if (k.cls) k.el.className = k.base;
        }
      } else {
        k.el.classList.toggle("is-on", on);
      }
      if (on && !k.on && k.cursor) pointAt(k.cursor, null);
      k.on = on;
    });
  }

  // ------------------------------------------------------------- the frame
  // The loop runs only while something moves: the page, the cursor, a press.
  // After ~45 still frames it stops, and any scroll, wheel, touch, key or
  // resize wakes it. No work on an idle page.
  var lastIdx = -2, lastLid = -1, lastOpacity = -1, chromeOn = null, hiddenNow = false;
  var lastScene = "", lastShadow = "", lastShadowOp = "", lastDeck = "";
  var running = false, lastY = -1, still = 0;

  function wake() {
    still = 0;
    if (!running) { running = true; requestAnimationFrame(frame); }
  }
  ["scroll", "wheel", "touchmove", "keydown", "pointerdown"].forEach(function (ev) {
    addEventListener(ev, wake, { passive: true });
  });

  function frame(now) {
    var y = scrollY;
    var cursorBusy = cur.pending || cur.pressAt || Math.abs(cur.tx - cur.x) > 0.2 || Math.abs(cur.ty - cur.y) > 0.2;
    if (y === lastY && !cursorBusy) still++; else still = 0;
    lastY = y;
    if (still > 45) { running = false; return; }

    var ph = P(hero);
    var last = tours[tours.length - 1];
    var pl = P(last);
    var pc = closeAct ? P(closeAct) : 0;

    // the lid opens in the first quarter of the merged act and the machine
    // settles by a third, which is where the first copy arrives
    var eLid = reduce ? (ph > 0.12 ? 1 : 0) : smooth(ph, 0.02, 0.26);
    var lidDeg = LID_OPEN * eLid;

    // pose: hero -> tour; at the end of the tour the machine recedes and leaves
    var eMove = reduce ? (ph > 0.2 ? 1 : 0) : smooth(ph, 0.08, 0.34);
    var eExit = reduce ? (pl > 0.85 ? 1 : 0) : smooth(pl, 0.72, 1);
    var k = lerp(kH, kT, eMove) * (1 - 0.22 * eExit);
    var tx = lerp(tH.x, tT.x, eMove), ty = lerp(tH.y, tT.y, eMove) + eExit * vh * 0.1;
    var opacity = 1 - smooth(pl, 0.8, 1);
    // on a phone the screen grows into the flat window while the deck fades;
    // the app moves over once the two rectangles coincide
    var eFlat = phone ? (reduce ? (ph > 0.3 ? 1 : 0) : smooth(ph, 0.26, 0.4)) : 0;
    if (phone) {
      k = lerp(k, kF, eFlat); tx = lerp(tx, tF.x, eFlat); ty = lerp(ty, tF.y, eFlat);
      // deck and shadow are gone by the time the screen reaches the window
      // rect; the window's dark frame has already faded in BEHIND the
      // growing screen (the scene paints above it), so when the app moves
      // over at eFlat 0.5 the emptied lid vanishes black-on-black: no cut
      var deck = (1 - smooth(eFlat, 0, 0.5)).toFixed(3);
      if (deck !== lastDeck) { device.style.setProperty("--deck", deck); lastDeck = deck; }
      opacity *= eFlat > 0.5 ? 0 : 1;
    }
    var hidden = opacity <= 0.001 || pc > 0.02 && pl >= 1;

    // every style write is guarded: an unchanged string is not written, so a
    // still page costs no style recalculation
    if (lidDeg !== lastLid) { setLid(lidDeg); lastLid = lidDeg; }
    var sceneT = "translate3d(" + tx.toFixed(2) + "px," + ty.toFixed(2) + "px,0) scale(" + k.toFixed(4) + ")";
    if (sceneT !== lastScene) { scene.style.transform = sceneT; lastScene = sceneT; }
    if (opacity !== lastOpacity) { scene.style.opacity = opacity.toFixed(3); lastOpacity = opacity; }
    if (hidden !== hiddenNow) { device.classList.toggle("is-hidden", hidden); hiddenNow = hidden; }

    // the ground shadow is its own plane: it softens and drifts as the lid rises
    var sh = (lerp(0.9, 0.55, eLid) * opacity * (1 - smooth(eFlat, 0, 0.5))).toFixed(3);
    if (sh !== lastShadowOp) { shadow.style.opacity = sh; lastShadowOp = sh; }
    var shT = "translate3d(0," + (eLid * 26).toFixed(1) + "px,0) scale(" + lerp(1, 1.12, eLid).toFixed(3) + ")";
    if (shT !== lastShadow) { shadow.style.transform = shT; lastShadow = shT; }

    if (phone) {
      hostApp(eFlat > 0.5);
      var flatOp = smooth(eFlat, 0.1, 0.5) * (1 - smooth(pl, 0.8, 1));
      flat.style.opacity = flatOp.toFixed(3);
      flat.style.transform = "translate3d(0," + (eExit * vh * 0.06).toFixed(1) + "px,0) scale(" + (1 - 0.06 * eExit).toFixed(3) + ")";
      flat.classList.toggle("is-hidden", flatOp <= 0.001);
      device.classList.toggle("is-hidden", hidden && flatOp <= 0.001);
    }

    // chrome: arrives as the word leaves, leaves as the dark close slides in
    var closeTop = closeTopDoc - y;   // cached document offset: no layout read per frame
    var wantChrome = ph > 0.2 && closeTop > vh * 0.55;
    if (wantChrome !== chromeOn) { chrome.classList.toggle("is-on", wantChrome); chromeOn = wantChrome; }

    // which view. The last tour act whose progress has left zero wins, and an
    // act that has finished hands over to the next one at once, so the cursor
    // travels during the un-pin slide and the new view is already up when the
    // next copy fades in. Before the tour, the home screen.
    var idx = -1;
    for (var i = 0; i < tours.length; i++) {
      var pi = P(tours[i]);
      var at = parseFloat(tours[i].getAttribute("data-tour-at")) || 0.03;
      if (pi > at) idx = i;
      if (pi >= 0.985 && i + 1 < tours.length) idx = i + 1;
    }
    if (idx !== lastIdx) {
      goTo(idx >= 0 ? tours[idx].getAttribute("data-tour-view") : HOME);
      lastIdx = idx;
    }
    var cursorOn = ph > 0.28 && !hidden && eExit < 0.5 || (phone && inFlat && eExit < 0.5);
    cursor.classList.toggle("is-on", cursorOn);
    if (!reduce) stepCursor(now); else if (cur.pending) { if (cur.pending.view) showView(cur.pending.view); cur.pending = null; }

    if (idx >= 0) driveKeyed(tours[idx].getAttribute("data-tour-view"), P(tours[idx]), tours[idx]);

    requestAnimationFrame(frame);
  }

  // ---------------------------------------------------------------- boot
  // the entrance plays only on a fresh load at the top of the page
  if (scrollY < 40) {
    document.documentElement.classList.add("is-entering");
    setTimeout(function () { document.documentElement.classList.remove("is-entering"); }, 2000);
  }
  measure();
  showView(HOME);
  addEventListener("resize", function () {
    // phones fire resize on every toolbar show/hide; only re-measure on a real change
    if (innerWidth === vw && phone === phoneMQ.matches && Math.abs(innerHeight - vh) < 120) return;
    measure();
  }, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  wake();
  // read-only hook for the verification scripts in lab/
  Object.defineProperty(window, "__pultzo", { value: { get running() { return running; } } });
})();
