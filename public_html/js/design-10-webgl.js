/*
 * Design 10 hero: real-time WebGL hibiscus bloom built from the user's OBJ models
 * (PlayCanvas 2.24.3, vendored).
 *
 * PHOTOS ARE NOT EDITED HERE. Change the 5 petal photos in design-10.html
 * (window.PEPPER_BLOOM_PETALS, then bump PEPPER_BLOOM_VERSION).
 *
 * Geometry: /assets/design-10/hibiscus-flower.bin, baked by
 * .agents/tasks/design-10-obj-hero/bake/bake_flower.py from "base (1).obj" (bud, phase 1)
 * and "base.obj" (bloomed). Every petal vertex has a closed pose (wrapped onto the bud's
 * measured envelope) and an open pose (the bloom OBJ) in spherical coordinates around the
 * receptacle; the bloom rotates each vertex from one to the other on an arc, base first.
 * Coordinates: 1 world unit = 100 video px; world x = px / 100, world y = -py / 100.
 */
performance.mark("d10gl-eval-start");
import * as pc from "./vendor/playcanvas-2.24.3/playcanvas.min.js";

var VERSION = typeof window.PEPPER_BLOOM_VERSION === "string" ? window.PEPPER_BLOOM_VERSION : "1";
var ASSET = "/assets/design-10/hibiscus-flower.bin?v=" + encodeURIComponent(VERSION);
// design-10.html starts this download in <head> (window.PEPPER_BLOOM_MODEL); fetch here only if it did not
var assetPromise = window.PEPPER_BLOOM_MODEL || fetch(ASSET).then(function (r) {
  if (!r.ok) throw new Error("design-10 asset HTTP " + r.status);
  return r.arrayBuffer();
});

/* ---------- timeline (seconds, 8 s total like design 9) ---------- */
export var TIMES = [0, 0.6, 1.2, 1.8, 2.4, 3, 3.6, 4.6, 8];
var OPEN_T0 = 0, OPEN_T1 = 5;           // global opening progress P(t)
var TILT_T0 = 0.3, TILT_T1 = 4.4;       // bud upright -> bloom facing the viewer
var RECEPT = [6.52, -5.45, 0];
var SCALE = 3.7;                         // local model units -> world units
var CAM_D = 16.24;
var CAM_BUD = [1.05, 652, 400], CAM_OPEN = [1.08, 640, 500]; // [zoom, cx, cy] video px

function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
function smoother(x) { x = clamp(x, 0, 1); return x * x * x * (x * (x * 6 - 15) + 10); }
function smoothstep(a, b, x) { var k = clamp((x - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); }
// eases out to a soft stop; it starts moving on the first frame so the bud is never static
function globalP(t) { var x = clamp((t - OPEN_T0) / (OPEN_T1 - OPEN_T0), 0, 1); return 1 - Math.pow(1 - x, 1.8); }

/* ---------- canvas textures (same recipes as design 9) ---------- */
function canvas2d(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return [c, c.getContext("2d")]; }
function rand(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
function redTexture() {
  var cc = canvas2d(512, 512), c = cc[0], g = cc[1], r = rand(7);
  var grd = g.createLinearGradient(0, 0, 0, 512);       // uv1.y = 0 at the petal base
  grd.addColorStop(0, "#7a0a18"); grd.addColorStop(0.12, "#b3142a"); grd.addColorStop(0.45, "#d4373c");
  grd.addColorStop(0.8, "#e65a55"); grd.addColorStop(1, "#ef7b70");
  g.fillStyle = grd; g.fillRect(0, 0, 512, 512);
  for (var i = 0; i < 260; i++) {                     // fine dense veins from the base
    var u = r(), x1 = 256 + (u - 0.5) * 90, x2 = u * 560 - 24, bend = (r() - 0.5) * 60;
    g.strokeStyle = r() < 0.65 ? "rgba(120,0,22," + (0.10 + r() * 0.18) + ")" : "rgba(255,190,180," + (0.06 + r() * 0.1) + ")";
    g.lineWidth = 0.6 + r() * 1.1;
    g.beginPath(); g.moveTo(x1, 0); g.quadraticCurveTo((x1 + x2) / 2 + bend, 252, x2, 516); g.stroke();
  }
  var rg = g.createRadialGradient(256, -88, 10, 256, -88, 420);   // dark crimson eye at the base
  rg.addColorStop(0, "rgba(60,0,8,0.5)"); rg.addColorStop(1, "rgba(60,0,8,0)");
  g.fillStyle = rg; g.fillRect(0, 0, 512, 512);
  return c;
}
function greyTexture() {
  var cc = canvas2d(64, 64), c = cc[0], g = cc[1], grd = g.createLinearGradient(0, 64, 0, 0);
  grd.addColorStop(0, "#d9d6d2"); grd.addColorStop(1, "#f3f1ee"); g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  return c;
}
function makeTex(device, src, srgb) {
  var t = new pc.Texture(device, {
    width: src.width, height: src.height, format: srgb ? pc.PIXELFORMAT_SRGBA8 : pc.PIXELFORMAT_RGBA8, mipmaps: true,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE,
    minFilter: pc.FILTER_LINEAR_MIPMAP_LINEAR, magFilter: pc.FILTER_LINEAR, anisotropy: 4
  });
  t.setSource(src);
  return t;
}
function stdMat(o) { var m = new pc.StandardMaterial(); m.useMetalness = false; Object.assign(m, o); m.update(); return m; }

/* ---------- asset decoding ---------- */
function decode(buf) {
  var dv = new DataView(buf);
  var magic = String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3));
  if (magic !== "HB10") throw new Error("design-10 asset: bad magic");
  var hlen = dv.getUint32(4, true), H = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 8, hlen))), base = 8 + hlen, out = {};
  H.buffers.forEach(function (b) {
    var n = b.count * b.comps, o = base + b.offset;
    out[b.name] = b.type === "u16" ? new Uint16Array(buf, o, n) : b.type === "i8" ? new Int8Array(buf, o, n) : new Uint8Array(buf, o, n);
  });
  out.header = H;
  return out;
}

