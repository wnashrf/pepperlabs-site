(function () {
  var CHEVRON = '<svg class="pl-ai-chevron" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var LINKS = {
    "AI Ready Malaysia": "https://campaign-staging.vercel.app/",
    AVPN: "https://avpn.pepperlabs.my",
    "AI Training Hub": "https://ai.pepperlabs.my/",
    "Dapur Digital": "https://dapurdigital.pepperlabs.my/",
    "K-Youth": "https://pepperlabs.my/k-youth/",
    "What We Offer": "https://pepperlabs.my/k-youth/#what-we-offer:~:text=WHAT%20WE%20OFFER",
    FAQ: "https://pepperlabs.my/k-youth/#faq:~:text=FAQ%20QUESTIONS",
    "K-Youth Programme 2026": "https://pepperlabs.my/k-youth/#k-youth-programme-2026:~:text=INTAKE%20COMMENCES%20IN%20APRIL%202026",
    "Contact Us": "https://pepperlabs.my/contact-us",
    "Why Choose Us": "https://dapurdigital.pepperlabs.my/#why-choose-us:~:text=WHAT%20SETS%20US%20APART",
    "Our Impact": "https://dapurdigital.pepperlabs.my/#our-impact:~:text=By%20supporting%20Dapur%20Digital",
    Testimonials: "https://dapurdigital.pepperlabs.my/#testimonials:~:text=What%20Our%20Clients%20Say",
    "About Dapur Digital": "https://dapurdigital.pepperlabs.my/#about-dapur-digital:~:text=Gallery%20image%201",
    "Enquire Now": "https://wa.link/tov2we",
    Microsoft: "https://microsoft.pepperlabs.my/",
    "Our Blog": "/blog",
  };

  // Same classes the React header puts on its own nav links, so the injected Blog link matches them.
  var NAV_ITEM_CLASS = "text-center flex items-center justify-center md:text-left pb-3 lg:py-0 px-3 lg:px-2 xl:px-5 w-full transition-all duration-300 hover:text-primary-500";
  var NAV_LABEL_CLASS = "flex items-center whitespace-nowrap text-[12px] xl:text-[14px]";
  var COMMERCIALISATION = [
    { heading: "K-Youth", items: ["What We Offer", "FAQ", "K-Youth Programme 2026", "Contact Us"] },
    { heading: "AI Campaign", items: ["AI Ready Malaysia", "Microsoft", "AVPN", "AI Training Hub"] },
    { heading: "Dapur Digital", items: ["Why Choose Us", "Our Impact", "Testimonials", "About Dapur Digital", "Enquire Now"] }
  ];
  function text(value) { return (value || "").replace(/\s+/g, " ").trim(); }
  function closeAll() {
    document.querySelectorAll(".pl-ai-nav-dropdown.is-open").forEach(function (wrapper) {
      wrapper.classList.remove("is-open");
      var button = wrapper.querySelector(".pl-ai-nav-trigger");
      if (button) button.setAttribute("aria-expanded", "false");
    });
  }
  function positionMenu(wrapper, menu) { menu.style.top = Math.round(wrapper.getBoundingClientRect().bottom + 10) + "px"; }
  function findNavItems(header, labels) {
    return Array.prototype.filter.call(header.querySelectorAll("a, button"), function (item) {
      if (item.tagName === "BUTTON" && item.closest("a")) return false;
      return labels.indexOf(text(item.textContent)) !== -1;
    });
  }
  function addItems(menu, groups, sourceLink) {
    groups.forEach(function (group) {
      var column = document.createElement("div");
      column.className = "pl-mega-column";
      var heading = document.createElement("h3");
      heading.textContent = group.heading;
      column.appendChild(heading);
      group.items.forEach(function (label) {
        var item = document.createElement("a");
        item.href = LINKS[label] || sourceLink.href || "#";
        item.textContent = label;
        item.setAttribute("role", "menuitem");
        column.appendChild(item);
      });
      menu.appendChild(column);
    });
  }
  function enhanceLink(link, groups, labelOverride) {
    var wrapper = document.createElement("div");
    wrapper.className = (link.className || "") + " pl-ai-nav-dropdown";
    wrapper.setAttribute("data-pl-ai-dropdown", "true");
    var button = document.createElement("button");
    button.type = "button";
    button.className = "pl-ai-nav-trigger";
    button.setAttribute("aria-haspopup", "true");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = '<span class="pl-ai-label">' + (labelOverride || text(link.textContent)) + "</span>" + CHEVRON;
    var menu = document.createElement("div");
    menu.className = "pl-ai-nav-menu pl-mega-menu" + (labelOverride ? " pl-mega-menu--combined" : "");
    menu.setAttribute("role", "menu");
    addItems(menu, groups, link);
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var open = wrapper.classList.contains("is-open");
      closeAll();
      if (!open) {
        wrapper.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        positionMenu(wrapper, menu);
      }
    });
    menu.addEventListener("click", function (event) { event.stopPropagation(); });
    link.replaceWith(wrapper);
    wrapper.appendChild(button);
    wrapper.appendChild(menu);
  }
  function combineCommercialisation(header) {
    if (header.getAttribute("data-pl-commercialisation-ready")) return;
    var labels = ["K-Youth", "Microsoft", "AI Campaign", "Dapur Digital"];
    var links = findNavItems(header, labels);
    if (links.length < 4) return;
    var first = links[0];
    enhanceLink(first, COMMERCIALISATION, "Our Programmes");
    links.slice(1).forEach(function (link) {
      var item = link.closest("li");
      if (item) item.remove();
      else link.remove();
    });
    header.setAttribute("data-pl-commercialisation-ready", "true");
  }
  // Keep Our Blog directly after Our Programmes without repeatedly reordering it.
  function placeBlogLink(header, link) {
    var ourProgrammes = findNavItems(header, ["Our Programmes"])[0];
    if (!ourProgrammes) return;
    var programmeWrapper = ourProgrammes.closest("[data-pl-ai-dropdown]") || ourProgrammes.closest("li") || ourProgrammes;
    var blogWrapper = link.closest("li") || link;
    if (programmeWrapper.nextElementSibling !== blogWrapper) {
      programmeWrapper.parentNode.insertBefore(blogWrapper, programmeWrapper.nextElementSibling);
    }
  }
  function makeBlogLinkInteractive(link) {
    link.style.setProperty("color", "inherit", "important");
    link.style.setProperty("cursor", "pointer", "important");
    link.addEventListener("mouseenter", function () {
      link.style.setProperty("color", "#ef4136", "important");
    });
    link.addEventListener("mouseleave", function () {
      link.style.setProperty("color", "inherit", "important");
    });
  }
  function addBlogLink(header) {
    var placed = header.querySelector('[data-pl-ai-label="Our Blog"]');
    if (placed) {
      placed.href = LINKS["Our Blog"];
      placed.className = NAV_ITEM_CLASS + " pl-injected-blog-link";
      placed.style.pointerEvents = "auto";
      placed.style.position = "relative";
      placed.style.zIndex = "1";
      if (!placed.hasAttribute("data-pl-blog-hover-ready")) {
        placed.setAttribute("data-pl-blog-hover-ready", "true");
        makeBlogLinkInteractive(placed);
      }
      return;
    }
    var existingBlog = Array.prototype.find.call(header.querySelectorAll("a"), function (link) {
      var label = text(link.textContent);
      return label === "Blog" || label === "Our Blog";
    });
    if (existingBlog) {
      existingBlog.href = LINKS["Our Blog"];
      existingBlog.setAttribute("data-pl-ai-label", "Our Blog");
      existingBlog.className = NAV_ITEM_CLASS + " pl-injected-blog-link";
      existingBlog.style.pointerEvents = "auto";
      existingBlog.style.position = "relative";
      existingBlog.style.zIndex = "1";
      existingBlog.setAttribute("data-pl-blog-hover-ready", "true");
      makeBlogLinkInteractive(existingBlog);
      existingBlog.textContent = "";
      var label = document.createElement("span");
      label.className = NAV_LABEL_CLASS;
      label.textContent = "Our Blog";
      existingBlog.appendChild(label);
      placeBlogLink(header, existingBlog);
      return;
    }
    var candidate = header.querySelector("ul") || header.querySelector("nav ul, nav");
    if (!candidate) return;
    var link = document.createElement("a");
    link.href = LINKS["Our Blog"];
    link.setAttribute("data-pl-ai-label", "Our Blog");
    link.className = NAV_ITEM_CLASS + " pl-injected-blog-link";
    makeBlogLinkInteractive(link);
    var label = document.createElement("span");
    label.className = NAV_LABEL_CLASS;
    label.textContent = "Our Blog";
    link.appendChild(label);
    candidate.appendChild(link);
    placeBlogLink(header, link);
  }
  function scan() {
    var header = document.querySelector("header");
    if (!header) return;
    
    // Combine programme links into their menu.
    combineCommercialisation(header);
    
    // Add and position Our Blog
    addBlogLink(header);
    
    // Reorder: Move "Our Blog" to be right after "Our Programmes"
    reorderNavbar(header);
  }
  
  function reorderNavbar(header) {
    var ourProgrammes = findNavItems(header, ["Our Programmes"])[0];
    var ourBlog = header.querySelector('[data-pl-ai-label="Our Blog"]') || Array.prototype.find.call(header.querySelectorAll("a"), function(link) {
      return text(link.textContent) === "Our Blog";
    });
    
    if (ourProgrammes && ourBlog) placeBlogLink(header, ourBlog);
  }

  document.addEventListener("click", closeAll);
  document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeAll(); });
  window.addEventListener("resize", function () {
    document.querySelectorAll(".pl-ai-nav-dropdown.is-open").forEach(function (wrapper) { positionMenu(wrapper, wrapper.querySelector(".pl-ai-nav-menu")); });
  });
  var root = document.getElementById("root");
  if (!root) return;
  
  // Run immediately
  scan();
  
  // Watch for React updates
  new MutationObserver(function() {
    setTimeout(scan, 100);
  }).observe(root, { childList: true, subtree: true });
  
  // Also run on document ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan);
  }
  
  // And after a delay to catch React rendering
  setTimeout(scan, 500);
  setTimeout(scan, 1000);
})();
