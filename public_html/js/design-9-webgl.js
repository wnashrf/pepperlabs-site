/*
 * Design 9 hero: real-time WebGL hibiscus bloom (PlayCanvas 2.24.3, vendored).
 *
 * PHOTOS ARE NOT EDITED HERE. Change the 5 petal photos in design-9.html
 * (window.PEPPER_BLOOM_PETALS, then bump PEPPER_BLOOM_VERSION).
 *
 * Loaded by js/design-9-bloom.js, which creates window.pepperBloom before this
 * module runs. Coordinates: 1 world unit = 100 video px; world x = px / 100,
 * world y = -py / 100, so the 1280x720 video frames map 1:1 at zoom 1.
 */
performance.mark("d9gl-eval-start");
import * as pc from "./vendor/playcanvas-2.24.3/playcanvas.min.js";

/* ---------- timeline keyframes (one object, mirrored by the 2D renderer) ---------- */
var TIMES = [0, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 8];
// per petal: [roll, twist, bend, tilt, ruffle] per time
var BUD = [1, 0.9, -2.0, 1.1, 0.08];
var OPEN3 = [0, 0, 0.25, 1.4, 1];
var OPEN8 = [0, 0, 0.22, 1.38, 1];
var UPPER = [BUD, BUD, [0.35, 0.25, -0.3, 1.35, 0.4], [0.2, 0.1, 0, 1.4, 0.6], [0.12, 0.05, 0.1, 1.42, 0.7],
  [0.05, 0, 0.2, 1.42, 0.85], [0.02, 0, 0.25, 1.4, 0.95], OPEN3, OPEN8];
var FRONT = [BUD, BUD, [0.92, 0.8, -1.8, 1.12, 0.1], [0.7, 0.55, -1.3, 1.15, 0.25], [0.45, 0.3, -0.75, 1.18, 0.4],
  [0.15, 0.08, -0.1, 1.35, 0.7], [0.04, 0, 0.18, 1.4, 0.9], OPEN3, OPEN8];
export var KEYS = {
  times: TIMES,
  petals: [UPPER, UPPER, FRONT, FRONT, FRONT],     // upper-left, upper-right, right, bottom, left
  groupTilt: [-90, -90, -62, -52, -42, -24, -12, -7, -6], // flower axis, degrees about X
  stamen: [0.22, 0.22, 0.35, 0.6, 0.85, 1, 1, 1, 1],      // staminal column emerges
  camera: [[1.42, 644, 415], [1.42, 644, 415], [1.42, 644, 425], [1.24, 644, 440], [1.14, 645, 455],
    [1.04, 645, 490], [0.94, 645, 545], [0.85, 645, 578], [0.8, 645, 584]] // [zoom, cx, cy] video px; the whole flower stays inside the 4:3 stage
};
var BUD_AZ = [134, 62, -10, 278, 206];   // even spiral in the bud (deg)
var OPEN_AZ = [139, 43, -7, 270, 194];   // final slots (deg, screen space, y up)
var LAYER = [0, 1, 2, 4, 3];             // back to front
var L = 3.4, W = 2.5, R0 = 0.12;         // constant petal length/width (no spawning)
var NU = 41, NV = 65, NVERT = NU * NV;
var RECEPT = [6.52, -5.45, 0];
var CAM_D = 16.24;                       // 3.6 / tan(12.5 deg)

// Keyframes are interpolated with a monotone cubic (Fritsch-Carlson) spline over real time:
// C1-continuous, so the motion never stops or kinks at a keyframe and never overshoots.
// Zero tangents at the bud and at 8 s give a soft start and settle; key times still follow the video.
function smooth(f) { return f * f * (3 - 2 * f); }
function seg(t) {
  if (t <= 0) return [0, 0];
  for (var s = 0; s < TIMES.length - 1; s++) {
    if (t <= TIMES[s + 1]) return [s, (t - TIMES[s]) / (TIMES[s + 1] - TIMES[s])];
  }
  return [TIMES.length - 2, 1];
}
var SEG = [0, 0];
function setSeg(t) { var r = seg(t); SEG[0] = r[0]; SEG[1] = r[1]; }
function slope(get, k) {                       // monotone tangent at key k
  var n = TIMES.length - 1;
  if (k <= 0 || k >= n) return 0;              // rest at the bud and at the open flower
  var d0 = (get(k) - get(k - 1)) / (TIMES[k] - TIMES[k - 1]), d1 = (get(k + 1) - get(k)) / (TIMES[k + 1] - TIMES[k]);
  if (d0 * d1 <= 0) return 0;
  return 3 * (TIMES[k + 1] - TIMES[k - 1]) / ((2 * TIMES[k + 1] - TIMES[k] - TIMES[k - 1]) / d0 + (TIMES[k + 1] + TIMES[k] - 2 * TIMES[k - 1]) / d1);
}
function spline(get, s, f) {
  var h = TIMES[s + 1] - TIMES[s], f2 = f * f, f3 = f2 * f;
  return (2 * f3 - 3 * f2 + 1) * get(s) + (f3 - 2 * f2 + f) * h * slope(get, s) +
    (-2 * f3 + 3 * f2) * get(s + 1) + (f3 - f2) * h * slope(get, s + 1);
}
function splK(arr, c, s, f) { return spline(c === undefined ? function (k) { return arr[k]; } : function (k) { return arr[k][c]; }, s, f); }function lerpK(arr) { return splK(arr, undefined, SEG[0], SEG[1]); }
function widthProfile(v) {
  var a = Math.min(1, v / 0.62);
  var w = 0.34 + 0.66 * Math.pow(Math.sin(a * Math.PI / 2), 1.3);
  if (v > 0.8) w *= Math.sqrt(Math.max(0, 1 - Math.pow((v - 0.8) / 0.32, 2)) * 0.6 + 0.4);
  return w;
}