/* ---------- module state ---------- */
var app, bloomRef, stage, cam, group, D, flower, calyx, parts = [], photoState = [], pendingUploads = [];
var seekT = null, curT = 0, done = false, paused = false, deformMs = [];
var qBud = new pc.Quat(), qOpen = new pc.Quat(), qTmp = new pc.Quat(), qYaw = new pc.Quat();

// Unpacks one animated vertex set (spherical closed/open poses + normals) into float tables.
function prepSet(sphC, sphO, nrmC, nrmO, H) {
  var n = sphC.length / 3, s = {
    n: n, rC: new Float32Array(n), fC: new Float32Array(n), tC: new Float32Array(n),
    rO: new Float32Array(n), fO: new Float32Array(n), tO: new Float32Array(n),
    nC: new Float32Array(n * 3), nO: new Float32Array(n * 3), pos: new Float32Array(n * 3), nrm: new Float32Array(n * 3)
  };
  var R = H.rhoMax / 65535, F = Math.PI / 65535, T0 = H.thetaRange[0], T = (H.thetaRange[1] - T0) / 65535;
  for (var i = 0; i < n; i++) {
    s.rC[i] = sphC[i * 3] * R; s.fC[i] = sphC[i * 3 + 1] * F; s.tC[i] = T0 + sphC[i * 3 + 2] * T;
    s.rO[i] = sphO[i * 3] * R; s.fO[i] = sphO[i * 3 + 1] * F; s.tO[i] = T0 + sphO[i * 3 + 2] * T;
    for (var k = 0; k < 3; k++) { s.nC[i * 3 + k] = nrmC[i * 4 + k] / 127; s.nO[i * 3 + k] = nrmO[i * 4 + k] / 127; }
  }
  return s;
}
// Writes positions/normals for progress table prog (or a single value when prog is a number).
function poseSet(s, prog) {
  var pos = s.pos, nrm = s.nrm, single = typeof prog === "number";
  for (var i = 0; i < s.n; i++) {
    var p = single ? prog : prog[i];
    var r = s.rC[i] + (s.rO[i] - s.rC[i]) * p, f = s.fC[i] + (s.fO[i] - s.fC[i]) * p, t = s.tC[i] + (s.tO[i] - s.tC[i]) * p;
    var sf = Math.sin(f), o = i * 3;
    pos[o] = r * sf * Math.cos(t); pos[o + 1] = r * Math.cos(f); pos[o + 2] = r * sf * Math.sin(t);
    // both pose normals turned about the axis to the current theta, then blended
    var a = t - s.tC[i], b = t - s.tO[i], ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
    var cx = s.nC[o] * ca - s.nC[o + 2] * sa, cz = s.nC[o] * sa + s.nC[o + 2] * ca;
    var ox = s.nO[o] * cb - s.nO[o + 2] * sb, oz = s.nO[o] * sb + s.nO[o + 2] * cb;
    var rx = cx + (ox - cx) * p, ny = s.nC[o + 1] + (s.nO[o + 1] - s.nC[o + 1]) * p, rz = cz + (oz - cz) * p;
    var l = Math.sqrt(rx * rx + ny * ny + rz * rz) || 1;
    nrm[o] = rx / l; nrm[o + 1] = ny / l; nrm[o + 2] = rz / l;
  }
}

