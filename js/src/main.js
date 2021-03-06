$(document).ready(function() {
  /**
   * A N I M A T E D  M E N U
   */

  $('nav').on('click', '[href*="#"]', function(e) {
    $.magnificPopup.close()
    var target = e.target
    if (target.tagName !== 'A') target = target.parentElement
    var offset = 60
    $('html,body')
      .stop()
      .animate({scrollTop: $(target.hash).offset().top - offset}, 1e3)
    return false
  })

  $('.header__top-mob--logo, .nav__top--logo').click(e =>
    $('html,boyd')
      .stop()
      .animate({scrollTop: 0}, 1e3),
  )

  /**
   * T O P  N A V  M E N U
   */

  $(window).scroll(function() {
    if (
      $(this).scrollTop() >= 1024 &&
      $(this).scrollTop() <= $('body').height() - 800
    ) {
      $('#sticky')
        .addClass('animated')
        .addClass('fadeInDown')
        .removeClass('fadeOutUp')
      $('#sticky-mobile')
        .addClass('animated')
        .addClass('fadeInDown')
        .removeClass('fadeOutUp')
    } else {
      $('#sticky')
        .addClass('animated')
        .addClass('fadeOutUp')
        .removeClass('fadeInDown')
      $('#sticky-mobile')
        .addClass('animated')
        .addClass('fadeOutUp')
        .removeClass('fadeInDown')
    }
  })

  /**
   * Magnific popup
   */

  $('[href="#mob-nav"]').magnificPopup({
    type: 'inline',
    midClick: true,
    fixedContentPos: true,
  })

  $('[href="#popup-promotion"]').magnificPopup({
    type: 'inline',
    midClick: true,
    fixedContentPos: true,
  })

  $('[href="#popup-header"]').magnificPopup({
    type: 'inline',
    midClick: true,
    fixedContentPos: true,
  })

  $('.header__slider a').magnificPopup({
    type: 'inline',
    midClick: true,
    fixedContentPos: true,
  })

  $('.popup-close').click(e => ($.magnificPopup.close(), false))
  /**
   * O W L  C A R O U S E L
   * H E A D E R
   */

  var owlHeader = $('#header-slider').owlCarousel({
    loop: true,
    margin: 18,
    nav: false,
    items: 5,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 5,
      },
    },
  })

  owlHeader.on('translated.owl.carousel', e =>
    $('.header__slider a').magnificPopup({
      type: 'inline',
      midClick: true,
    }),
  )

  $('#arrow-next').click(function() {
    return owlHeader.trigger('next.owl.carousel')
  })
  $('#arrow-prev').click(function() {
    return owlHeader.trigger('prev.owl.carousel')
  })

  /**
   * O W L  C A R O U S E L
   * S T U F F
   */

  var owlStuff = $('#stuff-slider').owlCarousel({
    loop: true,
    margin: 23,
    nav: false,
    items: 4,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 4,
      },
    },
  })

  $('#arrow-w-next-stuff').click(() => owlStuff.trigger('next.owl.carousel'))
  $('#arrow-w-prev-stuff').click(() => owlStuff.trigger('prev.owl.carousel'))

  /**
   * O W L  C A R O U S E L
   * F E E D B A C K
   */

  var owlFeedback = $('#fb-slider').owlCarousel({
    loop: true,
    margin: 23,
    nav: false,
    items: 2,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  })

  $('#arrow-w-next-fb').click(() => owlFeedback.trigger('next.owl.carousel'))
  $('#arrow-w-prev-fb').click(() => owlFeedback.trigger('prev.owl.carousel'))
})

/**
 * GOOGLE MAPS
 */

function initMap() {
  var startPos = {lat: 59.558178, lng: 150.828262}
  var naberejnaya = {lat: 59.565374, lng: 150.817453}
  var kolcevaya = {lat: 59.551209, lng: 150.820168}
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: startPos,
    disableDefaultUI: true,
    // scrollwheel: false,
    mapTypeControl: true
  })
  var marker = new google.maps.Marker({
    position: naberejnaya,
    map: map,
    title: 'ул. Набережная реки Магаданки, 12А',
  })
  var marker = new google.maps.Marker({
    position: kolcevaya,
    map: map,
    title: 'ул. Кольцевая, 30',
  })

}
