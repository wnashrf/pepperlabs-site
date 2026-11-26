(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  var PRODUCTS = {
    "ai-pintar-dasar": {
      title: "AI Pintar Dasar",
      copy:
        "Search approved policy sources, connect evidence across documents, and turn research into clear policy briefs for government teams. Hai Fahim is a policy research assistant that helps you discover evidence and write policy briefs faster.",
      tags: ["Policy research", "Evidence discovery", "Policy briefs", "Hai Fahim"],
    },
    "product-2": {
      title: "AI Pintar Dokumen",
      copy:
        "Find information across document collections, summarize long files, and extract key details to make administrative work easier.",
      tags: ["Document search", "Summaries", "Information extraction"],
    },
    "product-3": {
      title: "AI Pintar Aduan",
      copy:
        "Organize incoming public complaints, identify recurring issues, and help teams route each case to the right department.",
      tags: ["Complaint classification", "Issue trends", "Case routing"],
    },
    "product-4": {
      title: "AI Pintar Geran",
      copy:
        "Help grant teams review applications, check submissions against programme requirements, and track key application information.",
      tags: ["Application review", "Requirement checks", "Grant tracking"],
    },
    "product-5": {
      title: "AI Pintar Media",
      copy:
        "Monitor media coverage, surface relevant stories, and summarize public conversations around topics that matter to your organization.",
      tags: ["Media monitoring", "Topic discovery", "Coverage summaries"],
    },
    "product-6": {
      title: "AI Pintar Mesyuarat",
      copy:
        "Turn meeting recordings and notes into searchable transcripts, concise summaries, and clear follow-up actions.",
      tags: ["Transcription", "Meeting summaries", "Action items"],
    },
    "product-7": {
      title: "AI Pintar Parlimen",
      copy:
        "Search parliamentary records, follow questions and debates, and bring relevant proceedings together for faster research.",
      tags: ["Parliamentary search", "Debate tracking", "Research support"],
    },
    "product-8": {
      title: "AI Pintar Perkhidmatan",
      copy:
        "Help people find the right government services, understand application steps, and get answers to common service questions.",
      tags: ["Service guidance", "Process information", "Common questions"],
    },
  };

  function revealSection(section) {
    var items = Array.prototype.slice.call(section.querySelectorAll(".apd-reveal"));
    section.classList.add("apd-ready");

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("apd-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("apd-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" },
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function showProductDialog(section, productId) {
    var product = PRODUCTS[productId];
    var dialog = section.querySelector("[data-apd-dialog]");
    if (!product) {
      return;
    }
    if (!dialog || typeof dialog.showModal !== "function") {
      throw new Error("The product details dialog is unavailable in this browser");
    }

    dialog.querySelector(".apd-dialog-title").textContent = product.title;
    dialog.querySelector(".apd-dialog-copy").textContent = product.copy;

    var tags = dialog.querySelector("[data-apd-dialog-tags]");
    tags.replaceChildren();
    product.tags.forEach(function (tag) {
      var item = document.createElement("li");
      item.textContent = tag;
      tags.appendChild(item);
    });
    dialog.showModal();
  }

  function bindLand(section) {
    var land = section.querySelector("[data-apd-land]");
    if (!land) {
      return;
    }

    var dialog = section.querySelector("[data-apd-dialog]");
    var closeButton = section.querySelector("[data-apd-dialog-close]");

    Array.prototype.forEach.call(land.querySelectorAll("[data-apd-tile]"), function (tile) {
      var hit = tile.querySelector(".apd-tile-hit");
      var productId = tile.getAttribute("data-apd-tile");
      if (!hit) {
        return;
      }

      hit.addEventListener("click", function () {
        showProductDialog(section, productId);
      });
    });

    if (dialog && closeButton) {
      closeButton.addEventListener("click", function () {
        dialog.close();
      });

      dialog.addEventListener("click", function (event) {
        var bounds = dialog.getBoundingClientRect();
        if (
          event.target === dialog &&
          (event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom)
        ) {
          dialog.close();
        }
      });

      dialog.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          dialog.close();
        }
      });
    }
  }

  function findTestimonials(root) {
    return root.querySelector("#past-projects");
  }

  function mountSection(markup, root, observer) {
    if (root.querySelector("#ai-pintar-dasar.apd-section")) {
      if (observer) {
        observer.disconnect();
      }
      return true;
    }

    var testimonials = findTestimonials(root);
    if (!testimonials || !testimonials.parentNode) {
      return false;
    }

    var template = document.createElement("template");
    template.innerHTML = markup.trim();
    var section = template.content.firstElementChild;
    if (!section || !section.classList.contains("apd-section")) {
      throw new Error("The AI Pintar Dasar partial did not return its expected section");
    }

    testimonials.parentNode.insertBefore(section, testimonials);
    if (observer) {
      observer.disconnect();
    }
    revealSection(section);
    bindLand(section);
    return true;
  }

  function initialize() {
    if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
      return;
    }

    fetch("/partials/ai-pintar-dasar.html?v=20261029-product-details-modal-2")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("AI Pintar Dasar partial request failed with status " + response.status);
        }
        return response.text();
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
        console.error("Unable to initialize the AI Pintar Dasar section.", error);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