// A drawable subset of the animated vertices: own compact vertex arrays + index buffer.
function makePart(device, set, idx, uv0, uv1, colors) {
  var map = new Map(), verts = [], loc = new Uint16Array(idx.length), i;
  for (i = 0; i < idx.length; i++) {
    var v = idx[i], m = map.get(v);
    if (m === undefined) { m = verts.length; map.set(v, m); verts.push(v); }
    loc[i] = m;
  }
  var n = verts.length, p = { verts: Uint32Array.from(verts), pos: new Float32Array(n * 3), nrm: new Float32Array(n * 3), mesh: new pc.Mesh(device), count: idx.length / 3 };
  var u0 = new Float32Array(n * 2), u1 = new Float32Array(n * 2), col = colors ? new Uint8ClampedArray(n * 4) : null;
  for (i = 0; i < n; i++) {
    var g = verts[i];
    if (uv0) { u0[i * 2] = uv0[g * 2] / 65535; u0[i * 2 + 1] = uv0[g * 2 + 1] / 65535; }
    if (uv1) { u1[i * 2] = uv1[g * 2] / 65535; u1[i * 2 + 1] = uv1[g * 2 + 1] / 65535; }
    if (col) { col[i * 4] = colors[g * 4]; col[i * 4 + 1] = colors[g * 4 + 1]; col[i * 4 + 2] = colors[g * 4 + 2]; col[i * 4 + 3] = 255; }
  }
  p.set = set;
  p.mesh.setPositions(p.pos); p.mesh.setNormals(p.nrm); p.mesh.setUvs(0, u0); p.mesh.setUvs(1, u1);
  if (col) p.mesh.setColors32(col);
  p.mesh.setIndices(loc); p.mesh.update(pc.PRIMITIVE_TRIANGLES);
  return p;
}
function pushPart(p) {
  var s = p.set.pos, sn = p.set.nrm, v = p.verts, pos = p.pos, nrm = p.nrm;
  for (var i = 0; i < v.length; i++) {
    var a = v[i] * 3, b = i * 3;
    pos[b] = s[a]; pos[b + 1] = s[a + 1]; pos[b + 2] = s[a + 2];
    nrm[b] = sn[a]; nrm[b + 1] = sn[a + 1]; nrm[b + 2] = sn[a + 2];
  }
  p.mesh.setPositions(pos); p.mesh.setNormals(nrm); p.mesh.update(pc.PRIMITIVE_TRIANGLES);
}

/* ---------- per-frame update (allocation-free) ---------- */
var progTab, delayTab, petalOf, layer;
function vertexProgress(t) {
  var P = globalP(t), Pi = [0, 0, 0, 0, 0], i;
  for (i = 0; i < 5; i++) Pi[i] = clamp(P * 1.2 - 0.04 * layer[i], 0, 1);
  for (i = 0; i < flower.n; i++) {
    var pid = petalOf[i];
    progTab[i] = pid < 5 ? smoothstep(0, 1, (Pi[pid] - 0.15 * delayTab[i]) / 0.85) : smoothstep(0, 1, P * 1.1);
  }
  return P;
}
function camKey(t) {
  var k = smoother((t - OPEN_T0) / (OPEN_T1 + 0.6 - OPEN_T0));
  return [CAM_BUD[0] + (CAM_OPEN[0] - CAM_BUD[0]) * k, CAM_BUD[1] + (CAM_OPEN[1] - CAM_BUD[1]) * k, CAM_BUD[2] + (CAM_OPEN[2] - CAM_BUD[2]) * k];
}
function applyTime(t) {
  curT = t;
  var t0 = performance.now();
  var P = vertexProgress(t);
  poseSet(flower, progTab);
  poseSet(calyx, P);
  for (var i = 0; i < parts.length; i++) pushPart(parts[i]);
  deformMs.push(performance.now() - t0);
  if (deformMs.length > 600) deformMs.shift();
  qTmp.slerp(qBud, qOpen, smoother((t - TILT_T0) / (TILT_T1 - TILT_T0)));
  var yaw = 5 * smoothstep(0, 1.4, t) * (1 - smoothstep(2.5, 7.5, t));   // slow drift from the first frame, settles to 0
  qYaw.setFromEulerAngles(0, yaw, 0);
  qYaw.mul(qTmp);
  group.setLocalRotation(qYaw);
  for (i = 0; i < 5; i++) {
    var rv = photoState[i] === 2 ? bloomRef.reveal(t, i) : 0, red = fronts[i].red, op = 1 - rv;
    fronts[i].miRed.visible = op > 0.002;
    if (red.opacity !== op) { red.opacity = op; red.update(); }
  }
  var c = camKey(t);
  cam.setPosition(c[1] / 100, -c[2] / 100, CAM_D);
  cam.camera.fov = 2 * Math.atan(3.6 / (c[0] * CAM_D)) * 180 / Math.PI;
}

