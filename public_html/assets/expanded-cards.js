(function () {
  "use strict";

  /** @typedef {{ title: string, description: string, tags: string[], kicker: string, link: string }} ExpandedCardData */

  /** @type {ExpandedCardData[]} */
  var CARDS = [
    {
      title: "Policy, Research and Innovations",
      description:
        "We partner across sectors to empower beneficiaries, leveraging grassroots strengths and strategic networks for policy design and advocacy.",
      tags: ["Grassroots strengths", "Strategic networks"],
      kicker: "POLICY · RESEARCH · INNOVATION",
      link: "/#our-brands",
    },
    {
      title: "Transformative Skills and Pedagogy Design",
      description:
        "We empower micro-entrepreneurs and job seekers with practical insights and experience, helping them succeed in business or competitive job markets.",
      tags: ["Micro-entrepreneurs", "Job seekers"],
      kicker: "SKILLS · PEDAGOGY · DESIGN",
      link: "/#our-brands",
    },
    {
      title: "Community Engagement and Impact Nexus",
      description:
        "We support micro-entrepreneurs in accessing markets and thriving by providing capacity-building initiatives and leveraging digital tools for their growth.",
      tags: ["Capacity-building", "Digital tools"],
      kicker: "COMMUNITY · ENGAGEMENT · IMPACT",
      link: "/#our-brands",
    },
  ];

  function svgElement(name, attributes) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.keys(attributes).forEach(function (key) {
      element.setAttribute(key, attributes[key]);
    });
    return element;
  }

  function makeGrain(index) {
    var svg = svgElement("svg", {
      class: "ec-card__grain",
      "aria-hidden": "true",
      focusable: "false",
      preserveAspectRatio: "none",
      viewBox: "0 0 100 100",
    });
    var filterId = "ec-grain-" + index;
    var filter = svgElement("filter", {
      id: filterId,
      x: "0",
      y: "0",
      width: "100%",
      height: "100%",
    });
    filter.appendChild(
      svgElement("feTurbulence", {
        type: "fractalNoise",
        baseFrequency: "0.84",
        numOctaves: "3",
        stitchTiles: "stitch",
      }),
    );
    var definitions = svgElement("defs", {});
    definitions.appendChild(filter);
    svg.appendChild(definitions);
    svg.appendChild(
      svgElement("rect", {
        width: "100%",
        height: "100%",
        filter: "url(#" + filterId + ")",
      }),
    );
    return svg;
  }

  function makeTag(tag) {
    var item = document.createElement("li");
    item.className = "ec-card__tag";
    item.textContent = tag;
    return item;
  }

  function makeCard(data, index) {
    var article = document.createElement("article");
    article.className = "ec-card ec-card--" + (index + 1);
    article.setAttribute("data-ec-card", String(index));

    var heading = document.createElement("h3");
    heading.className = "ec-card__heading";

    var trigger = document.createElement("button");
    trigger.className = "ec-card__trigger";
    trigger.type = "button";
    trigger.id = "ec-card-trigger-" + (index + 1);
    trigger.setAttribute("aria-controls", "ec-card-panel-" + (index + 1));
    trigger.setAttribute("aria-expanded", index === 0 ? "true" : "false");
    trigger.setAttribute("aria-label", data.title);

    var closedTitle = document.createElement("span");
    closedTitle.className = "ec-card__closed-title";
    closedTitle.textContent = data.title;
    closedTitle.setAttribute("aria-hidden", "true");
    trigger.appendChild(closedTitle);

    var plus = document.createElement("span");
    plus.className = "ec-card__plus";
    plus.textContent = "+";
    plus.setAttribute("aria-hidden", "true");
    trigger.appendChild(plus);
    heading.appendChild(trigger);
    article.appendChild(heading);

    var panel = document.createElement("div");
    panel.className = "ec-card__content";
    panel.id = "ec-card-panel-" + (index + 1);
    panel.setAttribute("aria-labelledby", trigger.id);
    panel.setAttribute("aria-hidden", index === 0 ? "false" : "true");

    var kicker = document.createElement("p");
    kicker.className = "ec-card__kicker";
    kicker.textContent = data.kicker;
    panel.appendChild(kicker);

    var title = document.createElement("p");
    title.className = "ec-card__title";
    title.textContent = data.title;
    title.setAttribute("aria-hidden", "true");
    panel.appendChild(title);

    var description = document.createElement("p");
    description.className = "ec-card__description";
    description.textContent = data.description;
    panel.appendChild(description);

    var linkRow = document.createElement("div");
    linkRow.className = "ec-card__link-row";
    var link = document.createElement("a");
    link.className = "ec-card__link";
    link.href = data.link;
    link.setAttribute("aria-label", "Learn more about " + data.title);
    link.textContent = "Learn more";
    linkRow.appendChild(link);
    panel.appendChild(linkRow);

    var tags = document.createElement("ul");
    tags.className = "ec-card__tags";
    tags.setAttribute("aria-label", data.title + " focus areas");
    data.tags.forEach(function (tag) {
      tags.appendChild(makeTag(tag));
    });
    panel.appendChild(tags);

    article.appendChild(makeGrain(index + 1));
    var scrim = document.createElement("span");
    scrim.className = "ec-card__scrim";
    scrim.setAttribute("aria-hidden", "true");
    article.appendChild(scrim);
    article.appendChild(panel);
    return article;
  }

  function ExpandedCards() {
    var section = document.createElement("section");
    section.id = "our-expertise";
    section.className = "Container pl-expanded-cards-section";
    section.setAttribute("data-theme", "light");
    section.setAttribute("aria-labelledby", "ec-section-title");

    var shell = document.createElement("div");
    shell.className = "ec-shell";

    var intro = document.createElement("header");
    intro.className = "ec-intro";

    var introCopy = document.createElement("div");
    introCopy.className = "ec-intro__copy";
    var eyebrow = document.createElement("p");
    eyebrow.className = "ec-eyebrow";
    eyebrow.textContent = "WHAT WE DO";
    var title = document.createElement("h1");
    title.className = "ec-intro__title";
    title.id = "ec-section-title";
    title.textContent = "Pepper Labs Pillars";
    introCopy.appendChild(eyebrow);
    introCopy.appendChild(title);

    var introAside = document.createElement("div");
    introAside.className = "ec-intro__aside";
    var summary = document.createElement("p");
    summary.className = "ec-intro__summary";
    summary.textContent =
      "Our work brings grassroots strengths, practical insights and digital tools together to advance policy and help communities thrive.";
    var hint = document.createElement("p");
    hint.className = "ec-intro__hint";
    hint.textContent = "Hover, tap or use the arrow keys to open a card";
    introAside.appendChild(summary);
    introAside.appendChild(hint);
    intro.appendChild(introCopy);
    intro.appendChild(introAside);
    shell.appendChild(intro);

    var cards = document.createElement("div");
    cards.className = "ec-cards";
    cards.setAttribute("role", "group");
    cards.setAttribute("aria-label", "Pepper Labs services");
    CARDS.forEach(function (card, index) {
      cards.appendChild(makeCard(card, index));
    });
    shell.appendChild(cards);

    section.appendChild(shell);
    bindCardInteractions(section);
    return section;
  }

  function bindCardInteractions(section) {
    var cards = Array.prototype.slice.call(section.querySelectorAll("[data-ec-card]"));
    var activeIndex = 0;
    var hoverTimer = null;
    var hoverCandidate = -1;

    function openCard(index) {
      activeIndex = index;
      cards.forEach(function (card, cardIndex) {
        var isOpen = cardIndex === index;
        var trigger = card.querySelector(".ec-card__trigger");
        card.classList.toggle("is-open", isOpen);
        trigger.setAttribute("aria-expanded", String(isOpen));
        trigger.setAttribute("aria-label", CARDS[cardIndex].title);
        card.querySelector(".ec-card__content").setAttribute("aria-hidden", String(!isOpen));
      });
    }

    cards.forEach(function (card, index) {
      var trigger = card.querySelector(".ec-card__trigger");
      trigger.addEventListener("focus", function () {
        openCard(index);
      });
      trigger.addEventListener("click", function () {
        openCard(index);
      });
      trigger.addEventListener("keydown", function (event) {
        var nextIndex = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (index + 1) % cards.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (index - 1 + cards.length) % cards.length;
        } else {
          return;
        }
        event.preventDefault();
        cards[nextIndex].querySelector(".ec-card__trigger").focus();
      });
      card.addEventListener("click", function () {
        openCard(index);
      });
    });

    document.addEventListener(
      "pointermove",
      function (event) {
        if (event.pointerType !== "mouse") return;
        var card = event.target.closest && event.target.closest(".pl-expanded-cards-section .ec-card");
        var index = card ? cards.indexOf(card) : -1;
        if (index === hoverCandidate) return;

        window.clearTimeout(hoverTimer);
        hoverCandidate = index;
        if (index < 0 || index === activeIndex) return;

        hoverTimer = window.setTimeout(function () {
          if (hoverCandidate === index) openCard(index);
        }, 90);
      },
      true,
    );

    openCard(0);
  }

  function mountExpandedCards() {
    var root = document.getElementById("root");
    var original = root && root.querySelector("#our-expertise:not([data-ec-original])");
    if (!original || root.querySelector(".pl-expanded-cards-section")) return;

    var expandedCards = ExpandedCards();
    original.id = "our-expertise-original";
    original.setAttribute("data-ec-original", "true");
    original.setAttribute("aria-hidden", "true");
    original.hidden = true;
    original.parentNode.insertBefore(expandedCards, original);
  }

  function start() {
    var root = document.getElementById("root");
    if (!root) return;
    mountExpandedCards();
    new MutationObserver(mountExpandedCards).observe(root, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
