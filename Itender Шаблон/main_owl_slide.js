$(document).ready(function(){
    // $('.owl-carousel').owlCarousel();

var owl = $('.owl-carousel');
owl.owlCarousel({
    items:4,
    nav: true,
    loop:true,
    margin:10,
    autoplay:false,
    autoplayTimeout:5000,
    autoplayHoverPause:true
});
});
$('.play').on('click',function(){
    owl.trigger('play.owl.autoplay',[4])
});
$('.stop').on('click',function(){
    owl.trigger('stop.owl.autoplay')
});

// var carouselEl = $('.owl-carousel');
//
// carouselEl.owlCarousel({
//     items: 6
// });
//
// $(".my-next-button").click(function() {
//     carouselEl.trigger('next.owl.carousel');
// });
//
// $(".my-previous-button").click(function() {
//     carouselEl.trigger('prev.owl.carousel');
// });

// noinspection JSJQueryEfficiency

jQuery(document).ready(function ($) {
    $('.owl-carousel-featured-product').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        dots:false,
        items:4,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });
});
