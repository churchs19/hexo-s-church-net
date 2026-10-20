/*global jQuery, WOW */

jQuery(function ($) {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // -------------------------------------------------------------
  // Animated scrolling / Scroll Up
  // -------------------------------------------------------------

  (function () {
    $('a[href^="#"]').not(".skip-link").bind("click", function (e) {
      var target = $(this).attr("href");
      if (target.length < 2 || !$(target).length) {
        return;
      }
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(target).offset().top,
          },
          reduceMotion ? 0 : 1000
        );
      e.preventDefault();
    });
  })();

  // -------------------------------------------------------------
  // Full Screen Slider
  // -------------------------------------------------------------
  (function () {
    var resizeContainer = function () {
      $(".tt-fullHeight").each(function () {
        if ($(this).hasClass("tt-fullHeight-feature")) {
          $(this).height($(window).height() - $("header.header").height());
        } else {
          $(this).height($(window).height());
        }
      });
    };

    resizeContainer();

    $(window).resize(resizeContainer);
  })();

  // -------------------------------------------------------------
  // Sticky Menu
  // -------------------------------------------------------------

  (function () {
    $(".header").sticky({
      topSpacing: 0,
    });

    $("body").scrollspy({
      target: ".navbar-custom",
      offset: 70,
    });
  })();

  // -------------------------------------------------------------
  // Back To Top
  // -------------------------------------------------------------

  (function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $(".scroll-up").fadeIn();
      } else {
        $(".scroll-up").fadeOut();
      }
    });
  })();

  // -------------------------------------------------------------
  // SHARE LINKS
  // -------------------------------------------------------------
  $(document).ready(function () {
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
      $(".article-share-box.on").removeClass("on");
      $(".article-share-link[aria-expanded=true]").attr("aria-expanded", "false");
    };

    var buildShareBox = function (id, url, title) {
      var box = $('<div class="article-share-box" role="dialog" aria-label="Share this post"></div>')
        .attr("id", id)
        .attr("data-url", url);
      var links = $('<div class="article-share-links"></div>');

      shareNetworks.forEach(function (network) {
        links.append(
          $('<a class="article-share-network" target="_blank" rel="noopener"></a>')
            .attr({
              href: network[2](url, title),
              title: network[0],
              "aria-label": "Share on " + network[0],
            })
            .append('<i class="fa-brands ' + network[1] + '" aria-hidden="true"></i>')
        );
      });
      links.append(
        '<button type="button" class="article-share-copy">' +
          '<i class="fa-solid fa-link" aria-hidden="true"></i> <span>Copy link</span>' +
          "</button>"
      );

      return box.append(links).appendTo("body");
    };

    $("body")
      .on("click", closeShareBoxes)
      .on("keydown", function (e) {
        if (e.key === "Escape") {
          var opener = $(".article-share-link[aria-expanded=true]");
          closeShareBoxes();
          opener.focus();
        }
      })
      .on("click", ".article-share-link", function (e) {
        e.stopPropagation();

        var $this = $(this),
          url = $this.attr("data-url"),
          title = $this.attr("data-title") || document.title,
          id = "article-share-box-" + $this.attr("data-id"),
          box = $("#" + id);

        if (navigator.share) {
          navigator.share({ title: title, url: url }).catch(function () {});
          return;
        }

        if (box.hasClass("on")) {
          closeShareBoxes();
          return;
        }
        closeShareBoxes();

        if (!box.length) {
          box = buildShareBox(id, url, title);
        }

        var offset = $this.offset();
        box.addClass("on").css({
          top: offset.top + $this.outerHeight() + 6,
          left: Math.max(
            8,
            Math.min(offset.left, $(window).width() - box.outerWidth() - 8)
          ),
        });
        $this.attr({ "aria-expanded": "true", "aria-controls": id });
        box.find("a, button").first().focus();
      })
      .on("click", ".article-share-box", function (e) {
        e.stopPropagation();
      })
      .on("click", ".article-share-copy", function () {
        var $button = $(this),
          url = $button.closest(".article-share-box").attr("data-url"),
          done = function () {
            $button.find("span").text("Copied!");
            setTimeout(function () {
              $button.find("span").text("Copy link");
            }, 2000);
          };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, function () {
            window.prompt("Copy this link:", url);
          });
        } else {
          window.prompt("Copy this link:", url);
        }
      });
  });

  // -------------------------------------------------------------
  // STELLAR FOR BACKGROUND SCROLLING
  // -------------------------------------------------------------

  $(window).load(function () {
    if (
      !reduceMotion &&
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      $.stellar({
        horizontalScrolling: false,
        responsive: true,
      });
    }
  });

  // -------------------------------------------------------------
  // WOW JS
  // -------------------------------------------------------------

  (function () {
    if (reduceMotion) {
      return;
    }
    new WOW({
      mobile: false,
    }).init();
  })();

  // -------------------------------------------------------------
  // Projects carousel button labels
  // -------------------------------------------------------------
  $(window).load(function () {
    $(".flickity-prev-next-button.previous").attr("aria-label", "Previous project");
    $(".flickity-prev-next-button.next").attr("aria-label", "Next project");
  });

  // -------------------------------------------------------------
  //  Instagram Feed
  // -------------------------------------------------------------
  // https://api.instagram.com/v1/users/1511680150/media/recent?client_id=b6f5ef5726a74224b8dbc213f1f64432
  // $(document).ready(function () {
  //   $().fancybox({
  //     selector: '[data-fancybox="gallery"]',
  //     onActivate: function () {
  //       instgrm.Embeds.process();
  //     },
  //   });
  // });

  $(document).ready(function () {
    $("img.lazy").lazyload({ effect: "fadeIn", threshold: 200 });
  });
});
