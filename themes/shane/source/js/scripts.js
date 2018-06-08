/*global jQuery, WOW, _ */
/*
    = Preloader
    = Animated scrolling / Scroll Up
    = Full Screen Slider
    = Sticky Menu
    = Back To Top
    = Countup
    = Progress Bar
    = More skill
    = Shuffle
    = Magnific Popup
*/

jQuery(function($) {
  "use strict";

  // ----------------------------------------------
  // Preloader
  // ----------------------------------------------

  $(window).ready(function() {
    $("#pre-status").fadeOut();
    $("#tt-preloader")
      .delay(350)
      .fadeOut("slow");
  });

  // -------------------------------------------------------------
  // Animated scrolling / Scroll Up
  // -------------------------------------------------------------

  (function() {
    $("a[href*=#]").bind("click", function(e) {
      var anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(anchor.attr("href")).offset().top
          },
          1000
        );
      e.preventDefault();
    });
  })();

  // -------------------------------------------------------------
  // Full Screen Slider
  // -------------------------------------------------------------
  (function() {
    var resizeContainer = function() {
      $(".tt-fullHeight").each(function() {
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

  (function() {
    $(".header").sticky({
      topSpacing: 0
    });

    $("body").scrollspy({
      target: ".navbar-custom",
      offset: 70
    });
  })();

  // -------------------------------------------------------------
  // Back To Top
  // -------------------------------------------------------------

  (function() {
    $(window).scroll(function() {
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
  $(document).ready(function() {
    $("body")
      .on("click", function() {
        $(".article-share-box.on").removeClass("on");
      })
      .on("click", ".article-share-link", function(e) {
        e.stopPropagation();

        var $this = $(this),
          url = $this.attr("data-url"),
          encodedUrl = encodeURIComponent(url),
          id = "article-share-box-" + $this.attr("data-id"),
          offset = $this.offset(),
          box;

        if ($("#" + id).length) {
          box = $("#" + id);

          if (box.hasClass("on")) {
            box.removeClass("on");
            return;
          }
        } else {
          var html = [
            '<div id="' + id + '" class="article-share-box">',
            '<input class="article-share-input" value="' + url + '">',
            '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' +
              encodedUrl +
              '" class="article-share-twitter" data-social-network="Twitter" data-social-action="tweet" data-social-target="' +
              encodedUrl +
              '" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' +
              encodedUrl +
              '" class="article-share-facebook" data-social-network="Facebook" data-social-action="share" data-social-target="' +
              encodedUrl +
              '" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' +
              encodedUrl +
              '" class="article-share-pinterest" data-social-network="Pinterest" data-social-action="pin" data-social-target="' +
              encodedUrl +
              '" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' +
              encodedUrl +
              '" class="article-share-google" data-social-network="Google+" data-social-action="share" data-social-target="' +
              encodedUrl +
              '" target="_blank" title="Google+"></a>',
            "</div>",
            "</div>"
          ].join("");

          box = $(html);

          $("body").append(box);
        }

        $(".article-share-box.on").hide();

        box
          .css({
            top: offset.top + 25,
            left: offset.left + box.width() / 2 - $this.width() / 2
          })
          .addClass("on");
      })
      .on("click", ".article-share-box", function(e) {
        e.stopPropagation();
      })
      .on("click", ".article-share-box-input", function() {
        $(this).select();
      })
      .on("click", ".article-share-box-link", function(e) {
        e.preventDefault();
        e.stopPropagation();

        window.open(
          this.href,
          "article-share-box-window-" + Date.now(),
          "width=500,height=450"
        );
      });
  });

  // -------------------------------------------------------------
  // STELLAR FOR BACKGROUND SCROLLING
  // -------------------------------------------------------------

  $(window).load(function() {
    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      $.stellar({
        horizontalScrolling: false,
        responsive: true
      });
    }
  });

  // -------------------------------------------------------------
  // WOW JS
  // -------------------------------------------------------------

  (function() {
    new WOW({
      mobile: false
    }).init();
  })();

  // -------------------------------------------------------------
  //  Instagram Feed
  // -------------------------------------------------------------
  // https://api.instagram.com/v1/users/1511680150/media/recent?client_id=b6f5ef5726a74224b8dbc213f1f64432
  $(document).ready(function() {
    if ($(".photos-section").length > 0) {
      // var $grid = $('.photos-section ul.grid'),
      //     imageTemplate = _.template('<li><figure><img src="<%- images.low_resolution.url %>" alt=""><figcaption><div class="caption-content"><a href="<%- images.standard_resolution.url %>" class="single_image" data-title="<%- caption.text %> - <%- created_time_formatted %>" data-link="<%- link %>" data-fancybox-group="gallery"><i class="fa fa-picture-o"></i><p><%- caption.text %></p><p><%- created_time_formatted %></p></a></div></figcaption></figure></li>'),
      //     videoTemplate = _.template('<li><figure><img src="<%- images.low_resolution.url %>" alt=""><figcaption><div class="caption-content"><a href="<%- videos.standard_resolution.url %>" class="single_image fancybox.html" data-title="<%- caption.text %> - <%- created_time_formatted %>" data-link="<%- link %>" data-poster="<%- images.standard_resolution.url %>" data-width="<%- videos.standard_resolution.width %>" data-height="<%- videos.standard_resolution.height %>" data-fancybox-group="gallery"><i class="fa fa-video-camera"></i><p><%- caption.text %></p><p><%- created_time_formatted %></p></a></div></figcaption></figure></li>');
      var $grid = $(".photos-section .grid"),
        imageTemplate = _.template(
          '<figure class="photo-item"><img src="<%- images.standard_resolution.url %>" alt=""><figcaption><div class="caption-content"><a href="<%- images.standard_resolution.url %>" class="single_image" data-src="#instagram-<%- index %>" data-title="<%- caption.text %> - <%- created_time_formatted %>" data-link="<%- link %>" data-fancybox-group="gallery"><i class="fa fa-picture-o"></i><p><%- caption.text %></p><p><%- created_time_formatted %></p></a></div></figcaption><div  class="instagram-embed" id="instagram-<%- index %>"><%= embedHtml %></div></figure>'
        ),
        videoTemplate = _.template(
          '<figure class="photo-item"><img src="<%- images.standard_resolution.url %>" alt=""><figcaption><div class="caption-content"><a href="<%- videos.standard_resolution.url %>" class="single_image" data-src="#instagram-<%- index %>" data-title="<%- caption.text %> - <%- created_time_formatted %>" data-link="<%- link %>" data-poster="<%- images.standard_resolution.url %>" data-width="<%- videos.standard_resolution.width %>" data-height="<%- videos.standard_resolution.height %>" data-fancybox-group="gallery"><i class="fa fa-video-camera"></i><p><%- caption.text %></p><p><%- created_time_formatted %></p></a></div></figcaption><div class="instagram-embed" id="instagram-<%- index %>"><%= embedHtml %></div></figure>'
        );
      $.ajax({
        url:
          "https://api.instagram.com/v1/users/1511680150/media/recent?access_token=1511680150.b6f5ef5.3e2b199940114508b2c577bc906d4697",
        crossDomain: true,
        dataType: "jsonp",
        cache: false,
        success: function(response) {
          var firstItem = response.data.splice(0, 1)[0];
          firstItem["created_time_formatted"] = moment
            .unix(firstItem.created_time)
            .format("lll");
          firstItem.index = 0;
          $.ajax({
            url:
              "https://api.instagram.com/oembed?url=" + firstItem.link,
            crossDomain: true,
            dataType: "jsonp",
            success: function(embedResponse) {
                firstItem.embedHtml = embedResponse.html;

              if (firstItem.type === "video") {
                $grid.append(videoTemplate(firstItem));
              } else {
                $grid.append(imageTemplate(firstItem));
              }
              var photoItem = document.getElementsByClassName("photo-item")[0];
              var flexBasis = window
                .getComputedStyle(photoItem)
                .getPropertyValue("flex-basis");
              var divisor = 2;
              if (flexBasis.indexOf("33%") >= 0) {
                divisor = 3;
              } else if (flexBasis.indexOf("25%") >= 0) {
                divisor = 4;
              } else if (flexBasis.indexOf("20%") >= 0) {
                divisor = 5;
              }
              for (var i = 0; i < Math.min(11, response.data.length); i++) {
                var row = Math.floor(i / divisor);

                if (row < 2) {
                    var $i = i;
                    $.ajax({
                    url:
                      "https://api.instagram.com/oembed?url=" +
                      response.data[$i].link,
                    crossDomain: true,
                    dataType: "jsonp",
                    success: function(embedItemResponse) {
                      response.data[$i].embedHtml = embedItemResponse.html;
                      response.data[$i].index = $i;

                      response.data[$i]["created_time_formatted"] = moment
                        .unix(response.data[$i].created_time)
                        .format("lll");

                      if (response.data[$i].type === "video") {
                        $grid.append(videoTemplate(response.data[$i]));
                      } else {
                        $grid.append(imageTemplate(response.data[$i]));
                      }
                    }
                  });
                }
              }
            }
          }).then(function () {
            $grid
            .find("a.single_image")
            .attr("rel", "gallery")
            .fancybox({

            });
          });
        }
      });
    }
  });

  // -------------------------------------------------------------
  // Scalable Images
  // -------------------------------------------------------------
  $(document).ready(function() {
    $("img.scale").imageScale();
    $(window).resize(function() {
      $("img.scale").imageScale();
    });
  });

  $(document).ready(function() {
    $("img.lazy").lazyload({ effect: "fadeIn", threshold: 200 });
  });
});