/* ---------- canvas textures ---------- */
function canvas2d(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return [c, c.getContext("2d")]; }
function rand(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

function redTexture() {
  var cc = canvas2d(512, 512), c = cc[0], g = cc[1], r = rand(7);
  var grd = g.createLinearGradient(0, 512, 0, 0);       // canvas y up = petal v up
  grd.addColorStop(0, "#7a0a18"); grd.addColorStop(0.12, "#b3142a"); grd.addColorStop(0.45, "#d4373c");
  grd.addColorStop(0.8, "#e65a55"); grd.addColorStop(1, "#ef7b70");
  g.fillStyle = grd; g.fillRect(0, 0, 512, 512);
  for (var i = 0; i < 260; i++) {                     // fine dense veins from the base
    var u = r(), x1 = 256 + (u - 0.5) * 90, x2 = u * 560 - 24, bend = (r() - 0.5) * 60;
    g.strokeStyle = r() < 0.65 ? "rgba(120,0,22," + (0.10 + r() * 0.18) + ")" : "rgba(255,190,180," + (0.06 + r() * 0.1) + ")";
    g.lineWidth = 0.6 + r() * 1.1;
    g.beginPath(); g.moveTo(x1, 512); g.quadraticCurveTo((x1 + x2) / 2 + bend, 260, x2, -4); g.stroke();
  }
  var rg = g.createRadialGradient(256, 600, 10, 256, 600, 420);   // soft base shade
  rg.addColorStop(0, "rgba(60,0,8,0.45)"); rg.addColorStop(1, "rgba(60,0,8,0)");
  g.fillStyle = rg; g.fillRect(0, 0, 512, 512);
  return c;
}
function maskTexture() {
  var cc = canvas2d(256, 512), c = cc[0], g = cc[1];
  g.fillStyle = "#000"; g.fillRect(0, 0, 256, 512);
  g.fillStyle = "#fff"; g.beginPath();
  var n = 120, i, v, x, k;
  for (i = 0; i <= n; i++) {                         // left edge bottom->top (ruffled)
    v = i / n; x = 0.5 - 0.5 * (0.975 + 0.012 * Math.sin(v * 9)); g.lineTo(x * 256, 512 - v * 512 * (v > 0.85 ? 1 : 1));
  }
  for (i = 0; i <= n; i++) {                         // ruffled rounded top
    k = i / n; var uu = k * 2 - 1;
    v = 0.985 - 0.13 * uu * uu * uu * uu - 0.012 * (1 + Math.sin(k * 13)) - 0.004 * Math.sin(k * 29);
    g.lineTo(k * 256, 512 - v * 512);
  }
  for (i = n; i >= 0; i--) { v = i / n; x = 0.5 + 0.5 * (0.975 + 0.012 * Math.sin(v * 11 + 1)); g.lineTo(x * 256, 512 - v * 512); }
  g.closePath(); g.fill();
  return c;
}
function throatTexture() {
  var cc = canvas2d(256, 256), c = cc[0], g = cc[1], r = rand(3);
  var rg = g.createRadialGradient(128, 128, 2, 128, 128, 128);
  rg.addColorStop(0, "rgba(45,4,2,1)"); rg.addColorStop(0.45, "rgba(62,5,4,0.95)");
  rg.addColorStop(0.8, "rgba(115,12,17,0.6)"); rg.addColorStop(1, "rgba(115,12,17,0)");
  g.fillStyle = rg; g.fillRect(0, 0, 256, 256);
  g.strokeStyle = "rgba(30,0,0,0.5)"; g.lineWidth = 1;
  for (var i = 0; i < 140; i++) {
    var a = r() * Math.PI * 2, r1 = 20 + r() * 30, r2 = r1 + 20 + r() * 50;
    g.beginPath(); g.moveTo(128 + Math.cos(a) * r1, 128 + Math.sin(a) * r1); g.lineTo(128 + Math.cos(a) * r2, 128 + Math.sin(a) * r2); g.stroke();
  }
  return c;
}
function greyTexture() {
  var cc = canvas2d(64, 64), c = cc[0], g = cc[1], grd = g.createLinearGradient(0, 64, 0, 0);
  grd.addColorStop(0, "#d9d6d2"); grd.addColorStop(1, "#f3f1ee"); g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  return c;
}

/* ---------- module state ---------- */
var app, bloomRef, stage, cam, group, stamenEnt, petals = [], pendingUploads = [], photoState = [];
var seekT = null, curT = 0, done = false, paused = false, deformMs = [], tmpV = new pc.Vec3(), tmpW = new pc.Vec3();
var rowP = new Float32Array(NV * 3), rowT = new Float32Array(NV * 3), rowN = new Float32Array(NV * 3), rowR = new Float32Array(NV);
var ruffleTab = new Float32Array(NVERT), uTab = new Float32Array(NU), vTab = new Float32Array(NV), wTab = new Float32Array(NV);

function makeTex(device, src, srgb) {
  var t = new pc.Texture(device, {
    width: src.width, height: src.height, format: srgb ? pc.PIXELFORMAT_SRGBA8 : pc.PIXELFORMAT_RGBA8, mipmaps: true,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE,
    minFilter: pc.FILTER_LINEAR_MIPMAP_LINEAR, magFilter: pc.FILTER_LINEAR, anisotropy: 4
  });
  t.setSource(src);
  return t;
}

/* ---------- petal deformation (allocation-free) ---------- */
function deformPetal(p, roll, twist, bend, tilt, ruffle) {
  var j, i, k, idx, pos = p.pos, nrm = p.nrm, dl = L / (NV - 1);
  var azB = p.azBud, azO = p.azOpen, open = 1 - roll;
  var px = Math.cos(azB) * (R0 + 0.025 * p.layer), py = Math.sin(azB) * (R0 + 0.025 * p.layer), pz = 0.035 * p.layer * open;
  for (j = 0; j < NV; j++) {
    var v = vTab[j], al = tilt + bend * v;
    var az = azB + (azO - azB) * open + twist * v;
    var cx = Math.cos(az), sx = Math.sin(az), ca = Math.cos(al), sa = Math.sin(al);
    var dx = cx * sa, dy = sx * sa, dz = ca;
    if (j > 0) { px += dx * dl; py += dy * dl; pz += dz * dl; }
    k = j * 3;
    rowP[k] = px; rowP[k + 1] = py; rowP[k + 2] = pz;
    rowT[k] = -sx; rowT[k + 1] = cx; rowT[k + 2] = 0;
    rowN[k] = -cx * ca; rowN[k + 1] = -sx * ca; rowN[k + 2] = sa;
    rowR[j] = Math.sqrt(px * px + py * py);
  }
  for (j = 0; j < NV; j++) {
    k = j * 3;
    var half = W * wTab[j] * 0.5, kb = 1 / Math.max(rowR[j], 0.22), kmax = 2.5 / (half + 1e-3);
    var curv = roll * Math.min(kb, kmax) + open * 0.09;
    for (i = 0; i < NU; i++) {
      idx = j * NU + i;
      var x = uTab[i] * 2 * half, th = x * curv;
      var xs = curv > 1e-4 ? Math.sin(th) / curv : x, zs = curv > 1e-4 ? (1 - Math.cos(th)) / curv : 0;
      zs += ruffle * ruffleTab[idx];
      var o = idx * 3;
      pos[o] = rowP[k] + rowT[k] * xs + rowN[k] * zs;
      pos[o + 1] = rowP[k + 1] + rowT[k + 1] * xs + rowN[k + 1] * zs;
      pos[o + 2] = rowP[k + 2] + rowT[k + 2] * xs + rowN[k + 2] * zs;
    }
  }
  for (j = 0; j < NV; j++) {                         // normals = dv x du (inner face)
    var j0 = j > 0 ? j - 1 : j, j1 = j < NV - 1 ? j + 1 : j;
    for (i = 0; i < NU; i++) {
      var i0 = i > 0 ? i - 1 : i, i1 = i < NU - 1 ? i + 1 : i;
      var a = (j * NU + i1) * 3, b = (j * NU + i0) * 3, c = (j1 * NU + i) * 3, d = (j0 * NU + i) * 3;
      var ux = pos[a] - pos[b], uy = pos[a + 1] - pos[b + 1], uz = pos[a + 2] - pos[b + 2];
      var vx = pos[c] - pos[d], vy = pos[c + 1] - pos[d + 1], vz = pos[c + 2] - pos[d + 2];
      var nx = vy * uz - vz * uy, ny = vz * ux - vx * uz, nz = vx * uy - vy * ux;
      var ln = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1, o2 = (j * NU + i) * 3;
      nrm[o2] = nx / ln; nrm[o2 + 1] = ny / ln; nrm[o2 + 2] = nz / ln;
    }
  }
  p.mesh.setPositions(pos); p.mesh.setNormals(nrm); p.mesh.update(pc.PRIMITIVE_TRIANGLES);
}

/* ---------- geometry builders ---------- */
function buildPetal(device, i, mats) {
  var pos = new Float32Array(NVERT * 3), nrm = new Float32Array(NVERT * 3);
  var uv0 = new Float32Array(NVERT * 2), uv1 = new Float32Array(NVERT * 2), idx = [];
  var az = OPEN_AZ[i] * Math.PI / 180, cx = Math.cos(az), sx = Math.sin(az);
  var minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9, j, k, n;
  var fx = new Float32Array(NVERT), fy = new Float32Array(NVERT);
  for (j = 0; j < NV; j++) for (k = 0; k < NU; k++) {        // flat open layout -> upright photo UVs
    n = j * NU + k;
    var rr = R0 + vTab[j] * L, xx = uTab[k] * W * wTab[j];
    fx[n] = cx * rr - sx * xx; fy[n] = sx * rr + cx * xx;
    uv1[n * 2] = uTab[k] + 0.5; uv1[n * 2 + 1] = vTab[j];
    var inMask = Math.abs(uTab[k]) < 0.49 && vTab[j] < 0.97;
    if (inMask) { minx = Math.min(minx, fx[n]); maxx = Math.max(maxx, fx[n]); miny = Math.min(miny, fy[n]); maxy = Math.max(maxy, fy[n]); }
  }
  var bw = maxx - minx, bh = maxy - miny;
  for (n = 0; n < NVERT; n++) { uv0[n * 2] = (fx[n] - minx) / bw; uv0[n * 2 + 1] = 1 - (fy[n] - miny) / bh; }
  for (j = 0; j < NV - 1; j++) for (k = 0; k < NU - 1; k++) {
    var a = j * NU + k; idx.push(a, a + NU, a + 1, a + 1, a + NU, a + NU + 1);   // CCW seen from the inner (front) side
  }
  var mesh = new pc.Mesh(device);
  mesh.setPositions(pos); mesh.setNormals(nrm); mesh.setUvs(0, uv0); mesh.setUvs(1, uv1); mesh.setIndices(idx);
  mesh.update(pc.PRIMITIVE_TRIANGLES);
  var front = mats.front(i), red = mats.red(i);
  var miBack = new pc.MeshInstance(mesh, mats.back), miFront = new pc.MeshInstance(mesh, front), miRed = new pc.MeshInstance(mesh, red);
  miBack.castShadow = true; miFront.castShadow = false; miRed.castShadow = false;
  var ent = new pc.Entity("petal" + i);
  ent.addComponent("render", { meshInstances: [miBack, miFront, miRed], castShadows: true, receiveShadows: true });
  miFront.castShadow = false; miRed.castShadow = false;
  return { mesh: mesh, pos: pos, nrm: nrm, ent: ent, front: front, red: red, miRed: miRed, aspect: bw / bh,
    azBud: BUD_AZ[i] * Math.PI / 180, azOpen: az, layer: LAYER[i], idx: i };
}

function tubeMesh(device, curve, r0, r1, segs, sides) {
  var pos = [], nrm = [], ind = [], s, k;
  for (s = 0; s <= segs; s++) {
    var f = s / segs, c = curve(f), c2 = curve(Math.min(1, f + 0.01)), c1 = curve(Math.max(0, f - 0.01));
    var t = new pc.Vec3(c2[0] - c1[0], c2[1] - c1[1], c2[2] - c1[2]).normalize();
    var up = Math.abs(t.z) < 0.9 ? new pc.Vec3(0, 0, 1) : new pc.Vec3(1, 0, 0);
    var b1 = new pc.Vec3().cross(t, up).normalize(), b2 = new pc.Vec3().cross(t, b1);
    var rad = r0 + (r1 - r0) * f;
    for (k = 0; k <= sides; k++) {
      var a = k / sides * Math.PI * 2, nx = b1.x * Math.cos(a) + b2.x * Math.sin(a), ny = b1.y * Math.cos(a) + b2.y * Math.sin(a), nz = b1.z * Math.cos(a) + b2.z * Math.sin(a);
      pos.push(c[0] + nx * rad, c[1] + ny * rad, c[2] + nz * rad); nrm.push(nx, ny, nz);
      if (s < segs && k < sides) { var i0 = s * (sides + 1) + k; ind.push(i0, i0 + 1, i0 + sides + 1, i0 + 1, i0 + sides + 2, i0 + sides + 1); }
    }
  }
  var m = new pc.Mesh(device); m.setPositions(pos); m.setNormals(nrm); m.setIndices(ind); m.update(); return m;
}
function columnCurve(f) { return [-0.25 * f + 0.06 * Math.sin(f * Math.PI * 2), 2.25 * f, 0.15 + 0.75 * f - 0.25 * f * f]; }

function antherMesh(device) {
  var pos = [], nrm = [], col = [], ind = [], r = rand(11);
  var O = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], F = [[0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4], [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]];
  function blob(cx, cy, cz, rad, c) {
    var base = pos.length / 3;
    for (var q = 0; q < 6; q++) { pos.push(cx + O[q][0] * rad, cy + O[q][1] * rad, cz + O[q][2] * rad); nrm.push(O[q][0], O[q][1], O[q][2]); col.push(c[0], c[1], c[2], 255); }
    for (q = 0; q < 8; q++) ind.push(base + F[q][0], base + F[q][1], base + F[q][2]);
  }
  for (var i = 0; i < 150; i++) {
    var f = 0.6 + r() * 0.33, c = columnCurve(f), a = r() * Math.PI * 2, d = 0.07 + r() * 0.26;
    var lit = r();
    blob(c[0] + Math.cos(a) * d, c[1] + (r() - 0.5) * 0.1, c[2] + Math.sin(a) * d, 0.03 + r() * 0.02,
      [Math.round(242 - 25 * lit), Math.round(194 - 40 * lit), Math.round(48 - 20 * lit)]);
  }
  var top = columnCurve(1);
  for (i = 0; i < 5; i++) {
    var b = (i - 2) * 0.45;
    blob(top[0] + Math.sin(b) * 0.16, top[1] + Math.cos(b) * 0.12, top[2] + 0.02, 0.07, i % 2 ? [138, 15, 22] : [200, 32, 42]);
  }
  var m = new pc.Mesh(device); m.setPositions(pos); m.setNormals(nrm); m.setColors32(col); m.setIndices(ind); m.update(); return m;
}

