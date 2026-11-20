(function () {
  "use strict";

  var appPaths = [
    "/",
    "/index.html",
    "/who-we-are",
    "/our-expertise",
    "/our-impact",
    "/work-with-us",
  ];
  var path = window.location.pathname;
  var pathDesign = {
    "/": "1",
    "/index.html": "1",
    "/public_html/design-2.html": "2",
    "/public_html/design-3.html": "3",
    "/public_html/design-4.html": "4",
    "/public_html/design-5.html": "5",
    "/public_html/design-6.html": "6",
    "/public_html/design-8.html": "8",
  }[path];
  if (!pathDesign && appPaths.indexOf(path) === -1) {
    return;
  }

  var isDesignSeven =
    appPaths.indexOf(path) !== -1 &&
    new URLSearchParams(window.location.search).get("design") === "7";
  var activeDesign = isDesignSeven ? "7" : pathDesign || "1";
  var options = [
    { number: "1", name: "Current design", href: "/" },
    { number: "2", name: "New design", href: "/public_html/design-2.html" },
    { number: "3", name: "Editorial design", href: "/public_html/design-3.html" },
    { number: "4", name: "Surreal design", href: "/public_html/design-4.html" },
    { number: "5", name: "Isometric design", href: "/public_html/design-5.html" },
    { number: "6", name: "Futuristic design", href: "/public_html/design-6.html" },
    { number: "7", name: "Crimson and yellow design", href: "/?design=7" },
    { number: "8", name: "Impact engine design", href: "/public_html/design-8.html" },
  ];
  var switcher = document.createElement("div");
  switcher.className = "design-switcher";
  switcher.setAttribute("role", "group");
  switcher.setAttribute("aria-label", "Choose a design");

  var label = document.createElement("span");
  label.className = "design-switcher__label";
  label.textContent = "Design";
  switcher.appendChild(label);

  options.forEach(function (option) {
    var link = document.createElement("a");
    link.className = "design-switcher__option";
    link.href = option.href;
    link.textContent = option.number;
    link.setAttribute(
      "aria-label",
      "Design " + option.number + ": " + option.name,
    );
    if (activeDesign === option.number) {
      link.setAttribute("aria-current", "page");
    }
    switcher.appendChild(link);
  });

  document.body.appendChild(switcher);
})();
