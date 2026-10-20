(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var $ = function (selector, root) {
    return (root || document).querySelector(selector);
  };
  var $$ = function (selector, root) {
    return Array.prototype.slice.call(
      (root || document).querySelectorAll(selector)
    );
  };

  var header = $(".site-header");
  var navToggle = $(".nav-toggle");

  // -------------------------------------------------------------
  // Navigation: mobile menu and submenus
  // -------------------------------------------------------------

  var closeMenu = function () {
    if (!header) return;
    header.classList.remove("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  };

  var closeSubmenus = function (except) {
    $$(".has-submenu.open").forEach(function (item) {
      if (item === except) return;
      item.classList.remove("open");
      $(".submenu-toggle", item).setAttribute("aria-expanded", "false");
    });
  };

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  $$(".submenu-toggle").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      var item = button.closest(".has-submenu");
      var open = item.classList.toggle("open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
      closeSubmenus(item);
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-submenu")) closeSubmenus();
  });

  // -------------------------------------------------------------
  // Same-page anchors: smooth scroll and close the mobile menu
  // -------------------------------------------------------------

  $$('a[href^="#"]').forEach(function (link) {
    if (link.classList.contains("skip-link")) return;
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      closeMenu();
      closeSubmenus();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      if (history.pushState) history.pushState(null, "", id);
    });
  });

  // -------------------------------------------------------------
  // Scrollspy: highlight the nav item for the section in view
  // -------------------------------------------------------------

  var spyLinks = $$('.nav-item > a[href^="#"]');
  if (spyLinks.length && "IntersectionObserver" in window) {
    var linkFor = {};
    spyLinks.forEach(function (link) {
      linkFor[link.getAttribute("href").slice(1)] = link;
    });
    var setActive = function (id) {
      spyLinks.forEach(function (link) {
        var active = link === linkFor[id];
        link.parentNode.classList.toggle("active", active);
        if (active) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-70px 0px -60% 0px" }
    );
    Object.keys(linkFor).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  // -------------------------------------------------------------
  // Back to top button
  // -------------------------------------------------------------

  var scrollUp = $(".scroll-up");
  var onScroll = function () {
    if (scrollUp) scrollUp.classList.toggle("visible", window.scrollY > 100);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // -------------------------------------------------------------
  // Parallax hero backgrounds (desktop pointer devices only)
  // -------------------------------------------------------------

  var parallax = $$("[data-parallax]");
  var canParallax =
    parallax.length &&
    !reduceMotion &&
    window.matchMedia("(hover: hover) and (min-width: 768px)").matches;

  if (canParallax) {
    var ticking = false;
    var update = function () {
      ticking = false;
      parallax.forEach(function (el) {
        // The background is fixed to the viewport; move it up at 20% of the
        // scroll speed so it lags behind the content.
        var offset = (window.scrollY - el.offsetTop) * 0.2;
        el.style.backgroundPosition = "center calc(50% - " + offset + "px)";
      });
    };
    parallax.forEach(function (el) {
      el.style.backgroundAttachment = "fixed";
    });
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  // -------------------------------------------------------------
  // Reveal sections as they scroll into view
  // -------------------------------------------------------------

  var reveals = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    reveals.forEach(function (el) {
      revealer.observe(el);
    });
  }

  // -------------------------------------------------------------
  // Projects carousel button labels
  // -------------------------------------------------------------

  window.addEventListener("load", function () {
    var prev = $(".projects-gallery .flickity-prev-next-button.previous");
    var next = $(".projects-gallery .flickity-prev-next-button.next");
    if (prev) prev.setAttribute("aria-label", "Previous project");
    if (next) next.setAttribute("aria-label", "Next project");
  });

  // -------------------------------------------------------------
  // Share links
  // -------------------------------------------------------------

  var shareNetworks = [
    ["Bluesky", "fa-bluesky", function (url, title) {
      return "https://bsky.app/intent/compose?text=" + encodeURIComponent(title + " " + url);
    }],
    ["LinkedIn", "fa-linkedin", function (url) {
      return "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
    }],
    ["Facebook", "fa-facebook", function (url) {
      return "https://www.facebook.com/sharer.php?u=" + encodeURIComponent(url);
    }],
  ];

  var closeShareBoxes = function () {
    $$(".article-share-box.on").forEach(function (box) {
      box.classList.remove("on");
    });
    $$('.article-share-link[aria-expanded="true"]').forEach(function (link) {
      link.setAttribute("aria-expanded", "false");
    });
  };

  var buildShareBox = function (id, url, title) {
    var box = document.createElement("div");
    box.className = "article-share-box";
    box.id = id;
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Share this post");
    box.setAttribute("data-url", url);

    var links = document.createElement("div");
    links.className = "article-share-links";

    shareNetworks.forEach(function (network) {
      var a = document.createElement("a");
      a.className = "article-share-network";
      a.target = "_blank";
      a.rel = "noopener";
      a.href = network[2](url, title);
      a.title = network[0];
      a.setAttribute("aria-label", "Share on " + network[0]);
      a.innerHTML = '<i class="fa-brands ' + network[1] + '" aria-hidden="true"></i>';
      links.appendChild(a);
    });

    var copy = document.createElement("button");
    copy.type = "button";
    copy.className = "article-share-copy";
    copy.innerHTML =
      '<i class="fa-solid fa-link" aria-hidden="true"></i> <span>Copy link</span>';
    links.appendChild(copy);

    box.appendChild(links);
    document.body.appendChild(box);
    return box;
  };

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest(".article-share-link");
    var copy = e.target.closest(".article-share-copy");

    if (copy) {
      var url = copy.closest(".article-share-box").getAttribute("data-url");
      var label = $("span", copy);
      var done = function () {
        label.textContent = "Copied!";
        setTimeout(function () {
          label.textContent = "Copy link";
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () {
          window.prompt("Copy this link:", url);
        });
      } else {
        window.prompt("Copy this link:", url);
      }
      return;
    }

    if (!trigger) {
      if (!e.target.closest(".article-share-box")) closeShareBoxes();
      return;
    }

    var shareUrl = trigger.getAttribute("data-url");
    var title = trigger.getAttribute("data-title") || document.title;
    var id = "article-share-box-" + trigger.getAttribute("data-id");
    var box = document.getElementById(id);

    if (navigator.share) {
      navigator.share({ title: title, url: shareUrl }).catch(function () {});
      return;
    }

    if (box && box.classList.contains("on")) {
      closeShareBoxes();
      return;
    }
    closeShareBoxes();

    if (!box) box = buildShareBox(id, shareUrl, title);

    var rect = trigger.getBoundingClientRect();
    box.classList.add("on");
    box.style.top = rect.bottom + window.scrollY + 6 + "px";
    box.style.left =
      Math.max(
        8,
        Math.min(
          rect.left + window.scrollX,
          document.documentElement.clientWidth - box.offsetWidth - 8
        )
      ) + "px";
    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute("aria-controls", id);
    $("a, button", box).focus();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var opener = $('.article-share-link[aria-expanded="true"]');
    closeShareBoxes();
    if (opener) opener.focus();
    closeSubmenus();
    if (header && header.classList.contains("nav-open")) {
      closeMenu();
      navToggle.focus();
    }
  });
})();
