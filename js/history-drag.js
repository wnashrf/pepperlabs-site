// Draggable handle for the "Our story, over time" timeline on /who-we-are.
// The timeline lives in the React bundle; this only adds a handle on top and
// clicks the bundle's own buttons, so React still owns which story is shown.
(function () {
  "use strict";

  var SVG = "http://www.w3.org/2000/svg";
  // The dip spans this many dot gaps on each side of the handle, so the
  // neighbouring dots sink slightly too: one long, gentle valley.
  var DIP_SPAN = 1.6;
  var AUTOPLAY_MS = 6000;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  // Unlabelled chapters of the story, from the logo's palette, alternating dark
  // and light so neighbouring chapters stand apart. `from` is the index of each
  // era's first story in the bundle's list: update it if stories are added or
  // reordered.
  var ERAS = [
    { from: 0, color: "#b52a25" }, // Masala Wheels: deep red
    { from: 1, color: "#f9a826" }, // Pepper Labs: gold
    { from: 5, color: "#ef4136" }, // Dapur Digital: logo red
    { from: 9, color: "#414042" }, // AI: the logo's charcoal
  ];

  function eraColor(index) {
    var color = ERAS[0].color;
    ERAS.forEach(function (era) {
      if (index >= era.from) color = era.color;
    });
    return color;
  }

  function mount(track) {
    track.setAttribute("data-drag", "");

    var svg = document.createElementNS(SVG, "svg");
    svg.setAttribute("class", "pl-drag-line");
    svg.setAttribute("aria-hidden", "true");
    // The line's colour runs through the eras: a gradient with near-hard stops.
    var gradient = document.createElementNS(SVG, "linearGradient");
    gradient.id = "pl-era-" + Math.random().toString(36).slice(2);
    gradient.setAttribute("gradientUnits", "userSpaceOnUse");
    var defs = document.createElementNS(SVG, "defs");
    defs.appendChild(gradient);
    var path = document.createElementNS(SVG, "path");
    path.setAttribute("stroke", "url(#" + gradient.id + ")");
    svg.append(defs, path);
    var handle = document.createElement("span");
    handle.className = "pl-drag-handle";
    handle.setAttribute("aria-hidden", "true");
    track.append(svg, handle);
    // The story card hangs below the timeline; its pointer follows the handle.
    var section = track.closest(".pl-history-section");
    var stage = section && section.querySelector(".pl-history-stage");

    var x = null;
    var target = 0;
    var frame = 0;
    var drag = null;
    var near = null;

    function points() {
      return track.querySelectorAll(".pl-history-point");
    }

    // Each dot's ring takes its era's colour.
    points().forEach(function (point, index) {
      point.style.setProperty("--pl-era", eraColor(index));
    });

    // The string is a window onto the timeline, so the ends of the count row say
    // how many stories lie out of view on each side ("‹ 3 earlier", "8 later ›"),
    // each in the colour of the chapter just beyond that edge.
    var earlier = document.createElement("span");
    earlier.className = "pl-drag-more pl-drag-more--earlier";
    var later = document.createElement("span");
    later.className = "pl-drag-more pl-drag-more--later";
    [earlier, later].forEach(function (el) {
      el.setAttribute("aria-hidden", "true");
      track.parentNode.appendChild(el);
    });

    // And at each end of the string itself, a short trail of dots peeks in
    // (shrinking and fading outwards) while more stories lie beyond that edge.
    var peeks = ["earlier", "later"].map(function (side) {
      var peek = document.createElement("span");
      peek.className = "pl-drag-peek pl-drag-peek--" + side;
      peek.setAttribute("aria-hidden", "true");
      peek.innerHTML = "<i></i><i></i><i></i>";
      track.parentNode.appendChild(peek);
      return peek;
    });

    function setMore(el, peek, count, index, text) {
      el.hidden = peek.hidden = count === 0;
      if (!count) return;
      // One peeking dot per hidden story, up to three.
      Array.prototype.forEach.call(peek.children, function (dot, k) {
        dot.hidden = k >= count;
      });
      el.textContent = text.replace("N", count);
      el.style.setProperty("--pl-era", eraColor(index));
      peek.style.setProperty("--pl-era", eraColor(index));
      // On the dots' centre line, which sits below the count row.
      var first = points()[0];
      peek.style.top = track.offsetTop + first.offsetTop + first.offsetHeight / 2 + "px";
    }

    function updateMap() {
      var all = points();
      var from = track.scrollLeft + 40;
      var to = track.scrollLeft + track.clientWidth - 40;
      var before = 0;
      var after = 0;
      all.forEach(function (point) {
        var cx = centre(point);
        if (cx < from) before += 1;
        else if (cx > to) after += 1;
      });
      setMore(earlier, peeks[0], before, before - 1, "‹ N earlier");
      setMore(later, peeks[1], after, all.length - after, "N later ›");
      // At a true end nothing is cut off, so that edge stops fading and the
      // end dot shows in full.
      track.classList.toggle("is-at-start", !canScroll(-1));
      track.classList.toggle("is-at-end", !canScroll(1));
    }

    // Gradient stops at the midpoint between eras, with a short blend.
    function paintEras(all, width) {
      var stops = [];
      ERAS.forEach(function (era, k) {
        if (k === 0) {
          stops.push([0, era.color]);
          return;
        }
        var edge = (centre(all[era.from - 1]) + centre(all[era.from])) / 2;
        stops.push([(edge - 6) / width, ERAS[k - 1].color], [(edge + 6) / width, era.color]);
      });
      stops.push([1, ERAS[ERAS.length - 1].color]);
      gradient.setAttribute("x1", 0);
      gradient.setAttribute("x2", width);
      gradient.replaceChildren.apply(
        gradient,
        stops.map(function (stop) {
          var el = document.createElementNS(SVG, "stop");
          el.setAttribute("offset", Math.min(1, Math.max(0, stop[0])));
          el.setAttribute("stop-color", stop[1]);
          return el;
        }),
      );
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

    // The dip's size follows the dot spacing: DIP_SPAN gaps wide, and deeper on
    // wider screens (16-24px).
    var dipWidth = 84;
    var dipDepth = 16;

    function sizeDip() {
      var all = points();
      if (all.length < 2) return;
      var gap = centre(all[1]) - centre(all[0]);
      dipWidth = gap * DIP_SPAN;
      dipDepth = Math.min(24, Math.max(16, gap * 0.12));
    }

    // Near a scrollable edge the dip squeezes on that side instead of reaching
    // it: it stops EDGE_GAP short (clear of the peeking dots), but never gets
    // narrower than MIN_SIDE. At a true end it keeps its shape and is simply
    // cut off where the string ends, at the first or last dot.
    var EDGE_GAP = 36;
    var MIN_SIDE = 28;
    var dipLeft = dipWidth;
    var dipRight = dipWidth;

    function shapeDip() {
      var low = canScroll(-1) ? track.scrollLeft + EDGE_GAP : -Infinity;
      var high = canScroll(1) ? track.scrollLeft + track.clientWidth - EDGE_GAP : Infinity;
      dipLeft = Math.max(MIN_SIDE, Math.min(dipWidth, x - low));
      dipRight = Math.max(MIN_SIDE, Math.min(dipWidth, high - x));
    }

    // How far the line dips at px: a smooth bell centred on the handle.
    function dip(px) {
      var span = px < x ? dipLeft : dipRight;
      var distance = Math.abs(px - x);
      if (distance >= span) return 0;
      return (dipDepth * (1 + Math.cos((Math.PI * distance) / span))) / 2;
    }

    // One line that sags under the handle, as if the story card hanging below
    // pulls it down. The dots ride on it, so the dot under the handle sinks
    // into it instead of showing a second bullet beside it.
    function draw() {
      // Measured from the last dot, not scrollWidth: the SVG itself counts in
      // scrollWidth, so after the window narrows it would keep its old width.
      var last = points()[points().length - 1];
      var width = last.offsetLeft + last.offsetWidth + parseFloat(getComputedStyle(track).paddingRight);
      svg.setAttribute("width", width);
      var first = points()[0];
      var mid = first.offsetTop + first.offsetHeight / 2;
      sizeDip();
      shapeDip();
      // The string starts at the first dot and ends at the last one.
      var start = centre(first);
      var end = centre(last);
      var left = Math.max(start, x - dipLeft);
      var right = Math.min(end, x + dipRight);
      var d = "M" + start + " " + (mid + dip(start)) + "H" + left;
      for (var px = left + 4; px < right; px += 4) {
        d += "L" + px + " " + (mid + dip(px));
      }
      path.setAttribute("d", d + "L" + right + " " + (mid + dip(right)) + "H" + end);
      svg.setAttribute("height", track.clientHeight);
      points().forEach(function (point) {
        var dot = point.querySelector(".pl-history-dot");
        var cx = centre(point);
        dot.style.transform = "translateY(" + dip(cx) + "px)";
        // Fade dots as the handle reaches them so none peeks out from under it.
        dot.style.opacity = Math.min(1, Math.max(0, (Math.abs(cx - x) - 18) / 22));
      });
      handle.style.translate = x + "px " + (mid + dipDepth) + "px";
      // The handle takes the colour of the era it is passing through.
      var all = points();
      paintEras(all, width);
      handle.style.setProperty("--pl-era", eraColor(Array.prototype.indexOf.call(all, nearest(x))));
      if (stage) {
        // Point the card at the handle, kept clear of the card's rounded corners.
        var corners = getComputedStyle(stage);
        var tail = track.getBoundingClientRect().left - stage.getBoundingClientRect().left + x - track.scrollLeft;
        tail = Math.min(
          Math.max(tail, parseFloat(corners.borderTopLeftRadius) + 14),
          stage.clientWidth - parseFloat(corners.borderTopRightRadius) - 14,
        );
        stage.style.setProperty("--pl-tail-x", tail + "px");
      }
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

    var lastX = 0;
    var auto = 0;

    // While the window can still scroll towards an edge, the handle stays this
    // far inside it: room for the squeezed dip, clear of the edge fade, and a
    // fast drag can't throw the handle out of view. At the true start or end it
    // may go all the way.
    function edgeZone() {
      return Math.min(EDGE_GAP + MIN_SIDE, track.clientWidth / 2);
    }

    function canScroll(direction) {
      var max = track.scrollWidth - track.clientWidth;
      return direction < 0 ? track.scrollLeft > 0 : track.scrollLeft < max - 1;
    }

    // Put the handle under the pointer (within the zone), in the track's
    // scrolled coordinates.
    function dragTo(clientX) {
      var all = points();
      var local = clientX - track.getBoundingClientRect().left;
      var zone = edgeZone();
      if (canScroll(-1)) local = Math.max(local, zone);
      if (canScroll(1)) local = Math.min(local, track.clientWidth - zone);
      var px = local + track.scrollLeft;
      px = Math.min(Math.max(px, centre(all[0])), centre(all[all.length - 1]));
      moveTo(px);
      preview(nearest(px));
    }

    // Pushing the pointer past the zone scrolls the string sideways under the
    // handle, faster the further it goes.
    function autoScroll() {
      auto = 0;
      if (!drag || !drag.moved) return;
      var local = lastX - track.getBoundingClientRect().left;
      var zone = edgeZone();
      var push = 0;
      if (local < zone && canScroll(-1)) push = local - zone;
      else if (local > track.clientWidth - zone && canScroll(1)) push = local - (track.clientWidth - zone);
      if (!push) return;
      var step = Math.max(2, Math.min(14, Math.abs(push) * 0.25));
      track.scrollLeft += push < 0 ? -step : step;
      dragTo(lastX);
      auto = requestAnimationFrame(autoScroll);
    }

    track.addEventListener("pointerdown", function (event) {
      if (event.button !== 0) return;
      drag = { id: event.pointerId, startX: event.clientX, moved: false };
      restartAutoplay();
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
      lastX = event.clientX;
      dragTo(lastX);
      if (!auto) auto = requestAnimationFrame(autoScroll);
    });

    // Programmatic scrolls (clicks, keys, arrows, autoscroll) move the handle's
    // place on screen, so redraw the pointer and the overview frame.
    track.addEventListener(
      "scroll",
      function () {
        if (x !== null) draw();
        updateMap();
      },
      { passive: true },
    );

    function release(event) {
      if (!drag || event.pointerId !== drag.id) return;
      var moved = drag.moved;
      drag = null;
      near = null;
      cancelAnimationFrame(auto);
      auto = 0;
      restartAutoplay();
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
    // Any change, by the visitor or by autoplay, restarts the countdown.
    new MutationObserver(function () {
      updateMap();
      if (!drag) toActive();
      restartAutoplay();
    }).observe(track, { subtree: true, attributeFilter: ["aria-selected"] });

    new ResizeObserver(function () {
      updateMap();
      if (!drag) toActive(true);
    }).observe(track);

    // Autoplay: move to the next story every AUTOPLAY_MS, looping at the end.
    // A pause/play button (required for motion longer than 5s, WCAG 2.2.2) sits
    // in the story card, with a ring that fills as the next move approaches.
    // It holds still until the timeline is scrolled into view, and while the
    // pointer is over the story card, anything in the section has focus, a drag is under
    // way, or the tab is hidden; it starts paused for visitors who prefer
    // reduced motion.
    var playing = !reducedMotion.matches;
    var hovering = false;
    var focused = false;
    var inView = false;
    var timer = 0;

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "pl-autoplay";
    toggle.style.setProperty("--pl-autoplay-ms", AUTOPLAY_MS + "ms");
    toggle.innerHTML =
      '<svg class="pl-autoplay-ring" viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="12" pathLength="100"/></svg>' +
      '<svg class="pl-autoplay-icon pl-autoplay-icon--pause" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5v10M13 5v10"/></svg>' +
      '<svg class="pl-autoplay-icon pl-autoplay-icon--play" viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 5.5v9l7-4.5z"/></svg>';
    // In the story card's bottom-right corner.
    if (stage) stage.appendChild(toggle);

    function showState() {
      toggle.classList.toggle("is-playing", playing);
      toggle.setAttribute("aria-label", playing ? "Pause the timeline" : "Play the timeline");
    }

    function restartAutoplay() {
      clearTimeout(timer);
      toggle.classList.remove("is-counting");
      if (!playing || hovering || focused || !inView || drag || document.hidden) return;
      void toggle.offsetWidth; // restart the ring's fill animation
      toggle.classList.add("is-counting");
      timer = setTimeout(advance, AUTOPLAY_MS);
    }

    // Select the next story. Scroll only the track, never the page.
    function advance() {
      var all = points();
      var active = track.querySelector(".pl-history-point.is-active");
      var next = all[(Array.prototype.indexOf.call(all, active) + 1) % all.length];
      next.scrollIntoView = function () {};
      next.click();
      delete next.scrollIntoView;
      track.scrollTo({
        left: centre(next) - track.clientWidth / 2,
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    }

    toggle.addEventListener("click", function () {
      playing = !playing;
      showState();
      restartAutoplay();
    });

    // Hovering pauses only over the story card, where people read.
    if (stage) {
      stage.addEventListener("pointerenter", function (event) {
        if (event.pointerType !== "mouse") return;
        hovering = true;
        restartAutoplay();
      });
      stage.addEventListener("pointerleave", function () {
        hovering = false;
        restartAutoplay();
      });
    }

    if (section) {
      // Focus on the pause button itself does not count, or pressing play would never play.
      section.addEventListener("focusin", function (event) {
        focused = event.target !== toggle;
        restartAutoplay();
      });
      section.addEventListener("focusout", function (event) {
        if (!section.contains(event.relatedTarget)) focused = false;
        restartAutoplay();
      });
      // Only once the timeline itself is (almost) fully on screen, so visitors
      // still reading the hero above don't arrive to find it played through.
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          inView = entries[0].intersectionRatio >= 0.9;
          restartAutoplay();
        }, { threshold: [0, 0.9] }).observe(track.parentNode);
      }
    }
    document.addEventListener("visibilitychange", restartAutoplay);
    showState();

    // Hint that the handle can be dragged: one small nudge the first time the track is seen.
    if (!reducedMotion.matches && "IntersectionObserver" in window) {
      var seen = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        seen.disconnect();
        if (drag) return;
        var home = target;
        moveTo(home + 36);
        setTimeout(function () {
          if (!drag && target === home + 36) moveTo(home);
        }, 520);
      }, { threshold: 0.6 });
      seen.observe(track);
    }
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