/* ---------- photos (cover-fit, same as design 9) ---------- */
var fronts = [], NEAR_ONE = 0.9999;
function pumpPhotos() {
  if (pendingUploads.length) {                      // at most one upload per frame
    var job = pendingUploads.shift(), f = fronts[job.i], tex = makeTex(app.graphicsDevice, job.src, true);
    var ar = job.src.width / job.src.height, a = f.aspect, fc = job.focus, tile = new pc.Vec2(1, 1), off = new pc.Vec2(0, 0);
    if (ar > a) { tile.x = a / ar; off.x = (1 - tile.x) * fc[0]; } else { tile.y = ar / a; off.y = (1 - tile.y) * fc[1]; }
    if (tile.x === 1 && tile.y === 1) tile.x = NEAR_ONE;   // keep the warmed-up shader variant
    var m = f.front;
    m.diffuseMap = tex; m.emissiveMap = tex;
    m.diffuseMapTiling = tile; m.diffuseMapOffset = off; m.emissiveMapTiling = tile; m.emissiveMapOffset = off;
    m.update();
    photoState[job.i] = 2;
  }
  for (var i = 0; i < 5; i++) {
    if (photoState[i] !== 0) continue;
    var img = bloomRef.images && bloomRef.images[i], cfg = (bloomRef.config.petals[i] || {});
    var focus = cfg.focus || [0.5, 0.5];
    if (!img || (img.complete && !img.naturalWidth)) { photoState[i] = 1; pendingUploads.push({ i: i, src: greyTexture(), focus: [0.5, 0.5] }); continue; }
    if (!img.complete) continue;
    photoState[i] = 1;
    (function (i, img, focus) {
      var maxW = innerWidth < 700 ? 768 : 1024, w = Math.min(maxW, img.naturalWidth), h = Math.max(1, Math.round(img.naturalHeight * w / img.naturalWidth));
      var push = function (src) { pendingUploads.push({ i: i, src: src, focus: focus }); requestRender(); };
      if (window.createImageBitmap) {
        createImageBitmap(img, { resizeWidth: w, resizeHeight: h, resizeQuality: "medium" }).then(push, function () { push(img); });
      } else push(img);
    })(i, img, focus);
  }
}
function photosDone() { for (var i = 0; i < 5; i++) if (photoState[i] !== 2) return false; return true; }
function requestRender() { if (app) app.renderNextFrame = true; }

// Frame pacing: render a frame only when the GPU has finished the previous one (WebGL2 fence).
// Without it, frames issued while the canvas is hidden (warm-up, held bud) and on a slow GPU
// queue up, and the GPU then works off the whole queue in one visible freeze of a second or
// more. A frame skipped here is one the GPU could not have shown in time anyway.
// seek() (tests, tools) switches pacing off and renders on demand.
var gate = null, gating = true, canFence = false;
function gateFrame() {
  if (!gating) return;
  var gl = app.graphicsDevice.gl;
  if (seekT !== null) {
    gating = false;
    if (gate) { gl.deleteSync(gate); gate = null; }
    app.renderNextFrame = true;
    return;
  }
  if (done) return;                                   // finished: render only on request
  app.autoRender = false;
  if (gate && gl.getSyncParameter(gate, gl.SYNC_STATUS) !== gl.SIGNALED) { app.renderNextFrame = false; return; }
  if (gate) { gl.deleteSync(gate); gate = null; }
  app.renderNextFrame = true;
}
function fenceFrame() {
  if (!gating) return;
  var gl = app.graphicsDevice.gl;
  gate = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
  gl.flush();
}

function onUpdate() {
  if (paused) return;
  gateFrame();
  pumpPhotos();
  var t = seekT !== null ? seekT : Math.min(8, Math.max(0, bloomRef.clock()));
  applyTime(t);
  if (seekT !== null || (t >= 8 && photosDone() && !pendingUploads.length)) {
    if (seekT === null && !done) { done = true; app.renderNextFrame = true; }   // final pose drawn once
    app.autoRender = false;
  }
}

