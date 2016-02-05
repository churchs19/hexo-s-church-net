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

jQuery(function ($) {

    'use strict';

    // ---------------------------------------------- 
    // Preloader
    // ----------------------------------------------

    $(window).ready(function () {
        $('#pre-status').fadeOut();
        $('#tt-preloader').delay(350).fadeOut('slow');
    });




    // -------------------------------------------------------------
    // Animated scrolling / Scroll Up
    // -------------------------------------------------------------

    (function () {
        $('a[href*=#]').bind("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);
            e.preventDefault();
        });
    }());



    // -------------------------------------------------------------
    // Full Screen Slider
    // -------------------------------------------------------------
    (function () {
        $(".tt-fullHeight").height($(window).height());

        $(window).resize(function () {
            $(".tt-fullHeight").height($(window).height());
        });

    }());


    // -------------------------------------------------------------
    // Sticky Menu
    // -------------------------------------------------------------

    (function () {
        $('.header').sticky({
            topSpacing: 0
        });

        $('body').scrollspy({
            target: '.navbar-custom',
            offset: 70
        });
    }());




    // -------------------------------------------------------------
    // Back To Top
    // -------------------------------------------------------------

    (function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });
    }());


    // -------------------------------------------------------------
    // Progress Bar
    // -------------------------------------------------------------

    $('.skill-progress').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $.each($('div.progress-bar'), function () {
                $(this).css('width', $(this).attr('aria-valuenow') + '%');
            });
            $(this).unbind('inview');
        }
    });

    // -------------------------------------------------------------
    // More skill
    // -------------------------------------------------------------
    $('.more-skill').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $('.chart').easyPieChart({
                //your configuration goes here
                easing: 'easeOut',
                delay: 3000,
                barColor: '#68c3a3',
                trackColor: 'rgba(255,255,255,0.2)',
                scaleColor: false,
                lineWidth: 8,
                size: 140,
                animate: 2000,
                onStep: function (from, to, percent) {
                    this.el.children[0].innerHTML = Math.round(percent);
                }

            });
            $(this).unbind('inview');
        }
    });

    // -------------------------------------------------------------
    // STELLAR FOR BACKGROUND SCROLLING
    // -------------------------------------------------------------

    $(window).load(function () {
        if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
            $.stellar({
                horizontalScrolling: false,
                responsive: true
            });
        }
    });


    // -------------------------------------------------------------
    // WOW JS
    // -------------------------------------------------------------

    (function () {

        new WOW({

            mobile: false

        }).init();

    }());


    // -------------------------------------------------------------
    //  Instagram Feed
    // -------------------------------------------------------------
    // https://api.instagram.com/v1/users/1511680150/media/recent?client_id=b6f5ef5726a74224b8dbc213f1f64432
    $(document).ready(function () {
        if ($('.photos-section').length > 0) {
            var $grid = $('.photos-section ul.grid');
            var imageTemplate = _.template('<li><figure><img src="<%- images.low_resolution.url %>" alt="<%- caption.text %>"><figcaption><div class="caption-content"><a href="<%- images.standard_resolution.url %>" class="single_image" title="<%- caption.text %>" data-link="<%- link %>" data-fancybox-group="gallery"><i class="fa fa-picture-o"></i><p><%- caption.text %></p></a></div></figcaption></figure></li>');
            var videoTemplate = _.template('<li><figure><img src="<%- images.low_resolution.url %>" alt="<%- caption.text %>"><figcaption><div class="caption-content"><a href="<%- videos.standard_resolution.url %>" class="single_image fancybox.html" title="<%- caption.text %>" data-link="<%- link %>" data-poster="<%- images.standard_resolution.url %>" data-width="<%- videos.standard_resolution.width %>" data-height="<%- videos.standard_resolution.height %>" data-fancybox-group="gallery"><i class="fa fa-video-camera"></i><p><%- caption.text %></p></a></div></figcaption></figure></li>');
            $.ajax({
                url: 'https://api.instagram.com/v1/users/1511680150/media/recent?client_id=b6f5ef5726a74224b8dbc213f1f64432',
                crossDomain: true,
                dataType: 'jsonp',
                cache: false,
                success: function (response) {
                    for (var i = 0; i < Math.min(10, response.data.length); i++) {
                        if (response.data[i].type === 'video') {
                            $grid.append(videoTemplate(response.data[i]));
                        } else {
                            $grid.append(imageTemplate(response.data[i]));
                        }
                    }
                    $grid.find('a.single_image')
                        .attr('rel', 'gallery')
                        .fancybox({
                            padding: 4,
                            beforeShow: function () {
                                this.title = '<a href="' + $(this.element).attr('data-link') + '" target="_blank">' + $(this.element).attr('title') + '</a>';
                            },
                            beforeLoad: function () {
                                if($(this.element).hasClass('fancybox.html')) {
                                    // build the HTML5 video structure for fancyBox content with specific parameters
                                    // set fancyBox content and pass parameters
                                    this.content = '<video src="' + this.href + '"  poster="' + $(this.element).attr('data-poster') + '" width="' + $(this.element).attr('data-width') + '" height="' + $(this.element).attr('data-height') + '"  controls="controls" preload="none" ></video>';
                                    // set fancyBox dimensions
                                    this.width = $(this.element).attr('data-width');
                                    this.height = $(this.element).attr('data-height');
                                }
                            }
                        
                        });
                }
            });
        }
    });
});
