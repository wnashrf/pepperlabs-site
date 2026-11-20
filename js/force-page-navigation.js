(function () {
  "use strict";

  document.addEventListener(
    "click",
    function (event) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      var target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      var link = target.closest("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) {
        return;
      }

      var destination = new URL(link.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        link.classList.contains("design-switcher__option")
      ) {
        return;
      }

      if (
        document.documentElement.getAttribute("data-design") === "7" &&
        [
          "/",
          "/index.html",
          "/who-we-are",
          "/our-expertise",
          "/our-impact",
          "/work-with-us",
        ].indexOf(destination.pathname) !== -1
      ) {
        destination.searchParams.set("design", "7");
      }

      if (
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search
      ) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(destination.href);
    },
    true,
  );
})();