/* ---------- export for the 2D fallback ---------- */
var tmpV = new pc.Vec3(), tmpW = new pc.Vec3(), tmpN = new pc.Vec3();
function toStage(wt, x, y, z, cw, ch) {
  tmpV.set(x, y, z); wt.transformPoint(tmpV, tmpW); cam.camera.worldToScreen(tmpW, tmpV);
  // the 2D renderer scales the 1280x720 space by height and centres it, like this camera's vertical fov
  var k = 720 / ch;
  return [Math.round(((tmpV.x - cw / 2) * k + 640) * 10) / 10, Math.round(tmpV.y * k * 10) / 10, tmpV.z];
}
function hull48(pts, cx, cy, a0) {
  var best = [], i, j;
  for (j = 0; j < 48; j++) best.push(null);
  for (i = 0; i < pts.length; i++) {
    var dx = pts[i][0] - cx, dy = pts[i][1] - cy, a = Math.atan2(dy, dx) - a0;
    a = ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    j = Math.min(47, Math.floor(a / (2 * Math.PI) * 48));
    var d = dx * dx + dy * dy;
    if (!best[j] || d > best[j][2]) best[j] = [pts[i][0], pts[i][1], d];
  }
  var out = [], last = null;
  for (j = 0; j < 48; j++) {
    if (best[j]) last = best[j];
    else if (!last) { for (i = 1; i < 48 && !best[(j + i) % 48]; i++); last = best[(j + i) % 48] || [cx, cy, 0]; }
    out.push([last[0], last[1]]);
  }
  return out;
}
function exportBaked() {
  var saved = curT, out = { times: TIMES.slice(), camera: [], petals: [], order: [], calyx: [], stem: [], stamen: [] }, i, s, k;
  var device = app.graphicsDevice, cw = device.canvas.clientWidth || 1280, ch = device.canvas.clientHeight || 720;
  for (i = 0; i < 5; i++) out.petals.push({ outline: [], front: [] });
  for (s = 0; s < TIMES.length; s++) {
    applyTime(TIMES[s]);
    var c = camKey(TIMES[s]); out.camera.push([Math.round(c[0] * 1000) / 1000, Math.round(c[1] * 10) / 10, Math.round(c[2] * 10) / 10]);
    var wt = group.getWorldTransform(), camPos = cam.getPosition(), rec = toStage(wt, 0, 0, 0, cw, ch), depth = [];
    for (i = 0; i < 5; i++) {
      var f = fronts[i], pts = [], sx = 0, sy = 0, fr = 0, dz = 0, P = f.part.pos;
      for (k = 0; k < f.part.verts.length; k += 2) {
        var q = toStage(wt, P[k * 3], P[k * 3 + 1], P[k * 3 + 2], cw, ch); pts.push(q); sx += q[0]; sy += q[1]; dz += q[2];
        tmpN.set(f.part.nrm[k * 3], f.part.nrm[k * 3 + 1], f.part.nrm[k * 3 + 2]); wt.transformVector(tmpN, tmpN);
        tmpV.set(P[k * 3], P[k * 3 + 1], P[k * 3 + 2]); wt.transformPoint(tmpV, tmpW);
        if (tmpN.dot(tmpW.sub2(camPos, tmpW)) > 0) fr++;
      }
      sx /= pts.length; sy /= pts.length;
      // bin 0 and 47 face the receptacle, bin 24 the tip (the 2D renderer relies on this)
      out.petals[i].outline.push(hull48(pts, sx, sy, Math.atan2(rec[1] - sy, rec[0] - sx) - Math.PI));
      out.petals[i].front.push(Math.round(fr / pts.length * 1000) / 1000);
      depth.push([i, dz / pts.length]);
    }
    depth.sort(function (a, b) { return b[1] - a[1]; });            // far first
    out.order.push(depth.map(function (d) { return d[0]; }));
    var cp = [], C = calyx.pos;
    for (k = 0; k < calyx.n; k += 2) cp.push(toStage(wt, C[k * 3], C[k * 3 + 1], C[k * 3 + 2], cw, ch));
    var mx = 0, my = 0; cp.forEach(function (p) { mx += p[0]; my += p[1]; }); mx /= cp.length; my /= cp.length;
    out.calyx.push(hull48(cp, mx, my, 0));
    var sb = toStage(wt, 0, STEM_TOP, 0, cw, ch), se = toStage(wt, 0, STEM_TOP - STEM_LEN, 0, cw, ch);
    out.stem.push([sb[0], sb[1], se[0], se[1]]);
    var top = toStage(wt, stamenTop[0], stamenTop[1], stamenTop[2], cw, ch);
    out.stamen.push([rec[0], rec[1], top[0], top[1]]);
  }
  applyTime(saved); requestRender();
  return out;
}

