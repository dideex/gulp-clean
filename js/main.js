$(document).ready(function () {
  /**
   * MAGNIFIC POPUP
   */

  // $('[href="#popup"]').magnificPopup({
  //   type: 'inline',
  //   midClick: true,
  //   fixedContentPos: true,
  // })

  /**
   * OWL CAROUSEL
   */

  // var owlCarousel = $('.owl-carousel').owlCarousel({
  //   loop: true,
  //   margin: 23,
  //   nav: false,
  //   items: 4,
  //   responsive: {
  //     0: {
  //       items: 2,
  //     },
  //     768: {
  //       items: 4,
  //     },
  //   },
  // })
  // $('#arrow-next').click(() => owlCarousel.trigger('next.owl.carousel'))
  // $('#arrow-prev').click(() => owlCarousel.trigger('prev.owl.carousel'))

  /**
   * STICKY MENU
   */

  // $(window).scroll(function() {
  //   if (
  //     $(this).scrollTop() >= $('.header').height() &&
  //     $(this).scrollTop() <= $('body').height() - 800
  //   ) {
  //     $('#sticky')
  //       .addClass('animated')
  //       .addClass('fadeInDown')
  //       .removeClass('fadeOutUp')
  //     $('#sticky-mobile')
  //       .addClass('animated')
  //       .addClass('fadeInDown')
  //       .removeClass('fadeOutUp')
  //   } else {
  //     $('#sticky')
  //       .addClass('animated')
  //       .addClass('fadeOutUp')
  //       .removeClass('fadeInDown')
  //     $('#sticky-mobile')
  //       .addClass('animated')
  //       .addClass('fadeOutUp')
  //       .removeClass('fadeInDown')
  //   }
  // })
});

/**
 * GOOGLE MAPS
 */

// function initMap() {
//   var startPos = {lat: 59.555454, lng: 150.833293}
//   var naberejnaya = {lat: 59.559179, lng: 150.828716}
//   var kolcevaya = {lat: 59.551209, lng: 150.820168}
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 14,
//     center: startPos,
//     disableDefaultUI: true,
//     scrollwheel: false,
//   })
//   var marker = new google.maps.Marker({
//     position: naberejnaya,
//     map: map,
//     title: 'mark2',
//     icon: {
//       url: '../img/icons/google-marker.png',
//       size: new google.maps.Size(45, 62),
//     },
//   })
//   var marker = new google.maps.Marker({
//     position: kolcevaya,
//     map: map,
//     title: 'mark1',
//     icon: {
//       url: '../img/icons/google-marker.png',
//       size: new google.maps.Size(39, 62),
//     },
//   })
// }
