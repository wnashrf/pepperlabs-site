// Draggable handle for the "Our story, over time" timeline on /who-we-are.
// The timeline lives in the React bundle; this only adds a handle on top and
// clicks the bundle's own buttons, so React still owns which story is shown.
(function () {
  "use strict";

  var SVG = "http://www.w3.org/2000/svg";
  var BUMP_WIDTH = 70;
  var BUMP_HEIGHT = 12;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function mount(track) {
    track.setAttribute("data-drag", "");

    var svg = document.createElementNS(SVG, "svg");
    svg.setAttribute("class", "pl-drag-line");
    svg.setAttribute("aria-hidden", "true");
    var path = document.createElementNS(SVG, "path");
    svg.appendChild(path);
    var handle = document.createElement("span");
    handle.className = "pl-drag-handle";
    handle.setAttribute("aria-hidden", "true");
    track.append(svg, handle);

    var x = null;
    var target = 0;
    var frame = 0;
    var drag = null;
    var near = null;

    function points() {
      return track.querySelectorAll(".pl-history-point");
    }

    function centre(point) {
      return point.offsetLeft + point.offsetWidth / 2;
    }

    function nearest(px) {
      var best = null;
      var bestDistance = Infinity;
      points().forEach(function (point) {
        var distance = Math.abs(centre(point) - px);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = point;
        }
      });
      return best;
    }

    // How far the line rises at px: a smooth bell centred on the handle.
    function lift(px) {
      var distance = Math.abs(px - x);
      if (distance >= BUMP_WIDTH) return 0;
      return (BUMP_HEIGHT * (1 + Math.cos((Math.PI * distance) / BUMP_WIDTH))) / 2;
    }

    // One line that bends under the handle; the dots ride on it, so the dot
    // under the handle rises into it instead of showing a second bullet below.
    function draw() {
      var width = track.scrollWidth;
      var mid = track.clientHeight / 2;
      var d = "M0 " + mid + "H" + (x - BUMP_WIDTH);
      for (var px = x - BUMP_WIDTH + 4; px < x + BUMP_WIDTH; px += 4) {
        d += "L" + px + " " + (mid - lift(px));
      }
      path.setAttribute("d", d + "L" + (x + BUMP_WIDTH) + " " + mid + "H" + width);
      svg.setAttribute("width", width);
      svg.setAttribute("height", track.clientHeight);
      points().forEach(function (point) {
        var dot = point.querySelector(".pl-history-dot");
        var cx = centre(point);
        dot.style.transform = "translateY(" + -lift(cx) + "px)";
        // Fade dots as the handle reaches them so none peeks out from under it.
        dot.style.opacity = Math.min(1, Math.max(0, (Math.abs(cx - x) - 18) / 22));
      });
      handle.style.transform =
        "translate(" + x + "px, " + (mid - BUMP_HEIGHT) + "px) translate(-50%, -50%)";
    }

    // Ease towards the target each frame: the handle trails the pointer slightly.
    function tick() {
      x += (target - x) * 0.22;
      if (Math.abs(target - x) < 0.5) x = target;
      draw();
      frame = x === target ? 0 : requestAnimationFrame(tick);
    }

    function moveTo(px, instant) {
      target = px;
      if (x === null || instant || reducedMotion.matches) {
        x = target;
        draw();
      } else if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    }

    function toActive(instant) {
      var active = track.querySelector(".pl-history-point.is-active") || points()[0];
      if (active) moveTo(centre(active), instant);
    }

    // Show the story under the handle while dragging. The bundle's click handler
    // also scrolls the dot into view; skip that mid-drag so the track stays put.
    function preview(point) {
      if (!point || point === near) return;
      near = point;
      point.scrollIntoView = function () {};
      point.click();
      delete point.scrollIntoView;
    }

    track.addEventListener("pointerdown", function (event) {
      if (event.button !== 0) return;
      drag = { id: event.pointerId, startX: event.clientX, moved: false };
    });

    track.addEventListener("pointermove", function (event) {
      if (!drag || event.pointerId !== drag.id) return;
      // Small movements stay a normal click on the button.
      if (!drag.moved) {
        if (Math.abs(event.clientX - drag.startX) < 6) return;
        drag.moved = true;
        track.setPointerCapture(event.pointerId);
        track.classList.add("is-dragging");
      }
      var all = points();
      var rect = track.getBoundingClientRect();
      // On narrow screens the track scrolls: nudge it when the pointer nears an edge.
      if (event.clientX < rect.left + 40) track.scrollLeft -= 8;
      else if (event.clientX > rect.right - 40) track.scrollLeft += 8;
      var px = event.clientX - rect.left + track.scrollLeft;
      px = Math.min(Math.max(px, centre(all[0])), centre(all[all.length - 1]));
      moveTo(px);
      preview(nearest(px));
    });

    function release(event) {
      if (!drag || event.pointerId !== drag.id) return;
      var moved = drag.moved;
      drag = null;
      near = null;
      if (!moved) return;
      track.classList.remove("is-dragging");
      var active = track.querySelector(".pl-history-point.is-active");
      if (!active) return toActive();
      // Snap onto the story already showing; clicking it again scrolls it into view.
      moveTo(centre(active));
      active.click();
    }

    track.addEventListener("pointerup", release);
    track.addEventListener("pointercancel", release);

    // Follow every change of the active story (clicks, keyboard, our own drop).
    new MutationObserver(function () {
      if (!drag) toActive();
    }).observe(track, { subtree: true, attributeFilter: ["aria-selected"] });

    new ResizeObserver(function () {
      if (!drag) toActive(true);
    }).observe(track);
  }

  function scan() {
    document
      .querySelectorAll(".pl-history-section--who .pl-history-track:not([data-drag])")
      .forEach(mount);
  }

  function initialize() {
    var root = document.getElementById("root");
    if (!root) return;
    // React mounts the page after this script runs and on every visit to /who-we-are.
    new MutationObserver(scan).observe(root, { childList: true, subtree: true });
    scan();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
