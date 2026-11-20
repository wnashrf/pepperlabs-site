(function () {
  "use strict";

  var root = document.getElementById("root");
  if (!root || !window.requestAnimationFrame) {
    return;
  }

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function isDesignSevenHome() {
    return (
      document.documentElement.getAttribute("data-design") === "7" &&
      (window.location.pathname === "/" || window.location.pathname === "/index.html")
    );
  }

  function seedRandom(seed) {
    var value = seed;
    return function () {
      value = (value * 16807) % 2147483647;
      return (value - 1) / 2147483646;
    };
  }

  function makeTorusPoints(majorSegments, tubeSegments) {
    var points = [];
    var scatterRandom = seedRandom(7919);
    for (var major = 0; major < majorSegments; major += 1) {
      var u = (major / majorSegments) * Math.PI * 2;
      for (var tube = 0; tube < tubeSegments; tube += 1) {
        var v = (tube / tubeSegments) * Math.PI * 2;
        var tubeRadius = 0.26;
        var majorRadius = 0.66;
        points.push({
          x: (majorRadius + tubeRadius * Math.cos(v)) * Math.cos(u),
          y: (majorRadius + tubeRadius * Math.cos(v)) * Math.sin(u),
          z: tubeRadius * Math.sin(v),
          scatterX: (scatterRandom() * 2 - 1) * 1.75,
          scatterY: (scatterRandom() * 2 - 1) * 1.35,
          scatterZ: (scatterRandom() * 2 - 1) * 1.75,
          shade: (major / majorSegments + tube / tubeSegments) % 1,
          size: 0.85 + ((major * 7 + tube * 11) % 9) / 8,
        });
      }
    }
    return points;
  }

  function makeFieldPoints(count, seed) {
    var random = seedRandom(seed);
    var points = [];
    for (var index = 0; index < count; index += 1) {
      points.push({
        x: random(),
        y: random(),
        z: random(),
        phase: random() * Math.PI * 2,
        shade: random(),
        size: 0.35 + random() * 1.1,
      });
    }
    return points;
  }

  function drawField(context, width, height, time, points) {
    points.forEach(function (point) {
      var driftX = Math.sin(time * 0.00012 + point.phase) * 9;
      var driftY = Math.cos(time * 0.0001 + point.phase) * 7;
      var x = point.x * width + driftX;
      var y = point.y * height + driftY;
      var twinkle = 0.2 + (Math.sin(time * 0.001 + point.phase) + 1) * 0.24;
      var color =
        point.shade < 0.44
          ? "225,58,38"
          : point.shade < 0.84
            ? "254,237,101"
            : "255,248,220";
      context.fillStyle = "rgba(" + color + "," + twinkle + ")";
      context.beginPath();
      context.arc(x, y, point.size * (0.65 + point.z), 0, Math.PI * 2);
      context.fill();
    });
  }

  function getScrollProgress() {
    var scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    return scrollRange > 0 ? Math.max(0, Math.min(1, window.scrollY / scrollRange)) : 0;
  }

  function drawTorus(context, width, height, time, points, centerX, centerY, scale, tilt, breakup) {
    var rotationY = time * 0.00018 + tilt.x * 0.28;
    var rotationX = -0.5 + tilt.y * 0.22;
    var cosY = Math.cos(rotationY);
    var sinY = Math.sin(rotationY);
    var cosX = Math.cos(rotationX);
    var sinX = Math.sin(rotationX);
    var projected = [];

    points.forEach(function (point) {
      var breakupDrift = breakup * 0.035;
      var sourceX = point.x + (point.scatterX - point.x) * breakup + Math.sin(time * 0.001 + point.shade * 40) * breakupDrift;
      var sourceY = point.y + (point.scatterY - point.y) * breakup + Math.cos(time * 0.0012 + point.shade * 36) * breakupDrift;
      var sourceZ = point.z + (point.scatterZ - point.z) * breakup + Math.sin(time * 0.0011 + point.shade * 29) * breakupDrift;
      var x = sourceX * cosY - sourceZ * sinY;
      var z = sourceX * sinY + sourceZ * cosY;
      var y = sourceY * cosX - z * sinX;
      z = sourceY * sinX + z * cosX;
      var perspective = 3.2 / (3.2 - z);
      projected.push({
        x: centerX + x * scale * perspective,
        y: centerY + y * scale * perspective,
        depth: z,
        shade: point.shade,
        size: point.size * perspective,
      });
    });

    projected.sort(function (a, b) {
      return a.depth - b.depth;
    });
    projected.forEach(function (point) {
      var color =
        point.shade < 0.34
          ? "225,58,38"
          : point.shade < 0.72
            ? "254,237,101"
            : "255,249,224";
      var depthOpacity = 0.48 + ((point.depth + 1) / 2) * 0.48;
      context.fillStyle = "rgba(" + color + "," + depthOpacity + ")";
      context.shadowColor = "rgba(" + color + "," + depthOpacity + ")";
      context.shadowBlur = point.size > 1.3 ? 5 : 2;
      context.beginPath();
      context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
      context.fill();
    });
    context.shadowBlur = 0;
  }

  function drawScene(context, canvas, field, rings, time, tilt) {
    var bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) {
      return;
    }
    context.clearRect(0, 0, bounds.width, bounds.height);
    drawField(context, bounds.width, bounds.height, time, field);

    var scrollProgress = getScrollProgress();
    var breakup = Math.max(0, Math.min(1, (scrollProgress - 0.16) / 0.28));
    var reform = Math.max(0, Math.min(1, (scrollProgress - 0.68) / 0.23));
    breakup = breakup * breakup * (3 - 2 * breakup);
    reform = reform * reform * (3 - 2 * reform);
    breakup *= 1 - reform;
    var scale = Math.min(bounds.width, bounds.height);
    var centerX = bounds.width * 0.57;
    var centerY = bounds.height * 0.52;
    var ringSize = scale * 0.5;

    drawTorus(context, bounds.width, bounds.height, time, rings, centerX, centerY, ringSize, tilt, breakup);

    if (reform > 0) {
      context.globalAlpha = reform;
      drawTorus(context, bounds.width, bounds.height, time, rings, bounds.width * 0.47, centerY, ringSize * 0.65, tilt, 0);
      drawTorus(context, bounds.width, bounds.height, time + 300, rings, bounds.width * 0.57, centerY, ringSize * 0.65, tilt, 0);
      drawTorus(context, bounds.width, bounds.height, time + 600, rings, bounds.width * 0.67, centerY, ringSize * 0.65, tilt, 0);
      context.globalAlpha = 1 - reform;
      drawTorus(context, bounds.width, bounds.height, time, rings, centerX, centerY, ringSize, tilt, 0);
      context.globalAlpha = 1;
    }
  }

  function mountCanvas(container) {
    var containerBounds = container.getBoundingClientRect();
    if (containerBounds.width <= 1 || containerBounds.height <= 1) {
      return;
    }
    if (container.querySelector(":scope > .pl-particle-canvas")) {
      return;
    }

    container.classList.add("pl-particle-scene");
    container.classList.add("pl-particle-scroll");
    var canvas = document.createElement("canvas");
    canvas.className = "pl-particle-canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvas.setAttribute("role", "presentation");
    container.insertBefore(canvas, container.firstChild);

    var context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      console.error("Design 7 particle canvas could not create a 2D context.");
      return;
    }

    var field = makeFieldPoints(420, 41);
    var rings = makeTorusPoints(72, 30);
    var tilt = { x: 0, y: 0 };
    var visible = true;
    var animationFrame = 0;
    var pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    function resize() {
      var bounds = canvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(bounds.width * pixelRatio));
      canvas.height = Math.max(1, Math.round(bounds.height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawScene(context, canvas, field, rings, 0, tilt);
    }

    function render(time) {
      animationFrame = 0;
      if (!visible || document.hidden) {
        return;
      }
      drawScene(context, canvas, field, rings, time, tilt);
      if (!reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(render);
      }
    }

    function start() {
      if (!animationFrame && visible && !document.hidden && !reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(render);
      } else if (reducedMotion.matches) {
        drawScene(context, canvas, field, rings, 0, tilt);
      }
    }

    container.addEventListener(
      "pointermove",
      function (event) {
        var bounds = container.getBoundingClientRect();
        tilt.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        tilt.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      },
      { passive: true },
    );

    if (window.ResizeObserver) {
      new ResizeObserver(resize).observe(container);
    } else {
      window.addEventListener("resize", resize, { passive: true });
    }

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) {
          start();
        } else if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
      }).observe(container);
    }

    document.addEventListener("visibilitychange", start);
    window.addEventListener(
      "scroll",
      function () {
        if (reducedMotion.matches) {
          drawScene(context, canvas, field, rings, 0, tilt);
        }
      },
      { passive: true },
    );
    resize();
    start();
  }

  function mountScenes() {
    if (!isDesignSevenHome()) {
      return;
    }

    var pageStage = root.querySelector(":scope > div.bg-white");
    if (pageStage) {
      mountCanvas(pageStage);
    }
  }

  new MutationObserver(mountScenes).observe(root, {
    childList: true,
    subtree: true,
  });
  mountScenes();
})();
