(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function revealSection(section) {
    var items = Array.prototype.slice.call(section.querySelectorAll(".ww-reveal"));
    section.classList.add("ww-ready");

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("ww-visible");
      });
      return;
    }

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("ww-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (item) {
      revealObserver.observe(item);
    });

    var count = section.querySelector("[data-ww-count]");
    if (!count) {
      return;
    }

    var target = Number(count.getAttribute("data-ww-count"));
    if (!Number.isFinite(target)) {
      return;
    }

    var countObserver = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) {
        return;
      }
      countObserver.disconnect();
      var startedAt = Date.now();
      var duration = 1200;

      function updateCount() {
        var progress = Math.min((Date.now() - startedAt) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        count.textContent = String(Math.round(target * eased));
        if (progress < 1) {
          window.requestAnimationFrame(updateCount);
        }
      }

      count.textContent = "0";
      window.requestAnimationFrame(updateCount);
    }, { threshold: 0.4 });

    countObserver.observe(count);
  }

  function findOldSection(root) {
    var section = root.querySelector("#who-we-are");
    return section && !section.classList.contains("ww-section") ? section : null;
  }

  function mountSection(markup, root, observer) {
    var oldSection = findOldSection(root);
    if (!oldSection) {
      return false;
    }

    var template = document.createElement("template");
    template.innerHTML = markup.trim();
    var section = template.content.firstElementChild;
    if (!section || !section.classList.contains("ww-section")) {
      throw new Error("The Who We Are partial did not return its expected section");
    }

    oldSection.replaceWith(section);
    if (observer) {
      observer.disconnect();
    }
    revealSection(section);
    return true;
  }

  function initialize() {
    if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
      return;
    }

    fetch("partials/who-we-are.php")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Who We Are partial request failed with status " + response.status);
        }
        return response.text();
      })
      .then(function (markup) {
        if (markup.indexOf("<?php") !== -1) {
          return fetch("partials/who-we-are-preview.html")
            .then(function (response) {
              if (!response.ok) {
                throw new Error("Who We Are preview request failed with status " + response.status);
              }
              return response.text();
            });
        }
        return markup;
      })
      .then(function (markup) {

        var root = document.getElementById("root");
        if (!root) {
          throw new Error("Homepage application root was not found");
        }

        var observer = new MutationObserver(function () {
          mountSection(markup, root, observer);
        });
        observer.observe(root, { childList: true, subtree: true });
        mountSection(markup, root, observer);
      })
      .catch(function (error) {
        console.error("Unable to initialize the Who We Are section.", error);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
