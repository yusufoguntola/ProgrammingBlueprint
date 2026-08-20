(function () {
  "use strict";

  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("sidebar-overlay");
  var menuToggle = document.getElementById("menu-toggle");
  var navSearch = document.getElementById("nav-search");
  var backToTop = document.getElementById("back-to-top");
  var themeToggle = document.getElementById("theme-toggle");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

  /* -------------------------------------------------
     Theme toggle (persisted, defaults to system preference)
  ------------------------------------------------- */
  function currentTheme() {
    var explicit = document.documentElement.getAttribute("data-theme");
    if (explicit === "light" || explicit === "dark") return explicit;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }

  themeToggle.addEventListener("click", function () {
    applyTheme(currentTheme() === "dark" ? "light" : "dark");
  });

  applyTheme(currentTheme());

  /* -------------------------------------------------
     Mobile sidebar toggle
  ------------------------------------------------- */
  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("visible");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("visible");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle.addEventListener("click", function () {
    if (sidebar.classList.contains("open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay.addEventListener("click", closeSidebar);

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 860px)").matches) {
        closeSidebar();
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });

  /* -------------------------------------------------
     Table-of-contents filter
  ------------------------------------------------- */
  navSearch.addEventListener("input", function () {
    var query = navSearch.value.trim().toLowerCase();
    var groups = document.querySelectorAll(".nav-group");

    navLinks.forEach(function (link) {
      var matches = link.textContent.toLowerCase().indexOf(query) !== -1;
      var topLevelItem = link.closest("li");
      if (!link.closest(".nav-group")) {
        topLevelItem.classList.toggle("nav-hidden", query !== "" && !matches);
      } else {
        link.parentElement.classList.toggle("nav-hidden", query !== "" && !matches);
      }
    });

    groups.forEach(function (group) {
      var visibleChildren = group.querySelectorAll("li:not(.nav-hidden)");
      group.classList.toggle("nav-hidden", query !== "" && visibleChildren.length === 0);
    });
  });

  /* -------------------------------------------------
     Scrollspy — highlight active section in sidebar.
     Content is injected asynchronously by content-loader.js, so the
     target .section elements may not exist yet at parse time. Re-run
     this once the "content:ready" event fires.
  ------------------------------------------------- */
  var activeId = null;
  var scrollspyObserver = null;

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
  }

  function initScrollspy() {
    if (!("IntersectionObserver" in window)) return;

    var sections = navLinks
      .map(function (link) {
        var href = link.getAttribute("href") || "";
        if (href.charAt(0) !== "#") return null;
        return document.getElementById(href.slice(1));
      })
      .filter(Boolean);

    if (scrollspyObserver) scrollspyObserver.disconnect();

    scrollspyObserver = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (entry) { return entry.isIntersecting; })
          .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(function (section) { scrollspyObserver.observe(section); });
  }

  initScrollspy();
  document.addEventListener("content:ready", initScrollspy);

  /* -------------------------------------------------
     Back to top + scroll progress
  ------------------------------------------------- */
  var progressBar = document.getElementById("progress-bar");

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function onScroll() {
    var doc = document.documentElement;
    var scrolled = doc.scrollTop;
    var max = doc.scrollHeight - doc.clientHeight;
    var pct = max > 0 ? (scrolled / max) * 100 : 0;

    progressBar.style.width = pct + "%";
    backToTop.classList.toggle("visible", scrolled > 480);
  }

  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  document.addEventListener("content:ready", onScroll);
})();
