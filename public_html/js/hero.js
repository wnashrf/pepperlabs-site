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

  function revealWorkOverlay(hero, typeText) {
    var overlay = hero.querySelector(".pl-work-overlay");
    if (!overlay) {
      return;
    }

    overlay.setAttribute("aria-hidden", "false");
    hero.classList.add("pl-overlay-visible");

    var words = Array.prototype.slice.call(overlay.querySelectorAll("[data-pl-work-word]"));
    var pluses = Array.prototype.slice.call(overlay.querySelectorAll("[data-pl-work-plus]"));
    if (!typeText) {
      words.forEach(function (word) {
        word.textContent = word.getAttribute("data-pl-work-word");
      });
      pluses.forEach(function (plus) {
        plus.classList.add("pl-work-plus-visible");
      });
      words[words.length - 1].classList.add("pl-work-typing");
      return;
    }

    var wordIndex = 0;
    var characterIndex = 0;

    function typeNextCharacter() {
      var word = words[wordIndex];
      var text = word.getAttribute("data-pl-work-word");
      word.classList.add("pl-work-typing");
      word.textContent = text.slice(0, characterIndex + 1);
      characterIndex += 1;

      if (characterIndex >= text.length) {
        word.classList.remove("pl-work-typing");
        wordIndex += 1;
        characterIndex = 0;
        if (wordIndex >= words.length) {
          words[words.length - 1].classList.add("pl-work-typing");
          return;
        }
        pluses[wordIndex - 1].classList.add("pl-work-plus-visible");
      }

      window.setTimeout(typeNextCharacter, 55);
    }

    typeNextCharacter();
  }

  function activateHero(hero) {
    if (prefersReducedMotion.matches) {
      revealWorkOverlay(hero, false);
      return;
    }

    hero.addEventListener("animationend", function (event) {
      if (event.target === hero && (event.animationName === "pl-open" || event.animationName === "pl-mobile-open")) {
        revealWorkOverlay(hero, true);
      }
    });
    window.requestAnimationFrame(function () {
      hero.classList.add("pl-play");
    });
    window.setTimeout(function () {
      startCountUp(hero);
    }, 3100);
  }

  function findCurrentHero() {
    var root = document.getElementById("root");
    if (!root) {
      return null;
    }
    var sections = root.querySelectorAll("section");
    for (var index = 0; index < sections.length; index += 1) {
      if (sections[index].classList.contains("pl-hero") || sections[index].classList.contains("pl-legacy-hero-shell")) {
        continue;
      }
      var heading = sections[index].querySelector("h1");
      if (heading && heading.textContent.trim().replace(/\s+/g, " ") === "Impact Strategist") {
        return sections[index];
      }
    }
    return null;
  }

  function mountHero(markup) {
    var existingHero = findCurrentHero();
    if (!existingHero) {
      return false;
    }

    var template = document.createElement("template");
    template.innerHTML = markup.trim();
    var hero = template.content.firstElementChild;
    existingHero.classList.add("pl-legacy-hero-shell");
    existingHero.appendChild(hero);
    activateHero(hero);
    return true;
  }

  function initialize() {
    fetch("/partials/hero.html?v=20261026-work-overlay-3")
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
        var observer = new MutationObserver(function () {
          mountHero(markup);
        });
        observer.observe(root, { childList: true, subtree: true });
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
