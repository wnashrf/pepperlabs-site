(function () {
  "use strict";

  var pageNames = ["home", "who-we-are", "our-expertise", "our-impact", "work-with-us", "our-blog"];
  var pages = Array.prototype.slice.call(document.querySelectorAll("[data-site-page]"));

  function showPage() {
    var pageName = window.location.hash.slice(1) || "home";
    if (pageNames.indexOf(pageName) === -1) {
      pageName = "home";
    }

    pages.forEach(function (page) {
      var isActive = page.id === pageName;
      page.classList.toggle("is-active", isActive);
      page.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    document.querySelectorAll("[data-page-link]").forEach(function (link) {
      if (link.getAttribute("href") === "#" + pageName) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", showPage);
  showPage();
})();
