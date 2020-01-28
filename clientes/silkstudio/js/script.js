/*
--------------------------------------------------------

[ INSTA , Javscript ]

  Template Name : INSTA - Responsive Onepage Resume Template
  
  Version       :  1.0 
  
  Author        :  Pixel_Factory
  
  Author URI    :  http://themeforest.net/user/Pixel_Factory
  
  Author Email  : h.nafees.anwar@gmail.com

--------------------------------------------------------
*/

/*  ------------------
    Remove Preloader
    ------------------  */



$(window).load(function() {
    $('#preloader').delay(350).fadeOut('slow', function() {
        $('.profile-page, .resume-page, .portfolio-page, .contact-page').hide();
    });
});

$(document).ready(function() {

    'use strict';


    /*  ---------------------
         Homepage Responsive
        ---------------------  */

    function homepageResponsive() {

        // Homepage Main Portions Responsive

        var windowsWidth = $(window).width(),
            windowsHeight = $(window).height();

        if (windowsWidth > windowsHeight) {

            $('.introduction , .menu').css({
                width: '50%',
                height: '100%'
            });

        } else {

            $('.introduction , .menu').css({
                width: '100%',
                height: '50%'
            });

        }

        // Homepage Profile Image Responsive

        var introWidth = $('.introduction').width(),
            introHeight = $('.introduction').height(),
            bgImage = $('.introduction').find('img');

        if (introWidth > introHeight) {

            bgImage.css({
                width: '100%',
                height: 'auto'
            });

        } else {

            bgImage.css({
                width: 'auto',
                height: '100%'
            });

        }

    }

    $(window).on('load resize', homepageResponsive);

    /*  --------------
         Menu Settings
        --------------  */

    // Hide Menu

    $('.menu > div').on('click', function() {

        var introWidth = $('.introduction').width(),
            menuWidth = $('.menu').width();

        $('.introduction').animate({
            left: '-' + introWidth
        }, 1000, 'easeOutQuart');
        $('.menu').animate({
            left: menuWidth
        }, 1000, 'easeOutQuart', function() {
            $('.home-page').css({
                visibility: 'hidden'
            });
        });

    });

    // Show Reletive Page Onclick

    $('.menu div.profile-btn').on('click', function() {
        $('.profile-page').fadeIn(1200);
    });

    $('.menu div.resume-btn').on('click', function() {
        $('.resume-page').fadeIn(1200);
    });

    $('.menu div.portfolio-btn').on('click', function() {
        $('.portfolio-page').fadeIn(1200);
    });

    $('.menu div.contact-btn').on('click', function() {
        $('.contact-page').fadeIn(1200);
    });


    // Close Button, Hide Menu

    $('.close-btn').on('click', function() {
        $('.home-page').css({
            visibility: 'visible'
        });
        $('.introduction, .menu').animate({
            left: 0
        }, 1000, 'easeOutQuart');
        $('.profile-page, .resume-page, .portfolio-page, .contact-page').fadeOut(800);
    });

    /*  --------------------------------
         Maximize Services Items Height
        --------------------------------  */

    function maximizeHeight() {

        var minHeight = 0;

        $('.services').each(function() {

            var maxHeight = $(this).height();

            if (maxHeight > minHeight) {
                minHeight = maxHeight;
            }

        });

        $('.services').height(minHeight);
    }

    maximizeHeight();

    $(window).on('resize', maximizeHeight);

    /*  ----------------------------------------
         Tooltip Starter for Social Media Icons
        ----------------------------------------  */

    $('.intro-content .social-media [data-toggle="tooltip"]').tooltip({
        placement: 'bottom'
    });

    $('.contact-details .social-media [data-toggle="tooltip"]').tooltip();

    /*  ------------
         Pie Charts
        ------------  */

    $('#portfolio-1').on('shown.bs.modal', function(e) {
        slider.reloadSlider();
    });

    $(function() {

        var fillColor = $('.footer').css('background-color'); // Get background color of footer to set relevent fill color in pie charts

        // Initiate EasyPieChart

        $('.skill').easyPieChart({
            barColor: fillColor,
            trackColor: '#c6c6c6',
            scaleColor: '#c6c6c6',
            scaleLength: 8,
            lineWidth: 8,
            size: 150,
            lineCap: 'butt'
        });

    });

    /*  -------------------------------
         MixItUp ( for portfolio page )
        -------------------------------  */

    $(function() {

        // Initiate MixItUp
        var containerEl1 = document.querySelector('[data-ref="container-1"]');
        var containerEl2 = document.querySelector('[data-ref="container-2"]');
        var containerEl3 = document.querySelector('[data-ref="container-3"]');

        var config = {
            controls: {
                scope: 'local'
            }

        };

        var mixer1 = mixitup(containerEl1, config);
        var mixer1 = mixitup(containerEl2, config);
        var mixer1 = mixitup(containerEl3, config);


    });



    /*  -------------------------------
         PopUp ( for portfolio page )
        -------------------------------  */

    $(function() {
        $('.show-popup').popup({
            keepInlineChanges: true,
            speed: 500
        });
    });

    /*  -----------------------------------------------------
         MixItUp ( for portfolio page : testimonials slider )
        -----------------------------------------------------  */

    $(function() {
        $(".owl-carousel").owlCarousel({
            navigation: false, // Show next and prev buttons
            slideSpeed: 200,
            paginationSpeed: 300,
            singleItem: true
        });

    });

    /*  -------------
         Contact Form
        ------------- */


    $('#contactForm').submit(function() {

        console.log("teste form 1")

        $.notify({
            // options
            message: 'Mensagem enviada com sucesso.'
        }, {
            // settings
            type: 'danger'
        });

        $.ajax({
            type: "POST",
            url: "php/contact-form.php",
            data: $('#contactForm').serialize(),
            success: function(msg) {
                if (msg == 'SEND') {
                    $('.success').fadeIn();
                    $('.error').fadeOut();
                    $('#contactForm')[0].reset();
                } else {
                    $('.success').fadeOut();
                    // $('.error').fadeIn().find('h3').text(msg);
                }
            }
        });
        return false;
    });

    $('#contactForm2').submit(function() {

        console.log("teste form 2")

        $.notify({
            // options
            message: 'Mensagem enviada com sucesso.'
        }, {
            // settings
            type: 'danger'
        });

        $.ajax({
            type: "POST",
            url: "php/contactus.php",
            data: $('#contactForm2').serialize(),
            success: function(msg, arg1, arg2) {
                console.log(msg, arg1, arg2);

                // if (msg == 'SEND') {
                //     $('.success').fadeIn();
                //     $('.error').fadeOut();
                //     $('#contactForm2')[0].reset();
                // } else {
                //     $('.success').fadeOut();
                //     // $('.error').fadeIn().find('h3').text(msg);
                // }
            }
        });
        return false;
    });


    /*  -------------------------------
         Google Map ( for contact page )
        -------------------------------  */

    // $('#google-map').gMap({
    //     latitude: -22.9701635,
    //     longitude: -43.4155225,
    //     maptype: 'TERRAIN',
    //     scrollwheel: false,
    //     zoom: 14,
    //     markers: [{
    //         latitude: -22.9701635,
    //         longitude: -43.4155225,
    //         html: "I am Here!",
    //         icon: {
    //             image: "images/icon/map_marker.png",
    //             iconsize: [46, 46],
    //             iconanchor: [12, 46]
    //         }
    //     }],
    //     controls: {
    //         panControl: false,
    //         zoomControl: true,
    //         mapTypeControl: false,
    //         scaleControl: false,
    //         streetViewControl: false,
    //         overviewMapControl: false
    //     }
    // });


});