function sepalMesh(device) {
  var pos = [], nrm = [], ind = [], nu = 9, nv = 17, j, k;
  for (j = 0; j < nv; j++) for (k = 0; k < nu; k++) {
    var v = j / (nv - 1), u = k / (nu - 1) - 0.5, w = 0.42 * Math.sin(Math.PI * Math.min(1, v * 0.85 + 0.15)) * (1 - v * 0.7);
    var x = u * w, y = v * 1.05, z = Math.abs(u) * w * 0.5 + v * v * 0.35;    // V midrib + upward curl
    pos.push(x, y, z); nrm.push(0, 0, 1);
    if (j < nv - 1 && k < nu - 1) { var a = j * nu + k; ind.push(a, a + 1, a + nu, a + 1, a + nu + 1, a + nu); }
  }
  var m = new pc.Mesh(device); m.setPositions(pos); m.setIndices(ind);
  m.setNormals(pc.calculateNormals(pos, ind)); m.update(); return m;
}

/* ---------- materials ---------- */
function stdMat(o) { var m = new pc.StandardMaterial(); m.useMetalness = false; Object.assign(m, o); m.update(); return m; }

/* ---------- per-frame update ---------- */
function applyTime(t) {
  curT = t;
  setSeg(t);
  var t0 = performance.now();
  for (var i = 0; i < 5; i++) {
    // soft stagger: back petals lead, front petals follow, all overlapping
    var K = KEYS.petals[i], ps = seg(Math.max(0, t - 0.07 * (LAYER[i] - 2) * Math.min(1, (8 - t) / 5))), s = ps[0], f = ps[1], jitter = (i - 2) * 0.015;
    deformPetal(petals[i], splK(K, 0, s, f), splK(K, 1, s, f), splK(K, 2, s, f), splK(K, 3, s, f) + jitter, splK(K, 4, s, f));    var rv = photoState[i] === 2 ? bloomRef.reveal(t, i) : 0;
    var red = petals[i].red, op = 1 - rv;
    petals[i].miRed.visible = op > 0.002;
    if (red.opacity !== op) { red.opacity = op; red.alphaTest = 0.5 * op; red.update(); }
  }
  deformMs.push(performance.now() - t0);
  if (deformMs.length > 600) deformMs.shift();
  group.setLocalEulerAngles(lerpK(KEYS.groupTilt), 0, 0);
  var sc = lerpK(KEYS.stamen); stamenEnt.setLocalScale(sc, sc, sc);
  var z = splK(KEYS.camera, 0, SEG[0], SEG[1]);
  cam.setPosition(splK(KEYS.camera, 1, SEG[0], SEG[1]) / 100, -splK(KEYS.camera, 2, SEG[0], SEG[1]) / 100, CAM_D);
  cam.camera.fov = 2 * Math.atan(3.6 / (z * CAM_D)) * 180 / Math.PI;
}