/* ---------- init ---------- */
var STEM_TOP = -0.4, STEM_LEN = 2.2, stamenTop = [0, 0.5, 0], colors, redCanvas, greyCanvas;
// CPU-only preparation (no GL): its own task so it never adds to the app-creation task
function prepData() {
  var H = D.header;
  qBud.set(H.qBud[0], H.qBud[1], H.qBud[2], H.qBud[3]); qOpen.set(H.qOpen[0], H.qOpen[1], H.qOpen[2], H.qOpen[3]);
  layer = H.layer;
  flower = prepSet(D.sphC, D.sphO, D.nrmC, D.nrmO, H);
  calyx = prepSet(D.calyxSphC, D.calyxSphO, D.calyxNrmC, D.calyxNrmO, H);
  progTab = new Float32Array(flower.n); delayTab = new Float32Array(flower.n); petalOf = new Uint8Array(flower.n);
  colors = new Uint8Array(flower.n * 4);
  var r = rand(13), stMax = 0, i;
  for (i = 0; i < flower.n; i++) { delayTab[i] = D.delay[i] / 255; petalOf[i] = D.part[i] & 7; if (petalOf[i] === 5) stMax = Math.max(stMax, flower.rO[i]); }
  for (i = 0; i < flower.n; i++) {                       // stamen colours: red column, yellow pollen, dark-red stigma tips
    if (petalOf[i] !== 5) continue;
    var h = flower.rO[i] / stMax, c;
    if (h > 0.92) c = [122, 8, 20];
    else if (h > 0.5 && r() < 0.7) c = r() < 0.5 ? [242, 194, 48] : [217, 154, 28];
    else c = [196, 26, 42];
    colors[i * 4] = c[0]; colors[i * 4 + 1] = c[1]; colors[i * 4 + 2] = c[2];
    if (h > 0.99) { stamenTop = [flower.rO[i] * Math.sin(flower.fO[i]) * Math.cos(flower.tO[i]), flower.rO[i] * Math.cos(flower.fO[i]), flower.rO[i] * Math.sin(flower.fO[i]) * Math.sin(flower.tO[i])]; }
  }
  redCanvas = redTexture(); greyCanvas = greyTexture();
}
function build(device) {
  var H = D.header, i;
  var red = makeTex(device, redCanvas, true), grey = makeTex(device, greyCanvas, true);
  var backMat = stdMat({ diffuseMap: red, diffuseMapUv: 1, diffuse: new pc.Color(0.8, 0.74, 0.74), emissiveMap: red, emissiveMapUv: 1, emissive: new pc.Color(0.15, 0.14, 0.14),
    specular: new pc.Color(0.12, 0.1, 0.1), gloss: 0.45, cull: pc.CULLFACE_NONE, twoSidedLighting: true });
  var throatMat = stdMat({ diffuse: new pc.Color(0.22, 0.02, 0.03), emissive: new pc.Color(0.12, 0.01, 0.015), specular: new pc.Color(0.1, 0.05, 0.05), gloss: 0.4, cull: pc.CULLFACE_NONE });
  var stamenMat = stdMat({ diffuseVertexColor: true, diffuse: new pc.Color(1, 1, 1), specular: new pc.Color(0.25, 0.2, 0.1), gloss: 0.5, cull: pc.CULLFACE_NONE });
  var green = stdMat({ diffuse: new pc.Color(0.3, 0.42, 0.1), specular: new pc.Color(0.35, 0.4, 0.3), gloss: 0.7, cull: pc.CULLFACE_NONE, twoSidedLighting: true });

  group = new pc.Entity("flower"); group.setPosition(RECEPT[0], RECEPT[1], RECEPT[2]); group.setLocalScale(SCALE, SCALE, SCALE);
  app.root.addChild(group);
  function addEnt(name, mis, shadows) {
    var e = new pc.Entity(name);
    e.addComponent("render", { meshInstances: mis, castShadows: shadows, receiveShadows: true });
    group.addChild(e); return e;
  }
  for (i = 0; i < 5; i++) {
    var fp = makePart(device, flower, D["idxFront" + i], D.uv0, D.uv1, null);
    var front = stdMat({ diffuseMap: grey, diffuse: new pc.Color(0.4, 0.4, 0.4), emissiveMap: grey, emissive: new pc.Color(0.65, 0.65, 0.65),
      specular: new pc.Color(0.04, 0.04, 0.04), gloss: 0.3, cull: pc.CULLFACE_BACK,
      // non-identity from the start: the cover-fit photo then reuses the shader variant compiled
      // during warm-up instead of compiling a new one in the middle of the bloom
      diffuseMapTiling: new pc.Vec2(NEAR_ONE, 1), emissiveMapTiling: new pc.Vec2(NEAR_ONE, 1) });
    var redO = stdMat({ diffuseMap: red, diffuseMapUv: 1, diffuse: new pc.Color(0.8, 0.74, 0.74), emissiveMap: red, emissiveMapUv: 1, emissive: new pc.Color(0.15, 0.14, 0.14),
      specular: new pc.Color(0.12, 0.1, 0.1), gloss: 0.45, blendType: pc.BLEND_NORMAL, opacity: 1, depthWrite: false, cull: pc.CULLFACE_BACK });
    var miF = new pc.MeshInstance(fp.mesh, front), miR = new pc.MeshInstance(fp.mesh, redO);
    addEnt("front" + i, [miF, miR], false);   // the closed back shell already casts the petal shadow
    parts.push(fp);
    fronts.push({ part: fp, front: front, red: redO, miRed: miR, aspect: H.photoAspect[i] });
    photoState.push(0);
  }
  var bp = makePart(device, flower, D.idxBack, D.uv0, D.uv1, null); parts.push(bp);
  addEnt("back", [new pc.MeshInstance(bp.mesh, backMat)], true);
  var tp = makePart(device, flower, D.idxThroat, D.uv0, D.uv1, null); parts.push(tp);
  addEnt("throat", [new pc.MeshInstance(tp.mesh, throatMat)], false);
  var sp = makePart(device, flower, D.idxStamen, null, null, colors); parts.push(sp);
  addEnt("stamen", [new pc.MeshInstance(sp.mesh, stamenMat)], true);
  var cpart = makePart(device, calyx, D.calyxIdx, null, null, null); parts.push(cpart);
  addEnt("calyx", [new pc.MeshInstance(cpart.mesh, green)], false);
  var lo = 1e9; for (i = 0; i < calyx.n; i++) lo = Math.min(lo, calyx.rC[i] * Math.cos(calyx.fC[i]));
  STEM_TOP = lo + 0.02;
  var stem = new pc.Entity("stem");
  stem.addComponent("render", { type: "cylinder", material: stdMat({ diffuse: new pc.Color(0.26, 0.35, 0.1), specular: new pc.Color(0.2, 0.25, 0.15), gloss: 0.5 }) });
  group.addChild(stem); stem.setLocalPosition(0, STEM_TOP - STEM_LEN / 2, 0); stem.setLocalScale(0.075, STEM_LEN, 0.075);
}

