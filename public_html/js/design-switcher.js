(function () {
  "use strict";

  var path = window.location.pathname;
  var activeDesign = {
    "/": "1",
    "/index.html": "1",
    "/who-we-are": "1",
    "/our-expertise": "1",
    "/our-impact": "1",
    "/work-with-us": "1",
    "/design-2.html": "2",
    "/design-3.html": "3",
    "/design-4.html": "4",
    "/design-5.html": "5",
    "/design-6.html": "6",
    "/design-8.html": "8",
  }[path];
  if (
    (path === "/" ||
      path === "/index.html" ||
      path === "/who-we-are" ||
      path === "/our-expertise" ||
      path === "/our-impact" ||
      path === "/work-with-us") &&
    new URLSearchParams(window.location.search).get("design") === "7"
  ) {
    activeDesign = "7";
  }
  if (!activeDesign) {
    return;
  }

  var switcher = document.createElement("div");
  switcher.className = "design-switcher";
  switcher.setAttribute("role", "group");
  switcher.setAttribute("aria-label", "Choose a design");

  var label = document.createElement("span");
  label.className = "design-switcher__label";
  label.textContent = "Design";
  switcher.appendChild(label);

  [
    {
      number: "1",
      name: "Current design",
      href: "/",
      active: activeDesign === "1",
    },
    {
      number: "2",
      name: "New design",
      href: "/design-2.html",
      active: activeDesign === "2",
    },
    {
      number: "3",
      name: "Editorial design",
      href: "/design-3.html",
      active: activeDesign === "3",
    },
    {
      number: "4",
      name: "Surreal design",
      href: "/design-4.html",
      active: activeDesign === "4",
    },
    {
      number: "5",
      name: "Isometric design",
      href: "/design-5.html",
      active: activeDesign === "5",
    },
    {
      number: "6",
      name: "Futuristic design",
      href: "/design-6.html",
      active: activeDesign === "6",
    },
    {
      number: "7",
      name: "Crimson and yellow design",
      href: "/?design=7",
      active: activeDesign === "7",
    },
    {
      number: "8",
      name: "Impact engine design",
      href: "/design-8.html",
      active: activeDesign === "8",
    },
  ].forEach(function (option) {
    var link = document.createElement("a");
    link.className = "design-switcher__option";
    link.href = option.href;
    link.textContent = option.number;
    link.setAttribute("aria-label", "Design " + option.number + ": " + option.name);
    if (option.active) {
      link.setAttribute("aria-current", "page");
    }
    switcher.appendChild(link);
  });

  document.body.appendChild(switcher);
})();