function pumpPhotos() {
  if (pendingUploads.length) {                      // at most one upload per frame
    var job = pendingUploads.shift(), p = petals[job.i], tex = makeTex(app.graphicsDevice, job.src, true);
    var ar = job.src.width / job.src.height, a = p.aspect, fc = job.focus, tile = new pc.Vec2(1, 1), off = new pc.Vec2(0, 0);
    if (ar > a) { tile.x = a / ar; off.x = (1 - tile.x) * fc[0]; } else { tile.y = ar / a; off.y = (1 - tile.y) * fc[1]; }
    var m = p.front;
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

function onUpdate() {
  if (paused) return;
  pumpPhotos();
  var t = seekT !== null ? seekT : Math.min(8, Math.max(0, bloomRef.clock()));
  applyTime(t);
  if (seekT !== null || (t >= 8 && photosDone() && !pendingUploads.length)) {
    if (seekT === null) done = true;
    app.autoRender = false;
  }
}

/* ---------- export for the 2D fallback ---------- */
function exportBaked() {
  var saved = curT, out = { times: TIMES.slice(), camera: [], petals: [] }, i, k, s;
  var device = app.graphicsDevice, cw = device.canvas.clientWidth || 1280, ch = device.canvas.clientHeight || 720, sc = ch / 720; // vertical fov: uniform by height, centred
  for (i = 0; i < 5; i++) out.petals.push({ outline: [], front: [] });
  var ring = [], q;
  for (q = 0; q < 16; q++) ring.push([0, Math.round(q / 16 * (NV - 1))]);
  for (q = 0; q < 16; q++) ring.push([Math.round(q / 16 * (NU - 1)), NV - 1]);
  for (q = 0; q < 16; q++) ring.push([NU - 1, Math.round((1 - q / 16) * (NV - 1))]);
  var camPos = new pc.Vec3();
  for (s = 0; s < TIMES.length; s++) {
    applyTime(TIMES[s]);
    out.camera.push(KEYS.camera[s].slice());
    var wt = group.getWorldTransform(); camPos.copy(cam.getPosition());
    // Project with the camera pose just set by applyTime(); camera.worldToScreen would use the
    // view matrix cached from the last rendered frame.
    var view = cam.getWorldTransform().clone().invert(), fy = 1 / Math.tan(cam.camera.fov * Math.PI / 360), asp = cw / ch;
    var project = function (w, out) {
      var v = view.transformPoint(w, new pc.Vec3()), d = -v.z;
      out.set((fy / asp * v.x / d + 1) / 2 * cw, (1 - fy * v.y / d) / 2 * ch, d);
    };
    for (i = 0; i < 5; i++) {
      var p = petals[i], ol = [];
      for (q = 0; q < ring.length; q++) {
        k = (ring[q][1] * NU + ring[q][0]) * 3; tmpV.set(p.pos[k], p.pos[k + 1], p.pos[k + 2]);
        wt.transformPoint(tmpV, tmpW); project(tmpW, tmpV);
        ol.push([Math.round((tmpV.x - (cw - 1280 * sc) / 2) / sc * 10) / 10, Math.round(tmpV.y / sc * 10) / 10]);
      }
      p.ent.getWorldTransform();
      var fr = 0, tot = 0, nW = new pc.Vec3();
      for (var j = 2; j < NV - 1; j += 4) for (var u = 1; u < NU - 1; u += 4) {
        k = (j * NU + u) * 3; tmpV.set(p.pos[k], p.pos[k + 1], p.pos[k + 2]); wt.transformPoint(tmpV, tmpW);
        nW.set(p.nrm[k], p.nrm[k + 1], p.nrm[k + 2]); wt.transformVector(nW, nW);
        tot++; if (nW.dot(tmpV.sub2(camPos, tmpW)) > 0) fr++;
      }
      out.petals[i].outline.push(ol); out.petals[i].front.push(Math.round(fr / tot * 1000) / 1000);
    }
  }
  applyTime(saved); requestRender();
  return out;
}

/* ---------- init ---------- */
export function init(canvas, bloom) {
  try {
    bloomRef = bloom; stage = bloom.stage;
    performance.mark("d9gl-app-start");
    var mobile = innerWidth < 700;
    app = new pc.Application(canvas, { graphicsDeviceOptions: { antialias: true, alpha: false, preferWebGl2: true, powerPreference: "high-performance" } });
    app.setCanvasFillMode(pc.FILLMODE_NONE);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    var device = app.graphicsDevice;
    device.maxPixelRatio = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    canvas.addEventListener("webglcontextlost", function (e) { e.preventDefault(); fallback(); }, false);
    var rect = stage.getBoundingClientRect(); app.resizeCanvas(Math.max(1, rect.width), Math.max(1, rect.height));
    app.scene.ambientLight = new pc.Color(0.36, 0.33, 0.31);

    for (var j = 0; j < NV; j++) { vTab[j] = j / (NV - 1); wTab[j] = widthProfile(vTab[j]); }
    for (var i = 0; i < NU; i++) uTab[i] = i / (NU - 1) - 0.5;
    var rr = rand(5), ph = [rr() * 6, rr() * 6, rr() * 6];
    for (j = 0; j < NV; j++) for (i = 0; i < NU; i++) {      // baked ruffle / crinkle table
      var u = uTab[i], v = vTab[j], edge = Math.max(Math.abs(u) * 2, v);
      var ew = Math.max(0, (edge - 0.55) / 0.45); ew = ew * ew;
      var sEdge = Math.abs(u) * 2 > v ? v * 1.6 + (u > 0 ? 3 : 0) : u + 5;
      ruffleTab[j * NU + i] = ew * ew * (0.045 * Math.sin(sEdge * 7 + ph[0]) + 0.012 * Math.sin(sEdge * 13 + ph[1])) +
        0.003 * Math.sin(u * 9 + v * 5 + ph[2]) * Math.sin(v * 7);
    }

    cam = new pc.Entity("cam");
    cam.addComponent("camera", { clearColor: new pc.Color(1, 1, 1), fov: 25, nearClip: 1, farClip: 40,
      toneMapping: pc.TONEMAP_LINEAR, gammaCorrection: pc.GAMMA_SRGB });
    app.root.addChild(cam);
    var light = new pc.Entity("sun");
    light.addComponent("light", { type: "directional", color: new pc.Color(1, 0.97, 0.93), intensity: 1.05, castShadows: true,
      shadowResolution: mobile ? 512 : 1024, shadowType: pc.SHADOW_PCF3_32F, normalOffsetBias: 0.05, shadowBias: 0.2, shadowDistance: 30 });
    light.setEulerAngles(50, -30, 0);
    app.root.addChild(light);

    var red = makeTex(device, redTexture(), true), mask = makeTex(device, maskTexture(), false), grey = makeTex(device, greyTexture(), true);
    var backMat = stdMat({ diffuseMap: red, diffuseMapUv: 1, emissiveMap: red, emissiveMapUv: 1, emissive: new pc.Color(0.2, 0.2, 0.2),
      specular: new pc.Color(0.12, 0.1, 0.1), gloss: 0.45, opacityMap: mask, opacityMapUv: 1, opacityMapChannel: "r", alphaTest: 0.5, alphaToCoverage: true,
      cull: pc.CULLFACE_FRONT, twoSidedLighting: true });
    var mats = {
      back: backMat,
      front: function () {
        return stdMat({ diffuseMap: grey, diffuse: new pc.Color(0.4, 0.4, 0.4), emissiveMap: grey, emissive: new pc.Color(0.65, 0.65, 0.65),
          specular: new pc.Color(0.04, 0.04, 0.04), gloss: 0.3, opacityMap: mask, opacityMapUv: 1, opacityMapChannel: "r", alphaTest: 0.5, alphaToCoverage: true, cull: pc.CULLFACE_BACK });
      },
      red: function () {
        return stdMat({ diffuseMap: red, diffuseMapUv: 1, emissiveMap: red, emissiveMapUv: 1, emissive: new pc.Color(0.2, 0.2, 0.2),
          specular: new pc.Color(0.12, 0.1, 0.1), gloss: 0.45, opacityMap: mask, opacityMapUv: 1, opacityMapChannel: "r", alphaTest: 0.5, alphaToCoverage: true,
          blendType: pc.BLEND_NORMAL, opacity: 1, depthWrite: false, cull: pc.CULLFACE_BACK });
      }
    };

    group = new pc.Entity("flower"); group.setPosition(RECEPT[0], RECEPT[1], RECEPT[2]); app.root.addChild(group);
    for (i = 0; i < 5; i++) { petals.push(buildPetal(device, i, mats)); group.addChild(petals[i].ent); photoState.push(0); }

    var throat = new pc.Entity("throat"), tt = makeTex(device, throatTexture(), true);
    throat.addComponent("render", { type: "plane", material: stdMat({ diffuse: new pc.Color(0, 0, 0), emissiveMap: tt, emissive: new pc.Color(1, 1, 1),
      opacityMap: tt, opacityMapChannel: "a", blendType: pc.BLEND_NORMAL, depthWrite: false, cull: pc.CULLFACE_NONE }), castShadows: false });
    throat.setLocalEulerAngles(90, 0, 0); throat.setLocalPosition(0, 0, 0.12); throat.setLocalScale(0.85, 1, 0.85);
    group.addChild(throat);

    stamenEnt = new pc.Entity("stamen"); group.addChild(stamenEnt);
    var colMat = stdMat({ diffuse: new pc.Color(0.69, 0.08, 0.12), specular: new pc.Color(0.3, 0.2, 0.2), gloss: 0.6 });
    var colEnt = new pc.Entity("column");
    colEnt.addComponent("render", { meshInstances: [new pc.MeshInstance(tubeMesh(device, columnCurve, 0.07, 0.035, 24, 10), colMat)] });
    var antEnt = new pc.Entity("anthers");
    antEnt.addComponent("render", { meshInstances: [new pc.MeshInstance(antherMesh(device), stdMat({ diffuseVertexColor: true, diffuse: new pc.Color(1, 1, 1), specular: new pc.Color(0.2, 0.2, 0.1), gloss: 0.5 }))] });
    stamenEnt.addChild(colEnt); stamenEnt.addChild(antEnt);

    var green = stdMat({ diffuse: new pc.Color(0.3, 0.42, 0.1), specular: new pc.Color(0.35, 0.4, 0.3), gloss: 0.7, cull: pc.CULLFACE_NONE, twoSidedLighting: true });
    var sm = sepalMesh(device), sepAz = [25, 98, 170, 240, 315];   // calyx rides with the flower, behind the petals
    for (i = 0; i < 5; i++) {
      var se = new pc.Entity("sepal" + i);
      se.addComponent("render", { meshInstances: [new pc.MeshInstance(sm, green)] });
      group.addChild(se);
      se.setLocalPosition(0, 0, -0.12); se.setLocalEulerAngles(0, 0, sepAz[i] - 90); se.rotateLocal(-18, 0, 0); se.setLocalScale(1.1, 1.1, 1.1);
    }
    var rec = new pc.Entity("receptacle"); rec.addComponent("render", { type: "sphere", material: green });
    group.addChild(rec); rec.setLocalPosition(0, 0, -0.2); rec.setLocalScale(0.42, 0.42, 0.34);
    var stem = new pc.Entity("stem"); stem.addComponent("render", { type: "cylinder", material: stdMat({ diffuse: new pc.Color(0.26, 0.35, 0.1), specular: new pc.Color(0.2, 0.25, 0.15), gloss: 0.5 }) });
    stem.setPosition(RECEPT[0], RECEPT[1] - 3, 0); stem.setLocalScale(0.28, 6, 0.28); app.root.addChild(stem);

    app.on("update", onUpdate);
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
    performance.mark("d9gl-app-end"); performance.measure("d9gl-app-create", "d9gl-app-start", "d9gl-app-end");
    app.once("frameend", function () {
      try {
        performance.mark("d9gl-first-frame"); performance.measure("d9gl-first-frame", "d9gl-app-start", "d9gl-first-frame");
        var api = {
          seek: function (t) { seekT = Math.min(8, Math.max(0, +t || 0)); app.autoRender = false; applyTime(seekT); pumpPhotos(); app.renderNextFrame = true; },
          play: function () { seekT = null; done = false; app.autoRender = !paused; },
          time: function () { return curT; },
          isRunning: function () { return !!app.autoRender && !done && seekT === null; },
          exportBaked: exportBaked,
          deformStats: function () { var a = deformMs.slice().sort(function (x, y) { return x - y; }); return { n: a.length, median: a[a.length >> 1], p95: a[Math.floor(a.length * 0.95)] }; }
        };
        if (bloom.attachWebGL) bloom.attachWebGL(api); else Object.assign(bloom, api);
      } catch (e) { console.warn(e); fallback(); }
    });
    app.start();
  } catch (err) {
    console.warn("design-9 WebGL init failed", err);
    fallback();
  }
}
function fallback() {
  try { if (app) { app.autoRender = false; } } catch (e) { /* ignore */ }
  if (typeof window.pepperBloomFallback === "function") window.pepperBloomFallback();
}

performance.mark("d9gl-eval-end");
performance.measure("d9gl-module-eval", "d9gl-eval-start", "d9gl-eval-end");
if (window.pepperBloom && window.pepperBloom.canvas) init(window.pepperBloom.canvas, window.pepperBloom);