// Init runs as a chain of short tasks, each after the next 2D frame has painted, so the 2D bloom
// keeps moving between them: decode, CPU prep, app creation, scene build, then a shader warm-up
// that waits for KHR_parallel_shader_compile instead of blocking on the first draw.
function steps(list) {
  var k = 0;
  (function next() {
    if (k >= list.length) return;
    requestAnimationFrame(function () {
      setTimeout(function () {
        try { list[k++](); next(); } catch (err) { console.warn("design-10 WebGL init failed", err); fallback(); }
      }, 0);
    });
  })();
}
export function init(canvas, bloom) {
  bloomRef = bloom; stage = bloom.stage;
  assetPromise.then(function (buf) {
    performance.mark("d10gl-asset-ready");
    steps([
      function () { D = decode(buf); prepData(); performance.mark("d10gl-prep-done"); },
      function () { createApp(canvas); },
      function () { build(app.graphicsDevice); performance.mark("d10gl-build-done"); },
      function () { start(bloom); }
    ]);
  }, function (err) { console.warn("design-10 asset failed", err); fallback(); });
}
function createApp(canvas) {
  performance.mark("d10gl-app-start");
  var mobile = innerWidth < 700;
  app = new pc.Application(canvas, { graphicsDeviceOptions: { antialias: true, alpha: false, preferWebGl2: true, powerPreference: "high-performance" } });
  app.setCanvasFillMode(pc.FILLMODE_NONE);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);
  var device = app.graphicsDevice;
  device.maxPixelRatio = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
  canvas.addEventListener("webglcontextlost", function (e) { e.preventDefault(); fallback(); }, false);
  var rect = stage.getBoundingClientRect(); app.resizeCanvas(Math.max(1, rect.width), Math.max(1, rect.height));
  app.scene.ambientLight = new pc.Color(0.36, 0.33, 0.31);

  cam = new pc.Entity("cam");
  cam.addComponent("camera", { clearColor: new pc.Color(1, 1, 1), fov: 25, nearClip: 1, farClip: 40,
    toneMapping: pc.TONEMAP_LINEAR, gammaCorrection: pc.GAMMA_SRGB });
  app.root.addChild(cam);
  var light = new pc.Entity("sun");
  light.addComponent("light", { type: "directional", color: new pc.Color(1, 0.97, 0.93), intensity: 1.05, castShadows: true,
    shadowResolution: mobile ? 512 : 1024, shadowType: pc.SHADOW_PCF3_32F, normalOffsetBias: 0.05, shadowBias: 0.2, shadowDistance: 30 });
  light.setEulerAngles(50, -30, 0);
  app.root.addChild(light);
  performance.mark("d10gl-app-end"); performance.measure("d10gl-app-create", "d10gl-app-start", "d10gl-app-end");
}

