(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function formatValue(value, suffix) {
    return value.toLocaleString("en-US") + suffix;
  }

  function startCountUp(hero) {
    var numbers = Array.prototype.slice.call(hero.querySelectorAll(".pl-stat-number"));
    var startedAt = Date.now();
    var duration = 1800;

    numbers.forEach(function (number) {
      number.textContent = formatValue(0, number.dataset.suffix || "");
    });

    function update() {
      var elapsed = Date.now() - startedAt;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);

      numbers.forEach(function (number) {
        var target = Number(number.dataset.target);
        number.textContent = formatValue(Math.round(target * eased), number.dataset.suffix || "");
      });

      if (progress < 1) {
        window.requestAnimationFrame(update);
      }
    }

    window.requestAnimationFrame(update);
  }

  function activateHero(hero) {
    if (!prefersReducedMotion.matches) {
      var segments = Array.prototype.slice.call(hero.querySelectorAll(".pl-typewriter-segment"));
      var characters = [];
      segments.forEach(function (segment) {
        var text = segment.textContent;
        segment.setAttribute("data-full-text", text);
        for (var index = 0; index < text.length; index += 1) {
          characters.push({ segment: segment, character: text.charAt(index) });
        }
      });
      var characterIndex = 0;

      function revealNextCharacter() {
        if (!hero.isConnected) {
          return;
        }
        if (prefersReducedMotion.matches || characterIndex >= characters.length) {
          segments.forEach(function (segment) {
            if (!segment.textContent) {
              segment.textContent = segment.getAttribute("data-full-text") || "";
            }
          });
          return;
        }
        var next = characters[characterIndex];
        next.segment.textContent += next.character;
        characterIndex += 1;
        window.setTimeout(revealNextCharacter, 48);
      }

      window.requestAnimationFrame(function () {
        hero.classList.add("pl-play");
      });
      window.setTimeout(function () {
        if (!hero.isConnected) {
          return;
        }
        segments.forEach(function (segment) {
          segment.textContent = "";
        });
        window.requestAnimationFrame(revealNextCharacter);
      }, 2450);
      window.setTimeout(function () {
        startCountUp(hero);
      }, 3100);
    }
  }

  function findCurrentHero() {
    var root = document.getElementById("root");
    if (!root) {
      return null;
    }
    var sections = root.querySelectorAll("section");
    for (var index = 0; index < sections.length; index += 1) {
      if (sections[index].classList.contains("pl-hero") || sections[index].hasAttribute("data-pl-original")) {
        continue;
      }
      var heading = sections[index].querySelector("h1");
      if (heading && heading.textContent.trim().replace(/\s+/g, " ") === "Impact Strategist") {
        return sections[index];
      }
    }
    return null;
  }

  function isHomePage() {
    return window.location.pathname === "/" || window.location.pathname === "/index.html";
  }

  function removeOrphanedHeroes() {
    // React unmounted the hero we were covering (route change), so drop our copy too.
    document.querySelectorAll("#root .pl-hero").forEach(function (hero) {
      var original = hero.nextElementSibling;
      if (!original || !original.hasAttribute("data-pl-original")) {
        hero.remove();
      }
    });
  }

  function mountHero(markup) {
    removeOrphanedHeroes();
    var existingHero = isHomePage() && findCurrentHero();
    if (!existingHero) {
      return;
    }

    var template = document.createElement("template");
    template.innerHTML = markup.trim();
    var hero = template.content.firstElementChild;
    // Hide React's hero instead of replacing it, so React can still unmount it on route changes.
    existingHero.setAttribute("data-pl-original", "true");
    existingHero.setAttribute("aria-hidden", "true");
    existingHero.hidden = true;
    existingHero.style.setProperty("display", "none", "important");
    existingHero.parentNode.insertBefore(hero, existingHero);
    activateHero(hero);
  }

  function initialize() {
    fetch("/partials/hero.html")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Hero partial request failed with status " + response.status);
        }
        return response.text();
      })
      .then(function (markup) {
        var root = document.getElementById("root");
        if (!root) {
          throw new Error("Homepage application root was not found");
        }
        // Keep observing: React re-renders the homepage on every client-side visit to "/".
        new MutationObserver(function () {
          mountHero(markup);
        }).observe(root, { childList: true, subtree: true });
        mountHero(markup);
      })
      .catch(function (error) {
        console.error("Unable to initialize the Pepper Labs hero.", error);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