// Warm-up: the hidden canvas renders with async shader activation, so draws whose program is
// still linking are skipped rather than stalling the main thread. When every shader used in a
// frame is linked, the next fully drawn frame attaches.
function warmUp(onReady) {
  var device = app.graphicsDevice, origSet = device.setShader, seen = new Set(), lastSize = -1, frames = 0;
  var parallel = !!device.extParallelShaderCompile;
  performance.mark(parallel ? "d10gl-parallel-compile" : "d10gl-sync-compile");
  device.setShader = function (s) { if (s) seen.add(s); return origSet.call(device, s, parallel); };
  var quiet = 0;
  function check() {
    frames++;
    var ready = true;
    seen.forEach(function (s) { if (!s.ready && !s.failed) ready = false; });
    // photos that have already downloaded are uploaded here too, and two more frames let the
    // GPU finish those uploads, so none of that work lands in the moving bloom
    var uploading = pendingUploads.length > 0 || photoState.indexOf(1) >= 0;
    quiet = uploading ? 0 : quiet + 1;
    if ((ready && seen.size && seen.size === lastSize && frames >= 2 && quiet >= 2) || frames > 240) {
      delete device.setShader;   // back to the prototype method
      if (device.setShader !== origSet) device.setShader = origSet;
      performance.mark("d10gl-warm-done"); performance.measure("d10gl-warm-up", "d10gl-build-done", "d10gl-warm-done");
      app.once("frameend", onReady);
      return;
    }
    lastSize = seen.size;
    app.once("frameend", check);
  }
  app.once("frameend", check);
}

function start(bloom) {
  canFence = gating = typeof app.graphicsDevice.gl.fenceSync === "function";
  app.on("update", onUpdate);
  app.on("frameend", fenceFrame);
  if (window.ResizeObserver) new ResizeObserver(function () {
    var r = stage.getBoundingClientRect(); app.resizeCanvas(Math.max(1, r.width), Math.max(1, r.height)); requestRender();
  }).observe(stage);
  if (window.IntersectionObserver) new IntersectionObserver(function (en) {
    paused = !en[0].isIntersecting; app.autoRender = !paused && !done && seekT === null; if (!paused) requestRender();
  }).observe(stage);
  document.addEventListener("visibilitychange", function () {
    paused = document.hidden; app.autoRender = !paused && !done && seekT === null; if (!paused) requestRender();
  });

  applyTime(Math.min(8, Math.max(0, bloom.clock())));
  warmUp(function () {
    try {
      performance.mark("d10gl-first-frame"); performance.measure("d10gl-first-frame", "d10gl-app-start", "d10gl-first-frame");
      var api = {
        seek: function (t) { seekT = Math.min(8, Math.max(0, +t || 0)); app.autoRender = false; applyTime(seekT); pumpPhotos(); app.renderNextFrame = true; },
        play: function () { seekT = null; done = false; gating = canFence; app.autoRender = !paused; },
        time: function () { return curT; },
        isRunning: function () { return !!app.autoRender && !done && seekT === null; },
        exportBaked: exportBaked,
        deformStats: function () { var a = deformMs.slice().sort(function (x, y) { return x - y; }); return { n: a.length, median: a[a.length >> 1], p95: a[Math.floor(a.length * 0.95)] }; }
      };
      if (bloom.attachWebGL) { if (bloom.attachWebGL(api)) bloom.deformStats = api.deformStats; } else Object.assign(bloom, api);
    } catch (e) { console.warn(e); fallback(); }
  });
  app.start();
}
function fallback() {
  try { if (app) { app.autoRender = false; } } catch (e) { /* ignore */ }
  if (typeof window.pepperBloomFallback === "function") window.pepperBloomFallback();
}

performance.mark("d10gl-eval-end");
performance.measure("d10gl-module-eval", "d10gl-eval-start", "d10gl-eval-end");
if (window.pepperBloom && window.pepperBloom.canvas) init(window.pepperBloom.canvas, window.pepperBloom);
